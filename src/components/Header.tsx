import BitcoinIcon from './BitcoinIcon';
import { useWallet } from '@/context/WalletContext';
import { truncateAddress } from '@/lib/stacks';
import { Wallet, LogOut } from 'lucide-react';

const Header = () => {
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();

  return (
    <header className="w-full py-6 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BitcoinIcon size={48} glow />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              STX Lucky Pot
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Community Pot ₿
            </p>
          </div>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg border border-border">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                {truncateAddress(address || '')}
              </span>
            </div>
            <button
              onClick={disconnectWallet}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg transition-all duration-200 border border-border hover:border-primary/50"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Disconnect</span>
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="btn-primary-glow flex items-center gap-2 text-sm sm:text-base"
          >
            <Wallet size={20} />
            {isConnecting ? 'Connecting...' : 'Connect Wallet – Mobile QR Ready'}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
