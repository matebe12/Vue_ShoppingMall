(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78f7fce0"],{"25ae":function(e,t,r){
/*!*
* @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
* For licensing, see LICENSE.md.
*/
!function(t,r){e.exports=r()}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){function r(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}function n(e,t){e.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,t(null,e))}}e.exports=function(e,t,a){var o=document.head||document.getElementsByTagName("head")[0],s=document.createElement("script");"function"==typeof t&&(a=t,t={}),t=t||{},a=a||function(){},s.type=t.type||"text/javascript",s.charset=t.charset||"utf8",s.async=!("async"in t)||!!t.async,s.src=e,t.attrs&&function(e,t){for(var r in t)e.setAttribute(r,t[r])}(s,t.attrs),t.text&&(s.text=""+t.text),("onload"in s?r:n)(s,a),s.onload||r(s,a),o.appendChild(s)}},function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n);let o;function s(e){if("CKEDITOR"in window)return Promise.resolve(CKEDITOR);if(e.length<1)throw new TypeError("CKEditor URL must be a non-empty string.");return o||(o=s.scriptLoader(e).then(e=>(o=void 0,e))),o}s.scriptLoader=e=>new Promise((t,r)=>{a()(e,e=>e?r(e):window.CKEDITOR?void t(CKEDITOR):r(new Error("Script loaded from editorUrl doesn't provide CKEDITOR namespace.")))});var i={name:"ckeditor",render(e){return e("div",{},[e(this.tagName)])},props:{value:{type:String,default:""},type:{type:String,default:"classic",validator:e=>["classic","inline"].includes(e)},editorUrl:{type:String,default:"https://cdn.ckeditor.com/4.14.0/standard-all/ckeditor.js"},config:{type:Object,default:()=>{}},tagName:{type:String,default:"textarea"},readOnly:{type:Boolean,default:null}},mounted(){s(this.editorUrl).then(()=>{if(this.$_destroyed)return;const e=this.config||{};null!==this.readOnly&&(e.readOnly=this.readOnly);const t="inline"===this.type?"inline":"replace",r=this.$el.firstElementChild,n=this.instance=CKEDITOR[t](r,e);n.on("instanceReady",()=>{const e=this.value;n.fire("lockSnapshot"),n.setData(e,{callback:()=>{this.$_setUpEditorEvents();const t=n.getData();e!==t?(this.$once("input",()=>{this.$emit("ready",n)}),this.$emit("input",t)):this.$emit("ready",n),n.fire("unlockSnapshot")}})})})},beforeDestroy(){this.instance&&this.instance.destroy(),this.$_destroyed=!0},watch:{value(e){this.instance&&this.instance.getData()!==e&&this.instance.setData(e)},readOnly(e){this.instance&&this.instance.setReadOnly(e)}},methods:{$_setUpEditorEvents(){const e=this.instance;e.on("change",t=>{const r=e.getData();this.value!==r&&this.$emit("input",r,t,e)}),e.on("focus",t=>{this.$emit("focus",t,e)}),e.on("blur",t=>{this.$emit("blur",t,e)})}}};const c={install(e){e.component("ckeditor",i)},component:i};t.default=c}]).default}))},3982:function(e,t,r){"use strict";var n=r("a753"),a=r.n(n);a.a},"6c48":function(e,t,r){"use strict";r.r(t);var n,a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"#container"}},[r("h1",[e._v("상품목록")]),r("h3",[e._v("total "+e._s(e.totalGoods))]),r("select",{directives:[{name:"model",rawName:"v-model",value:e.firstCategory,expression:"firstCategory"}],staticClass:"selectOption",on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.firstCategory=t.target.multiple?r:r[0]}}},[r("option",{attrs:{value:""}},[e._v(" 전체 ")]),e._l(e.getCategory.fmenu,(function(t,n){return r("option",{key:n,domProps:{value:t.CATEGORY_CODE}},[e._v(e._s(t.CATEGORY_NAME))])}))],2),r("select",{directives:[{name:"model",rawName:"v-model",value:e.secondCategory,expression:"secondCategory"}],staticClass:"selectOption",on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.secondCategory=t.target.multiple?r:r[0]}}},[r("option",{attrs:{value:""}},[e._v(" 전체 ")]),e._l(e.getCategory.smenu,(function(t,n){return r("option",{key:n,attrs:{value:""}},[e._v(e._s(t.CATEGORY_NAME))])}))],2),r("input",{directives:[{name:"model",rawName:"v-model",value:e.goodsname,expression:"goodsname"}],attrs:{type:"text",name:"",id:""},domProps:{value:e.goodsname},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchGoods()},input:function(t){t.target.composing||(e.goodsname=t.target.value)}}}),r("button",{on:{click:function(t){return e.searchGoods()}}},[e._v("검색")]),r("table",[e._m(0),r("tbody",e._l(e.goodsList,(function(t,n){return r("tr",{key:n},[r("td",[e._v(e._s(t.GDS_NUM))]),r("td",[r("img",{staticClass:"goodsImg",staticStyle:{width:"300px",height:"300px"},attrs:{src:""+e.getUrl+t.GDS_IMG}})]),r("td",[r("a",{attrs:{onclick:"javascript:void(0);"},on:{click:function(r){return e.openGoods(t)}}},[e._v(e._s(t.GDS_NAME))])]),r("td",[e._v(e._s(t.GDS_CATEGORY_NAME))]),r("td",[e._v(e._s(t.GDS_DATE))])])})),0)]),e.showModal?r("Modal",{attrs:{item:e.item},on:{closeModal:e.closeModal,refresh:e.refresh}}):e._e(),r("div",{staticClass:"tui-pagination",attrs:{id:"pagination"}})],1)},o=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("thead",[r("tr",[r("th",[e._v("번호")]),r("th",[e._v("상품")]),r("th",[e._v("이름")]),r("th",[e._v("카테고리")]),r("th",[e._v("등록날짜")])])])}],s=(r("96cf"),r("1da1")),i=r("a15b"),c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("transition",{attrs:{name:"modal"}},[r("div",{staticClass:"modal-mask"},[r("div",{staticClass:"modal-wrapper"},[r("div",{staticClass:"modal-container"},[r("div",{staticClass:"modal-header"},[r("h3",{attrs:{slot:"header"},slot:"header"},[e._v(" 상세정보 "),r("i",{staticClass:"fas fa-times closeModalBtn",staticStyle:{float:"right"},on:{click:e.closeModal}})])]),r("div",{staticClass:"modal-body"},[r("form",{ref:"form",attrs:{method:"post",autocomplete:"off",enctype:"application/x-www-form-urlencoded"}},[r("div",[r("div",{staticClass:"col-xs-3"},[r("label",[e._v("1차 분류")]),r("select",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],staticClass:"category1 form-control",attrs:{id:"firstOption",name:"category1"},on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selected=t.target.multiple?r:r[0]},e.SelectSecond]}},e._l(e.firstCategory,(function(t,n){return r("option",{key:n,domProps:{value:t.CATEGORY_CODE}},[e._v(e._s(t.CATEGORY_NAME))])})),0),r("label",[e._v("2차 분류")]),r("select",{directives:[{name:"model",rawName:"v-model",value:e.selected2,expression:"selected2"}],staticClass:"category2 form-control",attrs:{id:"secondOption",name:"category2"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selected2=t.target.multiple?r:r[0]}}},e._l(e.secondCategory,(function(t,n){return r("option",{key:n,domProps:{value:t.CATEGORY_CODE}},[e._v(" "+e._s(t.CATEGORY_NAME)+" ")])})),0)]),r("div",{staticClass:"col-xs-3"},[r("label",{attrs:{for:"GDS_NUM"}},[e._v("GDS_NUM")]),r("input",{staticClass:"form-control",attrs:{type:"text",id:"GDS_NUM",readonly:"",name:"GDS_NUM"},domProps:{value:e.item.GDS_NUM}})]),r("div",{staticClass:"col-xs-3"},[r("label",{attrs:{for:"GDS_NAME"}},[e._v("GDS_NAME")]),r("input",{staticClass:"form-control",attrs:{type:"text",id:"GDS_NAME",name:"GDS_NAME"},domProps:{value:e.item.GDS_NAME}})]),r("div",{staticClass:"col-xs-3"},[r("label",{attrs:{for:"GDS_PRICE"}},[e._v("GDS_PRICE")]),r("input",{staticClass:"form-control",attrs:{type:"text",id:"GDS_PRICE",name:"GDS_PRICE"},domProps:{value:e.parsePrice(e.item.GDS_PRICE)}})]),r("div",{staticClass:"col-xs-3"},[r("label",{attrs:{for:"GDS_STOCK"}},[e._v("GDS_STOCK")]),r("input",{staticClass:"form-control",attrs:{type:"text",id:"GDS_STOCK",name:"GDS_STOCK"},domProps:{value:e.item.GDS_STOCK}})]),r("div",{staticClass:"col-xs-3"},[r("label",{attrs:{for:"GDS_DATE"}},[e._v("GDS_DATE")]),r("input",{staticClass:"form-control",attrs:{type:"text",id:"GDS_DATE",readonly:"",name:"GDS_DATE"},domProps:{value:e.item.GDS_DATE}})]),r("div",{staticClass:"col-xs-3 img_scope"},[r("img",{ref:"image",attrs:{src:""+e.getUrl+e.item.GDS_IMG,width:"130px;",height:"80px;"}}),r("input",{ref:"files2",attrs:{type:"file",name:"sampleFile",id:"file",accept:"image/*"},on:{change:e.previewImg}})]),r("label",{attrs:{for:"GDS_DESC"}},[e._v("GDS_DESC")]),r("ckeditor",{attrs:{value:e.item.GDS_DESC,id:"GDS_DESC",name:"GDS_DESC"},model:{value:e.item.GDS_DESC,callback:function(t){e.$set(e.item,"GDS_DESC",t)},expression:"item.GDS_DESC"}}),r("div",{staticStyle:{"margin-top":"10px"}},[r("span",[r("i",{staticClass:"fas fa-edit fa-2x"},[r("a",{attrs:{href:"javascript:void(0);"},on:{click:e.updateGoods}},[e._v("수정")])])]),r("span",[r("i",{staticClass:"fas fa-trash-alt fa-2x",on:{click:e.deleteGoods}},[e._v("삭제")])])])],1)])])])])])])},l=[],u=(r("4de4"),r("d3b7"),r("ac1f"),r("3ca3"),r("5319"),r("ddb0"),r("2b3d"),r("25ae")),d=r.n(u),p={data:function(){return{selected:"",firstCategory:[],secondCategory:[],selected2:"",imgPath:"img"}},components:{ckeditor:d.a.component},computed:{getUrl:function(){return this.$store.state.url}},props:["item"],mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.firstCategory=e.getCategory().fmenu,e.selected=e.item.CATEGORY_REF,t.next=5,Object(i["c"])(e.item.CATEGORY_REF);case 5:r=t.sent,e.secondCategory=r.data,e.selected2=e.item.GDS_CATEGORY_CODE,t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),alert(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})))()},methods:{parsePrice:function(e){var t=parseInt(e.replace(/,/g,""));return t},getCategory:function(){var e=this.$store.state.category.category,t={};return t.fmenu=e.filter((function(e){return 1==e.CATEGORY_LEVEL})),t.smenu=e.filter((function(e){return 2==e.CATEGORY_LEVEL})),t},updateGoods:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=e.$refs.form,n=new FormData(r),""===n.get("category2")?n.append("GDS_CATEGORY_CODE",e.selected):n.append("GDS_CATEGORY_CODE",e.selected2),n.append("GDS_DESC",e.item.GDS_DESC),t.next=7,Object(i["g"])(n);case 7:alert("상품 수정완료"),e.closeModal(),e.$emit("refresh"),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),alert(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})))()},deleteGoods:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,r=confirm("상품을 삭제 하시겠습니까? "),!r){t.next=9;break}return n={GDS_NUM:e.item.GDS_NUM},t.next=6,Object(i["b"])(n);case 6:alert("상품이 삭제 되었습니다."),e.closeModal(),e.$emit("refresh");case 9:t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),alert(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))()},SelectSecond:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=document.getElementById("firstOption"),n=r.options[r.selectedIndex].value,t.next=5,Object(i["c"])(n);case 5:a=t.sent,e.secondCategory=a.data,t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),alert(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},closeModal:function(){this.$emit("closeModal")},previewImg:function(e){var t=e.target.files[0];this.$refs.image.src=URL.createObjectURL(t)}}},f=p,m=(r("3982"),r("2877")),v=Object(m["a"])(f,c,l,!1,null,"7bfde0b4",null),h=v.exports,g=r("40b9"),_=r("5528"),y={data:function(){return{firstCategory:"",secondCategory:"",goodsList:[],showModal:!1,item:{},selectCategory:"",goodsname:"",totalGoods:0}},computed:{getCategory:function(){for(var e=this.$store.state.category.category,t=[],r=[],n={},a=0;a<e.length;a++)1==e[a].CATEGORY_LEVEL?t.push(e[a]):e[a].CATEGORY_REF==this.firstCategory&&r.push(e[a]);return n.fmenu=t,n.smenu=r,n},getUrl:function(){return this.$store.state.url}},components:{Modal:h},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.$route.query,void 0==r.page&&(r.page=1),void 0==r.pageStart&&(r.pageStart=10*(r.page-1)),void 0==r.perPageNum&&(r.perPageNum=10),t.next=6,Object(i["e"])(r);case 6:a=t.sent,e.goodsList=a.data.result,e.totalGoods=a.data.result1[0].TOTAL_COUNT,n.setTotalItems(e.totalGoods),n._paginate(1*r.page);case 11:case"end":return t.stop()}}),t)})))()},mounted:function(){var e=this;n=Object(g["a"])("#pagination",10),n.on("beforeMove",function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t(r);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var t=function(t){e.searchGoods(t)}},methods:{searchGoods:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:n=_["a"].isNull(e)?e.page*=1:1,t.$router.push({query:{fcode:t.firstCategory,scode:t.secondCategory,page:n,pageStart:10*(n-1),perPageNum:10,gdsName:t.goodsname,t:(new Date).getTime()}});case 2:case"end":return r.stop()}}),r)})))()},openGoods:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.showModal=!0,t.item=e;case 2:case"end":return r.stop()}}),r)})))()},closeModal:function(){this.showModal=!this.showModal},refresh:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.searchGoods();case 1:case"end":return t.stop()}}),t)})))()}}},C=y,E=(r("e83d"),Object(m["a"])(C,a,o,!1,null,"88ae417a",null));t["default"]=E.exports},a753:function(e,t,r){},b3db:function(e,t,r){},e83d:function(e,t,r){"use strict";var n=r("b3db"),a=r.n(n);a.a}}]);
//# sourceMappingURL=chunk-78f7fce0.efcadbbe.js.map