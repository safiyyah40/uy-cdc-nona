import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import plugin from 'tailwindcss/plugin';

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

    plugins: [
        forms,
        // Plugin Custom untuk Content Body
        plugin(function({ addComponents, theme }) {
            addComponents({
                '.content-body': {
                    color: theme('colors.gray.900'),
                },
                // Style untuk Paragraf (P)
                '.content-body p': {
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    marginBottom: '0.75rem',
                    '@screen md': {
                        fontSize: '1.875rem',
                        lineHeight: '1.5',
                    }
                },
                // Style untuk List (UL/OL)
                '.content-body ul, .content-body ol': {
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    marginLeft: '1.5rem',
                    marginBottom: '0.75rem',
                    listStyleType: 'disc',
                    '@screen md': {
                        fontSize: '1.875rem',
                        marginLeft: '2.5rem',
                        lineHeight: '1.5',
                    }
                },
                '.content-body li': {
                    marginBottom: '0.25rem',
                },

                '.content-body strong': {
                    fontWeight: '800',
                    color: '#044732',
                },

                // Style Heading (H2, H3)
                '.content-body h2, .content-body h3': {
                    fontFamily: theme('fontFamily.serif'),
                    fontWeight: '800',
                    color: '#111827',
                    marginTop: '1.25rem',
                    marginBottom: '0.5rem',
                    lineHeight: '1.3',
                },
                '.content-body h2': { fontSize: '2.25rem' },
                '.content-body h3': { fontSize: '2rem' },
            })
        })
    ],
};