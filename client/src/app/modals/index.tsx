import React from "react";
import ModalSignUp from "./ModalSignUp";
import ModalWalletConnect from "./ModalWalletConnect";
import ModalScreenshot from "./ModalScreenshot";
import ModalSetting from "./ModalSetting";
import ModalSelChain from "./ModalSelChain";

const Modals = () => {
  return (
    <>
      <ModalSelChain />
      <ModalSetting />
      <ModalSignUp></ModalSignUp>
      <ModalWalletConnect></ModalWalletConnect>
      <ModalScreenshot></ModalScreenshot>
    </>
  );
};

export default Modals;
