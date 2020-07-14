(ns checkers.handlers
  (:require
   [re-frame.core :as re-frame]
   [checkers.db :as db]
   [clojure.set :as set]
   [checkers.helpers :as helpers]
))
(defn capture_piece_handler [cofx from to captureLoc]
  (let [updatedDb (-> (:db cofx)
                      (helpers/inc_score_with_capture captureLoc)
                      (helpers/remove_piece captureLoc)
                      (helpers/move_piece from to)
                      helpers/end_move
                      (helpers/change_turn_or_show_mandatory_capture to)
                      helpers/switch_pawns_to_queens
                      (helpers/update_last_move :capture))]
       {:db updatedDb
        }))

(defn move_piece_handler [cofx from to]
  (if (= '() (helpers/possible_captures_all_pieces? (:db cofx)))
    (doall
     ;(js/console.log (prn-str "move from piece from " from "to " to))
     {:db (-> (:db cofx)
              (helpers/move_piece from to)
              helpers/end_move
              helpers/change_turn
              helpers/switch_pawns_to_queens
              (helpers/update_last_move :move)
              )
      })
    (doall
     ;(js/console.log "can't move, capture is mandatory")
     {:db (:db cofx)})))

(defn execute_move [cofx move]
  (let [{from :from
         to :to
         captureLocation :captureLocation} move]
    ;(js/console.log (prn-str "execute move handler " move))
    (case (:typeOfMove move)
      :move (move_piece_handler cofx from to)
      :capture (capture_piece_handler cofx from to captureLocation)
      nil cofx)))

(defn show_piece_moves [db [row col]]
  (let [moves (helpers/possible_moves? db [row col])
        winner (helpers/winner? db)]
    (if  (not= nil winner)
      db
      (helpers/show_moves db moves))))

