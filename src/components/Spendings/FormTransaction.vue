<template>
    <div class="form-transaction" @keydown="handleFormWideKeyDown">
        <div class="form-row tool-row">
            <div class="presets-carousel">
                <button v-for="(preset, index) in presets" :key="index" @click="$refs.comingSoonGM.open()">
                    <IconPaste size="20px" class="icon-button"/>
                    {{ preset.name }}
                </button>
            </div>
            <div class="tools">
                <IconSave class="icon-button" @click="$refs.comingSoonGM.open()"/>
                <IconReset class="icon-button" v-if="initialFormValues != null" @click="handleResetInitialValues()"/>
                <IconTrash class="icon-button" @click="handleResetFormValues()"/>
            </div>
        </div>
        <div class="seperator"></div>
        <div class="form-row mobile-column">
            <div class="label-wrapper">
                <label>Direction</label>
                <SliderToggle 
                    v-model="currentFormValues.direction" 
                    :options="['expense', 'income']" 
                />
            </div>
            <div class="label-wrapper">
                <label>Date</label>
                <CustomGenericInput 
                    type="date" 
                    v-model="currentFormValues.date" 
                    ref="dateRef"
                />
            </div>
        </div>
        <div class="form-row">
            <div class="label-wrapper">
                <label>Counterparty</label>
                <CustomSearchSelect 
                    v-model="currentFormValues.counterparty" 
                    :options="currentFormValues.direction == 'expense' ?
                              options.counterparty.expense : 
                              options.counterparty.income" 
                    ref="counterpartyRef"
                />
            </div>
        </div>
        <div class="categories">
            <div class="category-row drop-zone-compensation">
                <div class="category-column column">
                    <div v-if="currentFormValues.categories.length > 1" class="left-mod-area"></div>
                    <label>Category</label>
                </div>
                <div class="amount-column column">
                    <label>Amount</label>
                    <div v-if="currentFormValues.categories.length > 1" class="right-mod-area"></div>
                </div>
            </div>
            <div class="category-rows">
                <div v-for="(category, index) in currentFormValues.categories" :key="index">
                    <div
                        class="category-drop-zone"
                        :class="{ active: dropping.hoveredZoneIndex == index }"
                    >
                        <div
                            v-show="dropping.draggedIndex != null"
                            class="drop-zone-area"
                            @dragover.prevent="dropping.hoveredZoneIndex = index"
                            @dragleave="dropping.hoveredZoneIndex = null"
                            @drop="categoryHoverDrop(index)"
                        ></div>
                    </div>

                    <div class="category-row">
                        <div class="category-column column">
                            <div 
                                v-if="currentFormValues.categories.length > 1"
                                class="left-mod-area"
                                draggable="true"
                                @dragstart="dropping.draggedIndex = index;"
                            >
                                ⠿
                            </div>
                            <CustomSearchSelect 
                                v-model="category.category" 
                                :options="currentFormValues.direction == 'expense' ?
                                          options.category.expense : 
                                          options.category.income"  
                                :ref="`categoryCategory${index}Ref`"
                                placeholder="Select or type"
                            />
                        </div>
                        <div class="amount-column column">
                            <CustomGenericInput 
                                type="number" 
                                v-model="category.amount" 
                                :ref="`categoryAmount${index}Ref`"
                                placeholder="Number"
                            />
                            <IconCross 
                                v-if="currentFormValues.categories.length > 1"
                                class="icon-button right-mod-area"
                                @click="currentFormValues.categories.splice(index, 1)"
                                size="32px"
                            />
                        </div>
                    </div>
                </div>
                <div
                    class="category-drop-zone"
                    :class="{ active: dropping.hoveredZoneIndex == currentFormValues.categories.length }"
                >
                    <div
                        v-show="dropping.draggedIndex != null"
                        class="drop-zone-area"
                        @dragover.prevent="dropping.hoveredZoneIndex = currentFormValues.categories.length"
                        @dragleave="dropping.hoveredZoneIndex = null"
                        @drop="categoryHoverDrop(currentFormValues.categories.length)"
                    ></div>
                </div>
            </div>
            <div class="category-row">
                <!-- <div v-if="currentFormValues.categories.length > 1" class="left-mod-area"></div> -->
                <button class="category-column" @click="currentFormValues.categories.push({category: '', amount: null})">Add category</button>
                <div v-if="currentFormValues.categories.length > 1" class="amount-column total-amount">
                    <span class="label">Total: </span>
                    <span class="value">{{ totalAmount }}</span>
                </div>
                <!-- <div v-if="currentFormValues.categories.length > 1" class="right-mod-area"></div> -->
            </div>
        </div>
        <div class="form-row">
            <div class="label-wrapper">
                <label>Notes</label>
                <CustomGenericInput 
                    type="textarea" 
                    placeholder="Optional notes or details"
                    v-model="currentFormValues.notes" 
                    ref="notesRef"
                />
            </div>
        </div>
        <button @click="handleSubmit" class="button-primary" type="submit">{{ submitText }}</button>
        
        <!-- Modals -->
        <ModalConfirmation 
            ref="resetFormDataMC"
            header="Reset Form Data"
            text="Are you sure you want to reset the form? All current values will be cleared. 
                (This will not affect any transaction, only the form data.)"
            affirmative-option="Reset"
        />

        <ModalConfirmation 
            ref="initialFormDataMC"
            header="Revert to Initial Data"
            text="Are you sure you want to revert the form to its original state? 
                All current values will be cleared and replaced with the initial data. 
                (This will not affect any transaction, only the form data.)"
            affirmative-option="Revert"
        />

        <ModalGeneric ref="comingSoonGM" header="Coming Soon!"> 
            <p>This feature is on its way and will be available soon. Stay tuned!</p>
            <button class="button-primary" @click="$refs.comingSoonGM.close()">Got it!</button>
        </ModalGeneric>
    </div>
