import React, { useState, useEffect } from 'react';

function DrawingApp() {
  const [drawingData, setDrawingData] = useState([]);
  const canvasRef = React.useRef();
  const ctxRef = React.useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setDrawingData([{ x, y }]);
  };

  const handleMouseMove = (e) => {
    if (drawingData.length === 0) return;
    const { clientX, clientY } = e;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setDrawingData((data) => [...data, { x, y }]);
  };

  const handleMouseUp = () => {
    setDrawingData([]);
  };

  useEffect(() => {
    const ctx = ctxRef.current;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    drawingData.forEach((point, index) => {
      if (index === 0) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.stroke();
  }, [drawingData]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ border: '1px solid #000' }}
      />
    </div>
  );
}

export default DrawingApp;
