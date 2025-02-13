import { convert, getCssVar } from '@/utils/mytools'
import { init } from 'echarts/core'

// All in one solution for setting up charts. 
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

export function generateTooltipMultiValue(params, yAxisFormatToDateType, xAxisFormatter, showSumRow) {
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
                <td class="value">${xAxisFormatter(params[i].data)}</td>
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
                        ${xAxisFormatter(sum)}
                    </div>
                </td>
            </tr>
        `;
    }
    return `
        <div class="chart-tooltip">
            <div class="header">${convert.toFiDate(params[0].axisValue, yAxisFormatToDateType)}</div>
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
    const isTouchDevice = 'ontouchstart' in document.documentElement;

    if (thisComponent.fullscreenChart !== chartId && chartId !== "") {
        thisComponent.fullscreenChart = chartId;
        document.documentElement.classList.add('no-scroll');

        if (isTouchDevice) {
            document.documentElement.requestFullscreen?.().then(() => {
                document.addEventListener('fullscreenchange', handleFullscreenExit);
            });
        }
    } else {
        exitFullscreen(thisComponent);
    }

    function handleFullscreenExit() {
        if (!document.fullscreenElement) {
            exitFullscreen(thisComponent);
            document.removeEventListener('fullscreenchange', handleFullscreenExit);
        }
    }

    function exitFullscreen(thisComponent) {
        thisComponent.fullscreenChart = '';
        document.documentElement.classList.remove('no-scroll');
        if (document.fullscreenElement) {
            document.exitFullscreen?.();
        }
    }
}


export function commonChartValues() {
    return {
        color: [
            getCssVar("color-primary"), 
            getCssVar("color-secondary"), 
            getCssVar("color-tertiary"),
            getCssVar("color-quaternary"),
            getCssVar("color-quinary"),
            getCssVar("color-jokumikalie"),
            getCssVar("color-senary"),
            getCssVar("color-septenary"),
            getCssVar("color-octonary"),
            getCssVar("color-nonary"),
            getCssVar("color-denary"),
            getCssVar("color-undecenary"),
        ],
        legend: {
            type: 'scroll',
            show: true,
            bottom: 0,
            textStyle: {
                color: getCssVar('color-text'),
                fontWeight: 500,
            },
            inactiveColor: getCssVar('color-text-hidden'),
            pageIconColor: getCssVar('color-text'),
            pageIconInactiveColor: getCssVar('color-text-hidden'),
            pageTextStyle: {
                color: getCssVar('color-text'),
            },
        },
        textStyle: {
            fontFamily: 'Poppins',
            color: getCssVar('color-text-lighter'),
        },
    }
}

export function setupFullscreenEscExit(thisElement) {
    // Define the event listener function
    const exitFullscreenListener = (event) => {
        if (event.key === 'Escape') {
            thisElement.toggleFullscreenChart()
        }
    };
    document.addEventListener('keydown', exitFullscreenListener);   // Setup the listener
    thisElement.exitFullscreenListener = exitFullscreenListener;    // Store the listener function in a property or variable if needed later
}
