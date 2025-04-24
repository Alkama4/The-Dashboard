<template>
    <div>
        <ModalGeneric ref="genericModal" header="Edit collections">
            <div class="modal-title-collections">
                <div v-for="(collection, index) in collectionsForTitle" :key="index">
    
                    <div v-if="index != 0" class="seperator"></div>
    
                    <div class="collection">
                        <div class="details">
                            <div class="icon-align">
                                <h3>{{ collection.name }}</h3>
                                <IconEdit size="20px" class="icon-button" left="4px" @click="editCollection(collection)"/>
                            </div>
                            <span class="text-light">{{ collection.description }}</span>
                        </div>
                        <div>
                            <button 
                                v-if="collection.title_in_collection === 0"
                                @click="addToCollection(collection)"
                            >
                                Add
                            </button>
                            <button 
                                v-else
                                @click="removeFromCollection(collection)"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalGeneric>

        <ModalCollection ref="modalCollection" header="Edit colleciton" submitText="Save"/>
    </div>
</template>

<script>
import { notify } from '@/utils/notification';
import ModalGeneric from './ModalGeneric.vue';
import fastApi from '@/utils/fastApi';
import ModalCollection from './ModalCollection.vue';
import IconEdit from './icons/IconEdit.vue';

export default {
    name: 'ModalTitleCollections',
    components: {
        ModalGeneric,
        ModalCollection,
        IconEdit,
    },
    data() {
        return {
            collectionsForTitle: [],
            title_id: null,
        }
    },
    emits: ['collection-updated', 'title-collection-updated'],
    methods: {
        init() {
            this.$refs.genericModal.init();
        },
        open() {
            this.$refs.genericModal.open();
        },
        close() {
            this.$refs.genericModal.close();
        },
        async prompt(title_id) {
            this.init();
            this.title_id = title_id;
            this.collectionsForTitle = await fastApi.watch_list.titles.collections(title_id);
            this.open();
        },
        async addToCollection(collection) {
            const response = await fastApi.watch_list.collections.add_title(collection.collection_id, this.title_id);
            if (response) {
                notify(response.message, 'success');        // Notify user
                collection.title_in_collection = 1;         // Update in modal
                this.$emit('title-collection-updated', {    // Emit change to parent
                    collection: collection,
                    title_id: this.title_id,
                    titleInCollection: true
                });
            }
        },
        async removeFromCollection(collection) {
            const response = await fastApi.watch_list.collections.remove_title(collection.collection_id, this.title_id);
            if (response) {
                notify(response.message, 'success');
                collection.title_in_collection = 0;
                this.$emit('title-collection-updated', {
                    collection: collection,
                    title_id: this.title_id,
                    titleInCollection: false
                });
            }
        },
        async editCollection(initialCollection) {
            // Prompt the user with the form to edit collection
            const editedCollection = await this.$refs.modalCollection.prompt(
                initialCollection.name, 
                initialCollection.description, 
                initialCollection.collection_id
            );
            
            // If the process was cancelled - which returns false - return
            if (!editedCollection) return;

            // Tell FastAPI to update
            const response = await fastApi.watch_list.collections.edit(
                initialCollection.collection_id, 
                editedCollection.name, 
                editedCollection.description
            );

            // If update successfull handle necessary tasks
            if (response) {
                notify(response.message, 'success');    // Notify user
                
                // Update values on this modal
                const index = this.collectionsForTitle.findIndex(c => c.collection_id === initialCollection.collection_id);
                if (index !== -1) {
                    this.collectionsForTitle[index] = {
                        ...this.collectionsForTitle[index],
                        name: editedCollection.name,
                        description: editedCollection.description
                    };
                }

                // Emit for updating data in parent
                this.$emit('collection-updated', {
                    newCollectionValues: {
                        ...editedCollection,
                        collection_id: initialCollection.collection_id
                    }
                })

                // Close the modal once finished
                this.$refs.modalCollection.close()
            }
        },
    }
}
</script>

<style scoped>
.modal-title-collections {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-md);
}

.modal-title-collections .seperator {
    margin-bottom: var(--spacing-md);   /* Match the gap for a dirty fix */
}

.modal-title-collections .collection {
    width: 500px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: var(--spacing-md);
}

.modal-title-collections .collection .details {
    display: flex;
    flex-direction: column;
    justify-content: left;
}

.modal-title-collections .collection .details h3 {
    margin: 0;
}

</style>