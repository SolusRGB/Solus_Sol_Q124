// Import the necessary modules
import { Keypair } from '@solana/web3.js'
import * as fs from 'fs'
import * as path from 'path'

// Define the directory where the keypair will be saved
const dirPath = '/Users/solus/Solana/Bootcamps/WBA/airdrop/wallets'

// Check if the directory exists, create it if it doesn't
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true })
}

// Generate a new keypair
let kp = Keypair.generate()

// Prepare the keypair data for saving
const keypairData = {
	publicKey: kp.publicKey.toBase58(),
	secretKey: Array.from(kp.secretKey), // Convert the secret key to an array for JSON serialization
}

// Define the filename and path to save the keypair
const filePath = path.join(dirPath, 'solana-keypair.json')

// Save the keypair to a file in the specified directory
fs.writeFileSync(filePath, JSON.stringify(keypairData, null, 2))

console.log(`Keypair saved to ${filePath}:
Public Key: ${keypairData.publicKey}
To access your wallet, use the solana-keypair.json file.`)
