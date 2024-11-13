function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Inicializa a tela inicial
document.addEventListener('DOMContentLoaded', () => {
    showScreen('home');
});