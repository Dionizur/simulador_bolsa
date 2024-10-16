// Criar um gráfico com Chart.js
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Preço da Ação',
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

// Simular dados de preço da ação
let stockPriceData = [];
setInterval(() => {
    const randomPrice = Math.random() * 100;
    stockPriceData.push(randomPrice);
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(randomPrice);
    chart.update();
}, 1000);

// Adicionar evento de compra e venda
document.getElementById('buyButton').addEventListener('click', () => {
    // Lógica de compra aqui
    console.log('Comprar');
});

document.getElementById('sellButton').addEventListener('click', () => {
    // Lógica de venda aqui
    console.log('Vender');
});