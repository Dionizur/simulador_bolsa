document.addEventListener('DOMContentLoaded', () => {
    const portfolio = [];
    const stockPrices = {
        AAPL: 150,
        GOOGL: 2800,
        MSFT: 300,
        AMZN: 3500,
        FB: 350,
        TSLA: 800,
        NFLX: 600,
        DIS: 180,
        NVDA: 220,
        PYPL: 250,
        AMD: 100,
        BABA: 150
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

        if (stockName && !isNaN(stockPrice) && !isNaN(quantity) && quantity > 0) {
            const totalCost = stockPrice * quantity; // Calcular o custo total
            portfolio.push({ stockName, stockPrice, quantity, totalCost }); // Armazenar o custo total
            updatePortfolio();
            updateChart();
            alert(`Você comprou ${quantity} ações de ${stockName} por um total de $${totalCost.toFixed(2)}.`);
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });

    sellPortfolioButton.addEventListener('click', () => {
        const stockName = stockNameInput.value;
        const quantity = parseInt(quantityInput.value);

        if (stockName && !isNaN(quantity) && quantity > 0) {
            const stockIndex = portfolio.findIndex(stock => stock.stockName === stockName);
            if (stockIndex > -1 && portfolio[stockIndex].quantity >= quantity) {
                portfolio[stockIndex].quantity -= quantity;
                if (portfolio[stockIndex].quantity === 0) {
                    portfolio.splice(stockIndex, 1);
                }
                updatePortfolio();
                updateChart();
            } else {
                alert('Erro: Estoque insuficiente ou ação não encontrada.');
            }
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });

    function updatePortfolio() {
        portfolioList.innerHTML = '';
        portfolio.forEach(stock => {
            const listItem = document.createElement('li');
            listItem.textContent = `${stock.stockName} - Preço: $${stock.stockPrice} - Quantidade: ${stock.quantity} - Total: $${(stock.stockPrice * stock.quantity).toFixed(2)}`;
            portfolioList.appendChild(listItem);
        });
    }

    function updateChart() {
        if (!chart) {
            chart = new Chart(chartCanvas, {
                type: 'line', // Mantendo o estilo como 'line'
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Valor Total Investido',
                        data: [],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
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

        chart.data.labels = portfolio.map(stock => stock.stockName);
        chart.data.datasets[0].data = portfolio.map(stock => stock.totalCost); // Mostrando o valor total investido
        chart.update();
    }
});