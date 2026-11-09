import React from 'react';

const Balloon = ({ id, x, y, color, size, popped, onClick }) => {
  return (
    <div
      className={`balloon-wrapper ${popped ? 'pop-animation' : ''}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size * 1.2}px`,
        zIndex: Math.floor(size) // Los más grandes se renderizan delante
      }}
      onMouseDown={(e) => {
        e.preventDefault(); // Evitar seleccionar texto por error
        if (!popped) onClick();
      }}
      onTouchStart={(e) => {
        e.preventDefault(); // Soporte para toques en dispositivos móviles
        if (!popped) onClick();
      }}
    >
      <div 
        className="balloon"
        style={{ backgroundColor: color }}
      >
        <div className="string"></div>
      </div>
    </div>
  );
};

export default Balloon;
