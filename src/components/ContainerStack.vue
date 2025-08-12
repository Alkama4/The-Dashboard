<template>
    <div class="stack card">
        <div class="stack-title">{{ stackName === 'unknown' ? 'Not in a stack' : stackName }}</div>
        <div class="container-list">
            <div v-for="container in containers" :key="container.id" class="container-card">
                <div class="container-info">
                    <div class="header-row">
                        <div>
                            <div :class="['status-badge', container.status]">
                                {{ container.status }} - 
                                {{ container.status === 'running' ? formatTime(container.uptime) : 'code ' + container.exit_code }}
                            </div>
                        </div>
                        <div class="container-name">{{ container.name }}</div>
                    </div>
                    <div class="container-image">({{ container.image }})</div>
                </div>
                <div class="container-actions">
                    <a 
                        :href="`${portainerUrl}/#!/2/docker/containers/${container.id}`" 
                        class="link-button no-decoration"
                        target="_blank"
                    >
                        <IconDocker size="16px"/> Open
                    </a>
                    <a 
                        :href="`${portainerUrl}/#!/2/docker/containers/${container.id}/logs`" 
                        class="link-button no-decoration"
                        target="_blank"
                    >
                        <IconDetails size="16px"/> Logs
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconDetails from './icons/IconDetails.vue';
import { convert } from '@/utils/utils';
import IconDocker from './icons/IconDocker.vue';

export default {
    name: 'ContainerStack',
    props: {
        stackName: String,
        containers: Array,
        portainerUrl: String
    },
    components: {
        IconDetails,
        IconDocker,
    },
    methods: {
        formatTime(seconds) {
            return convert.toTime(seconds, 2)
        }
    }
}
</script>

<style scoped>
.stack-title {
    font-weight: 700;
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-md);
}
.container-list {
    gap: var(--spacing-sm);
    display: flex;
    flex-direction: column;
}
.container-card {
    border-top: 2px solid var(--color-border);
    padding-top: var(--spacing-sm);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: var(--spacing-sm);
}
.status-badge {
    border-radius: 100px;
    padding: 0 var(--spacing-sm);
    font-size: var(--font-size-xs);
    color: var(--color-text-white);
    font-weight: 600;
    border: 1px solid var(--color-border);
    white-space: nowrap;
}
.status-badge.running {
    background-color: var(--color-positive);
}
.status-badge.exited {
    background-color: var(--color-negative);
}
.container-info {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: var(--spacing-sm);
}
.header-row {
    display: flex;
    gap: var(--spacing-sm);
    align-items: center;
}
.container-image {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
}
.container-name {
    font-weight: 600;
}
.container-actions {
    display: flex;
    gap: var(--spacing-sm);
}
.link-button {
    flex: 1;
    font-size: var(--font-size-sm);
    padding-inline: var(--spacing-md);
}

@media(max-width: 900px) {
    .container-card {
        flex-direction: column;
    }
}
</style>
