!function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){var a=n(1),r=n(2);a({slideCell:"#focus",titCell:".hd ul",mainCell:".bd ul",effect:"left",autoPlay:!0,autoPage:!0,switchLoad:"_src"}),r()},function(e,t){var n=function(e){e=e||{};var t={slideCell:e.slideCell||"#touchSlide",titCell:e.titCell||".hd li",mainCell:e.mainCell||".bd",effect:e.effect||"left",autoPlay:e.autoPlay||!1,delayTime:e.delayTime||200,interTime:e.interTime||2500,defaultIndex:e.defaultIndex||0,titOnClassName:e.titOnClassName||"on",autoPage:e.autoPage||!1,prevCell:e.prevCell||".prev",nextCell:e.nextCell||".next",pageStateCell:e.pageStateCell||".pageState",pnLoop:"undefined "==e.pnLoop||e.pnLoop,startFun:e.startFun||null,endFun:e.endFun||null,switchLoad:e.switchLoad||null},n=document.getElementById(t.slideCell.replace("#",""));if(!n)return!1;var a=function(e,t){e=e.split(" ");var n=[];t=t||document;var a=[t];for(var r in e)0!=e[r].length&&n.push(e[r]);for(var r in n){if(0==a.length)return!1;var l=[];for(var o in a)if("#"==n[r][0])l.push(document.getElementById(n[r].replace("#","")));else if("."==n[r][0])for(var i=a[o].getElementsByTagName("*"),s=0;s<i.length;s++){var u=i[s].className;u&&-1!=u.search(new RegExp("\\b"+n[r].replace(".","")+"\\b"))&&l.push(i[s])}else for(var i=a[o].getElementsByTagName(n[r]),s=0;s<i.length;s++)l.push(i[s]);a=l}return 0!=a.length&&a[0]!=t&&a},r=function(e,t){!e||!t||e.className&&-1!=e.className.search(new RegExp("\\b"+t+"\\b"))||(e.className+=(e.className?" ":"")+t)},l=function(e,t){!e||!t||e.className&&-1==e.className.search(new RegExp("\\b"+t+"\\b"))||(e.className=e.className.replace(new RegExp("\\s*\\b"+t+"\\b","g"),""))},o=t.effect,i=a(t.prevCell,n)[0],s=a(t.nextCell,n)[0],u=a(t.pageStateCell)[0],c=a(t.mainCell,n)[0];if(!c)return!1;var d,f,p=c.children.length,m=a(t.titCell,n),v=m?m.length:p,g=t.switchLoad,h=parseInt(t.defaultIndex),w=parseInt(t.delayTime),T=parseInt(t.interTime),b="false"!=t.autoPlay&&0!=t.autoPlay,y="false"!=t.autoPage&&0!=t.autoPage,C="false"!=t.pnLoop&&0!=t.pnLoop,x=h,L=null,N=null,E=null,P=0,S=0,I=0,M=0,O=/hp-tablet/gi.test(navigator.appVersion),k="ontouchstart"in window&&!O,F=k?"touchstart":"mousedown",B=k?"touchmove":"",D=k?"touchend":"mouseup",H=c.parentNode.clientWidth,A=p;if(0==v&&(v=p),y){v=p,m=m[0],m.innerHTML="";var W="";if(1==t.autoPage||"true"==t.autoPage)for(var R=0;v>R;R++)W+="<li>"+(R+1)+"</li>";else for(var R=0;v>R;R++)W+=t.autoPage.replace("$",R+1);m.innerHTML=W,m=m.children}"leftLoop"==o&&(A+=2,c.appendChild(c.children[0].cloneNode(!0)),c.insertBefore(c.children[p-1].cloneNode(!0),c.children[0])),d=function(e,t){var n=document.createElement("div");n.innerHTML=t,n=n.children[0];var a=e.cloneNode(!0);return n.appendChild(a),e.parentNode.replaceChild(n,e),c=a,n}(c,'<div class="tempWrap" style="overflow:hidden; position:relative;"></div>'),c.style.cssText="width:"+A*H+"px;position:relative;overflow:hidden;padding:0;margin:0;";for(var R=0;A>R;R++)c.children[R].style.cssText="display:table-cell;vertical-align:top;width:"+H+"px";var V=function(){"function"==typeof t.startFun&&t.startFun(h,v)},Y=function(){"function"==typeof t.endFun&&t.endFun(h,v)},z=function(e){var t=("leftLoop"==o?h+1:h)+e,n=function(e){for(var t=c.children[e].getElementsByTagName("img"),n=0;n<t.length;n++)t[n].getAttribute(g)&&(t[n].setAttribute("src",t[n].getAttribute(g)),t[n].removeAttribute(g))};if(n(t),"leftLoop"==o)switch(t){case 0:n(p);break;case 1:n(p+1);break;case p:n(0);break;case p+1:n(1)}},X=function(){H=d.clientWidth,c.style.width=A*H+"px";for(var e=0;A>e;e++)c.children[e].style.width=H+"px";_(-("leftLoop"==o?h+1:h)*H,0)};window.addEventListener("resize",X,!1);var _=function(e,t,n){n=n?n.style:c.style,n.webkitTransitionDuration=n.MozTransitionDuration=n.msTransitionDuration=n.OTransitionDuration=n.transitionDuration=t+"ms",n.webkitTransform="translate("+e+"px,0)translateZ(0)",n.msTransform=n.MozTransform=n.OTransform="translateX("+e+"px)"},j=function(e){switch(o){case"left":h>=v?h=e?h-1:0:0>h&&(h=e?0:v-1),null!=g&&z(0),_(-h*H,w),x=h;break;case"leftLoop":null!=g&&z(0),_(-(h+1)*H,w),-1==h?(N=setTimeout(function(){_(-v*H,0)},w),h=v-1):h==v&&(N=setTimeout(function(){_(-H,0)},w),h=0),x=h}V(),E=setTimeout(function(){Y()},w);for(var n=0;v>n;n++)l(m[n],t.titOnClassName),n==h&&r(m[n],t.titOnClassName);0==C&&(l(s,"nextStop"),l(i,"prevStop"),0==h?r(i,"prevStop"):h==v-1&&r(s,"nextStop")),u&&(u.innerHTML="<span>"+(h+1)+"</span>/"+v)};if(j(),b&&(L=setInterval(function(){h++,j()},T)),m)for(var R=0;v>R;R++)!function(){var e=R;m[e].addEventListener("click",function(){clearTimeout(N),clearTimeout(E),h=e,j()})}();s&&s.addEventListener("click",function(){(1==C||h!=v-1)&&(clearTimeout(N),clearTimeout(E),h++,j())}),i&&i.addEventListener("click",function(){(1==C||0!=h)&&(clearTimeout(N),clearTimeout(E),h--,j())});var U=function(e){clearTimeout(N),clearTimeout(E),f=void 0,I=0;var t=k?e.touches[0]:e;P=t.pageX,S=t.pageY,c.addEventListener(B,Z,!1),c.addEventListener(D,$,!1)},Z=function(e){if(!k||!(e.touches.length>1||e.scale&&1!==e.scale)){var t=k?e.touches[0]:e;if(I=t.pageX-P,M=t.pageY-S,void 0===f&&(f=!!(f||Math.abs(I)<Math.abs(M))),!f){switch(e.preventDefault(),b&&clearInterval(L),o){case"left":(0==h&&I>0||h>=v-1&&0>I)&&(I*=.4),_(-h*H+I,0);break;case"leftLoop":_(-(h+1)*H+I,0)}null!=g&&Math.abs(I)>H/3&&z(I>-0?-1:1)}}},$=function(e){0!=I&&(e.preventDefault(),f||(Math.abs(I)>H/10&&(I>0?h--:h++),j(!0),b&&(L=setInterval(function(){h++,j()},T))),c.rveEventListener(B,Z,!1),c.removeEventListener(D,$,!1))};c.addEventListener(F,U,!1)};e.exports=n},function(e,t){var n=function(e){var t,n=0==arguments.length?{src:"xsrc",time:300}:{src:e.src||"xsrc",time:e.time||300},a=function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})};return this.getStyle=function(e,t){var n,r;return 2==arguments.length&&(n=e.style[a(t)],n||(document.defaultView&&document.defaultView.getComputedStyle?(r=document.defaultView.getComputedStyle(e,null),n=r?r.getPropertyValue(t):null):e.currentStyle&&(n=e.currentStyle[a(t)])),"auto"==n?"":n)},(t=function(){var e,a,r,l,o=window.pageYOffset?window.pageYOffset:window.document.documentElement.scrollTop,i=o+Number(window.innerHeight?window.innerHeight:document.documentElement.clientHeight),s=document.images,u=s.length;if(!u)return!1;for(e=0;u>e;e++)a=s[e].getAttribute(n.src),r=s[e],l=r.nodeName.toLowerCase(),r&&(postPage=r.getBoundingClientRect().top+window.document.documentElement.scrollTop+window.document.body.scrollTop,postWindow=postPage+Number(this.getStyle(r,"height").replace("px","")),(postPage>o&&i>postPage||postWindow>o&&i>postWindow)&&("img"===l&&null!==a&&r.setAttribute("src",a),r=null));window.onscroll=function(){setTimeout(function(){t()},n.time)}})()};e.exports=n}]);