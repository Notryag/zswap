import { useActiveWebReact } from "@/hooks"

export default function Header() {
    const {account, chainId} = useActiveWebReact()
    return (
        <>
            <div>header</div>
            <div>{account}</div>
            <div>{chainId}</div>
        </>
    )
}