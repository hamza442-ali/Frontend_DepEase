// import React, { useState } from "react";

// const Comment = ({ username, content }) => (
//   <div className="mb-4">
//     <div className="font-semibold">{username}</div>
//     <p className="text-gray-600">{content}</p>
//   </div>
// );

// export const Post = () => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (newComment.trim() !== "") {
//       setComments([...comments, { username: "CurrentUser", content: newComment }]);
//       setNewComment("");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 justify-center items-center mx-32">
//       {/* mx-8 adds a margin of 2rem on both sides */}
//       <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      
//       <div className="border rounded-lg p-4 bg-white">
//         <div className="mb-4">
//           <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
//             <textarea
//               className="border p-2 rounded-lg"
//               placeholder="Write a comment..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             ></textarea>
//             <button
//               type="submit"
//               className="bg-black text-white p-2 rounded-lg"
//             >
//               Post Comment
//             </button>
//           </form>
//         </div>
        
//         <div>
//           {comments.length === 0 ? (
//             <div className="text-center text-gray-500">No comments yet</div>
//           ) : (
//             comments.map((comment, index) => (
//               <Comment key={index} username={comment.username} content={comment.content} />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
