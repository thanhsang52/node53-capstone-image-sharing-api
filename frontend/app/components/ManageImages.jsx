"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/app/common/constant/app.constant";
import "./ManageImages.css";

export default function ManageImages() {
  const [user, setUser] = useState(null);
  const [savedImages, setSavedImages] = useState([]);
  const [myImages, setMyImages] = useState([]);
  const [activeTab, setActiveTab] = useState('saved');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      // Load saved images
      const savedRes = await fetch(`${BACKEND_URL}/user/saved-images`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (savedRes.ok) {
        const savedData = await savedRes.json();
        setSavedImages(savedData);
      }

      // Load my images
      const myRes = await fetch(`${BACKEND_URL}/user/my-images`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (myRes.ok) {
        const myData = await myRes.json();
        setMyImages(myData);
      }
    } catch (err) {
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!confirm('Bạn có chắc muốn xóa ảnh này?')) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BACKEND_URL}/image/${imageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        // Remove from myImages list
        setMyImages(prev => prev.filter(img => img.id !== imageId));
        alert('Đã xóa ảnh thành công');
      } else {
        alert('Không thể xóa ảnh');
      }
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Lỗi khi xóa ảnh');
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="manage-container">
      <div className="user-info">
        <h1>Quản lý ảnh</h1>
        {user && (
          <div className="user-details">
            <p><strong>Tên:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Ảnh đã lưu ({savedImages.length})
        </button>
        <button 
          className={`tab ${activeTab === 'created' ? 'active' : ''}`}
          onClick={() => setActiveTab('created')}
        >
          Ảnh đã tạo ({myImages.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'saved' && (
          <div className="images-grid">
            {savedImages.length > 0 ? (
              savedImages.map((item) => (
                <div key={item.id} className="image-card saved-card">
                  <div className="card-badge saved-badge">💾 Đã lưu</div>
                  <img src={item.image?.url} alt={item.image?.title} />
                  <div className="image-info">
                    <p className="image-title">{item.image?.title}</p>
                    <p className="image-author">👤 Tác giả: {item.image?.user?.fullName}</p>
                    <p className="saved-date">📅 Lưu lúc: {new Date(item.createdAt || item.image?.createdAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">Chưa có ảnh nào được lưu</p>
            )}
          </div>
        )}

        {activeTab === 'created' && (
          <div className="images-grid">
            {myImages.length > 0 ? (
              myImages.map((image) => (
                <div key={image.id} className="image-card created-card">
                  <div className="card-badge created-badge">✨ Đã tạo</div>
                  <img src={image.url} alt={image.title} />
                  <div className="image-info">
                    <p className="image-title">{image.title}</p>
                    <p className="image-stats">
                      💬 {image._count?.comments || 0} bình luận | ❤️ {image._count?.saved || 0} lượt lưu
                    </p>
                    <p className="created-date">📅 Tạo lúc: {new Date(image.createdAt).toLocaleDateString('vi-VN')}</p>
                    <button 
                      onClick={() => handleDeleteImage(image.id)}
                      className="delete-btn"
                    >
                      🗑️ Xóa ảnh
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">Chưa có ảnh nào được tạo</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}