const portfolio = [];
const stockPrices = {
    AAPL: 150,
    GOOGL: 2800,
    MSFT: 300,
    AMZN: 3500,
    FB: 350,
    TSLA: 800,
    NFLX: 600,
    DIS: 180
};

const portfolioList = document.getElementById('portfolio');
const stockNameInput = document.getElementById('stockName');
const stockPriceInput = document.getElementById('stockPrice');
const quantityInput = document.getElementById('quantity');
const buyPortfolioButton = document.getElementById('buyPortfolioButton');
const sellPortfolioButton = document.getElementById('sellPortfolioButton');
const chartCanvas = document.getElementById('chart');

let chart; 


document.querySelectorAll('.buyButton').forEach(button => {
    button.addEventListener('click', () => {
        const stockName = button.dataset.stock;
        const stockPrice = stockPrices[stockName];
        stockNameInput.value = stockName;
        stockPriceInput.value = stockPrice;
        quantityInput.focus();
    });
});


document.querySelectorAll('.sellButton').forEach(button => {
    button.addEventListener('click', () => {
        const stockName = button.dataset.stock;
        stockNameInput.value = stockName;
        quantityInput.value = '';
        quantityInput.focus();
    });
});


buyPortfolioButton.addEventListener('click', () => {
    const stockName = stockNameInput.value;
    const stockPrice = parseFloat(stockPriceInput.value);
    const quantity = parseInt(quantityInput.value);

    if (stockName && stockPrice && quantity) {
        portfolio.push({ stockName, stockPrice, quantity });
        updatePortfolio();
        updateChart();
    }
});


sellPortfolioButton.addEventListener('click', () => {
    const stockName = stockNameInput.value;
    const quantity = parseInt(quantityInput.value);

    const stockIndex = portfolio.findIndex(stock => stock.stockName === stockName);
    if (stockIndex > -1 && portfolio[stockIndex].quantity >= quantity) {
        portfolio[stockIndex].quantity -= quantity;
        if (portfolio[stockIndex].quantity === 0) {
            portfolio.splice(stockIndex, 1);
        }
        updatePortfolio();
        updateChart();
    }
});

function updatePortfolio() {
    portfolioList.innerHTML = '';
    portfolio.forEach(stock => {
        const listItem = document.createElement('li');
        listItem.textContent = `${stock.stockName} - Preço: ${stock.stockPrice} - Quantidade: ${stock.quantity}`;
        portfolioList.appendChild(listItem);
    });
}

function updateChart() {
    if (!chart) {
        chart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Preço das Ações',
                    data: [],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const chartData = portfolio.map(stock => stock.stockPrice);
    const chartLabels = portfolio.map(stock => stock.stockName);

    chart.data.labels = chartLabels;
    chart.data.datasets[0].data = chartData;
    chart.update(); // Atualize o gráfico com os novos dados
}