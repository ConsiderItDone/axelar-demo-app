import { Button, Form, Input, Select, notification, Popover } from "antd";
import { useWeb3ApiQuery } from "@web3api/react";

import { assetAddresses, dataSrc } from "../utils/gateways";
import { toChainId, toNetworkName, wrapperUri } from "../utils";
import { useConnectedMetaMask } from "metamask-react";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Item } = Form;

const options = dataSrc.map((chain) => (
  <Option key={chain.chainId} value={chain.name}>
    {chain.name}
  </Option>
));

const initialValues = {
  destinationChain: "Polygon Mumbai",
  destinationAddress: "0xd405aebF7b60eD2cb2Ac4497Bddd292DEe534E82",
  symbol: "USDC",
  tokenAddress: assetAddresses.usdc,
  amount: "1000000",
};

export default function SendToken() {
  const [form] = Form.useForm();

  const { status, chainId } = useConnectedMetaMask();

  const { execute, loading } = useWeb3ApiQuery<{ approveAndSendToken: any }>({
    uri: wrapperUri,
    query: `
      mutation {
        approveAndSendToken(
          destinationChain: $destinationChain
          destinationAddress: $destinationAddress
          symbol: $symbol
          amount: $amount
          gatewayAddress: $gatewayAddress
          tokenAddress: $tokenAddress
          txOverrides: $txOverrides
        )
      }`,
  });

  const gatewayAddress = dataSrc.find(
    (chain) => chain.chainId.toString() === toChainId(String(chainId))
  )?.gateway;

  const onFinish = async (values: any) => {
    const variables = {
      ...values,
      gatewayAddress,
      txOverrides: { gasLimit: "100000", gasPrice: null, value: null },
    };

    const { data, errors } = await execute(variables);

    if (errors) {
      console.log(errors);
      notification.error({
        message: "Error",
        description: errors[0].message,
      });
      return;
    }

    const result = data?.approveAndSendToken?.transactionHash;

    if (result) {
      console.log(result);
      notification.success({
        message: "Success",
        description: `Your transaction receipt is: ${result}`,
      });
    }
  };

  const onChangeFormValue = (itemName: string, value: string) => {
    form.setFieldsValue({ [itemName]: value });
  };

  const onValueChanged = (values: any) => {
    if (values.symbol) {
      const symbol = values.symbol?.toLowerCase();
      if (assetAddresses[symbol])
        onChangeFormValue("tokenAddress", assetAddresses[symbol]);
      else onChangeFormValue("tokenAddress", "");
    }
  };

  console.log(gatewayAddress);

  return (
    <Form
      name="sendToken"
      initialValues={initialValues}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      onValuesChange={onValueChanged}
    >
      <h2 style={{ width: "fit-content", margin: "10px auto" }}>Send Token</h2>
      <Item>
        <Input
          readOnly
          prefix="Gateway Address"
          value={gatewayAddress}
          suffix={
            <Popover
              title="Current network"
              content={toNetworkName(String(chainId))}
            >
              <QuestionCircleOutlined />
            </Popover>
          }
        />
      </Item>
      <Item name="destinationChain" required>
        <Select
          onChange={(value) => {
            onChangeFormValue("destinationChain", value);
          }}
          className="toChain"
        >
          {options}
        </Select>
      </Item>
      <Item name="destinationAddress" required>
        <Input prefix="User Address" />
      </Item>
      <Item name="symbol" required>
        <Input prefix="Asset" />
      </Item>
      <Item name="tokenAddress">
        <Input prefix="Token Address" />
      </Item>
      <Item name="amount" required>
        <Input prefix="Amount" />
      </Item>
      <Item>
        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          disabled={status !== "connected"}
          style={{ width: "100%" }}
        >
          Send Token
        </Button>
      </Item>
    </Form>
  );
}
