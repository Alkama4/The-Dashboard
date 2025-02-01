<template>
    <div class="content-width-small">
        <h1>{{ this.title }}</h1>
        <p>Here you can modify and view the progress of a movie or a tv series.</p>

        <div></div>
    </div>
</template>

  
<script>
// import api from '@/utils/dataQuery';

export default {
    data() {
        return {
            title: this.$route.params.title
        };
    },
    mounted() {
        // Query the details from api for the title here:
        console.log(this.title);
    }
};
</script>

  
<style scoped>
/* Styling */
</style>
  