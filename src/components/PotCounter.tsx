import { useEffect, useState, useCallback } from 'react';
import BitcoinIcon from './BitcoinIcon';
import { fetchPotBalance, microToStx } from '@/lib/stacks';

interface PotCounterProps {
  refreshTrigger?: number;
}

const PotCounter = ({ refreshTrigger = 0 }: PotCounterProps) => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);

  const loadBalance = useCallback(async () => {
    try {
      const balanceMicro = await fetchPotBalance();
      const newBalance = microToStx(balanceMicro);
      
      if (newBalance !== balance) {
        setAnimating(true);
        setTimeout(() => setAnimating(false), 500);
      }
      
      setBalance(newBalance);
    } catch (error) {
      console.error('Error loading balance:', error);
    } finally {
      setLoading(false);
    }
  }, [balance]);

  useEffect(() => {
    loadBalance();
  }, [refreshTrigger]);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(loadBalance, 10000);
    return () => clearInterval(interval);
  }, [loadBalance]);

  return (
    <div className="card-dark text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4">
          <BitcoinIcon size={60} />
        </div>
        <div className="absolute bottom-4 right-4">
          <BitcoinIcon size={80} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <BitcoinIcon size={200} className="animate-spin-slow opacity-20" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BitcoinIcon size={36} glow />
          <h2 className="text-xl font-semibold text-muted-foreground">
            Community Pot Balance
          </h2>
          <BitcoinIcon size={36} glow />
        </div>

        <div className={`py-8 ${animating ? 'animate-counter-update' : ''}`}>
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-2xl text-muted-foreground">Loading...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="text-6xl sm:text-8xl font-black text-primary text-glow">
                {balance.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 6 
                })}
              </span>
              <span className="text-3xl sm:text-4xl font-bold text-foreground">
                STX
              </span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          Auto-refreshes every 10 seconds • Testnet
        </p>
      </div>
    </div>
  );
};

export default PotCounter;
