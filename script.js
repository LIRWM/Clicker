const button = document.getElementById('clickButton');
const resetButton = document.getElementById('resetButton');
const countDisplay = document.getElementById('clickCount');
const recordDisplay = document.getElementById('recordCount');
const cpsDisplay = document.getElementById('clicksPerSecond');
let clicks = 0;
let record = localStorage.getItem('record') || 0;
let clickTimes = [];

recordDisplay.textContent = record;

const clickSound = new Audio('oksimiron-5.mp3');

button.addEventListener('click', function() {
    clicks += 1;
    clickTimes.push(Date.now());
    clickSound.currentTime = 0.05;
    clickSound.play();

    setTimeout(() => {
        clickSound.pause();
        clickSound.currentTime = 0.05;
    }, 3500);


    const oneSecondAgo = Date.now() - 1000;
    clickTimes = clickTimes.filter(time => time > oneSecondAgo);

    cpsDisplay.textContent = clickTimes.length;

    countDisplay.textContent = clicks;
    
    if (clicks > record) {
        record = clicks;
        recordDisplay.textContent = record;
        localStorage.setItem('record', record);
    }

    if (clicks >= 20) {
        countDisplay.style.color = '#ff0000';
    } else if (clicks >= 10) {
        countDisplay.style.color = '#4CAF50';
    }
  
    const achievements = {
        10: '🎉 Начинающий кликер!',
        50: '🌟 Продвинутый кликер!',
        100: '🏆 Мастер кликер!',
        200: '👑 Легендарный кликер!'
    };

    if (achievements[clicks]) {
        setTimeout(() => {
            alert(achievements[clicks]);
        }, 100);
    }

    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
});

resetButton.addEventListener('click', function() {
    clicks = 0;
    clickTimes = [];
    countDisplay.textContent = clicks;
    countDisplay.style.color = 'black';
    cpsDisplay.textContent = '0';
});