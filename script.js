document.addEventListener('DOMContentLoaded', () => {
    let isRunning = false;
    let timer;
    let workDuration = 25 * 60;  // Duración del trabajo en segundos (25 minutos)
    let breakDuration = 5 * 60;  // Duración del descanso en segundos (5 minutos)
    let currentDuration = workDuration;
    let isBreak = false;  // Variable para controlar si estamos en un descanso o en trabajo

    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const breakButton = document.getElementById('break');
    const workButton = document.getElementById('work');
    const workInput = document.getElementById('work-duration');
    const breakInput = document.getElementById('break-duration');
    const saveButton = document.getElementById('save-settings');

    // Elemento de video
    const endVideo = document.getElementById('end-video');

    function updateDisplay() {
        const minutes = Math.floor(currentDuration / 60);
        const seconds = currentDuration % 60;
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(() => {
                if (currentDuration > 0) {
                    currentDuration--;
                    updateDisplay();
                } else {
                    // Cambiar entre trabajo y descanso cuando el temporizador llega a 0
                    isBreak = !isBreak;
                    currentDuration = isBreak ? breakDuration : workDuration;

                    // Reproducir el video cuando el ciclo finaliza
                    endVideo.style.display = 'block'; // Mostrar el video
                    endVideo.play(); // Reproducir el video automáticamente

                    // Cuando el video termina, ocultarlo y continuar
                    endVideo.onended = () => {
                        endVideo.style.display = 'none'; // Ocultar el video
                        updateDisplay(); // Actualizar el temporizador para el siguiente ciclo
                    };
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        isRunning = false;
        clearInterval(timer);
    }

    function resetTimer() {
        pauseTimer();
        currentDuration = isBreak ? breakDuration : workDuration;
        updateDisplay();
    }

    function startBreak() {
        isBreak = true;
        currentDuration = breakDuration;
        updateDisplay();
        startTimer();
    }

    function startWork() {
        isBreak = false;
        currentDuration = workDuration;
        updateDisplay();
        startTimer();
    }

    function saveSettings() {
        workDuration = parseInt(workInput.value) * 60;
        breakDuration = parseInt(breakInput.value) * 60;
        resetTimer();
    }

    // Agregamos los event listeners a los botones
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    breakButton.addEventListener('click', startBreak);
    workButton.addEventListener('click', startWork);
    saveButton.addEventListener('click', saveSettings);

    // Listener de errores para el video (opcional)
    endVideo.addEventListener('error', (e) => {
        console.error('Error al cargar el video: ', e);
    });

    // Inicializamos la pantalla del temporizador
    updateDisplay();
});
