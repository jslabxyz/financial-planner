// Data storage
let data = {
    income: [],
    expenses: [],
    categories: [
        { name: 'Housing', icon: '🏠', subcategories: ['Rent', 'Mortgage', 'Utilities', 'Maintenance'] },
        { name: 'Transportation', icon: '🚗', subcategories: ['Petrol', 'Public Transport', 'Maintenance', 'Insurance'] },
        { name: 'Food', icon: '🍔', subcategories: ['Groceries', 'Restaurants', 'Takeaway', 'Coffee'] },
        { name: 'Utilities', icon: '⚡', subcategories: ['Electricity', 'Water', 'Internet', 'Phone'] },
        { name: 'Healthcare', icon: '🏥', subcategories: ['Doctor', 'Medicine', 'Insurance', 'Dental'] },
        { name: 'Entertainment', icon: '🎬', subcategories: ['Movies', 'Games', 'Sports', 'Subscriptions'] },
        { name: 'Shopping', icon: '🛍️', subcategories: ['Clothing', 'Electronics', 'Home', 'Personal'] },
        { name: 'Education', icon: '📚', subcategories: ['Books', 'Courses', 'Training', 'Materials'] },
        { name: 'Other', icon: '📦', subcategories: ['Miscellaneous'] }
    ]
};

const USD_TO_ZAR = 18.50;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('incomeDate').value = today;
    document.getElementById('expenseDate').value = today;
    
    // Load categories
    loadCategories();
    updateOverview();
});

// Load categories into dropdown
function loadCategories() {
    const categorySelect = document.getElementById('expenseCategory');
    categorySelect.innerHTML = '<option value="">Select category...</option>';
    
    data.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = `${category.icon} ${category.name}`;
        categorySelect.appendChild(option);
    });
}

// Load subcategories based on selected category
function loadSubcategories(categoryName) {
    const subcategorySelect = document.getElementById('expenseSubcategory');
    const subcategoryGroup = document.getElementById('subcategoryGroup');
    
    if (!categoryName) {
        subcategoryGroup.style.display = 'none';
        return;
    }

    const category = data.categories.find(cat => cat.name === categoryName);
    if (category && category.subcategories.length > 0) {
        subcategoryGroup.style.display = 'block';
        subcategorySelect.innerHTML = '<option value="">Select subcategory...</option>';
        
        category.subcategories.forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory;
            option.textContent = subcategory;
            subcategorySelect.appendChild(option);
        });
    } else {
        subcategoryGroup.style.display = 'none';
    }
}

// Handle category selection change
document.getElementById('expenseCategory').addEventListener('change', function() {
    loadSubcategories(this.value);
});

// Get category icon
function getCategoryIcon(categoryName) {
    const category = data.categories.find(cat => cat.name === categoryName);
    return category ? category.icon : '📦';
}

