module.exports = {
    purge: ['./src/**/*.html', './src/**/*.jsx'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        stroke: {
            current: 'currentColor',
        },
        fill: {
            current: 'currentColor',
        },
        extend: {},
    },
    variants: {
        extend: {
            stroke: ['hover'],
            fill: ['hover'],
        },
    },
    plugins: [],
};
