(ns checkers.core
  (:require
   [reagent.core :as reagent]
   [reagent.dom :as rdom]
   [re-frame.core :as re-frame]
   [checkers.events :as events]
   [checkers.views :as views]
   [checkers.config :as config]
   ["react-dom" :as react-dom]
   ["react-spring" :as spring]
   [hx.react :as hx :refer [defnc]]
   
   ))


(defn dev-setup []
  (when config/debug?
    (println "dev mode")))

#_(defnc AppComponent [{:keys [title]}]
  (let [props (spring/useSpring (clj->js {:opacity 1 :from {:opacity 0}}))]
    [:<>
     [spring/animated.div {:style props} title]]))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [views/main-panel] root-el)))

#_(defn mount-root []
  (react-dom/render
   (hx/f [AppComponent {:title "I will fade in"}])
   (js/document.getElementById "app")))

(defn init []
  (re-frame/dispatch-sync [:start-app])
  (dev-setup)
  (mount-root))
