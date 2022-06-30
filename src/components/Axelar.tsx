import GetDepositAddress from "./GetDepositAddress";
import { Button, Layout } from "antd";
import { useMetaMask } from "metamask-react";
import SendToken from "./SendToken";
import { Content, Header } from "antd/lib/layout/layout";

export default function Axelar() {
  return (
    <Content
      style={{
        height: "100vh",
        display: "flex",
        gap: "20px",
        margin: "0 auto ",
        justifyContent: "center",
        flexDirection: "row",
        paddingTop: "10%",
      }}
    >
      <GetDepositAddress />
      <SendToken />
    </Content>
  );
}
