(()=>{"use strict";const e=document.querySelectorAll(".gallery-slider .swiper-slide"),t=document.querySelector("#galleryImg"),s=document.querySelector("#galleryImg img"),i=document.querySelector("#galleryImg .caption"),l=document.querySelector("#galleryImg .spinner-container");new Swiper(".blogs",{slidesPerView:4,spaceBetween:20,loop:!0,autoplay:{delay:3e3,disableOnInteraction:!0},navigation:{nextEl:".next-slide",prevEl:".prev-slide"},breakpoints:{320:{slidesPerView:1},576:{slidesPerView:2},992:{slidesPerView:3},1400:{slidesPerView:4}}}),new Swiper(".masters-slider",{slidesPerView:4,spaceBetween:25,loop:!0,autoplay:{delay:3e3,disableOnInteraction:!0},navigation:{nextEl:".next-slide",prevEl:".prev-slide"},breakpoints:{320:{slidesPerView:1},567:{slidesPerView:2},768:{slidesPerView:3},1400:{slidesPerView:4}}}),new Swiper(".events-slider",{slidesPerView:1,spaceBetween:0,loop:!0,autoplay:{delay:3e3,disableOnInteraction:!0},navigation:{nextEl:".next-slide",prevEl:".prev-slide"}}),new Swiper(".gallery-slider",{spaceBetween:25,autoplay:{delay:3e3,disableOnInteraction:!0},navigation:{nextEl:".next-slide",prevEl:".prev-slide"},breakpoints:{320:{slidesPerView:1},576:{slidesPerView:2},992:{slidesPerView:3}}}),e.forEach((e=>e.addEventListener("click",(e=>{const{imgId:s}=e.target.dataset;t.dataset.imgId=s})))),t.addEventListener("show.bs.modal",(()=>l.classList.add("active"))),t.addEventListener("shown.bs.modal",(async e=>{const{imgId:t}=e.target.dataset,a=await fetch(`http://localhost:3000/gallery/img/${t}`);if(200===a.status){const e=await a.json();s.src=`http://localhost:3000/gallery/${e.img}`,i.textContent=e.caption,l.classList.remove("active")}else console.log("Something went wrong!")})),t.addEventListener("hidden.bs.modal",(()=>{i.textContent="",s.src=""}))})();