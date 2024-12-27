<template>
    <transition name="fade">
        <div v-if="visible" :class="['notification', messageType]" @click="closeThis">
            <IconCross class="closeIcon" color="var(--color-text-white)" colorHover="var(--color-text-white-hover)"/>
            <h3> <!-- Header will be placed here based on messageType --> </h3>
            <p>{{ message }}</p>
            <!-- Timer bar at the bottom -->
            <div class="timer-bar" :style="{ width: `${timerWidth}%` }"></div>
        </div>
    </transition>
</template>

<script>
import IconCross from './icons/IconCross.vue';

export default {
    components: {
        IconCross,
    },
    emits: ['close'],
    props: {
        message: String,
        messageType: { type: String, default: "info" },
        duration: { type: Number, default: 5000 },
    },
    data() {
        return {
            visible: false,
            closeTimeout: null,
            remainingTime: this.duration,  // Tracks remaining time
            intervalId: null,             // To store the interval for the timer
            hovering: false,              // Tracks if notification is being hovered
        };
    },
    mounted() {
        this.visible = true; // Trigger the rendering of the notification
        this.remainingTime = this.duration;

        this.$nextTick(() => {
            // Ensure the DOM is ready before accessing this.$el
            if (this.$el) {
                this.startTimer(); // Start the timer initially

                // Add hover event listeners
                this.$el.addEventListener('mouseenter', this.stopTimer);
                this.$el.addEventListener('mouseleave', this.resetTimer);
            }
        });
    },
    beforeUnmount() {
        if (this.$el) {
            this.$el.removeEventListener('mouseenter', this.stopTimer);
            this.$el.removeEventListener('mouseleave', this.resetTimer);
        }

        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    },
    methods: {
        startTimer() {
            this.intervalId = setInterval(() => {
                this.remainingTime -= 100; // Reduce by 100ms per interval
                if (this.remainingTime <= 0) {
                    this.closeThis();       // Close when the time is up
                }
            }, 100); // 100ms interval
        },
        stopTimer() {
            if (this.intervalId) {
                clearInterval(this.intervalId); // Stop the timer
            }
        },
        resetTimer() {
            if (this.intervalId) {
                clearInterval(this.intervalId); // Stop the previous timer
            }
            this.startTimer(); // Start a new timer
        },
        closeThis() {
            this.stopTimer(); // Stop any running timers

            if (this.$el) {
                this.visible = false;
                this.$el.classList?.add("ignoreCursor"); // Use optional chaining
                setTimeout(() => this.$emit("close"), 150); // Matches fade-out duration
            }
        },
    },
    computed: {
        timerWidth() {
            return (this.remainingTime / this.duration) * 100;  // Calculate percentage of remaining time
        }
    }
};
</script>

<style>
/* Main thing */
.notification {
    position: fixed;
    width: 300px;
    top: calc(var(--height-top-bar) + var(--spacing-md));
    /* left: calc(50% - ((300px + 2 * 15px) / 2)); */
    right: var(--spacing-md);
    padding: var(--spacing-md);
    border-radius: var(--border-radius-small);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    color: var(--color-text-white);
    cursor: pointer;
    z-index: var(--z-notification);
    opacity: 1;
    transition: opacity 0.3s ease-out,
                background-color 0.1s ease-out;
}

/* Different content */
.notification h3 {
    color: var(--color-text-white);
    margin: 0;
    text-align: left;
}

.notification p {
    margin: 0;
    text-align: left;
}

.closeIcon {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
}

/* Notification messageType */
.notification.info {
    background-color: var(--color-primary);
} .notification.info:hover {
    background-color: var(--color-primary-hover);
} .notification.info h3::after {
    content: "Notification";
}

.notification.success {
    background-color: var(--color-positive);
} .notification.success:hover {
    background-color: var(--color-positive-hover);
} .notification.success h3::after {
    content: "Success";
}

.notification.error {
    background-color: var(--color-negative);
} .notification.error:hover {
    background-color: var(--color-negative-hover);
} .notification.error h3::after {
    content: "Error";
}

/* Transitions */
.fade-enter-active {
    transition: opacity 0.2s ease-out,
                transform 0.2s ease-out;
}
.fade-enter-from {
    opacity: 0;
    transform: translateX(50px);
}

.fade-leave-active {
    transition: opacity 0.15s ease-in,
                transform 0.15s ease-in;
}
.fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

.timer-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: var(--border-radius-small);
    border-bottom-left-radius: var(--border-radius-small);
    background-color: hsla(0, 0%, 100%, 0.333);
    transition: width 0.1s linear; /* Smooth animation */
}

/* Style that gets applied when clicked to avoid multiple clicks on single */
.ignoreCursor {
    pointer-events: none;
}

</style>
