import { standAloneBuild, apiUrl } from "./config";

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

    toFrequency(value, unit = 'GHz', maxFractionDigits = 2) {
        return `${value.toLocaleString('fi-FI', { maximumFractionDigits: maxFractionDigits })} ${unit}`;
    },

    toPercentage(value, maxFractionDigits = 2) {
        if (value == null) return null; // Handle null/undefined values
        return `${value.toLocaleString('fi-FI', { maximumFractionDigits: maxFractionDigits })} %`;
    },

    toEur(value) {
        if (value == null) return null; // Handle null/undefined values
        return value.toLocaleString('fi-FI', { style: 'currency', currency: 'EUR' });
    },

    toTime(seconds, maxUnits = 2) {
        const units = [
            { label: 'v', seconds: 31536000 },
            { label: 'kk', seconds: 2592000 },
            { label: 'pv', seconds: 86400 },
            { label: 't', seconds: 3600 },
            { label: 'min', seconds: 60 },
            { label: 's', seconds: 1 },
        ];
    
        const result = [];
        for (const unit of units) {
            const value = Math.floor(seconds / unit.seconds);
            if (value > 0) {
                result.push(`${value}${unit.label}`);
                seconds -= value * unit.seconds;
            }
            if (result.length === maxUnits) break;
        }
    
        return result.join(' ');
    },

    toLargeUsd(amount) {
        if (!amount) {
            return amount;
        } else if (amount >= 1_000_000_000) {
            let formatted = (amount / 1_000_000_000).toLocaleString("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            return formatted.replace(".", ",") + " mrd. $";
        } else {
            let formatted = (amount / 1_000_000).toLocaleString("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            return formatted.replace(".", ",") + " milj. $";
        }
    },

    toFiDate(value, formatType = 'date') {
        if (value == null) return null; // Handle null/undefined values
        if (formatType == 'none') return value;
        const date = new Date(value);
        let result = "";

        const dateOptions = {
            full: { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' },
            fullWithWeek: { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' },
            date: { day: 'numeric', month: 'short', year: '2-digit' },
            month: { month: 'short', year: '2-digit' },
            monthAndYear: { month: 'long', year: 'numeric' },
            year: { year: 'numeric' },
            timetimeInMinutes: { weekday: 'short', minute: '2-digit', hour: '2-digit'},
            titimeInSecondsme: { weekday: 'short', second: '2-digit', minute: '2-digit', hour: '2-digit'},
        };

        const getWeekNumber = (date) => {
            const startDate = new Date(date.getFullYear(), 0, 1);
            const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
            return Math.ceil((days + 1) / 7);
        };

        if (['timetimeInMinutes', 'timeInSeconds'].includes(formatType)) {
            result = "klo " + date.toLocaleTimeString('fi-FI', dateOptions[formatType]);
        } else {
            result = date.toLocaleDateString('fi-FI', dateOptions[formatType]);
        }

        if (formatType == 'fullWithWeek') {
            result += ", viikko " + getWeekNumber(date);
        }

        return result;
    },

    toBytes(bytes, decimal = 2) {
        const sizes = ['t', 'Kt', 'Mt', 'Gt', 'Tt'];
        if (bytes === 0) return '0 t';
        const i = Math.floor(Math.log10(Math.abs(bytes)) / 3);
        const value = (bytes / Math.pow(1000, i)).toFixed(decimal);
        return (parseFloat(value) === parseInt(value) ? parseInt(value) : value) + ' ' + sizes[i];
    },

    toBytesPerSecond(bytes, decimal = 2) {
        const sizes = ['t/s', 'Kt/s', 'Mt/s', 'Gt/s', 'Tt/s'];
        if (bytes === 0) return '0 t/s';
        const i = Math.floor(Math.log10(Math.abs(bytes)) / 3);
        const value = (bytes / Math.pow(1000, i)).toFixed(decimal);
        return (parseFloat(value) === parseInt(value) ? parseInt(value) : value) + ' ' + sizes[i];
    },

    toRuntime(runtime) {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return hours > 0 ? `${hours}hr ${minutes}min` : `${minutes}min`;
    },

};

export function getCssVar(colorName) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${colorName}`).trim();
}

export function interpolateBetweenColors(color1, color2, position) {
    function parseColor(color) {
        // Convert hex to RGB
        if (color.startsWith("#")) {
            let hex = color.replace("#", "");
            if (hex.length === 3) hex = hex.split("").map((h) => h + h).join("");
            const bigint = parseInt(hex, 16);
            return [bigint >> 16 & 255, bigint >> 8 & 255, bigint & 255];
        }
    
        // Extract RGB(A)
        const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (rgbMatch) return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
    
        // Extract HSL(A)
        const hslMatch = color.match(/hsla?\((\d+),\s*(\d+)%?,\s*(\d+)%?/);
        if (hslMatch) {
            const h = parseInt(hslMatch[1]);
            const s = parseInt(hslMatch[2]) / 100;
            const l = parseInt(hslMatch[3]) / 100;
    
            // Convert HSL to RGB
            const c = (1 - Math.abs(2 * l - 1)) * s;
            const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
            const m = l - c / 2;
            let r, g, b;
    
            if (h >= 0 && h < 60) {
                r = c; g = x; b = 0;
            } else if (h >= 60 && h < 120) {
                r = x; g = c; b = 0;
            } else if (h >= 120 && h < 180) {
                r = 0; g = c; b = x;
            } else if (h >= 180 && h < 240) {
                r = 0; g = x; b = c;
            } else if (h >= 240 && h < 300) {
                r = x; g = 0; b = c;
            } else {
                r = c; g = 0; b = x;
            }
    
            return [
                Math.round((r + m) * 255),
                Math.round((g + m) * 255),
                Math.round((b + m) * 255)
            ];
        }
    
        throw new Error("[interpolateBetweenColors] Unsupported color format: " + color);
    }    

    const rgb1 = parseColor(color1);
    const rgb2 = parseColor(color2);
    
    const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * position);
    const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * position);
    const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * position);

    return `rgb(${r}, ${g}, ${b})`;
}

export function getMediaImageUrl(width, backupUrl, titleId, seasonNumber, episodeNumber) {
    if (standAloneBuild) {
        // Width remapping rules for TMDB
        const widthMap = {
            600: 500,
            900: episodeNumber ? 300 : 900
        };
        const finalWidth = widthMap[width] || width;
        return `https://image.tmdb.org/t/p/w${finalWidth}${backupUrl}`;
    }

    const base = `${apiUrl}/media/image/title/${titleId}`;
    if (!seasonNumber) {
        return `${base}/poster.jpg?width=${width}`;
    }
    if (!episodeNumber) {
        return `${base}/season${seasonNumber}/poster.jpg?width=${width}`;
    }
    return `${base}/season${seasonNumber}/episode${episodeNumber}.jpg?width=${width}`;
}
