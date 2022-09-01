/*! For license information please see manage-events.js.LICENSE.txt */
(()=>{$(document).ready((function(){const e=()=>{document.querySelectorAll(".datepicker-plot-area .datepicker-day-view .table-days tr").forEach((e=>{e.children[6].children[0].classList.contains("other-month")||(e.children[6].children[0].style.color="#ff4343")}))};$("input.date").persianDatepicker({navigator:{onNext:()=>e(),onPrev:()=>e()},format:"DD MMMM YYYY"}),e(),$(".only-time-picker").persianDatepicker({onlyTimePicker:!0,format:"HH:mm",calendar:{persian:{locale:"en"}},initialValue:!1})}));const e=document.querySelector("form#addNewEventForm"),t=(document.querySelector("form#editEventForm"),document.querySelector("#editEventModal")),r=document.querySelectorAll(".edit-event"),n=document.querySelectorAll("form.delete-event"),o=e=>{const{eventId:t}=e.target.closest("a").dataset;document.querySelector("#editEventModal input[name=eventId]").value=t},a=e=>{e.preventDefault(),Swal.fire({title:"احتیاط!",text:"از حذف این رویداد مطمئن هستید؟",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"بله، مطمئنم",cancelButtonText:"لغو عملیات"}).then((async t=>{t.isConfirmed&&e.target.closest("form").submit()}))};e.addEventListener("submit",(e=>{const t=e.target.closest("form").querySelector("input[name=title]"),r=e.target.closest("form").querySelector("input[name=eventImg]"),n=e.target.closest("form").querySelector("input[name=start]"),o=e.target.closest("form").querySelector("textarea[name=description]"),a=(new FastestValidator).compile({title:{type:"string",empty:!1,messages:{stringEmpty:"تیتر رویداد الزامی است!"}},eventImg:{type:"string",empty:!1,messages:{stringEmpty:"تصویر رویداد الزامی است!"}},start:{type:"string",empty:!1,messages:{stringEmpty:"تاریخ الزامی است!"}},description:{type:"string",min:50,messages:{stringMin:"توضیحات حدااقل باید 50 کاراکتر باشد!"}}})({title:t.value,eventImg:r.value,start:n.value,description:o.value});document.querySelectorAll(".invalid-feedback").forEach((e=>e.remove())),e.target.closest("form").querySelectorAll(".border-danger").forEach((e=>e.classList.remove("border-danger"))),console.log(a),!0!==a&&(e.preventDefault(),a.forEach((t=>{const r=e.target.closest("form").querySelector(`[name=${t.field}]`);r.classList.add("border-danger");const n=(e=>{const t=document.createElement("div");return t.classList="invalid-feedback d-block w-100 font-medium",t.textContent=e,t})(t.message);r.closest("div").appendChild(n)})))})),t.addEventListener("shown.bs.modal",(async()=>{const e=t.querySelector("input[name=eventId]").value,r=await fetch(`http://localhost:3000/event/${e}`);if(200===r.status){const{title:e,start:n,time:o,description:a}=await r.json();t.querySelector("input[name=title]").value=e,t.querySelector("input[name=start]").value=n,t.querySelector("input[name=time]").value=o,t.querySelector("textarea[name=description]").value=a}else{const e=await r.json();console.log(e)}})),r.forEach((e=>e.addEventListener("click",o))),n.forEach((e=>e.addEventListener("submit",a)))})();