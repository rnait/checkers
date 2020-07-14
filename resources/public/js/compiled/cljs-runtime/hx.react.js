goog.provide('hx.react');
goog.require('cljs.core');
goog.require('goog.object');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
goog.require('hx.hiccup');
goog.require('hx.utils');
hx.react.props__GT_clj = hx.utils.props__GT_clj;
hx.react.props = (function hx$react$props(el,first_arg,props_QMARK_){
if(cljs.core.truth_(((typeof el === 'string')?props_QMARK_:false))){
return hx.utils.clj__GT_props.cljs$core$IFn$_invoke$arity$1(first_arg);
} else {
if(cljs.core.truth_(props_QMARK_)){
return hx.utils.clj__GT_props.cljs$core$IFn$_invoke$arity$2(first_arg,false);
} else {
return null;

}
}
});
hx.react.fn_as_child = (function hx$react$fn_as_child(config,first_child,args){
return (function() { 
var G__55517__delegate = function (args__$1){
var ret = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(first_child,args__$1);
if(cljs.core.vector_QMARK_(ret)){
return hx.hiccup._as_element(ret,config);
} else {
return ret;
}
};
var G__55517 = function (var_args){
var args__$1 = null;
if (arguments.length > 0) {
var G__55518__i = 0, G__55518__a = new Array(arguments.length -  0);
while (G__55518__i < G__55518__a.length) {G__55518__a[G__55518__i] = arguments[G__55518__i + 0]; ++G__55518__i;}
  args__$1 = new cljs.core.IndexedSeq(G__55518__a,0,null);
} 
return G__55517__delegate.call(this,args__$1);};
G__55517.cljs$lang$maxFixedArity = 0;
G__55517.cljs$lang$applyTo = (function (arglist__55519){
var args__$1 = cljs.core.seq(arglist__55519);
return G__55517__delegate(args__$1);
});
G__55517.cljs$core$IFn$_invoke$arity$variadic = G__55517__delegate;
return G__55517;
})()
;
});
hx.react.create_element = (function hx$react$create_element(config,el,args){
var first_arg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(args,(0),null);
var props_QMARK_ = cljs.core.map_QMARK_(first_arg);
var props = hx.react.props(el,first_arg,props_QMARK_);
var children = ((props_QMARK_)?cljs.core._rest(args):args);
var first_child = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(children,(0),null);
var G__55472 = cljs.core.count(children);
switch (G__55472) {
case (0):
return module$node_modules$react$index.createElement(el,props);

break;
case (1):
if(goog.isFunction(first_child)){
return module$node_modules$react$index.createElement(el,props,hx.react.fn_as_child(config,first_child,args));
} else {
return module$node_modules$react$index.createElement(el,props,hx.hiccup._as_element(first_child,config));
}

break;
default:
return module$node_modules$react$index.createElement.apply(null,(function (){var a = [el,props];
var c = children;
while(true){
if((!((c == null)))){
a.push(hx.hiccup._as_element(cljs.core._first(c),config));

var G__55521 = a;
var G__55522 = cljs.core._next(c);
a = G__55521;
c = G__55522;
continue;
} else {
return a;
}
break;
}
})());

}
});
hx.react.react_hiccup_config = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"create-element","create-element",193243064),hx.react.create_element,new cljs.core.Keyword(null,"is-element?","is-element?",-1231778016),module$node_modules$react$index.isValidElement,new cljs.core.Keyword(null,"fragment","fragment",826775688),module$node_modules$react$index.Fragment], null);
hx.react.f = (function hx$react$f(form){
return hx.hiccup.parse(hx.react.react_hiccup_config,form);
});
hx.react.parse_body = (function hx$react$parse_body(body){
if(cljs.core.vector_QMARK_(body)){
return hx.react.f(body);
} else {
return body;
}
});
hx.react.fragment = module$node_modules$react$index.Fragment;
hx.hiccup.extend_tag(new cljs.core.Keyword(null,"<>","<>",1280186386),hx.react.fragment);
hx.react.Provider = (function hx$react$Provider(props__55448__auto__,maybe_ref__55449__auto__){
var vec__55474 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(hx.react.props__GT_clj.cljs$core$IFn$_invoke$arity$1 ? hx.react.props__GT_clj.cljs$core$IFn$_invoke$arity$1(props__55448__auto__) : hx.react.props__GT_clj.call(null,props__55448__auto__)),maybe_ref__55449__auto__], null);
var map__55477 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55474,(0),null);
var map__55477__$1 = (((((!((map__55477 == null))))?(((((map__55477.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__55477.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__55477):map__55477);
var context = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55477__$1,new cljs.core.Keyword(null,"context","context",-830191113));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55477__$1,new cljs.core.Keyword(null,"value","value",305978217));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55477__$1,new cljs.core.Keyword(null,"children","children",-940561982));
return hx.react.parse_body(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [context.Provider,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),value], null),children], null));
});

