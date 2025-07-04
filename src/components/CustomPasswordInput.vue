<template>
    <div class="custom-password-input custom-input">
        <input 
            :type="showPassword ? 'text' : 'password'" 
            :value="modelValue" 
            :class="{'invalid-input': invalidState}"
            :placeholder="placeholder"
            @input="onInput($event)"
        >
        <div 
            class="icon-button"
            tabindex="0"
            ref="toggleButton"
            @click="toggleShowState"
            @keydown.enter="toggleShowState"
            @keydown.space="toggleShowState"
        >
            <IconShow v-if="showPassword"/>
            <IconHide v-else/>
        </div>
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
        focus() {
            this.$el.querySelector('input').focus();
        },
        markInvalid() {
            this.invalidState = true;
        },
        onInput(event) {
            this.$emit('update:modelValue', event.target.value);
            this.invalidState = false;
        },
        toggleShowState() {
            this.showPassword = !this.showPassword;
            this.$refs.toggleButton.focus();
        }
    }
};
</script>

<style scoped>
.custom-password-input .icon-button {
    position: absolute;
    top: 7.5px;
    right: calc(7.5px + 0px);
    justify-content: center;
    align-items: center;
    display: flex;
    margin-inline: 0;
    /* Keep over the input when focused */
    z-index: 101;
}
</style>