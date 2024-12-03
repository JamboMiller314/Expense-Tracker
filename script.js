// Store transactions
let transactions = [];

// Get DOM elements
const incomeDescription = document.getElementById('income-description');
const incomeAmount = document.getElementById('income-amount');
const expenseDescription = document.getElementById('expense-description');
const expenseCategory = document.getElementById('expense-category');
const expenseAmount = document.getElementById('expense-amount');
const transactionHistory = document.getElementById('transaction-history');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const balance = document.getElementById('balance');

// Add income function
function addIncome() {
    if (!incomeDescription.value || !incomeAmount.value) {
        alert('Please fill in all income fields');
        return;
    }

    const transaction = {
        id: Date.now(),
        description: incomeDescription.value,
        amount: parseFloat(incomeAmount.value),
        category: 'Income',
        type: 'Income'
    };

    transactions.push(transaction);
    updateTransactionHistory();
    updateSummary();
    clearIncomeInputs();
}

// Add expense function
function addExpense() {
    if (!expenseDescription.value || !expenseAmount.value) {
        alert('Please fill in all expense fields');
        return;
    }

    const transaction = {
        id: Date.now(),
        description: expenseDescription.value,
        amount: parseFloat(expenseAmount.value),
        category: expenseCategory.value,
        type: 'Expense'
    };

    transactions.push(transaction);
    updateTransactionHistory();
    updateSummary();
    clearExpenseInputs();
}

// Update transaction history
function updateTransactionHistory() {
    transactionHistory.innerHTML = '';
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td class="${transaction.type.toLowerCase()}">${transaction.type === 'Income' ? '+' : '-'}$${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td><button onclick="deleteTransaction(${transaction.id})">Delete</button></td>
        `;
        transactionHistory.appendChild(row);
    });
}

// Update summary
function updateSummary() {
    const income = transactions
        .filter(t => t.type === 'Income')
        .reduce((total, t) => total + t.amount, 0);
    
    const expenses = transactions
        .filter(t => t.type === 'Expense')
        .reduce((total, t) => total + t.amount, 0);
    
    totalIncome.textContent = income.toFixed(2);
    totalExpenses.textContent = expenses.toFixed(2);
    balance.textContent = (income - expenses).toFixed(2);
}

// Delete transaction
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateTransactionHistory();
    updateSummary();
}

// Clear income inputs
function clearIncomeInputs() {
    incomeDescription.value = '';
    incomeAmount.value = '';
}

// Clear expense inputs
function clearExpenseInputs() {
    expenseDescription.value = '';
    expenseAmount.value = '';
    expenseCategory.value = 'Housing';
}

// Clear all inputs and transactions
function clearInputs() {
    if (confirm('Are you sure you want to clear all transactions?')) {
        transactions = [];
        clearIncomeInputs();
        clearExpenseInputs();
        updateTransactionHistory();
        updateSummary();
    }
}
