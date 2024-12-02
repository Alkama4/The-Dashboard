export function getData() {
    return [
        {
            entryId: 1,
            direction: "expense",
            date: new Date('2023-12-24'),
            counterparty: "Cotton Club",
            types: [{ type: "Opiskelija lounas", amount: 2.9 }],
            notes: "Hernekeittoa"
        },
        {
            entryId: 2,
            direction: "income",
            date: new Date('2023-12-28'),
            counterparty: "Kela",
            types: [
                { type: "Asumistuki", amount: 99.99 },
                { type: "Opintotuki", amount: 80 }
            ],
            notes: ""
        },
        {
            entryId: 3,
            direction: "expense",
            date: new Date('2023-12-25'),
            counterparty: "K-Citymarket",
            types: [{ type: "Yleinen eläminen", amount: 8.75 }],
            notes: "Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan"
        },
        {
            entryId: 4,
            direction: "expense",
            date: new Date('2023-12-28'),
            counterparty: "Minimani",
            types: [{ type: "Ruokaostokset", amount: 20.24 }],
            notes: "safkaa"
        },
        {
            entryId: 8,
            direction: "expense",
            date: new Date('2023-12-26'),
            counterparty: "Supermarket",
            types: [
                { type: "Sekalainen", amount: 25 },
                { type: "Ruokaostokset", amount: 14.23 },
                { type: "Herkut", amount: 6.39 }
            ],
            notes: "Vähään kaikkea kulutustavarasta ruoasta herkkuihin."
        },
        {
            entryId: 5,
            direction: "expense",
            date: new Date('2023-12-29'),
            counterparty: "Cotton Club",
            types: [{ type: "Kulutustavara", amount: 12.46 }],
            notes: "Hyvää ruokaa"
        },
        {
            entryId: 6,
            direction: "expense",
            date: new Date('2023-12-31'),
            counterparty: "S-Market",
            types: [
                { type: "Herkut", amount: 1.99 },
                { type: "Ruokaostokset", amount: 9.34 },
            ],
            notes: "Mässy pussi"
        },
        {
            entryId: 7,
            direction: "expense",
            date: new Date('2024-1-1'),
            counterparty: "Minimani",
            types: [{ type: "Ruokaostokset", amount: 15.96 }],
            notes: "Ruokaa ja palaa"
        },
        {
            entryId: 9,
            direction: "expense",
            date: new Date('2024-1-3'),
            counterparty: "K-Citymarket",
            types: [{ type: "Ruokaostokset", amount: 4.84 }],
            notes: "Jotaki safkaa"
        },
        {
            entryId: 10,
            direction: "expense",
            date: new Date('2024-2-2'),
            counterparty: "Parturi Hannele-Kallio",
            types: [{ type: "Parturi", amount: 2345.67 }],
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

    // Count the occurrences of each type
    const typeCount = data.reduce((acc, entry) => {
        entry.types.forEach(type => {
            acc[type.type] = (acc[type.type] || 0) + 1;
        });
        return acc;
    }, {});

    // Sort the counterparty entries by frequency
    const sortedCounterparties = Object.entries(counterpartyCount)
        .sort((a, b) => b[1] - a[1])  // Sort by count, descending
        .map(entry => entry[0]);  // Return only the counterparty names

    // Sort the type entries by frequency
    const sortedTypes = Object.entries(typeCount)
        .sort((a, b) => b[1] - a[1])  // Sort by count, descending
        .map(entry => entry[0]);  // Return only the type names

    return { sortedCounterparties, sortedTypes };
}
