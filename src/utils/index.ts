import { ConnectionConfigs } from "@web3api/client-js/build/pluginConfigs/Ethereum";
import { dataSrc } from "./gateways";
import {} from "ethers";
export const chains = [
  "Avalanche",
  "Axelar",
  "Cosmoshub",
  "Crescent",
  "EMoney",
  "Ethereum",
  "Fantom",
  "Injective",
  "Juno",
  "Moonbeam",
  "Osmosis",
  "Polygon",
  "Terra",
];

export const wrapperUri =
  "w3://ipfs/QmRBmNJF7LaXR7updfBJfeiWVGfWcaux9tEkiyYwqZ2X4q"; // w3://ipfs/QmRBmNJF7LaXR7updfBJfeiWVGfWcaux9tEkiyYwqZ2X4q - with txOverrides
//"w3://ipfs/QmWfpQnQPxra1rwuScY3mn6Kj6wLRV91gfsnukizqu1DUz"

export const toChainId = (number: number): string => {
  return "0x" + toHex(number);
};

export const toHex = (number: number) => "0x" + number.toString(16);
export const fromHex = (hex: string) => parseInt(hex.replace("0x", ""), 16);

export const getEthereumPluginConfig = (
  chainId: string,
  provider: any,
  account: string
): ConnectionConfigs => {
  return {
    [chainId]: {
      provider: provider,
      signer: account,
    },
  };
};
