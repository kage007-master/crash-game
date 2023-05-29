import React, { useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { constStates } from "app/config/const";
import { RootState } from "app/store";

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Rocket = (props: any) => {
  const gameState = useSelector((state: RootState) => state.crash.gameState);
  const players = useSelector((state: RootState) => state.crash.playerState);
  const address = useSelector((state: RootState) => state.auth.user.address);
  const me =
    address &&
    players.find((player: Player) => {
      return player.address === address;
    });
  const canvasRef = useRef(null);
  const unitRef = useRef(0);
  const explosionRef: any = useRef(0);
  const imageRocket = new Image();
  imageRocket.src = "/images/rocket.png";
  const imageExplosion = new Image();
  imageExplosion.src = "/images/explosion.png";
  const imageParachute = new Image();
  imageParachute.src = "/images/parachute.png";
  const prevState: any = usePrevious(gameState);

  const drawAxois = (ctx: any, unit: number) => {
    ctx.strokeStyle = "#6D6D8F";
    ctx.lineWidth = 1;
    ctx.moveTo(unit * 1.7, unit * 1.5);
    ctx.lineTo(unit * 1.7, unit * 6.3);
    ctx.moveTo(unit * 1.7, unit * 6.3);
    ctx.lineTo(unit * 14.5, unit * 6.3);
    ctx.stroke();
  };
  const drawXLabel = (
    ctx: any,
    unit: number,
    value: number,
    left: number,
    width: number
  ) => {
    ctx.font = unit * 0.22 + "px Arial";
    ctx.fillStyle = "#6D6D8F";
    ctx.textAlign = "center";
    let standards = [2, 10, 20, 40];
    let standardLimits = [15, 30, 50, 80];
    let standardUnit: any = standards.find((standard: any, i: number) => {
      return value < standardLimits[i];
    });
    value = Math.max(10, value);
    for (let i = 0; i <= Math.floor(value / standardUnit); i++) {
      ctx.fillText(
        `${i * standardUnit}`,
        unit * left + i * ((width * unit) / value) * standardUnit,
        unit * 6.6
      );
    }
  };
  const drawYLabel = (
    ctx: any,
    unit: number,
    value: number,
    bottom: number,
    height: number
  ) => {
    ctx.font = unit * 0.22 + "px Arial";
    ctx.fillStyle = "#6D6D8F";
    ctx.textAlign = "center";
    let standards = [0.2, 1, 4, 9];
    let standardLimits = [2, 7, 20, 200];
    let standardUnit: any = standards.find((standard: any, i: number) => {
      return value < standardLimits[i];
    });
    value = Math.max(2, value);
    for (let i = 1; i <= Math.floor((value - 1) / standardUnit); i++) {
      ctx.fillText(
        `${1 + i * standardUnit}x`,
        unit * 1.35,
        unit * bottom - i * ((height * unit) / (value - 1)) * standardUnit
      );
    }
  };
  const drawGraph = (
    ctx: any,
    unit: number,
    time: number,
    point: number,
    left: number,
    bottom: number,
    width: number,
    height: number
  ) => {
    ctx.clearRect(
      unit * left,
      unit * (bottom - height),
      unit * width,
      unit * height
    );
    if (gameState.state === constStates.playing) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "tomato";
      ctx.lineCap = "round";
      ctx.moveTo(left * unit, bottom * unit);
      time = time * 10;
      const xUnit = (width / Math.max(100, time)) * unit;
      const yUnit = (height / (Math.max(2, point) - 1)) * unit;
      for (let i = 0; i < time; i++) {
        ctx.lineTo(
          left * unit + xUnit * i,
          bottom * unit - yUnit * (2 ** (i / 100) - 1)
        );
      }
      ctx.stroke();
      ctx.save();
      ctx.translate(
        left * unit + xUnit * time,
        bottom * unit - yUnit * (2 ** (time / 100) - 1)
      );
      let deg = Math.atan(
        (yUnit * (2 ** (time / 100) - 1) -
          yUnit * (2 ** ((time - 10) / 100) - 1)) /
          (xUnit * 10)
      );
      ctx.rotate(-deg);
      ctx.drawImage(imageRocket, -unit * 1.5, -unit * 0.5, unit * 3, unit * 1);
      ctx.restore();
    } else if (gameState.state === constStates.loading) {
      time = time * 10;
      const xUnit = (width / Math.max(100, time)) * unit;
      const yUnit = (height / (Math.max(2, point) - 1)) * unit;
      ctx.save();
      ctx.translate(unit * 1.7, unit * 6.3);
      let deg = Math.atan(
        (yUnit * (2 ** (10 / 100) - 1) - yUnit * (2 ** ((10 - 10) / 100) - 1)) /
          (xUnit * 10)
      );
      ctx.rotate(-deg);
      ctx.drawImage(imageRocket, -1.5 * unit, -0.5 * unit, unit * 3, unit * 1);
      ctx.restore();
    } else if (gameState.state === constStates.crash) {
      if (gameState.time * 10 > 17) return;
      let t = 10 * explosionRef.current.time;
      let p = explosionRef.current.point;
      const xUnit = (width / Math.max(100, t)) * unit;
      const yUnit = (height / (Math.max(2, p) - 1)) * unit;
      ctx.drawImage(
        imageExplosion,
        192 * ((gameState.time * 10) % 5),
        192 * Math.floor((gameState.time * 10) / 5),
        192,
        192,
        left * unit + xUnit * t - 1.5 * unit,
        bottom * unit - yUnit * (2 ** (t / 100) - 1) - 1.5 * unit,
        unit * 3,
        unit * 3
      );
    }
  };
  const drawPlayers = (
    ctx: any,
    unit: number,
    members: any,
    left: number,
    bottom: number,
    width: number,
    height: number
  ) => {
    if (gameState.state !== constStates.playing) return;
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (member.cashPoint === 0) return;
      let xPos = member.cashTime;
      let yPos = member.cashPoint - (gameState.time - member.cashTime) * 0.25;
      let alpha =
        gameState.time - member.cashTime < 1
          ? 1
          : 1 - (gameState.time - member.cashTime - 1);
      alpha = Math.max(0, alpha);
      ctx.globalAlpha = alpha;
      xPos =
        ((width / Math.max(9, gameState.time)) * xPos + left) * unit -
        unit * 0.4;
      yPos =
        (bottom -
          (height / (Math.max(1.9, gameState.point) - 1)) * (yPos - 1)) *
          unit +
        0.4 * unit;
      ctx.drawImage(imageParachute, xPos, yPos, unit * 0.8, unit * 0.8);
      ctx.globalAlpha = 1;
    }
  };
  useEffect(() => {
    if (
      prevState &&
      prevState.state === constStates.playing &&
      gameState.state === constStates.crash
    )
      explosionRef.current = prevState;
    const canvas: any = canvasRef.current;
    unitRef.current = Math.floor(canvas.parentElement.offsetWidth / 16);
    const ctx = canvas.getContext("2d");
    const unit = unitRef.current;
    ctx.clearRect(0, 0, unit * 16, unit * 8);
    drawAxois(ctx, unit);
    drawXLabel(ctx, unit, gameState.time, 1.7, 12.8);
    drawYLabel(ctx, unit, gameState.point, 6.3, 4.8);
    drawGraph(ctx, unit, gameState.time, gameState.point, 1.7, 6.3, 12.8, 4.8);
    drawPlayers(ctx, unit, players, 1.7, 6.3, 12.8, 4.8);
    return () => {};
  }, [gameState]);

  return (
    <div className="rounded-3xl bg-card relative pt-5" ref={props.refer}>
      <div>
        <img
          src="/images/shadow-board.png"
          className="absolute inset-0 w-full h-full rounded-3xl"
        ></img>
      </div>
      <canvas
        className="m-auto relative "
        ref={canvasRef}
        width={unitRef.current * 16}
        height={unitRef.current * 8}
      />
      {gameState.state === constStates.playing ? (
        <div className="absolute top-0 left-0 w-full h-full pt-[18%]  text-white font-bold lg:text-[4vw] text-[6vw] lg:pl-[25vw] pl-[38vw]">
          {"x " + gameState.point.toFixed(2)}
        </div>
      ) : gameState.state === constStates.crash ? (
        <div className="absolute top-0 left-0 w-full h-full pt-[21%]  text-red-500 font-bold lg:text-[3vw] text-[4.5vw] lg:pl-[19vw] pl-[31vw]">
          {"Crashed @ x " +
            (explosionRef.current.point
              ? explosionRef.current.point.toFixed(2)
              : "1.00")}
        </div>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full pt-[21%] text-white font-bold lg:text-[3vw] text-[4.5vw] lg:pl-[21vw] pl-[32vw]">
          {"Launch in " + (6 - gameState.time).toFixed(1) + " s"}
        </div>
      )}
    </div>
  );
};

export default Rocket;