if(cljs.core.truth_(goog.DEBUG)){
goog.object.set(hx.react.Provider,"displayName","hx.react/Provider");
} else {
}
hx.hiccup.extend_tag(new cljs.core.Keyword(null,"provider","provider",-302056900),hx.react.Provider);
hx.react.$ = (function hx$react$$(var_args){
var args__4742__auto__ = [];
var len__4736__auto___55523 = arguments.length;
var i__4737__auto___55524 = (0);
while(true){
if((i__4737__auto___55524 < len__4736__auto___55523)){
args__4742__auto__.push((arguments[i__4737__auto___55524]));

var G__55525 = (i__4737__auto___55524 + (1));
i__4737__auto___55524 = G__55525;
continue;
} else {
}
break;
}

var argseq__4743__auto__ = ((((1) < args__4742__auto__.length))?(new cljs.core.IndexedSeq(args__4742__auto__.slice((1)),(0),null)):null);
return hx.react.$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4743__auto__);
});

(hx.react.$.cljs$core$IFn$_invoke$arity$variadic = (function (el,args){
return hx.hiccup.make_element(hx.react.react_hiccup_config,el,args);
}));

(hx.react.$.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(hx.react.$.cljs$lang$applyTo = (function (seq55479){
var G__55480 = cljs.core.first(seq55479);
var seq55479__$1 = cljs.core.next(seq55479);
var self__4723__auto__ = this;
return self__4723__auto__.cljs$core$IFn$_invoke$arity$variadic(G__55480,seq55479__$1);
}));

hx.react.assign_methods = (function hx$react$assign_methods(class$,method_map){
var seq__55481_55526 = cljs.core.seq(method_map);
var chunk__55482_55527 = null;
var count__55483_55528 = (0);
var i__55484_55529 = (0);
while(true){
if((i__55484_55529 < count__55483_55528)){
var vec__55491_55530 = chunk__55482_55527.cljs$core$IIndexed$_nth$arity$2(null,i__55484_55529);
var method_name_55531 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55491_55530,(0),null);
var method_fn_55532 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55491_55530,(1),null);
goog.object.set(class$.prototype,cljs.core.munge(cljs.core.name(method_name_55531)),method_fn_55532);


var G__55533 = seq__55481_55526;
var G__55534 = chunk__55482_55527;
var G__55535 = count__55483_55528;
var G__55536 = (i__55484_55529 + (1));
seq__55481_55526 = G__55533;
chunk__55482_55527 = G__55534;
count__55483_55528 = G__55535;
i__55484_55529 = G__55536;
continue;
} else {
var temp__5735__auto___55537 = cljs.core.seq(seq__55481_55526);
if(temp__5735__auto___55537){
var seq__55481_55538__$1 = temp__5735__auto___55537;
if(cljs.core.chunked_seq_QMARK_(seq__55481_55538__$1)){
var c__4556__auto___55539 = cljs.core.chunk_first(seq__55481_55538__$1);
var G__55540 = cljs.core.chunk_rest(seq__55481_55538__$1);
var G__55541 = c__4556__auto___55539;
var G__55542 = cljs.core.count(c__4556__auto___55539);
var G__55543 = (0);
seq__55481_55526 = G__55540;
chunk__55482_55527 = G__55541;
count__55483_55528 = G__55542;
i__55484_55529 = G__55543;
continue;
} else {
var vec__55494_55544 = cljs.core.first(seq__55481_55538__$1);
var method_name_55545 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55494_55544,(0),null);
var method_fn_55546 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55494_55544,(1),null);
goog.object.set(class$.prototype,cljs.core.munge(cljs.core.name(method_name_55545)),method_fn_55546);


var G__55547 = cljs.core.next(seq__55481_55538__$1);
var G__55548 = null;
var G__55549 = (0);
var G__55550 = (0);
seq__55481_55526 = G__55547;
chunk__55482_55527 = G__55548;
count__55483_55528 = G__55549;
i__55484_55529 = G__55550;
continue;
}
} else {
}
}
break;
}

