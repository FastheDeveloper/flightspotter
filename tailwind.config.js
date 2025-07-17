/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/app/**/*.{js,ts,tsx}', './src/components/**/*.{js,ts,tsx}'],

    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                POPPINS_REGULAR: 'Poppins-Regular',
                POPPINS_MEDIUM: 'Poppins-Medium',
                POPPINS_SEMIBOLD: 'Poppins-SemiBold',
                POPPINS_BOLD: 'Poppins-Bold',
                POPPINS_EXTRABOLD: 'Poppins-ExtraBold',
                POPPINS_BLACK: 'Poppins-Black',
            },
            colors: {
                PRIMARY_COLOR: "#59252A",
                SECONDARY_COLOR: "#FBD0A0",
                APP_BACKGROUND: "#F8F9FA",
                APP_TEXT: "#030303",
                PLACEHOLDER_TEXT: "#7C8488",
                MAIN_BLUE: "#065FB2",
                TEXT_BLUE: "#509BC5",
                INDICATOR_BLUE: "#065FB2",
                ERROR_STATE: "#FF3D00",
            },
        },
    },
    plugins: [],
};