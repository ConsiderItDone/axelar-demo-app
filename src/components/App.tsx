import { Web3ApiProvider } from "@web3api/react";
import { useMetaMask } from "metamask-react";
import Axelar from "./Axelar";
import { Header } from "antd/lib/layout/layout";
import { Button, Layout } from "antd";
import { getPlugins, toChainId, wrapperUri } from "../utils";

function App() {
  const { connect, status, account, ethereum, chainId } = useMetaMask();

  const handleConnect = () => {
    if (status !== "connected") {
      connect();
    }
  };

  return (
    <Layout>
      <Header>
        <Button onClick={handleConnect} type="primary">
          {status === "connected" ? account : "Connect"}
        </Button>
      </Header>
      {status === "connected" && chainId && account && (
        // @ts-ignore
        <Web3ApiProvider
          plugins={getPlugins(chainId, ethereum, account)}
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
