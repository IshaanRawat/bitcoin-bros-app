import { base64, hex } from "@scure/base";
import * as btc from "micro-btc-signer";
import queries from "./queries";

const getPSBTBase64 = async (
  paymentAddress: string,
  paymentPublicKey: string,
  recipient: string,
  amount: number,
  fee: number
) => {
  const tx = new btc.Transaction();

  const bitcoinTestnet = {
    bech32: "tb",
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
  };

  const utxos = await queries.PHALLUS_WHITELIST_UTXOS();
  const utxo = utxos.data.results[0];

  const publicKey = hex.decode(paymentPublicKey);
  const p2wpkh = btc.p2wpkh(publicKey, bitcoinTestnet);
  const p2sh = btc.p2sh(p2wpkh, bitcoinTestnet);

  tx.addInput({
    txid: utxo.txid,
    index: utxo.vout,
    witnessUtxo: {
      script: p2sh.script,
      amount: BigInt(utxo.value),
    },
    redeemScript: p2sh.redeemScript,
  });

  tx.addOutputAddress(recipient, BigInt(amount), bitcoinTestnet);
  tx.addOutputAddress(
    paymentAddress,
    BigInt(utxo.value - amount - fee),
    bitcoinTestnet
  );

  const psbt0 = tx.toPSBT(0);
  const psbtB64 = base64.encode(psbt0);

  return psbtB64;
};

export { getPSBTBase64 };
