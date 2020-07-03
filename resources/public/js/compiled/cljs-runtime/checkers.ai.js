goog.provide('checkers.ai');
goog.require('cljs.core');
goog.require('re_frame.core');
goog.require('checkers.db');
goog.require('clojure.set');
goog.require('checkers.helpers');
goog.require('checkers.handlers');
checkers.ai.eval_score = (function checkers$ai$eval_score(cofx){
var db = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx);
var score = new cljs.core.Keyword(null,"score","score",-1963588780).cljs$core$IFn$_invoke$arity$1(db);
return ((score.cljs$core$IFn$_invoke$arity$1 ? score.cljs$core$IFn$_invoke$arity$1((0)) : score.call(null,(0))) - (score.cljs$core$IFn$_invoke$arity$1 ? score.cljs$core$IFn$_invoke$arity$1((1)) : score.call(null,(1))));
});
checkers.ai.minimax = (function checkers$ai$minimax(cofx,depth){
var db = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx);
var player = new cljs.core.Keyword(null,"turn","turn",75759344).cljs$core$IFn$_invoke$arity$1(db);
var moves = checkers.helpers.all_possible_moves_or_only_captures(db);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),depth)){
return checkers.ai.eval_score(cofx);
} else {
var scores = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (move){
var G__58129 = checkers.handlers.execute_move(cofx,move);
var G__58130 = (depth - (1));
return (checkers.ai.minimax.cljs$core$IFn$_invoke$arity$2 ? checkers.ai.minimax.cljs$core$IFn$_invoke$arity$2(G__58129,G__58130) : checkers.ai.minimax.call(null,G__58129,G__58130));
}),moves);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(player,"w")){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,scores);
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.min,scores);
}
}
});
checkers.ai.get_best_move_minmax = (function checkers$ai$get_best_move_minmax(cofx,color,depth){
var db = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx);
var turn = new cljs.core.Keyword(null,"turn","turn",75759344).cljs$core$IFn$_invoke$arity$1(db);
var moves = checkers.helpers.all_possible_moves_or_only_captures(db);
var moves_scores = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (move){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"move","move",-2110884309),move,new cljs.core.Keyword(null,"score","score",-1963588780),checkers.ai.minimax(checkers.handlers.execute_move(cofx,move),depth)], null);
}),moves);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(turn,color)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(color,"w")){
return new cljs.core.Keyword(null,"move","move",-2110884309).cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,new cljs.core.Keyword(null,"score","score",-1963588780),moves_scores));
} else {
return new cljs.core.Keyword(null,"move","move",-2110884309).cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.min_key,new cljs.core.Keyword(null,"score","score",-1963588780),moves_scores));
}
} else {
return null;
}
});

//# sourceMappingURL=checkers.ai.js.map
