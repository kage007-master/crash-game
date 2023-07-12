import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinSVG } from "app/config/const";
import { socketEvents } from "app/providers/socket";
import NumberInput from "app/components/NumberInput";
import Iconify from "app/components/Iconify";
import html2canvas from "html2canvas";
import { setScreenshot, setSetting } from "app/store/modal.slice";
import { ToastrContext } from "app/providers/ToastrProvider";
import { setBalance } from "app/store/auth.slice";
import { RootState } from "app/store";
import { f } from "../../utils/util";

const Action = (props: any) => {
  const dispatch = useDispatch();
  const notify = useContext(ToastrContext);
  const chain = useSelector((state: RootState) => state.modal.chain);
  const fixedBetAmount = 8;
  const maxBetAmount = useSelector(
    (state: RootState) => state.auth.user.balance[chain]
  );
  const minBetAmount = Math.min(Number(0.00000001), Number(maxBetAmount));
  const [betAmount, setBetAmount] = useState(minBetAmount.toFixed(8));
  const [autoCash, setAutoCash] = useState((1.01).toFixed(2));
  const [isAutoCash, setIsAutoCash] = useState(false);
  const gameState = useSelector((state: RootState) => state.crash.gameState);
  const auth = useSelector((state: RootState) => state.auth);
  const players = useSelector((state: RootState) => state.crash.playerState);
  const me = players.find((player: Player) => {
    return player.address === auth.user.address;
  });
  const waitings = useSelector((state: RootState) => state.crash.waitingState);
  const promise = waitings.find((player: Player) => {
    return player.address === auth.user.address;
  });
  const MainCoin = coinSVG[chain];
  useEffect(() => {
    if (
      Number(betAmount) > Number(maxBetAmount) ||
      Number(betAmount) < Number(minBetAmount)
    )
      setBetAmount(
        Math.min(Number(minBetAmount), Number(maxBetAmount)).toFixed(8)
      );
    return () => {};
  }, [maxBetAmount]);

  const handlePrint = () => {
    html2canvas(props.target.current)
      .then((canvas) => {
        const screenshotDataUrl = canvas.toDataURL("image/png");
        dispatch(setScreenshot(screenshotDataUrl));
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
      });
  };

  const onCashOut = () => {
    let me = players.find((player: Player) => {
      return player.address === auth.user.address;
    });
    if (me)
      dispatch(
        setBalance({
          chain: me.chain,
          amount: Number((me.betAmount * f(gameState.timeElapsed)).toFixed(8)),
        })
      );
    socketEvents.emitCashOut({
      address: auth.user.address,
      time: gameState.timeElapsed,
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row mt-4 gap-4">
        <div className="flex gap-1 md:w-[50%]">
          <div className="relative w-full">
            <div className="absolute flex items-center h-full left-2.5">
              <MainCoin className="w-6 h-6" />
            </div>
            <NumberInput
              onChange={(e: any) => {
                setBetAmount(e);
              }}
              onBlur={() => {
                const filterValue: any = Math.min(
                  Math.max(Number(betAmount), Number(minBetAmount)),
                  Number(maxBetAmount)
                );
                setBetAmount(filterValue.toFixed(fixedBetAmount));
              }}
              min={minBetAmount}
              max={maxBetAmount}
              value={betAmount}
              fixed={fixedBetAmount}
              className="w-full h-full bg-back py-3 pr-4 pl-10 m-rounded text-[white] transition duration-300 outline-none"
            ></NumberInput>
          </div>
          <button
            onClick={() => {
              setBetAmount(
                Math.min(Number(betAmount) * 2, maxBetAmount).toFixed(8)
              );
            }}
            className="bg-card p-3 md:p-4 outline-none m-rounded flex-none anim hover:bg-border"
          >
            <p className="w-6 h-6 flex items-center justify-center">x2</p>
          </button>
          <button
            onClick={() => {
              setBetAmount(
                Math.max(Number(betAmount) / 2, minBetAmount).toFixed(8)
              );
            }}
            className="bg-card p-3 md:p-4 outline-none m-rounded flex-none anim hover:bg-border"
          >
            <p className="w-6 h-6 flex items-center justify-center">1/2</p>
          </button>
        </div>
        <div className="flex gap-1 md:w-[50%]">
          <div className="relative w-full">
            <NumberInput
              onChange={(e: any) => {
                setAutoCash(e);
              }}
              onBlur={() => {
                setAutoCash(Math.max(Number(autoCash), 1.01).toFixed(2));
              }}
              min={1.01}
              value={autoCash}
              fixed={2}
              disabled={!isAutoCash}
              className={`w-full h-full bg-back py-3 px-4 m-rounded text-white transition duration-300 outline-none disabled:text-secondary`}
            ></NumberInput>
          </div>
          <button
            onClick={() => {
              setIsAutoCash(!isAutoCash);
            }}
            className="bg-card p-3 md:p-4 outline-none m-rounded flex-none flex items-center justify-center hover:bg-border anim"
          >
            <Iconify
              icon={isAutoCash ? "clarity:unlock-line" : "clarity:lock-line"}
              className={"w-6 h-6"}
            />
          </button>
        </div>
      </div>
      <div className="lg:mt-6 mt-4 flex items-center justify-between ">
        <div
          className="flex items-center m-rounded cursor-pointer p-3 md:p-4 anim hover:bg-card"
          onClick={() => dispatch(setSetting(true))}
        >
          <Iconify
            icon="simple-line-icons:settings"
            className="w-6 h-6 cursor-pointer"
          ></Iconify>
        </div>
        <button
          className="py-3 md:py-4 min-w-[200px] px-6 text-center justify-center flex items-center bg-[url('app/assets/images/button.png')] bg-[length:100%_100%] text-white rounded-full text-base relative transition-all duration-300 hover:shadow-[0_0_15px_5px_#818cf850]"
          onClick={() => {
            !auth.token
              ? notify.error("Please login!")
              : gameState.isRising && gameState.timeElapsed <= 5 && !me
              ? socketEvents.emitBet({
                  address: auth.user.address,
                  amount: Number(betAmount),
                  chain,
                })
              : gameState.isRising && gameState.timeElapsed <= 5 && me
              ? console.log("loading")
              : gameState.isRising &&
                gameState.timeElapsed >= 5 &&
                me &&
                me.cashPoint === 0
              ? onCashOut()
              : promise
              ? socketEvents.emitCancelPromise({ address: auth.user.address })
              : socketEvents.emitPromise({
                  address: auth.user.address,
                  amount: Number(betAmount),
                  chain,
                });
          }}
        >
          {!auth.token
            ? "Place Bet!"
            : gameState.isRising && gameState.timeElapsed <= 5 && !me
            ? "Bet"
            : gameState.isRising && gameState.timeElapsed <= 5 && me
            ? "Loading"
            : gameState.isRising &&
              gameState.timeElapsed > 5 &&
              me &&
              me.cashPoint === 0
            ? "Cash Out"
            : promise
            ? "Loading (Cancel)"
            : "Bet (Next Round)"}
        </button>
        <div
          className="hidden sm:flex items-center m-rounded cursor-pointer p-3 md:p-4 hover:bg-card anim"
          onClick={handlePrint}
        >
          <Iconify
            icon="iconamoon:screen-full-thin"
            className="w-6 h-6 cursor-pointer"
          ></Iconify>
        </div>
      </div>
    </div>
  );
};

export default Action;
