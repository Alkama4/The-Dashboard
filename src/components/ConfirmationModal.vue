<template>
    <GenericModal ref="modal" :header="header">
        <p>{{ text }}</p>
    
        <div class="buttons">
            <button 
                class="button-primary"
                @click="confirm()"
            >
                {{ affirmativeOption }}
            </button>
            
            <button
                @click="close"
            >
                {{ negativeOption }}
            </button>
        </div>
    </GenericModal>

</template>


<script>
import GenericModal from './GenericModal.vue';

export default {
    name: 'ConfirmationModal',
    components: {
        GenericModal,
    },
    props: {
        affirmativeOption: {
            type: String,
            default: "Yes"
        },
        negativeOption: {
            type: String,
            default: "Cancel"
        },
        header: {
            type: String,
            default: "Confirm"
        },
        text: {
            type: String,
            default: "Are you sure?"
        }
    },
    data() {
        return {
            isVisible: false,
            isDisplayed: false
        };
    },
    methods: {
        open() {
            this.$refs.modal.open();
        },
        close() {
            this.$refs.modal.close();
        },
        confirm() {
            console.debug("User confirmed. Implement what to do here.");
            this.$refs.modal.close();
        }
    }
};
</script>


<style scoped>

p {
    margin-top: 0;
}

.buttons {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
}
.buttons button {
    margin: 0;
    flex: 1;
}

</style>