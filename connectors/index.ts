import NetworkConnector from "./NetworkConnector";


export const network = new NetworkConnector({
    defaultChainId: 4,
    urls: {
        1: "https://eth-mainnet.g.alchemy.com/v2/VeGNNvyUMm_WjwEF8UZi8LTsNLTp_i5L"
    },
})