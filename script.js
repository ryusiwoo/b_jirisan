const firebaseConfig = {
    apiKey: "AIzaSyAejvBpHRHrOoLUbCaSHWl3_GvXQ1k10kQ",
    authDomain: "jirisan-8a0a9.firebaseapp.com",
    databaseURL: "https://jirisan-8a0a9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jirisan-8a0a9",
    storageBucket: "jirisan-8a0a9.firebasestorage.app",
    messagingSenderId: "623824081076",
    appId: "1:623824081076:web:68a519252583e490aa87e1",
    measurementId: "G-7MHTPJZ8H5"
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