</template>

<script>
import { notify } from '@/utils/notification';
import CustomGenericInput from '@/components/common/CustomGenericInput.vue';
import CustomSearchSelect from '@/components/common/CustomSearchSelect.vue';
// import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconCross from '@/components/icons/IconCross.vue';
import SliderToggle from '@/components/common/SliderToggle.vue';
import { convert } from '@/utils/utils';
import IconReset from '@/components/icons/IconReset.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconSave from '@/components/icons/IconSave.vue';
import IconPaste from '@/components/icons/IconPaste.vue';
import ModalConfirmation from '@/components/common/ModalConfirmation.vue';
import ModalGeneric from '@/components/common/ModalGeneric.vue';
import fastApi from '@/utils/fastApi';

export default {
    name: "FormTransaction",
    data() {
        return {
            defaultFormValues: {
                entryId: '',
                direction: 'expense',
                date: new Date().toISOString().slice(0, 10),
                counterparty: '',
                categories: [
                    { category: '', amount: null }
                ],
                notes: '',
            },
            currentFormValues: {},
            options: {
                category: {
                    expense: [],
                    income: []
                },
                counterparty: {
                    expense: [],
                    income: []
                }
            },
            dropping: {
                draggedIndex: null,
                hoveredZoneIndex: null
            },
            presets: [
                {
                    name: 'Example preset',
                    presetValues: {
                        direction: 'Expense',
                        counterparty: 'Counterparty 1',
                        categories: [
                            { category: 'Category 1', amount: "1.23" }
                        ],
                    }
                },
                {
                    name: 'Example preset 2',
                    presetValues: {
                        direction: 'Income',
                        counterparty: 'Counterparty 2',
                        categories: [
                            { category: 'Category 2', amount: "1.23" },
                            { category: 'Category 3', amount: "-12.34" }
                        ],
                    }
                },
                {
                    name: 'Example preset 3',
                    presetValues: {
                        direction: 'Income',
                        counterparty: 'Counterparty 2',
                        categories: [
                            { category: 'Category 2', amount: "1.23" },
                            { category: 'Category 3', amount: "-12.34" }
                        ],
                    }
                }
            ]
        };
    },
    components: {
        CustomSearchSelect,
        CustomGenericInput,
        SliderToggle,
        ModalConfirmation,
        ModalGeneric,
        IconCross,
        // IconChevronDown,
        IconReset,
        IconTrash,
        IconSave,
        IconPaste,
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
        handleSubmit() {
            console.debug("[handleSubmit] Current form values:", this.currentFormValues)

            let failed = [];

            if (!this.currentFormValues.date) {
                failed.push("dateMissing");
                this.$refs.dateRef?.markInvalid();
            }

            if (!this.currentFormValues.counterparty) {
                failed.push("counterpartyMissing");
                this.$refs.counterpartyRef?.markInvalid();
            }

            this.currentFormValues.categories.forEach((category, index) => {
                if (!category.category) {
                    if (!failed.includes("categoryMissing")) failed.push("categoryMissing");
                    this.$refs[`categoryCategory${index}Ref`][0]?.markInvalid();
                }
                if (!category.amount) {
                    if (!failed.includes("amountMissing")) failed.push("amountMissing");
                    this.$refs[`categoryAmount${index}Ref`][0]?.markInvalid();
                }
            });

            if (failed.includes("dateMissing")) notify("The date is required.", "error");
            if (failed.includes("counterpartyMissing")) notify("The counterparty is required.", "error");
            if (failed.includes("categoryMissing")) notify("A category cannot be empty.", "error");
            if (failed.includes("amountMissing")) notify("An amount cannot be empty.", "error");
            if (failed.length > 0) return;

            // notify("Submitting...");

            // Emit the values
            this.$emit('submit', {
                ...this.currentFormValues,
                categories: [...this.currentFormValues.categories]
            });
        },
        moveCategory(direction, index) {
            const chosenValues = this.currentFormValues.categories[index];
            let targetIndex;

            if (direction === 'up') {
                targetIndex = Math.max(index - 1, 0);
            } else if (direction === 'down') {
                targetIndex = Math.min(index + 1, this.currentFormValues.categories.length - 1);
            } else {
                return;
            }

            const targetValues = this.currentFormValues.categories[targetIndex];

            // Swap the categories
            this.currentFormValues.categories.splice(index, 1, targetValues);
            this.currentFormValues.categories.splice(targetIndex, 1, chosenValues);
        },
        deepCloneObject(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
        async handleResetFormValues() {
            if (!await this.$refs.resetFormDataMC.prompt()) return;
            this.resetFormValues();
        },
        resetFormValues() {
            this.currentFormValues = this.deepCloneObject(this.defaultFormValues);
        },
        async handleResetInitialValues() {
            if (!await this.$refs.initialFormDataMC.prompt()) return;
            if (!this.initialFormValues) {
                console.warn("The initial values is somewhow not set or is falsy!");
                notify("There are no initial values to set!", "warning");
                return;
            }
            this.setInitialValues();
        },
        setInitialValues() {
            this.currentFormValues = this.deepCloneObject(this.defaultFormValues);
            if (this.initialFormValues) {
                Object.assign(
                    this.currentFormValues,
                    this.deepCloneObject(this.initialFormValues)
                );
            }
        },
        categoryHoverDrop(dropIndex) {
            const categories = this.currentFormValues.categories;
            const fromIndex = this.dropping.draggedIndex;
            const draggedItem = categories[fromIndex];

            // Remove the dragged item
            categories.splice(fromIndex, 1);

            // Adjust drop index if needed (account for item removal shifting indexes)
            const insertIndex = dropIndex > fromIndex ? dropIndex - 1 : dropIndex;

            // Insert at new position
            categories.splice(insertIndex, 0, draggedItem);

            // Reset state
            this.dropping.hoveredZoneIndex = null;
            this.dropping.draggedIndex = null;
        },
        handleFormWideKeyDown(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                this.handleSubmit();
            }
        }
    },
    computed: {
        totalAmount() {
            return convert.toEur(this.currentFormValues.categories.reduce((acc, curr) => {
                return acc + Number(curr && curr.amount ? curr.amount : 0);
            }, 0));
        }
    },
    created() {
        this.setInitialValues();
    },
    async mounted() {
        // Fetch the options
        const categoriesResponse = await fastApi.spendings.transactions.categories_options();
        if (categoriesResponse && categoriesResponse.counterparty && categoriesResponse.category) {
            this.options = categoriesResponse;
        }
    }
};
</script>

