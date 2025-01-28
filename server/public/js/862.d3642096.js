"use strict";(self["webpackChunkvue2"]=self["webpackChunkvue2"]||[]).push([[862],{1862:function(t,e,i){i.r(e),i.d(e,{default:function(){return $}});var s=i(3740),a=i(3698),r=i(2938),n=i(4414),o=i(3449),l=i(6814),d=i(9991),c=i(6930),h=i(8983),m=i(7296),u=i(8924),p=i(7683),g=i(2756),v=i(1034),b=i(7112),f=i(198),S=function(){var t=this,e=t._self._c;return e(o.A,[e(l.A,{staticClass:"elevation-1 mt-n2",attrs:{headers:t.headers,items:t.items,loading:t.isLoading,search:t.search},scopedSlots:t._u([{key:"top",fn:function(){return[e(f.A,{attrs:{flat:""}},[e("div",{staticStyle:{width:"400px"}},[e(b.A,{attrs:{filled:"",rounded:"",dense:"","hide-details":"",placeholder:"Search","append-icon":"mdi-filter-variant"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),e(v.A),e(d.A,{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function({on:i,attrs:a}){return[e(s.A,t._g(t._b({staticClass:"mb-2",attrs:{color:"#000033",dark:"",small:""}},"v-btn",a,!1),i),[t._v(" New Debtor ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e(a.A,[e(r.ri,[e("span",{staticClass:"text-h5"},[t._v(t._s(t.formTitle))])]),e(r.OQ,[e(o.A,[e(g.A,[e(n.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{label:"Name",outlined:""},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1),e(n.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{label:"Credit Limit",type:"number",outlined:""},model:{value:t.editedItem.creditLimit,callback:function(e){t.$set(t.editedItem,"creditLimit",e)},expression:"editedItem.creditLimit"}})],1),e(n.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{label:"Available Credit",type:"number",outlined:""},model:{value:t.editedItem.availableCredit,callback:function(e){t.$set(t.editedItem,"availableCredit",e)},expression:"editedItem.availableCredit"}})],1),e(n.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{label:"Address",outlined:""},model:{value:t.editedItem.address,callback:function(e){t.$set(t.editedItem,"address",e)},expression:"editedItem.address"}})],1),e(n.A,{attrs:{cols:"12"}},[e(b.A,{attrs:{label:"Contact",outlined:""},model:{value:t.editedItem.contact,callback:function(e){t.$set(t.editedItem,"contact",e)},expression:"editedItem.contact"}})],1)],1)],1)],1),e(r.SL,[e(v.A),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("Cancel")]),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.save}},[t._v("Save")])],1)],1)],1),e(d.A,{attrs:{"max-width":"500px"},model:{value:t.dialogDelete,callback:function(e){t.dialogDelete=e},expression:"dialogDelete"}},[e(a.A,[e(r.ri,{staticClass:"text-h5"},[t._v("Are you sure you want to delete this item?")]),e(r.SL,[e(v.A),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.closeDelete}},[t._v("Cancel")]),e(s.A,{attrs:{color:"blue darken-1",text:""},on:{click:t.deleteItemConfirm}},[t._v("OK")]),e(v.A)],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function({item:i}){return[e(p.A,{attrs:{bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function({attrs:i,on:a}){return[e(s.A,t._g(t._b({attrs:{icon:""}},"v-btn",i,!1),a),[e(c.A,[t._v("mdi-dots-vertical")])],1)]}}],null,!0)},[e(h.A,t._l(t.actions,(function(s,a){return e(m.A,{key:a,on:{click:function(e){return t.handleAction(s.title,i)}}},[e(u.UZ,[t._v(t._s(s.title))])],1)})),1)],1)]}}],null,!0)})],1)},y=[],A=(i(4114),i(5353)),x={name:"DebtorPage",data:()=>({dialog:!1,dialogDelete:!1,search:"",isLoading:!1,headers:[{text:"Name",align:"start",sortable:!1,value:"name"},{text:"Credit Limit",align:"start",sortable:!1,value:"creditLimit"},{text:"Available Credit",align:"start",sortable:!1,value:"availableCredit"},{text:"Address",align:"start",sortable:!1,value:"address"},{text:"Contact",align:"start",sortable:!1,value:"contact"},{text:"Actions",value:"actions",sortable:!1}],items:[],editedIndex:-1,editedItem:{name:"",creditLimit:0,availableCredit:0,address:"",contact:""},defaultItem:{name:"",creditLimit:0,availableCredit:0,address:"",contact:""},itemId:null,actions:[{title:"View Profile"},{title:"Edit"},{title:"Delete"}]}),computed:{formTitle(){return-1===this.editedIndex?"New Debtor":"Edit Debtor"}},watch:{dialog(t){t||this.close()},dialogDelete(t){t||this.closeDelete()}},created(){this.initialize()},methods:{...(0,A.i0)({getItems:"debtor/getDebtors",addItem:"debtor/addDebtor",removeItem:"debtor/deleteDebtor",updateItem:"debtor/updateDebtor"}),async initialize(){this.isLoading=!0;try{const t=await this.getItems();this.items=t}catch(t){console.error("Error fetching debtors:",t)}finally{this.isLoading=!1}},editItem(t){this.editedIndex=this.items.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem(t){this.editedIndex=this.items.indexOf(t),this.itemId=t._id,this.editedItem=Object.assign({},t),this.dialogDelete=!0},async deleteItemConfirm(){try{await this.removeItem(this.itemId),this.items.splice(this.editedIndex,1),this.closeDelete()}catch(t){console.error("Error deleting debtor:",t)}},close(){this.dialog=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},closeDelete(){this.dialogDelete=!1,this.$nextTick((()=>{this.editedItem=Object.assign({},this.defaultItem),this.editedIndex=-1}))},async save(){try{if(this.editedIndex>-1)await this.updateItem(this.editedItem),Object.assign(this.items[this.editedIndex],this.editedItem);else{const t=await this.addItem(this.editedItem);this.items.push(t)}this.close()}catch(t){console.error("Error saving debtor:",t)}},handleAction(t,e){switch(t){case"View Profile":this.$router.push(`/debtors/${e._id}`);break;case"Edit":this.editItem(e);break;case"Delete":this.deleteItem(e);break;default:break}}}},I=x,_=i(1656),C=(0,_.A)(I,S,y,!1,null,null,null),$=C.exports},3449:function(t,e,i){i.d(e,{A:function(){return n}});i(158),i(125);var s=i(5471);function a(t){return s["default"].extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:i,data:s,children:a}){s.staticClass=`${t} ${s.staticClass||""}`.trim();const{attrs:r}=s;if(r){s.attrs={};const t=Object.keys(r).filter((t=>{if("slot"===t)return!1;const e=r[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}));t.length&&(s.staticClass+=` ${t.join(" ")}`)}return i.id&&(s.domProps=s.domProps||{},s.domProps.id=i.id),e(i.tag,s,a)}})}var r=i(8041),n=a("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:i,children:s}){let a;const{attrs:n}=i;return n&&(i.attrs={},a=Object.keys(n).filter((t=>{if("slot"===t)return!1;const e=n[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),e.id&&(i.domProps=i.domProps||{},i.domProps.id=e.id),t(e.tag,(0,r.Ay)(i,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(a||[])}),s)}})},5420:function(t,e,i){i.d(e,{A:function(){return u}});i(4114);var s=i(1677),a=i(7282),r=i(5803),n=i(4152),o=(0,r.A)(a.A).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio(){return Number(this.aspectRatio)},aspectStyle(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},(0,n.$c)(this))}},render(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),l=o,d=i(3381),c=i(8041),h=i(1920);const m="undefined"!==typeof window&&"IntersectionObserver"in window;var u=(0,r.A)(l,d.A).extend({name:"v-img",directives:{intersect:s.A},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc(){return this.src&&"object"===typeof this.src?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];const t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push(`linear-gradient(${this.gradient})`),e&&t.push(`url("${e}")`);const i=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[i]):i}},watch:{src(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted(){this.init()},methods:{init(t,e,i){if(!m||i||this.eager){if(this.normalisedSrc.lazySrc){const t=new Image;t.src=this.normalisedSrc.lazySrc,this.pollForSize(t,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError(){this.hasError=!0,this.$emit("error",this.src)},getSrc(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage(){const t=new Image;this.image=t,t.onload=()=>{t.decode?t.decode().catch((t=>{(0,h.OP)(`Failed to decode image, trying to render anyway\n\nsrc: ${this.normalisedSrc.src}`+(t.message?`\nOriginal error: ${t.message}`:""),this)})).then(this.onLoad):this.onLoad()},t.onerror=this.onError,this.hasError=!1,this.sizes&&(t.sizes=this.sizes),this.normalisedSrc.srcset&&(t.srcset=this.normalisedSrc.srcset),t.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(t),this.getSrc()},pollForSize(t,e=100){const i=()=>{const{naturalHeight:s,naturalWidth:a}=t;s||a?(this.naturalWidth=a,this.calculatedAspectRatio=a/s):t.complete||!this.isLoading||this.hasError||null==e||setTimeout(i,e)};i()},genContent(){const t=l.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:`${this.naturalWidth}px`}}),t},__genPlaceholder(){const t=(0,n.$c)(this,"placeholder");if(t){const e=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},t)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},e):e[0]}}},render(t){const e=l.options.render.call(this,t),i=(0,c.Ay)(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:m?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,i,e.children)}})},198:function(t,e,i){i.d(e,{A:function(){return o}});i(4114);var s=i(8184),a=i(5420),r=i(4152),n=i(1920),o=s.A.extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:()=>({isExtended:!1}),computed:{computedHeight(){const t=this.computedContentHeight;if(!this.isExtended)return t;const e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes(){return{...s.A.options.computed.classes.call(this),"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent}},isCollapsed(){return this.collapse},isProminent(){return this.prominent},styles(){return{...this.measurableStyles,height:(0,r.Dg)(this.computedHeight)}}},created(){const t=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];t.forEach((([t,e])=>{this.$attrs.hasOwnProperty(t)&&(0,n.q4)(t,e,this)}))},methods:{genBackground(){const t={height:(0,r.Dg)(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(a.A,{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:(0,r.Dg)(this.computedContentHeight)}},(0,r.$c)(this))},genExtension(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:(0,r.Dg)(this.extensionHeight)}},(0,r.$c)(this,"extension"))}},render(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;const e=[this.genContent()],i=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,i,e)}})}}]);
//# sourceMappingURL=862.d3642096.js.map