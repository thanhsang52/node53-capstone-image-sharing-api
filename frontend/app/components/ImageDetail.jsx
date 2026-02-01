"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BACKEND_URL } from "@/app/common/constant/app.constant";
import "./ImageDetail.css";

export default function ImageDetail() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchImageDetails();
      fetchComments();
    }
  }, [id]);

  const fetchImageDetails = async () => {
    try {
      const decodedId = decodeURIComponent(id);
      const res = await fetch(`${BACKEND_URL}/image/${encodeURIComponent(decodedId)}`);
      const data = await res.json();
      setImage(data);
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const decodedId = decodeURIComponent(id);
      const res = await fetch(`${BACKEND_URL}/image/${encodeURIComponent(decodedId)}/comments`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const decodedId = decodeURIComponent(id);
      const res = await fetch(`${BACKEND_URL}/image/${encodeURIComponent(decodedId)}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newComment })
      });

      if (res.ok) {
        setNewComment("");
        fetchComments(); // Reload comments
      } else {
        console.error("Error posting comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (!image) return <div className="error">Không tìm thấy ảnh</div>;

  return (
    <div className="image-detail-container">
      <div className="image-section">
        <img src={image.url} alt={image.title} className="detail-image" />
      </div>
      
      <div className="info-section">
        <h1>{image.title}</h1>
        <div className="author-info">
          <p><strong>Tác giả:</strong> {image.user?.fullName || 'Không rõ'}</p>
          <p><strong>Email:</strong> {image.user?.email || 'Không rõ'}</p>
          <p><strong>Ngày tạo:</strong> {new Date(image.createdAt).toLocaleDateString('vi-VN')}</p>
        </div>
        
        <div className="stats">
          <span>💬 {image._count?.comments || 0} bình luận</span>
          <span>❤️ {image._count?.saved || 0} lượt lưu</span>
        </div>

        <div className="comments-section">
          <h3>Bình luận ({comments.length})</h3>
          
          <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận..."
              className="comment-input"
              rows="3"
            />
            <button 
              type="submit" 
              disabled={submitting || !newComment.trim()}
              className="comment-submit"
            >
              {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
            </button>
          </form>

          {comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-author">{comment.user?.fullName || 'Không rõ'}</div>
                  <div className="comment-content">{comment.content}</div>
                  <div className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Chưa có bình luận nào</p>
          )}
        </div>
      </div>
    </div>
  );
}