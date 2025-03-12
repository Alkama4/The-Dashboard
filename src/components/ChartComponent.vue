<template>
    <div 
        class="ChartComponent"
        :class="{ 
            fullwindow: isFullscreen && !isTouchDevice,
            fullscreen: isFullscreen && isTouchDevice 
        }"
    >
        <div 
            ref="chartHolder"
            class="chart" 
            :class="{ loaded: isLoaded }"
        ></div>
        <button 
            class="button-simple fullscreen-button" 
            @click="toggleFullscreenChart"
        >
            <IconCollapse v-if="isFullscreen"/>
            <IconExpand v-else/>
        </button>
    </div>
</template>

<script>
import IconCollapse from './icons/IconCollapse.vue';
import IconExpand from './icons/IconExpand.vue';
import { init } from 'echarts/core'
// import { initializeAndSetupChart } from '@/utils/chartTools';

export default {
    name: 'ChartComponent',
    components: {
        IconExpand,
        IconCollapse,
    },
    props: {
        chartOptionsGenerator: {
            type: Function,
            default: null,
        },
    },
    data() {
        return {
            isFullscreen: false,
            isLoaded: false,
            isTouchDevice: 'ontouchstart' in document.documentElement,
        };
    },
    methods: {
        initializeChart() {
            if (this.$refs.chartHolder) {
                // Init the chart
                const chart = init(this.$refs.chartHolder);
    
                // Initialize the chart with the given options function
                chart.setOption(this.chartOptionsGenerator());
    
                // Add a listener to resize the chart when needed
                this.setupResizeObserver(chart);

                // Add listener for esc
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                        this.exitFullscreen()
                    }
                });
    
                // Listen for custom dark mode change event
                window.addEventListener("darkModeChange", () => {
                    // Set the options again with the function (but now with appropriate colors)
                    chart.setOption(this.chartOptionsGenerator());
                });

                // Display the chart
                this.isLoaded = true;
            } else {
                console.warn("[initializeChart] Invalid ref.")
            }
        },
        setupResizeObserver(chart) {
            const container = this.$refs.chartHolder;
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
        toggleFullscreenChart() {
            const isTouchDevice = 'ontouchstart' in document.documentElement;

            if (this.isFullscreen != true) {
                this.isFullscreen = true;
                document.documentElement.classList.add('no-scroll');

                if (isTouchDevice) {
                    document.documentElement.requestFullscreen?.().then(() => {
                        document.addEventListener('fullscreenchange', this.handleFullscreenExit);
                    });
                }
            } else {
                this.exitFullscreen();
            }
        },
        handleFullscreenExit() {
            if (!document.fullscreenElement) {
                this.exitFullscreen();
                document.removeEventListener('fullscreenchange', this.handleFullscreenExit);
            }
        },
        exitFullscreen() {
            this.isFullscreen = false;
            document.documentElement.classList.remove('no-scroll');
            if (document.fullscreenElement) {
                document.exitFullscreen?.();
            }
        }
    },
    watch: {
        chartOptionsGenerator: {
            handler(newData) { 
                if (newData != null && !this.isLoaded) {
                    this.initializeChart();
                }
            },
            immediate: true,
            deep: true
        }
    },
    unmounted() {
        this.handleFullscreenExit();
    }
}
</script>

<style scoped>
.ChartComponent { 
    position: relative;
    height: 450px;
    width: 100%;
    background-color: var(--color-background-card);
}

.chart {
    background-color: var(--color-background-card);
}

.fullscreen-button {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1; /* Otherwise under chart */
    color: var(--color-text-light);
    background: linear-gradient(90deg, transparent, var(--color-background-card) 50%);
    padding: var(--spacing-sm);
	margin: 0;
}
.fullscreen-button:hover {
    color: var(--color-text);
}
.fullscreen .fullscreen-button, .fullwindow .fullscreen-button {
    top: max(env(safe-area-inset-top), var(--spacing-md));
    right: max(env(safe-area-inset-right), var(--spacing-md));
}

.loaded {
    animation: fadeIn 0.4s ease-out;
}
</style>
