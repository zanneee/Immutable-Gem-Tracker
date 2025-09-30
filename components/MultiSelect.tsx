import { useState, useRef, useEffect, useCallback } from 'react';
import type { SelectOption } from '../types';
import { UI_CONFIG, UI_TEXT } from '../constants';

interface MultiSelectProps {
    options: SelectOption[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    label?: string;
    maxDisplayItems?: number;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    selectedValues,
    onChange,
    placeholder = "Select options...",
    label,
    maxDisplayItems = UI_CONFIG.MAX_DISPLAY_ITEMS
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleOption = useCallback((value: string) => {
        const newValues = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        onChange(newValues);
    }, [selectedValues, onChange]);

    const handleSelectAll = useCallback(() => {
        onChange(filteredOptions.map(option => option.value));
    }, [filteredOptions, onChange]);

    const handleClearAll = useCallback(() => {
        onChange([]);
    }, [onChange]);

    const getDisplayText = () => {
        if (selectedValues.length === 0) return placeholder;
        if (selectedValues.length <= maxDisplayItems) {
            return selectedValues
                .map(value => options.find(opt => opt.value === value)?.label || value)
                .join(', ');
        }
        return `${selectedValues.length} items selected`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
            >
                <span className={`truncate ${selectedValues.length === 0 ? 'text-gray-500' : 'text-gray-900'}`}>
                    {getDisplayText()}
                </span>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
                    {/* Search input */}
                    <div className="p-2 border-b border-gray-200">
                        <input
                            type="text"
                            placeholder={UI_TEXT.SEARCH_PLACEHOLDER}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Action buttons */}
                    <div className="p-2 border-b border-gray-200 flex space-x-2">
                        <button
                            type="button"
                            onClick={handleSelectAll}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                            {UI_TEXT.SELECT_ALL}
                        </button>
                        <button
                            type="button"
                            onClick={handleClearAll}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                            {UI_TEXT.CLEAR_ALL}
                        </button>
                    </div>

                    {/* Options list */}
                    <div className="max-h-40 overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <div className="p-2 text-sm text-gray-500 text-center">
                                No options found
                            </div>
                        ) : (
                            filteredOptions.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedValues.includes(option.value)}
                                        onChange={() => handleToggleOption(option.value)}
                                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="text-sm text-gray-900 truncate">
                                        {option.label}
                                    </span>
                                </label>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
