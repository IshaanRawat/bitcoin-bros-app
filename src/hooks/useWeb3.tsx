import { Web3Context } from "@/contexts/web3";
import { useContext } from "react";

const useWeb3 = () => useContext(Web3Context);

export default useWeb3;
