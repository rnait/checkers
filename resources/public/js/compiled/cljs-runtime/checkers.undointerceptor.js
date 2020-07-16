goog.provide('checkers.undointerceptor');
goog.require('cljs.core');
goog.require('re_frame.core');
goog.require('reagent.core');
goog.require('checkers.db');
if((typeof checkers !== 'undefined') && (typeof checkers.undointerceptor !== 'undefined') && (typeof checkers.undointerceptor.history !== 'undefined')){
} else {
checkers.undointerceptor.history = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stack","stack",-793405930),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [checkers.db.default_db], null),new cljs.core.Keyword(null,"step","step",1288888124),(0)], null));
}
checkers.undointerceptor.switch_step_history = (function checkers$undointerceptor$switch_step_history(step){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(checkers.undointerceptor.history,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"step","step",1288888124)], null),step);
});
checkers.undointerceptor.undo_interceptor = (function (){var G__55775 = new cljs.core.Keyword(null,"id","id",-1388402092);
var G__55776 = new cljs.core.Keyword(null,"undo","undo",-1818036302);
var G__55777 = new cljs.core.Keyword(null,"after","after",594996914);
var G__55778 = (function (context){
var db = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"effects","effects",-282369292),new cljs.core.Keyword(null,"db","db",993250759)], null));
var update_history = (function (h){
var newStep = (new cljs.core.Keyword(null,"step","step",1288888124).cljs$core$IFn$_invoke$arity$1(h) + (1));
console.log(cljs.core.prn_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["step: ",new cljs.core.Keyword(null,"step","step",1288888124).cljs$core$IFn$_invoke$arity$1(h)], 0)));

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc_in(h,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"step","step",1288888124)], null),newStep),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stack","stack",-793405930)], null),(function (p1__55774_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.take.cljs$core$IFn$_invoke$arity$2(newStep,p1__55774_SHARP_));
})),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"stack","stack",-793405930)], null),cljs.core.conj,db);
});
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(checkers.undointerceptor.history,update_history);

console.log("interceptor called");

return context;
});
return (re_frame.core.__GT_interceptor.cljs$core$IFn$_invoke$arity$4 ? re_frame.core.__GT_interceptor.cljs$core$IFn$_invoke$arity$4(G__55775,G__55776,G__55777,G__55778) : re_frame.core.__GT_interceptor.call(null,G__55775,G__55776,G__55777,G__55778));
})();

//# sourceMappingURL=checkers.undointerceptor.js.map
