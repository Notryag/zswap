import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { getAddress } from "ethers/lib/utils.js";
import { AddressZero } from '@ethersproject/constants'
import { Contract } from "ethers";

export function isAddress(value: any): string | false {
    try {
        return getAddress(value)
    } catch (error) {
        return false
    }
}

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

export function getContract(address: string, ABI: any, library: Web3Provider, account?: string) {
    if (!address || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    return new Contract(address, ABI, getProviderOrSigner(library, account))
}