(()=>{"use strict";var e={};function t(e,t,n){var r=n.inactiveButtonClass;!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(r),t.disabled=!1):(t.classList.add(r),t.disabled=!0)}function n(e){var t;"escape"===(null===(t=e.key)||void 0===t?void 0:t.toLowerCase())&&o(document.querySelector(".popup_active"))}function r(e){e.classList.add("popup_active"),document.addEventListener("keydown",n)}function o(e){e.classList.remove("popup_active"),document.removeEventListener("keydown",n)}e.p="";var c=function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))},a=function(e,t){return fetch(e,t).then(c)},u={baseUrl:"https://nomoreparties.co/v1/plus-cohort-19",headers:{authorization:"d4f12ba4-cfb9-42d3-9303-686a046acbd3","Content-Type":"application/json"}};function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p,e.p;var l,s,d=document.getElementById("card-template").content,p=document.querySelector(".cards-gallery"),f=document.querySelector(".profile__avatar-container"),v=document.querySelector(".profile__avatar"),m=document.querySelector(".profile__name"),_=document.querySelector(".profile__subtitle"),y=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__add-button"),b=document.querySelectorAll(".popup"),S=document.querySelector(".popup_type_edit-avatar"),g=document.querySelector(".popup_type_edit-profile"),q=document.querySelector(".popup_type_add-card"),E=document.querySelector(".popup_type_delete-card"),L=document.querySelector(".popup_type_card"),C=S.querySelector(".popup__form"),k=g.querySelector(".popup__form"),w=q.querySelector(".popup__form"),x=E.querySelector(".popup__form"),A=document.getElementById("avatar-input"),U=document.getElementById("username-input"),B=document.getElementById("user-description-input"),I=document.getElementById("place-name-input"),T=document.getElementById("place-link-input"),j=L.querySelector(".popup__image"),O=L.querySelector(".popup__image-caption");function D(e,t,n,o,c){var i=d.querySelector(".card").cloneNode(!0),p=i.querySelector(".card__image");i.querySelector(".card__title").textContent=t,p.src=n,p.alt=t,i.dataset.id=c,p.addEventListener("click",(function(){r(L),j.src=n,j.alt=t,O.textContent=t}));var f=i.querySelector(".card__like-button"),v=i.querySelector(".card__likes-number");e&&(e.length>0&&(v.textContent=e.length),e.forEach((function(e){e._id===l&&f.classList.add("card__like-button_active")})),f.addEventListener("click",(function(){return function(e,t,n){Array.from(t.classList).includes("card__like-button_active")?function(e){return a("".concat(u.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:u.headers})}(e).then((function(e){n.textContent=e.likes.length,function(e){e.classList.remove("card__like-button_active")}(t)})).catch((function(e){console.log("olala, we've the error: ".concat(e))})):function(e){return a("".concat(u.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:u.headers})}(e).then((function(e){n.textContent=e.likes.length,function(e){e.classList.add("card__like-button_active")}(t)})).catch((function(e){console.log("olala, we've the error: ".concat(e))}))}(c,f,v)})));var m=i.querySelector(".card__delete-button");return l===o?m.addEventListener("click",(function(){s=c,r(E)})):m.remove(),i}function P(e){p.prepend(e)}function N(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".popup__button",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"popup__button_inactive";e.reset(),e.querySelector(t).classList.add(n),e.querySelector(t).disabled=!0}function J(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".popup__button";e.querySelector(t).textContent="Сохранение..."}function H(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".popup__button";e.querySelector(n).textContent=t}Promise.all([a("".concat(u.baseUrl,"/users/me"),{headers:u.headers}),a("".concat(u.baseUrl,"/cards"),{headers:u.headers})]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1],a=o.avatar,u=o.name,s=o.about,d=o._id;v.src=a,m.textContent=u,_.textContent=s,l=d,c.forEach((function(e){var t=e.likes,n=e.name,r=e.link,o=e.owner,c=e._id;P(D(t,n,r,o._id,c))}))})).catch((function(e){console.log("olala, we've the error: ".concat(e))})),b.forEach((function(e){e.addEventListener("click",(function(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&o(e.currentTarget)}))})),y.addEventListener("click",(function(){U.value=m.textContent,B.value=_.textContent,r(g)})),f.addEventListener("click",(function(){N(C),r(S)})),h.addEventListener("click",(function(){N(w),r(q)})),C.addEventListener("submit",(function(e){var t;e.preventDefault(),J(C),(t={avatar:A.value},a("".concat(u.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:u.headers,body:JSON.stringify(t)})).then((function(e){v.src=e.avatar,o(S)})).catch((function(e){console.log("olala, we've the error: ".concat(e))})).finally((function(){H(C,"Сохранить")}))})),k.addEventListener("submit",(function(e){var t;e.preventDefault(),J(k),(t={name:U.value,about:B.value},a("".concat(u.baseUrl,"/users/me"),{method:"PATCH",headers:u.headers,body:JSON.stringify(t)})).then((function(e){var t=e.name,n=e.about;m.textContent=t,_.textContent=n,o(g)})).catch((function(e){console.log("olala, we've the error: ".concat(e))})).finally((function(){H(k,"Сохранить")}))})),w.addEventListener("submit",(function(e){var t;e.preventDefault(),J(w),(t={name:I.value,link:T.value},a("".concat(u.baseUrl,"/cards"),{method:"POST",headers:u.headers,body:JSON.stringify(t)})).then((function(e){var t=e.likes,n=e.name,r=e.link,c=e.owner,a=e._id;P(D(t,n,r,c._id,a)),w.reset(),o(q)})).catch((function(e){console.log("olala, we've the error: ".concat(e))})).finally((function(){H(w,"Создать")}))})),x.addEventListener("submit",(function(e){return function(e,t){e.preventDefault(),function(e){return a("".concat(u.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:u.headers})}(t).then((function(){document.querySelector('[data-id="'.concat(t,'"]')).remove(),o(E)})).catch((function(e){console.log("olala, we've the error: ".concat(e))}))}(e,s)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(n){n.addEventListener("submit",(function(e){e.preventDefault()})),function(e,n){var r=n.inputSelector,o=n.submitButtonSelector,c=Array.from(e.querySelectorAll(r)),a=e.querySelector(o);t(c,a,n),c.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?function(e,t,n){var r=n.inputErrorClass,o=n.errorClass,c=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r),c.classList.remove(o),c.textContent=""}(e,t,n):function(e,t,n,r){var o=n.inputErrorClass,c=n.errorClass,a=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),a.textContent=r,a.classList.add(c)}(e,t,n,t.validationMessage)}(e,r,n),t(c,a,n)}))}))}(n,e)}))}({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"})})();