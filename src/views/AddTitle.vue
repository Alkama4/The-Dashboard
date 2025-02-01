<template>
    <div class="content-width-small">
        <h1>Add title</h1>
        <p>Add the imdb code or whatever we are going to use to add titles to the db with the form below.</p>

        <form @submit.prevent="handleTitleAdd" class="titleForm">
            <div>
                <label>A value that we want</label>
                <input type="text" v-model="titleName">
            </div>
            <button class="color-primary">Add title</button>
        </form>
    </div>
</template>

  
<script>
// import api from '@/utils/dataQuery';

export default {
    methods: {
        handleTitleAdd() {
            console.log(this.titleName);
        }
    }
};
</script>

  
<style scoped>
    .titleForm {
        display: grid;
        grid-template-columns: 1fr auto;
        justify-content: center;
        align-items: end;
    }
    /* Align them with margin manually since why bother doing anything else */
    .titleForm input {
        margin-top: 0;
        margin-bottom: 1.5px;
    }
    .titleForm button {
        margin-bottom: 0;
    }
</style>
  