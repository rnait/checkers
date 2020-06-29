(ns checkers.subs
  (:require
   [re-frame.core :as re-frame]
   [day8.re-frame.tracing :refer-macros [fn-traced]]
   [checkers.helpers :as helpers]))

(re-frame/reg-sub
 :name
 (fn [db]
   (:name db)))
(re-frame/reg-sub
 :db
 (fn [db]
   db))

(re-frame/reg-sub
 :turn
 (fn [db]
   (:turn db)))

(re-frame/reg-sub
 :piece
 (fn [db [_ row col]]
   (helpers/piece? db row col)))

(re-frame/reg-sub
 :piece_image
 (fn [[_ row col] _]
   [(re-frame/subscribe [:piece row col])])
 (fn [[piece_dict] _]
   (case [(:name piece_dict) (:color piece_dict)]
     ["p" "w"] "img/white_pawn.svg"
     ["p" "b"] "img/black_pawn.svg"
     nil)))


(re-frame/reg-sub
 :cell_class
 (fn [db [_ row col]]
   (merge
    (get-in db [:temp_layer [row col]] #{})
    (if (even? (+ col row))
      :even  :odd))))

(re-frame/reg-sub
 :action_on_click?
 (fn [db [_ clicked_cell]]
   (helpers/action_on_click? db clicked_cell)))