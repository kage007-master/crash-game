import React from "react";
import ModalSignUp from "./ModalSignUp";
import ModalWalletConnect from "./ModalWalletConnect";
import ModalScreenshot from "./ModalScreenshot";
import ModalSetting from "./ModalSetting";
import ModalSelChain from "./ModalSelChain";
import ModalWithdraw from "./ModalWithdraw";
import ModalDeposit from "./ModalDeposit";
import ModalSwap from "./ModalSwap";

const Modals = () => {
  return (
    <>
      <ModalSelChain />
      <ModalSetting />
      <ModalDeposit />
      <ModalWithdraw />
      <ModalSwap />
      <ModalSignUp></ModalSignUp>
      <ModalWalletConnect></ModalWalletConnect>
      <ModalScreenshot></ModalScreenshot>
    </>
  );
};

export default Modals;
