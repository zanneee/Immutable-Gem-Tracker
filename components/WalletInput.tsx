import { useState } from 'react';

interface WalletInputProps {
    onSubmit: (walletAddress: string) => void;
    loading: boolean;
    error: string;
}

export const WalletInput: React.FC<WalletInputProps> = ({ onSubmit, loading, error }) => {
    const [walletAddress, setWalletAddress] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(walletAddress);
    };

    return (
        <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                    <label htmlFor="wallet" className="block text-sm font-medium text-gray-700 mb-2">
                        Wallet Address
                    </label>
                    <input
                        type="text"
                        id="wallet"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        placeholder="0x..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Loading...' : 'Track Gems'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}
        </div>
    );
};
