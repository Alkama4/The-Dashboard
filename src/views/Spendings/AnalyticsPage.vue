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
            <h2 class="card-header">Overall</h2>
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
<!-- 
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
            </div> -->
        </div>

        <div class="card content-width-medium">
            <div class="card-header">
                <h2>Timespan {{ pageValues.timespan.dateRange }}</h2>
                <CustomSelect
                    v-model="timespanStartMonthCount" 
                    :options="presetTimespans"
                />
            </div>
            <div class="info-grid">
                <div class="cell">
                    <div class="label">Daily Average Expenses</div>
                    <div class="data">{{ toEur(pageValues.timespan.expenses_avg_day) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Weekly Average Expenses</div>
                    <div class="data">{{ toEur(pageValues.timespan.expenses_avg_week) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Monthly Average Expenses</div>
                    <div class="data">{{ toEur(pageValues.timespan.expenses_avg_month) || '-' }}</div>
                </div>
            </div>

            <div class="card-spacer"></div>

            <div class="info-grid">
                <div class="cell">
                    <div class="label">Expense-to-Income Ratio</div>
                    <div class="data">{{ toFiNumber(pageValues.timespan.income_expense_ratio) || '-' }}</div>
                </div>
                <div class="cell">
                    <div class="label">Net Total</div>
                    <div 
                        class="data" 
                        :class="pageValues.timespan.net_total > 0 ? 'positive' : 'negative'" 
                    >
                        {{ toEur(pageValues.timespan.net_total) || '-' }}
                    </div>
                </div>
            </div>

            <div class="card-spacer"></div>

            <ChartComponent :chartOptionsGenerator="chartValueGenerators.timespanPie"/>

            <div class="card-spacer"></div>

            <div class="info-grid column-for-mobile">
                <div class="cell">
                    <h3>Expense categories total</h3>
                    <div 
                        v-for="(category, index) in pageValues.timespan.expense_categories_total" 
                        :key="index" 
                        class="data-row"
                    >
                        <div class="name">{{ category.category }}</div>
                        <div class="value">{{ toEur(category.total_amount) }}</div>
                    </div>
                    <div 
                        v-if="pageValues.timespan?.expense_categories_total?.length > 0" 
                        class="data-row sum-row"
                    >
                        <div class="name">Total</div>
                        <div class="value">{{ toEur(pageValues.timespan.expense_categories_total.reduce((sum, c) => sum + c.total_amount, 0)) }}</div>
                    </div>
                    <div v-else class="content-not-found">
                        No values found
                        <span class="text-hidden">Try modifying the timerange.</span>
                    </div>
                </div>
                <div class="cell">
                    <h3>Income categories total</h3>
                    <div 
                        v-for="(category, index) in pageValues.timespan.income_categories_total" 
                        :key="index" 
                        class="data-row"
                    >
                        <div class="name">{{ category.category }}</div>
                        <div class="value">{{ toEur(category.total_amount) }}</div>
                    </div>
                    <div 
                        v-if="pageValues.timespan?.income_categories_total?.length > 0" 
                        class="data-row sum-row"
                    >
                        <div class="name">Total</div>
                        <div class="value">{{ toEur(pageValues.timespan.income_categories_total.reduce((sum, c) => sum + c.total_amount, 0)) }}</div>
                    </div>
                    <div v-else class="content-not-found">
                        No values found
                        <span class="text-hidden">Try modifying the timerange.</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- <h2>All time?</h2> -->

        <div class="content-width-large">
            <h1>Charts</h1>
            <p> If you want to take a more comprehensive look at your spending habits over time, the charts below can provide valuable insights. These charts are not limited to showing data from just the past month or even the past year. Instead, they present a complete view of all available spending data, organized month by month. </p>
                
            <p>This allows you to observe trends, identify patterns, and track changes in your financial behavior across an extended timeline. Whether you're analyzing seasonal variations or monitoring long-term progress, these charts are a helpful tool for gaining a deeper understanding of your financial activity.</p>
        </div>

        <div class="chartCard card content-width-large">
            <ChartComponent :chartOptionsGenerator="chartValueGenerators.chart1"/>
        </div>

        <div class="chartCard card content-width-large">
            <ChartComponent :chartOptionsGenerator="chartValueGenerators.chart2"/>
        </div>

        <div class="chartCard card content-width-large">
            <ChartComponent :chartOptionsGenerator="chartValueGenerators.chart3"/>
        </div>

        <div class="chartCard card content-width-large">
            <ChartComponent :chartOptionsGenerator="chartValueGenerators.chart4"/>
        </div>

    </div>
</template>


<script>
import fastApi from '@/utils/fastApi';
import { convert, getCssVar } from '@/utils/utils'
import { 
    generateTooltipMultiValue, 
    generateTooltipSingleValue, 
    commonChartValues,
    initialEchartSetup,
} from '@/utils/chartUtils'
import ChartComponent from '@/components/ChartComponent.vue';
import CustomSelect from '@/components/CustomSelect.vue';

export default {
    name: 'AnalyticsPage',
    components: {
        ChartComponent,
        CustomSelect,
    },
    data() {
        return {
            chartValueGenerators: {},
            pageValues: {
                generalStats: {},
                timespan: {},
            },
            presetTimespans: [
				{label: "This month", value: 0},
				{label: "Last 3 months", value: 2},
				{label: "Last 6 months", value: 5},
				{label: "Last year", value: 11},
				{label: "All time", value: -1},
			],
            timespanStartMonthCount: 0,
        };
    },
    methods: {
        // For formatting on dom or template or whatever it is
        toFiNumber(value) {
            return convert.toFiNumber(value)
        },
        toFiDate(value) {
            return convert.toFiDate(value)
        },
        toEur(value) {
            return convert.toEur(value)
        },
        getTimespanStartDate() {
            const today = new Date();
            const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            if (this.timespanStartMonthCount === -1) {
                return null;
            }

            const newDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - this.timespanStartMonthCount,
                1
            );

            const year = newDate.getFullYear();
            const month = String(this.timespanStartMonthCount === 0 
                ? newDate.getMonth() + 1 
                : newDate.getMonth()).padStart(2, '0');
            const day = this.timespanStartMonthCount === 0
                ? '01'
                : String(currentDate.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        },
        async fetchTimespanStatistics() {
            const startDate = this.getTimespanStartDate();
            const endDate = new Date().toISOString().split('T')[0]; // today
            const response = await fastApi.spendings.analytics.stats.timespan(startDate, endDate);

            if (response && response.stats) {
                // Store all values for the page
                this.pageValues.timespan = { ...response.stats };

                // Construct the date text for the timespan
                this.pageValues.timespan.dateRange = `${convert.toFiDate(response.timespan.start_date, "date")} - ${convert.toFiDate(response.timespan.end_date, "date")} (${response.timespan.days_in_period} days)`

                // Map the values for the chart
                const pieData1 = response.stats.expense_categories_avg_month.map(item => ({
                    name: item.category,
                    value: item.avg_per_month,
                }));

                const timespanPieOptions = () => ({
                    textStyle: commonChartValues().textStyle,
                    title: {
                        text: 'Monthly Average Expenses by Category',
                        textStyle: {
                            color: getCssVar('color-text'),
                            fontSize: getCssVar('font-size-medium'),
                            fontWeight: 700,
                        },
                        x: 'center',
                    },
                    legend: commonChartValues().legend,
                    color: commonChartValues().color,
                    tooltip: { 
                        trigger: 'item',
                        backgroundColor: getCssVar('color-background-card'),
                        borderWidth: 1,
                        borderColor: getCssVar("color-border"),
                        formatter: params => generateTooltipSingleValue(params, 'eur'),
                    },
                    series: [
                        {
                            name: 'Monthly Average Spending',
                            type: 'pie',
                            label: {
                                color: getCssVar('color-text'),
                            },
                            data: pieData1,
                        },
                    ],
                });

                // Set the value generator for the chart
                this.chartValueGenerators.timespanPie = timespanPieOptions;
            }
        }
    },
    watch: {
        timespanStartMonthCount: {
            async handler() {
                this.fetchTimespanStatistics()
            }
        }
    },
    async mounted() {
        // Everything that needs to be done before echarts in one method
        initialEchartSetup();
        
        // Async setup for each chart
        const fetchAndSetupCharts = [
            
            // General stats
            (async () => {
                const generalStatsResponse = await fastApi.spendings.analytics.stats.general();
                if (generalStatsResponse && generalStatsResponse.generalStats)
                    this.pageValues.generalStats = {...generalStatsResponse.generalStats};
            })(),

            // Last month stats
            (async () => {
                await this.fetchTimespanStatistics();
            })(),

            // Chart 1
            (async () => {
                try {
                    const response = await fastApi.spendings.analytics.charts.balance_over_time();
                    const dates = response.balanceOverTime.map(item => item.date);
                    const runningSums = response.balanceOverTime.map(item => item.runningBalance);

                    const today = new Date().toISOString().split('T')[0];
                    const todayIndex = dates.indexOf(today);

                    let beforeToday = [];
                    let afterToday = [];

                    if (todayIndex === -1) {
                        // 'today' not found, show everything as historical
                        beforeToday = runningSums;
                        afterToday = new Array(runningSums.length).fill(null);
                    } else {
                        beforeToday = runningSums.slice(0, todayIndex + 1);
                        afterToday = new Array(todayIndex).fill(null).concat(runningSums.slice(todayIndex));
                    }

                    const chart1Options = () => ({
                        textStyle: commonChartValues().textStyle,
                        title: {
                            text: 'Balance over time',
                            textStyle: {
                                color: getCssVar('color-text'),
                                fontSize: 24,
                            }
                        },
                        tooltip: { 
                            trigger: 'axis',
                            backgroundColor: getCssVar('color-background-card'),
                            borderWidth: 1,
                            borderColor: getCssVar("color-border"),
                            formatter: params => generateTooltipMultiValue(params, 'full', convert.toEur)
                        },
                        grid: {
                            left: 80,
                            right: 8,
                            top: 88,
                            bottom: 100,
                        },
                        xAxis: {
                            type: 'category',
                            data: dates,
                            axisLabel: {
                                rotate: 45,
                                formatter: value => convert.toFiDate(value, 'date'),
                            },
                            axisTick: {
                                alignWithLabel: true
                            }
                        },
                        yAxis: { 
                            type: 'value',      
                            name: 'Amount (€)',
                            axisLabel: {
                                formatter: value => this.toEur(value, 'axis')
                            }
                        },
                        dataZoom: [
                            {
                                type: 'inside',
                                xAxisIndex: 0,
                                filterMode: 'filter'
                            },
                            {
                                type: 'slider',
                                xAxisIndex: 0,
                                height: 32,
                                bottom: 12,
                                handleSize: '80%',
                                handleStyle: {
                                    color: getCssVar('color-text-hidden'),
                                },
                                dataBackground: {
                                    areaStyle: {
                                        color: getCssVar('color-text-hidden')
                                    },
                                    lineStyle: {
                                        color: getCssVar('color-text-lighter')
                                    }
                                },
                                borderColor: "transparent",
                                fillerColor: getCssVar('color-primary-opaque'),
                                filterMode: 'filter',
                                textStyle: {
                                    color: getCssVar('color-text-lighter')
                                }
                            }
                        ],
                        series: [
                            {
                                name: 'Balance',
                                type: 'line',
                                data: beforeToday,
                                color: getCssVar('color-primary'),
                                areaStyle: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: getCssVar("color-primary")
                                        }, {
                                            offset: 1, color: 'rgba(0,0,0,0)'
                                        }]
                                    }
                                },
                            },
                            afterToday.length > 0 ? {
                                name: 'Balance (Upcoming)',
                                type: 'line',
                                data: afterToday,
                                color: getCssVar('color-primary-opaque'),
                                areaStyle: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: getCssVar("color-primary-opaque")
                                        }, {
                                            offset: 1, color: 'rgba(0,0,0,0)'
                                        }]
                                    }
                                },
                            } : null,
                        ].filter(Boolean),
                    });

                    // Set the value generator for the chart
                    this.chartValueGenerators.chart1 = chart1Options;
                } catch (error) {
                    // notify('Failed to display Chart', "error");
                    console.error("[Chart 1] Error fetching data:", error);
                }
            })(),

            // Chart 2
            (async () => {
                try {
                    const response = await fastApi.spendings.analytics.charts.sum_by_month();
                    const months = response.monthlySums.map(item => item.month);
                    const pastIncomes = response.monthlySums.map(item => item.past.income);
                    const upcomingIncomes = response.monthlySums.map(item => item.upcoming.income);
                    const pastExpenses = response.monthlySums.map(item => item.past.expense);
                    const upcomingExpenses = response.monthlySums.map(item => item.upcoming.expense);
                    const netTotals = response.monthlySums.map(item => item.net_total);

                    const chart2Options = () => ({
                        textStyle: commonChartValues().textStyle,
                        title: {
                            text: 'Sum by month',
                            textStyle: {
                                color: getCssVar('color-text'),
                                fontSize: 24,
                            }
                        },
                        color: [
                            getCssVar("color-positive"),
                            getCssVar("color-positive-opaque"),
                            getCssVar("color-negative"),
                            getCssVar("color-negative-opaque"),
                            getCssVar("color-text"),
                        ],
                        tooltip: { 
                            trigger: 'axis',
                            backgroundColor: getCssVar('color-background-card'),
                            borderWidth: 1,
                            borderColor: getCssVar("color-border"),
                            formatter: params => generateTooltipMultiValue(params, 'month', convert.toEur, true),
                            axisPointer: {
                                type: 'shadow',  // Ensure axisPointer is also here
                                shadowStyle: {
                                    color: getCssVar('color-border'),
                                    opacity: 1,
                                },
                            }
                        },
                        grid: {
                            left: 80,
                            right: 8,
                            top: 88,
                            bottom: 56,
                        },
                        xAxis: {
                            type: 'category',
                            data: months,
                            axisLabel: {
                                rotate: 45,
                                formatter: value => convert.toFiDate(value, 'month'),
                            },
                            axisTick: {
                                alignWithLabel: true
                            }
                        },
                        yAxis: { 
                            type: 'value',  
                            name: 'Amount (€)',
                            axisLabel: {        
                                formatter: value => this.toEur(value, 'axis')
                            }
                        },
                        series: [
                            {
                                name: 'Incomes',
                                type: 'bar',
                                data: pastIncomes,
                                smooth: true,
                                stack: 'stacked',
                                emphasis: {
                                    focus: 'series'
                                }
                            },
                            {
                                name: 'Incomes (Upcoming)',
                                type: 'bar',
                                data: upcomingIncomes,
                                smooth: true,
                                stack: 'stacked',
                                emphasis: {
                                    focus: 'series'
                                }
                            },
                            {
                                name: 'Expenses',
                                type: 'bar',
                                data: pastExpenses,
                                smooth: true,
                                stack: 'stacked',
                                emphasis: {
                                    focus: 'series'
                                }
                            },
                            {
                                name: 'Expenses (Upcoming)',
                                type: 'bar',
                                data: upcomingExpenses,
                                smooth: true,
                                stack: 'stacked',
                                emphasis: {
                                    focus: 'series'
                                }
                            },
                            {
                                name: 'Sum',
                                type: 'line',
                                data: netTotals,
                                smooth: true,
                                emphasis: {
                                    focus: 'series'
                                }
                            },
                        ],
                    });
                    
                    // Set the value generator for the chart
                    this.chartValueGenerators.chart2 = chart2Options;
                } catch (error) {
                    // notify('Failed to display Chart', "error");
                    console.error("[Chart 2] Error fetching data:", error);
                }
            })(),

            // Chart 3
            (async () => {
                try {
                    const response = await fastApi.spendings.analytics.charts.categories_monthly("expense");
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
                        emphasis: {
                            focus: 'series'
                        }
                    }));

                    const chart3Options = () => ({
                        textStyle: commonChartValues().textStyle,
                        title: {
                            text: 'Expense categories by month',
                            textStyle: {
                                color: getCssVar('color-text'),
                                fontSize: 24,
                            }
                        },
                        legend: commonChartValues().legend,
                        color: commonChartValues().color,
                        tooltip: {
                            trigger: 'axis',
                            backgroundColor: getCssVar('color-background-card'),
                            borderWidth: 1,
                            borderColor: getCssVar("color-border"),
                            formatter: params => generateTooltipMultiValue(params, 'month', convert.toEur, true),
                            axisPointer: {
                                type: 'shadow',  // Ensure axisPointer is also here
                                shadowStyle: {
                                    color: getCssVar('color-border'),
                                    opacity: 1,
                                },
                            }
                        },
                        grid: {
                            left: 80,
                            right: 8,
                            top: 88,
                            bottom: 80,
                        },
                        xAxis: {
                            type: 'category',
                            data: dates,
                            axisLabel: {
                                rotate: 45,
                                formatter: value => convert.toFiDate(value, 'month'),
                            },
                            axisTick: {
                                alignWithLabel: true
                            }
                        },
                        yAxis: { 
                            type: 'value',      
                            name: 'Amount (€)',
                            axisLabel: {        
                                formatter: value => this.toEur(value, 'axis')
                            }
                        },
                        series: seriesData,
                    });

                    // Set the value generator for the chart
                    this.chartValueGenerators.chart3 = chart3Options;
                } catch (error) {
                    // notify('Failed to display Chart', "error");
                    console.error("[Chart 3] Error fetching data:", error);
                }
            })(),

            // Chart 4
            (async () => {
                try {
                    const response = await fastApi.spendings.analytics.charts.categories_monthly("income");
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
                        emphasis: {
                            focus: 'series'
                        }
                    }));

                    const chart4Options = () => ({
                        textStyle: commonChartValues().textStyle,
                        title: {
                            text: 'Income categories by month',
                            textStyle: {
                                color: getCssVar('color-text'),
                                fontSize: 24,
                            }
                        },
                        legend: commonChartValues().legend,
                        color: commonChartValues().color,
                        tooltip: {
                            trigger: 'axis',
                            backgroundColor: getCssVar('color-background-card'),
                            borderWidth: 1,
                            borderColor: getCssVar("color-border"),
                            formatter: params => generateTooltipMultiValue(params, 'month', convert.toEur, true),
                            axisPointer: {
                                type: 'shadow',  // Ensure axisPointer is also here
                                shadowStyle: {
                                    color: getCssVar('color-border'),
                                    opacity: 1,
                                },
                            }
                        },
                        grid: {
                            left: 80,
                            right: 8,
                            top: 88,
                            bottom: 80,
                        },
                        xAxis: {
                            type: 'category',
                            data: dates,
                            axisLabel: {
                                rotate: 45,
                                formatter: value => convert.toFiDate(value, 'month'),
                            },
                            axisTick: {
                                alignWithLabel: true
                            }
                        },
                        yAxis: { 
                            type: 'value',      
                            name: 'Amount (€)',
                            axisLabel: {        
                                formatter: value => this.toEur(value, 'axis')
                            }
                        },
                        series: seriesData,
                    });

                    // Set the value generator for the chart
                    this.chartValueGenerators.chart4 = chart4Options;
                } catch (error) {
                    // notify('Failed to display Chart', "error");
                    console.error("[Chart 4] Error fetching data:", error);
                }
            })(),
        ];

        // Finally run the setups
        await Promise.all(fetchAndSetupCharts);
    },
    beforeUnmount() {
        // Get rid of the class in case the user changes page with the chart active
        document.documentElement.classList.remove('no-scroll');

        // Disconnect all observers
        if (this.resizeObservers) {
            this.resizeObservers.forEach(observer => observer.disconnect());
        }

        // Get rid of esc listener
        document.removeEventListener('keydown', this.exitFullscreenListener);
    }
};
</script>


<style scoped>
.card-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.custom-select {
    width: 140px;
}

.chartCard {
    position: relative;
    width: calc(100% - var(--spacing-md) * 2);  /* Get rid of the padding of card */
}
.chartCard .ChartComponent {
    height: calc(100vw * 0.5 + 168px);
    max-height: 650px;
}

.loaded {
    animation: fadeIn 0.4s ease-out;
}
.info-grid {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
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
.info-grid .cell h3 {
    margin-top: 0;
    margin-bottom: var(--spacing-sm);
}

@media(max-width: 675px) {
    .column-for-mobile {
        flex-direction: column;
    }
    .column-for-mobile .cell {
        width: 100%;
    }
}

.info-grid .cell .data-row {
    display: flex;
    justify-content: space-between;
    margin-inline: var(--spacing-md);
}
.info-grid .cell .sum-row {
    border-top: 2px solid var(--color-border);
    padding-top: 6px;
    margin-top: 6px;
}
.data-row .name {
    color: var(--color-text-light);
    font-weight: 500;
}
.data-row .value {
    color: var(--color-text);
}
.info-grid .cell .sum-row,
.info-grid .cell .sum-row .name {
    color: var(--color-text);
    font-weight: 600;
}

.content-not-found {
    padding-top: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
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
