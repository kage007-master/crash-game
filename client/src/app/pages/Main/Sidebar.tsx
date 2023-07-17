import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ReactComponent as Logo } from "app/assets/svg/Logo.svg";
import { ReactComponent as Text } from "app/assets/svg/Text.svg";
import { ReactComponent as Home } from "app/assets/svg/Home.svg";
import { ReactComponent as Star } from "app/assets/svg/Star.svg";
import { ReactComponent as Time } from "app/assets/svg/Time.svg";
import { ReactComponent as Fire } from "app/assets/svg/Fire.svg";
import { ReactComponent as Spade } from "app/assets/svg/Spade.svg";
import { ReactComponent as Rocket } from "app/assets/svg/Rocket.svg";
import { setMenu } from "app/store/modal.slice";
import Iconify from "app/components/Iconify";
import { RootState } from "app/store";

const Sidebar = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state: RootState) => state.modal.menu);
  return (
    <>
      <div className="px-4 py-8 border-r border-border h-[100vh] hidden lg:flex flex-col items-center gap-4 fixed">
        <div>
          <Logo className="w-10 cursor-pointer" />
        </div>
        <div className="p-4 hover:bg-card anim rounded-2xl cursor-pointer mt-6">
          <Home className="w-5 h-5" />
        </div>
        <div className="p-4 hover:bg-card anim rounded-2xl cursor-pointer">
          <Star className="w-5 h-5" />
        </div>
        <div className="p-4 hover:bg-card anim rounded-2xl cursor-pointer">
          <Time className="w-5 h-5" />
        </div>
        <div className="p-4 hover:bg-card anim rounded-2xl cursor-pointer mt-6">
          <Fire className="w-5 h-5" />
        </div>
        <div className="p-4 hover:bg-card anim rounded-2xl cursor-pointer">
          <Spade className="w-5 h-5" />
        </div>
        <div className="p-4 border-border anim border rounded-2xl cursor-pointer">
          <Rocket className="w-5 h-5" />
        </div>
      </div>

      <div
        className={`sidebar fixed left-0 p-6 h-[100vh] w-full z-50 text-sm lg:hidden ${
          menu
            ? "anim-in-sidebar opacity-100 left-0"
            : "anim-out-sidebar opacity-0 left-[-100%]"
        }`}
      >
        <div className="flex items-center justify-start gap-2 w-full mb-4 uppercase">
          <Logo className="w-10 cursor-pointer" />
          <Text className="cursor-pointer" />
          <button
            className="ml-auto flex items-center m-rounded cursor-pointer p-4 anim hover:bg-card"
            onClick={() => {
              dispatch(setMenu(false));
            }}
          >
            <Iconify
              icon="uiw:close"
              className={" w-4 h-4 cursor-pointer"}
            ></Iconify>
          </button>
        </div>

        <div className="hover:bg-card menu-item mt-12">
          <Home className="w-5" />
          <div>Home</div>
        </div>
        <div className="hover:bg-card menu-item">
          <Star className="w-5" />
          <div>Star</div>
        </div>
        <div className="hover:bg-card menu-item">
          <Time className="w-5" />
          <div>History</div>
        </div>
        <div className="hover:bg-card menu-item mt-12">
          <Fire className="w-5" />
          <div>Racing</div>
        </div>
        <div className="hover:bg-card menu-item">
          <Spade className="w-5" />
          <div>Poker</div>
        </div>
        <div className="hover:bg-card menu-item active">
          <Rocket className="w-5" />
          <div>Crash</div>
        </div>
        <div className="flex justify-end items-center gap-2 uppercase text-xs fixed bottom-10 right-5">
          <div className="rounded-full w-1.5 h-1.5 bg-green"></div>
          Network Status
        </div>
      </div>
    </>
  );
};

export default Sidebar;
