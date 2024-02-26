import { Keypair, PublicKey, Connection, Commitment } from '@solana/web3.js'
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token'
import wallet from './wallet/wba-wallet.json'

//Connect our WBA Wallet
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))

//Create a Solana devnet connection
const commitment: Commitment = 'confirmed'

//Create a Solana devnet connection to devnet SOL tokens
const connection = new Connection('https://api.devnet.solana.com', commitment)

const token_decimals = 1_000_000n

// Mint address
const mint = new PublicKey('6Ymd1Wr4U1K8phrpDqQxR3NZUuQscW2gsGMfwwLoR9Ra')

;(async () => {
	try {
		// Get the token account of the wallet address, and if it does not exist, create it
		// Create an ATA
		const ata = await getOrCreateAssociatedTokenAccount(
			connection,
			keypair,
			mint,
			keypair.publicKey
		)
		console.log(`Your ata is: ${ata.address}`)

		/*
    
    getOrCreateAssociatedTokenAccount: Retrieve the associated token account, or create it if it doesn't exist

    getOrCreateAssociatedTokenAccount(
      connection: Connection,                                     Connection to use
      payer: Signer,                                              Payer of the transaction and initialization fees
      mint: PublicKey,                                            Mint associated with the account to set or verify
      owner: PublicKey,                                           Owner of the account to set or verify
      allowOwnerOffCurve = false,                                 [?] Allow the owner account to be a PDA (Program Derived Address)
      commitment?: Commitment,                                    [?] Desired level of commitment for querying the state
      confirmOptions?: ConfirmOptions,                            [?] Options for confirming the transaction
      programId = TOKEN_PROGRAM_ID,                               [?] SPL Token program account
      associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID      [?] SPL Associated Token program account
    ): Promise<Account>                                           => Return Address of the new associated token account
  
    export interface Account {
      address: PublicKey;                                          Address of the account
      mint: PublicKey;                                             Mint of this account
      owner: PublicKey;                                            Owner of this account
      amount: bigint;                                              Number of tokens this account holds
      delegate: null | PublicKey;                                  The optional delegate for this account
      delegatedAmount: bigint;                                     The amount of tokens delegated
      isInitialized: boolean;                                      Whether this account is initialized
      isFrozen: boolean;                                           Whether this account is frozen
      isNative: null;                                              If this account is associated with the native mint
    }

  */

		// let keypairAta = getAssociatedTokenAddressSync(mint, keypair.publicKey);

		// const transaction = new Transaction().add(
		//   createAssociatedTokenAccountIdempotentInstruction(
		//     keypair.publicKey,
		//     keypairAta,
		//     keypair.publicKey,
		//     mint,
		//   ),
		// );

		// const txSig = await sendAndConfirmTransaction(connection, transaction, [keypair]);

		// Mint to ATA

		/* 

    mintTo: Mint tokens to an account

    mintTo(
      connection: Connection,                                   Connection to use
      payer: Signer,                                            Payer of the transaction fees
      mint: PublicKey,                                          Mint for the account
      destination: PublicKey,                                   Address of the account to mint to
      authority: Signer | PublicKey,                            Minting authority
      amount: number | bigint,                                  Amount to mint
      multiSigners: Signer[] = [],                              Signing accounts if `authority` is a multisig
      confirmOptions?: ConfirmOptions,                          Options for confirming the transaction
      programId = TOKEN_PROGRAM_ID                               SPL Token program account
    ): Promise<TransactionSignature>                            => Return Signature of the confirmed transaction

  */
		let amount = 1n * token_decimals
		let mintTx = await mintTo(
			connection,
			keypair,
			mint,
			ata.address,
			keypair.publicKey,
			amount
		)
		console.log(`Your mint txid: ${mintTx}`)
	} catch (error) {
		console.log(`Oops, something went wrong: ${error}`)
	}
})()
