import { Keypair } from '@solana/web3.js'
import wallet from './wallet/wba-wallet.json'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
	createMetadataAccountV3,
	CreateMetadataAccountV3InstructionAccounts,
	CreateMetadataAccountV3InstructionArgs,
	DataV2Args,
} from '@metaplex-foundation/mpl-token-metadata'
import {
	createSignerFromKeypair,
	signerIdentity,
	publicKey,
} from '@metaplex-foundation/umi'

// Define our Mint address
const mint = publicKey('6Ymd1Wr4U1K8phrpDqQxR3NZUuQscW2gsGMfwwLoR9Ra')

const umi = createUmi('https://api.devnet.solana.com')
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet))
const signer = createSignerFromKeypair(umi, keypair)
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)))
;(async () => {
	try {
		// Start here
		let accounts: CreateMetadataAccountV3InstructionAccounts = {
			mint,
			mintAuthority: signer,
			updateAuthority: signer,
		}
		let data: DataV2Args = {
			name: 'Some Solus NFT',
			symbol: 'SOLUS',
			uri: '',
			sellerFeeBasisPoints: 500,
			creators: null,
			collection: null,
			uses: null,
		}
		let args: CreateMetadataAccountV3InstructionArgs = {
			data,
			isMutable: true,
			collectionDetails: null,
		}
		let tx = createMetadataAccountV3(umi, {
			...accounts,
			...args,
		})
		let result = await tx
			.sendAndConfirm(umi)
			.then((r) => console.log(r.signature.toString()))
		console.log(result)
	} catch (e) {
		console.error(`Oops, something went wrong: ${e}`)
	}
})()
