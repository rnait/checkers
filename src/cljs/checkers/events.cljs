(ns checkers.events
  (:require
   [re-frame.core :as re-frame]
   [checkers.db :as db]
   [clojure.set :as set]
   [checkers.helpers :as helpers]
   [day8.re-frame.tracing :refer-macros [fn-traced]]))

(re-frame/reg-event-db
 :make_cell_movable
 (fn [db [_ x y]]
   (js/console.log (prn-str "make celle movable " x "-" y))
   (update-in db [:temp_layer [x y]] set/union #{:is-capturable})))


(re-frame/reg-event-fx
 :move_piece
 (fn [cofx [_ from to]]
   (if (= '() (helpers/possible_captures_all_pieces? (:db cofx)))
     (doall 
      (js/console.log (prn-str "move from piece from " from "to " to))
      {
       :db (-> (:db cofx)
               (helpers/move_piece from to)
               helpers/end_move
               helpers/change_turn
               )})
     (doall 
      (js/console.log "can't move, capture is mandatory")
      {
       :db (:db cofx)
       })))) 
(re-frame/reg-event-fx
 :capture_piece 
 (fn [cofx [_ from to captureLoc]]
   (js/console.log (prn-str "capture " captureLoc " from piece from " from "to " to) )
   {:db 
    (-> (:db cofx)
        (helpers/remove_piece captureLoc)
        (helpers/move_piece from to) 
        helpers/end_move
        helpers/change_turn_or_show_mandatory_capture
        )} 
   ))

(re-frame/reg-event-db
 :show_piece_moves
 (fn [db [_ row col ]]
   (helpers/show_piece_moves db [row col])))

(re-frame/reg-event-db
 :start-app
 (fn [_ _]
   (js/console.log "app loaded")
   db/default-db))

(re-frame/reg-event-fx
 :test_event
 (fn [cofx [_ x y]]
   (let [cell_class (re-frame/subscribe [:cell_class x y])]

     (js/console.log (pr-str "test-event captured "
                             "valeur de param: "  x "et " y
                             "cell_class " (prn-str @cell_class)
                             " cofx: " cofx
                             "_: " _))
     ;{:db (assoc-in (:db cofx) [:board [x y]] {:color "w", :name "p"})}
     (re-frame/dispatch [:make_cell_movable x y])
     ;(make_list_cells_movable '([0 0] [1 1] [3 3] [2 2]))
     )))

(re-frame/reg-event-db
 :end_move
 (fn [db _]
   (-> db 
       (assoc-in  [:temp_layer] {})
       (assoc-in  [:moving] {})))) 
(re-frame/reg-event-fx
 :random-event
 (fn [cofx [_]]
   (js/console.log "random event triggered")))


