(ns checkers.events
  (:require
   [re-frame.core :as re-frame]
   [checkers.db :as db]
   [clojure.set :as set]
   [checkers.handlers :as handlers]
   [checkers.helpers :as helpers]
   [checkers.ai :as ai]
   ;[day8.re-frame.tracing :refer-macros [fn-traced]]
   ))

(re-frame/reg-event-db
 :make_cell_movable
 (fn [db [_ x y]]
   (js/console.log (prn-str "make celle movable " x "-" y))
   (update-in db [:temp_layer [x y]] set/union #{:is-capturable})))


#_(re-frame/reg-event-fx
 :move_piece
 (fn [cofx [_ from to]]
   (handlers/move_piece_handler cofx from to)
   )) 


#_(re-frame/reg-event-fx
 :capture_piece 
 (fn [cofx [_ from to captureLoc]]
   (js/console.log (prn-str "capture " captureLoc " from piece from " from "to " to) )    
   (handlers/capture_piece_handler cofx from to captureLoc       )   
   ))

(re-frame/reg-event-fx
 :execute_move
 (fn [cofx [_ move]]
   (let [newCofx (handlers/execute_move cofx move)]
     {:db (:db newCofx)
      :dispatch ^:flush-dom [:auto-play "b"]}
     )
   ))
(re-frame/reg-event-db
 :show_piece_moves
 (fn [db [_ row col ]]
   (handlers/show_piece_moves db [row col])))

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

(re-frame/reg-event-db
 :inc_score
 (fn [db [_ pieceLoc]]
   (-> db
       (helpers/inc_score_with_capture pieceLoc))))

(defn auto_play_handler_random [db color]
  (let [turn (:turn db)
        move (rand-nth (helpers/all_possible_moves_or_only_captures db))]
    (if (= turn color)
      (doall
       (js/console.log (prn-str "auto_play move:"
                                move))
       (case (:typeOfMove move)
         :move [:move_piece (:from move) (:to move)]
         :capture [:capture_piece (:from move) (:to move) (:captureLocation move)] ))
      nil))
  )

(defn auto_play [cofx color]
  (let [move (ai/ai_best_move cofx color)
        newCofx (handlers/execute_move cofx move)]
    (if (= move nil) 
      newCofx
      (auto_play newCofx "b") ; black keeps moving if it's possible (capture still available)
      )))

(re-frame/reg-event-fx
 :auto-play
 (fn [cofx [_ color]]
   (let [newCofx (auto_play cofx color)
         winner (helpers/winner? (:db newCofx))]
     ;newCofx
     (js/console.log (str "winner :" winner))
     (if (= nil winner)
       newCofx
       {:db (:db newCofx) :dispatch [:winner winner]}))))

(re-frame/reg-event-fx
 :winner
 (fn [cofx [_ winner]]
   (js/alert (str "winner is " (case winner
                                           "w" "Whites"
                                           "b" "Blacks")))))
(re-frame/reg-event-db 
 :add_piece 
 (fn [db [_ pos piece]]
   (helpers/add_piece db pos piece)))

(re-frame/reg-event-db
 :remove_piece
 (fn [db [_ pos ]]
   (helpers/remove_piece db pos)))