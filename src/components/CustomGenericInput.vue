<template>
    <div class="custom-input-text custom-input">
        <input 
            :type="type" 
            :value="modelValue" 
            :class="{'invalid-input': invalidState}"
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
        }
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
