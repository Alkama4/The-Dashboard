<template>
	<div>
		<div class="greeting-area">
			<div class="background"></div>

			<div class="text-area">
				<h1>{{ greeting[0] }}</h1>
				<span class="header-sub-text">{{ greeting[1] }}</span><br>
			</div>
			<!-- <div class="action-area">
				<button class="color-primary">Start logging</button>
			</div> -->
		</div>

		<!-- Make the layout better in mobile -->
		<div class="flex-column">
			<h2>Other services</h2>
			<div class="tile-container">
				<a href="https://pibox.lan:9443" class="no-decoration">
					<button class="tile-button">
						<img src="../assets/thumbnails/portainer.svg" alt="">
						<span>Portainer</span>
					</button>
				</a>
				<a href="http://pibox.lan:81/admin/" class="no-decoration">
					<button class="tile-button">
						<img src="../assets/thumbnails/pihole.png" alt="">
						<span>Pihole</span>
					</button>
				</a>
			</div>
		</div>

		<div class="new-thing"></div>
 
		<!-- Might want to implement the following logic for security reasons: If login username == aleksi -->
		<!-- HEader mis alignment -->
		<!-- Card to wide in mobile. Add a mobile layout. -->
		<div class="flex-column">
			<h2>Backups (Placeholder data)</h2>
			<div class="flex-row">
				<div v-for="(backup, index) in backups" :key="index" class="backup-card card">
					<div class="name">
						<IconBackup size="25px" color-hover="var(--color-text)"/>
						<div>{{ backup.name }}</div>
						<!-- <div class="status-indicator" :class="backup.state"></div> -->
						<!-- <div class="schedule">{{ backup.backupSchelude }}</div> -->
					</div>
					<div class="fromTo">
						<div>
							<div class="device">{{ backup.source }}</div>
							<div class="path">{{ backup.sourcePath }}</div>
						</div>
						<IconChevronDown size="32px" class="arrow"/>
						<div>
							<div class="device">{{ backup.destination }}</div>
							<div class="path">{{ backup.destinationPath }}</div>
						</div>
					</div>
					<div class="text">
						<div class="label">Since last run</div>
						<div class="value" :class="backup.state">{{ backup.lastRunTimeSince }}</div>
						<div class="label">Next run in</div>
						<div class="value">{{ backup.nextRunTimeUntil }}</div>
						<div class="label">Schedule</div>
						<div class="value">{{ backup.backupSchelude }}</div>
					</div>
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
import api from '@/utils/dataQuery';
import IconHDD from '@/components/icons/IconHDD.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconBackup from '@/components/icons/IconBackup.vue';

	export default {
		name: 'HomePage',
		components: {
			IconHDD,
			IconChevronDown,
			IconBackup,
		},
		data() {
			return {
				greeting: this.getGreeting(),
				backups: [
					{
						name: "Oneplus camera",
						source: "Oneplus",
						sourcePath: "/DCIM/camera",
						destination: "Pinas",
						destinationPath: "/media/muistot/op11/",
						lastRunTimeSince: "11h 23min",
						nextRunTimeUntil: "4h 28min",
						backupSchelude: "Every day, 23.00",
						state: "warning",
					},
					{
						name: "Black-Box Backup",
						source: "Pinas",
						sourcePath: "/mnt/drive/pinas",
						destination: "Black-Box",
						destinationPath: "D:/pinas-backup.zip",
						lastRunTimeSince: "49 min",
						nextRunTimeUntil: "5h 28min",
						backupSchelude: "Every day, 00.00",
						state: "good",
					},
					{
						name: "Oneplus 11 Backup",
						source: "Pinas",
						sourcePath: "/mnt/drive/pinas",
						destination: "Oneplus 11",
						destinationPath: "/.pinas-backup/",
						lastRunTimeSince: "35h 23 min",
						nextRunTimeUntil: "5h 28min",
						backupSchelude: "Every day, 00.00",
						state: "bad",
					},
					{
						name: "Järvenpää backup",
						source: "Pinas",
						sourcePath: "/mnt/drive/pinas",
						destination: "Järvenpää",
						destinationPath: "/Pinas backup",
						lastRunTimeSince: "2kk 14pv",
						nextRunTimeUntil: "-",
						backupSchelude: "No schedule",
						state: "good",
					}
				],
				serverStats: {
					storage: []
				}
			};
		},
		methods: {
			getGreeting() {
				const hour = new Date().getHours();
				if (hour < 5) {
					return ["Good night!", "Up a little early, aren't we? The world is still asleep!"];
				} else if (hour < 12) {
					return ["Good morning!", "It's a beautiful morning! Time to rise and shine!"];
				} else if (hour < 18) {
					return ["Good afternoon!", "Keep on grinding, champ! You're crushing it!"];
				} else {
					return ["Good evening!", "It's chill o'clock! Time to unwind and recharge for tomorrow!"];
				}
			},
			formatBytes(bytes, decimal = 2) {
				const sizes = ['t', 'Kt', 'Mt', 'Gt', 'Tt'];
				if (bytes === 0) return '0 Bytes';
				const i = Math.floor(Math.log10(bytes) / 3);
				return (bytes / Math.pow(1000, i)).toFixed(decimal) + ' ' + sizes[i];
			}
		},
		async mounted() {
			const response = await api.getServerDrivesInfo();
			if (response) {
				for (const drive of Object.entries(response)) {
					this.serverStats.storage.push(drive[1]);
				}
			}
			// console.log(this.serverStats.storage);
		}
	};
