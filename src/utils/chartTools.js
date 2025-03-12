// My tools
import { convert, getCssVar } from '@/utils/mytools'

// ECharts imports
import { use } from 'echarts/core'
import { LineChart, BarChart, PieChart, GaugeChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, TitleComponent, LegendComponent } from 'echarts/components'

// Pick a renderer
// import { CanvasRenderer } from 'echarts/renderers'
import { SVGRenderer } from 'echarts/renderers'


export function initialEchartSetup() {
    use([TooltipComponent, GridComponent, LineChart, BarChart, PieChart, GaugeChart, SVGRenderer, TitleComponent, LegendComponent]);
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
