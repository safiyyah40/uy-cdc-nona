import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Instrument Sans', ...defaultTheme.fontFamily.sans],
                kaisei: ['Kaisei Tokumin', 'serif'],
            },

            colors: {
                'yarsi-green': {
                    'DEFAULT': '#044732',
                    'light': '#1E5A4A',
                    'dark': '#022A1E',
                },
                'yarsi-accent': '#34A853',
                'cdc-green-dark': '#006241',
            },

            animation: {
                fadeIn: 'fadeIn 1s ease-in-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },

            backgroundImage: {
                'yarsi-gradient-button': 'linear-gradient(to right, #1B523B, #3DB884)',
            }
        },
    },

    plugins: [forms],
};
