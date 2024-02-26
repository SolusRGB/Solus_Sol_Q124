import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
	createSignerFromKeypair,
	signerIdentity,
	generateSigner,
	percentAmount,
} from '@metaplex-foundation/umi'
import {
	createNft,
	mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata'

import wallet from './wallet/wba-wallet.json'
import base58 from 'bs58'

const RPC_ENDPOINT = 'https://api.devnet.solana.com'
const umi = createUmi(RPC_ENDPOINT)

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet))
const myKeypairSigner = createSignerFromKeypair(umi, keypair)
umi.use(signerIdentity(myKeypairSigner))
umi.use(mplTokenMetadata())

const mint = generateSigner(umi)

;(async () => {
	let tx = createNft(umi, {
		mint,
		name: 'A dirty rug from Solus',
		symbol: 'needRug',
		uri: 'https://dvnv5zmfthps4qopxosntlwcwwcfcms7to7pe5tifupzqknh5kua.arweave.net/HVte5YWZ3y5Bz7uk2a7CtYRRMl-bvvJ2aC0fmCmn6qg',
		sellerFeeBasisPoints: percentAmount(5),
	})
	let result = await tx.sendAndConfirm(umi)
	const signature = base58.encode(result.signature)

	console.log(
		`Successfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
	)

	console.log('Mint Address: ', mint.publicKey)
})()
