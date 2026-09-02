/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        dark: {
          bg: '#0B0F19',
          card: '#111827',
          border: '#1F2937',
          hover: '#1F2937',
          muted: '#9CA3AF',
        },
        algo: {
          default: '#3b82f6',     // Blue
          compare: '#f59e0b',     // Amber / Yellow
          swap: '#ef4444',        // Red / Rose
          sorted: '#10b981',      // Emerald / Green
          pivot: '#8b5cf6',       // Purple / Violet
          highlight: '#06b6d4',   // Cyan
          visited: '#6366f1',     // Indigo
          path: '#eab308',        // Yellow
          frontier: '#ec4899',    // Pink
          wall: '#374151',        // Slate Gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-short': 'bounce 0.5s ease-in-out 1',
      }
    },
  },
  plugins: [],
}
