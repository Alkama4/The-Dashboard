<template>
    <div class="list-collections">
        <h1>List collections</h1>
    
        <button @click="handleNewCollection">New collection</button>
    
        <div class="collections">            
            <div v-for="(collection, index) in collections" :key="index" class="collection">
                <div class="header-bar">
                    <div class="name-description">
                        <h2>{{ collection.name }}</h2>
                        <span class="text-light">{{ collection.description }}</span>
                    </div>
                    <div>
                        <IconTrash @click="handleRemoveCollection(collection.collection_id)" class="icon-button"/>
                        <IconEdit @click="handleEditCollection(collection)" class="icon-button"/>
                    </div>
                </div>
                <div class="titles">
                    <div v-for="(title, index) in collection.titles" :key="index" class="title">
                        {{ title.title_id }}
                        {{ title.name }}
                    </div>
                    <div class="title add-title">
                        <IconAdd size="64px"/>
                    </div>
                </div>
            </div>
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
import api from '@/utils/dataQuery.js';
import ModalCollection from '@/components/ModalCollection.vue';
import ModalConfirmation from '@/components/ModalConfirmation.vue';
import { notify } from '@/utils/notification';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconAdd from '@/components/icons/IconAdd.vue';


export default {
    name: 'listCollections',
    components: {
        ModalCollection,
        ModalConfirmation,
        IconTrash,
        IconEdit,
        IconAdd,
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

            const response = await api.createCollection(
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

            const response = await api.editCollection(
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
            
            const response = await api.deleteCollection(collection_id);
            if (response) {
                notify(response.message, 'success');
                this.collections = this.collections.filter(c => c.collection_id !== collection_id);
            }
        },
        async getOrRefreshData() {
            this.collections = await api.getCollectionsListed();
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
    gap: var(--spacing-md);
}

.collection {
    display: flex;
    row-gap: var(--spacing-md);
    flex-direction: column;
    border-radius: var(--border-radius-medium);
    padding: var(--spacing-md);
    border: 1px solid var(--color-border);
    box-sizing: border-box;
    width: 100%;
}

.collection .header-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.collection .header-bar .name-description {
    display: flex;
    flex-direction: column;
    align-items: start;
    column-gap: var(--spacing-md);
}
.collection h2 {
    display: inline;
    margin: 0;
}

.titles {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    overflow-x: scroll;
}

.title {
    min-width: 200px;
    width: 200px;
    height: 300px;
    border-radius: var(--border-radius-medium);
    background-color: var(--color-background-card);
    box-sizing: border-box;
}

.title.add-title {
    background-color: transparent;
    border: 3px dashed var(--color-text-hidden);
    color: var(--color-text-hidden);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.1s ease-out,
                color 0.1s ease-out;
}
.title.add-title:hover {
    border-color: var(--color-text-lighter);
    color: var(--color-text-lighter);
}


.collection-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}
.collection-form .submit {
    width: 100%;
}

</style>