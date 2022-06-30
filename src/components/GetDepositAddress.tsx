import { Button, Form, Input, Select, notification } from "antd";
import AssetSelect from "./AssetSelect";
import { useWeb3ApiQuery } from "@web3api/react";
import CopyButton from "./CopyButton";
import { chains, wrapperUri } from "../utils";

const { Option } = Select;
const { Item } = Form;

const options = chains.map((chain) => (
  <Option key={chain} value={chain.toLowerCase()}>
    {chain}
  </Option>
));

const initialValues = {
  fromChain: "terra",
  toChain: "avalanche",
  destinationAddress: "0xd405aebF7b60eD2cb2Ac4497Bddd292DEe534E82",
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
    console.log("values", values);
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
  //const client = useClien

  return (
    <Form
      name="getDepositAddress"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      style={{ width: "400px" }}
    >
      <h2 style={{ width: "fit-content", margin: "10px auto" }}>
        Get Deposit Address
      </h2>
      <Item label="From Chain" name="fromChain">
        <Select onChange={(value) => onChangeFormValue("fromChain", value)}>
          {options}
        </Select>
      </Item>
      <Item label="To chain" name="toChain">
        <Select onChange={(value) => onChangeFormValue("toChain", value)}>
          {options}
        </Select>
      </Item>
      <Item
        label="Address"
        name="destinationAddress"
        required
        rules={[
          { required: true, message: "Please input destination address" },
        ]}
      >
        <Input />
      </Item>
      <Item label="Asset" name="asset">
        <AssetSelect onChange={(value) => onChangeFormValue("asset", value)} />
      </Item>
      <Item wrapperCol={{ span: 16, style: { marginLeft: "auto" } }}>
        <Button
          htmlType="submit"
          type="primary"
          loading={loading}
          style={{ margin: "0 auto", width: "100%" }}
        >
          Get Deposit Address
        </Button>
      </Item>
    </Form>
  );
}
