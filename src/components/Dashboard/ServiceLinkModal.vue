<template>
    <ModalGeneric 
        ref="modal" 
        :header="`${values.id ? 'Edit' : 'Add' } external service link`"
        @closed="resolve(false)"    
    >
        <form @submit.prevent="resolve">
            <div class="details">
                <div>
                    <label>Service Name</label>
                    <input type="text" v-model="values.name" placeholder="Example service name"/>
                </div>
                <div>
                    <label>Service URL</label>
                    <input type="url" v-model="values.link" placeholder="http://example.com/service"/>
                </div>
                <div>
                    <label>Service Description</label>
                    <CustomGenericInput type="textarea" v-model="values.description" placeholder="Brief overview of the service"/>
                </div>
            </div>
            <div class="image">
                <label>Service icon</label>
                <CustomFileInput 
                    v-model="values.image"
                    accept=".png,.jpeg,.jpg,.svg"
                    :initialValues="initialImageValues"
                    @clear-initial="removeLinkIcon"
                />
            </div>
            <button class="submit button-primary" type="submit">{{ values.id ? 'Save changes' : 'Add external link' }}</button>
        </form>
    </ModalGeneric>
</template>

<script>
import ModalGeneric from '@/components/common/ModalGeneric.vue';
import CustomFileInput from '@/components/common/CustomFileInput.vue';
import CustomGenericInput from '../common/CustomGenericInput.vue';
import fastApi from '@/utils/fastApi';
import { notify } from '@/utils/notification';
import { apiUrl } from '@/utils/config';

export default {
    name: 'ServiceLinkModal',
    components: { 
        ModalGeneric, 
        CustomFileInput,
        CustomGenericInput
    },
    data() {
        return {
            values: {
                name: '',
                link: '',
                description: '',
                image: null,
            },
            apiUrl: apiUrl,
            initialImageValues: null,
            resolvePromise: null,
            removeImage: false,
        };
    },
    methods: {
        init() { 
            this.$refs.modal.init();
        },
        open() { 
            this.$refs.modal.open();
        },
        close() { 
            this.$refs.modal.close();
        },

        // Initially setup prompt which gives a promise to parent
        prompt(previousEntryData) {
            this.open();

            // If editing
            if (previousEntryData != undefined) {
                this.values = { ...previousEntryData };
                this.initialImageValues = {
                    url: previousEntryData.image_path ? `${this.apiUrl}/media/image${previousEntryData.image_path}` : null,
                    name: 'Current image'
                }
                
            // If new entry
            } else {
                this.values = {
                    name: '',
                    link: '',
                    description: '',
                    image: null,
                }
                this.initialImageValues = null;
            }

            return new Promise(resolve => {
                this.resolvePromise = resolve;
            });
        },
        
        // When user submits run resolve which does what is needed and closes the case
        async resolve(submit = true) {
            if (!this.resolvePromise) return;

            // Do not continue further since function called with false
            // (User exited the modal)
            if (!submit) {
                this.resolvePromise(false);
                this.resolvePromise = null;
                this.close();
                return;
            }

            try {
                // Set image not to be deleted so that the new image is saved
                // Might have been set to true if image was cleared at any point
                if (this.values.image) {
                    this.removeImage = false;
                }

                // If we have an id modify an existing, else we are creating one
                let response;
                if (this.values.id) {
                    response = await fastApi.account.update_external_service_link(
                        this.values.id,
                        this.values.name,
                        this.values.link,
                        this.values.description,
                        this.values.image,
                        this.removeImage
                    );
                } else {
                    response = await fastApi.account.add_external_service_link(
                        this.values.name,
                        this.values.link,
                        this.values.description,
                        this.values.image
                    );
                }

                if (response) {
                    notify(response.message);
                    this.resolvePromise(true);
                } else {
                    this.resolvePromise(false);
                }
            } catch (err) {
                console.error(err);
                this.resolvePromise(false);
            } finally {
                this.resolvePromise = null;
                this.close();
            }
        },

        removeLinkIcon() {
            // Set the image to be deleted if a new image isn't given
            this.removeImage = true;
            // Clear the previous value
            this.initialImageValues = null;
        }
    },
};
</script>

<style scoped>
form {
    display: grid;
    gap: var(--spacing-sm);
    column-gap: var(--spacing-md);
    grid-template-columns: 1fr 350px;
    grid-template-areas: 
        "details image"
        "submit submit";
    padding: var(--spacing-xs);
}
@media (max-width: 900px) {
    form {
        display: flex;
        flex-direction: column;
    }
}
.details {
    grid-area: details;

    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}
.image {
    grid-area: image;
    display: flex;
    flex-direction: column;
}
.submit {
    grid-area: submit;
    margin-top: var(--spacing-md);
}
label {
    cursor: text;
}

</style>