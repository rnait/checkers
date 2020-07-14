goog.provide('checkers.handlers');
goog.require('cljs.core');
goog.require('re_frame.core');
goog.require('checkers.db');
goog.require('clojure.set');
goog.require('checkers.helpers');
checkers.handlers.capture_piece_handler = (function checkers$handlers$capture_piece_handler(cofx,from,to,captureLoc){
var updatedDb = checkers.helpers.update_last_move(checkers.helpers.switch_pawns_to_queens(checkers.helpers.change_turn_or_show_mandatory_capture(checkers.helpers.end_move(checkers.helpers.move_piece(checkers.helpers.remove_piece(checkers.helpers.inc_score_with_capture(new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx),captureLoc),captureLoc),from,to)),to)),new cljs.core.Keyword(null,"capture","capture",-677031143));
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),updatedDb], null);
});
checkers.handlers.move_piece_handler = (function checkers$handlers$move_piece_handler(cofx,from,to){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.List.EMPTY,checkers.helpers.possible_captures_all_pieces_QMARK_(new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx)))){
return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),checkers.helpers.update_last_move(checkers.helpers.switch_pawns_to_queens(checkers.helpers.change_turn(checkers.helpers.end_move(checkers.helpers.move_piece(new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx),from,to)))),new cljs.core.Keyword(null,"move","move",-2110884309))], null));
} else {
return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx)], null));
}
});
checkers.handlers.execute_move = (function checkers$handlers$execute_move(cofx,move){
var map__53997 = move;
var map__53997__$1 = (((((!((map__53997 == null))))?(((((map__53997.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__53997.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53997):map__53997);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53997__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53997__$1,new cljs.core.Keyword(null,"to","to",192099007));
var captureLocation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53997__$1,new cljs.core.Keyword(null,"captureLocation","captureLocation",1730093554));
var G__53999 = new cljs.core.Keyword(null,"typeOfMove","typeOfMove",1686461361).cljs$core$IFn$_invoke$arity$1(move);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"move","move",-2110884309),G__53999)){
return checkers.handlers.move_piece_handler(cofx,from,to);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"capture","capture",-677031143),G__53999)){
return checkers.handlers.capture_piece_handler(cofx,from,to,captureLocation);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__53999)){
return cofx;
} else {
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__53999)].join('')));

}
}
}
});
checkers.handlers.show_piece_moves = (function checkers$handlers$show_piece_moves(db,p__54000){
var vec__54001 = p__54000;
var row = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54001,(0),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54001,(1),null);
var moves = checkers.helpers.possible_moves_QMARK_(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [row,col], null));
var winner = checkers.helpers.winner_QMARK_(db);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(null,winner)){
return db;
} else {
return checkers.helpers.show_moves(db,moves);
}
});

//# sourceMappingURL=checkers.handlers.js.map
