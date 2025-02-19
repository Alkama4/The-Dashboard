export const convert = {
    toFiNumber(value, maxFractionDigits = 3) {
        if (value == null) return null; // Handle null/undefined values
        return value.toLocaleString('fi-FI', { maximumFractionDigits: maxFractionDigits });
    },

    toFiCount(value, maxFractionDigits = 0) {
        if (value == null) return null; // Handle null/undefined values
        return `${value.toLocaleString('fi-FI', { maximumFractionDigits: maxFractionDigits })} kpl`;
    },

    toCelcius(value, maxFractionDigits = 2) {
        if (value == null) return null; // Handle null/undefined values
        return `${value.toLocaleString('fi-FI', { maximumFractionDigits: maxFractionDigits })} °C`;
    },

    toPercentage(value, maxFractionDigits = 2) {
        if (value == null) return null; // Handle null/undefined values
        return `${value.toLocaleString('fi-FI', { maximumFractionDigits: maxFractionDigits })} %`;
    },

    toEur(value) {
        if (value == null) return null; // Handle null/undefined values
        return value.toLocaleString('fi-FI', { style: 'currency', currency: 'EUR' });
    },

    toFiDate(value, formatType = 'date') {
        if (value == null) return null; // Handle null/undefined values
        if (formatType == 'none') return value;
        const date = new Date(value);
        let result = "";

        const dateOptions = {
            full: { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' },
            date: { day: 'numeric', month: 'short', year: '2-digit' },
            month: { month: 'short', year: '2-digit' },
            time: { weekday: 'short', minute: '2-digit', hour: '2-digit'},
        };

        if (['time'].includes(formatType)) {
            result = date.toLocaleTimeString('fi-FI', dateOptions[formatType]);
        } else {
            result = date.toLocaleDateString('fi-FI', dateOptions[formatType]);
        }

        return result;
    },

    toBytes(bytes, decimal = 2) {
        const sizes = ['t', 'Kt', 'Mt', 'Gt', 'Tt'];
        if (bytes === 0) return '0 t';
        const i = Math.floor(Math.log10(Math.abs(bytes)) / 3);
        const value = (bytes / Math.pow(1000, i)).toFixed(decimal);
        return (parseFloat(value) === parseInt(value) ? parseInt(value) : value) + ' ' + sizes[i];
    }

};

export function getCssVar(colorName) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${colorName}`).trim();
}
