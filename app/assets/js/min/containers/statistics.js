!function e(t,a,n){function r(l,i){if(!a[l]){if(!t[l]){var u="function"==typeof require&&require;if(!i&&u)return u(l,!0);if(s)return s(l,!0);var c=new Error("Cannot find module '"+l+"'");throw c.code="MODULE_NOT_FOUND",c}var o=a[l]={exports:{}};t[l][0].call(o.exports,function(e){var a=t[l][1][e];return r(a?a:e)},o,o.exports,e,t,a,n)}return a[l].exports}for(var s="function"==typeof require&&require,l=0;l<n.length;l++)r(n[l]);return r}({1:[function(e,t,a){function n(e){var t=$('#refresh-window a[href="#'+e+'"]'),a=t.closest(".btn-group").removeClass("open");b=e,app.storage.set("refresh-statistics",e),a.find(".caption").text("refresh / "+t.text()).blur()}function r(){b&&b>0&&ReactDOM.render(React.createElement(E,null),document.getElementById("data")),setTimeout(r,1e3*Math.max(1,b))}function s(e){var t=$(".client-filters").hide(),a=!1,n=0;if(t.find("ul.dropdown-menu").html(""),$.map(e,function(e){a||d.client!=e.key||(a=e.value),n++}),a&&t.find(".caption").text(a),n<=1)return $(".line-charts").css({width:"70%"}),void $(".pie-charts").show();var r='<li><a href="#-1">All</a></li>';$.map(e,function(e){r+='<li><a href="#'+e.key+'">'+e.value+"</a></li>"}),t.find("ul.dropdown-menu").html(r),t.fadeIn(),$("#client-filter .dropdown-menu a").click(function(e){var t=$(this),a=t.closest(".btn-group").removeClass("open");a.find(".caption").text(t.text()).blur(),d.client=t.attr("href").substring(1),d.client!=-1?($(".line-charts").css({width:"70%"}),$(".pie-charts").show()):($(".pie-charts").hide(),$(".line-charts").css({width:"95%"})),app.func.stop(e)})}function l(e){var t=$(".label-filters").hide(),a=!1,n=0;if(t.find("ul.dropdown-menu").html(""),$.map(e,function(e){a||d.label!=app.func.hash(e.key+"->"+e.value)||(a=e.value),n++}),a||d.label!=-1||(a="Not Labeled"),a&&t.find(".caption").text(a),!(n<=1)){var r='<li><a href="#0">All</a></li>',s="";r+='<li><a href="#-1">Not Labeled</a></li>',$.map(e,function(e){s!=e.key&&(r+='<li class="dropdown-header">'+e.key+"</li>",s=e.key);var t=e.value;t.length>20&&(t=t.substring(0,20)+".."),t="&nbsp;&nbsp;&nbsp;&nbsp;"+t,r+='<li><a href="#'+app.func.hash(e.key+"->"+e.value)+'">'+t+"</a></li>"}),t.find("ul.dropdown-menu").html(r),t.fadeIn(),$("#label-filter .dropdown-menu a").click(function(e){var t=$(this),a=t.closest(".btn-group").removeClass("open");if(a.find(".caption").text(t.text().trim()).blur(),d.label=t.attr("href").substring(1),window.history&&window.history.pushState){var n=0==d.label?"/statistics":"/statistics?l="+d.label;history.pushState(null,null,n)}app.func.stop(e)})}}function i(e,t,a,n){var r=!1;return $.map(e,function(e){e.key==a&&(r=e)}),r?(r.indexes.push(t),void r.values.push(n)):void e.push({key:a,indexes:[t],values:[n]})}function u(e,t){$.map(e,function(e){e.indexes[0]<=t-20&&(e.indexes.shift(),e.values.shift())})}function c(e,t){for(var a=e.length-1;a>=0;a--)t[e[a].key]||e.splice(a,1)}function o(e,t){return e?" @"+t.replace(/^.*:\/\//,"").replace(/:.*$/,""):""}function p(e,t,a){var n=!1;return f.previous&&$.map(f.previous,function(r){r.client.endpoint==e&&(n=r.stats[t][a])}),n}var d={client:app.func.query("c",-1),label:parseInt(app.func.query("l","0"),10)},m=[],f={previous:[],current:[]},h=[],v=[],b=app.storage.get("refresh-statistics",2),y=0,g=0;$(document).ready(function(){$("#menu-statistics").addClass("active"),y=parseInt($("#number-of-clients").val(),10),n(b),$("#refresh-window a").click(function(e){n(parseInt($(this).attr("href").substring(1),10)),app.func.stop(e)}),app.func.ajax({url:"/api/containers",data:{status:3},success:function(e){m=e;var t=[],a=[],n={clients:{},labels:{}},i=$("#filter-label-ids").val();$.map(m,function(e){n.clients[""+e.client.id]=e.client.endpoint.replace(/^.*:\/\//,"").replace(/:.*$/,""),$.map(e.containers,function(e){e.labels&&$.map(e.labels,function(e,t){"all"!=i&&i.indexOf(t)==-1||(n.labels[t]||(n.labels[t]={}),n.labels[t][e]=!0)})})}),$.map(n.clients,function(e,a){t.push({key:a,value:e})}),$.map(n.labels,function(e,t){$.map(e,function(e,n){a.push({key:t,value:n})})}),t.sort(function(e,t){return e.value<t.value?-1:e.value>t.value?1:0}),a.sort(function(e,t){return e.key<t.key?-1:e.key>t.key?1:e.value<t.value?-1:e.value>t.value?1:0}),s(t),l(a),r()}})});var _=nv.models.lineChart().x(function(e){return e[0]}).y(function(e){return e[1]/100}).color(d3.scale.category10().range()).showLegend(!1).useInteractiveGuideline(!0);_.xAxis.tickFormat(function(e){return d3.time.format("%X")(new Date(e))}),_.yAxis.tickFormat(d3.format(",.1%")),nv.utils.windowResize(_.update);var x=nv.models.lineChart().x(function(e){return e[0]}).y(function(e){return e[1]/100}).color(d3.scale.category10().range()).showLegend(!1).useInteractiveGuideline(!0);x.xAxis.tickFormat(function(e){return d3.time.format("%X")(new Date(e))}),x.yAxis.tickFormat(d3.format(",.1%")),nv.utils.windowResize(x.update);var k=nv.models.pieChart().x(function(e){return e.label}).y(function(e){return e.value}).color(d3.scale.category10().range()).showLegend(!1).showLabels(!0).labelThreshold(.05).labelType("percent").donut(!0).donutRatio(.35),w=nv.models.pieChart().x(function(e){return e.label}).y(function(e){return e.value}).color(d3.scale.category10().range()).showLegend(!1).showLabels(!0).labelThreshold(.05).labelType("percent").donut(!0).donutRatio(.35),R=React.createClass({displayName:"TableRow",render:function(){var e=this.props.content.name,t=this.props.content.current&&this.props.content.current,a=this.props.content.previous&&this.props.content.previous[0],n=0,r=0,s=0;a&&t&&t.cpu_stats&&(n=t.cpu_stats.cpu_usage.total_usage-a.cpu_stats.cpu_usage.total_usage,r=t.cpu_stats.system_cpu_usage-a.cpu_stats.system_cpu_usage),r>0&&n>0&&(s=100*n/r*t.cpu_stats.cpu_usage.percpu_usage.length);var l="",i={usage:"-",max:"-",limit:"-",percent:0},u={"in":"",out:"",inPacket:"",outPacket:""};return t&&t.read&&(l=t.read.substring(5,19).replace(/-/,"/").replace("T"," "),i={usage:app.func.byteFormat(t.memory_stats.usage),max:app.func.byteFormat(t.memory_stats.max_usage),percent:100*t.memory_stats.usage/t.memory_stats.limit},u={"in":app.func.byteFormat(t.networks.eth0.rx_bytes),out:app.func.byteFormat(t.networks.eth0.tx_bytes)}),React.createElement("tr",{key:this.props.index},React.createElement("td",{className:"data-name"},e.substring(1).replace(",/",", ")),React.createElement("td",{className:"data-name"},l),React.createElement("td",{className:"data-name"},(s+"").substring(0,4),"%"),React.createElement("td",{className:"data-name"},i.usage," / ",i.max),React.createElement("td",{className:"data-name"},(i.percent+"").substring(0,4),"%"),React.createElement("td",{className:"data-name"},u["in"]," / ",u.out))}}),E=React.createClass({displayName:"Table",getInitialState:function(){return{data:{stats:[],multiple:!1}}},load:function(e){var t={};d.client!=-1&&(t.client=d.client),app.func.ajax({url:"/api/statistics",data:t,success:function(t){g++,t.sort(function(e,t){return e.client.endpoint<t.client.endpoint?-1:e.client.endpoint>t.client.endpoint?1:0});var a={};$.map(m,function(e){$.map(e.containers,function(e){if(0==d.label||d.label==-1&&!e.labels)a[e.id]=!0;else{if(!e.labels)return;var t=!1;$.map(e.labels,function(e,a){t|=d.label==app.func.hash(a+"->"+e)}),t&&(a[e.id]=!0)}})}),t.error?(f.previous=!0,f.current=t):(f.previous=f.current,f.current=t);var n=[];$.map(t,function(e){$.map(e.stats,function(t,r){a[r]&&$.map(t,function(t,a){n.push({client:e.client,id:r,key:a,stat:t&&t[0]})})})}),n.sort(function(e,t){var a=e.key+e.client.endpoint,n=t.key+t.client.endpoint;return a<n?-1:a>n?1:0}),e.setState({data:{stats:n,multiple:t.length>1}});var r={},s={CPU:[],Mem:[]},l=t.length>1;if($.map(n,function(e,t){var a=e.client,n=e.key.substring(1).replace(",/",", ")+o(l,a.endpoint),u=e.stat,c=new Date(u.read.substring(0,19)+"Z").getTime(),d=p(a.endpoint,e.id,e.key),m=0,f=0,b=0,y=0;d&&d.length>0&&(d=d[0]),d&&u&&u.cpu_stats&&(m=u.cpu_stats.cpu_usage.total_usage-d.cpu_stats.cpu_usage.total_usage,f=u.cpu_stats.system_cpu_usage-d.cpu_stats.system_cpu_usage),f>0&&m>0&&(b=100*m/f*u.cpu_stats.cpu_usage.percpu_usage.length),u&&(y=100*u.memory_stats.usage/u.memory_stats.limit),i(h,g,n,[c,b]),s.CPU.push({label:n,value:b}),i(v,g,n,[c,y]),s.Mem.push({label:n,value:y}),r[n]=!0}),u(h,g),u(v,g),c(h,r),c(v,r),nv.addGraph(function(){d3.select("#chart-cpu svg.line-charts").datum(h).call(_);var e=d3.max(h,function(e){return d3.max(e.values,function(e){return(e[1]+.1)/100})});return _.yDomain([0,e])}),(y=1)||d.client!=-1){var b=100;$.map(s.CPU,function(e){b-=e.value}),s.CPU.push({label:"-",value:b}),d3.select("#chart-cpu svg.pie-charts").datum(s.CPU).transition().duration(350).call(k)}if(nv.addGraph(function(){d3.select("#chart-mem svg.line-charts").datum(v).call(x);var e=d3.max(v,function(e){return(e.values[e.values.length-1][1]+.5)/100});return x.yDomain([0,e])}),(y=1)||d.client!=-1){var b=100;$.map(s.Mem,function(e){b-=e.value}),s.Mem.push({label:"-",value:b}),d3.select("#chart-mem svg.pie-charts").datum(s.Mem).transition().duration(350).call(w)}}})},componentDidMount:function(){this.load(this)},componentWillReceiveProps:function(){this.load(this)},render:function(){var e=this.state.data.multiple,t=this.state.data.stats,a=[];return $.map(t,function(t,n){var r=t.client,s=t.key+o(e,r.endpoint);a.push(React.createElement(R,{key:t.key+"@"+r.id,index:t.key+"@"+n,content:{name:s,current:t.stat,previous:p(r.endpoint,t.id,t.key)}}))}),React.createElement("table",{className:"table table-striped table-hover"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"ID"),React.createElement("th",null,"Time"),React.createElement("th",null,"CPU %"),React.createElement("th",null,"MEM USAGE / MAX"),React.createElement("th",null,"MEM %"),React.createElement("th",null,"NET I/O"))),React.createElement("tbody",null,a))}});ReactDOM.render(React.createElement(E,null),document.getElementById("data"))},{}]},{},[1]);