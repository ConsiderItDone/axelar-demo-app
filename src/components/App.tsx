import { PolywrapProvider } from "@polywrap/react";
import { useMetaMask } from "metamask-react";
import Axelar from "./Axelar";
import { Header } from "antd/lib/layout/layout";
import { Button, Layout, notification } from "antd";
import { getPluginsConfig } from "../utils";

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
          plugins={getPluginsConfig(chainId, ethereum, account)}
        >
          <Axelar />
        </PolywrapProvider>
      )}
    </Layout>
  );
}

export default App;
