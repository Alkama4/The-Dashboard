<template>
    <div class="custom-input-text custom-input">
        <input 
            v-if="type !== 'textarea'" 
            :type="type" 
            :value="modelValue" 
            :class="{'invalid-input': invalidState}"
            :placeholder="placeholder"
            @input="onInput($event)"
        >
        <textarea 
            v-else 
            :value="modelValue" 
            :class="{'invalid-input': invalidState}"
            :placeholder="placeholder"
            @input="onInput($event)"
        ></textarea>
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
        mandatory: {
            type: Boolean,
            default: false
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
            if (event.target.validity.badInput) {
                this.markInvalid();
            } else {
                this.invalidState = false;
            }
            this.$emit('update:modelValue', event.target.value);
        }
    }
};
</script>