</script>

<style scoped>
	.greeting-area {
		height: 60vh;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		/* background-color: red; */
	}
	.greeting-area .background {
		position: absolute;
		background: linear-gradient( var(--color-primary), var(--color-background));
		top: 60px;
		left: 0;
		right: 0;
		height: 60vh;
		z-index: -10;
	}
	.greeting-area h1 {
		margin: 0;
		/* Row gap? to large */
		line-height: 48px;
		font-size: 48px;
	}
	.greeting-area .header-sub-text {
		display: inline-block;
		color: var(--color-text-light);
		margin-top: var(--spacing-md);
	}
	.greeting-area .text-area {
		display: flex;
		flex-direction: column;
	}

	/* - - - - Other services - - - - */
	.tile-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.tile-button {
		position: relative;
		display: flex;
		flex-direction: column;
		aspect-ratio: 1;
		width: 150px;
		border-radius: var(--border-radius-medium);
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
	.backup-card {
		margin: 0;
		width: 400px;
	}
	.backup-card .name {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: 18px;
		font-weight: 700;
	}
	.backup-card .fromTo {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		margin: 16px 0;
		gap: var(--spacing-xs);
	}
	.backup-card .fromTo .arrow {
		transform: rotate(-90deg);
	}
	.backup-card .fromTo > div {
		height: 80px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		background-color: var(--color-background-card-section);
		padding: var(--spacing-sm);
		border-radius: var(--border-radius-small);
	}
	.backup-card .fromTo .path {
		color: var(--color-text-lighter);
		font-weight: 300;
		font-size: 14px;
	}
	.backup-card .fromTo .device {
		font-weight: 600;
	}
	.backup-card .text {
		display: grid;
		grid-template-columns: auto auto;
	}
	.backup-card .text .label {
		color: var(--color-text-light);
		padding-right: var(--spacing-md)
	}
	.backup-card .text .value {
		font-weight: 500;
	}

	/* .value {
		height: 1rem;
		width: 1rem;
		border-radius: 50%;
	} */
	.value.bad {
		color: var(--color-negative);
	}
	.value.warning {
		color: var(--color-warning);
	}
	.value.good {
		color: var(--color-positive);
	}

	@media (max-width: 500px) {
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
	}

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
		background-color: var(--color-background-input);
		border: 1px solid var(--color-border);
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
