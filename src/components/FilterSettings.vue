<template>
    <div class="filter-backdrop backdrop" :class="{'active': fullscreenMode}" @click.self="closeFilters()">
        <div class="filter-content" ref="filter-content">
            <h2>Filters</h2>

            <h4 class="amount-and-date-headers">Amount</h4>
            <div class="slider-wrapper">
                <div class="slider-min-wrapper">
                    <input v-model.number="filterData.amount.lowerLimit" type="number" ref="amountMin">
                </div>
                <div class="slider-max-wrapper">
                    <input v-model.number="filterData.amount.upperLimit" type="number" ref="amountMax">
                </div>
                <div class="slider" ref="amountSlider"></div>
            </div>

            <h4 class="amount-and-date-headers">Date</h4>
            <div class="slider-wrapper">
                <div class="slider-min-wrapper">
                    <input type="date" ref="dateMin">
                </div>
                <div class="slider-max-wrapper">
                    <input type="date" ref="dateMax">
                </div>
                <div class="slider" ref="dateSlider"></div>
            </div>

            <div class="spacer-line"></div>            

            <!-- Counterparties -->
            <div class="drop-down drop-down-wrapper">
                <h4 class="drop-down-header" @click="toggleDropdown('counterparty')">
                    Counterparties
                    <span @click.stop="filterData.counterparty.mode = filterData.counterparty.mode === 'include' ? 'exclude' : 'include'" 
                        title="[Include only selected] / [Exclude selected]"
                        class="mode-flipper-in-header"
                        :class="{
                            'exclude': filterData.counterparty.mode === 'exclude',
                            'include': filterData.counterparty.mode === 'include'
                        }"
                    >
                        <span>
                            <IconCheckboxChecked color="var(--color-primary)" colorHover="var(--color-primary-hover)"/>
                        </span>
                        <span>
                            <IconCheckboxMinus color="var(--color-negative)" colorHover="var(--color-negative-hover)"/>
                        </span>
                        <div class="flipper"></div>
                    </span>
                    <IconChevronDown class="drop-down-indicator" color="var(--color-text-light)"/>
                </h4>

                <div class="drop-down-content"
                    :style="{
                        height: filterDropDownHeight('counterparty') + 'px'
                    }">
                    <div ref="drop-down-content-counterparty">
                        <div class="expense-section">
                            <h5>Expense</h5>
                            <div v-for="(counterparty) in options.counterparty.expense" :key="'counterparty-expense-' + counterparty" class="option" @click="toggleCounterpartySelection(counterparty)">
                                <!-- Conditionally render checked or minus icon -->
                                <IconCheckboxChecked v-if="filterData.counterparty.selected.includes(counterparty) && filterData.counterparty.mode === 'include'" color="var(--color-primary)" colorHover="var(--color-primary-hover)"/>
                                <IconCheckboxMinus v-if="filterData.counterparty.selected.includes(counterparty) && filterData.counterparty.mode === 'exclude'" color="var(--color-negative)" colorHover="var(--color-negative-hover)"/>
                                <IconCheckbox v-if="!filterData.counterparty.selected.includes(counterparty)" color="var(--color-text-light)" />
                                {{ counterparty }}
                            </div>
                        </div>

                        <div class="income-section">
                            <h5>Income</h5>
                            <div v-for="(counterparty) in options.counterparty.income" :key="'counterparty-income-' + counterparty" class="option" @click="toggleCounterpartySelection(counterparty)">
                                <!-- Conditionally render checked or minus icon -->
                                <IconCheckboxChecked v-if="filterData.counterparty.selected.includes(counterparty) && filterData.counterparty.mode === 'include'" color="var(--color-primary)" colorHover="var(--color-primary-hover)"/>
                                <IconCheckboxMinus v-if="filterData.counterparty.selected.includes(counterparty) && filterData.counterparty.mode === 'exclude'" color="var(--color-negative)" colorHover="var(--color-negative-hover)"/>
                                <IconCheckbox v-if="!filterData.counterparty.selected.includes(counterparty)" color="var(--color-text-light)" />
                                {{ counterparty }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Categories -->
            <div class="drop-down drop-down-wrapper categories-header">
                <h4 class="drop-down-header" @click="toggleDropdown('category')">
                    Categories
                    <span @click.stop="filterData.type.mode = filterData.type.mode === 'include' ? 'exclude' : 'include'" 
                        title="[Include only selected] / [Exclude selected]"
                        class="mode-flipper-in-header"
                        :class="{
                            'exclude': filterData.type.mode === 'exclude',
                            'include': filterData.type.mode === 'include'
                        }"
                    >
                        <span>
                            <IconCheckboxChecked color="var(--color-primary)" colorHover="var(--color-primary-hover)"/>
                        </span>
                        <span>
                            <IconCheckboxMinus color="var(--color-negative)" colorHover="var(--color-negative-hover)"/>
                        </span>
                        <div class="flipper"></div>
                    </span>
                    <IconChevronDown class="drop-down-indicator" color="var(--color-text-light)"/>
                </h4>

                <div class="drop-down-content"
                    :style="{
                        height: filterDropDownHeight('category') + 'px'
                    }">
                    <div ref="drop-down-content-category">
                        <div class="expense-section">
                            <h5>Expense</h5>
                            <div v-for="(type) in options.type.expense" :key="'type-expense-' + type" class="option" @click="toggleTypeSelection(type)">
                                <!-- Conditionally render checked or minus icon -->
                                <IconCheckboxChecked v-if="filterData.type.selected.includes(type) && filterData.type.mode === 'include'" color="var(--color-primary)" colorHover="var(--color-primary-hover)"/>
                                <IconCheckboxMinus v-if="filterData.type.selected.includes(type) && filterData.type.mode === 'exclude'" color="var(--color-negative)" colorHover="var(--color-negative-hover)"/>
                                <IconCheckbox v-if="!filterData.type.selected.includes(type)" color="var(--color-text-light)" />
                                {{ type }}
                            </div>
                        </div>
    
                        <div class="income-section">
                            <h5>Income</h5>
                            <div v-for="(type) in options.type.income" :key="'type-income-' + type" class="option" @click="toggleTypeSelection(type)">
                                <!-- Conditionally render checked or minus icon -->
                                <IconCheckboxChecked v-if="filterData.type.selected.includes(type) && filterData.type.mode === 'include'" color="var(--color-primary)" colorHover="var(--color-primary-hover)"/>
                                <IconCheckboxMinus v-if="filterData.type.selected.includes(type) && filterData.type.mode === 'exclude'" color="var(--color-negative)" colorHover="var(--color-negative-hover)"/>
                                <IconCheckbox v-if="!filterData.type.selected.includes(type)" color="var(--color-text-light)" />
                                {{ type }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="color-primary apply" @click="applyFilters()">Apply</button>
        </div>
    </div>
</template>

<script>
import { getFilters } from '@/utils/dataQuery';
import IconCheckboxChecked from './icons/IconCheckboxChecked.vue';  
import IconCheckboxMinus from './icons/IconCheckboxMinus.vue';      
import IconCheckbox from './icons/IconCheckbox.vue';      
import IconChevronDown from './icons/IconChevronDown.vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default {
    name: "FilterSettings",
    components: {
        IconCheckboxChecked,
        IconCheckboxMinus,  
        IconCheckbox,
        IconChevronDown,
    },
    props: {
        fullscreenMode: {type: Boolean, default: false}
    },
    data() {
        return {
            filterData: {
                amount: {
                    lowerLimit: 0,
                    upperLimit: 0,
                },
                date: {
                    lowerLimit: 0,
                    upperLimit: 0,
                },
                counterparty: {
                    mode: 'include',
                    selected: [],  // Track selected counterparties
                },
                type: {
                    mode: 'include',
                    selected: [],  // Track selected types
                }
            },
            activeDropdown: ""
        }
    },
    methods: {
        closeFilters() {
            this.$emit("close");
        },
        filterDropDownHeight(selection) {
            const refName = `drop-down-content-${selection}`;
            if (this.activeDropdown === selection) {
                const boundingHeight = this.$refs[refName]?.getBoundingClientRect().height + 8;

                const children = this.$refs["filter-content"]?.children || [];
                const totalChildrenHeight = Array.from(children).reduce((sum, child) => {
                    if (child.classList.contains('drop-down')) {
                        return sum + 61;
                    } else {
                        const style = window.getComputedStyle(child);
                        const marginTop = parseFloat(style.marginTop) || 0;
                        const marginBottom = parseFloat(style.marginBottom) || 0;

                        const childHeight = child.getBoundingClientRect().height;
                        const childHeightWithMargin = childHeight + marginTop + marginBottom;
                        return sum + childHeightWithMargin;
                    }
                }, 0);

                const computedStyle = window.getComputedStyle(this.$refs["filter-content"]);
                const parentPadding = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);

                const remainingSpaceInParent = window.innerHeight - totalChildrenHeight - parentPadding;
                // console.info(window.innerHeight, "-", totalChildrenHeight, "-", parentPadding, "=", remainingSpaceInParent);
                const chosenHeight = Math.min(remainingSpaceInParent, boundingHeight);
                // console.info("Chosen:", chosenHeight);

                return chosenHeight;
            } else {
                return 0;
            }
        },
        toggleDropdown(selection) {
            if (this.activeDropdown === selection) {
                this.activeDropdown = null; // Collapse if already active
            } else {
                this.activeDropdown = selection; // Activate the clicked dropdown
            }
        },
        toggleCounterpartySelection(counterparty) {
            const index = this.filterData.counterparty.selected.indexOf(counterparty);
            if (index === -1) {
                this.filterData.counterparty.selected.push(counterparty);
            } else {
                this.filterData.counterparty.selected.splice(index, 1);
            }
        },
        toggleTypeSelection(type) {
            const index = this.filterData.type.selected.indexOf(type);
            if (index === -1) {
                this.filterData.type.selected.push(type);
            } else {
                this.filterData.type.selected.splice(index, 1);
            }
        },
        applyFilters() {
            console.log(this.filterData);
        },
        getSliderValues() {
            const amountValues = this.$refs.amountSlider.noUiSlider.get();
            const dateValues = this.$refs.dateSlider.noUiSlider.get();
            console.log('Amount:', amountValues, 'Date:', dateValues);
        }
    },
    computed: {
        options() {
            return getFilters();
        },
        formatToDateMonth() {
            return {
                from: function (formattedValue) {
                    // Convert a formatted date string (e.g., "MM/DD/YYYY") to a timestamp (number)
                    return new Date(formattedValue).getTime(); 
                },
                to: function(numericValue) {
                    // Convert a timestamp to a short date format (e.g., "MM/DD/YYYY")
                    const date = new Date(numericValue);
                    const month = date.getMonth() + 1;  // Months are zero-indexed, so add 1
                    const year = date.getFullYear().toString().slice(-2);  // Get the last two digits of the year
                    return `${month}/${year}`;
                }
            };
        },
        formatToDate() {
            return {
                from: function (formattedValue) {
                    // Convert a formatted date string (e.g., "MM/DD/YYYY") to a timestamp (number)
                    return new Date(formattedValue).getTime(); 
                },
                to: function(numericValue) {
                    // Convert a timestamp to a short date format (e.g., "MM/DD/YYYY")
                    const date = new Date(numericValue);
                    const options = { 
                        year: 'numeric', 
                        month: '2-digit',
                        day: '2-digit'
                    };
                    return date.toLocaleDateString('fi-FI', options);
                }
            };
        },
        formatToAmount() {
            return {
                from: function (formattedValue) {
                    // The "from" function can parse the formatted value, if necessary
                    return formattedValue;
                },
                to: function(numericValue) {
                    // Round to two decimal places and append " €"
                    return (numericValue.toFixed(2)) + " €";
                }
            };
        },
        dateSliderPipValues() {
            const values = [];
            const start = new Date(this.options.date.min);
            const end = new Date(this.options.date.max);
            // Get the offset so that the months are shown every three months and so that it hits 1.1.yyyy
            const monthStep = 3;
            let offsetToModThree = (monthStep - (start.getMonth() % monthStep)) % monthStep;
            let currentMonth = new Date(
                start.getFullYear(), 
                start.getMonth() + offsetToModThree,
                1
            );

            while (currentMonth < end) {
                values.push(currentMonth.getTime());
                currentMonth.setMonth(currentMonth.getMonth() + monthStep);
            }

            return values;
        },
    },
    mounted() {
        // Disable scrolling when filters are open
        if (this.fullscreenMode) {
            document.documentElement.classList.add('no-scroll');
        }

        // Initialize Amount Slider
        noUiSlider.create(this.$refs.amountSlider, {
            start: [this.options.amount.min, this.options.amount.max],
            connect: true,
            behaviour: 'drag',
            range: {
                'min': this.options.amount.min,
                '50%': 0,
                'max': this.options.amount.max
            },
            pips: {
                mode: 'count',
                values: 5,
                density: 3,
                format: this.formatToAmount
            }
        });

        // Update filterData when slider changes
        this.$refs.amountSlider.noUiSlider.on('update', (values) => {
            this.filterData.amount.lowerLimit = parseFloat(values[0]);
            this.filterData.amount.upperLimit = parseFloat(values[1]);
        });
        // Update slider when changing min or max value
        this.$refs.amountMin.addEventListener('change', () => {
            this.$refs.amountSlider.noUiSlider.set([this.filterData.amount.lowerLimit, this.filterData.amount.upperLimit]);
        });
        this.$refs.amountMax.addEventListener('change', () => {
            this.$refs.amountSlider.noUiSlider.set([this.filterData.amount.lowerLimit, this.filterData.amount.upperLimit]);
        });


        // Initialize Date Slider
        noUiSlider.create(this.$refs.dateSlider, {
            start: [this.options.date.min, this.options.date.max],
            connect: true,
            behaviour: 'drag',
            range: {
                min: this.options.date.min,
                max: this.options.date.max
            },
            // Päivän kokonen step
            step: 1 * 24 * 60 * 60 * 1000,
            pips: {
                mode: 'values',
                values: this.dateSliderPipValues,
                density: 3,
                format: this.formatToDateMonth,
                stepped: true
            }
        });

        // Update filterData when slider changes
        this.$refs.dateSlider.noUiSlider.on('update', (values) => {
            // Update the filterData object
            this.filterData.date.lowerLimit = parseFloat(values[0]);
            this.filterData.date.upperLimit = parseFloat(values[1]);

            // Format the lower and upper date directly inline
            const lowerDate = new Date(this.filterData.date.lowerLimit);
            const upperDate = new Date(this.filterData.date.upperLimit);

            // Set the date values as YYYY-MM-DD format
            this.$refs.dateMin.value = `${lowerDate.getFullYear()}-${(lowerDate.getMonth() + 1).toString().padStart(2, '0')}-${lowerDate.getDate().toString().padStart(2, '0')}`;
            this.$refs.dateMax.value = `${upperDate.getFullYear()}-${(upperDate.getMonth() + 1).toString().padStart(2, '0')}-${upperDate.getDate().toString().padStart(2, '0')}`;
        });
        // Update slider and filterData when changing min or max value
        this.$refs.dateMin.addEventListener('change', () => {
            this.filterData.date.lowerLimit = new Date(this.$refs.dateMin.value).getTime();
            this.$refs.dateSlider.noUiSlider.set([this.filterData.date.lowerLimit, this.filterData.date.upperLimit]);
        });
        this.$refs.dateMax.addEventListener('change', () => {
            this.filterData.date.upperLimit = new Date(this.$refs.dateMax.value).getTime();
            this.$refs.dateSlider.noUiSlider.set([this.filterData.date.lowerLimit, this.filterData.date.upperLimit]);
        });

    },
    beforeUnmount() {
        document.documentElement.classList.remove('no-scroll');
    }
}
</script>


