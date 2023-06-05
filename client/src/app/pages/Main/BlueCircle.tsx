import React, { useEffect } from "react";
import Konva from "konva";
import { Circle, Stage, Layer } from "react-konva";

const BlurredCircle = () => {
  useEffect(() => {
    const stage = new Konva.Stage({
      container: "canvas-container",
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const layer = new Konva.Layer();

    const circle = new Konva.Circle({
      x: stage.width() / 2,
      y: 50,
      radius: 150,
      fill: "#9595B9",
      filters: [Konva.Filters.Blur],
      blurRadius: 100,
    });

    layer.add(circle);
    stage.add(layer);
  }, []);

  return (
    <div id="canvas-container">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer />
      </Stage>
    </div>
  );
};

export default BlurredCircle;
