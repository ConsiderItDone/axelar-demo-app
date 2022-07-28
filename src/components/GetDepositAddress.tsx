import { Button, Form, Input, Select, notification } from "antd";
import AssetSelect from "./AssetSelect";
import { useWeb3ApiQuery } from "@web3api/react";
import CopyButton from "./CopyButton";
import { chains, wrapperUri } from "../utils";
import { useMetaMask } from "metamask-react";

const { Option } = Select;
const { Item } = Form;

const options = chains.map((chain) => (
  <Option key={chain} value={chain.toLowerCase()}>
    {chain}
  </Option>
));

const initialValues = {
  fromChain: "axelar",
  toChain: "avalanche",
  asset: "uausdc",
};

export default function GetDepositAddress() {
  const [form] = Form.useForm();

  const { execute, loading } = useWeb3ApiQuery<{ getDepositAddress: string }>({
    uri: wrapperUri,
    query: `
      query {
        getDepositAddress(
          fromChain: $fromChain
          toChain: $toChain
          destinationAddress: $destinationAddress
          asset: $asset
          options: $options
        )
      }`,
  });

  const onFinish = async (values: any) => {
    const { data, errors } = await execute({ ...values, options: null });
    const depositAddress = data?.getDepositAddress;

    if (errors) {
      console.log(errors);
      notification.error({
        message: "Error",
        description: errors[0].message,
      });
    }

    if (depositAddress) {
      notification.success({
        message: "Success",
        duration: 600000,
        description: (
          <>
            <span>Your deposit address: {depositAddress}</span>
            <br />
            <CopyButton value={depositAddress} />
          </>
        ),
      });
    }
  };

  const onChangeFormValue = (itemName: string, value: string) => {
    form.setFieldsValue({ [itemName]: value });
  };

  return (
    <Form
      name="getDepositAddress"
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      style={{ width: "400px" }}
    >
      <h2 style={{ width: "fit-content", margin: "10px auto" }}>
        Get Deposit Address
      </h2>
      <Item name="fromChain">
        <Select
          onChange={(value) => onChangeFormValue("fromChain", value)}
          className="fromChain"
        >
          {options}
        </Select>
      </Item>
      <Item name="toChain">
        <Select
          onChange={(value) => onChangeFormValue("toChain", value)}
          className="toChain"
        >
          {options}
        </Select>
      </Item>
      <Item
        name="destinationAddress"
        required
        rules={[
          { required: true, message: "Please input destination address" },
        ]}
      >
        <Input prefix={"Destination address"} />
      </Item>
      <Item name="asset">
        <AssetSelect onChange={(value) => onChangeFormValue("asset", value)} />
      </Item>
      <Item>
        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          style={{ width: "100%" }}
        >
          Get Deposit Address
        </Button>
      </Item>
    </Form>
  );
}
