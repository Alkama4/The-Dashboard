<template>
    <div class="custom-file-input">
        <input
            ref="fileInput"
            type="file"
            :accept="accept"
            @change="onFileChange"
            style="display:none"
        />

        <div 
            class="drop-area"
            @dragover.prevent
            @drop="handleDrop"
            @click="triggerFileInput" 
            @keydown.enter.stop="triggerFileInput" 
            @keydown.space.stop="triggerFileInput"
        >
            <img 
                v-if="previewUrl || initialValues?.url"
                :src="previewUrl || initialValues.url"
                alt="preview"
            />
            <div v-else class="empty">
                <IconUpload size="60px"/>
                <span>Drag and drop your file here</span>
            </div>
        </div>

        <div
            class="bottom-bar" 
            @click="triggerFileInput" 
            @keydown.enter.stop="triggerFileInput" 
            @keydown.space.stop="triggerFileInput"
            tabindex="0" 
        >
            <div v-if="initialValues?.url || previewUrl">
                {{ imageFile?.name || initialValues?.name }}
            </div>
            <div v-else>
                Select your file
            </div>
            <IconTrash 
                class="icon-button" 
                @click.stop="clearFile"
                @keydown.enter.stop="clearFile" 
                @keydown.space.stop="clearFile"
                tabindex="0"
            />
        </div>
    </div>
</template>

<script>
import { notify } from '@/utils/notification';
import IconTrash from '../icons/IconTrash.vue';
import IconUpload from '../icons/IconUpload.vue';

export default {
    name: 'CustomFileInput',
    components: {
        IconUpload,
        IconTrash,
    },
    props: {
        // v-model binding
        modelValue: {
            type: File,
            default: null
        },
        accept: {
            type: String,
            default: ".png,.jpeg,.jpg,.svg"
        },
        initialValues: {
            type: Object,
            default: () => null
        }
    },
    data() {
        return {
            imageFile: this.modelValue instanceof File ? this.modelValue : null,
            previewUrl: this.modelValue instanceof File ? URL.createObjectURL(this.modelValue) : null,
        }
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        clearFile() {
            this.imageFile = this.previewUrl = null;
            this.$emit('update:modelValue', null);
            this.$emit('clear-initial');
        },
        onFileChange(e) {
            const file = e.target.files[0];
            if (!file) return;

            this.processFile(file);
        },
        handleDrop(e) {
            e.preventDefault();

            const file = e.dataTransfer?.files?.[0];
            if (!file) return;

            this.processFile(file);
        },
        processFile(file) {
            if (!this.accept.split(',').some(ext => file.name.toLowerCase().endsWith(ext.trim()))) {
                notify(
                    `Invalid file type. Allowed types are: ${this.accept.split(",").map(x => x.trim()).join(", ")}`,
                    "error"
                )
                return; // invalid type, ignore or emit error
            }
            this.imageFile = file;
            this.updatePreview(file);
            this.$emit('update:modelValue', file);
        },
        updatePreview(file) {
            if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
            this.previewUrl = file instanceof File ? URL.createObjectURL(file) : null;
        }
    },
    watch: {
        // keep prop and local state in sync
        modelValue(newFile) {
            this.imageFile = newFile;
            this.updatePreview(newFile);
        }
    },
    beforeUnmount() {
        if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    }
}
</script>

<style scoped>
.custom-file-input {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.drop-area {
    display: flex;
    width: 100%;
    height: 220px;
    border-radius: var(--border-radius-lg);
    overflow: hidden;
}
.drop-area .empty {
    cursor: pointer;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: var(--spacing-xl) var(--spacing-lg);
    
    border-radius: var(--border-radius-lg);
    border: dashed 3px var(--color-border);

    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-7);
    font-weight: 600;
    font-size: var(--font-size-md);
    user-select: none;
    transition: border-color 0.1s ease-out,
                outline-color 0.1s ease-out;
}

.image-stuff-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding-bottom: var(--spacing-sm); */
}

.bottom-bar {
    cursor: pointer;
    background-color: var(--color-background-input);
    box-sizing: border-box;
    width: 100%;
    min-height: 40px;
    height: 40px;
    padding: 0px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-md);
    
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-border);
    border-radius: var(--border-radius-sm);
    transition: border-color 0.1s ease-out,
                outline-color 0.1s ease-out;
}
.bottom-bar:hover,
.empty:hover {
    border-color: var(--color-border-hover);
}
.bottom-bar:focus-visible {
    z-index: var(--z-input-focus);
}

.bottom-bar > div {
    overflow: hidden;
    white-space: nowrap;
}

img {
    height: 100%;
    width: 100%;
    object-fit: contain;
}
</style>