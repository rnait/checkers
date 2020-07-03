(ns checkers.ai
  (:require
   [re-frame.core :as re-frame]
   [checkers.db :as db]
   [clojure.set :as set]
   [checkers.helpers :as helpers]
   [checkers.handlers :as handlers]))

(defn eval_score [cofx]
  (let [db (:db cofx)
        score (:score db)]
    ;(js/console.log (prn-str "eval_score db " db))
    (- (score 0) (score 1))))

(defn minimax [cofx depth]
  (let [db (:db cofx)
        player (:turn db)
        moves (helpers/all_possible_moves_or_only_captures db)]
    (if (= 0 depth)
      (eval_score cofx)
      (let [scores (map (fn [move]  (minimax 
                                     (handlers/execute_move cofx move)
                                     (dec depth))) 
                        moves
                        )]
        ;(js/console.log (prn-str "best move minimax scores : " moves))
        (if (= player "w")
          (apply max scores)
          (apply min scores))))
    ))

(defn get_best_move_minmax [cofx color depth] 
  (let [db (:db cofx)
        turn (:turn db)
        moves (helpers/all_possible_moves_or_only_captures db)
        moves_scores (map (fn [move] {:move move
                                      :score  (minimax
                                               (handlers/execute_move cofx move)
                                               depth)})
                    moves)]
    ;(js/console.log (prn-str "best move minimax moves : " moves))
    (if (= turn color)
      (if (= color "w")
        (:move (apply max-key :score moves_scores))
        (:move (apply min-key :score moves_scores)))
      nil)))
