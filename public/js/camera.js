// Mic status
let micEnabled = true;
// Mic button element
const micBtnEle = document.getElementById('mic-btn');

// Camera status
let cameraEnabled = false;
// Camera button element
const cameraBtnEle = document.getElementById('camera-btn');

// Screen share status
let screenEnabled = false;
// Screen share button element
const screenBtnEle = document.getElementById('screen-btn');

// On mobile remove elements that are resource heavy
const isMobile = AFRAME.utils.device.isMobile();

if (isMobile) {
    const particles = document.getElementById('particles');
    particles.parentNode.removeChild(particles);
}
const guiButtons = document.querySelectorAll('.gui');
const toggleButton = document.querySelector('#bt-config');
const drawer = document.querySelector('.drawer');
const overlay = document.querySelector('.overlay');

// Abre o drawer e exibe o fundo escuro ao clicar no botão
toggleButton.addEventListener('click', () => {
    drawer.classList.add('open');
    overlay.classList.add('visible');
});

// Fecha o drawer ao clicar fora dele
overlay.addEventListener('click', () => {
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
});




// Called by Networked-Aframe when connected to server
function onConnect() {
    console.log('onConnect', new Date());
    // Lida com o mic ao clique do botão (Mute and Unmute)
    micBtnEle.addEventListener('click', function () {
        NAF.connection.adapter.enableMicrophone(!micEnabled);
        micEnabled = !micEnabled;
        if (micBtnEle.classList.contains('active')) {
            micBtnEle.classList.remove('active'); // Volta para azul
        } else {
            micBtnEle.classList.add('active'); // Permanece vermelho
        }

    });

    // Handle camera button click (Off and On)
    cameraBtnEle.addEventListener('click', function () {
        NAF.connection.adapter.enableCamera(!cameraEnabled);
        cameraEnabled = !cameraEnabled;
        let camera = document.getElementById('webcam-avatar');
        if(cameraEnabled){
            camera.setAttribute('visible', 'false');
        }else{
            camera.setAttribute('visible', 'true');
        }
        if (cameraBtnEle.classList.contains('active')) {
            cameraBtnEle.classList.remove('active'); // Volta para azul
        } else {
            cameraBtnEle.classList.add('active'); // Permanece vermelho
        }
    });

    // Handle screen button click (Off and On)
    screenBtnEle.addEventListener('click', function () {
        if (screenBtnEle.classList.contains('active')) {
            screenBtnEle.classList.remove('active'); // Volta para azul
        } else {
            screenBtnEle.classList.add('active'); // Permanece vermelho
        }
        if (screenEnabled) {
            NAF.connection.adapter.removeLocalMediaStream('screen');
            screenEnabled = false;
            let tela = document.getElementById('tela');
            tela.setAttribute('visible', 'false');
            screenBtnEle.textContent = 'Compartilhar Tela';
        } else {
            navigator.mediaDevices.getDisplayMedia().then((stream) => {
                NAF.connection.adapter.addLocalMediaStream(stream, 'screen');
                stream.getVideoTracks().forEach((track) => {
                    track.addEventListener(
                        'ended',
                        () => {
                            NAF.connection.adapter.removeLocalMediaStream('screen');
                            screenEnabled = false;
                            NAF.
                                screenBtnEle.textContent = 'Compartilhar Tela';
                            let tela = document.getElementById('tela');
                            tela.setAttribute('visible', 'false');
                        },
                        { once: true }
                    );
                });
                screenEnabled = true;
                let tela = document.getElementById('tela');
                tela.setAttribute('visible', 'true');
                screenBtnEle.textContent = 'Parar de Compartilhar';
            });
        }
    });
}
