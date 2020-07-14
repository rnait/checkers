goog.provide('hx.hiccup');
goog.require('cljs.core');
goog.require('clojure.walk');
goog.require('hx.utils');

/**
 * @interface
 */
hx.hiccup.IElement = function(){};

var hx$hiccup$IElement$_as_element$dyn_55412 = (function (el,config){
var x__4428__auto__ = (((el == null))?null:el);
var m__4429__auto__ = (hx.hiccup._as_element[goog.typeOf(x__4428__auto__)]);
if((!((m__4429__auto__ == null)))){
return (m__4429__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4429__auto__.cljs$core$IFn$_invoke$arity$2(el,config) : m__4429__auto__.call(null,el,config));
} else {
var m__4426__auto__ = (hx.hiccup._as_element["_"]);
if((!((m__4426__auto__ == null)))){
return (m__4426__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4426__auto__.cljs$core$IFn$_invoke$arity$2(el,config) : m__4426__auto__.call(null,el,config));
} else {
throw cljs.core.missing_protocol("IElement.-as-element",el);
}
}
});
/**
 * Converts to an element
 */
hx.hiccup._as_element = (function hx$hiccup$_as_element(el,config){
if((((!((el == null)))) && ((!((el.hx$hiccup$IElement$_as_element$arity$2 == null)))))){
return el.hx$hiccup$IElement$_as_element$arity$2(el,config);
} else {
return hx$hiccup$IElement$_as_element$dyn_55412(el,config);
}
});

if((typeof hx !== 'undefined') && (typeof hx.hiccup !== 'undefined') && (typeof hx.hiccup.tag_registry !== 'undefined')){
} else {
hx.hiccup.tag_registry = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
hx.hiccup.extend_tag = (function hx$hiccup$extend_tag(tag,impl){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(hx.hiccup.tag_registry,cljs.core.assoc,tag,impl);
});
hx.hiccup.tag__GT_impl = (function hx$hiccup$tag__GT_impl(tag){
var temp__5733__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(hx.hiccup.tag_registry),tag,null);
if(cljs.core.truth_(temp__5733__auto__)){
var t = temp__5733__auto__;
return t;
} else {
return cljs.core.name(tag);
}
});
hx.hiccup.parse_tag = (function hx$hiccup$parse_tag(el){
if((el instanceof cljs.core.Keyword)){
return hx.hiccup.tag__GT_impl(el);
} else {
if(cljs.core.var_QMARK_(el)){
return (function() { 
var hx$hiccup$parse_tag_$_VarEl__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(el,args);
};
var hx$hiccup$parse_tag_$_VarEl = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__55430__i = 0, G__55430__a = new Array(arguments.length -  0);
while (G__55430__i < G__55430__a.length) {G__55430__a[G__55430__i] = arguments[G__55430__i + 0]; ++G__55430__i;}
  args = new cljs.core.IndexedSeq(G__55430__a,0,null);
} 
return hx$hiccup$parse_tag_$_VarEl__delegate.call(this,args);};
hx$hiccup$parse_tag_$_VarEl.cljs$lang$maxFixedArity = 0;
hx$hiccup$parse_tag_$_VarEl.cljs$lang$applyTo = (function (arglist__55431){
var args = cljs.core.seq(arglist__55431);
return hx$hiccup$parse_tag_$_VarEl__delegate(args);
});
hx$hiccup$parse_tag_$_VarEl.cljs$core$IFn$_invoke$arity$variadic = hx$hiccup$parse_tag_$_VarEl__delegate;
return hx$hiccup$parse_tag_$_VarEl;
})()
;
} else {
return el;

}
}
});
hx.hiccup.make_element = (function hx$hiccup$make_element(config,el,args){
var fexpr__55408 = new cljs.core.Keyword(null,"create-element","create-element",193243064).cljs$core$IFn$_invoke$arity$1(config);
return (fexpr__55408.cljs$core$IFn$_invoke$arity$3 ? fexpr__55408.cljs$core$IFn$_invoke$arity$3(config,el,args) : fexpr__55408.call(null,config,el,args));
});
hx.hiccup.parse = (function hx$hiccup$parse(config,hiccup){
return hx.hiccup.make_element(config,hx.hiccup.parse_tag(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(hiccup,(0))),cljs.core.rest(hiccup));
});
hx.hiccup.ex = (function hx$hiccup$ex(s){
return (new Error(s));
});
goog.object.set(hx.hiccup.IElement,"null",true);

goog.object.set(hx.hiccup._as_element,"null",(function (_,___$1){
return null;
}));

goog.object.set(hx.hiccup.IElement,"number",true);

goog.object.set(hx.hiccup._as_element,"number",(function (n,_){
return n;
}));

goog.object.set(hx.hiccup.IElement,"string",true);

goog.object.set(hx.hiccup._as_element,"string",(function (s,_){
return s;
}));

(cljs.core.PersistentVector.prototype.hx$hiccup$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.hx$hiccup$IElement$_as_element$arity$2 = (function (form,config){
var form__$1 = this;
return hx.hiccup.make_element(config,hx.hiccup.parse_tag(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(form__$1,(0))),cljs.core.rest(form__$1));
}));

(cljs.core.LazySeq.prototype.hx$hiccup$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.hx$hiccup$IElement$_as_element$arity$2 = (function (a,config){
var a__$1 = this;
return hx.hiccup.make_element(config,new cljs.core.Keyword(null,"fragment","fragment",826775688).cljs$core$IFn$_invoke$arity$1(config),cljs.core.cons(null,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__55409_SHARP_){
return hx.hiccup._as_element(p1__55409_SHARP_,config);
}),a__$1)));
}));

goog.object.set(hx.hiccup.IElement,"array",true);

goog.object.set(hx.hiccup._as_element,"array",(function (a,config){
return hx.hiccup.make_element(config,new cljs.core.Keyword(null,"fragment","fragment",826775688).cljs$core$IFn$_invoke$arity$1(config),cljs.core.cons(null,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__55410_SHARP_){
return hx.hiccup._as_element(p1__55410_SHARP_,config);
}),a)));
}));

goog.object.set(hx.hiccup.IElement,"_",true);

goog.object.set(hx.hiccup._as_element,"_",(function (el,config){
if(cljs.core.truth_((function (){var fexpr__55411 = new cljs.core.Keyword(null,"is-element?","is-element?",-1231778016).cljs$core$IFn$_invoke$arity$1(config);
return (fexpr__55411.cljs$core$IFn$_invoke$arity$1 ? fexpr__55411.cljs$core$IFn$_invoke$arity$1(el) : fexpr__55411.call(null,el));
})())){
return el;
} else {
throw hx.hiccup.ex(["Unknown element type ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.type(el)], 0))," found while parsing hiccup form: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(el.toString())].join(''));

}
}));

//# sourceMappingURL=hx.hiccup.js.map
