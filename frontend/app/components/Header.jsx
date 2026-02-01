"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Header.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    // Kiểm tra ngay khi component mount
    checkAuth();

    // Lắng nghe sự kiện storage change
    window.addEventListener('storage', checkAuth);
    
    // Lắng nghe custom event khi đăng nhập
    window.addEventListener('userLogin', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('userLogin', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
          📸 Image Gallery
        </a>
        
        <nav className="nav">
          {user ? (
            <div className="user-menu">
              <a href="/manage" className="manage-link">Quản lý ảnh</a>
              <span className="welcome">Xin chào, {user.fullName || user.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <a href="/login" className="login-link">Đăng nhập</a>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}