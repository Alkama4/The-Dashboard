<template>
    <div>
        <div class="collection-form">
            <div>
                <label>Name</label>
                <CustomGenericInput 
                    v-model="currentFormValues.name" 
                    type="text"
                    placeholder="The name of your collection"
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
    </div>
</template>

<script>
import CustomGenericInput from '@/components/CustomGenericInput.vue';

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
    },
    created() {
        if (this.initialFormValues) {
            this.currentFormValues.name = this.initialFormValues?.name;
            this.currentFormValues.description = this.initialFormValues?.description;
        }
    },
}
</script>

<style scoped>
.collection-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}
.collection-form .submit {
    width: 100%;
}
</style>