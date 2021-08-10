//! Variabales
const addCommentCkEditor = document.querySelector("#addCommentCkeditor");
const editCommentCkEditor = document.querySelector("#editComment textarea");
const replyCommentCkEditor = document.querySelector("#replyCommentCkeditor");
const editCommentModal = document.querySelector("#editComment");
const likeBtn = document.querySelector(".like-blog");
const likeNumber = document.querySelector(".likes .like-number");
const replyCommentBtns = document.querySelectorAll(".reply-comment");
const deleteCommentBtns = document.querySelectorAll(".delete-comment");
const deleteReplyCommentBtns = document.querySelectorAll(".delete-reply-comment");
const addCommentBtn = document.querySelectorAll(".add-comment");
const editCommentBtn = document.querySelector(".edit-comment");

// Ckeditor config.
const ckEditorConfig = {
  language: "fa",
  heading: {
    options: [
      { model: "paragraph", title: "پاراگراف", class: "ck-heading_paragraph" },
      { model: "heading1", view: "h1", title: "تیتر نویس 1", class: "ck-heading_heading1" },
      { model: "heading2", view: "h2", title: "تیتر نویس 2", class: "ck-heading_heading2" },
      { model: "heading3", view: "h3", title: "تیتر نویس 3", class: "ck-heading_heading3" },
      { model: "heading4", view: "h4", title: "تیتر نویس 4", class: "ck-heading_heading3" },
      { model: "heading5", view: "h5", title: "تیتر نویس 5", class: "ck-heading_heading3" },
      { model: "heading6", view: "h6", title: "تیتر نویس 6", class: "ck-heading_heading3" },
    ],
  },
};
let editCommentCK;
// Ckeditors initialize.
ClassicEditor.create(editCommentCkEditor, ckEditorConfig)
  .then((res) => (editCommentCK = res))
  .catch((err) => console.log(err));
ClassicEditor.create(addCommentCkEditor, ckEditorConfig)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
ClassicEditor.create(replyCommentCkEditor, ckEditorConfig)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//! Functions
const spinner = () => {
  const spinner = document.createElement("span");
  spinner.classList = "spinner-border spinner-border-sm ms-1";
  return spinner;
};

// Like blog function
const like = async () => {
  const { blogId } = likeBtn.dataset;
  const likeBlog = await fetch(`http://localhost:3000/blog/like/${blogId}`);
  if (likeBlog.status === 200) {
    const response = await likeBlog.json();
    likeNumber.textContent = response.blogLikesLength;
    if (!likeBtn.classList.contains("liked")) {
      likeBtn.classList.add("liked");
    } else {
      likeBtn.classList.remove("liked");
    }
  } else {
    console.log("Something went wrong!");
  }
};

// Add a new comment confirmation function.
const addComment = async (e) => {
  e.target.append(spinner());
};

// Delete a comment
const deleteComment = async (e) => {
  const { commentId } = e.target.dataset;
  e.target.append(spinner());
  const fetchToDelete = await fetch(`http://localhost:3000/blog/comment/delete/${commentId}`, {
    method: "DELETE",
  });
  console.log(fetchToDelete);
  if (fetchToDelete.status === 200) {
    const response = await fetchToDelete.json();
    e.target.closest("li").remove();
    Swal.fire({
      titleText: "مــــوفــــق!",
      text: response.message,
      footer: "هنرستان خوارزمی فیروزآباد",
      icon: "success",
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } else {
    const error = await fetchToDelete.json();
    Swal.fire({
      titleText: "خــطــا!",
      text: error.message,
      footer: "هنرستان خوارزمی فیروزآباد",
      icon: "error",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

// Delete a reply comment
const deleteReplyComment = async (e) => {
  const { commentId } = e.target.dataset;
  e.target.append(spinner());
  const fetchToDelete = await fetch(`http://localhost:3000/blog/delete-reply-comment/${commentId}`);
  console.log(fetchToDelete);
  if (fetchToDelete.status === 200) {
    const response = await fetchToDelete.json();
    e.target.closest("li").remove();
    Swal.fire({
      titleText: "مــوفــق!",
      text: response.message,
      footer: "هنرستان خوارزمی فیروزآباد",
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } else {
    const error = await fetchToDelete.json();
    Swal.fire({
      titleText: "خــطــا!",
      text: error.message,
      footer: "هنرستان خوارزمی فیروزآباد",
      icon: "error",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

// API: Get comment for edit it.
const getCommentForEdit = async () => {
  const commentId = document.querySelector("#editComment input[name=commentId]");
  const getComment = await fetch(`http://localhost:3000/blog/comment/read/${commentId.value}`);
  if (getComment.status === 200) {
    const response = await getComment.json();
    console.log(response);
    editCommentCK.setData(response.comment.comment);
  } else {
    const error = await getComment.json();
    console.log(error);
  }
};

const openEditCommentModal = (commentId) => {
  document.querySelector("#editComment input[name=commentId]").value = commentId;
};

const openModalFunc = () => {
  console.log("RUN");
};

const changeReplyCommentInputValue = (e) => {
  const { commentId } = e.target.dataset;
  const commentIdInput = document.querySelector("#replyComment input[name=replyId]");
  commentIdInput.value = commentId;
};

const editComment = (e) => {
  e.target.append(spinner());
};

//! EventListeners
likeBtn.addEventListener("click", like);
editCommentModal.addEventListener("shown.bs.modal", getCommentForEdit);
replyCommentBtns.forEach((el) => el.addEventListener("click", changeReplyCommentInputValue));
addCommentBtn.forEach((el) => el.addEventListener("click", addComment));
deleteCommentBtns.forEach((el) => el.addEventListener("click", deleteComment));
deleteReplyCommentBtns.forEach((el) => el.addEventListener("click", deleteReplyComment));
editCommentBtn.addEventListener("click", editComment());
