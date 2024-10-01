import React, { useState, useEffect, useRef } from "react";
import Overlay from "./Overlay";

function VideoPlayer() {
  const [rtspUrl, setRtspUrl] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const handleStream = () => {
    setIsStreaming(true);
  };

  const defaultOverlay = {
    logo_path: "https://via.placeholder.com/100",
    size: "100",
    text: "This is the default overlay",
    logo_position: { left: 38, top: 40 },
    text_position: { left: 30, top: 70 },
  };

  const containerStyle = {
    position: "relative",
    width: "800px",
    height: "450px",
  };

  const videoStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  const { logo_path, size, text, logo_position, text_position } =
    sessionStorage.getItem("overlay")
      ? JSON.parse(sessionStorage.getItem("overlay"))
      : {};

  return (
    <>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>RTSP Video Player</h1>
      <input
        type="text"
        value={rtspUrl}
        onChange={(e) => setRtspUrl(e.target.value)}
        placeholder="Enter RTSP URL"
        style={{ width:"500px", padding: '8px', marginBottom: '10px' }}
      />
      <br/>
      <button
        onClick={handleStream}
        style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Stream Video
      </button>
      <br/>
    
    <div style={containerStyle}>
      {isStreaming && (
        <div style={videoStyle}>
        <img
          src={`http://localhost:5000/stream?url=${encodeURIComponent(rtspUrl)}`}
          alt="RTSP Stream"
          style={{ width: '100%', aspectRatio: '16/9' }}
        />
        </div>
      )}
      {!sessionStorage.getItem("overlay") ? (
        <Overlay
          imgSrc={defaultOverlay.logo_path}
          text={defaultOverlay.text}
          textLeft={defaultOverlay.text_position.left}
          textTop={defaultOverlay.text_position.top}
          imgLeft={defaultOverlay.logo_position.left}
          imgTop={defaultOverlay.logo_position.top}
          imgSize={defaultOverlay.size}
        />
      ) : (
        <Overlay
          imgSrc={logo_path}
          text={text}
          textLeft={text_position.left}
          textTop={text_position.top}
          imgLeft={logo_position.left}
          imgTop={logo_position.top}
          imgSize={size}
        />
      )}
    </div>
    </>
  );
}

export default VideoPlayer;