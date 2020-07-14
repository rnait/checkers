goog.provide('checkers.ai');
goog.require('cljs.core');
goog.require('re_frame.core');
goog.require('checkers.db');
goog.require('clojure.set');
goog.require('checkers.helpers');
goog.require('checkers.handlers');
checkers.ai._PLUS_infinity = (9999999999);
checkers.ai._infinity = (-9999999999);
checkers.ai.max_depth = (10);
checkers.ai.pawn_pos_score = (function checkers$ai$pawn_pos_score(db){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.List.EMPTY,(function (){var iter__4529__auto__ = (function checkers$ai$pawn_pos_score_$_iter__54004(s__54005){
return (new cljs.core.LazySeq(null,(function (){
var s__54005__$1 = s__54005;
while(true){
var temp__5735__auto__ = cljs.core.seq(s__54005__$1);
if(temp__5735__auto__){
var s__54005__$2 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(s__54005__$2)){
var c__4527__auto__ = cljs.core.chunk_first(s__54005__$2);
var size__4528__auto__ = cljs.core.count(c__4527__auto__);
var b__54007 = cljs.core.chunk_buffer(size__4528__auto__);
if((function (){var i__54006 = (0);
while(true){
if((i__54006 < size__4528__auto__)){
var vec__54008 = cljs.core._nth(c__4527__auto__,i__54006);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54008,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54008,(1),null);
cljs.core.chunk_append(b__54007,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"b",new cljs.core.Keyword(null,"name","name",1843675177),"p"], null)))?((-1) * ((k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))) * (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))))):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"w",new cljs.core.Keyword(null,"name","name",1843675177),"p"], null)))?(((7) - (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0)))) * ((7) - (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))))):(0)
)));

