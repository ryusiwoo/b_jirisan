const firebaseConfig = {
  apiKey: "AIzaSyAejvBpHRHrOoLUbCaSHWl3_GvXQ1k10kQ",
  authDomain: "jirisan-8a0a9.firebaseapp.com",
  databaseURL: "https://jirisan-8a0a9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jirisan-8a0a9",
  storageBucket: "jirisan-8a0a9.appspot.com",
  messagingSenderId: "623824081076",
  appId: "1:623824081076:web:52c5e5638c17736aaa87e1",
  measurementId: "G-Z4NCE0XM9C"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 좋아요 카운트 실시간 업데이트
database.ref("likes").on("value", function(snapshot) {
  const count = snapshot.val() || 0;
  document.getElementById("likeCount").textContent = count;
});

// 좋아요 버튼 클릭 이벤트
document.getElementById("likeButtonRight").addEventListener("click", function() {
  database.ref("likes").once("value").then(function(snapshot) {
    let count = snapshot.val() || 0;
    count++;
    database.ref("likes").set(count);
  });
});

// 댓글 저장 로직
document.getElementById("submitCommentButton").addEventListener("click", function() {
  const commentInput = document.getElementById("commentInput").value;
  if (commentInput.trim() !== "") {
    const newCommentRef = database.ref("comments").push(); // 고유한 ID로 새로운 댓글 추가
    newCommentRef.set({
      text: commentInput,
      timestamp: Date.now() // 현재 시간 저장
    });
    document.getElementById("commentInput").value = ""; // 입력 필드 초기화
  }
});

// 댓글 실시간 표시 로직
database.ref("comments").on("value", function(snapshot) {
  const commentsList = document.getElementById("commentsList");
  commentsList.innerHTML = ""; // 기존 댓글 초기화
  snapshot.forEach(function(childSnapshot) {
    const comment = childSnapshot.val();
    const commentItem = document.createElement("div");
    commentItem.className = "comment-item";
    commentItem.textContent = comment.text;
    commentsList.appendChild(commentItem);
  });
});

// Firebase에서 갤러리 이미지 불러오기
database.ref("gallery").on("value", function(snapshot) {
  const galleryContainer = document.getElementById("gallery-container");
  galleryContainer.innerHTML = ""; // 기존 갤러리 초기화

  snapshot.forEach(function(childSnapshot) {
    const image = childSnapshot.val();
    const imageElement = document.createElement("a");
    imageElement.href = image.link;
    imageElement.target = "_blank";

    const imgElement = document.createElement("img");
    imgElement.src = image.imageUrl;
    imgElement.alt = image.altText;
    imageElement.appendChild(imgElement);

    galleryContainer.appendChild(imageElement);
  });
});
