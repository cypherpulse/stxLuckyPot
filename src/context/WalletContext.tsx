import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { connect, disconnect, getLocalStorage } from '@stacks/connect';
import { WALLET_CONNECT_PROJECT_ID } from '@/lib/stacks';

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(() => {
    // Check for existing session on mount
    try {
      const storage = getLocalStorage();
      if (storage?.addresses?.stx && storage.addresses.stx.length > 0) {
        return storage.addresses.stx[0].address;
      }
    } catch (e) {
      console.log('No existing session');
    }
    return null;
  });
  const [connecting, setConnecting] = useState(false);

  const connectWallet = useCallback(async () => {
    setConnecting(true);
    try {
      const response = await connect({
        walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
        network: 'testnet',
      });
      
      if (response && response.addresses && response.addresses.length > 0) {
        // Find testnet address or use first available
        const stxAddress = response.addresses.find(
          (addr) => addr.address.startsWith('ST')
        );
        if (stxAddress) {
          setAddress(stxAddress.address);
        } else {
          setAddress(response.addresses[0].address);
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    disconnect();
    setAddress(null);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        isConnecting: connecting,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