<style scoped>
.filter-backdrop {
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: var(--z-filters);
    pointer-events: all;
}

.filter-content {
    /* Nämä iso nounou hankkiudu eroon */
    /* Nämä iso nounou hankkiudu eroon */
    /* --filter-layout-default-height: 480px; Change when layout changes cause height to change */
    /* --filter-max-expansion: calc(100vh - var(--height-top-bar) - 480px - 20vh); */
    /* (Height - top bar offset - default height - the spacing that I want to have on top and bottom) */
    /* top: calc(var(--height-top-bar) + (100vh - var(--height-top-bar) - 480px - var(--filter-max-expansion)) / 2); */
    /* Top bar offset + (height - {default height} - top bar offset - max gained height) / 2 since its top portion */

    border-radius: 0;
    background-color: var(--color-background-card);
    padding: var(--spacing-md);
    cursor: auto;
    pointer-events: all;
    display: flex;
    position: absolute;
    flex-direction: column;
    overflow: hidden;

    width: 500px;
    max-width: calc(100vw - var(--spacing-md) * 2 - var(--spacing-hg)); /* window - padding - space I want on the right */
    left: 0;
    top: 0;
    bottom: 0;
    animation: fadeInFromLeft 0.3s ease-out;
}

.explanation {
    display: flex;
    flex-direction: column;
    /* border-top: solid 2px var(--color-border);
    border-bottom: solid 2px var(--color-border); */
    /* padding: var(--spacing-sm) 0; */
    /* margin: var(--spacing-xs) 0; */
    color: var(--color-text-light);
    font-style: italic;
}
.explanation span {
    display: flex;
    flex-direction: row;
}