<style scoped>
.form-transaction {
    display: grid;
    width: 800px;
    max-width: 100%;
    grid-template-columns: 1fr;
    grid-template-areas: none;
    row-gap: var(--spacing-md);
}

.form-transaction .form-row {
    display: flex;
    flex-direction: row;
    column-gap: var(--spacing-md);
    align-items: center;
}
@media(max-width: 500px) {
    .form-row.mobile-column {
        flex-direction: column;
        gap: var(--spacing-md);
    }
    .form-row.mobile-column .label-wrapper {
        width: 100%;
    }
}

.tool-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    flex-wrap: nowrap;
}
.tool-row .tools {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-xs);
}
.tool-row .presets-carousel {
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-sm);
    max-width: 100%;
    flex-wrap: nowrap;
}

.tool-row button {
    padding: 4px 8px;
    font-size: var(--font-size-sm);
    font-weight: 500;
    margin: 0;
    white-space: nowrap;
}

.form-transaction .categories button {
    width: 100%;
    /* margin-top: var(--spacing-sm); */
    margin-bottom: 0;
    padding-inline: 0;
}

.total-amount {
    /* margin-top: var(--spacing-sm); */
    background-color: var(--color-background-input);
    border-radius: var(--border-radius-xs);
    height: 40px;
    display: flex;
    align-items: center;
}
.total-amount .label {
    padding-left: var(--spacing-sm);
    color: var(--color-text-lighter);
    font-weight: 500;
}
.total-amount .value {
    padding-left: var(--spacing-sm);
    font-weight: 500;
}

