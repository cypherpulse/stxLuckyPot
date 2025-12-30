import { useState } from 'react';
import { request } from '@stacks/connect';
import { useWallet } from '@/context/WalletContext';
import { 
  CONTRACT_ADDRESS, 
  CONTRACT_NAME, 
  OWNER_ADDRESS,
  WALLET_CONNECT_PROJECT_ID 
} from '@/lib/stacks';
import { Unlock, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface OwnerWithdrawProps {
  onSuccess: () => void;
}

const OwnerWithdraw = ({ onSuccess }: OwnerWithdrawProps) => {
  const { address, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);

  const isOwner = address === OWNER_ADDRESS;

  const handleWithdraw = async () => {
    if (!isOwner) {
      toast.error('Only the contract owner can withdraw');
      return;
    }

    setLoading(true);
    try {
      const response = await request(
        { walletConnectProjectId: WALLET_CONNECT_PROJECT_ID },
        'stx_callContract',
        {
          contract: `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
          functionName: 'withdraw-pot',
          functionArgs: [],
          network: 'testnet',
        }
      );

      if (response) {
        toast.success('Withdrawal submitted!', {
          description: 'The pot will be emptied once the transaction confirms.',
        });
        
        setTimeout(onSuccess, 3000);
      }
    } catch (error: any) {
      console.error('Withdrawal failed:', error);
      toast.error('Withdrawal failed', {
        description: error.message || 'Please try again',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) return null;

  return (
    <div className={`card-dark border-2 ${isOwner ? 'border-primary/50' : 'border-border'}`}>
      <div className="flex items-center gap-3 mb-4">
        <Shield className={`w-6 h-6 ${isOwner ? 'text-primary' : 'text-muted-foreground'}`} />
        <h3 className="text-xl font-bold text-foreground">Owner Controls</h3>
      </div>

      {isOwner ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary font-medium">
              You are the contract owner
            </span>
          </div>

          <button
            onClick={handleWithdraw}
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-stacks-orange-light text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Unlock size={20} />
                Withdraw Entire Pot
              </>
            )}
          </button>

          <p className="text-xs text-center text-muted-foreground">
            This will transfer all STX in the pot to your wallet
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-secondary/50 rounded-lg px-4 py-3">
          <AlertTriangle className="w-5 h-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Only the contract owner can withdraw from the pot
          </p>
        </div>
      )}
    </div>
  );
};

export default OwnerWithdraw;
