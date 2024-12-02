<template>
    <tr class="spendings-summary" @click="toggleEntry">

        <td class="column-date">
            <span class="date-full">{{ formattedDate }}</span>
            <span class="date-short">{{ shortFormattedDate }}</span>
        </td>

        <td class="column-counterparty column-fade-right">{{ counterparty }}</td>
        
        <td class="column-type column-fade-right" ref="columnType">
            <div ref="typeExpanded" style="height: 25px;">
                <div ref="typeExpandedContent">
                    <span v-for="(type, index) in types" :key="index"
                            :class="{
                                'summary-row-type-and-amount': index === 0,
                                'active': isExpanded
                            }">
                        {{ type }}
                    </span>
                </div>
            </div>
        </td>

        <td class="column-amount" :class="this.data.direction" ref="columnAmount">
            <div ref="amountExpanded" style="height: 25px;">
                <div ref="amountExpandedContent">
                    <span v-for="(amount, index) in amounts" :key="index" 
                            :class="{
                                'summary-row-type-and-amount': index === 0,
                                'active': isExpanded
                            }">
                        {{ formatAmount(amount) }}
                    </span>
                </div>
            </div>
        </td>

        <td class="column-notes column-fade-combined" ref="columnNotes">
            <div ref="notesExpanded" style="height: 25px;">
                <div ref="notesExpandedContent">
                    {{ notes }}
                </div>
            </div>
        </td>

    </tr>
    <tr> 
        <td colspan="5" style="padding: 0;">
            <div class="spendings-expanded" ref="spendingsExpanded">
                <div class="spendings-expanded-content" ref="spendingsExpandedContent">
                    <div class="control-buttons">
                        <button class="button-delete color-warning" @click.stop="deleteEntry"><IconTrash size="18px" colorHover="white"/></button>
                        <button disabled="true" class="button-duplicate" @click.stop="duplicateEntry"><IconCopy size="18px"/></button>
                        <button class="button-edit" @click.stop="editEntry"><IconEdit size="18px"/></button>
                        <button class="button-details color-primary" @click.stop="showDetails"><IconDetails size="18px" color="#e9ebf0" colorHover="white"/>Details</button>
                    </div>
        
                    <ModalWindow
                        v-if="showModal"
                        :type="modalType"
                        :data="modalData"
                        :header="modalHeader"
                        @close="showModal = false"
                        @delete="deleteEntry"
                    />
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    import IconCopy from './icons/IconCopy.vue';
    import IconEdit from './icons/IconEdit.vue';
    import IconDetails from './icons/IconDetails.vue';
    import IconTrash from './icons/IconTrash.vue';
    import { defineAsyncComponent } from 'vue';

    export default {
        name: "SpendingsEntry",
        components: { 
            IconDetails,
            IconCopy,
            IconEdit,
            IconTrash,
            ModalWindow: defineAsyncComponent(() => import('./ModalWindow.vue')),
        },
        props: {
            data: { type: Object, required: true },
        },
        data() {
            return {
                isExpanded: false,
                showModal: false,
                modalType: '',
                modalData: this.data,
                modalHeader: '',
            };
        },
        methods: {
            toggleEntry() {
                this.isExpanded = !this.isExpanded;

                if (this.isExpanded) {
                    const expandedContentHeight = this.$refs['spendingsExpandedContent']?.getBoundingClientRect().height || 0;

                    const notesHeight = this.$refs['notesExpandedContent']?.getBoundingClientRect().height || 0;
                    const typeHeight = this.$refs['typeExpandedContent']?.getBoundingClientRect().height || 0;
                    const amountHeight = this.$refs['amountExpandedContent']?.getBoundingClientRect().height || 0;

                    const maxHeight = Math.max(notesHeight, typeHeight, amountHeight);

                    this.$refs['spendingsExpanded'].style.height = `${expandedContentHeight}px`;
                    this.$refs['notesExpanded'].style.height = `${maxHeight}px`;
                    this.$refs['typeExpanded'].style.height = `${maxHeight}px`;
                    this.$refs['amountExpanded'].style.height = `${maxHeight}px`;

                    this.$refs['columnNotes'].classList.add("hide-mask");
                    this.$refs['columnType'].classList.add("hide-mask");
                } else {
                    this.$refs['spendingsExpanded'].style.height = '0';
                    this.$refs['notesExpanded'].style.height = '25px';
                    this.$refs['typeExpanded'].style.height = '25px';
                    this.$refs['amountExpanded'].style.height = '25px';

                    this.$refs['columnNotes'].classList.remove("hide-mask");
                    this.$refs['columnType'].classList.remove("hide-mask");
                }
            },
            showDetails() {
                this.modalType = 'details';
                this.showModal = true;
            },
            editEntry() {
                this.modalType = 'edit';
                this.showModal = true;
            },
            duplicateEntry() {
                this.modalType = 'duplicate';
                this.showModal = true;
            },
            deleteEntry() {
                this.modalType = 'delete';
                this.showModal = true;
            },
            formatAmount(amount) {
                try {
                    const numericAmount = Number(amount);
                    return Number.isFinite(numericAmount)
                        ? `${numericAmount.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
                        : '';
                } catch (error) {
                    console.error("Format amount error:", error);
                    return amount;                    
                }
            },
        },
        computed: {
            amounts() {
                const total = this.data.types.reduce((sum, type) => sum + type.amount, 0);
                return [total, ...this.data.types.map(type => type.amount)];
            },
            types() {
                let firstRow = "";
                if (this.isExpanded) {
                    firstRow = "Sum";
                } else {
                    this.data.types.forEach((type, index) => {
                        if (index > 0) {
                            firstRow += ", "
                        }
                        firstRow += type.type;
                    })
                }
                const categories = this.data.types.map(type => type.type);
                return [firstRow, ...categories];
            },
            counterparty() {
                return this.data.counterparty;
            },
            notes() {
                return this.data.notes;
            },
            formattedDate() {
                const options = { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                };
                return this.data.date.toLocaleDateString('fi-FI', options);
            },
            shortFormattedDate() {
                const options = { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                };
                return this.data.date.toLocaleDateString('fi-FI', options);
            }
        }
    };
</script>



<style scoped>
/* Styles for the whole thing */
.spendings-summary {
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: background-color 0.1s;  /* For the hover effect */
    transition: transform 0.1s ease-out;
    border-top: 2px solid var(--color-button-clean-active);
}
td {
    white-space: nowrap;
    padding: 6px var(--spacing-sm);
    vertical-align: top;
    color: var(--color-text-light);
}

/* Individual columns in summary*/
.column-date {
    text-align: center;
    width: fit-content;
} .date-full {
    display: inline-block;
} .date-short {
    display: none;
}@media (max-width: 1500px) {
    .date-full {
        display: none;
    } .date-short {
        display: inline-block;
    }
}
.column-counterparty {
    text-align: start;
    max-width: 175px;
    min-width: 175px;
    overflow: hidden;
    color: var(--color-text);
}    
.column-type {
    text-align: start;
    max-width: 175px;
    min-width: 175px;
    width: fit-content;
    overflow: hidden;
}
.column-amount {
    text-align: end;
    width: fit-content;
    font-weight: 500;
    overflow: hidden;
}
.column-notes {
    overflow: hidden;
} 

.column-amount div, .column-type div {
    transition: height 0.2s ease-out;
} .column-amount div div, .column-type div div {
    display: grid;
    grid-template-columns: 1fr;
}

.column-notes div {
    transition: height 0.2s ease-out;
} .column-notes div div {
    white-space: normal;
    word-break: break-word;
    hyphens: auto; /* Automatically inserts hyphens when breaking words */
    text-align: justify;
}


/* Special column properties */
.column-fade-combined {
    mask-image: 
        linear-gradient(to right, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%),
        linear-gradient(to bottom, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%);
    mask-composite: intersect;
    mask-size: 100% 100%;
    transition: mask-size 0.2s ease;
}
.column-fade-combined.hide-mask {
    mask-size: 125% 300%;
}

.column-fade-right {
    mask-image: 
        linear-gradient(to right, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%);
    mask-size: 100%;
    transition: mask-size 0.2s ease;
}
.column-fade-bottom.hide-mask {
    mask-size: 125%;
}

.summary-row-type-and-amount {
    padding-bottom: var(--spacing-sm);
    position: relative;
}
.summary-row-type-and-amount.active {
    font-weight: 600;
    color: var(--color-text);
}
.column-amount.expense .summary-row-type-and-amount.active {
    color: var(--color-negative-hover);
}
.column-amount.income .summary-row-type-and-amount.active {
    color: var(--color-positive-hover);
}

.column-amount.expense span {
    color: var(--color-negative);
} .column-amount.expense span::before {
    content: "-";
}

.column-amount.income span {
    color: var(--color-positive);
} .column-amount.income span::before {
    content: "+";
}

/* The expanded stuff or the extra stuff like buttons*/
.spendings-expanded {
    position: relative; /* In order to have the possibility of content stuck to the bottom */
    overflow: hidden;
    transition: height 0.2s ease-out;
    height: 0; /* Initial collapsed state */
}
.spendings-expanded-content {
    position: absolute;
    bottom: 0;
    width: 100%;
}

/* Buttons */
.control-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    gap: var(--spacing-md);
}

.control-buttons button {
    height: 35px;
    min-width: 30px;
    white-space: nowrap;
    padding-inline: 0;
    margin: 0;
    margin-bottom: var(--spacing-sm);
    font-weight: 400;
}

@media (max-width: 777px) {
    .spendings-summary td:nth-child(5) {
        display: none;
    }
}
@media (max-width: 600px) {
    .spendings-summary td:nth-child(3) {
        display: none;
    }
}

</style>