var G__54034 = (i__54006 + (1));
i__54006 = G__54034;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__54007),checkers$ai$pawn_pos_score_$_iter__54004(cljs.core.chunk_rest(s__54005__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__54007),null);
}
} else {
var vec__54011 = cljs.core.first(s__54005__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54011,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54011,(1),null);
return cljs.core.cons(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"b",new cljs.core.Keyword(null,"name","name",1843675177),"p"], null)))?((-1) * ((k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))) * (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))))):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"w",new cljs.core.Keyword(null,"name","name",1843675177),"p"], null)))?(((7) - (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0)))) * ((7) - (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))))):(0)
)),checkers$ai$pawn_pos_score_$_iter__54004(cljs.core.rest(s__54005__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4529__auto__(new cljs.core.Keyword(null,"board","board",-1907017633).cljs$core$IFn$_invoke$arity$1(db));
})()));
});
checkers.ai.eval_score = (function checkers$ai$eval_score(cofx){
var db = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx);
var score = new cljs.core.Keyword(null,"score","score",-1963588780).cljs$core$IFn$_invoke$arity$1(db);
return (((1000) * ((score.cljs$core$IFn$_invoke$arity$1 ? score.cljs$core$IFn$_invoke$arity$1((0)) : score.call(null,(0))) - (score.cljs$core$IFn$_invoke$arity$1 ? score.cljs$core$IFn$_invoke$arity$1((1)) : score.call(null,(1))))));
});
checkers.ai.minimax = (function checkers$ai$minimax(cofx,depth){
var db = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx);
var player = new cljs.core.Keyword(null,"turn","turn",75759344).cljs$core$IFn$_invoke$arity$1(db);
var moves = checkers.helpers.all_possible_moves_or_only_captures(db);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),depth)){
return checkers.ai.eval_score(cofx);
} else {
var scores = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (move){
var G__54014 = checkers.handlers.execute_move(cofx,move);
var G__54015 = (depth - (1));
return (checkers.ai.minimax.cljs$core$IFn$_invoke$arity$2 ? checkers.ai.minimax.cljs$core$IFn$_invoke$arity$2(G__54014,G__54015) : checkers.ai.minimax.call(null,G__54014,G__54015));
}),moves);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(player,"w")){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,scores);
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.min,scores);
}
}
});
checkers.ai.minimax_reduce = (function checkers$ai$minimax_reduce(cofx,depth,alphaInit,betaInit){
var db = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx);
var player = new cljs.core.Keyword(null,"turn","turn",75759344).cljs$core$IFn$_invoke$arity$1(db);
var moves = checkers.helpers.all_possible_moves_or_only_captures(db);
var searchInitializer = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(player,"w"))?checkers.ai._infinity:checkers.ai._PLUS_infinity);
var compOperator = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(player,"w"))?cljs.core.max:cljs.core.min);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),depth)){
return checkers.ai.eval_score(cofx);
} else {
var score = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__54016,move){
var vec__54017 = p__54016;
var alpha = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54017,(0),null);
var beta = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54017,(1),null);
var best = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54017,(2),null);
var movedDb = checkers.handlers.execute_move(cofx,move);
var moveType = new cljs.core.Keyword(null,"last_move","last_move",-988603786).cljs$core$IFn$_invoke$arity$1(movedDb);
var newBest = (function (){var G__54023 = best;
var G__54024 = (function (){var G__54025 = movedDb;
var G__54026 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(moveType,new cljs.core.Keyword(null,"capture","capture",-677031143)))?depth:(depth - (1)));
var G__54027 = alpha;
var G__54028 = beta;
return (checkers.ai.minimax_reduce.cljs$core$IFn$_invoke$arity$4 ? checkers.ai.minimax_reduce.cljs$core$IFn$_invoke$arity$4(G__54025,G__54026,G__54027,G__54028) : checkers.ai.minimax_reduce.call(null,G__54025,G__54026,G__54027,G__54028));
})();
return (compOperator.cljs$core$IFn$_invoke$arity$2 ? compOperator.cljs$core$IFn$_invoke$arity$2(G__54023,G__54024) : compOperator.call(null,G__54023,G__54024));
})();
var vec__54020 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(player,"w"))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var x__4214__auto__ = newBest;
var y__4215__auto__ = alpha;
return ((x__4214__auto__ > y__4215__auto__) ? x__4214__auto__ : y__4215__auto__);
})(),beta], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [alpha,(function (){var x__4217__auto__ = newBest;
var y__4218__auto__ = beta;
return ((x__4217__auto__ < y__4218__auto__) ? x__4217__auto__ : y__4218__auto__);
})()], null));
var newAlpha = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54020,(0),null);
var newBeta = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54020,(1),null);
if((beta <= alpha)){
return cljs.core.reduced(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [newAlpha,newBeta,newBest], null));
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [newAlpha,newBeta,newBest], null);
}
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [alphaInit,betaInit,searchInitializer], null),moves);
return (score.cljs$core$IFn$_invoke$arity$1 ? score.cljs$core$IFn$_invoke$arity$1((2)) : score.call(null,(2)));
}
});
checkers.ai.get_best_move_minmax = (function checkers$ai$get_best_move_minmax(cofx,color,depth){
var db = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx);
var turn = new cljs.core.Keyword(null,"turn","turn",75759344).cljs$core$IFn$_invoke$arity$1(db);
var moves = checkers.helpers.all_possible_moves_or_only_captures(db);
var moves_scores = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (move){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"move","move",-2110884309),move,new cljs.core.Keyword(null,"score","score",-1963588780),checkers.ai.minimax_reduce(checkers.handlers.execute_move(cofx,move),depth,checkers.ai._infinity,checkers.ai._PLUS_infinity)], null);
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
checkers.ai.ai_best_move = (function checkers$ai$ai_best_move(cofx,color){
var turn = new cljs.core.Keyword(null,"turn","turn",75759344).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx));
var move = checkers.ai.get_best_move_minmax(cofx,color,(4));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(turn,color)){
return move;
} else {
return null;
}
});

//# sourceMappingURL=checkers.ai.js.map
