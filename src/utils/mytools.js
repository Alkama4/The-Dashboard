export const convert = {
    toFiNumber(value, maxFractionDigits = 3) {
        if (value == null) return null; // Handle null/undefined values
        return value.toLocaleString('fi-FI', { maximumFractionDigits: maxFractionDigits });
    },

    toEur(value) {
        if (value == null) return null; // Handle null/undefined values
        return value.toLocaleString('fi-FI', { style: 'currency', currency: 'EUR' });
    },

    toFiDate(value, formatType = 'date') {
        if (value == null) return null; // Handle null/undefined values
        const date = new Date(value);
        const dateOptions = {
            full: { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' },
            date: { day: 'numeric', month: 'short', year: '2-digit' },
            month: { month: 'short', year: '2-digit' },
        };
        return date.toLocaleDateString('fi-FI', dateOptions[formatType]);
    },
};

export function getCssVar(colorName) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${colorName}`).trim();
}