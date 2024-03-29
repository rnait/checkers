(ns checkers.db)
(def size 8)
(defn ->row_of_pawns [rowId color]
  (apply hash-map (interleave (map #(vector %1 %2) (repeat size rowId) (range (mod rowId 2) 8 2)) (repeat size {:color color
                                                                                               :name "p"})))
  )
(defn initBoard []
  
  (merge
   (->row_of_pawns 0 "b")
   (->row_of_pawns 1 "b")
   (->row_of_pawns 2 "b")
   (->row_of_pawns 5 "w")
   (->row_of_pawns 6 "w")
   (->row_of_pawns 7 "w")
   {;[3 6] {:color "b", :name "p"}
    ;[2 2] {:color "w", :name "p"}
    ;[4 2] {:color "w", :name "q"}
    ;[4 4] {:color "w", :name "q"}
    ;[5 6] {:color "b", :name "p"}
    }))
(def default-db
  {:name "Checkers"
   :score [0 0]
   :board (initBoard)
   :temp_layer {}
   :turn "w"
   :moving {}
   :last_move  {:from [0 0]
                :to [0 0]
                :typeOfMove :move}
   })