h2 {
    margin-top: 0;
    margin-bottom: 0;
}

.amount-and-date-headers {
    margin-top: calc(var(--spacing-md));
    margin-bottom: var(--spacing-sm);    
}
.categories-header {
    margin-top: var(--spacing-sm);
}

.slider-wrapper {
    display: grid;
    grid-template-areas: "min max"
                         "slider slider";
}
.slider {
    margin-top: var(--spacing-md);
    margin-bottom: 44px;
    margin-inline: var(--spacing-md);
    grid-area: slider;
}
.slider-min-wrapper {
    grid-area: min;
    display: flex;
    justify-content: flex-start; /* Align input to the start of the wrapper */
    align-items: center;
}
.slider-max-wrapper {
    grid-area: max;
    display: flex;
    justify-content: flex-end; /* Align input to the end of the wrapper */
    align-items: center;
}
.slider-wrapper input[type="date"] {
    width: 140px;
}
.slider-wrapper input[type="number"] {
    width: 100px;
}

.drop-down-wrapper {
    padding: 0;

    border-width: 1px;
    border-style: solid;
    border-color: var(--color-border);
    border-radius: var(--border-radius-small);

}

.drop-down-header {
    background-color: var(--color-background-input);
    cursor: pointer;
    user-select: none;
    display: flex;
    flex-direction: row;
    
    margin: 0;
    padding: var(--spacing-sm);
    padding-left: var(--spacing-md);
    border-radius: var(--border-radius-small);

}
.drop-down-indicator {
    margin-left: 0;
    margin-right: 0;
    color: var(--color-text-lighter);
    transition: transform 0.2s ease-out;
}
.active .drop-down-indicator {
    transform: rotate(180deg);
}

