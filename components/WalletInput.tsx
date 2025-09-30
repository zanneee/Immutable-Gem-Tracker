import { useState } from 'react';
import { UI_TEXT } from '../constants';

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
                    {loading ? UI_TEXT.LOADING : UI_TEXT.TRACK_GEMS}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Error fetching gem data
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                                {(error.includes('invalid response') || error.includes('timed out') || error.includes('Server error')) && (
                                    <div className="mt-2">
                                        <p className="font-medium">Troubleshooting tips:</p>
                                        <ul className="mt-1 list-disc list-inside space-y-1">
                                            <li>The request is being automatically retried</li>
                                            <li>Try again in a few moments</li>
                                            <li>Check if the wallet address is correct</li>
                                            <li>The Immutable API might be experiencing high load</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
