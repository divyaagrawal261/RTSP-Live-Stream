export const getOverlays = async () => {
  const response = await fetch('http://127.0.0.1:5000/overlays', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to fetch overlays');
  }
  return response.json();
};

export const createOverlay = async (overlay) => {
  const response = await fetch('http://127.0.0.1:5000/overlays', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(overlay)
  });
  if (!response.ok) {
    throw new Error('Failed to create overlay');
  }
};

export const updateOverlay = async (id, overlay) => {
  const currentOverlay = await getOverlay(id);

  const text = prompt("Enter new text");
  const text_position_left=prompt("Enter new text position (from Left)");
  const text_position_top=prompt("Enter new text position (from Top)");
  const logo=prompt("Enter URL of new logo");
  const logo_position_left=prompt("Enter new logo position (from Left)");
  const logo_position_top=prompt("Enter new logo position (from Top)");
  const logoSize = prompt("Enter new logo size");

  const response = await fetch(`http://127.0.0.1:5000/overlays/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      text: text || currentOverlay.text,
      logo_path: logo || currentOverlay.logo_path,
      logo_position:{
        top: logo_position_top||currentOverlay.logo_position.top,
        left: logo_position_left||currentOverlay.logo_position.left
      },
      text_position: {
        top:  text_position_top || currentOverlay.text_position.top,
        left: text_position_left || currentOverlay.text_position.left
      },
      size: logoSize || currentOverlay.size
    })
  });
  if (!response.ok) {
    throw new Error('Failed to update overlay');
  }
};

export const deleteOverlay = async (id) => {
  const response = await fetch(`http://127.0.0.1:5000/overlays/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to delete overlay');
  }
};

export const getOverlay = async (id) => {
  const response = await fetch(`http://127.0.0.1:5000/overlays/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }); 
  if (!response.ok) {
    throw new Error('Failed to fetch overlay');
  }
  return response.json(); 
};