import { convert, getCssVar } from '@/utils/mytools'
import { init } from 'echarts/core'

        
export async function initializeAndSetupChart(thisComponent, name, chartContainerName, getChartOptions) {
    if (typeof getChartOptions !== 'function') {
        console.error("[initializeAndSetupChart] Invalid 'getChartOptions': Expected a function");
        return;
    }
    if (!chartContainerName || !thisComponent.$refs[chartContainerName]) {
        console.error(`[initializeAndSetupChart] Invalid 'chartContainerName': ${chartContainerName}`);
        return;
    }
    if (!name) {
        console.error("[initializeAndSetupChart] Invalid 'name': Expected a non-empty string");
        return;
    }

    // Init the charts container and avoid storing the chart instance in data
    const chart = init(thisComponent.$refs[chartContainerName]);

    // Initialize the chart with the dynamic options
    chart.setOption(getChartOptions());

    // Add a listener to resize the chart when needed
    setupResizeObserver(thisComponent, chartContainerName, chart);

    // Listen for custom dark mode change event and recalculate options
    window.addEventListener("darkModeChange", () => {
        chart.setOption(getChartOptions());
    });

    // Display the chart
    thisComponent.isLoaded[name] = true;
}
function setupResizeObserver(thisComponent, containerRef, chart) {
    const container = thisComponent.$refs[containerRef];
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
        chart.resize();
    });

    resizeObserver.observe(container);

    // Store the observer for cleanup
    if (!thisComponent.resizeObservers) {
        thisComponent.resizeObservers = [];
    }
    thisComponent.resizeObservers.push(resizeObserver);
}

export function generateTooltipMultiValue(params, formatType, showSumRow) {
    let rows = '';
    let sum = 0;
    for (let i = 0; i < params.length; i++) {
        // Speacial case if the data already includes a sum value, but we would like to use the custom one for continuity
        if (showSumRow === true && params[i].seriesName === 'Sum') {
            continue;   // In case there is one we just skip it
        }
        rows += `
            <tr class="${params[i].data === 0 ? 'disabled' : ''}">
                <td class="label">
                    <div>
                        <div class="color-blob" style="background-color: ${params[i].color};"></div>
                        <div class="series-name">${params[i].seriesName}</div>
                    </div>
                </td>
                <td class="value">${convert.toEur(params[i].data)}</td>
            </tr>
        `;
        sum += parseFloat(params[i].data);
    }
    if (showSumRow === true) {
        rows += `
            <tr class="sum-row">
                <td class="label">
                    <div>
                        <div class="color-blob" style="background-color: ${getCssVar("color-text")};"></div>
                        <div class="series-name">Total</div>
                    </div>
                </td>
                <td class="value">
                    <div>
                        ${convert.toEur(sum)}
                    </div>
                </td>
            </tr>
        `;
    }
    return `
        <div class="chart-tooltip">
            <div class="header">${convert.toFiDate(params[0].axisValue, formatType)}</div>
            <table>${rows}</table>
        </div>
    `;
}

export function generateTooltipSingleValue(params, countOrEur) {
    // console.log(params);
    return `
        <div class="chart-tooltip">
            <div class="header">${params.seriesName}</div>
            <table>
                <tr class="${params.data === 0 ? 'disabled' : ''}">
                    <td style="display: flex; align-items: center; padding-right: 1rem;">
                        <div class="color-blob" style="background-color: ${params.color};"></div>
                        <div class="series-name">${params.name}</div>
                    </td>
                    <td class="value">${countOrEur == 'eur' ? convert.toEur(params.value) : params.value + ' kpl'}</td>
                </tr>
            </table>
        </div>
    `;
}

export function toggleFullscreenChart(thisComponent, chartId = "") {
    if (thisComponent.fullscreenChart !== chartId && chartId !== "") {
        thisComponent.fullscreenChart = chartId; // Set to the provided chartId
        document.documentElement.classList.add('no-scroll');
    } else {
        thisComponent.fullscreenChart = ''; // Clear the fullscreen chart
        document.documentElement.classList.remove('no-scroll');
    }
}