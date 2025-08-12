<template>
    <div 
        class="chart-component"
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
            doNotTouchNoScroll: false,
        };
    },
    methods: {
        initializeChart() {
            if (this.$refs.chartHolder) {
                this.chart = init(this.$refs.chartHolder);
                this.chart.setOption(this.chartOptionsGenerator());
                this.setupResizeObserver(this.chart);

                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                        this.exitFullscreen();
                    }
                });

                window.addEventListener("darkModeChange", () => {
                    this.chart.setOption(this.chartOptionsGenerator());
                });

                this.isLoaded = true;
            } else {
                console.warn("[initializeChart] Invalid ref.");
            }
        },
        setupResizeObserver(chart) {
            const container = this.$refs.chartHolder;
            if (!container) return;

            let resizeTimeout = null;
            const resizeObserver = new ResizeObserver(() => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    chart.resize();
                }, 1);
            });

            resizeObserver.observe(container);

            this.resizeObservers = this.resizeObservers || [];
            this.resizeObservers.push(resizeObserver);
        },
        toggleFullscreenChart() {
            const isTouchDevice = 'ontouchstart' in document.documentElement;

            // Emit the current state for modal fixes
            this.$emit('fullscreen-toggle', this.isFullscreen);

            if (this.isFullscreen != true) {
                this.isFullscreen = true;

                // If there isn't a no-scroll style add it
                if (!document.documentElement.classList.contains('no-scroll')) {
                    document.documentElement.classList.add('no-scroll');

                // Else add a flag to not remove it later, since something else is handling it
                } else {
                    this.doNotTouchNoScroll = true;
                }

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
            if (!this.doNotTouchNoScroll) {
                document.documentElement.classList.remove('no-scroll');
            }
            if (document.fullscreenElement) {
                document.exitFullscreen?.();
            }
        }
    },
    watch: {
        chartOptionsGenerator: {
            handler(newVal) {
                if (!this.isLoaded) {
                    this.initializeChart();
                } else if (this.chart) {
                    this.chart.setOption(newVal());
                }
            },
            // immediate: true,
            deep: true
        }
    },
    unmounted() {
        this.handleFullscreenExit();
    }
}
</script>

<style scoped>
.chart-component { 
    position: relative;
    min-width: 10px;
    min-height: 10px;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--color-background-card);
}

.chart {
    background-color: var(--color-background-card);
}

.fullscreen-button {
    position: absolute;
    right: var(--spacing-sm);
    top: var(--spacing-sm);
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