// Format currency
function formatCurrency(amount, currency = 'ZAR') {
    const symbol = currency === 'USD' ? '$' : 'R';
    return `${symbol}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

// Convert currency
function convertToZAR(amount, currency) {
    return currency === 'USD' ? amount * USD_TO_ZAR : amount;
}

// Update overview metrics
function updateOverview() {
    const totalIncome = data.income.reduce((sum, item) => sum + item.amountZAR, 0);
    const totalExpenses = data.expenses.reduce((sum, item) => sum + item.amountZAR, 0);
    const netIncome = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((netIncome / totalIncome) * 100) : 0;

    document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('totalExpenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('netIncome').textContent = formatCurrency(netIncome);
    document.getElementById('savingsRate').textContent = savingsRate.toFixed(1) + '%';

    document.getElementById('incomeChange').textContent = `${data.income.length} entries`;
    document.getElementById('expenseChange').textContent = `${data.expenses.length} entries`;

    // Update net income styling
    const netElement = document.getElementById('netIncome');
    if (netIncome >= 0) {
        netElement.style.color = 'var(--success)';
    } else {
        netElement.style.color = 'var(--danger)';
    }
}

// Add income
function addIncome() {
    const description = document.getElementById('incomeDescription').value.trim();
    const date = document.getElementById('incomeDate').value;
    const amount = parseFloat(document.getElementById('incomeAmount').value);
    const currency = document.getElementById('incomeCurrency').value;

    if (!description || !date || isNaN(amount) || amount <= 0) {
        alert('Please fill in all fields with valid values');
        return;
    }

    const income = {
        id: Date.now(),
        description,
        date,
        amount,
        currency,
        amountZAR: convertToZAR(amount, currency)
    };

    data.income.push(income);
    
    // Clear form
    document.getElementById('incomeDescription').value = '';
    document.getElementById('incomeAmount').value = '';
    
    updateOverview();
    updateIncomeList();
    updateAnalytics();
}

// Add expense
function addExpense() {
    const description = document.getElementById('expenseDescription').value.trim();
    const category = document.getElementById('expenseCategory').value;
    const subcategory = document.getElementById('expenseSubcategory').value;
    const date = document.getElementById('expenseDate').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const currency = document.getElementById('expenseCurrency').value;
    const frequency = document.getElementById('expenseFrequency').value;

    if (!description || !category || !date || isNaN(amount) || amount <= 0) {
        alert('Please fill in all fields with valid values');
        return;
    }

    const expense = {
        id: Date.now(),
        description,
        category,
        subcategory: subcategory || null,
        date,
        amount,
        currency,
        frequency,
        amountZAR: convertToZAR(amount, currency)
    };

    data.expenses.push(expense);
    
    // Clear form
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseCategory').value = '';
    document.getElementById('expenseSubcategory').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseFrequency').value = 'once';
    document.getElementById('subcategoryGroup').style.display = 'none';
    
    updateOverview();
    updateExpensesList();
    updateAnalytics();
}

// Delete income
function deleteIncome(id) {
    if (confirm('Delete this income entry?')) {
        data.income = data.income.filter(item => item.id !== id);
        updateOverview();
        updateIncomeList();
        updateAnalytics();
    }
}

// Delete expense
function deleteExpense(id) {
    if (confirm('Delete this expense entry?')) {
        data.expenses = data.expenses.filter(item => item.id !== id);
        updateOverview();
        updateExpensesList();
        updateAnalytics();
    }
}

// Update income list
function updateIncomeList() {
    const incomeList = document.getElementById('incomeList');

    if (data.income.length === 0) {
        incomeList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💰</div>
                <p>No income entries yet. Add your first income to get started!</p>
            </div>
        `;
        return;
    }

    const sortedIncome = [...data.income].sort((a, b) => new Date(b.date) - new Date(a.date));

    incomeList.innerHTML = sortedIncome.map(income => {
        const displayAmount = income.currency === 'USD' 
            ? `<div class="amount-primary">${formatCurrency(income.amountZAR)}</div>
               <div class="amount-secondary">${formatCurrency(income.amount, 'USD')}</div>`
            : `<div class="amount-primary">${formatCurrency(income.amount)}</div>`;

        return `
            <div class="entry-item">
                <div class="entry-info">
                    <div class="entry-icon" style="background: #10b98120; color: #10b981;">
                        💰
                    </div>
                    <div class="entry-details">
                        <div class="entry-name">${income.description}</div>
                        <div class="entry-meta">${new Date(income.date).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="entry-amount">
                    ${displayAmount}
                </div>
                <button class="btn btn-sm btn-danger" onclick="deleteIncome(${income.id})">Delete</button>
            </div>
        `;
    }).join('');
}

