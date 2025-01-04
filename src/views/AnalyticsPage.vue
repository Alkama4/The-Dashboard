<template>
    <div>
        <h1>Analytics Page</h1>
        <p>Welcome to the analytics page! Here is some blaa blaa jäkä jäkä juu. Vaiha tää johonki kuhan kerkiät.</p>
        <div 
            ref="chartContainer1" 
            class="chartContainer chart1"
            :class="{ loaded: isLoaded.chart1 }"
        ></div>
        <div 
            ref="chartContainer2" 
            class="chartContainer chart2"
            :class="{ loaded: isLoaded.chart2 }"
        ></div>
        <div 
            ref="chartContainer3" 
            class="chartContainer chart3"
            :class="{ loaded: isLoaded.chart3 }"
        ></div>
    </div>
</template>

<script>
// ECharts imports
import { use, init } from 'echarts/core'
import { LineChart, BarChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, TitleComponent, LegendComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
// My utils
import api from '@/utils/dataQuery';
import { notify } from '@/utils/notification';

// Register only the required components
use([TooltipComponent, GridComponent, LineChart, BarChart, SVGRenderer, TitleComponent, LegendComponent]);

export default {
    name: 'AnalyticsPage',
    data() {
        return {
            isLoaded: {
                chart1: false,
                chart2: false,
                chart3: false,
            },
        };
    },
    async mounted() {
    const chart1 = init(this.$refs.chartContainer1);
    const chart2 = init(this.$refs.chartContainer2);
    const chart3 = init(this.$refs.chartContainer3);

    // Helper function to fetch CSS color variables
    const getColor = (colorName) => {
        return getComputedStyle(document.documentElement).getPropertyValue(`--${colorName}`).trim();
    };

    // Helper function to format numbers and dates
    const toFiCurrency = (value, format = 'full') => {
        const options = {
            full: {
                style: 'currency',
                currency: 'EUR',
            },
            axis: {
                maximumSignificantDigits: 2,
            },
        };
        return value.toLocaleString('fi-FI', options[format]);
    };

    const toFiDate = (value, formatType = 'date') => {
        const date = new Date(value);
        const options = {
            full: {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            },
            date: {
                day: 'numeric',
                month: 'short',
                year: '2-digit',
            },
            month: {
                month: 'short',
                year: '2-digit',
            },
        };
        return date.toLocaleDateString('fi-FI', options[formatType]);
    };

    const generateTooltip = (params, dateType) => {
        let rows = '';
        for (let i = 0; i < params.length; i++) {
            rows += `
                <tr class="${params[i].data === 0 ? 'disabled' : ''}">
                    <td style="display: flex; align-items: center; padding-right: 1rem;">
                        <div class="color-blob" style="background-color: ${params[i].color};"></div>
                        <div class="series-name">${params[i].seriesName}</div>
                    </td>
                    <td class="value">${toFiCurrency(params[i].data)}</td>
                </tr>
            `;
        }
        return `
            <div class="chart-tooltip">
                <div class="header">${toFiDate(params[0].axisValue, dateType)}</div>
                <table>${rows}</table>
            </div>
        `;
    };

    const fetchAndSetupCharts = [
        // Chart 1
        (async () => {
            try {
                const response = await api.getChartBalanceOverTime();
                const dates = response.balanceOverTime.map(item => item.date);
                const runningSums = response.balanceOverTime.map(item => item.runningBalance);

                chart1.setOption({
                    textStyle: {
                        fontFamily: 'Poppins',
                        color: getColor('color-text-lighter'),
                    },
                    title: {
                        text: 'Balance over time',
                        textStyle: {
                            color: getColor('color-text'),
                            fontSize: 24,
                        }
                    },
                    color: [getColor('color-primary')],
                    tooltip: { 
                        trigger: 'axis',
                        backgroundColor: getColor('color-background-card'),
                        borderColor: getColor('color-border'),
                        textStyle: {
                            color: getColor('color-text'),
                        },
                        formatter: params => generateTooltip(params, 'full')
                    },
                    grid: {
                        left: 56,
                        right: 8,
                        top: 64,
                        bottom: 80,
                    },
                    xAxis: {
                        type: 'category',
                        data: dates,
                        axisLabel: {
                            rotate: 45,
                            formatter: value => toFiDate(value, 'date'),
                        },
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: { 
                        type: 'value',      
                        name: 'Amount (€)',  // Y-akselin nimi
                        //interval: 500,    // Kuinka tiheesti näytetään sivu labelit
                        axisLabel: {        // Y-akselin arvojen muotoilu
                            formatter: value => toFiCurrency(value, 'axis')
                        }
                    },
                    series: [
                        {
                            name: 'Balance',    // Tooltipissa näkyvä nimi
                            type: 'line',
                            data: runningSums,
                            smooth: true,
                        },
                    ],
                });
                this.isLoaded.chart1 = true;
            } catch (error) {
                notify('Failed to display Chart', "error");
                console.error("[Chart 1] Error fetching data:", error);
            }
        })(),

        // Chart 2
        (async () => {
            try {
                const response = await api.getChartSumByMonth();
                const months = response.monthlySums.map(item => item.month);
                const totalIncomes = response.monthlySums.map(item => item.total_income);
                const totalExpenses = response.monthlySums.map(item => item.total_expense);
                const netTotals = response.monthlySums.map(item => item.net_total);

                chart2.setOption({
                    textStyle: {
                        fontFamily: 'Poppins',
                        color: getColor('color-text-lighter'),
                    },
                    title: {
                        text: 'Sum by month',
                        textStyle: {
                            color: getColor('color-text'),
                            fontSize: 24,
                        }
                    },
                    color: [getColor("color-positive"), getColor("color-negative"), getColor("color-text")],
                    tooltip: { 
                        trigger: 'axis',
                        backgroundColor: getColor('color-background-card'),
                        borderColor: getColor('color-border'),
                        textStyle: {
                            color: getColor('color-text'),
                        },
                        formatter: params => generateTooltip(params, 'month'),
                        axisPointer: {
                            type: 'shadow',  // Ensure axisPointer is also here
                            shadowStyle: {
                                color: getColor('color-border'),
                                opacity: 1,
                            },
                        }
                    },
                    grid: {
                        left: 56,
                        right: 8,
                        top: 64,
                        bottom: 80,
                    },
                    xAxis: {
                        type: 'category',
                        data: months,
                        axisLabel: {
                            rotate: 45,
                            formatter: value => toFiDate(value, 'month'),
                        },
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: { 
                        type: 'value',  
                        name: 'Amount (€)',
                        axisLabel: {        
                            formatter: value => toFiCurrency(value, 'axis')
                        }
                    },
                    series: [
                        {
                            name: 'Incomes',
                            type: 'bar',
                            data: totalIncomes,
                            smooth: true,
                            stack: 'stacked'
                        },
                        {
                            name: 'Expenses',
                            type: 'bar',
                            data: totalExpenses,
                            smooth: true,
                            stack: 'stacked'
                        },
                        {
                            name: 'Sum',
                            type: 'line',
                            data: netTotals,
                            smooth: true,
                        },
                    ],

                });
                this.isLoaded.chart2 = true;
            } catch (error) {
                notify('Failed to display Chart', "error");
                console.error("[Chart 2] Error fetching data:", error);
            }
        })(),

        // Chart 3
        (async () => {
            try {
                const response = await api.getChartExpenseCategoriesMonthly();
                const dates = response.monthlyCategoryExpenses.map(item => item.month);
                const categories = Array.from(new Set(response.monthlyCategoryExpenses.flatMap(item =>
                    item.categories.map(cat => cat.category))));

                const seriesData = categories.map(category => ({
                    name: category,
                    type: 'bar',
                    stack: 'stacked',
                    data: response.monthlyCategoryExpenses.map(monthData => {
                        const categoryData = monthData.categories.find(cat => cat.category === category);
                        return categoryData ? categoryData.total_expense : 0;
                    }),
                }));

                chart3.setOption({
                    textStyle: {
                        fontFamily: 'Poppins',
                        color: getColor('color-text-lighter'),
                    },
                    title: {
                        text: 'Expense categories by month',
                        textStyle: {
                            color: getColor('color-text'),
                            fontSize: 24,
                        }
                    },
                    color: [
                        getColor("color-primary"), 
                        getColor("color-secondary"), 
                        getColor("color-tertiary"),
                        getColor("color-quaternary"),
                        getColor("color-quinary"),
                        getColor("color-senary"),
                        getColor("color-septenary"),
                        getColor("color-octonary"),
                        getColor("color-nonary"),
                        getColor("color-denary"),
                        getColor("color-undecenary"),
                    ],
                    legend: {
                        type: 'scroll',
                        show: true,
                        bottom: 0,
                        textStyle: {
                            color: getColor('color-text'),
                            fontWeight: 500,
                        },
                        inactiveColor: getColor('color-text-hidden'),
                        pageIconColor: getColor('color-text'),
                        pageIconInactiveColor: getColor('color-text-hidden'),
                        pageTextStyle: {
                            color: getColor('color-text'),
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: getColor('color-background-card'),
                        borderColor: getColor('color-border'),
                        textStyle: {
                            color: getColor('color-text'),
                        },
                        formatter: params => generateTooltip(params, 'full'),
                        axisPointer: {
                            type: 'shadow',  // Ensure axisPointer is also here
                            shadowStyle: {
                                color: getColor('color-border'),
                                opacity: 1,
                            },
                        }
                    },
                    grid: {
                        left: 56,
                        right: 8,
                        top: 64,
                        bottom: 80,
                    },
                    xAxis: {
                        type: 'category',
                        data: dates,
                        axisLabel: {
                            rotate: 45,
                            formatter: value => toFiDate(value, 'month'),
                        },
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: { 
                        type: 'value',      
                        name: 'Amount (€)',
                        axisLabel: {        
                            formatter: value => toFiCurrency(value, 'axis')
                        }
                    },
                    series: seriesData,
                });
                this.isLoaded.chart3 = true;
            } catch (error) {
                notify('Failed to display Chart', "error");
                console.error("[Chart 3] Error fetching data:", error);
            }
        })(),
    ];

    await Promise.all(fetchAndSetupCharts);
}

};
</script>


<style scoped>
.chartContainer {
    width: 100%;
    height: calc(100vw * 0.4 + 150px);
    max-height: 550px;
    margin-bottom: var(--spacing-lg);
    /* background-color: red; */
}
.loaded {
    animation: fadeIn 0.4s ease-out;
}
</style>
