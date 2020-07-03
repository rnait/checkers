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

(defn move_piece_handler [cofx from to]
  (if (= '() (helpers/possible_captures_all_pieces? (:db cofx)))
    (doall
     (js/console.log (prn-str "move from piece from " from "to " to))
     {:db (-> (:db cofx)
              (helpers/move_piece from to)
              helpers/end_move
              helpers/change_turn
              helpers/switch_pawns_to_queens)
      :dispatch [:auto-play "w"]})
    (doall
     (js/console.log "can't move, capture is mandatory")
     {:db (:db cofx)}))
  )
(re-frame/reg-event-fx
 :move_piece
 (fn [cofx [_ from to]]
   (move_piece_handler cofx from to)
   )) 
(defn capture_piece_handler [cofx from to captureLoc] 
  {:db 
   (-> (:db cofx)
       (helpers/inc_score_with_capture captureLoc)
       (helpers/remove_piece captureLoc)
       (helpers/move_piece from to)
       helpers/end_move
       (helpers/change_turn_or_show_mandatory_capture to)
       helpers/switch_pawns_to_queens)
   :dispatch [:auto-play "w"]}
  )

(re-frame/reg-event-fx
 :capture_piece 
 (fn [cofx [_ from to captureLoc]]
   (js/console.log (prn-str "capture " captureLoc " from piece from " from "to " to) )    
   (capture_piece_handler cofx from to captureLoc       )   
   ))
(defn exectute_move [cofx move]
  (let [{from :from 
         to :to
         captureLocation :captureLocation} move]
    (case (:typeOfMove move)
      :move (move_piece_handler cofx from to) 
      :capture (capture_piece_handler cofx from to captureLocation) )))
(re-frame/reg-event-fx
 :execute_move
 (fn [cofx [_ move]]
   (exectute_move cofx move)))
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

(re-frame/reg-event-db
 :inc_score
 (fn [db [_ pieceLoc]]
   (-> db
       (helpers/inc_score_with_capture pieceLoc))))

(defn auto_play_handler [db color]
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
(re-frame/reg-event-fx
 :auto-play
 (fn [cofx [_ color]]
   (let [db (:db cofx)
         move_event (auto_play_handler db color)]
     (when (not= move_event nil)
       {:dispatch move_event
        })
     )))

(re-frame/reg-event-db 
 :add_piece 
 (fn [db [_ pos piece]]
   (helpers/add_piece db pos piece)))

(re-frame/reg-event-db
 :remove_piece
 (fn [db [_ pos ]]
   (helpers/remove_piece db pos)))