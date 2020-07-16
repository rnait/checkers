(ns checkers.undointerceptor
  (:require
   [re-frame.core :as re-frame]
   [reagent.core :as reagent]
   [checkers.db :as db]
))
(defonce history (reagent/atom {:stack  [db/default-db]
                                :step 0}))
(defn switch_step_history [step]
  (swap! history assoc-in [:step] step ))
(def undo-interceptor
  (re-frame/->interceptor
   :id :undo
   :after (fn [context]
             (let [db (get-in context [:effects :db])
                   update_history (fn [h]
                                   (let [newStep (inc (:step h))] 
                                     (js/console.log (prn-str "step: " (:step h)))
                                     (-> h
                                         (assoc-in [:step] newStep)
                                         (update-in [:stack] #(into [] (take  newStep  %1)))
                                         (update-in [:stack] conj db))))]
               (swap! history update_history)
               (js/console.log "interceptor called")
               context
               ))))