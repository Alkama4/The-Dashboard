<template>
	<div>
		<div class="greeting-area content-width-medium">
			<div class="text-area">
				<h1>{{ greeting[0] }}</h1>
				<span class="header-sub-text">{{ greeting[1] }}</span>
				<router-link class="no-decoration" to="/spendings/newEntry" style="padding-bottom: var(--spacing-md);">
					<button class="color-primary">Start logging</button>
				</router-link>
			</div>
			<div class="action-area">
				<div class="color-blob one"></div>
				<div class="color-blob two"></div>
				<div class="color-blob three"></div>
			</div>
		</div>

		<div class="flex-column">
			<h2>Other services</h2>
			<div class="tile-container">
				<a href="https://pibox.lan:9443" class="no-decoration">
					<button class="tile-button">
						<img 
							src="../assets/thumbnails/portainer.svg" 
							@load="(event) => event.target.classList.add('loaded')"
						>
						<span>Portainer</span>
					</button>
				</a>
				<a href="http://pibox.lan:81/admin/" class="no-decoration">
					<button class="tile-button">
						<img 
							src="../assets/thumbnails/pihole.png"
							@load="(event) => event.target.classList.add('loaded')"
						>
						<span>Pihole</span>
					</button>
				</a>
			</div>
		</div>

		<!-- Might want to implement the following logic for security reasons: If login username == aleksi -->

		<div class="flex-column content-width-medium">
			<h2>Backups</h2>
			<div class="backups">
				<div v-for="(backupCategory, categoryName) in backups" :key="categoryName" class="card backup-card">
					<div class="flex header">
						<span>{{ categoryName }}</span>
					</div>
					<div v-for="(backup, index) in backupCategory" :key="index" class="backup-row">
						<div class="flex">
							<IconBackup v-if="backup.backup_direction == 'up'" size="25px"/>
							<IconBackupDown v-else size="25px"/>
							<span class="name">
								{{ backup.backup_name }}
							</span>
						</div>
						<div class="content">
							<div class="flex">
								<div class="label-text">
									<div>Last run</div>
									<div>Next in</div>
									<div>Schedule</div>
								</div>
								<div>
									<div :class="backup.status">{{ backup.last_success_time_since }}</div>
									<div>{{ backup.time_until_next }}</div>
									<div>{{ backup.schedule }}</div>
								</div>
							</div>
							<div class="path-column">
								<div class="label-text">
									<div>Device</div>
									<div>Source</div>
									<div>Destination</div>
								</div>
								<div>
									<div>{{ backup.peer_device }}</div>
									<div class="path" title="Copy to clipboard" @click="copyToClipboard(backup.source_path, 'Path')">{{ backup.source_path }}</div>
									<div class="path" title="Copy to clipboard" @click="copyToClipboard(backup.destination_path, 'Path')">{{ backup.destination_path }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="content-width-large">
			<h2>Server resource usages</h2>
			<div class="card server-resources content-width-large">
				<!-- Chart 1 - CPU temp -->
				<div 
					class="chartContainer"
					:class="{ loaded: isLoaded.chart1, fullscreen: fullscreenChart === 'chart1' }"
				>
					<div class="chart" ref="chartContainer1"></div>
					<button 
						class="button-simple fullscreen-button" 
						@click="toggleFullscreenChart('chart1')"
					>
						<IconCollapse v-if="fullscreenChart === 'chart1'"/>
						<IconExpand v-else/>
					</button>  
				</div>

				<!-- Chart 2 - RAM Usage -->
				<div 
					class="chartContainer"
					:class="{ loaded: isLoaded.chart1, fullscreen: fullscreenChart === 'chart2' }"
				>
					<div class="chart" ref="chartContainer2"></div>
					<button 
						class="button-simple fullscreen-button" 
						@click="toggleFullscreenChart('chart2')"
					>
						<IconCollapse v-if="fullscreenChart === 'chart2'"/>
						<IconExpand v-else/>
					</button>  
				</div>

				<!-- Chart 3 - RAM Usage -->
				<div 
					class="chartContainer"
					:class="{ loaded: isLoaded.chart1, fullscreen: fullscreenChart === 'chart3' }"
				>
					<div class="chart" ref="chartContainer3"></div>
					<button 
						class="button-simple fullscreen-button" 
						@click="toggleFullscreenChart('chart3')"
					>
						<IconCollapse v-if="fullscreenChart === 'chart3'"/>
						<IconExpand v-else/>
					</button>  
				</div>

				<!-- Chart 4 - RAM Usage -->
				<div 
					class="chartContainer"
					:class="{ loaded: isLoaded.chart1, fullscreen: fullscreenChart === 'chart4' }"
				>
					<div class="chart" ref="chartContainer4"></div>
					<button 
						class="button-simple fullscreen-button" 
						@click="toggleFullscreenChart('chart4')"
					>
						<IconCollapse v-if="fullscreenChart === 'chart4'"/>
						<IconExpand v-else/>
					</button>  
				</div>

				<!-- Chart 5 - RAM Usage -->
				<div 
					class="chartContainer"
					:class="{ loaded: isLoaded.chart1, fullscreen: fullscreenChart === 'chart5' }"
				>
					<div class="chart" ref="chartContainer5"></div>
					<button 
						class="button-simple fullscreen-button" 
						@click="toggleFullscreenChart('chart5')"
					>
						<IconCollapse v-if="fullscreenChart === 'chart5'"/>
						<IconExpand v-else/>
					</button>  
				</div>

				<!-- Chart 6 - RAM Usage -->
				<div 
					class="chartContainer"
					:class="{ loaded: isLoaded.chart1, fullscreen: fullscreenChart === 'chart6' }"
				>
					<div class="chart" ref="chartContainer6"></div>
					<button 
						class="button-simple fullscreen-button" 
						@click="toggleFullscreenChart('chart6')"
					>
						<IconCollapse v-if="fullscreenChart === 'chart6'"/>
						<IconExpand v-else/>
					</button>  
				</div>

				<!-- Chart 7 - RAM Usage -->
				<div 
					class="chartContainer"
					:class="{ loaded: isLoaded.chart1, fullscreen: fullscreenChart === 'chart7' }"
				>
					<div class="chart" ref="chartContainer7"></div>
					<button 
						class="button-simple fullscreen-button" 
						@click="toggleFullscreenChart('chart7')"
					>
						<IconCollapse v-if="fullscreenChart === 'chart7'"/>
						<IconExpand v-else/>
					</button>  
				</div>

			</div>
		</div>

		<div class="flex-column">
			<h2>Server Drives</h2>
			<div class="flex-row">
				<div v-for="(drive, index) in serverStats.storage" :key="index" class="drive-card card">
					<div class="name">
						<IconHDD colorHover="var(--color-text)"/>
						{{ drive.name }}
					</div>
					
					<div class="text">
						<div class="label">Used space</div>
						<div class="value">{{ formatBytes(drive.used) }}</div>
						<div class="label">Available space</div>
						<div class="value">{{ formatBytes(drive.free) }}</div>
						<div class="label">Disk size</div>
						<div class="value">{{ formatBytes(drive.total) }}</div>
					</div>
					
					<div>
						<div class="capacityIndicator">
							<div 
								class="bar" 
								:class="(drive.used / drive.total) < 0.9 ? 'positiveBackground' : 'negativeBackground'"
								:style="{ width: (drive.used / drive.total * 100) + '%' }"
							></div>
							<div class="text">
								{{ (drive.used / drive.total * 100).toFixed(2) + '%' }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
// Icons
import IconHDD from '@/components/icons/IconHDD.vue';
import IconBackup from '@/components/icons/IconBackup.vue';
import IconBackupDown from '@/components/icons/IconBackupDown.vue';
import IconExpand from '@/components/icons/IconExpand.vue';
import IconCollapse from '@/components/icons/IconCollapse.vue';

// Other
import api from '@/utils/dataQuery';
import { convert, getCssVar } from '@/utils/mytools'
import { notify } from '@/utils/notification';
import { 
    generateTooltipMultiValue, 
    initializeAndSetupChart,
    toggleFullscreenChart,
	commonChartValues,
	setupFullscreenEscExit,
} from '@/utils/chartTools'

// ECharts imports
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, TitleComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
// import { SVGRenderer } from 'echarts/renderers'

use([TooltipComponent, GridComponent, LineChart, CanvasRenderer, TitleComponent, LegendComponent]);

export default {
	name: 'HomePage',
	components: {
		IconHDD,
		IconBackup,
		IconBackupDown,
		IconExpand,
		IconCollapse,
	},
	data() {
		return {
			greeting: this.getGreeting(),
			backups: [],
            isLoaded: {},
            fullscreenChart: "",
			serverStats: {
				storage: []
			}
		};
	},
	methods: {
		getGreeting() {
			const hour = new Date().getHours();
			if (hour < 5) {
				return ["Good night!", "It's late, get some rest and recharge for tomorrow."];
			} else if (hour < 12) {
				return ["Good morning!", "A fresh start to the day. Let's make the most of it."];
			} else if (hour < 18) {
				return ["Good afternoon!", "The day is moving along. Hope it's going well for you."];
			} else {
				return ["Good evening!", "The day's winding down. Time to relax and prepare for tomorrow."];
			}
		},
		formatBytes(value) {
			return convert.toBytes(value)
		},
		toggleFullscreenChart(chartId) {
            toggleFullscreenChart(this, chartId);
        },
		copyToClipboard(textToCopy, what) {
			try {
				if (navigator.clipboard && navigator.clipboard.writeText) {
					navigator.clipboard.writeText(textToCopy)
						.then(() => notify(`${what} copied!`, "info", 2000))
						.catch(err => {
							notify("Cannot copy text to clipboard.", "error");
							console.error("[copyToClipboard]", err);
						});
				} else {
					const textarea = document.createElement("textarea");
					textarea.value = textToCopy;
					textarea.style.position = "fixed"; // Avoid scrolling to the bottom
					document.body.appendChild(textarea);
					textarea.focus();
					textarea.select();
					try {
						document.execCommand("copy");
						notify(`${what} copied!`, "info", 2000);
					} catch (err) {
						notify("Cannot copy text to clipboard.", "error");
						console.error("[copyToClipboard fallback]", err);
					}
					document.body.removeChild(textarea);
				}
			} catch (error) {
				notify("Cannot copy text to clipboard.", "error");
				console.error("[copyToClipboard]", error);
			}
		}
	},
	async mounted() {
		const backupResponse = await api.getBackups();
		if (backupResponse) {
			this.backups = backupResponse.backups;
		}
		// console.log(this.backups);
		
		// Server drives
		const drivesResponse = await api.getServerDrivesInfo();
		if (drivesResponse) {
			for (const drive of Object.entries(drivesResponse)) {
				this.serverStats.storage.push(drive[1]);
			}
		}
		// console.log(this.serverStats.storage);

		const resourceLogsResponse = await api.getServerResourceLogs("24h");
		if (resourceLogsResponse) {
			console.log(resourceLogsResponse && resourceLogsResponse.data)
			const resourceLogsTimeStamps = resourceLogsResponse.data.map(log => log.timestamp);
			const chart1YaxisValues = resourceLogsResponse.data.map(log => log.cpu_temperature);
			const chart2YaxisValues = resourceLogsResponse.data.map(log => log.ram_usage);
			const chart3YaxisValues = resourceLogsResponse.data.map(log => log.cpu_usage);
			const chart4YaxisValues = resourceLogsResponse.data.map(log => log.disk_usage);
			const chart5YaxisValues = resourceLogsResponse.data.map(log => log.system_load);
			const chart6YaxisValues = resourceLogsResponse.data.map((log, index, array) => {
				if (index === 0) return 0;	// The first one can't have a differnce
				const difference = log.network_sent_bytes - array[index - 1].network_sent_bytes;	// Calculate
				return difference >= 0 ? difference : 0;	// If negative the server propably reset the count so set to 0
			});
			const chart7YaxisValues = resourceLogsResponse.data.map((log, index, array) => {
				if (index === 0) return 0;	// The first one can't have a differnce
				const difference = log.network_recv_bytes - array[index - 1].network_recv_bytes;	// Calculate
				return difference >= 0 ? difference : 0;	// If negative the server propably reset the count so set to 0
			});

			// Chart 1 - CPU temperature
			const chart1Options = () => ({
				textStyle: commonChartValues().textStyle,
				title: {
					text: 'CPU temperature',
					textStyle: {
						color: getCssVar('color-text'),
						fontSize: 24,
					}
				},
				color: [getCssVar('color-secondary')],
				tooltip: { 
					trigger: 'axis',
					backgroundColor: getCssVar('color-background-card'),
					borderWidth: 1,
					borderColor: getCssVar("color-border"),
					formatter: params => generateTooltipMultiValue(params, 'time', convert.toCelcius, false)
				},
				grid: {
					left: 40,
					right: 8,
					top: 80,
					bottom: 48,
				},
				xAxis: {
					type: 'category',
					data: resourceLogsTimeStamps,
					axisLabel: {
						rotate: 45,
						formatter: value => convert.toFiDate(value, 'time'),
					},
					axisTick: {
						alignWithLabel: true
					}
				},
				yAxis: { 
					type: 'value',      
					name: 'Temp (°C)',  // Y-akselin nimi
					axisLabel: {        // Y-akselin arvojen muotoilu
						formatter: value => convert.toFiNumber(value)
					}
				},
				series: [
					{
						name: 'Temperature',    // Tooltipissa näkyvä nimi
						type: 'line',
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: getCssVar("color-secondary")
								}, {
									offset: 1, color: 'transparent'
								}]
							}
						},
						data: chart1YaxisValues,
						smooth: true,
					},
				],
			});
			initializeAndSetupChart(this, "chart1", "chartContainer1", chart1Options);

			// Chart 2 - RAM Usage
			const chart2Options = () => ({
				textStyle: commonChartValues().textStyle,
				title: {
					text: 'RAM Usage',
					textStyle: {
						color: getCssVar('color-text'),
						fontSize: 24,
					}
				},
				color: [getCssVar('color-tertiary')],
				tooltip: { 
					trigger: 'axis',
					backgroundColor: getCssVar('color-background-card'),
					borderWidth: 1,
					borderColor: getCssVar("color-border"),
					formatter: params => generateTooltipMultiValue(params, 'time', convert.toPercentage, false)
				},
				grid: {
					left: 40,
					right: 8,
					top: 80,
					bottom: 48,
				},
				xAxis: {
					type: 'category',
					data: resourceLogsTimeStamps,
					axisLabel: {
						rotate: 45,
						formatter: value => convert.toFiDate(value, 'time'),
					},
					axisTick: {
						alignWithLabel: true
					},
				},
				yAxis: { 
					type: 'value',      
					name: 'Usage (%)',  // Y-akselin nimi
					max: 100,
					min: 0,
					axisLabel: {        // Y-akselin arvojen muotoilu
						formatter: value => convert.toFiNumber(value)
					}
				},
				series: [
					{
						name: 'RAM Usage',    // Tooltipissa näkyvä nimi
						type: 'line',
						areaStyle: {},
						data: chart2YaxisValues,
						smooth: true,
					},
				],
			});
			initializeAndSetupChart(this, "chart2", "chartContainer2", chart2Options);

			// Chart 3 - CPU Usage
			const chart3Options = () => ({
				textStyle: commonChartValues().textStyle,
				title: {
					text: 'CPU Usage',
					textStyle: {
						color: getCssVar('color-text'),
						fontSize: 24,
					}
				},
				color: [getCssVar('color-primary')],
				tooltip: { 
					trigger: 'axis',
					backgroundColor: getCssVar('color-background-card'),
					borderWidth: 1,
					borderColor: getCssVar("color-border"),
					formatter: params => generateTooltipMultiValue(params, 'time', convert.toPercentage, false)
				},
				grid: {
					left: 40,
					right: 8,
					top: 80,
					bottom: 48,
				},
				xAxis: {
					type: 'category',
					data: resourceLogsTimeStamps,
					axisLabel: {
						rotate: 45,
						formatter: value => convert.toFiDate(value, 'time'),
					},
					axisTick: {
						alignWithLabel: true
					},
				},
				yAxis: { 
					type: 'value',      
					name: 'Usage (%)',  // Y-akselin nimi
					max: 100,
					min: 0,
					axisLabel: {        // Y-akselin arvojen muotoilu
						formatter: value => convert.toFiNumber(value)
					}
				},
				series: [
					{
						name: 'CPU Usage',    // Tooltipissa näkyvä nimi
						type: 'line',
						areaStyle: {},
						data: chart3YaxisValues,
						smooth: true,
					},
				],
			});
			initializeAndSetupChart(this, "chart3", "chartContainer3", chart3Options);

			// Chart 4 - Disk Usage
			const chart4Options = () => ({
				textStyle: commonChartValues().textStyle,
				title: {
					text: 'Disk Usage',
					textStyle: {
						color: getCssVar('color-text'),
						fontSize: 24,
					}
				},
				color: [getCssVar('color-quaternary')],
				tooltip: { 
					trigger: 'axis',
					backgroundColor: getCssVar('color-background-card'),
					borderWidth: 1,
					borderColor: getCssVar("color-border"),
					formatter: params => generateTooltipMultiValue(params, 'time', convert.toPercentage, false)
				},
				grid: {
					left: 40,
					right: 8,
					top: 80,
					bottom: 48,
				},
				xAxis: {
					type: 'category',
					data: resourceLogsTimeStamps,
					axisLabel: {
						rotate: 45,
						formatter: value => convert.toFiDate(value, 'time'),
					},
					axisTick: {
						alignWithLabel: true
					},
				},
				yAxis: { 
					type: 'value',      
					name: 'Usage (%)',  // Y-akselin nimi
					max: 100,
					min: 0,
					axisLabel: {        // Y-akselin arvojen muotoilu
						formatter: value => convert.toFiNumber(value)
					}
				},
				series: [
					{
						name: 'Disk Usage',    // Tooltipissa näkyvä nimi
						type: 'line',
						areaStyle: {},
						data: chart4YaxisValues,
						smooth: true,
					},
				],
			});
			initializeAndSetupChart(this, "chart4", "chartContainer4", chart4Options);

			// Chart 5 - System load
			const chart5Options = () => ({
				textStyle: commonChartValues().textStyle,
				title: {
					text: 'System load',
					textStyle: {
						color: getCssVar('color-text'),
						fontSize: 24,
					}
				},
				color: [getCssVar('color-quinary')],
				tooltip: { 
					trigger: 'axis',
					backgroundColor: getCssVar('color-background-card'),
					borderWidth: 1,
					borderColor: getCssVar("color-border"),
					formatter: params => generateTooltipMultiValue(params, 'time', convert.toPercentage, false)
				},
				grid: {
					left: 40,
					right: 8,
					top: 80,
					bottom: 48,
				},
				xAxis: {
					type: 'category',
					data: resourceLogsTimeStamps,
					axisLabel: {
						rotate: 45,
						formatter: value => convert.toFiDate(value, 'time'),
					},
					axisTick: {
						alignWithLabel: true
					},
				},
				yAxis: { 
					type: 'value',      
					name: 'Usage (%)',  // Y-akselin nimi
					max: 100,
					min: 0,
					axisLabel: {        // Y-akselin arvojen muotoilu
						formatter: value => convert.toFiNumber(value)
					}
				},
				series: [
					{
						name: 'System load',    // Tooltipissa näkyvä nimi
						type: 'line',
						areaStyle: {},
						data: chart5YaxisValues,
						smooth: true,
					},
				],
			});
			initializeAndSetupChart(this, "chart5", "chartContainer5", chart5Options);

			// Chart 6 - Network upload
			const chart6Options = () => ({
				textStyle: commonChartValues().textStyle,
				title: {
					text: 'Network upload',
					textStyle: {
						color: getCssVar('color-text'),
						fontSize: 24,
					}
				},
				color: [getCssVar('color-jokumikalie')],
				tooltip: { 
					trigger: 'axis',
					backgroundColor: getCssVar('color-background-card'),
					borderWidth: 1,
					borderColor: getCssVar("color-border"),
					formatter: params => generateTooltipMultiValue(params, 'time', convert.toBytes, false)
				},
				grid: {
					left: 48,
					right: 8,
					top: 80,
					bottom: 48,
				},
				xAxis: {
					type: 'category',
					data: resourceLogsTimeStamps,
					axisLabel: {
						rotate: 45,
						formatter: value => convert.toFiDate(value, 'time'),
					},
					axisTick: {
						alignWithLabel: true
					},
				},
				yAxis: { 
					type: 'value',      
					name: 'Data (t)',  // Y-akselin nimi
					axisLabel: {        // Y-akselin arvojen muotoilu
						formatter: value => convert.toBytes(value)
					}
				},
				series: [
					{
						name: 'RAM used',    // Tooltipissa näkyvä nimi
						type: 'line',
						areaStyle: {},
						data: chart6YaxisValues,
						smooth: true,
					},
				],
			});
			initializeAndSetupChart(this, "chart6", "chartContainer6", chart6Options);

			// Chart 7 - Network download
			const chart7Options = () => ({
				textStyle: commonChartValues().textStyle,
				title: {
					text: 'Network download',
					textStyle: {
						color: getCssVar('color-text'),
						fontSize: 24,
					}
				},
				color: [getCssVar('color-senary')],
				tooltip: { 
					trigger: 'axis',
					backgroundColor: getCssVar('color-background-card'),
					borderWidth: 1,
					borderColor: getCssVar("color-border"),
					formatter: params => generateTooltipMultiValue(params, 'time', convert.toBytes, false)
				},
				grid: {
					left: 48,
					right: 8,
					top: 80,
					bottom: 48,
				},
				xAxis: {
					type: 'category',
					data: resourceLogsTimeStamps,
					axisLabel: {
						rotate: 45,
						formatter: value => convert.toFiDate(value, 'time'),
					},
					axisTick: {
						alignWithLabel: true
					},
				},
				yAxis: { 
					type: 'value',      
					name: 'Data (t)',  // Y-akselin nimi
					axisLabel: {        // Y-akselin arvojen muotoilu
						formatter: value => convert.toBytes(value)
					}
				},
				series: [
					{
						name: 'RAM used',    // Tooltipissa näkyvä nimi
						type: 'line',
						areaStyle: {},
						data: chart7YaxisValues,
						smooth: true,
					},
				],
			});
			initializeAndSetupChart(this, "chart7", "chartContainer7", chart7Options);

			// After charts are set setup the esc listener
			setupFullscreenEscExit(this)
		}
	}
};
</script>

