!function(){"use strict";function e(e){var t=[];Array.from(document.querySelectorAll(".content-grid")).forEach(function(e){t.push(e.classList[1])});var n=document.querySelector(".active").classList,r=document.querySelector("."+e).classList;n[1]!=r[1]&&(t.indexOf(n[1])<t.indexOf(r[1])?(r.toggle("move-right"),n.toggle("move-left")):(r.toggle("move-left"),n.toggle("move-right")),n.remove("active"),r.add("active"),document.querySelector(".active-nav").classList.remove("active-nav"),document.querySelector(".nav-"+e).classList.add("active-nav"))}function t(){if(""==document.querySelector(".viewName").value)return void alert("Please give your view a name");if(document.querySelector(".viewName").value.split("").includes(" "))return void alert("View names cannot contain spaces");if(document.querySelectorAll(".selected").length<1)return void alert("View must contain at least one source");var t=document.querySelector(".viewName").value,n=[];console.log("sourceName: "+t),Array.from(document.querySelectorAll(".selected")).forEach(function(e){n.push(e.classList[1])}),console.log("sourceArray: "+n),document.querySelector(".modal").style.display="none";var r=JSON.parse(window.localStorage.getItem("Data"));null==r&&(r={}),r[t]=n;var o=JSON.stringify(r);window.localStorage.setItem("Data",o),i(),e(t)}function n(e){function n(){var e=this,t=!1;if(null!==document.querySelector(".selected")&&Array.from(document.querySelectorAll(".selected")).forEach(function(n){n.classList.contains(e.classList[1])&&(t=!0)}),console.log(t),!t){var n=document.createElement("p"),r=document.createTextNode(this.innerHTML);n.appendChild(r),n.classList.add("selected",this.classList[1]),document.querySelector(".selections").appendChild(n),Array.from(document.querySelectorAll(".selected")).forEach(function(e){return e.addEventListener("click",function(){e.parentNode.removeChild(e)})})}}console.log("revealModal fires"),""==e&&(Array.from(document.querySelector(".selections").getElementsByTagName("p")).forEach(function(e){e.parentNode.removeChild(e)}),document.querySelector(".viewName").value=""),document.querySelector(".modal").style.display="block";var r=JSON.parse(window.localStorage.getItem("Data"));if(null!==r&&""!==e){var o=r[e];Array.from(document.querySelector(".selections").getElementsByTagName("p")).forEach(function(e){e.parentNode.removeChild(e)}),o.forEach(function(e){var t=document.querySelector(".modal-content ."+e),n=document.createElement("p"),r=document.createTextNode(t.innerHTML);n.appendChild(r),n.classList.add("selected",t.classList[1]),document.querySelector(".selections").appendChild(n),Array.from(document.querySelectorAll(".selected")).forEach(function(e){return e.addEventListener("click",function(){e.parentNode.removeChild(e)})})}),document.querySelector(".viewName").value=e}document.querySelector(".add-selections").addEventListener("click",t),document.querySelector(".cancel").addEventListener("click",function(){document.querySelector(".modal").style.display="none"}),Array.from(document.querySelectorAll(".modal-content p")).forEach(function(e){return e.addEventListener("click",n)})}function r(e,t){return"https://newsapi.org/v2/"+e+"?"+t+"&apiKey=f1e5704e50ab42bf909e1a1598498713"}function o(e,t){if(null!=e.description&&null!=e.title&&null!=e.urlToImage){document.querySelector("."+t).innerHTML+="\n    <a class='article-grid' href='"+e.url+"' target='_blank'>\n      <div class='article-image'><img src="+e.urlToImage+"></div>\n      <div class='article-content'>\n        <p class='article-title'>"+(e.title.length>80?e.title.slice(0,79)+"...":e.title)+"</p>\n        <p class='article-body'>"+(e.description.length>140?e.description.slice(0,139)+"...":e.description)+"</p>\n        <p class='article-time'>"+e.publishedAt.slice(5,10)+" at "+e.publishedAt.slice(11,16)+" - "+e.source.name+"</p>\n      </div>\n    </a>\n  "}}function c(e,t){e.join(",");fetch(r("top-headlines","sources="+e)).then(function(e){return e.json()}).then(function(e){Array.from(e.articles).forEach(function(e){return o(e,t)})})}function a(){i(),"no"==u&&(document.querySelector(".edit-view").addEventListener("click",function(){document.querySelector(".active");n(document.querySelector(".active").classList[1])}),document.querySelector(".remove-view").addEventListener("click",function(){var e=JSON.parse(window.localStorage.getItem("Data"));delete e[document.querySelector(".active").classList[1]];var t=JSON.stringify(e);window.localStorage.setItem("Data",t),i()}),Array.from(document.querySelectorAll(".accordian")).forEach(function(e){return e.addEventListener("click",function(){var e=this.nextElementSibling;Array.from(document.querySelectorAll(".panel")).forEach(function(e){return e.classList.contains("panel-active")?e.classList.remove("panel-active"):null}),e.classList.add("panel-active")})}),u="yes")}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Array.from||(Array.from=function(){var e=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===e.call(t)},n=function(e){var t=Number(e);return isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*Math.floor(Math.abs(t)):t},r=Math.pow(2,53)-1,o=function(e){var t=n(e);return Math.min(Math.max(t,0),r)};return function(e){var n=this,r=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var c,a=arguments.length>1?arguments[1]:void 0;if(void 0!==a){if(!t(a))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(c=arguments[2])}for(var l,i=o(r.length),u=t(n)?Object(new n(i)):new Array(i),d=0;d<i;)l=r[d],u[d]=a?void 0===c?a(l,d):a.call(c,l,d):l,d+=1;return u.length=i,u}}()),Object.keys||(Object.keys=function(){var e=Object.prototype.hasOwnProperty,t=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=n.length;return function(o){if("function"!=typeof o&&("object"!==(void 0===o?"undefined":l(o))||null===o))throw new TypeError("Object.keys called on non-object");var c,a,i=[];for(c in o)e.call(o,c)&&i.push(c);if(t)for(a=0;a<r;a++)e.call(o,n[a])&&i.push(n[a]);return i}}());var i=function(){var t=document.querySelectorAll(".content-grid");t.length>0&&Array.from(t).forEach(function(e){return e.parentNode.removeChild(e)});var r=document.querySelectorAll("nav button");r.length>0&&Array.from(r).forEach(function(e){return e.parentNode.removeChild(e)});var o=[];if(null==window.localStorage.getItem("Data")||"{}"==window.localStorage.getItem("Data"))return document.querySelector(".intro-screen").style.display="flex",void document.querySelector(".create-custom").addEventListener("click",function(){n("")});document.querySelector(".intro-screen").style.display="none";var a=JSON.parse(window.localStorage.getItem("Data"));Object.keys(a).forEach(function(t){var n=document.querySelector("nav"),r=document.createElement("button"),l=document.createTextNode(t);r.appendChild(l),r.classList.add("nav-"+t),r.addEventListener("click",function(){e(t,o)}),n.appendChild(r);var i=document.createElement("div");i.classList.add("content-grid",t),document.querySelector("body").appendChild(i),c(a[t],t)});var l=document.querySelector("nav").getElementsByTagName("button");l[0].classList.add("active-nav"),Array.from(l).forEach(function(e){var t=document.querySelector("."+e.classList[0].slice(4));l[0]==e?t.classList.add("active"):t.classList.add("move-right")});var i=document.createElement("button"),u=document.createTextNode("+");i.appendChild(u),i.addEventListener("click",function(){n("")}),document.querySelector("nav").appendChild(i)},u="no";document.addEventListener("DOMContentLoaded",a)}();
