;look for icons here https://icons8.com/icon/pack/gaming/ios-filled
(ns checkers.views
  (:require
   [re-frame.core :as re-frame]
   [checkers.subs]
   [checkers.helpers :as helpers]
   [hx.react :as hx :refer [defnc]]
   [react-spring :as  spring]
   [checkers.undointerceptor :as undo-intrcp]
   ))

(defn cell_format? [row col]
  (let [cell_class (re-frame/subscribe [:cell_class row col])]
    (str
     (when (contains? @cell_class :even) " square dark-square ")
     (when (contains? @cell_class :odd) " square light-square ")
     (when (contains? @cell_class :is-movable) " is-movable")
     (when (contains? @cell_class :is-capturable) " is-capturable")
     (when (contains? @cell_class :is-capture-jump) " is-movable")
     )))
(defn on_cell_click [row col]
  (let [clicked_cell [row col]
        action_on_click (re-frame/subscribe [:action_on_click? clicked_cell])]
    (js/console.log (prn-str "clicked " @action_on_click))
    (if (= nil @action_on_click)
      (re-frame/dispatch ^:flush-dom [:show_piece_moves  row col])
      (re-frame/dispatch ^:flush-dom [:execute_move @action_on_click]) ;TODO refactor this to send human_move
      )
    )) 


(defn cell [row col]
  (fn []
    (let [piece_image_path (re-frame/subscribe [:piece_image row col])
          cell_format (cell_format? row col)]
      [:div
       [:button
        {:id (str "x: " col " y: " row)
         :className cell_format
         :on-click (fn [e]
                     (on_cell_click row col))}
       ;(when piece
        ; (str color piece))
       ;(str "x" col)
        (when @piece_image_path
          [:img
           {:src @piece_image_path}])]])))
(defn make_list_cells_movable [l]
  ;(js/console.log "in the for " (prn-str "l: " l))
  ;(map #(re-frame/dispatch [:make_cell_movable (%1 0) (%1  1)]) l)
  (doall (for [cell l]
           (re-frame/dispatch ^:flush-dom [:make_cell_movable (cell 0) (cell  1)])
           ;(js/console.log (prn-str "cell: " cell))
           ))
  )

(defn grid [size]
  [:table
   [:tbody
    (for [row (range size)]
      ^{:key (str "row" row)} [:tr
                               (for [col (range size)]
                                 ^{:key (str "cell" col " " row)} [:td
                                                                   [cell row col]])])]])
(defnc AppComponent [{:keys [title]}]
  (let [props (spring/useSpring (clj->js {:opacity 1 :from {:opacity 0}}))]
    [:div
     [spring/animated.div {:style props} title]]))

(defn main-panel []
  (let [name (re-frame/subscribe [:name])
        myDb (re-frame/subscribe [:db])
        turn (re-frame/subscribe [:turn])
        scoreW (re-frame/subscribe [:score "w"])
        scoreB (re-frame/subscribe [:score "b"])]
    [:div {:className "game"}
     [:div
      [:h1 "Player turn " (if (= "b" @turn) "Blacks" "Whites") " score W: " (prn-str @scoreW) " B: " (prn-str @scoreB)]
      (hx/f [AppComponent {:title "I will fade in"}])
      [grid 8]

      [:button
       {:on-click (fn [e]
                    (js/console.log "boton clicked")
                    (make_list_cells_movable '([1 3] [0 0])))}
       "Test"]
      [:button
       {:on-click (fn [e]
                    (js/console.log "boton Clear clicked")
                    (re-frame/dispatch ^:flush-dom [:end_move]))}
       "Clear Temp"]
      [:button
       {:on-click (fn [e]
                    (js/console.log "boton random-event clicked")
                    (re-frame/dispatch ^:flush-dom [:random-event]))}
       "random event"]
      [:button
       {:on-click (fn [e]
                    (js/console.log "boton show_piece_moves clicked")
                    (re-frame/dispatch ^:flush-dom [:show_piece_moves]))}
       "show_piece_moves"]
      [:button
       {:on-click (fn [e]
                    (js/console.log "change score")
                    (re-frame/dispatch ^:flush-dom [:inc_score [4 4]]))}
       "change score"]
      [:button
       {:on-click (fn [e]
                    (js/console.log "time shift")
                    (re-frame/dispatch ^:flush-dom [:time_shift 3]))}
       "time shift to 3"]
      [:br]
      (prn-str @myDb)
      [:br]
      (prn-str "all possible captures " (helpers/possible_captures_all_pieces? @myDb))
      [:br]
      (prn-str "undo-stack: " @undo-intrcp/history)]
     #_(let [i (atom -1)]
         (reduce
          (fn [x y]
            (let [step (swap! i inc)]
              (into [] (merge x [:div (str  "move: " (- (count (:stack @undo-intrcp/history)) @i))
                                 [:button
                                  {:on-click (fn [e] (re-frame/dispatch ^:flush-dom [:time_shift step]))}
                                  (str  (:score y))]]))))
          [:div "Testage                                  a"]
          (:stack @undo-intrcp/history)))
     (let [i (atom -1)]
       (into [] (concat [:div "testage "] (reverse (map (fn [x]
                                                          (let [step (swap! i inc)]
                                                            [:div (str  "move: "  @i)
                                                             [:button
                                                              {:on-click (fn [e] (re-frame/dispatch ^:flush-dom [:time_shift step]))}
                                                              (str  (:score x))]]))
                                                        (:stack @undo-intrcp/history))))))]
    
    )) 
