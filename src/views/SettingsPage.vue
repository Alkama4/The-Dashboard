<template>
    <div>
        <h1>Settings page</h1>
        <p> Settings go here once I figure what settings I would even need in addition to the night mode.
            Maybe a login, but that would make the most sence as a seperate page. Perhaps stuff related to
            the login like import and export data, change pass, database credentials, delete table and so on.
        </p>

        <!-- <h2>Connection</h2>
        <label for="chosenTableSet">Table set</label>
        <select name="chosenTableSet" id="chosenTableSet">
            <option value="example">Example</option>
            <option value="aleksi">Aleksi</option>
        </select> -->

        <h2>Notification test buttons</h2>
        <p> Check out these cool buttons. Wonder what they will do? (Hint: no one's stopping you from trying out ;D ).</p>
        <span style="display: flex; flex-direction: column;">
            <button @click="notificationInfo">Info</button>
            <button @click="notificationSuccess">Success</button>
            <button @click="notificationError">Error</button>
        </span>
    </div>
</template>
  
<script>
export default {
    components: { 
    },
    methods: {
        notificationInfo() {
            this.$root.notify("This is a generic info notification that I can place tips or tricks into.", "info");
        },
        notificationSuccess() {
            this.$root.notify("The action has been completed successfully!", "success");
        },
        notificationError() {
            this.$root.notify("An error occured... I guess?", "error");
        }
    }
};
</script>
  
<style scoped>
    /* Add your styles here */
</style>
  