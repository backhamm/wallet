import { defineConfig } from 'windicss/helpers';

export default defineConfig({
    extract: {
        include: ['**/*.{jsx,js,ts,tsx,css,html}'],
        exclude: ['node_modules', '.git', 'dist/**/*'],
    },
    theme: {
        extend: {
            zIndex: {
                '[-1]': '-1',
                '9999': '9999',
            },
            backgroundColor: {
                baseColor: '#000000',
                primaryColor: '#FFD96D',
                assistColor1: '#232224',
                assistColor2: '#0F0E0F',
                assistColor3: '#1C1C1C',
            },
            backgroundImage: {
                gradientR: 'linear-gradient(90deg, #ECCF97 0%, #DFB975 100%)',
            },
            fontSize: {
                baseSize: '12px',
                lgSize: '14px',
            },
            textColor: {
                baseColor: '#FFFFFF',
                primaryColor: '#E4C98E',
                assistColor1: '#808080',
                assistColor2: '#FFD96D',
                assistColor3: '#515051',
                assistColor4: '#89724A',
                assistColor5: '#080A0C',
                success: '#92EF75',
                error: '#FD3647',
            },
            borderColor: {
                baseColor: '#343434',
                primaryColor: '#89724A',
                assistColor1: '#E4C98E',
            },
            placeholderColor: {
                baseColor: '#808080',
                primaryColor: '#89724A',
                assistColor1: '#E4C98E',
            },
        },
    },
});
