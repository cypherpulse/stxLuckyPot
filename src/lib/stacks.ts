import { Cl } from '@stacks/transactions';

// Contract Configuration
export const CONTRACT_ADDRESS = 'STGDS0Y17973EN5TCHNHGJJ9B31XWQ5YXBQ0KQ2Y';
export const CONTRACT_NAME = 'stx-lucky-pot';
export const FULL_CONTRACT_ID = `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`;
export const OWNER_ADDRESS = 'STGDS0Y17973EN5TCHNHGJJ9B31XWQ5YXBQ0KQ2Y';

// WalletConnect Project ID - Get yours at https://cloud.reown.com
export const WALLET_CONNECT_PROJECT_ID = 'your-project-id-here';

// Network configuration
export const NETWORK = 'testnet';
export const API_URL = 'https://api.testnet.hiro.so';

// Convert STX to microSTX
export const stxToMicro = (stx: number): bigint => {
  return BigInt(Math.floor(stx * 1_000_000));
};

// Convert microSTX to STX
export const microToStx = (micro: bigint | number): number => {
  return Number(micro) / 1_000_000;
};

// Build function arguments
export const buildAddToPotArgs = (amountMicro: bigint) => {
  return [Cl.uint(amountMicro)];
};

// Fetch pot balance from API
export const fetchPotBalance = async (): Promise<bigint> => {
  try {
    const response = await fetch(
      `${API_URL}/v2/contracts/call-read/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/get-pot-balance`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: CONTRACT_ADDRESS,
          arguments: [],
        }),
      }
    );
    
    const data = await response.json();
    
    if (data.okay && data.result) {
      // Parse the Clarity uint response
      const hexValue = data.result.replace('0x', '');
      // Skip the type byte (01 for uint) and parse the remaining hex as bigint
      const valueHex = hexValue.slice(2);
      return BigInt('0x' + valueHex);
    }
    
    return BigInt(0);
  } catch (error) {
    console.error('Error fetching pot balance:', error);
    return BigInt(0);
  }
};

// Truncate address for display
export const truncateAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
