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
  symbol: "aUSDC",
  tokenAddress: assetAddresses.ausdc,
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
        )
      }`,
    config: {
      envs: [
        {
          uri: wrapperUri,
          common: {
            chainId: Number(toChainId(chainId)),
          },
        },
      ],
    },
  });

  const gatewayAddress = dataSrc.find(
    (chain) => chain.chainId.toString() === toChainId(String(chainId))
  )?.gateway;

  const onFinish = async (values: any) => {
    const variables = { ...values, gatewayAddress };

    console.log("sendToken params", variables);

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
    console.log(values);
    if (values.symbol) {
      const symbol = values.symbol?.toLowerCase();
      if (assetAddresses[symbol])
        onChangeFormValue("tokenAddress", assetAddresses[symbol]);
      else onChangeFormValue("tokenAddress", "");
    }
  };

  return (
    <Form
      name="sendToken"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      onValuesChange={onValueChanged}
      style={{ width: "600px" }}
    >
      <h2 style={{ width: "fit-content", margin: "10px auto" }}>Send Token</h2>
      <Item
        label={
          <>
            Gateway Address &nbsp;
            <Popover
              title="Current network"
              content={toNetworkName(String(chainId))}
            >
              <QuestionCircleOutlined />
            </Popover>
          </>
        }
      >
        <Input readOnly value={gatewayAddress} />
      </Item>
      <Item label="To Chain" name="destinationChain" required>
        <Select
          onChange={(value) => {
            onChangeFormValue("destinationChain", value);
          }}
        >
          {options}
        </Select>
      </Item>
      <Item label="User Address" name="destinationAddress" required>
        <Input />
      </Item>
      <Item label="Asset" name="symbol" required>
        <Input />
      </Item>
      <Item label="Token Address" name="tokenAddress">
        <Input />
      </Item>
      <Item label="Amount" name="amount" required>
        <Input />
      </Item>
      <Item wrapperCol={{ span: 16, style: { marginLeft: "auto" } }}>
        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          disabled={status !== "connected"}
          style={{ margin: "0 auto", width: "100%" }}
        >
          Send Token
        </Button>
      </Item>
    </Form>
  );
}
