import { useState } from 'react';
import { request } from '@stacks/connect';
import { Cl } from '@stacks/transactions';
import { useWallet } from '@/context/WalletContext';
import BitcoinIcon from './BitcoinIcon';
import { 
  CONTRACT_ADDRESS, 
  CONTRACT_NAME, 
  stxToMicro,
  WALLET_CONNECT_PROJECT_ID 
} from '@/lib/stacks';
import { Plus, Coins } from 'lucide-react';
import { toast } from 'sonner';

interface AddToPotProps {
  onSuccess: () => void;
}

const AddToPot = ({ onSuccess }: AddToPotProps) => {
  const { isConnected, connectWallet } = useWallet();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddToPot = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const amountMicro = stxToMicro(parseFloat(amount));
      
      const response = await request(
        { walletConnectProjectId: WALLET_CONNECT_PROJECT_ID },
        'stx_callContract',
        {
          contract: `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
          functionName: 'add-to-pot',
          functionArgs: [Cl.uint(amountMicro)],
          network: 'testnet',
        }
      );

      if (response) {
        toast.success('Transaction submitted! Adding to pot...', {
          description: 'Your STX will be added once the transaction confirms.',
        });
        setAmount('');
        
        // Refresh balance after a short delay
        setTimeout(onSuccess, 3000);
      }
    } catch (error: any) {
      console.error('Transaction failed:', error);
      toast.error('Transaction failed', {
        description: error.message || 'Please try again',
      });
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [1, 5, 10, 25];

  return (
    <div className="card-dark">
      <div className="flex items-center gap-3 mb-6">
        <Coins className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold text-foreground">Add to Lucky Pot</h3>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <BitcoinIcon size={64} glow className="mx-auto mb-4 animate-float" />
          <p className="text-muted-foreground mb-4">
            Connect your wallet to add STX to the pot
          </p>
          <button onClick={connectWallet} className="btn-primary-glow">
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick amount buttons */}
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className={`py-2 px-3 rounded-lg font-medium transition-all duration-200 ${
                  amount === quickAmount.toString()
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border'
                }`}
              >
                {quickAmount} STX
              </button>
            ))}
          </div>

          {/* Custom amount input */}
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in STX"
              min="0"
              step="0.000001"
              className="w-full bg-input border border-border rounded-xl py-4 px-6 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
              STX
            </span>
          </div>

          {/* Submit button */}
          <button
            onClick={handleAddToPot}
            disabled={loading || !amount}
            className="w-full btn-primary-glow flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Plus size={24} />
                Add to Lucky Pot
                <BitcoinIcon size={24} />
              </>
            )}
          </button>

          <p className="text-xs text-center text-muted-foreground">
            Transactions are on Stacks Testnet. Get test STX from the faucet.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddToPot;
