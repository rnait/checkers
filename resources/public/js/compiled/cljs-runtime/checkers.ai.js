goog.provide('checkers.ai');
goog.require('cljs.core');
goog.require('re_frame.core');
goog.require('checkers.db');
goog.require('clojure.set');
goog.require('checkers.helpers');
goog.require('checkers.handlers');
checkers.ai._PLUS_infinity = (9999999999);
checkers.ai._infinity = (-9999999999);
checkers.ai.pawn_pos_score = (function checkers$ai$pawn_pos_score(db){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.List.EMPTY,(function (){var iter__4529__auto__ = (function checkers$ai$pawn_pos_score_$_iter__55954(s__55955){
return (new cljs.core.LazySeq(null,(function (){
var s__55955__$1 = s__55955;
while(true){
var temp__5735__auto__ = cljs.core.seq(s__55955__$1);
if(temp__5735__auto__){
var s__55955__$2 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_(s__55955__$2)){
var c__4527__auto__ = cljs.core.chunk_first(s__55955__$2);
var size__4528__auto__ = cljs.core.count(c__4527__auto__);
var b__55957 = cljs.core.chunk_buffer(size__4528__auto__);
if((function (){var i__55956 = (0);
while(true){
if((i__55956 < size__4528__auto__)){
var vec__55958 = cljs.core._nth(c__4527__auto__,i__55956);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55958,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55958,(1),null);
cljs.core.chunk_append(b__55957,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"b",new cljs.core.Keyword(null,"name","name",1843675177),"p"], null)))?((-1) * ((k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))) * (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))))):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"w",new cljs.core.Keyword(null,"name","name",1843675177),"p"], null)))?(((7) - (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0)))) * ((7) - (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))))):(0)
)));

var G__55992 = (i__55956 + (1));
i__55956 = G__55992;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__55957),checkers$ai$pawn_pos_score_$_iter__55954(cljs.core.chunk_rest(s__55955__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__55957),null);
}
} else {
var vec__55961 = cljs.core.first(s__55955__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55961,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55961,(1),null);
return cljs.core.cons(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"b",new cljs.core.Keyword(null,"name","name",1843675177),"p"], null)))?((-1) * ((k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))) * (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))))):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"w",new cljs.core.Keyword(null,"name","name",1843675177),"p"], null)))?(((7) - (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0)))) * ((7) - (k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1((0)) : k.call(null,(0))))):(0)
)),checkers$ai$pawn_pos_score_$_iter__55954(cljs.core.rest(s__55955__$2)));
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
return (((1000) * ((score.cljs$core$IFn$_invoke$arity$1 ? score.cljs$core$IFn$_invoke$arity$1((0)) : score.call(null,(0))) - (score.cljs$core$IFn$_invoke$arity$1 ? score.cljs$core$IFn$_invoke$arity$1((1)) : score.call(null,(1))))) + checkers.ai.pawn_pos_score(db));
});
checkers.ai.minimax = (function checkers$ai$minimax(cofx,depth){
var db = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx);
var player = new cljs.core.Keyword(null,"turn","turn",75759344).cljs$core$IFn$_invoke$arity$1(db);
var moves = checkers.helpers.all_possible_moves_or_only_captures(db);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),depth)){
return checkers.ai.eval_score(cofx);
} else {
var scores = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (move){
var G__55964 = checkers.handlers.execute_move(cofx,move);
var G__55965 = (depth - (1));
return (checkers.ai.minimax.cljs$core$IFn$_invoke$arity$2 ? checkers.ai.minimax.cljs$core$IFn$_invoke$arity$2(G__55964,G__55965) : checkers.ai.minimax.call(null,G__55964,G__55965));
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
var score = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__55966,move){
var vec__55967 = p__55966;
var alpha = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55967,(0),null);
var beta = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55967,(1),null);
var best = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55967,(2),null);
var movedDb = checkers.handlers.execute_move(cofx,move);
var moveType = new cljs.core.Keyword(null,"last_move","last_move",-988603786).cljs$core$IFn$_invoke$arity$1(movedDb);
var newBest = (function (){var G__55973 = best;
var G__55974 = (function (){var G__55975 = movedDb;
var G__55976 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(moveType,new cljs.core.Keyword(null,"capture","capture",-677031143)))?depth:(depth - (1)));
var G__55977 = alpha;
var G__55978 = beta;
return (checkers.ai.minimax_reduce.cljs$core$IFn$_invoke$arity$4 ? checkers.ai.minimax_reduce.cljs$core$IFn$_invoke$arity$4(G__55975,G__55976,G__55977,G__55978) : checkers.ai.minimax_reduce.call(null,G__55975,G__55976,G__55977,G__55978));
})();
return (compOperator.cljs$core$IFn$_invoke$arity$2 ? compOperator.cljs$core$IFn$_invoke$arity$2(G__55973,G__55974) : compOperator.call(null,G__55973,G__55974));
})();
var vec__55970 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(player,"w"))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var x__4214__auto__ = newBest;
var y__4215__auto__ = alpha;
return ((x__4214__auto__ > y__4215__auto__) ? x__4214__auto__ : y__4215__auto__);
})(),beta], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [alpha,(function (){var x__4217__auto__ = newBest;
var y__4218__auto__ = beta;
return ((x__4217__auto__ < y__4218__auto__) ? x__4217__auto__ : y__4218__auto__);
})()], null));
var newAlpha = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55970,(0),null);
var newBeta = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55970,(1),null);
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

//# sourceMappingURL=checkers.ai.js.map
