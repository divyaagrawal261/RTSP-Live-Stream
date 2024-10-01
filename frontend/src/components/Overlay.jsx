import React from 'react'

const Overlay = ({imgSrc, imgSize, imgLeft, imgTop, text, textLeft, textTop}) => {

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    zIndex: 1,
    pointerEvents: 'none',
  };

  const imgStyle = {
    position: 'absolute',
    left: imgLeft+"%",
    top: imgTop+"%",
    maxWidth: '30%',
  };

  const textStyle = {
    position: 'absolute',
    left: textLeft+"%",
    top: textTop+"%",
  };

  return (
    <div style={overlayStyle}>

        <img src={imgSrc} alt="Overlay" style={imgStyle} width={imgSize}/>
        <p style={textStyle}>{text}</p>

    </div>
  )
}

export default Overlay