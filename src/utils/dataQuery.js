import axios from 'axios';
import { notify } from './notification';

const apiClient = axios.create({
    baseURL: 'http://192.168.0.2:801', // Your FastAPI base URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const api = {
    // Data requested from the api
    async getData(endpoint) {
        try {
            const response = await apiClient.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            notify('Error fetching data: ' + error.message, 'error', 5000);
        }
    },
    async getTransactions() {
        return this.getData('/get_transactions');
    },
    async getOptions() {
        return this.getData('/get_options');
    },
    async getFilters() {
        return this.getData('/get_filters');
    },

    // Data sent to the api
    async postData(endpoint, data) {
        try {
            const response = await apiClient.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
            notify('Error posting data: ' + error.message, 'error', 5000);
        }
    },

};

export default api;

// export function getFilters() {
//     const data = getData();

//     // Separate data by direction (expense vs income)
//     const groupedByDirection = data.reduce(
//         (acc, entry) => {
//             acc[entry.direction].push(entry);
//             return acc;
//         },
//         { expense: [], income: [] } // Initialize groups for both directions
//     );

//     // Helper function to count occurrences of each entry (counterparty or category)
//     const countOccurrences = (entries, keyExtractor) => {
//         return entries.reduce((acc, entry) => {
//             const keys = keyExtractor(entry);
//             keys.forEach(key => {
//                 acc[key] = (acc[key] || 0) + 1;
//             });
//             return acc;
//         }, {});
//     };

//     // Helper function to calculate min and max for a key
//     const calculateMinMax = (entries, valueExtractor) => {
//         const values = entries.map(valueExtractor);
//         return {
//             min: Math.min(...values),
//             max: Math.max(...values)
//         };
//     };

//     // Process the entries for both expense and income directions
//     const processGroup = (entries, isExpense) => {
//         const counterpartyCount = countOccurrences(entries, (entry) => [entry.counterparty]);
//         const categoryCount = countOccurrences(entries, (entry) => entry.categories.map(category => category.category));

//         // Calculate total amount for each entry
//         const totalAmounts = entries.map(entry =>
//             entry.categories.reduce((sum, category) => sum + category.amount, 0)
//         );

//         // Adjust amounts for expenses (negative) or income (positive)
//         const adjustedAmounts = totalAmounts.map(amount =>
//             isExpense ? -Math.abs(amount) : Math.abs(amount)
//         );

//         const { min: minAmount, max: maxAmount } = calculateMinMax(adjustedAmounts, amount => amount);
//         const { min: minDate, max: maxDate } = calculateMinMax(entries, entry => entry.date.getTime());

//         return {
//             counterparty: counterpartyCount,
//             category: categoryCount,
//             minAmount,
//             maxAmount,
//             minDate: new Date(minDate),
//             maxDate: new Date(maxDate)
//         };
//     };

//     // Process the data for expense and income
//     const expenseData = processGroup(groupedByDirection.expense, true);
//     const incomeData = processGroup(groupedByDirection.income, false);

//     // Structuring the final result
//     return {
//         counterparty: {
//             expense: Object.entries(expenseData.counterparty)
//                 .sort((a, b) => b[1] - a[1])
//                 .map(entry => entry[0]),

//             income: Object.entries(incomeData.counterparty)
//                 .sort((a, b) => b[1] - a[1])
//                 .map(entry => entry[0])
//         },

//         category: {
//             expense: Object.entries(expenseData.category)
//                 .sort((a, b) => b[1] - a[1])
//                 .map(entry => entry[0]),

//             income: Object.entries(incomeData.category)
//                 .sort((a, b) => b[1] - a[1])
//                 .map(entry => entry[0])
//         },

//         amount: {
//             min: Math.min(expenseData.minAmount, incomeData.minAmount),
//             max: Math.max(expenseData.maxAmount, incomeData.maxAmount)
//         },

//         date: {
//             min: Math.min(expenseData.minDate, incomeData.minDate),
//             max: Math.max(expenseData.maxDate, incomeData.maxDate)
//         }
//     };
// }
