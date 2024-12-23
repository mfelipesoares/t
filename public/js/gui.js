

// Adiciona o comportamento a cada botão
guiButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Verifica se o botão já está ativo
        if (button.classList.contains('active')) {
            button.classList.remove('active'); // Volta para azul
        } else {
            button.classList.add('active'); // Permanece vermelho
        }
    });
});

const toggleButton = document.querySelector('#bt-config');
const drawer = document.querySelector('.drawer');
const overlay = document.querySelector('.overlay');

