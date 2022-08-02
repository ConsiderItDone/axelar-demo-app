import { axelarPlugin } from "@cidt/axelar-polywrap-js";
import { ethereumPlugin } from "@polywrap/ethereum-plugin-js";
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
  "wrap://ipfs/QmTbxoFR4n3Dzyx49Nuge8JAub156kpvdidTWc1T5eYTpo";

export const toChainId = (number: number): string => {
  return "0x" + toHex(number);
};

export const toHex = (number: number) => "0x" + number.toString(16);
export const fromHex = (hex: string) => parseInt(hex.replace("0x", ""), 16);

export const getPluginsConfig = (
  chainId: string,
  provider: any,
  account: string
) => [
  {
    uri: "wrap://ens/ethereum.polywrap.eth",
    plugin: ethereumPlugin({
      networks: {
        [chainId]: {
          provider: provider,
          signer: account,
        },
      },
      defaultNetwork: "ropsten",
    }),
  },
  {
    uri: "wrap://ens/axelar.polywrap.eth",
    //@ts-ignore
    plugin: axelarPlugin({ environment: "testnet" }),
  },
];
