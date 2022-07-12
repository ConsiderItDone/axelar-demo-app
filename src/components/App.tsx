import { Web3ApiProvider } from "@web3api/react";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { useMetaMask } from "metamask-react";
import Axelar from "./Axelar";
import { axelarPlugin } from "@cidt/axelar-polywrap-js";
import { Header } from "antd/lib/layout/layout";
import { Button, Layout } from "antd";
import { getEthereumPluginConfig, toChainId, wrapperUri } from "../utils";

function App() {
  const { connect, status, account, ethereum, chainId } = useMetaMask();

  const handleConnect = () => {
    if (status !== "connected") {
      connect();
    }
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
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
                chainId: Number(toChainId(chainId)),
              },
            },
          ]}
        >
          <Axelar />
        </Web3ApiProvider>
      )}
    </Layout>
  );
}

export default App;
