(()=>{const e=document.querySelectorAll(".edit-img-btn"),t=document.querySelector("#editImgModal"),a=document.querySelector("#editImgModal textarea[name=caption]"),n=document.querySelector("#editImgModal .spinner-container");e.forEach((e=>e.addEventListener("click",(e=>{n.classList.add("active");const{imgId:t}=e.target.dataset;document.querySelector("#editImgModal input[name=imgId]").value=t})))),t.addEventListener("shown.bs.modal",(async()=>{const e=document.querySelector("#editImgModal input[name=galleryImg]"),t=document.querySelector("#editImgModal input[name=imgId]"),o=new FormData;o.append("galleryImg",e.files[0]),o.append("caption",a.value);const d=await fetch(`http://localhost:3000/gallery/img/${t.value}`);if(200===d.status){n.classList.remove("active");const e=await d.json();a.value=e.caption}else console.log("Something went wrong!")})),t.addEventListener("hidden.bs.modal",(()=>{a.value=""}))})();