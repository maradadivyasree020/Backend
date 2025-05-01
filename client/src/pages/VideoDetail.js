import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoDetail = () => {
  const { id } = useParams(); 
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (!id) {
          setError('Video ID is missing');
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);
      } catch (error) {
        console.error('Error loading video:', error);
        setError('Error loading video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{video.title}</h1>

      {video.videoId && (
        <div className="video-container mb-6">
          <iframe
            width="100%"
            height="480"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <p className="text-lg mb-4">{video.description}</p>
      <p className="text-sm text-gray-500">Published: {new Date(video.publishedAt).toLocaleString()}</p>
    </div>
  );
};

export default VideoDetail;