<style scoped>

.server-resources {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.chartContainer {
	position: relative;
	padding: var(--spacing-sm);
	width: 50%;
	box-sizing: border-box;
	height: 300px;
	background-color: var(--color-background-card);
}
.chartContainer.fullscreen {
	padding: var(--spacing-md);
}
@media (max-width: 900px) {
	.chartContainer {
		width: 100%;
	}
}

.fullscreen-button {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1; /* Otherwise under chart */
    color: var(--color-text-light);
    background: linear-gradient(90deg, transparent, var(--color-background-card) 50%);
    border-radius: 0;
    padding: var(--spacing-sm);
	margin: 0;
}
.fullscreen .fullscreen-button {
    padding: var(--spacing-md);
}

.greeting-area {
	height: 60vh;
	display: flex;
	position: relative;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	/* background-color: red; */
}

.greeting-area .text-area {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 15vh;
}

.greeting-area .text-area h1 {
	margin: 0;
	/* Row gap? to large */
	line-height: 48px;
	font-size: 48px;
}
.greeting-area .text-area .header-sub-text {
	display: inline-block;
	color: var(--color-text-light);
	margin-top: var(--spacing-md);
}
.greeting-area .text-area button {
	margin-top: var(--spacing-md);
	margin-inline: 0;
}

/* Color blobs */
.greeting-area .color-blob {
    border-radius: 50%;
    position: absolute;
    animation: moveBlobs 5s infinite cubic-bezier(0.5, 0, 0.5, 1);
    filter: blur(50px);
	--x-offset: calc(-250px + 50%);
	--y-offset: calc(-200px + 60vh * 0.5)
}

.greeting-area .color-blob.one {
    background-color: var(--color-primary-active);
	opacity: 0.5;
    height: 300px;
    width: 300px;
    right: calc(var(--x-offset) - 0px);
    top: calc(var(--y-offset) - 50px);
    z-index: -101;
    animation-delay: 0s;
}
.dark-mode .greeting-area .color-blob.one {
	opacity: 1;
    background-color: var(--color-primary);
}
.greeting-area .color-blob.two {
    background-color: var(--color-secondary-active);
    height: 225px;
    width: 225px;
    right: calc(var(--x-offset) - 80px);
    top: calc(var(--y-offset) + 100px);
    z-index: -100;
    animation-delay: 0.75s;
}
.dark-mode .greeting-area .color-blob.two {
    background-color: var(--color-secondary);
}
.greeting-area .color-blob.three {
    background-color: var(--color-tertiary-active);
    height: 150px;
    width: 150px;
    right: calc(var(--x-offset) - 200px);
    top: calc(var(--y-offset) + 60px);
    z-index: -99;
    animation-delay: 1s;
}
.dark-mode .greeting-area .color-blob.three {
    background-color: var(--color-tertiary);
}

@keyframes moveBlobs {
    0% {
        transform: translate(0, 0);
    }
	50% {
        transform: translate(0px, 50px);
	}
    100% {
        transform: translate(0, 0);
    }
}

/* - - - - Other services - - - - */
.tile-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
}
.tile-container a {
	margin: var(--spacing-sm);
}
.tile-button {
	position: relative;
	display: flex;
	flex-direction: column;
	aspect-ratio: 1;
	width: 150px;
	border-radius: var(--border-radius-medium);
	margin: 0;
}
.tile-button img {
	position: absolute;
	top: var(--spacing-md);
	width: 80px;
	aspect-ratio: 1;
}
.tile-button span {
	position: absolute;
	bottom: var(--spacing-md);
}

