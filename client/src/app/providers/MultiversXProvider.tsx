import { DappProvider } from "@multiversx/sdk-dapp/wrappers";
import { TransactionsToastList } from "@multiversx/sdk-dapp/UI/TransactionsToastList";
import { SignTransactionsModals } from "@multiversx/sdk-dapp/UI/SignTransactionsModals";
import { NotificationModal } from "@multiversx/sdk-dapp/UI/NotificationModal";

import environment from "app/config";

const MultiversXProvider = (props: any) => {
  return (
    <DappProvider
      environment={environment.dappEnvironment}
      customNetworkConfig={{
        name: "customConfig",
        walletConnectV2ProjectId: environment.walletConnectV2ProjectId,
        apiTimeout: environment.apiTimeout,
      }}
    >
      <TransactionsToastList />
      <NotificationModal />
      <SignTransactionsModals className="custom-class-for-modals" />
      {props.children}
    </DappProvider>
  );
};

export default MultiversXProvider;