.form-transaction .category-rows {
    display: flx;
    flex-direction: column;
    /* row-gap: var(--spacing-sm); */
    row-gap: 0;
}
.form-transaction .category-row {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-sm);
    align-items: center;
}
.category-row.drop-zone-compensation {
    margin-bottom: -6px;    /* Default on 2px, jollonka kun drop-zone on 8px tulos on tämä */
}

.form-transaction .label-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
}


.move-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
}
.move-button svg {
    transform: scale(1.5) translateY(-1.5px);
    pointer-events: none;
}

.move-button.move-button-hide {
    display: none;
}
.move-button.move-button-center {
    height: 32px;
}

.move-up {
    transform: rotate(180deg);
}

.column {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: var(--spacing-sm);
}
.category-column {
    flex: 2;
}
.amount-column {
    flex: 1;
    min-width: 125px;
}

.custom-search-select {
    width: 100%;
}

.left-mod-area {
    width: 30px;
    height: 100%;
    display: flex; 
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: grab;
    font-size: var(--font-size-xl);
    color: var(--color-text-light);
}
.right-mod-area {
    width: 32px;
}

.slider-toggle {
    width: 100%;
}


.category-drop-zone {
    background: transparent;
    position: relative;
    height: 2px;
    margin: 3px 0;
    background: transparent;
    transition: background-color 0.1s ease-out;
}
.category-drop-zone.active {
    background: var(--color-primary-active);
}
.category-drop-zone .drop-zone-area {
    height: 42px;
    position: absolute;
    width: 100%;
    transform: translateY(-21px); /* (Height / 2)  */
    z-index: var(--z-above-input);
}

</style>