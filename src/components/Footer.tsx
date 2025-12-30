import BitcoinIcon from './BitcoinIcon';
import { ExternalLink } from 'lucide-react';
import { FULL_CONTRACT_ID } from '@/lib/stacks';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 mt-auto border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href={`https://explorer.hiro.so/txid/${FULL_CONTRACT_ID}?chain=testnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View Contract
              <ExternalLink size={14} />
            </a>
            <a
              href="https://explorer.hiro.so/sandbox/faucet?chain=testnet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Get Test STX
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            WalletConnect + High STX Activity • Testnet Only
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