.mode-flipper-in-header {
    height: 25px;
    display: flex;
    flex-direction: row;
    border-radius: var(--border-radius-small);
    background-color: var(--color-background-input-light);
    margin-inline: auto var(--spacing-sm);
    border: 1px solid var(--color-border);
}
.mode-flipper-in-header .flipper {
    height: inherit;
    aspect-ratio: 1;
    position: absolute;
    /* transition: transform 0.1s ease-out,
                border 0.1s ease-out; */
    backdrop-filter: saturate(0%) brightness(75%);
} 
.mode-flipper-in-header.exclude .flipper {
    transform: translateX(0);
    border-top-left-radius: var(--border-radius-small);
    border-bottom-left-radius: var(--border-radius-small);
} 
.mode-flipper-in-header.include .flipper {
    transform: translateX(25px);
    border-top-right-radius: var(--border-radius-small);
    border-bottom-right-radius: var(--border-radius-small);
}

.drop-down-content {
    height: 0;
    width: 100%;
    overflow: scroll;
    background-color: var(--color-background-input-light);

    border-bottom-left-radius: var(--border-radius-small);
    border-bottom-right-radius: var(--border-radius-small);
    transition: height 0.2s ease-out;
}
h5 {
    margin-top: var(--spacing-sm);
    margin-bottom: 0;
    margin-left: var(--spacing-md);
    font-size: var(--font-size-base);
}
.income-section {
    padding-bottom: var(--spacing-sm);
}

.option {
    cursor: pointer;
    transition: background-color 0.1s ease-out;
    display: flex;
    flex-direction: row;
    padding: var(--spacing-xs);
    padding-left: var(--spacing-sm);
    padding-right: var(--spacing-lg);
    user-select: none;
}
.option:hover {
    background-color: var(--color-background-tr-hover);
}

.apply {
    margin-top: var(--spacing-md);
    margin-bottom: 0;
}
</style>
