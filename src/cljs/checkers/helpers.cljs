(ns checkers.helpers)

(defn piece? [db row col]
  (get-in db [:board [row col]] nil))

(defn valid_pos? [[row col]]
  (and (>= row 0) (<= row 7) (>= col 0) (<= col 7)))

(defn color? [db row col]
  (get-in db [:board [row col] :color] nil))

(defn action_on_click? [db [row col]]
  (get-in db [:moving [row col] ] nil))

(defn empty_cell? [db row col]
  (= nil (piece? db row col)))

(defn remove_piece [db captureLoc]
  (js/console.log (prn-str "remove piece " captureLoc ))
  (update-in db [:board] dissoc captureLoc))

(defn add_piece [db pos piece]
  (js/console.log (prn-str "piece " piece "added in " pos))
  (assoc-in db [:board pos] piece))

(defn ->current_move [db move]
  (assoc-in db [:movin :current_move] move))

(defn current_move? [db]
  (get-in db [:moving :current_move] nil))


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
(defn filter_capture_moves [moves]
  (let [capture_moves (filter (fn [elt] (= (:typeOfMove elt) :capture)) moves)]
    (if (= capture_moves '())
      moves
      capture_moves)))

(defn possible_moves? ;TODO Corriger  ceci pour que ca montre capture moves en verifiant d'abord si TOUS les mouvements possibles contiennent des capture moves et pas seulement le clicked
  ([db [row col]]
   (filter_capture_moves 
    (concat (possible_moves? db [row col] [1 1])
            (possible_moves? db [row col] [1 -1]))))
  ([db [row col] step]
   (let [turn (:turn db)
         [oponent step] (case turn
                          "w" ["b" (mapv - step)]
                          "b" ["w" step]
                          nil)
         new_pos (mapv + [row col] step)
         new_jump_pos (mapv + new_pos step)]
     ;(js/console.log (prn-str "possible move cell " [row col])) ;TODO remove this
     (cond
       (empty_cell? db row col) nil ;clicked on an empty cell
       (= oponent (color? db row col)) nil ;clicked on a black (resp white) piece while its white's (resp black's) turn
       (not (valid_pos? new_pos)) nil ;move gets us out of the board
       (empty_cell? db (new_pos 0) (new_pos 1)) (list {:from [row col]
                                                       :to new_pos 
                                                       :typeOfMove :move
                                                       }) ;normal move without capturing
       (and (= oponent (color? db (new_pos 0) (new_pos 1))) ;move with capturing
            (valid_pos? new_jump_pos)
            (empty_cell? db (new_jump_pos 0) (new_jump_pos 1)))  (list    {:from [row col]
                                                                           :to new_jump_pos
                                                                           :typeOfMove :capture
                                                                           :captureLocation new_pos
                                                                           }) ;move with capturing
       :else nil)))
  )
(defn possible_moves_all_pieces?
  [db ]
  (->> (:board db)
       (map (fn [[k _]] k) )
       (map #(possible_moves? db %1)) 
       flatten
       )  
  )
(defn possible_captures_all_pieces?
  [db]
  (->> db
       possible_moves_all_pieces?
       (filter #(= :capture (:typeOfMove %1)))))

(defn change_turn_or_show_mandatory_capture [db]
  (let [captures (possible_captures_all_pieces? db)]
    (if (= '() captures)
      (change_turn db)
      db )))

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
   (add_piece to (piece? db (from 0) (from 1)))
   (remove_piece from)))

(defn show_piece_moves [db [row col]]
  (let [moves (possible_moves? db [row col])]
    (if (= moves '())
      db
      (-> db
          (assoc-in  [:temp_layer] (update_piece_moves  moves))
          (assoc-in  [:moving] (update_moving_handlers  moves))))))
(defn show_mandatory_captures [db]
  nil )