/* - - - - Backup cards - - - - */
.backups {
    width: 100%;
    gap: 20px; /* Replace the margin of the default card with this to prevent extra spaces */
	display: flex;
	flex-direction: column;
}

.backup-card {
    width: 100%;
    box-sizing: border-box; /* Ensures padding does not affect the width */
	padding-bottom: 0; /* Get rid of the extra padding at the bottom since the lastbackup has the padding already*/
	margin: 0;
}

.backup-card .header {
	font-weight: 700;
	font-size: 18px;
	margin-bottom: var(--spacing-md);
	gap: var(--spacing-sm);
	align-items: center;
}

.backup-row {
	border-top: 2px solid var(--color-border);
	width: 100%;
	padding: var(--spacing-md) 0;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
	align-items: start;
	font-weight: 500;
}

.backup-row .name {
	color: var(--color-text);
	font-weight: 800;
	padding-left: var(--spacing-sm);
}

.backup-row .content {
    display: grid;
    grid-template-columns: 220px 1fr;
    column-gap: var(--spacing-lg);
	row-gap: var(--spacing-sm);
    width: 100%;
}

.backup-row .schedule {
	color: var(--color-text-light);
	font-weight: 400;
}
.backup-row .label-text {
	color: var(--color-text-light);
	/* padding-right: var(--spacing-md); */
	width: 100px;
	min-width: 100px;
	font-weight: 400;
	white-space: nowrap;
}
.backup-row .path-column {
	display: flex;
	flex-direction: row;
	align-items: start;
	overflow: hidden;
	mask-image: 
        linear-gradient(to right, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%);
    mask-size: 100%;
}
.backup-row .path {
	white-space: nowrap;
	cursor: pointer;
}
@media(max-width: 575px) {
	.backup-row .content {
		grid-template-columns: auto;
	}
}


