(ns checkers.ai
  (:require
   [re-frame.core :as re-frame]
   [checkers.db :as db]
   [clojure.set :as set]
   [checkers.helpers :as helpers]
   [checkers.handlers :as handlers]))


(def  +infinity 9999999999)
(def  -infinity -9999999999)

(defn pawn_pos_score [db]
  (apply + (into () (for [[k v] (:board db)]
                      (cond
                        (= v {:color "b" :name "p"}) (* -1 (* (k 0) (k 0)))
                        (= v {:color "w" :name "p"}) (* (- 7 (k 0)) (- 7 (k 0)))
                        :else 0)))))
(defn eval_score [cofx]
  (let [db (:db cofx)
        score (:score db)]
    ;(js/console.log (prn-str "eval_score db " db))
    (+ 
     (* 1000 (- (score 0) (score 1)))
     (pawn_pos_score db))
    ))

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

(defn minimax_reduce [cofx depth alphaInit betaInit]
  (let [db (:db cofx)
        player (:turn db)
        moves (helpers/all_possible_moves_or_only_captures db)
        searchInitializer (if (= player "w") -infinity +infinity)
        compOperator (if (= player "w") max min)]
        (if (= 0 depth)
          (eval_score cofx)
          (let [score
                (reduce (fn [[alpha beta best] move ]
                          (let [movedDb (handlers/execute_move cofx move)
                                moveType   (:last_move movedDb)
                                newBest (compOperator 
                                         best
                                         (minimax_reduce
                                          movedDb
                                          (if  (= moveType :capture) depth (dec depth)) 
                                          alpha beta))

                                [newAlpha newBeta] (if (= player "w")
                                                     [(max newBest alpha) beta]
                                                     [alpha (min newBest beta)])]
                            ;(when (<= beta alpha) (js/console.log (prn-str "alpha " alpha " beta " beta " pruning")))
                            (if (<= beta alpha)
                             (reduced [newAlpha newBeta newBest]) 
                              [newAlpha newBeta newBest]
                              )
                            ))
                        [alphaInit betaInit searchInitializer] 
                        moves)]
            ;(js/console.log (prn-str score))
            (score 2)
            )

          )))
(defn get_best_move_minmax [cofx color depth] 
  (let [db (:db cofx)
        turn (:turn db)
        moves (helpers/all_possible_moves_or_only_captures db)
        moves_scores (map (fn [move] {:move move
                                      :score  (minimax_reduce
                                               (handlers/execute_move cofx move )
                                               depth -infinity +infinity)})
                    moves)]
    ;(js/console.log (prn-str "best move minimax moves : " moves))
    (if (= turn color)
      (if (= color "w")
        (:move (apply max-key :score moves_scores))
        (:move (apply min-key :score moves_scores)))
      nil)))
