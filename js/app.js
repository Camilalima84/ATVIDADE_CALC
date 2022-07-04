// Variáveis
let currentInput = document.querySelector(".currentInput");
let answerScreen = document.querySelector(".answerScreen");
let buttons = document.querySelectorAll("button");
let erasebtn = document.querySelector("#erase");
let clearbtn = document.querySelector("#clear");
let evaluate = document.querySelector("#evaluate");

// Visor da calculadora
let realTimeScreenValue = [];

// Limpar
clearbtn.addEventListener("click", () => {
  realTimeScreenValue = [""];
  answerScreen.innerHTML = 0;
  currentInput.className = "currentInput";
  answerScreen.className = "answerScreen";
  answerScreen.style.color = "rgba(150, 150, 150, 0.87)";
});

const operations = [".", "%", "/", "*", "-"];

// Função anexada a todos os botões
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Se o botão clicado não é o botão de apagar

    if (!btn.id.match("erase")) {
      // Mostrar o valor do botão pressionado
      if (
        btn.classList.contains("fun_btn") &&
        !operations.some((item) => realTimeScreenValue.includes(item)) &&
        realTimeScreenValue.length > 0
      ) {
        realTimeScreenValue.push(btn.value);
      } else if (btn.classList.contains("num_btn")) {
        realTimeScreenValue.push(btn.value);
      }
      if (realTimeScreenValue.includes("/") && btn.value <= 0) {
        currentInput.innerHTML = "erro";
      } else {
        currentInput.innerHTML = realTimeScreenValue.join("");
      }

      // Executar e mostrar a resposta em tempo real
      if (btn.classList.contains("num_btn")) {
        answerScreen.innerHTML = eval(realTimeScreenValue.join(""));
      }
    }

    // Quando o evento for um botão
    if (btn.id.match("erase")) {
      realTimeScreenValue.pop();
      currentInput.innerHTML = realTimeScreenValue.join("");
      answerScreen.innerHTML = eval(realTimeScreenValue.join(""));
    }

    // Ao clicar em igual
    if (btn.id.match("evaluate")) {
      currentInput.className = "answerScreen";
      answerScreen.className = "currentInput";
      answerScreen.style.color = "white";
    }

    // Previnir erro de undefined
    if (typeof eval(realTimeScreenValue.join("")) == "undefined") {
      answerScreen.innerHTML = 0;
    }
  });
});
