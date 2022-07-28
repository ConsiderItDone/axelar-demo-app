import { Web3ApiProvider } from "@web3api/react";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { useMetaMask } from "metamask-react";
import Axelar from "./Axelar";
import { axelarPlugin } from "@cidt/axelar-polywrap-js";
import { Header } from "antd/lib/layout/layout";
import { Button, Layout, notification } from "antd";
import {
  fromHex,
  getEthereumPluginConfig,
  toChainId,
  wrapperUri,
} from "../utils";

function App() {
  const { connect, status, account, ethereum, chainId } = useMetaMask();

  const handleConnect = () => {
    if (status !== "connected") {
      connect();
    } else {
      navigator.clipboard.writeText(account);
      notification.success({
        message: "Success",
        duration: 20000,
        description: `${account} Copied to Clipboard`,
      });
    }
  };

  return (
    <Layout>
      <Header className="sticky">
        <Button onClick={handleConnect} type="primary">
          {status === "connected" ? account : "Connect"}
        </Button>
      </Header>
      {status === "connected" && chainId && account && (
        // @ts-ignore
        <Web3ApiProvider
          plugins={[
            {
              uri: "w3://ens/ethereum.web3api.eth",
              plugin: ethereumPlugin({
                networks: getEthereumPluginConfig(chainId, ethereum, account),
                defaultNetwork: "ropsten",
              }),
            },
            {
              uri: "w3://ens/axelar.web3api.eth",
              // @ts-ignore
              plugin: axelarPlugin({ environment: "testnet" }),
            },
          ]}
          envs={[
            {
              uri: wrapperUri,
              common: {
                chainId: Number(fromHex(chainId)),
              },
            },
          ]}
        >
          <Axelar />
        </Web3ApiProvider>
      )}
      <BGCircles />
    </Layout>
  );
}

export function BGCircles() {
  return (
    <>
      <div className="circle left" />
      <div className="circle right" />
    </>
  );
}

export default App;
