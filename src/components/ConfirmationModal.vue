<template>
    <GenericModal 
        ref="modal" 
        :header="header"
        @closed="resolve(false)"
    >
        <p>{{ text }}</p>
    
        <div class="buttons">
            <button 
                class="button-primary"
                @click="resolve(true)"
            >
                {{ affirmativeOption }}
            </button>
            
            <button @click="resolve(false)">
                {{ negativeOption }}
            </button>
        </div>
    </GenericModal>
</template>

<script>
import GenericModal from "./GenericModal.vue";

export default {
    name: "ConfirmationModal",
    components: { GenericModal },
    props: {
        affirmativeOption: { type: String, default: "Yes" },
        negativeOption: { type: String, default: "Cancel" },
        header: { type: String, default: "Confirm" },
        text: { type: String, default: "Are you sure?" }
    },
    data() {
        return { resolvePromise: null };
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
                this.close();
            }
        },
        
        // This method should be called outside the component to trigger the component.
        // Here is an example call. The ref is set by you on the component:
        // notify(await this.$refs.testConfirmationModalRef.prompt());
        prompt() {
            this.open();
            return new Promise(resolve => {
                this.resolvePromise = resolve;
            });
        }
    }
};
</script>


<style scoped>
p {
    margin-top: 0;
    max-width: 40ch;
}

.buttons {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
}
.buttons button {
    margin: 0;
    flex: 1;
    white-space: nowrap;
}
</style>
