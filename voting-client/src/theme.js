import { tailwind } from '@theme-ui/presets';
import { merge } from 'theme-ui';

const baseButtonStyle = {
    py: 2,
    px: 3,
    cursor: `pointer`,
    fontSize: `100%`,
    lineHeight: `inherit`,
};

export default merge(tailwind, {
    colors: {
        primary: tailwind.colors.blue[6],
        secondary: tailwind.colors.orange[6],
        muted: tailwind.colors.gray[6],
        textMuted: `#69778c`,
        cpGreen: '#6da40c',
        background: tailwind.colors.gray[2],
    },
    styles: {
        a: {
            color: `cpGreen`,
            textDecoration: `none`,
            transition: `all 0.3s ease-in-out`,
            cursor: 'pointer',
        },
    },
    buttons: {
        primary: {
            ...baseButtonStyle,
            backgroundColor: `white`,
            borderWidth: `1px`,
            borderStyle: `solid`,
            borderColor: `gray.4`,
            color: `text`,
            fontWeight: `bold`,
            borderRadius: `default`,
            boxShadow: `default`,
            '&:hover': {
                backgroundColor: `gray.1`,
            },
            '&:focus': {
                outline: 'none',
            },
        },
    },
    cards: {
        question: {
            background: `white`,
            borderRadius: `default`,
            boxShadow: `default`,
            p: 3,
            mb: 3,
        },
        complete: {
            background: tailwind.colors.gray[3],
            borderRadius: `default`,
            boxShadow: `default`,
            p: 3,
            mb: 3,
        },
        icon: {
            svg: {
                width: 8,
                borderRadius: `full`,
                p: 2,
                background: `white`,
                '.primary': {
                    fill: `currentColor`,
                    color: `primary`,
                },
                '.secondary': {
                    fill: `currentColor`,
                    color: `blue.8`,
                },
            },
        },
        label: {
            boxShadow: `default`,
            background: `white`,
            px: 3,
            py: 2,
            borderRadius: `lg`,
            ml: 2,
            fontSize: 0,
            fontWeight: `semibold`,
        },
    },
});
