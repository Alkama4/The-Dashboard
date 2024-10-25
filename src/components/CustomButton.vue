<template>
    <button>{{ text }}</button>
</template>

<script>
export default {
    name: 'CustomButton', // Fixed typo in component name
    props: {
        text: {
            type: String,
            required: true // Added required validation for prop
        }
    }
}
</script>

<style scoped>
button {
    --light: #444;
    --main: #333;
    --dark: #222;

    margin: 10px;
    padding: 10px;
    font-weight: 700;
    color: white;
    background-color: var(--main);
    border-width: 0;
    border-radius: 5px;
    transition: 0.2s;
    cursor: pointer;
}
button:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 6px;
    background-color: var(--light);
}
button:active {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 6px;
    background-color: var(--dark);
}
</style>
