<template>
    <div class="list-collections">
        <h1>List collections <span class="text-lighter">(Under construction)</span></h1>
    
        <button @click="handleNewCollection">New collection</button>
    
        <div class="collections">            
            <CollectionItem 
                v-for="(collection, index) in collections" 
                :key="index" 
                :collection="collection" 
                @remove-collection="handleRemoveCollection" 
                @edit-collection="handleEditCollection"
            />
        </div>

        <ModalCollection ref="newCollectionFC" header="New collection" submitText="Create"/>
        <ModalCollection ref="editCollectionFC" type="Edit colleciton" submitText="Save"/>
        <ModalConfirmation 
            ref="deleteCollectionMC"
            header="Delete collection"
            text="Are you sure you want to delete this collection? This action cannot be undone. (Titles within the collection will not be affected.)"
            affirmative-option="Delete"
        />
    </div>
</template>

<script>
import fastApi from '@/utils/fastApi';
import ModalCollection from '@/components/ModalCollection.vue';
import ModalConfirmation from '@/components/ModalConfirmation.vue';
import { notify } from '@/utils/notification';
import CollectionItem from '@/components/CollectionItem.vue';

export default {
    name: 'listCollections',
    components: {
        ModalCollection,
        ModalConfirmation,
        CollectionItem,
    },
    data() {
        return {
            collections: null,
        }
    },
    methods: {
        async handleNewCollection() {
            const newCollection = await this.$refs.newCollectionFC.prompt()

            // If the process was cancelled - which returns false - return
            if (!newCollection) return;

            const response = await fastApi.watch_list.collections.create(
                newCollection.name, 
                newCollection.description
            );

            if (response) {
                notify(response.message, 'success');
                this.$refs.newCollectionFC.close()
                console.log(response);
                this.collections.push(response.collection);
            }
        },
        async handleEditCollection(initialCollection) {
            const editedCollection = await this.$refs.editCollectionFC.prompt(
                initialCollection.name, 
                initialCollection.description, 
                initialCollection.collection_id
            );
            
            // If the process was cancelled - which returns false - return
            if (!editedCollection) return;

            const response = await fastApi.watch_list.collections.edit(
                initialCollection.collection_id, 
                editedCollection.name, 
                editedCollection.description
            );

            if (response) {
                notify(response.message, 'success');

                const index = this.collections.findIndex(c => c.collection_id === initialCollection.collection_id);
                if (index !== -1) {
                    this.collections[index] = {
                        ...this.collections[index],
                        name: editedCollection.name,
                        description: editedCollection.description
                    };
                }

                this.$refs.editCollectionFC.close()
            }
        },
        async handleRemoveCollection(collection_id) {
            if (!await this.$refs.deleteCollectionMC.prompt()) return;
            
            const response = await fastApi.watch_list.collections.delete(collection_id);
            if (response) {
                notify(response.message, 'success');
                this.collections = this.collections.filter(c => c.collection_id !== collection_id);
            }
        },
        async getOrRefreshData() {
            this.collections = await fastApi.watch_list.collections.list();
        }
    },
    async mounted() {
        await this.getOrRefreshData()
    }
}
</script>


<style scoped>
.collections {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-md);
}
</style>