return class$;
});
hx.react.create_class = (function hx$react$create_class(super_class,init_fn,static_properties,method_names){
var ctor = (function (props){
var this$ = this;
var seq__55497_55551 = cljs.core.seq(method_names);
var chunk__55498_55552 = null;
var count__55499_55553 = (0);
var i__55500_55554 = (0);
while(true){
if((i__55500_55554 < count__55499_55553)){
var method_55555 = chunk__55498_55552.cljs$core$IIndexed$_nth$arity$2(null,i__55500_55554);
goog.object.set(this$,cljs.core.munge(method_55555),goog.object.get(this$,cljs.core.munge(method_55555)).bind(this$));


var G__55556 = seq__55497_55551;
var G__55557 = chunk__55498_55552;
var G__55558 = count__55499_55553;
var G__55559 = (i__55500_55554 + (1));
seq__55497_55551 = G__55556;
chunk__55498_55552 = G__55557;
count__55499_55553 = G__55558;
i__55500_55554 = G__55559;
continue;
} else {
var temp__5735__auto___55560 = cljs.core.seq(seq__55497_55551);
if(temp__5735__auto___55560){
var seq__55497_55561__$1 = temp__5735__auto___55560;
if(cljs.core.chunked_seq_QMARK_(seq__55497_55561__$1)){
var c__4556__auto___55562 = cljs.core.chunk_first(seq__55497_55561__$1);
var G__55563 = cljs.core.chunk_rest(seq__55497_55561__$1);
var G__55564 = c__4556__auto___55562;
var G__55565 = cljs.core.count(c__4556__auto___55562);
var G__55566 = (0);
seq__55497_55551 = G__55563;
chunk__55498_55552 = G__55564;
count__55499_55553 = G__55565;
i__55500_55554 = G__55566;
continue;
} else {
var method_55567 = cljs.core.first(seq__55497_55561__$1);
goog.object.set(this$,cljs.core.munge(method_55567),goog.object.get(this$,cljs.core.munge(method_55567)).bind(this$));


var G__55568 = cljs.core.next(seq__55497_55561__$1);
var G__55569 = null;
var G__55570 = (0);
var G__55571 = (0);
seq__55497_55551 = G__55568;
chunk__55498_55552 = G__55569;
count__55499_55553 = G__55570;
i__55500_55554 = G__55571;
continue;
}
} else {
}
}
break;
}

return (init_fn.cljs$core$IFn$_invoke$arity$2 ? init_fn.cljs$core$IFn$_invoke$arity$2(this$,props) : init_fn.call(null,this$,props));
});
goog.inherits(ctor,super_class);

var seq__55501_55572 = cljs.core.seq(static_properties);
var chunk__55502_55573 = null;
var count__55503_55574 = (0);
var i__55504_55575 = (0);
while(true){
if((i__55504_55575 < count__55503_55574)){
var vec__55511_55576 = chunk__55502_55573.cljs$core$IIndexed$_nth$arity$2(null,i__55504_55575);
var k_55577 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55511_55576,(0),null);
var v_55578 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55511_55576,(1),null);
goog.object.set(ctor,k_55577,v_55578);


var G__55579 = seq__55501_55572;
var G__55580 = chunk__55502_55573;
var G__55581 = count__55503_55574;
var G__55582 = (i__55504_55575 + (1));
seq__55501_55572 = G__55579;
chunk__55502_55573 = G__55580;
count__55503_55574 = G__55581;
i__55504_55575 = G__55582;
continue;
} else {
var temp__5735__auto___55583 = cljs.core.seq(seq__55501_55572);
if(temp__5735__auto___55583){
var seq__55501_55585__$1 = temp__5735__auto___55583;
if(cljs.core.chunked_seq_QMARK_(seq__55501_55585__$1)){
var c__4556__auto___55586 = cljs.core.chunk_first(seq__55501_55585__$1);
var G__55587 = cljs.core.chunk_rest(seq__55501_55585__$1);
var G__55588 = c__4556__auto___55586;
var G__55589 = cljs.core.count(c__4556__auto___55586);
var G__55590 = (0);
seq__55501_55572 = G__55587;
chunk__55502_55573 = G__55588;
count__55503_55574 = G__55589;
i__55504_55575 = G__55590;
continue;
} else {
var vec__55514_55591 = cljs.core.first(seq__55501_55585__$1);
var k_55592 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55514_55591,(0),null);
var v_55593 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55514_55591,(1),null);
goog.object.set(ctor,k_55592,v_55593);


var G__55594 = cljs.core.next(seq__55501_55585__$1);
var G__55595 = null;
var G__55596 = (0);
var G__55597 = (0);
seq__55501_55572 = G__55594;
chunk__55502_55573 = G__55595;
count__55503_55574 = G__55596;
i__55504_55575 = G__55597;
continue;
}
} else {
}
}
break;
}

return ctor;
});
hx.react.create_component = (function hx$react$create_component(init_fn,static_properties,method_names){
return hx.react.create_class(module$node_modules$react$index.Component,init_fn,static_properties,method_names);
});
hx.react.create_pure_component = (function hx$react$create_pure_component(init_fn,static_properties,method_names){
return hx.react.create_class(module$node_modules$react$index.PureComponent,init_fn,static_properties,method_names);
});
/**
 * Just react/createContext
 */
hx.react.create_context = module$node_modules$react$index.createContext;
/**
 * Takes a React component, and creates a function that returns
 *   a new React element
 */
hx.react.factory = (function hx$react$factory(component){
return cljs.core.partial.cljs$core$IFn$_invoke$arity$2(hx.react.$,component);
});

//# sourceMappingURL=hx.react.js.map
