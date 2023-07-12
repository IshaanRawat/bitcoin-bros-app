import config from "@/data/config.json";
import { base64, hex } from "@scure/base";
import * as btc from "micro-btc-signer";
import queries from "./queries";

const getPSBT = async (
  paymentAddress: string,
  paymentPublicKey: string,
  recipient: string,
  amount: number,
  fee: number
) => {
  const tx = new btc.Transaction();
  const bitcoinNetwork =
    config.BITCOIN_NETWORK === "Mainnet" ? btc.NETWORK : btc.TEST_NETWORK;
  const utxos = await queries.PHALLUS_WHITELIST_UTXOS();
  const utxo = utxos.data.results[utxos.data.results.length - 1];

  const publicKey = hex.decode(paymentPublicKey);

  const p2wpkh = btc.p2wpkh(publicKey, bitcoinNetwork);
  const p2sh = btc.p2sh(p2wpkh, bitcoinNetwork);

  tx.addInput({
    txid: utxo.txid,
    index: utxo.vout,
    witnessUtxo: {
      script: p2sh.script,
      amount: BigInt(utxo.value),
    },
    redeemScript: p2sh.redeemScript,
  });

  tx.addOutputAddress(recipient, BigInt(amount), bitcoinNetwork);
  tx.addOutputAddress(
    paymentAddress,
    BigInt(utxo.value - amount - fee),
    bitcoinNetwork
  );

  const psbt0 = tx.toPSBT(0);
  const psbtB64 = base64.encode(psbt0);
  const psbtHex = hex.encode(psbt0);

  return { base64: psbtB64, hex: psbtHex };
};

export { getPSBT };
