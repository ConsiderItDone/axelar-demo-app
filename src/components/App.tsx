import { PolywrapProvider } from "@polywrap/react";
import { ethereumPlugin } from "@polywrap/ethereum-plugin-js";
import { useMetaMask } from "metamask-react";
import Axelar from "./Axelar";
import { axelarPlugin } from "@cidt/axelar-polywrap-js";
import { Header } from "antd/lib/layout/layout";
import { Button, Layout, notification } from "antd";
import { fromHex, getEthereumPluginConfig, wrapperUri } from "../utils";

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
        //@ts-ignore
        <PolywrapProvider
          plugins={[
            {
              uri: "wrap://ens/ethereum.polywrap.eth",
              plugin: ethereumPlugin({
                networks: getEthereumPluginConfig(chainId, ethereum, account),
                defaultNetwork: "ropsten",
              }),
            },
            {
              uri: "wrap://ens/axelar.polywrap.eth",
              //@ts-ignore
              plugin: axelarPlugin({ environment: "testnet" }),
            },
          ]}
          envs={[
            {
              uri: wrapperUri,
              env: {
                chainId: Number(fromHex(chainId)),
              },
            },
          ]}
        >
          <Axelar />
        </PolywrapProvider>
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
