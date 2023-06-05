import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { f } from "../../utils/util";
// import { fabric } from "fabric";

const rocketImageCount = 1;
const crashImageCount = 60;
const rocketImages: HTMLImageElement[] = [];
const crashImages: HTMLImageElement[] = [];

const PRIMARY_COLOR = "#6D6D8F";
const BACKGROUND_COLOR = "#2A2A38";

let width = 1440;
let height = 800;
let GAP = 60;
let ORG_X = GAP;
let ORG_Y = height - GAP;
let STAGE_WIDTH = width - GAP * 2;
let STAGE_HEIGHT = height - GAP * 2;
let rate = 1;

let timeElapsed: number, crashTimeElapsed: number, isRising: boolean, ctx: any;

const imageParachute = new Image();
imageParachute.src = "images/parachute.png";

const loadImage = async (i: number): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = `images/rocket/${String(i).padStart(4, "0")}.png`;
  });
};

const loadImage1 = async (i: number): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = `images/crash/${String(i).padStart(4, "0")}.png`;
  });
};

const importImages = async () => {
  for (let i = 1; i <= rocketImageCount; i++)
    rocketImages.push(await loadImage(i));
  for (let i = 0; i < crashImageCount; i++)
    crashImages.push(await loadImage1(i * 2));
};
importImages();

const drawText = (
  content: string,
  x: number,
  y: number,
  color: string,
  fontSize: string,
  align = "left"
) => {
  ctx.font = fontSize + " Arial"; // Montserrat
  ctx.textAlign = align;
  ctx.fillStyle = color;
  ctx.fillText(content, x, y);
  let metrics = ctx.measureText(content);
  return {
    width: metrics.width,
    height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
  };
};

const drawAxis = (W: number, H: number) => {
  ctx.save();
  ctx.beginPath();
  let xInterval = 2;
  let yInterval = 0.5;

  if (W > 10) xInterval = 5;
  if (W > 25) xInterval = 10;
  if (W > 50) xInterval = 25;
  if (W > 100) xInterval = 50;
  if (W > 250) xInterval = 100;
  if (W > 500) xInterval = 205;

  if (H < 2.5) yInterval = 1;
  else {
    let base = 1;
    while (base * 10 <= H) base *= 10;
    if (base * 2.5 >= H) yInterval = base / 2;
    else yInterval = base;
  }
  var rt: any;
  for (let x = 0; x <= W; x += xInterval) {
    let xPos = ORG_X + (STAGE_WIDTH / W) * x;
    let yPos = ORG_Y;
    rt = drawText(
      x.toString(),
      xPos,
      yPos,
      PRIMARY_COLOR,
      `${12}px`,
      x ? "center" : "left"
    );

    if (x) ctx.lineTo(xPos - rt.width / 2 - 15 * rate, yPos - rt.height / 2);
    ctx.strokeStyle = "#37374D";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xPos + rt.width / 2 + 15 * rate, yPos - rt.height / 2);
  }

  if (Math.floor(W / xInterval) * xInterval + xInterval / 10 < W) {
    ctx.lineTo(ORG_X + STAGE_WIDTH, ORG_Y - rt.height / 2);
  }

  for (let y = 0; y <= H; y += yInterval) {
    let xPos = ORG_X;
    let yPos = ORG_Y - (STAGE_HEIGHT / H) * y - 8;
    if (y) drawText(y + "x", xPos - 1, yPos, PRIMARY_COLOR, `${12}px`, "left");

    if (y) ctx.lineTo(xPos, yPos + 15 * rate);
    ctx.strokeStyle = "#37374D";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xPos, yPos - 30 * rate);
  }
  if (Math.floor(H / yInterval) * yInterval + yInterval / 10 < H) {
    ctx.lineTo(ORG_X, ORG_Y - STAGE_HEIGHT);
    ctx.stroke();
  }
  ctx.restore();
};

const drawRocket = (W: number, H: number) => {
  const D = 30 * rate;
  const curX = ORG_X + (STAGE_WIDTH / W) * timeElapsed + D;
  const curY = ORG_Y - (f(timeElapsed) / H) * STAGE_HEIGHT - D;
  const imgWidth = 150 * rate;
  const imgHeight = 150 * rate;
  const delta = 0.1;
  let ang = Math.atan2(
    ((f(timeElapsed - delta) - f(timeElapsed)) / H) * (width > 384 ? 1 : 2),
    delta / W / (timeElapsed / 5 ? 0.5 : 1)
  );
  ctx.save();
  ctx.translate(curX, curY);
  ctx.rotate(ang);
  if (rocketImages.length === rocketImageCount)
    ctx.drawImage(
      rocketImages[parseInt((timeElapsed * 50).toString()) % rocketImageCount],
      -imgWidth / 4,
      -imgHeight / 2,
      imgWidth,
      imgHeight
    );
  ctx.restore();
};

