import GetDepositAddress from "./GetDepositAddress";
import SendToken from "./SendToken";
import { Content } from "antd/lib/layout/layout";
import logo from "../images/logo.png";
import Lines from "./Lines";

export default function Axelar() {
  return (
    <Content>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          maxWidth: "1080px",
          gap:'170px',
          margin: "100px auto 0",
        }}
      >
        <h1>
          Polywrap
          <br />
          <span className="blue">Axelar</span>
          <br />
          Integration
        </h1>
        <img src={logo} />
      </div>
      <Lines />
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
