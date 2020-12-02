(this.webpackJsonpbooksclient=this.webpackJsonpbooksclient||[]).push([[0],{16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var o=n(0),c=n(1),s=n.n(c),a=n(9),r=n.n(a),u=(n(16),n(10)),i=n(2),l=n.n(i),p=n(4),b=n(3);n(8);var f=function(e){var t=e.addBook,n=e.setIsLoading,s=e.bookToEdit,a=e.setBooks,r=e.setMessage,u=Object(c.useState)(""),i=Object(b.a)(u,2),f=i[0],h=i[1],j=Object(c.useState)(""),d=Object(b.a)(j,2),k=d[0],O=d[1],m=Object(c.useState)(0),x=Object(b.a)(m,2),g=x[0],v=x[1];function y(){return(y=Object(p.a)(l.a.mark((function e(o){var c,s,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(!0),c={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(o)},e.prev=2,e.next=5,fetch("https://ssp-books-backend.herokuapp.com/books",c);case 5:return s=e.sent,e.next=8,s.json();case 8:a=e.sent,s.ok?(console.log("async createBook: received response ".concat(JSON.stringify(a))),t(a),r("Book added successfully."),console.log("createBook: done")):(console.log("async createBook: ERROR: ".concat(s.status," - ").concat(a.error," - ").concat(a.message)),r("".concat(a.message))),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(2),console.log(e.t0),r("Connection error.");case 16:n(!1);case 17:case"end":return e.stop()}}),e,null,[[2,12]])})))).apply(this,arguments)}function C(){return(C=Object(p.a)(l.a.mark((function e(n){var o,c,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s.title=f,s.author=k,s.sells=g,o={method:"PUT",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(n)},e.prev=4,e.next=7,fetch("".concat("https://ssp-books-backend.herokuapp.com/books","/").concat(n.id),o);case 7:return c=e.sent,e.next=10,c.json();case 10:u=e.sent,console.log(u),c.ok?(t(u),r("Book edited successfully."),console.log("createBook: done"),a(u)):r("".concat(u.message)),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(4),console.log(e.t0),r("Connection error.");case 19:case"end":return e.stop()}}),e,null,[[4,15]])})))).apply(this,arguments)}return Object(c.useEffect)((function(){s&&(h(s.title),O(s.author),v(s.sells))}),[s]),Object(o.jsxs)("form",{className:"form",onSubmit:function(e){return e.preventDefault()},children:["Title:",Object(o.jsx)("input",{className:"form__input",type:"text",onChange:function(e){return h(e.target.value)},value:f}),"Author:",Object(o.jsx)("input",{className:"form__input",type:"text",onChange:function(e){return O(e.target.value)},value:k}),"Sells:",Object(o.jsx)("input",{className:"form__input",type:"number",step:1e3,value:g,onChange:function(e){return v(parseInt(e.target.value))}}),Object(o.jsx)("button",{className:"form__button",onClick:function(){return function(e){return y.apply(this,arguments)}({title:f,author:k,sells:g})},children:"Bevestigen"}),Object(o.jsx)("button",{className:"form__button",onClick:null!==s?function(){return function(e){return C.apply(this,arguments)}(s)}:console.log("Deze boek bestaat niet."),children:"Bewerken"})]})};var h=function(){var e=Object(c.useState)([]),t=Object(b.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)(!1),r=Object(b.a)(a,2),i=r[0],h=r[1],j=Object(c.useState)(null),d=Object(b.a)(j,2),k=d[0],O=d[1],m=Object(c.useState)(""),x=Object(b.a)(m,2),g=x[0],v=x[1];function y(){return(y=Object(p.a)(l.a.mark((function e(t){var n,o,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"DELETE",headers:{"Content-Type":"application/json;charset=utf-8"}},e.prev=1,e.next=4,fetch("".concat("https://ssp-books-backend.herokuapp.com/books","/").concat(t.id),n);case 4:return o=e.sent,e.next=7,o.json();case 7:c=e.sent,o.ok?(v("Book deleted successfully."),s(c)):v("".concat(c.message)),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0),v("Connection error.");case 15:case"end":return e.stop()}}),e,null,[[1,11]])})))).apply(this,arguments)}return Object(c.useEffect)((function(){function e(){return(e=Object(p.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h(!0),e.prev=1,e.next=4,fetch("".concat("https://ssp-books-backend.herokuapp.com/books"));case 4:return t=e.sent,e.next=7,t.json();case 7:n=e.sent,s(n),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0),v("Connection error.");case 15:h(!1);case 16:case"end":return e.stop()}}),e,null,[[1,11]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(o.jsxs)("div",{className:"App",children:[!!i&&Object(o.jsx)("p",{children:"LOADING DATA"}),Object(o.jsx)("span",{children:g}),n.map((function(e){return Object(o.jsxs)("p",{className:"book",onClick:function(){return O(e)},style:{backgroundColor:"".concat(k===e?"grey":"transparent")},children:["title: ",e.title+" - ","author: ",e.author+" - ","sells: ",e.sells,Object(o.jsx)("button",{onClick:function(){return function(e){return y.apply(this,arguments)}(e)},children:"Delete"})]},e.id)})),Object(o.jsx)(f,{bookToEdit:k,setIsLoading:h,addBook:function(e){return s([].concat(Object(u.a)(n),[e]))},setBooks:s,setMessage:v})]})};r.a.render(Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsx)(h,{})}),document.getElementById("root"))},8:function(e,t,n){}},[[18,1,2]]]);
//# sourceMappingURL=main.fe7025bd.chunk.js.map