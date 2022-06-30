import React, { useState } from "react";
import "./style.css";
import GetDepositAddress from "../src/GetDepositAddress";
import { Layout, Menu, Tabs } from "antd";
import { Content, Header } from "antd/lib/layout/layout";

const { TabPane } = Tabs;

export default function Axelar() {
  const [activeTab, setActiveTab] = useState("sendToken");

  return (
    <Layout style={{ height: "100vh" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          margin: "0 auto ",
          alignItems: "center",
          height: "60%",
        }}
      >
        <GetDepositAddress />
        <GetDepositAddress />
      </div>
    </Layout>
  );
}
