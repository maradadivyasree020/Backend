// client/src/pages/VideoDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/api/videos/search?q=${id}`);
        setVideo(res.data[0]); 
      } catch (err) {
        console.error('Error loading video:', err);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Back
      </button>

      <img
        src={video.thumbnails?.high?.url}
        alt={video.title}
        className="w-full h-auto rounded mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
      <p className="text-gray-600 mb-2">{video.description}</p>
      <p className="text-sm text-gray-500">
        Published on: {new Date(video.publishedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default VideoDetail;
