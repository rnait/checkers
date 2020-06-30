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
(comment (defn prevent_noncapture_moves [moves] ;TODO: remove the need for this. possible_moves? Should return explicitly all moves. Filter should be elsewhere
           (let [capture_moves (filter (fn [elt] (= (:typeOfMove elt) :capture)) moves)]
             (if (= capture_moves '())
               moves
               capture_moves))))
(defn build_move_pawnOLD 
  [db [row col] step]
  (let [turn (:turn db)
        oponent  (case turn
                   "w" "b" 
                   "b" "w" 
                   nil)
        new_pos (mapv + [row col] step)
        new_jump_pos (mapv + new_pos step)]
     ;(js/console.log (prn-str "possible move cell " [row col])) ;TODO remove this
    (cond
      (not 
       (or (and (= turn "b") (contains? #{[1 1] [1 -1]} step))
           (and (= turn "w") (contains? #{[-1 -1] [-1 1]} step)))) nil
      (empty_cell? db row col) nil ;origin cell is  an empty cell
      (= oponent (color? db row col)) nil ;origin cell is  a black (resp white) piece while its white's (resp black's) turn
      (not (valid_pos? new_pos)) nil ;move gets us out of the board
      (empty_cell? db (new_pos 0) (new_pos 1)) (list {:from [row col]
                                                      :to new_pos
                                                      :typeOfMove :move}) ;normal move without capturing
      (and (= oponent (color? db (new_pos 0) (new_pos 1))) ;move with capturing
           (valid_pos? new_jump_pos)
           (empty_cell? db (new_jump_pos 0) (new_jump_pos 1)))  (list    {:from [row col]
                                                                          :to new_jump_pos
                                                                          :typeOfMove :capture
                                                                          :captureLocation new_pos}) ;move with capturing
      :else nil))
  
  )

(defn possible_moves? ;TODO Corriger  ceci pour que ca montre capture moves en verifiant d'abord si TOUS les mouvements possibles contiennent des capture moves et pas seulement le clicked
  ([db [row col]]
   (let [turn (:turn db)
             oponent  (case turn
                        "w" "b"
                        "b" "w"
                        nil)]
    (letfn [
      (build_pawn_move [db [row col] step]
             (let [new_pos (mapv + [row col] step)
                   new_jump_pos (mapv + new_pos step)]
               (cond
                 (not
                  (or (and (= turn "b") (contains? #{[1 1] [1 -1]} step))
                      (and (= turn "w") (contains? #{[-1 -1] [-1 1]} step)))) nil
                 (empty_cell? db row col) nil ;origin cell is  an empty cell
                 (= oponent (color? db row col)) nil ;origin cell is  a black (resp white) piece while its white's (resp black's) turn
                 (not (valid_pos? new_pos)) nil ;move gets us out of the board
                 (empty_cell? db (new_pos 0) (new_pos 1)) (list {:from [row col]
                                                                 :to new_pos
                                                                 :typeOfMove :move}) ;normal move without capturing
                 (and (= oponent (color? db (new_pos 0) (new_pos 1))) ;move with capturing
                      (valid_pos? new_jump_pos)
                      (empty_cell? db (new_jump_pos 0) (new_jump_pos 1)))  (list    {:from [row col]
                                                                                     :to new_jump_pos
                                                                                     :typeOfMove :capture
                                                                                     :captureLocation new_pos}) ;move with capturing
                 :else nil)))
      (build_king_move [db [row col] step]
        (let [end_pos (mapv + [row col] step)]
          (if (or (empty_cell? db row col) ;origin cell is  an empty cell
                  (= oponent (color? db row col)) ;origin cell is  a black (resp white) piece while its white's (resp black's) turn
                  (not (valid_pos? end_pos))) ;move gets us out of the board
            nil
            nil; TODO : complete the function here. Generate the cell positions between [row col] and
            ; end_pos. The direction is given by (mapv sign step)
            ; create a list of the positions between beginning of move and and of move
            ; than map this list to empty to a dict of {piece, color}. If there is only one enemy piece than its
            ; capturable otherwise if its completely empty then it's movable. Otherwise returns nil
            )))]
     
      (mapcat #(build_pawn_move db [row col] %1) '([1 1] [1 -1] [-1 -1] [-1 1]))
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
   (add_piece to (piece? db (from 0) (from 1)))
   (remove_piece from)))

(defn possible_moves_all_pieces?
  [db]
  (->> (:board db)
       (map (fn [[k _]] k))
       (map #(possible_moves? db %1))
       flatten))
(defn possible_captures_all_pieces?
  [db]
  (->> db
       possible_moves_all_pieces?
       (filter #(= :capture (:typeOfMove %1)))))

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


(defn change_turn_or_show_mandatory_capture [db]
  (let [captures (possible_captures_all_pieces? db)]
    (if (= '() captures)
      (change_turn db)
      (show_moves db captures))))