.bad {
	color: var(--color-negative);
}
.warning {
	color: var(--color-warning);
}
.good {
	color: var(--color-positive);
}

/* @media (max-width: 500px) {
	.backup-card {
		width: 300px;
	}
	.backup-card .fromTo .arrow {
		transform: rotate(0);
		margin-inline: auto;
	}
	.backup-card .fromTo {
		grid-template-columns: auto;
	}
} */

/* - - - - Server drives - - - - */
.drive-card {
	width: 250px;
	margin: 0;
	animation: fadeIn 0.5s ease-out;
}
.drive-card .name {
	font-weight: 700;
	font-size: 18px;
	display: flex;
	flex-direction: row;
	gap: var(--spacing-sm);
	margin-bottom: var(--spacing-sm);
}
.drive-card .text {
	margin: 12px 0;
	display: grid;
	grid-template-columns: auto auto;
}
.drive-card .text .label {
	color: var(--color-text-light);
	margin-right: var(--spacing-md);
}
.drive-card .text .value {
	font-weight: 500;
	text-align: end;
}

.capacityIndicator {
	width: 100%;
	height: 32px;
	background-color: var(--color-background-card-section);
	/* border: 1px solid var(--color-border); */
	border-radius: var(--border-radius-small);
	position: relative;
}
.capacityIndicator .bar {
	height: 100%;
	border-radius: var(--border-radius-small);
}
.capacityIndicator .bar.positiveBackground {
	background-color: var(--color-positive);
}
.capacityIndicator .bar.negativeBackground {
	background-color: var(--color-negative);
}
.capacityIndicator .text {
	display: flex;
	position: absolute;
	justify-content: center;
	flex-direction: column;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	padding-left: 12px;
	font-weight: 500;
}
</style>
