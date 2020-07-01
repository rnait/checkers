(ns checkers.db)
(def size 8)
(defn ->row_of_pawns [rowId color]
  (apply hash-map (interleave (map #(vector %1 %2) (repeat size rowId) (range size)) (repeat size {:color color
                                                                                               :name "p"})))
  )
(defn initBoard []
  
  (merge 
   (->row_of_pawns 0 "b")
   (->row_of_pawns 1 "b")
   (->row_of_pawns 6 "w")
   (->row_of_pawns 7 "w")
   {[3 6] {:color "b", :name "p"}
    [2 2] {:color "w", :name "p"}
    [4 2] {:color "w", :name "q"}
    [4 4] {:color "w", :name "q"}
    [5 6] {:color "b", :name "p"}}
         ))
(def default-db
  {:name "re-frame"
   :board (initBoard)
   :temp_layer {[1 1] #{:is-capture-jump}}
   :turn "w"
   :moving {}
   })
