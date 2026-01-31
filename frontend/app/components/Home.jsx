"use client";

import { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3069/image")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="container">
      <h1>📸 Image Gallery</h1>

      <div className="grid">
        {images.map((img) => (
          <div key={img.publicId} className="card">
            <img src={img.url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
