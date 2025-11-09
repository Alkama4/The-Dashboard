<template>
    <div 
        class="filter-backdrop backdrop" 
        :class="{'active': fullscreenMode}" 
        @mousedown.self="closeFiltersMouseDown()"
        @mouseup.self="closeFiltersMouseUp()"
    >
        <div class="filter-content" ref="filter-content">
            <h2>Filters</h2>

            <h4 class="amount-and-date-headers">Amount</h4>
            <div class="slider-wrapper">
                <div class="slider-min-wrapper">
                    <input v-model.number="localFilterData.amount.lowerLimit" type="number" ref="amountMin">
                </div>
                <div class="slider-max-wrapper">
                    <input v-model.number="localFilterData.amount.upperLimit" type="number" ref="amountMax">
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
                <h4 class="drop-down-header" @click.self="toggleDropdown('counterparty')">
                    Counterparties
                    <span @click="localFilterData.counterparty.mode = localFilterData.counterparty.mode === 'include' ? 'exclude' : 'include'" 
                        title="[Include only selected] / [Exclude selected]"
                        class="mode-flipper-in-header"
                        :class="{
                            'exclude': localFilterData.counterparty.mode === 'exclude',
                            'include': localFilterData.counterparty.mode === 'include'
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
                    <IconChevronDown 
                        color="var(--color-text-light)"
                        class="drop-down-indicator" 
                        :class="{'active': activeDropdown === 'counterparty'}"
                    />
                </h4>

                <div class="drop-down-content"
                    :style="{
                        height: filterDropDownHeight('counterparty') + 'px'
                    }">
                    <div ref="drop-down-content-counterparty">
                        <div class="expense-section">
                            <h5>Expense</h5>
                            <div v-for="(counterparty) in filterOptions.counterparty.expense" :key="'counterparty-expense-' + counterparty" class="option" @click="toggleCounterpartySelection(counterparty)">
                                <!-- Conditionally render checked or minus icon -->
                                <IconCheckboxChecked v-if="localFilterData.counterparty.selected.includes(counterparty) && localFilterData.counterparty.mode === 'include'" color="var(--color-primary)" colorHover="var(--color-primary-hover)"/>
                                <IconCheckboxMinus v-if="localFilterData.counterparty.selected.includes(counterparty) && localFilterData.counterparty.mode === 'exclude'" color="var(--color-negative)" colorHover="var(--color-negative-hover)"/>
                                <IconCheckbox v-if="!localFilterData.counterparty.selected.includes(counterparty)" color="var(--color-text-light)" />
                                {{ counterparty }}
                            </div>
                        </div>

                        <div class="income-section">
                            <h5>Income</h5>
                            <div v-for="(counterparty) in filterOptions.counterparty.income" :key="'counterparty-income-' + counterparty" class="option" @click="toggleCounterpartySelection(counterparty)">
                                <!-- Conditionally render checked or minus icon -->
                                <IconCheckboxChecked v-if="localFilterData.counterparty.selected.includes(counterparty) && localFilterData.counterparty.mode === 'include'" color="var(--color-primary)" colorHover="var(--color-primary-hover)"/>
                                <IconCheckboxMinus v-if="localFilterData.counterparty.selected.includes(counterparty) && localFilterData.counterparty.mode === 'exclude'" color="var(--color-negative)" colorHover="var(--color-negative-hover)"/>
                                <IconCheckbox v-if="!localFilterData.counterparty.selected.includes(counterparty)" color="var(--color-text-light)" />
                                {{ counterparty }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Categories -->
            <div class="drop-down drop-down-wrapper categories-header">
                <h4 class="drop-down-header" @click.self="toggleDropdown('category')">
                    Categories
                    <span @click="localFilterData.category.mode = localFilterData.category.mode === 'include' ? 'exclude' : 'include'" 
                        title="[Include only selected] / [Exclude selected]"
                        class="mode-flipper-in-header"
                        :class="{
                            'exclude': localFilterData.category.mode === 'exclude',
                            'include': localFilterData.category.mode === 'include'
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
                    <IconChevronDown 
                        color="var(--color-text-light)"
                        class="drop-down-indicator" 
                        :class="{'active': activeDropdown === 'category'}"
                    />
                </h4>

                <div class="drop-down-content"
                    :style="{
                        height: filterDropDownHeight('category') + 'px'
                    }">
                    <div ref="drop-down-content-category">
                        <div class="expense-section">
                            <h5>Expense</h5>
                            <div v-for="(category) in filterOptions.category.expense" :key="'category-expense-' + category" class="option" @click="toggleCategorySelection(category)">
                                <!-- Conditionally render checked or minus icon -->
                                <IconCheckboxChecked v-if="localFilterData.category.selected.includes(category) && localFilterData.category.mode === 'include'" color="var(--color-primary)" colorHover="var(--color-primary-hover)"/>
                                <IconCheckboxMinus v-if="localFilterData.category.selected.includes(category) && localFilterData.category.mode === 'exclude'" color="var(--color-negative)" colorHover="var(--color-negative-hover)"/>
                                <IconCheckbox v-if="!localFilterData.category.selected.includes(category)" color="var(--color-text-light)" />
                                {{ category }}
                            </div>
                        </div>
    
                        <div class="income-section">
                            <h5>Income</h5>
                            <div v-for="(category) in filterOptions.category.income" :key="'category-income-' + category" class="option" @click="toggleCategorySelection(category)">
                                <!-- Conditionally render checked or minus icon -->
                                <IconCheckboxChecked v-if="localFilterData.category.selected.includes(category) && localFilterData.category.mode === 'include'" color="var(--color-primary)" colorHover="var(--color-primary-hover)"/>
                                <IconCheckboxMinus v-if="localFilterData.category.selected.includes(category) && localFilterData.category.mode === 'exclude'" color="var(--color-negative)" colorHover="var(--color-negative-hover)"/>
                                <IconCheckbox v-if="!localFilterData.category.selected.includes(category)" color="var(--color-text-light)" />
                                {{ category }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="button-primary apply" @click="applyFilters()">Apply</button>
        </div>
    </div>
</template>

<script>
import IconCheckboxChecked from '@/components/icons/IconCheckboxChecked.vue';  
import IconCheckboxMinus from '@/components/icons/IconCheckboxMinus.vue';      
import IconCheckbox from '@/components/icons/IconCheckbox.vue';      
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
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
        fullscreenMode: {category: Boolean, default: false},
        filterData: {category: Object, default: {}},
        filterOptions: {category: Object, default: {}}
    },
    data() {
        return {
            activeDropdown: "",
            localFilterData: JSON.parse(JSON.stringify(this.filterData)), // Create a deep copy of filterData
            closeFiltersMouseisDown: false,
        }
    },
    methods: {
        closeFilters() {
            this.$emit("close");
        },
        closeFiltersMouseDown() {
            this.closeFiltersMouseisDown = true;
            // console.info("Mouse down");
        },
        closeFiltersMouseUp() {
            // console.info("testing", this.closeFiltersMouseisDown);
            if (this.closeFiltersMouseisDown) {
                // console.info("closing");
                this.closeFilters();  // Only close the filters if the mouse was down
                this.closeFiltersMouseisDown = false; // Reset the flag
            }
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
            const index = this.localFilterData.counterparty.selected.indexOf(counterparty);
            if (index === -1) {
                this.localFilterData.counterparty.selected.push(counterparty);
            } else {
                this.localFilterData.counterparty.selected.splice(index, 1);
            }
        },
        toggleCategorySelection(category) {
            const index = this.localFilterData.category.selected.indexOf(category);
            if (index === -1) {
                this.localFilterData.category.selected.push(category);
            } else {
                this.localFilterData.category.selected.splice(index, 1);
            }
        },
        applyFilters() {
            this.$emit('apply', this.localFilterData);
            console.log('[FilterSettings] Applied filters:', this.localFilterData);
        },
        getSliderValues() {
            const amountValues = this.$refs.amountSlider.noUiSlider.get();
            const dateValues = this.$refs.dateSlider.noUiSlider.get();
            console.log('Amount:', amountValues, 'Date:', dateValues);
        }
    },
    watch: {
        filterData: {
            handler(newVal) {
                this.localFilterData = JSON.parse(JSON.stringify(newVal)); // Update local copy when prop changes
            },
            deep: true
        }
    },
    computed: {
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
            const start = new Date(this.filterOptions.date.min);
            const end = new Date(this.filterOptions.date.max);
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
    async mounted() {
        // Disable scrolling when filters are open
        if (this.fullscreenMode) {
            document.documentElement.classList.add('no-scroll');
        }

        // Initialize Amount Slider
        noUiSlider.create(this.$refs.amountSlider, {
            start: [this.localFilterData.amount.lowerLimit, this.localFilterData.amount.upperLimit],
            connect: true,
            behaviour: 'drag',
            range: {
                'min': this.filterOptions.amount.min ? this.filterOptions.amount.min : 0 ,
                '50%': 0,
                'max': this.filterOptions.amount.max ? this.filterOptions.amount.max : 0 ,
            },
            pips: {
                mode: 'count',
                values: 5,
                density: 3,
                format: this.formatToAmount
            }
        });

        // Update localFilterData when slider changes
        this.$refs.amountSlider.noUiSlider.on('update', (values) => {
            this.localFilterData.amount.lowerLimit = parseFloat(values[0]);
            this.localFilterData.amount.upperLimit = parseFloat(values[1]);
        });
        // Update slider when changing min or max value
        this.$refs.amountMin.addEventListener('change', () => {
            this.$refs.amountSlider.noUiSlider.set([this.localFilterData.amount.lowerLimit, this.localFilterData.amount.upperLimit]);
        });
        this.$refs.amountMax.addEventListener('change', () => {
            this.$refs.amountSlider.noUiSlider.set([this.localFilterData.amount.lowerLimit, this.localFilterData.amount.upperLimit]);
        });


        // Initialize Date Slider
        // console.log("TEST", this.filterOptions.date.min, this.filterOptions.date.max)
        noUiSlider.create(this.$refs.dateSlider, {
            start: [this.localFilterData.date.lowerLimit, this.localFilterData.date.upperLimit],
            connect: true,
            behaviour: 'drag',
            range: {
                min: this.filterOptions.date.min ? this.filterOptions.date.min : new Date().getTime(),
                max: this.filterOptions.date.max ? this.filterOptions.date.max : new Date().getTime(),
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
        // console.log("TEST 2", this.filterOptions.date.min, this.filterOptions.date.max)

        // Update localFilterData when slider changes
        this.$refs.dateSlider.noUiSlider.on('update', (values) => {
            // Update the localFilterData object
            this.localFilterData.date.lowerLimit = parseFloat(values[0]);
            this.localFilterData.date.upperLimit = parseFloat(values[1]);

            // Format the lower and upper date directly inline
            const lowerDate = new Date(this.localFilterData.date.lowerLimit);
            const upperDate = new Date(this.localFilterData.date.upperLimit);

            // Set the date values as YYYY-MM-DD format
            this.$refs.dateMin.value = `${lowerDate.getFullYear()}-${(lowerDate.getMonth() + 1).toString().padStart(2, '0')}-${lowerDate.getDate().toString().padStart(2, '0')}`;
            this.$refs.dateMax.value = `${upperDate.getFullYear()}-${(upperDate.getMonth() + 1).toString().padStart(2, '0')}-${upperDate.getDate().toString().padStart(2, '0')}`;
        });
        // Update slider and localFilterData when changing min or max value
        this.$refs.dateMin.addEventListener('change', () => {
            this.localFilterData.date.lowerLimit = new Date(this.$refs.dateMin.value).getTime();
            this.$refs.dateSlider.noUiSlider.set([this.localFilterData.date.lowerLimit, this.localFilterData.date.upperLimit]);
        });
        this.$refs.dateMax.addEventListener('change', () => {
            this.localFilterData.date.upperLimit = new Date(this.$refs.dateMax.value).getTime();
            this.$refs.dateSlider.noUiSlider.set([this.localFilterData.date.lowerLimit, this.localFilterData.date.upperLimit]);
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
    max-width: calc(100vw - var(--spacing-md) * 2 - var(--spacing-xl)); /* window - padding - space I want on the right */
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
    border-radius: var(--border-radius-xs);

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
    border-radius: var(--border-radius-xs);

}
.drop-down-indicator {
    margin-left: 0;
    margin-right: 0;
    color: var(--color-text-lighter);
    transition: transform 0.2s ease-out;
}
.drop-down-indicator.active {
    transform: rotate(180deg);
}

.mode-flipper-in-header {
    height: 25px;
    display: flex;
    flex-direction: row;
    border-radius: var(--border-radius-xs);
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
    border-top-left-radius: var(--border-radius-xs);
    border-bottom-left-radius: var(--border-radius-xs);
} 
.mode-flipper-in-header.include .flipper {
    transform: translateX(25px);
    border-top-right-radius: var(--border-radius-xs);
    border-bottom-right-radius: var(--border-radius-xs);
}

.drop-down-content {
    height: 0;
    width: 100%;
    overflow: scroll;
    background-color: var(--color-background-input-light);

    border-bottom-left-radius: var(--border-radius-xs);
    border-bottom-right-radius: var(--border-radius-xs);
    transition: height 0.2s ease-out;
}
h5 {
    margin-top: var(--spacing-sm);
    margin-bottom: 0;
    margin-left: var(--spacing-md);
    font-size: var(--font-size-md);
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
    background-color: var(--color-background-card-hover);
}

.apply {
    margin-top: var(--spacing-md);
    margin-bottom: 0;
}
</style>
