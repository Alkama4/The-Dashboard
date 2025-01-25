<template>
    <div>
        <div class="content-width-medium">
            <h1>Analytics Page</h1>
            <p>Welcome to the analytics page! At the top, you'll find an overview of key statistics, including the total number of transactions logged and other general metrics. Below that, you'll find charts designed to help you explore your data. These charts provide a detailed look at spending trends, allowing you to analyze both monthly and yearly patterns for a deeper understanding of your financial activity.</p>
        </div>
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

        <div class="card content-width-medium">
            <h2>Overall Statistics</h2>
            <div class="info-grid">
                <div class="cell">
                    <div class="label">Total Transactions Logged</div>
                    <div class="data">{{ toFiNumber(pageValues.generalStats.transactionsLogged) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Average Logs per Day</div>
                    <div class="data">{{ toFiNumber(pageValues.generalStats.avgLogsPerDay) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Total Days Logged</div>
                    <div class="data">{{ toFiNumber(pageValues.generalStats.daysLogged) || '-' }}</div>
                </div>
            </div>

            <div class="card-spacer"></div>

            <div class="info-grid">
                <div class="cell">
                    <div class="label">Total Logged Expenses</div>
                    <div class="data negative">{{ toEur(pageValues.generalStats.totalExpenses) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Total Logged Income</div>
                    <div class="data positive">{{ toEur(pageValues.generalStats.totalIncomes) || '-' }}</div>
                </div>
            </div>
        </div>

        <div class="card content-width-medium">
            <h2>Last Month</h2>
            <div class="info-grid">
                <div class="cell">
                    <div class="label">Daily Average Spending</div>
                    <div class="data">{{ toEur(pageValues.lastMonth.spendingsAverageDay) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Weekly Average Spending</div>
                    <div class="data">{{ toEur(pageValues.lastMonth.spendingsAverageWeek) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Spending This Month</div>
                    <div class="data">{{ toEur(pageValues.lastMonth.spendingsAverageMonth) || '-' }}</div>
                </div>
            </div>

            <div class="card-spacer"></div>

            <div class="info-grid">
                <div class="cell">
                    <div class="label">Expense-to-Income Ratio</div>
                    <div class="data">{{ toFiNumber(pageValues.lastMonth.incomeExpenseRatio) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Net Total</div>
                    <div 
                        class="data" 
                        :class="pageValues.lastMonth.netTotal > 0 ? 'positive' : 'negative'" 
                    >
                        {{ toEur(pageValues.lastMonth.netTotal) || '-' }}
                    </div>
                </div>
            </div>

            <div class="card-spacer"></div>

            <div 
                class="pieChartHolder"
                :class="{ loaded: isLoaded.pie1, fullscreen: fullscreenChart === 'pie1' }"
            >
                <div class="chart" ref="pieChartContainer1"></div>
                <button 
                    class="button-simple fs-button" 
                    @click="toggleFullscreenChart('pie1')"
                >
                    <IconCollapse v-if="fullscreenChart === 'pie1'"/>
                    <IconExpand v-else/>
                </button>
            </div>
        </div>

        <div class="card content-width-medium">
            <h2>Last Year</h2>
            <div class="info-grid">
                <div class="cell">
                    <div class="label">Daily Average Spending</div>
                    <div class="data">{{ toEur(pageValues.lastYear.spendingsAverageDay) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Weekly Average Spending</div>
                    <div class="data">{{ toEur(pageValues.lastYear.spendingsAverageWeek) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Monthly Average Spending</div>
                    <div class="data">{{ toEur(pageValues.lastYear.spendingsAverageMonth) || '-' }}</div>
                </div>
            </div>

            <div class="card-spacer"></div>

            <div class="info-grid">
                <div class="cell">
                    <div class="label">Expense-to-Income Ratio</div>
                    <div class="data">{{ toFiNumber(pageValues.lastYear.incomeExpenseRatio) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Net Total</div>
                    <div 
                        class="data" 
                        :class="pageValues.lastYear.netTotal > 0 ? 'positive' : 'negative'" 
                    >
                        {{ toEur(pageValues.lastYear.netTotal) || '-' }}
                    </div>                
                </div>
            </div>

            <div class="card-spacer"></div>

            <div 
                class="pieChartHolder"
                :class="{ loaded: isLoaded.pie2, fullscreen: fullscreenChart === 'pie2' }"
            >
                <div class="chart" ref="pieChartContainer2"></div>
                <button 
                    class="button-simple fs-button" 
                    @click="toggleFullscreenChart('pie2')"
                >
                    <IconCollapse v-if="fullscreenChart === 'pie2'"/>
                    <IconExpand v-else/>
                </button>
            </div>
        </div>

        <!-- <h2>All time?</h2> -->

        <div class="content-width-medium">
            <h1>Charts</h1>
            <p> If you want to take a more comprehensive look at your spending habits over time, the charts below can provide valuable insights. These charts are not limited to showing data from just the past month or even the past year. Instead, they present a complete view of all available spending data, organized month by month. </p>
                
            <p>This allows you to observe trends, identify patterns, and track changes in your financial behavior across an extended timeline. Whether you're analyzing seasonal variations or monitoring long-term progress, these charts are a helpful tool for gaining a deeper understanding of your financial activity.</p>
        </div>

        <div 
            class="card chartCard content-width-large"
            :class="{ loaded: isLoaded.chart1, fullscreen: fullscreenChart === 'chart1' }"
        >
            <div class="chart" ref="chartContainer1"></div>
            <button 
                class="button-simple fs-button" 
                @click="toggleFullscreenChart('chart1')"
            >
                <IconCollapse v-if="fullscreenChart === 'chart1'"/>
                <IconExpand v-else/>
            </button>  
        </div>

        <div 
            class="card chartCard content-width-large"
            :class="{ loaded: isLoaded.chart2, fullscreen: fullscreenChart === 'chart2' }"
        >
            <div class="chart" ref="chartContainer2"></div>
            <button 
                class="button-simple fs-button" 
                @click="toggleFullscreenChart('chart2')"
            >
                <IconCollapse v-if="fullscreenChart === 'chart2'"/>
                <IconExpand v-else/>
            </button>  
        </div>

        <div 
            class="card chartCard content-width-large"
            :class="{ loaded: isLoaded.chart3, fullscreen: fullscreenChart === 'chart3' }"
        >
            <div class="chart" ref="chartContainer3"></div>
            <button 
                class="button-simple fs-button" 
                @click="toggleFullscreenChart('chart3')"
            >
                <IconCollapse v-if="fullscreenChart === 'chart3'"/>
                <IconExpand v-else/>
            </button>  
        </div>
    </div>
</template>


<script>
// ECharts imports
import { use, init } from 'echarts/core'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, TitleComponent, LegendComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
// import { CanvasRenderer } from 'echarts/renderers'
// My utils
import api from '@/utils/dataQuery';
import IconExpand from '@/components/icons/IconExpand.vue';
import IconCollapse from '@/components/icons/IconCollapse.vue';
// import { notify } from '@/utils/notification';

// Register only the required components
use([TooltipComponent, GridComponent, LineChart, BarChart, PieChart, SVGRenderer, TitleComponent, LegendComponent]);

export default {
    name: 'AnalyticsPage',
    components: {
        IconExpand,
        IconCollapse,
    },
    data() {
        return {
            isLoaded: {
                chart1: false,
                chart2: false,
                chart3: false,
            },
            fullscreenChart: "",
            pageValues: {
                generalStats: {},
                lastMonth: {},
                lastYear: {}
            },
        };
    },
    methods: {
        toggleFullscreenChart(chartId) {
            if (this.fullscreenChart !== chartId) {
                this.fullscreenChart = chartId; // Set to the provided chartId
                document.documentElement.classList.add('no-scroll');
            } else {
                this.fullscreenChart = ''; // Clear the fullscreen chart
                document.documentElement.classList.remove('no-scroll');
            }
        },
        setupResizeObserver(containerRef, chart) {
            const container = this.$refs[containerRef];
            if (!container) return;

            const resizeObserver = new ResizeObserver(() => {
                chart.resize();
            });

            resizeObserver.observe(container);

            // Store the observer for cleanup
            if (!this.resizeObservers) {
                this.resizeObservers = [];
            }
            this.resizeObservers.push(resizeObserver);
        },
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
        },
        // Initially const
        getCssVar(colorName) {
            return getComputedStyle(document.documentElement).getPropertyValue(`--${colorName}`).trim();
        },
        toFiCurrency(value, format = 'full') {
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
        },
        toFiDate(value, formatType = 'date') {
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
        },
        generateTooltip(params, dateType) {
            let rows = '';
            for (let i = 0; i < params.length; i++) {
                rows += `
                    <tr class="${params[i].data === 0 ? 'disabled' : ''}">
                        <td style="display: flex; align-items: center; padding-right: 1rem;">
                            <div class="color-blob" style="background-color: ${params[i].color};"></div>
                            <div class="series-name">${params[i].seriesName}</div>
                        </td>
                        <td class="value">${this.toFiCurrency(params[i].data)}</td>
                    </tr>
                `;
            }
            return `
                <div class="chart-tooltip">
                    <div class="header">${this.toFiDate(params[0].axisValue, dateType)}</div>
                    <table>${rows}</table>
                </div>
            `;
        },
        generateTooltipPie(params, countOrEur) {
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
                            <td class="value">${countOrEur == 'eur' ? this.toFiCurrency(params.value) : params.value + ' kpl'}</td>
                        </tr>
                    </table>
                </div>
            `;
        }
    },
    computed: {
        commonChartValues() {
            return {
                color: [
                    this.getCssVar("color-primary"), 
                    this.getCssVar("color-secondary"), 
                    this.getCssVar("color-tertiary"),
                    this.getCssVar("color-quaternary"),
                    this.getCssVar("color-quinary"),
                    this.getCssVar("color-jokumikalie"),
                    this.getCssVar("color-senary"),
                    this.getCssVar("color-septenary"),
                    this.getCssVar("color-octonary"),
                    this.getCssVar("color-nonary"),
                    this.getCssVar("color-denary"),
                    this.getCssVar("color-undecenary"),
                ],
                legend: {
                    type: 'scroll',
                    show: true,
                    bottom: 0,
                    textStyle: {
                        color: this.getCssVar('color-text'),
                        fontWeight: 500,
                    },
                    inactiveColor: this.getCssVar('color-text-hidden'),
                    pageIconColor: this.getCssVar('color-text'),
                    pageIconInactiveColor: this.getCssVar('color-text-hidden'),
                    pageTextStyle: {
                        color: this.getCssVar('color-text'),
                    },
                },
                textStyle: {
                    fontFamily: 'Poppins',
                    color: this.getCssVar('color-text-lighter'),
                },
            }
        },
        chartLegend() {
            return {
                type: 'scroll',
                show: true,
                bottom: 0,
                textStyle: {
                    color: this.getCssVar('color-text'),
                    fontWeight: 500,
                },
                inactiveColor: this.getCssVar('color-text-hidden'),
                pageIconColor: this.getCssVar('color-text'),
                pageIconInactiveColor: this.getCssVar('color-text-hidden'),
                pageTextStyle: {
                    color: this.getCssVar('color-text'),
                },
            }
        }
    },
    async mounted() {

        // Initialize charts
        const chart1 = init(this.$refs.chartContainer1);
        const chart2 = init(this.$refs.chartContainer2);
        const chart3 = init(this.$refs.chartContainer3);
        const pie1 = init(this.$refs.pieChartContainer1);
        const pie2 = init(this.$refs.pieChartContainer2);

        // Async setup for each chart
        const fetchAndSetupCharts = [
            
            // General stats
            (async () => {
                const generalStatsResponse = await api.getGeneralStats();
                if (generalStatsResponse && generalStatsResponse.generalStats)
                    this.pageValues.generalStats = {...generalStatsResponse.generalStats};
            })(),

            // Last month stats
            (async () => {
                const lastMonthResponse = await api.getStatsForTimespan("month")
                if (lastMonthResponse && lastMonthResponse.stats) {
                    this.pageValues.lastMonth = {...lastMonthResponse.stats}

                    const pieData1 = lastMonthResponse.stats.topMostExpensiveCategories.map(item => ({
                        name: item.category,
                        value: item.totalAmount
                    }));
    
                    pie1.setOption({
                        textStyle: this.commonChartValues.textStyle,
                        title: {
                            text: 'Spendings This Month by Category',
                            textStyle: {
                                color: this.getCssVar('color-text-lighter'),
                                fontSize: 16,
                                fontWeight: 500,
                            },
                            x: 'center',
                        },
                        legend: this.commonChartValues.legend,
                        color: this.commonChartValues.color,
                        tooltip: { 
                            trigger: 'item',
                            backgroundColor: this.getCssVar('color-background-card'),
                            borderWidth: 0,
                            formatter: params => this.generateTooltipPie(params, 'eur')
                        },
                        series: [
                            {
                                name: 'Monthly Average Spending',
                                type: 'pie',
                                label: {
                                    color: this.getCssVar('color-text')
                                },
                                data: pieData1,
                            }
                        ]
                    })

                    // Add a listener to resize the chart when needed
                    this.setupResizeObserver("pieChartContainer1", pie1);

                    // Listen for custom dark mode change event
                    window.addEventListener("darkModeChange", () => {
                        pie1.setOption({
                            textStyle: {
                                color: this.getCssVar('color-text-lighter'),
                            },
                            legend: {
                                textStyle: {
                                    color: this.getCssVar('color-text'),
                                },
                                inactiveColor: this.getCssVar('color-text-hidden'),
                                pageIconColor: this.getCssVar('color-text'),
                                pageIconInactiveColor: this.getCssVar('color-text-hidden'),
                                pageTextStyle: {
                                    color: this.getCssVar('color-text'),
                                },
                            },
                            color: [
                                this.getCssVar("color-primary"), 
                                this.getCssVar("color-secondary"), 
                                this.getCssVar("color-tertiary"),
                                this.getCssVar("color-quaternary"),
                                this.getCssVar("color-quinary"),
                                this.getCssVar("color-jokumikalie"),
                                this.getCssVar("color-senary"),
                                this.getCssVar("color-septenary"),
                                this.getCssVar("color-octonary"),
                                this.getCssVar("color-nonary"),
                                this.getCssVar("color-denary"),
                                this.getCssVar("color-undecenary"),
                            ],
                            tooltip: { 
                                backgroundColor: this.getCssVar('color-background-card'),
                                borderColor: this.getCssVar('color-border'),
                            },
                            series: [
                                {
                                    label: {
                                        color: this.getCssVar('color-text')
                                    },
                                }
                            ],
                        });
                    });

                    // display the chart
                    this.isLoaded.pie1 = true;
                }
            })(),

            // Last year stats
            (async () => {
                const lastYearResponse = await api.getStatsForTimespan("year")
                if (lastYearResponse && lastYearResponse.stats) {
                    this.pageValues.lastYear = {...lastYearResponse.stats}

                    const pieData2 = lastYearResponse.stats.topMostExpensiveCategories.map(item => ({
                        name: item.category,
                        value: item.totalAmount
                    }));

                    pie2.setOption({
                        textStyle: this.commonChartValues.textStyle,
                        title: {
                            text: 'Monthly Average Spendings by Category',
                            textStyle: {
                                color: this.getCssVar('color-text-lighter'),
                                fontSize: 16,
                                fontWeight: 500,
                            },
                            x: 'center',
                        },
                        legend: this.commonChartValues.legend,
                        color: this.commonChartValues.color,
                        tooltip: { 
                            trigger: 'item',
                            backgroundColor: this.getCssVar('color-background-card'),
                            borderWidth: 0,
                            formatter: params => this.generateTooltipPie(params, 'eur')
                        },
                        series: [
                            {
                                name: 'Monthly Average Spending',
                                type: 'pie',
                                label: {
                                    color: this.getCssVar('color-text')
                                },
                                data: pieData2,
                            }
                        ]
                    })

                    // Add a listener to resize the chart when needed
                    this.setupResizeObserver("pieChartContainer2", pie2);

                    // Listen for custom dark mode change event
                    window.addEventListener("darkModeChange", () => {
                        pie2.setOption({
                            textStyle: {
                                color: this.getCssVar('color-text-lighter'),
                            },
                            legend: {
                                textStyle: {
                                    color: this.getCssVar('color-text'),
                                },
                                inactiveColor: this.getCssVar('color-text-hidden'),
                                pageIconColor: this.getCssVar('color-text'),
                                pageIconInactiveColor: this.getCssVar('color-text-hidden'),
                                pageTextStyle: {
                                    color: this.getCssVar('color-text'),
                                },
                            },
                            color: [
                                this.getCssVar("color-primary"), 
                                this.getCssVar("color-secondary"), 
                                this.getCssVar("color-tertiary"),
                                this.getCssVar("color-quaternary"),
                                this.getCssVar("color-quinary"),
                                this.getCssVar("color-jokumikalie"),
                                this.getCssVar("color-senary"),
                                this.getCssVar("color-septenary"),
                                this.getCssVar("color-octonary"),
                                this.getCssVar("color-nonary"),
                                this.getCssVar("color-denary"),
                                this.getCssVar("color-undecenary"),
                            ],
                            tooltip: { 
                                backgroundColor: this.getCssVar('color-background-card'),
                                borderColor: this.getCssVar('color-border'),
                            },
                            series: [
                                {
                                    label: {
                                        color: this.getCssVar('color-text')
                                    },
                                }
                            ],
                        });
                    });

                    // display the chart
                    this.isLoaded.pie2 = true;
                }
            })(),

            // Chart 1
            (async () => {
                try {
                    const response = await api.getChartBalanceOverTime();
                    const dates = response.balanceOverTime.map(item => item.date);
                    const runningSums = response.balanceOverTime.map(item => item.runningBalance);
                    chart1.setOption({
                        textStyle: this.commonChartValues.textStyle,
                        title: {
                            text: 'Balance over time',
                            textStyle: {
                                color: this.getCssVar('color-text'),
                                fontSize: 24,
                            }
                        },
                        color: [this.getCssVar('color-primary')],
                        tooltip: { 
                            trigger: 'axis',
                            backgroundColor: this.getCssVar('color-background-card'),
                            borderWidth: 0,
                            formatter: params => this.generateTooltip(params, 'full')
                        },
                        grid: {
                            left: 56,
                            right: 8,
                            top: 88,
                            bottom: 80,
                        },
                        xAxis: {
                            type: 'category',
                            data: dates,
                            axisLabel: {
                                rotate: 45,
                                formatter: value => this.toFiDate(value, 'date'),
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
                                formatter: value => this.toFiCurrency(value, 'axis')
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

                    // Add a listener to resize the chart when needed
                    this.setupResizeObserver("chartContainer1", chart1);

                    // Listen for custom dark mode change event
                    window.addEventListener("darkModeChange", () => {
                        chart1.setOption({
                            textStyle: {
                                color: this.getCssVar('color-text-lighter'),
                            },
                            title: {
                                textStyle: {
                                    color: this.getCssVar('color-text'),
                                }
                            },
                            color: [this.getCssVar('color-primary')],
                            tooltip: { 
                                backgroundColor: this.getCssVar('color-background-card'),
                                borderColor: this.getCssVar('color-border'),
                            },
                        });
                    });

                    // display the chart
                    this.isLoaded.chart1 = true;
                } catch (error) {
                    // notify('Failed to display Chart', "error");
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
                        textStyle: this.commonChartValues.textStyle,
                        title: {
                            text: 'Sum by month',
                            textStyle: {
                                color: this.getCssVar('color-text'),
                                fontSize: 24,
                            }
                        },
                        color: [this.getCssVar("color-positive"), this.getCssVar("color-negative"), this.getCssVar("color-text")],
                        tooltip: { 
                            trigger: 'axis',
                            backgroundColor: this.getCssVar('color-background-card'),
                            borderWidth: 0,
                            formatter: params => this.generateTooltip(params, 'month'),
                            axisPointer: {
                                type: 'shadow',  // Ensure axisPointer is also here
                                shadowStyle: {
                                    color: this.getCssVar('color-border'),
                                    opacity: 1,
                                },
                            }
                        },
                        grid: {
                            left: 56,
                            right: 8,
                            top: 88,
                            bottom: 80,
                        },
                        xAxis: {
                            type: 'category',
                            data: months,
                            axisLabel: {
                                rotate: 45,
                                formatter: value => this.toFiDate(value, 'month'),
                            },
                            axisTick: {
                                alignWithLabel: true
                            }
                        },
                        yAxis: { 
                            type: 'value',  
                            name: 'Amount (€)',
                            axisLabel: {        
                                formatter: value => this.toFiCurrency(value, 'axis')
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
                    
                    // Add a listener to resize the chart when needed
                    this.setupResizeObserver("chartContainer2", chart2);

                    // Listen for custom dark mode change event
                    window.addEventListener("darkModeChange", () => {
                        chart2.setOption({
                            textStyle: {
                                color: this.getCssVar('color-text-lighter'),
                            },
                            title: {
                                textStyle: {
                                    color: this.getCssVar('color-text'),
                                }
                            },
                            color: [this.getCssVar("color-positive"), this.getCssVar("color-negative"), this.getCssVar("color-text")],
                            tooltip: { 
                                backgroundColor: this.getCssVar('color-background-card'),
                                borderColor: this.getCssVar('color-border'),
                                axisPointer: {
                                    shadowStyle: {
                                        color: this.getCssVar('color-border'),
                                    },
                                }
                            },
                        });
                    });

                    // display the chart
                    this.isLoaded.chart2 = true;
                } catch (error) {
                    // notify('Failed to display Chart', "error");
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
                        textStyle: this.commonChartValues.textStyle,
                        title: {
                            text: 'Expense categories by month',
                            textStyle: {
                                color: this.getCssVar('color-text'),
                                fontSize: 24,
                            }
                        },
                        legend: this.commonChartValues.legend,
                        color: this.commonChartValues.color,
                        tooltip: {
                            trigger: 'axis',
                            backgroundColor: this.getCssVar('color-background-card'),
                            borderWidth: 0,
                            formatter: params => this.generateTooltip(params, 'month'),
                            axisPointer: {
                                type: 'shadow',  // Ensure axisPointer is also here
                                shadowStyle: {
                                    color: this.getCssVar('color-border'),
                                    opacity: 1,
                                },
                            }
                        },
                        grid: {
                            left: 56,
                            right: 8,
                            top: 88,
                            bottom: 80,
                        },
                        xAxis: {
                            type: 'category',
                            data: dates,
                            axisLabel: {
                                rotate: 45,
                                formatter: value => this.toFiDate(value, 'month'),
                            },
                            axisTick: {
                                alignWithLabel: true
                            }
                        },
                        yAxis: { 
                            type: 'value',      
                            name: 'Amount (€)',
                            axisLabel: {        
                                formatter: value => this.toFiCurrency(value, 'axis')
                            }
                        },
                        series: seriesData,
                    });

                    // Add a listener to resize the chart when needed
                    this.setupResizeObserver("chartContainer3", chart3);

                    // Listen for custom dark mode change event
                    window.addEventListener("darkModeChange", () => {
                        chart3.setOption({
                            textStyle: {
                                color: this.getCssVar('color-text-lighter'),
                            },
                            title: {
                                textStyle: {
                                    color: this.getCssVar('color-text'),
                                }
                            },
                            color: [
                                this.getCssVar("color-primary"), 
                                this.getCssVar("color-secondary"), 
                                this.getCssVar("color-tertiary"),
                                this.getCssVar("color-quaternary"),
                                this.getCssVar("color-quinary"),
                                this.getCssVar("color-jokumikalie"),
                                this.getCssVar("color-senary"),
                                this.getCssVar("color-septenary"),
                                this.getCssVar("color-octonary"),
                                this.getCssVar("color-nonary"),
                                this.getCssVar("color-denary"),
                                this.getCssVar("color-undecenary"),
                            ],
                            legend: {
                                textStyle: {
                                    color: this.getCssVar('color-text'),
                                },
                                inactiveColor: this.getCssVar('color-text-hidden'),
                                pageIconColor: this.getCssVar('color-text'),
                                pageIconInactiveColor: this.getCssVar('color-text-hidden'),
                                pageTextStyle: {
                                    color: this.getCssVar('color-text'),
                                },
                            },
                            tooltip: {
                                backgroundColor: this.getCssVar('color-background-card'),
                                borderColor: this.getCssVar('color-border'),
                                axisPointer: {
                                    shadowStyle: {
                                        color: this.getCssVar('color-border'),
                                    },
                                }
                            },
                        });
                    });

                    // display the chart
                    this.isLoaded.chart3 = true;
                    chart3
                } catch (error) {
                    // notify('Failed to display Chart', "error");
                    console.error("[Chart 3] Error fetching data:", error);
                }
            })(),
        ];

        await Promise.all(fetchAndSetupCharts);
    },
    beforeUnmount() {
        // Get rid of the class in case the user changes page with the chart active
        document.documentElement.classList.remove('no-scroll');

        // Disconnect all observers
        if (this.resizeObservers) {
            this.resizeObservers.forEach(observer => observer.disconnect());
        }
    }
};
</script>


<style scoped>
.pieChartHolder {
    position: relative;
    height: 450px;
    width: 100%;
    background-color: var(--color-background-card);
}
.pieChartHolder.fullscreen {
    padding: var(--spacing-md);
}


.chartCard {
    position: relative;
    max-height: 650px;
    height: calc(100vw * 0.5 + 168px);
    width: calc(100% - var(--spacing-md) * 2);  /* Get rid of the padding of card */
}
.fullscreen {
    max-height: none;
    max-width: none;
    height: auto;
    width: auto;
    position: fixed !important;
    margin: 0;
    border-radius: 0;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--z-index-fullscreen);
}
.chart {
    /* height: calc(100vw * 0.5 + 168px); */
    height: 100%;
    width: 100%;
    position: relative;
}
.fs-button {
    position: absolute;
    padding: var(--spacing-md);
    right: 0;
    top: 0;
    z-index: 1; /* Otherwise under chart */
    color: var(--color-text-light);
    
    background: linear-gradient(90deg, transparent, var(--color-background-card) 50%);
    border-radius: 0;
    padding-left: 32px !important;
}
.pieChartHolder .fs-button {
    padding: 0;
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
.info-grid .cell.no-margin-bottom {
    margin-bottom: 0;
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
