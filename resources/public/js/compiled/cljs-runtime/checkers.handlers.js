goog.provide('checkers.handlers');
goog.require('cljs.core');
goog.require('re_frame.core');
goog.require('checkers.db');
goog.require('clojure.set');
goog.require('checkers.helpers');
checkers.handlers.capture_piece_handler = (function checkers$handlers$capture_piece_handler(cofx,from,to,captureLoc){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),checkers.helpers.update_last_move(checkers.helpers.switch_pawns_to_queens(checkers.helpers.change_turn_or_show_mandatory_capture(checkers.helpers.end_move(checkers.helpers.move_piece(checkers.helpers.remove_piece(checkers.helpers.inc_score_with_capture(new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx),captureLoc),captureLoc),from,to)),to)),new cljs.core.Keyword(null,"capture","capture",-677031143)),new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"auto-play","auto-play",-645319501),"b"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"flush-dom","flush-dom",-933676816),true], null))], null);
});
checkers.handlers.move_piece_handler = (function checkers$handlers$move_piece_handler(cofx,from,to){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.List.EMPTY,checkers.helpers.possible_captures_all_pieces_QMARK_(new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx)))){
return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),checkers.helpers.update_last_move(checkers.helpers.switch_pawns_to_queens(checkers.helpers.change_turn(checkers.helpers.end_move(checkers.helpers.move_piece(new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx),from,to)))),new cljs.core.Keyword(null,"move","move",-2110884309)),new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"auto-play","auto-play",-645319501),"b"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"flush-dom","flush-dom",-933676816),true], null))], null));
} else {
return cljs.core.doall.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx)], null));
}
});
checkers.handlers.execute_move = (function checkers$handlers$execute_move(cofx,move){
var map__53799 = move;
var map__53799__$1 = (((((!((map__53799 == null))))?(((((map__53799.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__53799.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__53799):map__53799);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53799__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53799__$1,new cljs.core.Keyword(null,"to","to",192099007));
var captureLocation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53799__$1,new cljs.core.Keyword(null,"captureLocation","captureLocation",1730093554));
var G__53801 = new cljs.core.Keyword(null,"typeOfMove","typeOfMove",1686461361).cljs$core$IFn$_invoke$arity$1(move);
var G__53801__$1 = (((G__53801 instanceof cljs.core.Keyword))?G__53801.fqn:null);
switch (G__53801__$1) {
case "move":
return checkers.handlers.move_piece_handler(cofx,from,to);

break;
case "capture":
return checkers.handlers.capture_piece_handler(cofx,from,to,captureLocation);

break;
case "else":
return cofx;

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__53801__$1)].join('')));

}
});

//# sourceMappingURL=checkers.handlers.js.map
