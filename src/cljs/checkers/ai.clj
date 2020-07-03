(ns checkers.ai
  (:require
   [re-frame.core :as re-frame]
   [checkers.db :as db]
   [clojure.set :as set]
   [checkers.helpers :as helpers]))