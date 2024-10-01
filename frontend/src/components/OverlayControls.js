import React, { useState, useEffect } from 'react';
import { getOverlays, createOverlay, updateOverlay, deleteOverlay, getOverlay } from '../services/overlayService';

function OverlayControls() {
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState({
    text: '',
    text_position: { top: '0', left: '0' }, 
    logo_position: { top: '0', left: '0' }, 
    size: '' 
  });
  const [logo, setLogo] = useState(null); 

  useEffect(() => {
    loadOverlays();
  }, []);

  const loadOverlays = async () => {
    const overlaysData = await getOverlays();
    setOverlays(overlaysData);
  };

  const handleCreateOverlay = async () => {
    const overlayData = { ...newOverlay };
    if (logo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        overlayData.logo_path = reader.result; 
        createOverlay(overlayData).then(loadOverlays);
      };
      reader.readAsDataURL(logo); 
    } else {
      await createOverlay(overlayData);
      loadOverlays();
    }
  };

  const handleUpdateOverlay = async (id) => {
    const overlayData = { ...newOverlay };
    if (logo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        overlayData.logo_path = reader.result; 
        updateOverlay(id, overlayData).then(loadOverlays);
      };
      reader.readAsDataURL(logo);
    } else {
      await updateOverlay(id, overlayData);
      loadOverlays();
    }
  };

  const handleDeleteOverlay = async (id) => {
    await deleteOverlay(id);
    loadOverlays();
  };

  const handleSelectOverlay = async (id) => {
    const overlayData = await getOverlay(id);
    sessionStorage.setItem('overlay', JSON.stringify(overlayData));
    window.location.reload();
  }

  return (
    <div>
      <h2>Overlay Controls</h2>

      <input
        type="text"
        value={newOverlay.text}
        onChange={(e) => setNewOverlay({ ...newOverlay, text: e.target.value })}
        placeholder="Overlay Text"
      />

      <div>
        <label htmlFor="logo">Upload Logo:</label>
        <input
          type="file"
          id="logo"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
        />
      </div>

      <div>
        <h3>Text Position Controls</h3>
        <label htmlFor="text_top">Top:</label>
        <input
          type="number"
          id="text_top"
          value={newOverlay.text_position.top}
          onChange={(e) => setNewOverlay({ ...newOverlay, text_position: { ...newOverlay.text_position, top: e.target.value } })}
        />
        <label htmlFor="text_left">Left:</label>
        <input
          type="number"
          id="text_left"
          value={newOverlay.text_position.left}
          onChange={(e) => setNewOverlay({ ...newOverlay, text_position: { ...newOverlay.text_position, left: e.target.value } })}
        />
        <br/>
        <br/>
        <label >Size </label>
        <input type="text" value={newOverlay.size} onChange={(e) => setNewOverlay({ ...newOverlay, size: e.target.value })} placeholder="Overlay Width" />
      </div>

      <div>
        <h3>Logo Position Controls</h3>
        <label htmlFor="logo_top">Top:</label>
        <input
          type="number"
          id="logo_top"
          value={newOverlay.logo_position.top}
          onChange={(e) => setNewOverlay({ ...newOverlay, logo_position: { ...newOverlay.logo_position, top: e.target.value } })}
        />
        <label htmlFor="logo_left">Left:</label>
        <input
          type="number"
          id="logo_left"
          value={newOverlay.logo_position.left}
          onChange={(e) => setNewOverlay({ ...newOverlay, logo_position: { ...newOverlay.logo_position, left: e.target.value } })}
        />
      </div>

      <button onClick={handleCreateOverlay}>Create Overlay</button>

      <ul>
        {overlays.map(overlay => (
          <li key={overlay._id}>
            {overlay.text} (Text Position: Top: {overlay.text_position.top}, Left: {overlay.text_position.left}, Size: {overlay.size})
            {overlay.logo_path && (
              <img
                src={overlay.logo_path}
                alt="Logo"
                style={{ position: 'relative', top: overlay.logo_position.top, left: overlay.logo_position.left, margin: '30px 10px', width: '100px', height: '100px' }}
              />
            )}
            <button onClick={() => handleUpdateOverlay(overlay._id)}>Update</button>
            <button onClick={() => handleDeleteOverlay(overlay._id)}>Delete</button>
            <button onClick={() => handleSelectOverlay(overlay._id)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OverlayControls;
