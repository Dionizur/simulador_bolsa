const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line', // tipo do gráfico
    data: {
        labels: ['Jan', 'Fev', 'Mar'], // rótulos
        datasets: [{
            label: 'Vendas',
            data: [12, 19, 3], // valores
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
