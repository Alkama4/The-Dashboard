<template>
    <GenericModal 
        ref="modal" 
        :header="header"
        @closed="resolve(false)"
    >
        <!-- The submit sends data that it grabbed by the method
        resolve and can be sent with the promises resolve -->
        <FormTransaction 
            :initialFormValues="initialTransaction"
            @submit="resolve"
        />
    </GenericModal>
</template>

<script>
import FormTransaction from "./FormTransaction.vue";
import GenericModal from "./ModalGeneric.vue";

export default {
    name: "ConfirmationModal",
    components: { 
        GenericModal,
        FormTransaction,
    },
    data() {
        return { 
            resolvePromise: null,
            initialTransaction: null,
        };
    },
    methods: {
        open() {
            this.$refs.modal.open();
        },
        close() {
            this.$refs.modal.close();
        },
        resolve(value) {
            if (this.resolvePromise) {
                this.resolvePromise(value);
                this.resolvePromise = null;
            }
        },
        
        // This method should be called outside the component to trigger the component.
        // Here is an example call. The ref is set by you on the component:
        // notify(await this.$refs.testConfirmationModalRef.prompt());
        prompt(givenTransaction) {
            this.initialTransaction = givenTransaction;
            this.open();
            return new Promise(resolve => {
                this.resolvePromise = resolve;
            });
        }
    }
};
</script>

<style scoped>
    /* Styling not needed? */
</style>
