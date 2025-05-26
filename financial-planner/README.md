# JS Labs Financial Planner

A modern, responsive personal finance tracker built with vanilla HTML, CSS, and JavaScript.

## Features

- ✅ **Income & Expense Tracking** - Add and manage financial transactions
- ✅ **Multi-Currency Support** - Support for ZAR and USD with automatic conversion
- ✅ **Real-time Analytics** - View spending by category and income sources
- ✅ **Data Export** - Export your financial data to CSV format
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✅ **Clean Interface** - Modern, intuitive user experience

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/financial-planner.git
cd financial-planner
```

2. Open `index.html` in your web browser:
```bash
open index.html
```

Or simply double-click the `index.html` file.

## Usage

### Adding Income
1. Fill in the income form in the left sidebar
2. Enter description, date, amount, and currency
3. Click "Add Income" to save

### Adding Expenses
1. Fill in the expense form in the left sidebar
2. Select a category, enter description, date, amount, and currency
3. Click "Add Expense" to save

### Viewing Analytics
- Switch between Income, Expenses, and Analytics tabs
- View categorized breakdowns of your spending
- Monitor your savings rate and net income

### Exporting Data
- Click the "Export CSV" button in the header
- Download includes all income and expense entries
- Compatible with Excel, Google Sheets, and other spreadsheet applications

## Project Structure

```
financial-planner/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All CSS styles
├── js/
│   └── app.js          # Application logic
├── assets/             # Future assets (images, icons)
└── README.md           # Project documentation
```

## Currency Support

- **ZAR (South African Rand)** - Primary currency
- **USD (US Dollar)** - Automatically converted to ZAR at a fixed rate
- Exchange rate: 1 USD = 18.50 ZAR (configurable in `js/app.js`)

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Data persistence with localStorage
- [ ] Budget planning and tracking
- [ ] Data visualization with charts
- [ ] Multiple account support
- [ ] Recurring transaction templates
- [ ] Import from bank statements

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**JS Labs** - Personal Finance Solutions

---

*Built with ❤️ using vanilla JavaScript*