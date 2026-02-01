"use client";

import { useEffect, useState } from "react";
import "./Home.css";
import { BACKEND_URL } from "@/app/common/constant/app.constant";

export default function Home() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedImages, setSavedImages] = useState(new Set());

  const fetchImages = async (search = "") => {
    setLoading(true);
    try {
      const url = search 
        ? `${BACKEND_URL}/image?search=${encodeURIComponent(search)}`
        : `${BACKEND_URL}/image`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      // Đảm bảo data là array
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error("API response is not an array:", data);
        setImages([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    loadSavedImages();
  }, []);

  const loadSavedImages = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${BACKEND_URL}/user/saved-images`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const savedData = await res.json();
        const savedPublicIds = new Set(
          savedData.map(item => item.image?.title || '').filter(Boolean)
        );
        setSavedImages(savedPublicIds);
      }
    } catch (err) {
      console.error('Error loading saved images:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchImages();
  };

  const handleSaveImage = async (publicId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập để lưu ảnh');
      return;
    }

    try {
      console.log('Sending request with token:', token); // Debug log
      const res = await fetch(`${BACKEND_URL}/image/${encodeURIComponent(publicId)}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response status:', res.status); // Debug log
      
      if (res.ok) {
        const data = await res.json();
        if (data.isSaved) {
          setSavedImages(prev => new Set([...prev, publicId]));
        } else {
          setSavedImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(publicId);
            return newSet;
          });
        }
      } else {
        const errorData = await res.json();
        console.error('Error response:', errorData);
      }
    } catch (err) {
      console.error('Error saving image:', err);
    }
  };

  return (
    <div className="container">
      <h1>📸 Image Gallery</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Tìm kiếm ảnh theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍 Tìm kiếm
        </button>
        {searchTerm && (
          <button type="button" onClick={handleClearSearch} className="clear-btn">
            ✕ Xóa
          </button>
        )}
      </form>

      {loading && <p>Đang tải...</p>}
      
      <div className="grid">
        {images.map((img) => {
          const isSaved = savedImages.has(img.publicId);
          return (
            <div key={img.publicId} className="card">
              <a href={`/image/${encodeURIComponent(img.publicId)}`} className="image-link">
                <img src={img.url} alt={img.publicId} />
              </a>
              <div className="card-footer">
                <p className="image-name">{img.publicId}</p>
                <button 
                  onClick={(e) => handleSaveImage(img.publicId, e)}
                  className={`save-btn ${isSaved ? 'saved' : ''}`}
                  title={isSaved ? 'Bỏ lưu' : 'Lưu ảnh'}
                >
                  {isSaved ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {!loading && images.length === 0 && (
        <p>Không tìm thấy ảnh nào.</p>
      )}
    </div>
  );
}
