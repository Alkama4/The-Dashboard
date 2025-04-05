<template>
    <div class="custom-password-input custom-input">
        <input 
            :type="showPassword ? 'text' : 'password'" 
            :value="modelValue" 
            :class="{'invalid-input': invalidState}"
            :placeholder="placeholder"
            @input="onInput($event)"
        >
        <component 
            :is="showPassword ? 'IconShow' : 'IconHide'"
            class="icon-button"
            tabindex="0"
            @click="showPassword = !showPassword"
        />
    </div>
</template>

<script>
import IconHide from './icons/IconHide.vue';
import IconShow from './icons/IconShow.vue';

export default {
    components: { IconShow, IconHide },
    props: {
        modelValue: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            showPassword: false,
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

<style scoped>
.custom-password-input .icon-button {
    position: absolute;
    top: 7.5px;
    right: 12px;
    /* Keep over the input when focused */
    z-index: 101;
}
</style>