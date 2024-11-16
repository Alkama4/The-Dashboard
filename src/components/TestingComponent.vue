<template>
    <table>
        <tr>
            <td @click="toggleExpand">
                <div :class="{ expanded: isExpanded }" class="content-wrapper">
                    {{ content }}
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    data() {
        return {
            isExpanded: false, // Tracks whether the content is expanded or not
            content: "This is some very long text that demonstrates how to constrain and expand height smoothly. Click this cell to toggle its full view!"
        };
    },
    methods: {
        toggleExpand() {
            this.isExpanded = !this.isExpanded; // Toggle the `expanded` state
        }
    }
};
</script>

<style scoped>
td {
    max-width: 300px; /* Fixed width for the td */
    border: 1px solid #ddd; /* Optional: border for table cell */
    padding: 10px; /* Add padding for better visuals */
    cursor: pointer; /* Pointer cursor for interactivity */
}

.content-wrapper {
    max-height: 50px; /* Initial constrained height */
    overflow: hidden; /* Hide overflowing content */
    transition: max-height 0.3s ease; /* Smooth transition for height */
    white-space: normal; /* Allow wrapping */
    word-wrap: break-word; /* Break long words */
    word-break: break-word; /* Modern browser compatibility */
}

.content-wrapper.expanded {
    max-height: 200px; /* Allow full expansion of the div */
}
</style>
