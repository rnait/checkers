(ns checkers.helpers)

(defonce whiteFinishLine 
  #{[0 0] [0 1] [0 2] [0 3] [0 4] [0 5] [0 6] [0 7]})
(defonce blackFinishLine
  #{[7 0] [7 1] [7 2] [7 3] [7 4] [7 5] [7 6] [7 7]})
(defn mapmap [m f] ;apply map on a hashmap and return a hashmap
  (into {} (for [[k v] m] [k (f k v)])))

(defn piece? [db [row col]]
  (get-in db [:board [row col]] nil))

(defn valid_pos? [[row col]]
  (and (>= row 0) (<= row 7) (>= col 0) (<= col 7)))

(defn color? [db [row col]]
  (get-in db [:board [row col] :color] nil))

(defn action_on_click? [db [row col]]
  (get-in db [:moving [row col] ] nil))

(defn empty_cell? [db [row col]]
  (= nil (piece? db [row col])))

(defn remove_piece [db captureLoc]
  (js/console.log (prn-str "remove piece " captureLoc ))
  (update-in db [:board] dissoc captureLoc))

(defn add_piece [db pos piece]
  (js/console.log (prn-str "piece " piece "added in " pos))
  (assoc-in db [:board pos] piece))
(defn opposite_color [color]
  (case color
    "w" "b"
    "b" "w"))
(defn inc_score [db color change]
  (let [scoreIndex (case color
                     "w" 0
                     "b" 1)]
    (update-in db [:score scoreIndex] + change)))

(defn inc_score_with_capture [db capturedPieceLoc]
  (let [capturedPiece (piece? db capturedPieceLoc)
        capturerColor (opposite_color (:color capturedPiece))
        points (case (:name capturedPiece)
                 "p" 1
                 "q" 10)]
   (inc_score db capturerColor points)))

(defn change_turn [db]
  (let [current_turn (:turn db)]
   (-> db
       (assoc-in [:turn]
                 (case current_turn
                   "w"  "b"
                   "b"  "w")))))
(defn end_move [db]
  (-> db
      (assoc-in  [:temp_layer] {})
      (assoc-in  [:moving] {})
      ))
(defn abs [n] (max n (- n)))
(defn diag_range [db from move]
  ;retruns the diagonal between from and to=from+move. 
  ;If its not a diagonal returns nil. from and to are not included in the list
  (let [step (mapv #(if (neg? %1) -1 +1) move)
        to (mapv + from move)
        ]
    (if (not= (abs (move 0)) (abs (move 1))) ; not a diagonal
      nil 
      (filter #(not (empty_cell? db %1)) ;removes cells that are empty or not valid
              (apply map #(vector %1 %2) ;equivalent of zip in python
                     (map #(range %1 %2 %3) (mapv + from step) to step))))))



(defn possible_moves? ;TODO Corriger  ceci pour que ca montre capture moves en verifiant d'abord si TOUS les mouvements possibles contiennent des capture moves et pas seulement le clicked
  ([db [row col]]
   (let [turn (:turn db)
         oponent  (case turn
                    "w" "b"
                    "b" "w"
                    nil)]
    (letfn [(eval_move [db from move]
                       (let [turn (:turn db)
                             to (mapv + from move)
                             cellsOnDiag (map #(merge {:pos %1}   ((:board db)  %1)) (diag_range db from move))]
    ;(js/console.log (prn-str "cellsOnDiag " cellsOnDiag))
                         (cond
                           (or
                            (not (valid_pos? from)) (not (valid_pos? to)) ;destination or origin beyond board
                            (not (empty_cell? db to)) ; destination not empty
                            (> (count cellsOnDiag) 1) ; there is more than one piece on the diagonal
                            (and (= "p" (:name (piece? db from)))
                                 (= 0 (count cellsOnDiag))
                                 (not= [1 1] (mapv abs move)) ;prevent moves of pawns bigger than 1 step
                                 ))nil
      ;(js/console.log (prn-str "1 " (valid_pos? from) "2 " (not (valid_pos? to)) "3 " (> 1 (count cellsOnDiag)) ) )
                           ;from here there cellsOnDiag has 0 or one element
                           (= 0 (count cellsOnDiag))
                           (list {:from from
                                  :to to
                                  :typeOfMove :move}) ;free way to move
                           (= oponent (:color (first cellsOnDiag)))
                           (list    {:from from
                                     :to to
                                     :typeOfMove :capture
                                     :captureLocation (:pos (first cellsOnDiag))}) ;move with capturing
                           )))
            (move_black_pawn [] (mapcat #(eval_move db [row col] %1) '([1 1] [1 -1] [2 2] [2 -2])))
            (move_white_pawn [] (mapcat #(eval_move db [row col] %1) '([-1 -1] [-1 1] [-2 -2] [-2 2])))
            (move_queen [] (mapcat #(eval_move db [row col] %1)
                                   (mapcat #(list (vector %1 %1)
                                                  (vector (- %1) %1)
                                                  (vector %1 (- %1))
                                                  (vector (- %1) (- %1)))
                                           (range 1 8))))]

;(js/console.log (mapcat #(eval_move db [row col] %1) '([-1 -1] [-1 1] [1 1] [1 -1])))
(case [turn (piece? db [row col])]
  ["w" {:color "w" :name "p"}] (move_white_pawn)
  ["b" {:color "b" :name "p"}] (move_black_pawn)
  ["w" {:color "w" :name "q"}] (move_queen)
  ["b" {:color "b" :name "q"}] (move_queen)
  nil
  )      
)))
 
  )

(defn update_piece_moves [moves]
  (apply merge (flatten (map
                         (fn [{dest :to,  typeOfMove :typeOfMove, captureLocation :captureLocation}]
                           (case typeOfMove
                             :move (list {dest #{:is-movable}})
                             :capture (list {dest #{:is-movable}}  {captureLocation #{:is-capturable}} )
                             ;#{:is-capture-jump} 
                             )
                           ;{[x y] status :capture captureLocation}
                           
                           )
                         moves))))

(defn update_moving_handlers [ moves]
  (apply merge (flatten (map
                         (fn [move]
                           (case (:typeOfMove move)
                             :move {(:to move)
                                    {:typeOfMove :move
                                     :to (:to move)
                                     :from (:from move)}}
                             :capture {(:to move)
                                       {:typeOfMove :capture
                                        :to (:to move)
                                        :captureLocation (:captureLocation move)
                                        :from (:from move)}}
                             nil)
                           )
                         moves))))
(defn move_piece [db from to]
  (-> db
   (add_piece to (piece? db from ))
   (remove_piece from)))

(defn possible_moves_all_pieces?
  [db]
  (->> (:board db)
       (map (fn [[k _]] k))
       (map #(possible_moves? db %1))
       flatten
       (filter #(not= nil %1)) ))
(defn possible_captures_all_pieces?
  [db]
  (->> db
       possible_moves_all_pieces?
       (filter #(= :capture (:typeOfMove %1)))))
(defn all_possible_moves_or_only_captures 
  [db]
  (let [captures (possible_captures_all_pieces? db)]
    (if (= captures '())
      (possible_moves_all_pieces? db)
      captures)))
(defn show_moves [db moves]
  (let [allCaptures (possible_captures_all_pieces? db)
        ;moves (if (= allCaptures '())
        ;        moves
        ;        (filter (fn [elt] (= (:typeOfMove elt) :capture)) moves))
        ]
    
    (if (= moves '())
      db
      (-> db
          (assoc-in  [:temp_layer] (update_piece_moves  moves))
          (assoc-in  [:moving] (update_moving_handlers  moves))))))

(defn show_piece_moves [db [row col]]
  (let [moves (possible_moves? db [row col])]
    (show_moves db moves)
    ))


(defn change_turn_or_show_mandatory_capture [db capturerPos]
  (let [captures (possible_captures_all_pieces? db)]
    (if (contains? (into #{} (map :from captures)) capturerPos) ;avoids continuing the capture if the capture available is for another piece than the last one that captured
      (show_moves db captures)
      (change_turn db)
      )))
(defn is_crownable? [pos piece]
  (or
   (and (= piece {:name "p" :color "w"}) (contains? whiteFinishLine pos))
   (and (= piece  {:name "p" :color "b"}) (contains? blackFinishLine pos)))
  )
(defn switch_pawns_to_queens [db]
  (assoc-in db [:board]
            (mapmap (:board db)  (fn [pos piece]
                                   (if (is_crownable? pos piece) {:name "q" :color (:color piece)}
                                       piece)))))