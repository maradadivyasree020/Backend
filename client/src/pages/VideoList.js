import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10; 

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const url = query
        ? `/api/videos/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
        : `/api/videos?page=${page}&limit=${limit}`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        if (page === 1) {
          setVideos(data.videos);
        } else {
          setVideos((prev) => [...prev, ...data.videos]);
        }
        setHasMore(data.videos.length === limit);
      } else {
        console.error('Error fetching videos:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchVideos();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Latest YouTube Videos</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-4 py-2 w-full max-w-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && page === 1 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link to={`/video/${video.videoId}`} key={video.videoId}>
              <div className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden">
                <img
                  src={video.thumbnails?.high?.url}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-1">{video.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Published: {new Date(video.publishedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {hasMore && !loading && (
        <div className="text-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoList;
