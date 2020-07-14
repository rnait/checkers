goog.provide('hx.utils');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('goog.object');
hx.utils.keyword__GT_str = (function hx$utils$keyword__GT_str(k){
var kw_ns = cljs.core.namespace(k);
var kw_name = cljs.core.name(k);
if((kw_ns == null)){
return kw_name;
} else {
return [kw_ns,"/",kw_name].join('');
}
});
hx.utils.props__GT_clj = (function hx$utils$props__GT_clj(props){
var ks = Object.keys(props);
var m = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if((ks == null)){
return m;
} else {
var k = cljs.core.first(ks);
var v = goog.object.get(props,k);
var G__55393 = cljs.core.next(ks);
var G__55394 = (function (){var G__55347 = k;
switch (G__55347) {
case "class":
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,new cljs.core.Keyword(null,"className","className",-1983287057),v,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"class","class",-2030961996),v], 0));

break;
case "className":
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,new cljs.core.Keyword(null,"className","className",-1983287057),v,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"class","class",-2030961996),v], 0));

break;
case "htmlFor":
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,new cljs.core.Keyword(null,"htmlFor","htmlFor",-1050291720),v,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"for","for",-1323786319),v], 0));

break;
default:
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k),v);

}
})();
ks = G__55393;
m = G__55394;
continue;
}
break;
}
});
hx.utils.set_obj = (function hx$utils$set_obj(o,k,v){
goog.object.set(o,k,v);

return o;
});
/**
 * Join the `classes` with a whitespace.
 */
hx.utils.join_classes = (function hx$utils$join_classes(classes){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,classes));
});
hx.utils.class_name = (function hx$utils$class_name(x){
if((((x == null)) || ((x instanceof cljs.core.Keyword)) || (typeof x === 'string'))){
return x;
} else {
if(((cljs.core.sequential_QMARK_(x)) || (cljs.core.set_QMARK_(x)))){
return hx.utils.join_classes(x);
} else {
return x;

}
}
});
/**
 * Returns camel case version of the string, e.g. "http-equiv" becomes "httpEquiv".
 */
hx.utils.camel_case_STAR_ = (function hx$utils$camel_case_STAR_(s){
if((((s instanceof cljs.core.Keyword)) || (typeof s === 'string') || ((s instanceof cljs.core.Symbol)))){
var vec__55361 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(s),/-/);
var seq__55362 = cljs.core.seq(vec__55361);
var first__55363 = cljs.core.first(seq__55362);
var seq__55362__$1 = cljs.core.next(seq__55362);
var first_word = first__55363;
var words = seq__55362__$1;
if(((cljs.core.empty_QMARK_(words)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("aria",first_word)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("data",first_word)))){
return s;
} else {
return clojure.string.join.cljs$core$IFn$_invoke$arity$1(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.capitalize,words),first_word));
}
} else {
return s;
}
});
hx.utils.map__GT_camel_PLUS_js = (function hx$utils$map__GT_camel_PLUS_js(x){
if(cljs.core.map_QMARK_(x)){
var ps = cljs.core.seq(x);
var o = ({});
while(true){
if((ps == null)){
return o;
} else {
var p = cljs.core.first(ps);
var k = cljs.core.key(p);
var v = cljs.core.val(p);
hx.utils.set_obj(o,hx.utils.camel_case_STAR_(cljs.core.name(k)),(hx.utils.map__GT_camel_PLUS_js.cljs$core$IFn$_invoke$arity$1 ? hx.utils.map__GT_camel_PLUS_js.cljs$core$IFn$_invoke$arity$1(v) : hx.utils.map__GT_camel_PLUS_js.call(null,v)));

var G__55397 = cljs.core.next(ps);
var G__55398 = o;
ps = G__55397;
o = G__55398;
continue;
}
break;
}
} else {
return x;

}
});
/**
 * Shallowly converts props map to a JS obj. Handles certain special cases:
 * 
 *   1. `:class` -> "className", and joins collections together as a string
 *   2. `:for` -> "htmlFor"
 *   3. `:style` -> deeply converts this prop to a JS obj
 * 
 *   By default, converts kebab-case keys to camelCase strings. pass in `false`
 *   as a second arg to disable this.
 */
hx.utils.clj__GT_props = (function hx$utils$clj__GT_props(var_args){
var G__55373 = arguments.length;
switch (G__55373) {
case 1:
return hx.utils.clj__GT_props.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return hx.utils.clj__GT_props.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(hx.utils.clj__GT_props.cljs$core$IFn$_invoke$arity$1 = (function (props){
return hx.utils.clj__GT_props.cljs$core$IFn$_invoke$arity$2(props,true);
}));

(hx.utils.clj__GT_props.cljs$core$IFn$_invoke$arity$2 = (function (props,native_QMARK_){
var pxs = cljs.core.seq(props);
var js_props = ({});
while(true){
if((pxs == null)){
return js_props;
} else {
var p = cljs.core.first(pxs);
var k = cljs.core.key(p);
var v = cljs.core.val(p);
var G__55376_55400 = k;
var G__55376_55401__$1 = (((G__55376_55400 instanceof cljs.core.Keyword))?G__55376_55400.fqn:null);
switch (G__55376_55401__$1) {
case "style":
hx.utils.set_obj(js_props,"style",hx.utils.map__GT_camel_PLUS_js(v));

break;
case "class":
if(cljs.core.truth_(native_QMARK_)){
hx.utils.set_obj(js_props,"className",hx.utils.class_name(v));
} else {
hx.utils.set_obj(js_props,"class",hx.utils.class_name(v));

hx.utils.set_obj(js_props,"className",hx.utils.class_name(v));
}

break;
case "for":
if(cljs.core.truth_(native_QMARK_)){
hx.utils.set_obj(js_props,"htmlFor",v);
} else {
hx.utils.set_obj(js_props,"for",v);

hx.utils.set_obj(js_props,"htmlFor",v);
}

break;
default:
hx.utils.set_obj(js_props,(cljs.core.truth_(native_QMARK_)?hx.utils.camel_case_STAR_(hx.utils.keyword__GT_str(k)):hx.utils.keyword__GT_str(k)),v);

}

var G__55406 = cljs.core.next(pxs);
var G__55407 = js_props;
pxs = G__55406;
js_props = G__55407;
continue;
}
break;
}
}));

(hx.utils.clj__GT_props.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=hx.utils.js.map
