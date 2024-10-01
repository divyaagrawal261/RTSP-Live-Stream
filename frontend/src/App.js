import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import OverlayControls from './components/OverlayControls';

function App() {
 
  return (
    <div>
      <VideoPlayer/>
      <OverlayControls />
    </div>
  );
}

export default App;