<template>
    <div>
        <h1>Analytics Page</h1>
        <p>Welcome to the analytics page! Here is some blaa blaa jäkä jäkä juu. Vaiha tää johonki kuhan kerkiät.</p>
        <!-- 
        These could have different timespans (day, week, month, year, all, custom):
            - transactions logged                               all
            - days logged                                       all
            - total spent                                       all
            - total income                                      all
            - expense vs income ratio                           month | year
            - {daily/weekly/monthly} average spending           month | year
            - top {5/10/custom} most common expense categories  month | year
            - top {5/10/custom} expense categories by amount    month | year
            - expenses by {category/counterparty} count         -
            - expenses by {category/counterparty} sum           chart
            - heat map calendar                                 -
            - heat map of expenses by day of the week           -
            - Balance history                                   chart
            - expense, income, sum by {week/month/year}         chart
        
        Also everything with compare to previous period (day, week, month, year, all, custom)

        Which of these would be useful and with what timefrmaes and comparisons?
        -->
        <div class="card">
            <h2>General statistics</h2>
            <div class="info-grid">
                <div class="cell">
                    <div class="label">Transactions logged</div>
                    <div class="data">{{ toFiNumber(pageValues.generalStats.transactionsLogged) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Logs/day (average)</div>
                    <div class="data">{{ toFiNumber(pageValues.generalStats.avgLogsPerDay) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Days logged</div>
                    <div class="data">{{ toFiNumber(pageValues.generalStats.daysLogged) || '-' }}</div>
                </div>
            </div>

            <div class="card-spacer"></div>

            <div class="info-grid">
                <div class="cell">
                    <div class="label">Logged expenses</div>
                    <div class="data negative">{{ toEur(pageValues.generalStats.totalExpenses) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Logged income</div>
                    <div class="data positive">{{ toEur(pageValues.generalStats.totalIncomes) || '-' }}</div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>Last month</h2>
            <div class="info-grid">
                <div class="cell">
                    <div class="label">Daily avg. spendings</div>
                    <div class="data">{{ toEur(pageValues.lastMonth.spendingsAverageDay) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Weekly avg. spendings</div>
                    <div class="data">{{ toEur(pageValues.lastMonth.spendingsAverageWeek) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Spendings this month</div>
                    <div class="data">{{ toEur(pageValues.lastMonth.spendingsAverageMonth) || '-' }}</div>
                </div>
            </div>

            <div class="card-spacer"></div>

            <div class="info-grid">
                <div class="cell">
                    <div class="label">Expense vs income ratio</div>
                    <div class="data">{{ toFiNumber(pageValues.lastMonth.incomeExpenseRatio) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Net total</div>
                    <div 
                        class="data" 
                        :class="pageValues.lastMonth.netTotal > 0 ? 'positive' : 'negative'" 
                    >
                        {{ toEur(pageValues.lastMonth.netTotal) || '-' }}
                    </div>
                </div>
            </div>

            <div class="card-spacer"></div>

            <div class="info-grid">
                <div class="cell">
                    <div class="label">Top 5 most common categories</div>
                    <table>
                        <tr v-for="(item, index) in pageValues.lastMonth.topMostCommonCategories" :key="index">
                            <td>{{ index + 1 }}.</td>
                            <td>{{ item.category || '-' }}</td>
                            <td>{{ toFiCount(item.count) || '-' }}</td>
                        </tr>
                        <div v-if="!pageValues.lastMonth.topMostCommonCategories" class="data">
                            -
                        </div>
                    </table>
                </div>
                <div class="cell">
                    <div class="label">Top 5 categories by expense</div>
                    <table>
                        <tr v-for="(item, index) in pageValues.lastMonth.topMostExpensiveCategories" :key="index">
                            <td>{{ index + 1 }}.</td>
                            <td>{{ item.category || '-' }}</td>
                            <td>{{ toEur(item.totalAmount) || '-' }}</td>
                        </tr>
                        <div v-if="!pageValues.lastMonth.topMostExpensiveCategories" class="data">
                            -
                        </div>
                    </table>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>Last Year</h2>
            <div class="info-grid">
                <div class="cell">
                    <div class="label">Daily avg. spendings</div>
                    <div class="data">{{ toEur(pageValues.lastYear.spendingsAverageDay) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Weekly avg. spendings</div>
                    <div class="data">{{ toEur(pageValues.lastYear.spendingsAverageWeek) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Monthly avg. spendings</div>
                    <div class="data">{{ toEur(pageValues.lastYear.spendingsAverageMonth) || '-' }}</div>
                </div>
            </div>

            <div class="card-spacer"></div>

            <div class="info-grid">
                <div class="cell">
                    <div class="label">Expense vs income ratio</div>
                    <div class="data">{{ toFiNumber(pageValues.lastYear.incomeExpenseRatio) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Net total</div>
                    <div 
                        class="data" 
                        :class="pageValues.lastYear.netTotal > 0 ? 'positive' : 'negative'" 
                    >
                        {{ toEur(pageValues.lastYear.netTotal) || '-' }}
                    </div>                </div>
            </div>

            <div class="card-spacer"></div>

            <div class="info-grid">
                <div class="cell">
                    <div class="label">Top 5 most common categories</div>
                    <table>
                        <tr v-for="(item, index) in pageValues.lastYear.topMostCommonCategories" :key="index">
                            <td>{{ index + 1 }}.</td>
                            <td>{{ item.category || '-' }}</td>
                            <td>{{ toFiCount(item.count) || '-' }}</td>
                        </tr>
                        <div v-if="!pageValues.lastYear.topMostCommonCategories" class="data">
                            -
                        </div>
                    </table>
                </div>
                <div class="cell">
                    <div class="label">Top 5 categories by expense</div>
                    <table>
                        <tr v-for="(item, index) in pageValues.lastYear.topMostExpensiveCategories" :key="index">
                            <td>{{ index + 1 }}.</td>
                            <td>{{ item.category || '-' }}</td>
                            <td>{{ toEur(item.totalAmount) || '-' }}</td>
                        </tr>
                        <div v-if="!pageValues.lastYear.topMostExpensiveCategories" class="data">
                            -
                        </div>
                    </table>
                </div>
            </div>
        </div>

        <!-- <h2>All time?</h2> -->

        <div 
            ref="chartContainer1" 
            class="chartContainer card chart1"
            :class="{ loaded: isLoaded.chart1 }"
        ></div>
        <div 
            ref="chartContainer2" 
            class="chartContainer card chart2"
            :class="{ loaded: isLoaded.chart2 }"
        ></div>
        <div 
            ref="chartContainer3" 
            class="chartContainer card chart3"
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
// import { CanvasRenderer } from 'echarts/renderers'
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
            pageValues: {
                generalStats: {},
                lastMonth: {},
                lastYear: {}
            }
        };
    },
    methods: {
        toEur(value) {
            if (value)
                return value.toLocaleString('fi-FI', {style: 'currency', currency: 'EUR'});
            else 
                return null;
        },
        toFiNumber(value) {
            if (value)
                return value.toLocaleString('fi-FI', {maximumFractionDigits: 3})
            else
                return null;
        },
        toFiCount(value) {
            if (value)
                return value.toLocaleString('fi-FI', {maximumFractionDigits: 3}) + " kpl"
            else 
                return null;
        }
    },
    async mounted() {

        // Charts initilisation
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
            
            // General stats
            (async () => {
                const generalStatsResponse = await api.getGeneralStats();
                this.pageValues.generalStats = {...generalStatsResponse.generalStats};
            })(),

            // Last month stats
            (async () => {
                const lastMonthResponse = await api.getStatsForTimespan("month")
                this.pageValues.lastMonth = {...lastMonthResponse.stats}
            })(),

            // Last year stats
            (async () => {
                const lastYearResponse = await api.getStatsForTimespan("year")
                this.pageValues.lastYear = {...lastYearResponse.stats}
            })(),

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
    /* width: 100%; */
    height: calc(100vw * 0.4 + 150px);
    max-height: 550px;
    margin-bottom: var(--spacing-lg);
    /* background-color: red; */
}
.loaded {
    animation: fadeIn 0.4s ease-out;
}
.info-grid {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}
.info-grid .cell {
    flex: 1; 
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: var(--spacing-md) 0px;
}
.info-grid .cell .label {
    color: var(--color-text-lighter);
    font-weight: 500;
}
.info-grid .cell .data {
    color: var(--color-text);
    font-weight: 700;
    font-size: 32px;
}


.info-grid table {
    margin-top: var(--spacing-sm);
    margin-inline: var(--spacing-lg);
    white-space: nowrap;
}
.info-grid tr {
    text-align: right;
}
.info-grid tr > *:nth-child(2) {
    text-align: left;
}
.info-grid tr > *:nth-child(3) {
    font-weight: 700;
}
</style>
