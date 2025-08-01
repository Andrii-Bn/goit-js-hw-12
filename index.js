import{a as v,S as P,i as l}from"./assets/vendor-BNsGcbod.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();async function g(r,s=1,o=15){return(await v.get("https://pixabay.com/api/",{params:{key:"51395904-122be9b434c3d42803bb62926",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:o}})).data}const f=document.querySelector(".gallery"),h=document.querySelector(".loader"),q=new P(".gallery a",{captionsData:"alt",captionDelay:250});function y(r){const s=r.map(({webformatURL:o,largeImageURL:i,tags:e,likes:t,views:n,comments:w,downloads:S})=>`
        <li class="gallery-item">
        <a href="${i}">
          <img class="gallery-img" src="${o}" alt="${e}" />
        </a>
          <ul class="stat-list">
            <li class="stat-item">
              <span class="stat-title">Likes</span>${t}
            </li>
            <li class="stat-item">
              <span class="stat-title">Views</span>${n}
            </li>
            <li class="stat-item">
              <span class="stat-title">Comments</span>${w}
            </li>
            <li class="stat-item">
              <span class="stat-title">Downloads</span>${S}
            </li>
          </ul>
        </li>
    `).join("");f.insertAdjacentHTML("beforeend",s),q.refresh()}function E(){f.innerHTML=""}function L(){h.classList.remove("hidden")}function b(){h.classList.add("hidden")}const M=document.querySelector(".form"),$=document.querySelector('[name="search-text"]'),p=document.getElementById("load-more");let a=1;const c=15;let d=0,u="";function B(){const r=document.querySelector(".gallery .photo-card");if(!r)return;const s=r.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}function m(){p.classList.replace("load-btn","hidden")}function O(){p.classList.replace("hidden","load-btn")}M.addEventListener("submit",async r=>{r.preventDefault();const s=$.value.trim();if(u=s,a=1,!s){l.error({message:"Please fill out search field",position:"topRight"});return}E(),L();try{const o=await g(u,a,c);if(d=Math.ceil(o.totalHits/c),o.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),m();return}y(o.hits),a<d?O():m()}catch(o){l.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error("Error fetching images:",o.message)}finally{b()}});p.addEventListener("click",async()=>{a++,L();try{const r=await g(u,a,c);y(r.hits),B(),a>=d&&(m(),l.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{l.error({title:"Error",message:"Something went wrong during loading more images.",position:"topRight"})}finally{b()}});
//# sourceMappingURL=index.js.map
