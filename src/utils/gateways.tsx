import { ColumnsType } from "antd/lib/table";
import CopyButton from "../components/CopyButton";

interface DataType {
  key: string;
  name: string;
  chainId: number;
  gateway: string;
}

export const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "ChainId",
    dataIndex: "chainId",
    key: "chainId",
  },
  {
    title: "Gateway Contract",
    dataIndex: "gateway",
    key: "gateway",
    render: (text) => (
      <>
        {text} <CopyButton value={text} />
      </>
    ),
  },
];
export const assetAddresses: Record<string, string> = {
  ausdc: "0x526f0A95EDC3DF4CBDB7bb37d4F7Ed451dB8e369", // "0x2dB6a31f973Ec26F5e17895f0741BB5965d5Ae15", //0xFff8fb0C13314c90805a808F48c7DFF37e95Eb16
  usdc: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", //"0x772dF70ff68C8dEa1863794824410e90e46Cd433",
  weth: "0xc778417E063141139Fce010982780140Aa0cD5Ab"
};

export const dataSrc: DataType[] = [
  {
    key: "1",
    name: "Ethereum",
    chainId: 1,
    gateway: "0x4F4495243837681061C4743b74B3eEdf548D56A5",
  },
  {
    key: "2",
    name: "Avalanche",
    chainId: 43114,
    gateway: "0x5029C0EFf6C34351a0CEc334542cDb22c7928f78",
  },
  {
    key: "3",
    name: "Polygon",
    chainId: 137,
    gateway: "0x6f015F16De9fC8791b234eF68D486d2bF203FBA8",
  },
  {
    key: "4",
    name: "Ethereum Ropsten",
    chainId: 3,
    gateway: "0xBC6fcce7c5487d43830a219CA6E7B83238B41e71",
  },
  {
    key: "5",
    name: "Polygon Mumbai",
    chainId: 80001,
    gateway: "0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B",
  },
];
