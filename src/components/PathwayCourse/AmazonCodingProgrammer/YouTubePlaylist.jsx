import React, { useState, useEffect } from 'react';

const YouTubePlaylist = ({ playlistId, apiKey, videoSpacing }) => {
  const [playlistVideos, setPlaylistVideos] = useState([]);

  useEffect(() => {
    async function getPlaylistVideos() {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPlaylistVideos(data.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getPlaylistVideos();
  }, [playlistId, apiKey]);

  return (
    <div>
      {playlistVideos.map((video, index) => (
        <div key={video.id} style={{ marginBottom: videoSpacing }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
            title={video.snippet.title}
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default YouTubePlaylist;
