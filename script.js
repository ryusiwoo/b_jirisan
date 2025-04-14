// Firebase 설정 - Firebase Console에서 제공된 값을 입력하세요.
const firebaseConfig = {
  apiKey: "yourAPIKey",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "yourSenderId",
  appId: "yourAppId"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

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
