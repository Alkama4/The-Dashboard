<template>
    <ModalGeneric 
        ref="modalGenericMG" 
        :header="header" 
        @closed="resolve(false)"
    >
        <!-- The submit sends data that it grabbed by the method
        resolve and can be sent with the promises resolve -->
        <FormCollection
            :initialFormValues="initialCollection"
            @submit="resolve"
            :submitText="submitText"
        />
    </ModalGeneric>
</template>

<script>
import ModalGeneric from '@/components/common/ModalGeneric.vue';
import FormCollection from '@/components/WatchList/FormCollection.vue';

export default {
    name: "ModalCollection",
    components: {
        ModalGeneric,
        FormCollection,
    },
    data() {
        return {
            resolvePromise: null,
            initialCollection: null
        }
    },
    props: {
        header: {
            type: String,
            default: 'Edit collection'
        },
        submitText: {
            type: String,
            default: 'Submit'
        }
    },
    methods: {
        init() {
            this.$refs.modalGenericMG.init();
        },
        open() {
            this.$refs.modalGenericMG.open();
        },
        close() {
            this.$refs.modalGenericMG.close();
        },
        resolve(value) {
            if (this.resolvePromise) {
                this.resolvePromise(value);
                this.resolvePromise = null;
            }
        },

        prompt(initialName, initialDescription, initialId ) {
            this.initialCollection = {
                name: initialName || null,
                description: initialDescription || null,
                collection_id: initialId || null
            };
            this.open();
            return new Promise(resolve => {
                this.resolvePromise = resolve;
            });
        }
    }
}
</script>
