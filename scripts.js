// Eleementos DOM
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const resultEl = document.getElementById("result");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const generateSound = new Audio("generate.wav");
const copySound = new Audio("copy.wav");


// Canvas Matrix
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァイィウヴエカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }, () => 1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff40";
  ctx.font = fontSize + "px VT323";

  drops.forEach((y, i) => {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    const x = i * fontSize;
    ctx.fillText(text, x, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(drawMatrix, 33);

// controle de volume

const bgMusic = document.getElementById("bg-music");
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");
bgMusic.volume = volumeSlider.value;

volumeSlider.addEventListener("input", () => {
  bgMusic.volume = volumeSlider.value;

  if (bgMusic.volume == 0) {
    volumeIcon.src = "sound-off.svg";
  } else {
    volumeIcon.src = "sound-on.svg";
  }
});

volumeIcon.addEventListener("click", () => {
  if (bgMusic.volume > 0) {
    bgMusic.volume = 0;
    volumeSlider.value = 0;
    volumeIcon.src = "sound-off.svg";
  } else {
    bgMusic.volume = 1;
    volumeSlider.value = 1;
    volumeIcon.src = "sound-on.svg";
  }
});


// Geração de senha
function generatePassword(length, upper, lower, number, symbol) {
  const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerSet = "abcdefghijklmnopqrstuvwxyz";
  const numberSet = "0123456789";
  const symbolSet = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let all = "";
  if (upper) all += upperSet;
  if (lower) all += lowerSet;
  if (number) all += numberSet;
  if (symbol) all += symbolSet;

  if (all.length === 0) return "Selecione pelo menos uma opção!";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += all.charAt(Math.floor(Math.random() * all.length));
  }
  return password;
}

// Atualiza valor visual do slider
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Geração de senha com efeitos
generateBtn.addEventListener("click", () => {
  const length = parseInt(lengthSlider.value);
  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNumber = document.getElementById("numbers").checked;
  const useSymbol = document.getElementById("symbols").checked;

  const password = generatePassword(length, useUpper, useLower, useNumber, useSymbol);
  resultEl.textContent = password;

  document.body.classList.add("flash");
  generateSound.play();

  setTimeout(() => {
    document.body.classList.remove("flash");
  }, 200);
});

// Copiar senhha com som
copyBtn.addEventListener("click", () => {
  const password = resultEl.textContent;
  if (!password || password === "Sua senha vai aparecer aqui" || password === "Selecione pelo menos uma opção!") return;

  navigator.clipboard.writeText(password).then(() => {
    copySound.play();
  });
});

// Efeitos CRT
function startCRTEffects() {
  const body = document.body;

  setInterval(() => {
    body.classList.add("crt-flicker");
    setTimeout(() => body.classList.remove("crt-flicker"), 100);
  }, 3000);

  setInterval(() => {
    body.classList.add("crt-pulse");
    setTimeout(() => body.classList.remove("crt-pulse"), 150);
  }, 5000);

  setInterval(() => {
    if (Math.random() < 0.2) {
      body.classList.add("crt-glitch");
      setTimeout(() => body.classList.remove("crt-glitch"), 200);
    }
  }, 4000);
}

startCRTEffects();

// Flash 
setInterval(() => {
  if (Math.random() > 0.95) {
    document.body.classList.add("flash");
    setTimeout(() => document.body.classList.remove("flash"), 100);
  }
}, 800);

// Música de fundo com fallback
window.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bg-music");

  bgMusic.play().catch(() => {
    window.addEventListener("click", () => {
      bgMusic.play();
    }, { once: true });
  });
});

const title = document.getElementById("title");
if (title) {
  title.setAttribute("data-text", title.textContent);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'));
}
