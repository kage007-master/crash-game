import React, { useEffect, useContext } from "react";
import Modal from "react-modal";
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton,
} from "app/components/sdkComponents";

import { useGetIsLoggedIn } from "app/hooks/sdkDappHooks";
import { useDispatch, useSelector } from "react-redux";
import { setWalletConnect } from "app/store/modal.slice";
import { ToastrContext } from "app/providers/ToastrProvider";

import { ReactComponent as Icon1 } from "app/assets/svg/wallet-icon-1.svg";
import { ReactComponent as Icon2 } from "app/assets/svg/wallet-icon-2.svg";
import { ReactComponent as Icon3 } from "app/assets/svg/wallet-icon-3.svg";
import { ReactComponent as Icon4 } from "app/assets/svg/wallet-icon-4.svg";
import { RootState } from "app/store";

Modal.setAppElement("body");
const ModalWalletConnect = () => {
  const notify = useContext(ToastrContext);
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.walletConnect
  );
  const dispatch = useDispatch();
  const isLogin = useGetIsLoggedIn();
  const commonProps = { nativeAuth: true };

  useEffect(() => {
    if (isLogin) {
      dispatch(setWalletConnect(false));
      notify.success("Wallect Connected");
    }
    return () => {};
  }, [isLogin]);

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => dispatch(setWalletConnect(false))}
        className="modal-fade modal-content"
        overlayClassName="bg-[rgba(14,18,36,.7)] fixed w-full h-full top-0 left-0 backdrop-blur-xl z-50"
      >
        <h3 className="text-2xl font-semibold text-bright mt-2">
          Connect your wallet
        </h3>
        <p className="text-body font-capital mt-2 mb-5">
          Please select a wallet to connect to our site
        </p>
        <div className="flex flex-col gap-2">
          <ExtensionLoginButton
            loginButtonText="MultiversX DeFi Wallet"
            className="bg-card border border-border hover:bg-border hover:border-border text-secondary hover:text-bright font-normal"
            {...commonProps}
          >
            <div className="flex flex-row items-center">
              <Icon1 />
              <span className="text-header font-button ml-3">
                MultiversX DeFi Wallet
              </span>
            </div>
          </ExtensionLoginButton>
          <WebWalletLoginButton
            loginButtonText="MultiversX Web Wallet"
            className="bg-card border border-border hover:bg-border hover:border-border text-secondary hover:text-bright font-normal"
            {...commonProps}
          >
            <div className="flex flex-row items-center">
              <Icon2 />
              <span className="text-header font-button ml-3">
                MultiversX Web Wallet
              </span>
            </div>
          </WebWalletLoginButton>
          <LedgerLoginButton
            loginButtonText="Ledger"
            className="bg-card border border-border hover:bg-border hover:border-border text-secondary hover:text-bright font-normal"
            {...commonProps}
          >
            <div className="flex flex-row items-center">
              <Icon3 />
              <span className="text-header font-button ml-3">Ledger</span>
            </div>
          </LedgerLoginButton>
          <WalletConnectLoginButton
            loginButtonText="xPortal App"
            className="bg-card border border-border hover:bg-border hover:border-border text-secondary hover:text-bright font-normal"
            {...commonProps}
          >
            <div className="flex flex-row items-center">
              <Icon4 />
              <span className="text-header font-button ml-3">xPortal App</span>
            </div>
          </WalletConnectLoginButton>
        </div>
      </Modal>
    </div>
  );
};

export default ModalWalletConnect;
