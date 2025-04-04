<template>
    <div class="custom-input-text custom-input">
        <input 
            :type="type" 
            :value="modelValue" 
            :class="{'invalid-input': invalidState}"
            :placeholder="placeholder"
            @input="onInput($event)"
        >
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            invalidState: false,
        };
    },
    methods: {
        markInvalid() {
            this.invalidState = true;
        },
        onInput(event) {
            this.$emit('update:modelValue', event.target.value);
            this.invalidState = false;
        }
    }
};
</script>
