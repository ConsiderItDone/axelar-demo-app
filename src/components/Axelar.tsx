import GetDepositAddress from "./GetDepositAddress";
import { Button, Image, Layout } from "antd";
import { useMetaMask } from "metamask-react";
import SendToken from "./SendToken";
import { Content, Header } from "antd/lib/layout/layout";
import logo from "../images/logo.png";
import waves from "../images/waves.svg";

export default function Axelar() {
  return (
    <Content>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          maxWidth: "1080px",
          margin: "100px auto 0",
        }}
      >
        <h1>Polywrap Axelar Integration</h1>
        <img src={logo} />
      </div>
      <img src={waves} style={{ width: "100%", marginTop: "-78px" }} />
      <div
        style={{
          display: "flex",
          gap: "48px",
          margin: "60px auto ",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <GetDepositAddress />
        <SendToken />
      </div>
    </Content>
  );
}
