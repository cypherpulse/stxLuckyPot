import { useState } from 'react';
import Header from '@/components/Header';
import PotCounter from '@/components/PotCounter';
import AddToPot from '@/components/AddToPot';
import OwnerWithdraw from '@/components/OwnerWithdraw';
import Footer from '@/components/Footer';
import BitcoinIcon from '@/components/BitcoinIcon';

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTransactionSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 opacity-5">
          <BitcoinIcon size={300} className="animate-spin-slow" />
        </div>
        <div className="absolute -bottom-20 -right-20 opacity-5">
          <BitcoinIcon size={400} className="animate-spin-slow" />
        </div>
        <div className="absolute top-1/3 right-10 opacity-3">
          <BitcoinIcon size={150} className="animate-float" />
        </div>
      </div>

      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <BitcoinIcon size={56} glow className="animate-float" />
            <h1 className="text-3xl sm:text-5xl font-black text-foreground">
              STX Lucky Pot
            </h1>
            <BitcoinIcon size={56} glow className="animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Add STX to the Community Pot ₿ — Join the fun on Stacks Testnet!
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Pot Balance */}
          <PotCounter refreshTrigger={refreshTrigger} />

          {/* Add to Pot */}
          <AddToPot onSuccess={handleTransactionSuccess} />

          {/* Owner Withdraw */}
          <OwnerWithdraw onSuccess={handleTransactionSuccess} />
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card-dark text-center">
            <div className="text-3xl mb-2">🔗</div>
            <h4 className="font-semibold text-foreground mb-1">WalletConnect</h4>
            <p className="text-sm text-muted-foreground">
              Scan QR with Leather or Xverse mobile
            </p>
          </div>
          <div className="card-dark text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-semibold text-foreground mb-1">Fast & Simple</h4>
            <p className="text-sm text-muted-foreground">
              Add STX to the community pot instantly
            </p>
          </div>
          <div className="card-dark text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-semibold text-foreground mb-1">Leaderboard Ready</h4>
            <p className="text-sm text-muted-foreground">
              Designed for high transaction volume
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
