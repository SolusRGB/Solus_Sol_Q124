import { Keypair, Connection, Commitment } from '@solana/web3.js'
import { createMint } from '@solana/spl-token'
import wallet from './wallet/wba-wallet.json'

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))

//Create a Solana devnet connection
const commitment: Commitment = 'confirmed'
const connection = new Connection('https://api.devnet.solana.com', commitment)

/*

  Connection is used to interact with the Solana JSON RPC. You can use Connection to confirm transactions, get account info, and more.

  Possible Cluster Endpoint are:
  - Mainnet: https://api.mainnet-beta.solana.com 
  - Devnet: https://api.devnet.solana.com 
  - Testnet: https://api.testnet.solana.com
  - Localnet: http://localhost:8899 (default port where the local validator deploy)

  Learn more here: https://solana.com/docs/core/clusters

*/

/*

  createMint: Create and initialize a new mint

  createMint(
    connection: Connection,                                 Connection to use
    payer: Signer,                                          Payer of the transaction and initialization fees
    mintAuthority: PublicKey,                               Account or multisig that will control minting
    freezeAuthority: PublicKey | null,                      Optional account or multisig that can freeze token accounts       
    decimals: number,                                       Location of the decimal place
    keypair = Keypair.generate(),                           [?] Optional keypair, defaulting to a new random one (You can leave it empty)
    confirmOptions?: ConfirmOptions,                        [?] Options for confirming the transaction (You can leave it empty)
    programId = TOKEN_PROGRAM_ID                            [?] SPL Token program account (You can leave it empty)
  ): Promise<PublicKey>                                     => Return address of the new mint       
 
*/

;(async () => {
	try {
		// Start here
		const mint = await createMint(
			connection,
			keypair,
			keypair.publicKey,
			null,
			6
		)
		console.log(mint)
	} catch (error) {
		console.log(`Oops, something went wrong: ${error}`)
	}
})()
