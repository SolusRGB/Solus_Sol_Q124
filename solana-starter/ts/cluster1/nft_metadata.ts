import wallet from './wallet/wba-wallet.json'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
	createGenericFile,
	createSignerFromKeypair,
	signerIdentity,
} from '@metaplex-foundation/umi'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com')
umi.use(irysUploader())

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet))
const signer = createSignerFromKeypair(umi, keypair)

umi.use(signerIdentity(signer))
;(async () => {
	try {
		// Follow this JSON structure
		// https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
		const image =
			'https://arweave.net/yix7x8TrToG26TVT4H1mnQh7-A6wyV5aU9L8Zvb-oMM'
		const metadata = {
			name: 'A dirty rug from Solus',
			symbol: 'needRug',
			description: "It's a rug you need, but it's dirty.",
			image: image,
			attributes: [
				{ trait_type: 'Dirty rug', value: 'Dirty' },
				{ trait_type: 'Color', value: 'Delicious Purp' },
				{ trait_type: 'Size', value: 'Big boi' },
			],
			properties: {
				files: [
					{
						type: 'image/png',
						uri: image,
					},
				],
			},
			creators: [],
		}
		const myUri = await umi.uploader.uploadJson(metadata)
		console.log('Your image URI: ', myUri)
	} catch (error) {
		console.log('Oops.. Something went wrong', error)
	}
})()