const drawGraph = (W: number, H: number) => {
  const D = 30 * rate;
  const SEG = Math.min(timeElapsed * 100, 1000);

  const pureGraph = () => {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(ORG_X + D, ORG_Y - D);
    for (let i = 0; i <= SEG; i++) {
      let x = (timeElapsed / SEG) * i;
      let curX = ORG_X + (STAGE_WIDTH / W) * x;
      let curY = ORG_Y - (f(x) / H) * STAGE_HEIGHT;
      ctx.lineTo(curX + D, curY - D);
    }
  };

  let stx = ORG_X + D;
  let sty = ORG_Y - D;
  let xx = (timeElapsed / W) * STAGE_WIDTH;
  let yy = (f(timeElapsed) / H) * STAGE_HEIGHT;
  let edx = stx + xx;
  let edy = sty - yy;

  ctx.save();
  pureGraph();
  let radFillGrad = ctx.createRadialGradient(
    ORG_X + D,
    ORG_Y - D,
    0,
    ORG_X + D,
    ORG_Y - D,
    Math.hypot(xx, yy)
  );
  radFillGrad.addColorStop(0, "#292938");
  radFillGrad.addColorStop(0.5, "#4A70FF");
  radFillGrad.addColorStop(1, "#AD19C6");
  ctx.lineTo(edx, sty);
  ctx.lineTo(stx, sty);
  ctx.fillStyle = radFillGrad;
  ctx.globalAlpha = 0.5;
  ctx.fill();
  ctx.restore();

  ctx.save();
  pureGraph();
  let radGrad = ctx.createRadialGradient(
    ORG_X,
    ORG_Y,
    0,
    ORG_X,
    ORG_Y,
    Math.hypot(xx, yy)
  );
  radGrad.addColorStop(0, "#61B0D0");
  radGrad.addColorStop(0.5, "#4A70FF");
  radGrad.addColorStop(1, "#AD19C6");
  ctx.lineWidth = 6;
  ctx.strokeStyle = radGrad;
  ctx.shadowColor = "#111111";
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 3;
  ctx.stroke();
  ctx.restore();
};

const drawCrash = (W: number, H: number) => {
  const D = 30 * rate;
  const curX = ORG_X + (STAGE_WIDTH / W) * timeElapsed + D;
  const curY = ORG_Y - (f(timeElapsed) / H) * STAGE_HEIGHT - D;
  const imgWidth = 300 * rate;
  const imgHeight = 300 * rate;
  ctx.save();
  ctx.translate(curX, curY);
  if (crashImages.length == crashImageCount)
    ctx.drawImage(
      crashImages[Math.floor(crashTimeElapsed / 2)],
      -imgWidth / 2,
      -imgHeight / 2,
      imgWidth,
      imgHeight
    );
  ctx.restore();
};

const drawBackground = () => {
  ctx.save();
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
};

const drawStatusText = () => {
  ctx.save();
  let content = f(timeElapsed).toFixed(2) + "x";
  let fontSize = width > 720 ? 72 : 48;
  if (timeElapsed < 5) {
    content = (5 - Math.floor(timeElapsed)).toString();
    ctx.globalAlpha = 1 - (timeElapsed - Math.floor(timeElapsed));
    fontSize *= 1 + ctx.globalAlpha;
  }
  if (!isRising) content = `${f(timeElapsed).toFixed(2)}x`;
  drawText(
    content,
    width > 384 ? width / 2 : ORG_X + 40,
    height / 3,
    isRising ? "#F5F5FA" : "#FF3300",
    `${fontSize}px`,
    width > 384 ? "center" : "left"
  );
  ctx.restore();
};

const draw = () => {
  ctx.clearRect(0, 0, width, height);
  let W = Math.max(10, timeElapsed * 1.1);
  let H = Math.max(2, f(timeElapsed) * 1.3);

  drawBackground();
  drawStatusText();
  if (isRising) {
    drawGraph(W, H);
    drawRocket(W, H);
  } else {
    drawCrash(W, H);
  }
  drawAxis(W, H);
};

const Rocket = (props: any) => {
  const gameState = useSelector((state: RootState) => state.crash.gameState);
  const players = useSelector((state: RootState) => state.crash.playerState);
  const canvasRef = useRef(null);

  // const drawPlayers = (
  //   ctx: any,
  //   unit: number,
  //   members: any,
  //   left: number,
  //   bottom: number,
  //   width: number,
  //   height: number
  // ) => {
  //   if (gameState.state !== constStates.playing) return;
  //   for (let i = 0; i < members.length; i++) {
  //     const member = members[i];
  //     if (member.cashPoint === 0) return;
  //     let xPos = member.cashTime;
  //     let yPos = member.cashPoint - (gameState.time - member.cashTime) * 0.25;
  //     let alpha =
  //       gameState.time - member.cashTime < 1
  //         ? 1
  //         : 1 - (gameState.time - member.cashTime - 1);
  //     alpha = Math.max(0, alpha);
  //     ctx.globalAlpha = alpha;
  //     xPos =
  //       ((width / Math.max(9, gameState.time)) * xPos + left) * unit -
  //       unit * 0.4;
  //     yPos =
  //       (bottom -
  //         (height / (Math.max(1.9, gameState.point) - 1)) * (yPos - 1)) *
  //         unit +
  //       0.4 * unit;
  //     ctx.drawImage(imageParachute, xPos, yPos, unit * 0.8, unit * 0.8);
  //     ctx.globalAlpha = 1;
  //   }
  // };

  useEffect(() => {
    const canvas: any = canvasRef.current;
    ctx = canvas.getContext("2d");
    width = canvas.parentElement.offsetWidth;
    height = ((width * 400) / 720) * (width > 384 ? 1 : 2);
    rate = (width / 1440) * (width > 384 ? 1 : 2);
    GAP = (60 * width) / 1440;
    ORG_X = GAP;
    ORG_Y = height - GAP * 0.8;
    STAGE_WIDTH = width - GAP * (width > 384 ? 2 : 4);
    STAGE_HEIGHT = height - GAP * (width > 384 ? 2.5 : 3.2);
    isRising = gameState.isRising;
    timeElapsed = gameState.timeElapsed;
    crashTimeElapsed = gameState.crashTimeElapsed;
    draw();
    return () => {};
  }, [gameState]);

  return (
    <div className="relative bg-[BACKGROUND_COLOR]" ref={props.refer}>
      <div className="blur"></div>
      <div
        className="blur2"
        // style={{ width: `0}%` }}
      ></div>
      <canvas
        className="mx-auto rounded-3xl"
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};

export default Rocket;
