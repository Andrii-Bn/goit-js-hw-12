import{a as P,S as q,i as l}from"./assets/vendor-BNsGcbod.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function g(r,o=1,s=15){return(await P.get("https://pixabay.com/api/",{params:{key:"51395904-122be9b434c3d42803bb62926",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:s}})).data}const f=document.querySelector(".gallery"),p=document.querySelector(".loader"),h=document.getElementById("load-more"),E=new q(".gallery a",{captionsData:"alt",captionDelay:250});function y(r){const o=r.map(({webformatURL:s,largeImageURL:i,tags:e,likes:t,views:n,comments:S,downloads:v})=>`
        <li class="gallery-item">
        <a href="${i}">
          <img class="gallery-img" src="${s}" alt="${e}" />
        </a>
          <ul class="stat-list">
            <li class="stat-item">
              <span class="stat-title">Likes</span>${t}
            </li>
            <li class="stat-item">
              <span class="stat-title">Views</span>${n}
            </li>
            <li class="stat-item">
              <span class="stat-title">Comments</span>${S}
            </li>
            <li class="stat-item">
              <span class="stat-title">Downloads</span>${v}
            </li>
          </ul>
        </li>
    `).join("");f.insertAdjacentHTML("beforeend",o),E.refresh()}function M(){f.innerHTML=""}function L(){p.classList.remove("hidden")}function b(){p.classList.add("hidden")}function w(){h.classList.add("load-btn")}function c(){h.classList.remove("load-btn")}const $=document.querySelector(".form"),O=document.querySelector('[name="search-text"]'),R=document.getElementById("load-more");let a=1;const d=15;let u=0,m="";function x(){const r=document.querySelector(".gallery .photo-card");if(!r)return;const o=r.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}$.addEventListener("submit",async r=>{r.preventDefault();const o=O.value.trim();if(m=o,a=1,c(),!o){l.error({message:"Please fill out search field",position:"topRight"});return}M(),L();try{const s=await g(m,a,d);if(u=Math.ceil(s.totalHits/d),s.hits.length===0){c(),l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(s.hits),a<u&&w()}catch(s){l.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error("Error fetching images:",s.message)}finally{b()}});R.addEventListener("click",async()=>{a++,L(),c();try{const r=await g(m,a,d);y(r.hits),x(),a>=u?(c(),l.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):w()}catch{l.error({title:"Error",message:"Something went wrong during loading more images.",position:"topRight"})}finally{b()}});
//# sourceMappingURL=index.js.map
