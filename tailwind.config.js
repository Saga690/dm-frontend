/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    // Background colors
    'bg-gray-800',
    'bg-gray-700',
    'bg-gray-700/50',
    'bg-emerald-500/10',
    
    // Text colors
    'text-emerald-500',
    'text-white',
    'text-red-500',
    
    // Border colors
    'border-gray-500',
    'border-emerald-500',
    'border-red-500',
    
    // Formatting
    'table-auto',
    'border-collapse',
    'border',
    'rounded-md',
    'list-disc',
    'pl-4',
    'p-4',
    'font-medium',
    'font-semibold',
    
    // Sizing and spacing
    'w-full',
    'mb-2',
    'mb-4',
    'mb-6',
    'mt-6',
    'space-y-2'
  ],
  plugins: [],
};