// Variables for DOM elements
const settingsIcon = document.getElementById('settingsIcon');
const settingsPanel = document.getElementById('settingsPanel');
const frameRateInput = document.getElementById('frameRate');
const saveHistoryCheckbox = document.getElementById('saveHistory');
const usernameInput = document.getElementById('username');
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Initialize canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to toggle settings panel visibility
settingsIcon.addEventListener('click', () => {
    if (settingsPanel.style.display === 'none' || !settingsPanel.style.display) {
        settingsPanel.style.display = 'block';
    } else {
        settingsPanel.style.display = 'none';
    }
});

// Save settings to localStorage when any input changes
function saveSettings() {
    const settings = {
        frameRate: frameRateInput.value,
        saveHistory: saveHistoryCheckbox.checked,
        username: usernameInput.value
    };
    localStorage.setItem('purpleMazeSettings', JSON.stringify(settings));
}

// Load settings from localStorage on page load
function loadSettings() {
    const savedSettings = localStorage.getItem('purpleMazeSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        frameRateInput.value = settings.frameRate;
        saveHistoryCheckbox.checked = settings.saveHistory;
        usernameInput.value = settings.username;
    }
}

// Event listeners to save settings when changed
frameRateInput.addEventListener('input', saveSettings);
saveHistoryCheckbox.addEventListener('change', saveSettings);
usernameInput.addEventListener('input', saveSettings);

// Load settings on page load
loadSettings();

// Background animation variables
let frameCount = 0;
const lines = [];

// Function to create random lines
function createLine() {
    return {
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        alpha: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 2 + 1
    };
}

// Create initial set of lines
for (let i = 0; i < 50; i++) {
    lines.push(createLine());
}

// Function to draw the background lines
function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;

    lines.forEach(line => {
        ctx.strokeStyle = `rgba(148, 0, 211, ${line.alpha})`; // Glowing purple color
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();

        // Update line position
        line.x1 += (Math.random() - 0.5) * line.speed;
        line.y1 += (Math.random() - 0.5) * line.speed;
        line.x2 += (Math.random() - 0.5) * line.speed;
        line.y2 += (Math.random() - 0.5) * line.speed;

        // Reset line if it goes off screen
        if (line.x1 < 0 || line.x1 > canvas.width || line.y1 < 0 || line.y1 > canvas.height ||
            line.x2 < 0 || line.x2 > canvas.width || line.y2 < 0 || line.y2 > canvas.height) {
            Object.assign(line, createLine());
        }
    });

    frameCount++;
    requestAnimationFrame(drawBackground);
}

// Start the background animation
drawBackground();

// Adjust canvas size when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
