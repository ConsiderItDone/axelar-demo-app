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

export const toChainId = (id: string) => {
  return id.replace("0x", "");
};

export const toNetworkName = (id: string) => {
  const chainId = toChainId(id);
  return dataSrc.find((chain) => chain.chainId.toString() === chainId)?.name;
};

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
