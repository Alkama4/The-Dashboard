<template>
        <div class="form-collection" @keydown="handleFormWideKeyDown">
            <div>
                <label>Name</label>
                <CustomGenericInput 
                    v-model="currentFormValues.name" 
                    type="text"
                    placeholder="The name of your collection"
                    ref="focusOnAutomatically"
                />
            </div>
            <div>
                <label>Description</label>
                <CustomGenericInput 
                    v-model="currentFormValues.description"
                    type="textarea"
                    placeholder="Brief description (optional)"
                />
            </div>
            <button class="button-primary submit" color="primary" @click="handleSubmit">{{ submitText }}</button>
        </div>
</template>

<script>
import CustomGenericInput from '@/components/common/CustomGenericInput.vue';

export default {
    name: 'FormCollection',
    data() {
        return {
            currentFormValues: {},
        }
    },
    components: {
        CustomGenericInput,
    },
    props: {
        initialFormValues: {
            type: Object,
            default: null
        },
        submitText: {
            type: String,
            default: "Submit"
        },
    },
    emits: [
        'submit'
    ],
    methods: {
        async handleSubmit() {
            this.$emit('submit', {
                ...this.currentFormValues
            });
        },
        handleFormWideKeyDown(e) {
            if (e.key === 'Enter') {
                const isTextarea = e.target.tagName === 'TEXTAREA';
                if ((isTextarea && e.ctrlKey) || (!isTextarea && !e.ctrlKey)) {
                    e.preventDefault();
                    this.handleSubmit();
                }
            }
        }
    },
    created() {
        if (this.initialFormValues) {
            this.currentFormValues.name = this.initialFormValues?.name;
            this.currentFormValues.description = this.initialFormValues?.description;
        }
    },
    mounted() {
        this.$refs.focusOnAutomatically?.focus?.();
    }
}
</script>

<style scoped>
.form-collection {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}
.form-collection .submit {
    width: 100%;
}
</style>