// Update expenses list
function updateExpensesList() {
    const expensesList = document.getElementById('expensesList');

    if (data.expenses.length === 0) {
        expensesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💸</div>
                <p>No expense entries yet. Add your first expense to start tracking!</p>
            </div>
        `;
        return;
    }

    const sortedExpenses = [...data.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    expensesList.innerHTML = sortedExpenses.map(expense => {
        const displayAmount = expense.currency === 'USD' 
            ? `<div class="amount-primary">${formatCurrency(expense.amountZAR)}</div>
               <div class="amount-secondary">${formatCurrency(expense.amount, 'USD')}</div>`
            : `<div class="amount-primary">${formatCurrency(expense.amount)}</div>`;

        const categoryIcon = getCategoryIcon(expense.category);
        const subcategoryText = expense.subcategory ? ` • ${expense.subcategory}` : '';
        const frequencyText = expense.frequency !== 'once' ? ` • ${expense.frequency}` : '';

        return `
            <div class="entry-item">
                <div class="entry-info">
                    <div class="entry-icon" style="background: #ef444420; color: #ef4444;">
                        ${categoryIcon}
                    </div>
                    <div class="entry-details">
                        <div class="entry-name">${expense.description}</div>
                        <div class="entry-meta">${expense.category}${subcategoryText}${frequencyText} • ${new Date(expense.date).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="entry-amount">
                    ${displayAmount}
                </div>
                <button class="btn btn-sm btn-danger" onclick="deleteExpense(${expense.id})">Delete</button>
            </div>
        `;
    }).join('');
}

// Update analytics
function updateAnalytics() {
    updateCategoryBreakdown();
    updateIncomeBreakdown();
}

// Update category breakdown
function updateCategoryBreakdown() {
    const categoryBreakdown = document.getElementById('categoryBreakdown');
    
    if (data.expenses.length === 0) {
        categoryBreakdown.innerHTML = '<div class="empty-state"><p>Add expenses to see breakdown</p></div>';
        return;
    }

    // Group expenses by category
    const categoryTotals = {};
    data.expenses.forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amountZAR;
    });

    const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];

    const sortedCategories = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount], index) => ({
            category,
            amount,
            percentage: (amount / totalExpenses * 100).toFixed(1),
            color: colors[index % colors.length],
            icon: getCategoryIcon(category)
        }));

    categoryBreakdown.innerHTML = sortedCategories.map(item => `
        <div class="category-item">
            <div class="category-info">
                <div class="category-dot" style="background: ${item.color}"></div>
                <span>${item.icon} ${item.category}</span>
            </div>
            <div>
                <span class="category-amount">${formatCurrency(item.amount)}</span>
                <span class="category-percentage">${item.percentage}%</span>
            </div>
        </div>
    `).join('');
}

// Update income breakdown
function updateIncomeBreakdown() {
    const incomeBreakdown = document.getElementById('incomeBreakdown');
    
    if (data.income.length === 0) {
        incomeBreakdown.innerHTML = '<div class="empty-state"><p>Add income to see breakdown</p></div>';
        return;
    }

    // Group income by description
    const incomeSources = {};
    data.income.forEach(income => {
        if (!incomeSources[income.description]) {
            incomeSources[income.description] = {
                total: 0,
                count: 0
            };
        }
        incomeSources[income.description].total += income.amountZAR;
        incomeSources[income.description].count++;
    });

    const totalIncome = Object.values(incomeSources).reduce((sum, source) => sum + source.total, 0);
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4'];

    const sortedSources = Object.entries(incomeSources)
        .sort((a, b) => b[1].total - a[1].total)
        .map(([source, data], index) => ({
            source,
            total: data.total,
            count: data.count,
            percentage: (data.total / totalIncome * 100).toFixed(1),
            color: colors[index % colors.length]
        }));

    incomeBreakdown.innerHTML = sortedSources.map(item => `
        <div class="category-item">
            <div class="category-info">
                <div class="category-dot" style="background: ${item.color}"></div>
                <span>${item.source}</span>
            </div>
            <div>
                <span class="category-amount">${formatCurrency(item.total)}</span>
                <span class="category-percentage">${item.percentage}%</span>
            </div>
        </div>
    `).join('');
}

// Switch tabs
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    event.target.classList.add('active');
    if (tabName === 'income') {
        document.getElementById('incomeTab').classList.add('active');
    } else if (tabName === 'expenses') {
        document.getElementById('expensesTab').classList.add('active');
    } else if (tabName === 'analytics') {
        document.getElementById('analyticsTab').classList.add('active');
    }
    
    // Update specific tab content
    if (tabName === 'income') {
        updateIncomeList();
    } else if (tabName === 'expenses') {
        updateExpensesList();
    } else if (tabName === 'analytics') {
        updateAnalytics();
    }
}

// Modal functions
function openAddCategoryModal() {
    document.getElementById('categoryModal').classList.add('active');
    document.getElementById('newCategoryName').focus();
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
    document.getElementById('newCategoryName').value = '';
    document.getElementById('newCategoryIcon').value = '';
}

function addNewCategory() {
    const name = document.getElementById('newCategoryName').value.trim();
    const icon = document.getElementById('newCategoryIcon').value.trim() || '📦';

    if (!name) {
        alert('Please enter a category name');
        return;
    }

    // Check if category already exists
    if (data.categories.find(cat => cat.name.toLowerCase() === name.toLowerCase())) {
        alert('Category already exists');
        return;
    }

    data.categories.push({
        name: name,
        icon: icon,
        subcategories: []
    });

    loadCategories();
    closeCategoryModal();
}

function openAddSubcategoryModal() {
    const selectedCategory = document.getElementById('expenseCategory').value;
    if (!selectedCategory) {
        alert('Please select a category first');
        return;
    }
    document.getElementById('subcategoryModal').classList.add('active');
    document.getElementById('newSubcategoryName').focus();
}

function closeSubcategoryModal() {
    document.getElementById('subcategoryModal').classList.remove('active');
    document.getElementById('newSubcategoryName').value = '';
}

function addNewSubcategory() {
    const selectedCategory = document.getElementById('expenseCategory').value;
    const subcategoryName = document.getElementById('newSubcategoryName').value.trim();

    if (!subcategoryName) {
        alert('Please enter a subcategory name');
        return;
    }

    const category = data.categories.find(cat => cat.name === selectedCategory);
    if (category) {
        // Check if subcategory already exists
        if (category.subcategories.includes(subcategoryName)) {
            alert('Subcategory already exists');
            return;
        }

        category.subcategories.push(subcategoryName);
        loadSubcategories(selectedCategory);
        closeSubcategoryModal();
    }
}

// Close modals when clicking outside
document.getElementById('categoryModal').addEventListener('click', function(e) {
    if (e.target === this) closeCategoryModal();
});

document.getElementById('subcategoryModal').addEventListener('click', function(e) {
    if (e.target === this) closeSubcategoryModal();
});

// Export to CSV
function exportToCSV() {
    let csv = 'Type,Description,Category,Subcategory,Date,Amount,Currency,Amount (ZAR),Frequency\n';
    
    // Add income entries
    data.income.forEach(income => {
        csv += `Income,"${income.description}",,,,"${income.date}",${income.amount},${income.currency},${income.amountZAR},\n`;
    });
    
    // Add expense entries
    data.expenses.forEach(expense => {
        csv += `Expense,"${expense.description}","${expense.category}","${expense.subcategory || ''}","${expense.date}",${expense.amount},${expense.currency},${expense.amountZAR},${expense.frequency}\n`;
    });
    
    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'financial-data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}