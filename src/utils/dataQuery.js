export function getData() {
    return [
        {
            entryId: 1,
            direction: "expense",
            date: new Date('2023-08-24'),
            counterparty: "Cotton Club",
            categories: [{ category: "Opiskelija lounas", amount: 2.9 }],
            notes: "Hernekeittoa"
        },
        {
            entryId: 2,
            direction: "income",
            date: new Date('2023-12-28'),
            counterparty: "Kela",
            categories: [
                { category: "Asumistuki", amount: 99.99 },
                { category: "Opintotuki", amount: 80 }
            ],
            notes: ""
        },
        {
            entryId: 3,
            direction: "expense",
            date: new Date('2023-12-25'),
            counterparty: "K-Citymarket",
            categories: [{ category: "Yleinen eläminen", amount: 8.75 }],
            notes: "Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan"
        },
        {
            entryId: 4,
            direction: "expense",
            date: new Date('2023-12-28'),
            counterparty: "Minimani",
            categories: [{ category: "Ruokaostokset", amount: 20.24 }],
            notes: "safkaa"
        },
        {
            entryId: 8,
            direction: "expense",
            date: new Date('2023-12-26'),
            counterparty: "Supermarket",
            categories: [
                { category: "Sekalainen", amount: 25 },
                { category: "Ruokaostokset", amount: 14.23 },
                { category: "Herkut", amount: 6.39 }
            ],
            notes: "Vähään kaikkea kulutustavarasta ruoasta herkkuihin."
        },
        {
            entryId: 5,
            direction: "expense",
            date: new Date('2023-12-29'),
            counterparty: "Cotton Club",
            categories: [{ category: "Kulutustavara", amount: 12.46 }],
            notes: "Hyvää ruokaa"
        },
        {
            entryId: 6,
            direction: "expense",
            date: new Date('2023-12-31'),
            counterparty: "S-Market",
            categories: [
                { category: "Herkut", amount: 1.99 },
                { category: "Ruokaostokset", amount: 9.34 },
            ],
            notes: "Mässy pussi"
        },
        {
            entryId: 7,
            direction: "expense",
            date: new Date('2024-1-1'),
            counterparty: "Minimani",
            categories: [{ category: "Ruokaostokset", amount: 15.96 }],
            notes: "Ruokaa ja palaa"
        },
        {
            entryId: 9,
            direction: "expense",
            date: new Date('2024-1-3'),
            counterparty: "K-Citymarket",
            categories: [{ category: "Ruokaostokset", amount: 4.84 }],
            notes: "Jotaki safkaa"
        },
        {
            entryId: 10,
            direction: "expense",
            date: new Date('2024-12-24'),
            counterparty: "Parturi Hannele-Kallio",
            categories: [{ category: "Parturi", amount: 900.67 }],
            notes: "Jotaki safkaa"
        },
    ];
}

export function getOptions() {
    const data = getData();

    // Count the occurrences of each counterparty
    const counterpartyCount = data.reduce((acc, entry) => {
        acc[entry.counterparty] = (acc[entry.counterparty] || 0) + 1;
        return acc;
    }, {});

    // Count the occurrences of each category
    const categoryCount = data.reduce((acc, entry) => {
        entry.categories.forEach(category => {
            acc[category.category] = (acc[category.category] || 0) + 1;
        });
        return acc;
    }, {});

    // Sort the counterparty entries by frequency
    const sortedCounterparties = Object.entries(counterpartyCount)
        .sort((a, b) => b[1] - a[1])  // Sort by count, descending
        .map(entry => entry[0]);  // Return only the counterparty names

    // Sort the category entries by frequency
    const sortedCategories = Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1])  // Sort by count, descending
        .map(entry => entry[0]);  // Return only the category names

    return { sortedCounterparties, sortedCategories };
}


export function getFilters() {
    const data = getData();

    // Separate data by direction (expense vs income)
    const groupedByDirection = data.reduce(
        (acc, entry) => {
            acc[entry.direction].push(entry);
            return acc;
        },
        { expense: [], income: [] } // Initialize groups for both directions
    );

    // Helper function to count occurrences of each entry (counterparty or category)
    const countOccurrences = (entries, keyExtractor) => {
        return entries.reduce((acc, entry) => {
            const keys = keyExtractor(entry);
            keys.forEach(key => {
                acc[key] = (acc[key] || 0) + 1;
            });
            return acc;
        }, {});
    };

    // Helper function to calculate min and max for a key
    const calculateMinMax = (entries, valueExtractor) => {
        const values = entries.map(valueExtractor);
        return {
            min: Math.min(...values),
            max: Math.max(...values)
        };
    };

    // Process the entries for both expense and income directions
    const processGroup = (entries, isExpense) => {
        const counterpartyCount = countOccurrences(entries, (entry) => [entry.counterparty]);
        const categoryCount = countOccurrences(entries, (entry) => entry.categories.map(category => category.category));

        // Calculate total amount for each entry
        const totalAmounts = entries.map(entry =>
            entry.categories.reduce((sum, category) => sum + category.amount, 0)
        );

        // Adjust amounts for expenses (negative) or income (positive)
        const adjustedAmounts = totalAmounts.map(amount =>
            isExpense ? -Math.abs(amount) : Math.abs(amount)
        );

        const { min: minAmount, max: maxAmount } = calculateMinMax(adjustedAmounts, amount => amount);
        const { min: minDate, max: maxDate } = calculateMinMax(entries, entry => entry.date.getTime());

        return {
            counterparty: counterpartyCount,
            category: categoryCount,
            minAmount,
            maxAmount,
            minDate: new Date(minDate),
            maxDate: new Date(maxDate)
        };
    };

    // Process the data for expense and income
    const expenseData = processGroup(groupedByDirection.expense, true);
    const incomeData = processGroup(groupedByDirection.income, false);

    // Structuring the final result
    return {
        counterparty: {
            expense: Object.entries(expenseData.counterparty)
                .sort((a, b) => b[1] - a[1])
                .map(entry => entry[0]),

            income: Object.entries(incomeData.counterparty)
                .sort((a, b) => b[1] - a[1])
                .map(entry => entry[0])
        },

        category: {
            expense: Object.entries(expenseData.category)
                .sort((a, b) => b[1] - a[1])
                .map(entry => entry[0]),

            income: Object.entries(incomeData.category)
                .sort((a, b) => b[1] - a[1])
                .map(entry => entry[0])
        },

        amount: {
            min: Math.min(expenseData.minAmount, incomeData.minAmount),
            max: Math.max(expenseData.maxAmount, incomeData.maxAmount)
        },

        date: {
            min: Math.min(expenseData.minDate, incomeData.minDate),
            max: Math.max(expenseData.maxDate, incomeData.maxDate)
        }
    };
}
