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

document.querySelectorAll('.buyButton').forEach(button => {
    button.addEventListener('click', () => {
        const stockName = button.dataset.stock;
        const stockPrice = stockPrices[stockName];
        stockNameInput.value = stockName; // Preenche o nome da ação
        stockPriceInput.value = stockPrice; // Preenche o preço da ação
        quantityInput.focus(); // Foca no campo de quantidade para facilitar a entrada
    });
});

document.querySelectorAll('.sellButton').forEach(button => {
    button.addEventListener('click', () => {
        const stockName = button.dataset.stock;
        stockNameInput.value = stockName; // Preenche o nome da ação
        quantityInput.value = ''; // Limpa o campo de quantidade
        quantityInput.focus(); // Foca no campo de quantidade para facilitar a entrada
    });
});

const customStocks = []; // Array para armazenar ações criadas
const customPrices = []; // Array para armazenar preços das ações criadas

// Inicialização do gráfico de ações criadas (agora como gráfico de linhas)
const ctx = document.getElementById('customChart').getContext('2d');
const customChart = new Chart(ctx, {
    type: 'line', // Mudando para gráfico de linhas
    data: {
        labels: customStocks,
        datasets: [{
            label: 'Preço das Ações Criadas',
            data: customPrices,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true // Preencher a área sob a linha
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
// Função para adicionar uma nova ação à lista
function addStockToList(stockName, stockPrice) {
    const stockList = document.querySelector('.stock-list ul');
    const newStockItem = document.createElement('li');
    newStockItem.innerHTML = `${stockName} - $${stockPrice} <button class="buyButton" data-stock="${stockName}">Comprar</button> <button class="sellButton" data-stock="${stockName}">Vender</button>`;
    stockList.appendChild(newStockItem);
}

// Evento para o botão "Criar Ação"
document.getElementById('createStockButton').addEventListener('click', function() {
    const newStockName = document.getElementById('newStockName').value.trim();
    const newStockPrice = document.getElementById('newStockPrice').value.trim();

    // Verifica se os campos estão preenchidos corretamente
    if (newStockName === '' || newStockPrice === '' || isNaN(newStockPrice) || newStockPrice <= 0) {
        alert('Por favor, insira um nome e um preço válidos para a ação.');
        return;
    }

    // Adiciona a nova ação à lista
    addStockToList(newStockName, parseFloat(newStockPrice).toFixed(2));

    // Adiciona a nova ação e preço ao gráfico
    customStocks.push(newStockName); // Adiciona o nome da nova ação
    customPrices.push(parseFloat(newStockPrice).toFixed(2)); // Adiciona o preço da nova ação

    // Atualiza o gráfico
    customChart.data.labels = customStocks; // Atualiza os rótulos do gráfico
    customChart.data.datasets[0].data = customPrices; // Atualiza os dados do gráfico
    customChart.update(); // Atualiza o gráfico

    // Limpa os campos de entrada
    document.getElementById('newStockName').value = '';
    document.getElementById('newStockPrice').value = '';
});

// Seleciona todos os elementos de ação
const stockElements = document.querySelectorAll('.stock-list li');

// Define a frequência de atualização dos preços (em segundos)
const updateFrequency = 10;

// Define a amplitude de variação dos preços (em porcentagem)
const priceVariationAmplitude = 20;

// Função para atualizar os preços das ações
function updateStockPrices() {
    stockElements.forEach((stockElement) => {
        const stockName = stockElement.querySelector('button[data-stock]').dataset.stock;
        const currentPriceElement = stockElement.querySelector('span.price');
        const currentPrice = parseFloat(currentPriceElement.textContent.replace('$', '')); // Remove o símbolo de dólar
        const variation = (Math.random() * priceVariationAmplitude) - (priceVariationAmplitude / 2);
        const newPrice = currentPrice + (currentPrice * (variation / 30));
        currentPriceElement.textContent = `$${newPrice.toFixed(2)}`; // Atualiza o preço com o símbolo de dólar
    });
}

// Atualiza os preços das ações a cada X segundos
setInterval(updateStockPrices, updateFrequency * 250);

