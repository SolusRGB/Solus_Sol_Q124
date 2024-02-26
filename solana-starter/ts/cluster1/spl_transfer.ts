import { PublicKey } from '@solana/web3.js'
import {
	Commitment,
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import wallet from './wallet/wba-wallet.json'
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token'
import { transactionBuilder } from '@metaplex-foundation/umi'

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))

//Create a Solana devnet connection
const commitment: Commitment = 'confirmed'
const connection = new Connection('https://api.devnet.solana.com', commitment)

// Mint address - from wallet
const mint = new PublicKey('6Ymd1Wr4U1K8phrpDqQxR3NZUuQscW2gsGMfwwLoR9Ra')

// Recipient address - to wallet
const to = new PublicKey('GCkpArSnjBURGm9UoouiUc8N45Jne9kqAEAuJBMABfX')

;(async () => {
	try {
		// Get the token account of the fromWallet address, and if it does not exist, create it
		const fromWallet = await getOrCreateAssociatedTokenAccount(
			connection,
			keypair,
			mint,
			keypair.publicKey
		)
		// Get the token account of the toWallet address, and if it does not exist, create it
		const toWallet = await getOrCreateAssociatedTokenAccount(
			connection,
			keypair,
			mint,
			to
		)
		// Transfer the new token to the "toTokenAccount" we just created
		const txid = await transfer(
			connection,
			keypair,
			fromWallet.address,
			toWallet.address,
			keypair.publicKey,
			100
		)
		console.log(txid)
	} catch (e) {
		console.error(`Oops, something went wrong: ${e}`)
	}
})()
