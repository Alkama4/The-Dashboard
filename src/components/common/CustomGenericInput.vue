<template>
    <div class="custom-input-text custom-input">
        <input 
            v-if="type !== 'textarea'" 
            :type="type" 
            :value="modelValue" 
            :class="{
                'invalid-input': invalidState,
                'valid-input': validState
            }"
            :placeholder="placeholder"
            @input="onInput($event, 'input')"
        >
        <textarea 
            v-else 
            :value="modelValue" 
            :class="{
                'invalid-input': invalidState,
                'valid-input': validState
            }"
            :placeholder="placeholder"
            @input="onInput($event, 'textarea')"
            ref="textareaRef"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: 'CustomGenericInput',
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
            validState: false,
        };
    },
    methods: {
        focus() {
            this.$el.querySelector('input, textarea')?.focus();
        },
        markInvalid() {
            this.invalidState = true;
        },
        markValid() {
            this.validState = true;
        },
        onInput(event, type) {
            if (event.target.validity.badInput) {
                this.markInvalid();
            } else {
                this.invalidState = false;
            }
            if (type == "textarea") {
                this.resizeTextarea();
            }
            this.validState = false;
            this.$emit('update:modelValue', event.target.value);
        },
        resizeTextarea() {
            const textarea = this.$refs.textareaRef;
            if (textarea) {
                // Reset height to auto before measuring scrollHeight
                textarea.style.height = 'auto';
                // Set height to scrollHeight to fit content
                textarea.style.height = `${textarea.scrollHeight + 8}px`;
            }
        }
    },
    mounted() {
        // Call resize on mount to ensure the height is correct
        this.resizeTextarea();
    }
};
</script>
