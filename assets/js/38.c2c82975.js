(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{384:function(t,a,e){},590:function(t,a,e){"use strict";e(384)},605:function(t,a,e){"use strict";e.r(a);e(139);var s={data:()=>({list:[],dragItemId:null,stageConfig:{width:600,height:900,draggable:!0}}),methods:{handleCacheChange(t){t.target.checked?this.$refs.group.getNode().cache():this.$refs.group.getNode().clearCache()}},mounted(){for(let t=0;t<300;t++)this.list.push({id:Math.round(1e4*Math.random()).toString(),x:Math.random()+600,y:900*Math.random(),rotation:180*Math.random(),scale:Math.random()})}},i=(e(590),e(25)),o=Object(i.a)(s,(function(){var t=this._self._c;return t("div",[t("v-stage",{ref:"stage",attrs:{config:this.stageConfig}},[t("v-layer",{ref:"layer"},[t("v-group",{ref:"group"},this._l(this.list,(function(a){return t("v-star",{key:a.id,attrs:{config:{x:a.x,y:a.y,rotation:a.rotation,id:a.id,numPoints:5,innerRadius:30,outerRadius:50,fill:"#89b717",opacity:.8,shadowColor:"black",shadowBlur:10,shadowOpacity:.8,scaleX:a.scale,scaleY:a.scale}}})})),1)],1)],1),this._v(" "),t("div",{staticClass:"cache"},[t("input",{attrs:{type:"checkbox"},on:{change:this.handleCacheChange}}),this._v(" cache shapes")])],1)}),[],!1,null,"efcfa62e",null);a.default=o.exports}}]);