// 1. Nossos dados do Quiz

const questions = [

    {

        question: "O que significa CSS?",

        options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax"],

        answer: "Cascading Style Sheets"

    },

    {

        question: "Qual tag HTML é usada para criar um link?",

        options: ["<link>", "<a>", "<href>"],

        answer: "<a>"

    },

    {

        question: "Como você seleciona um elemento com id 'exemplo' em JavaScript?",

        options: ["document.query('#exemplo')", "document.getElementById('exemplo')", "getElement('exemplo')"],

        answer: "document.getElementById('exemplo')"

    }

];

 

// 2. Variáveis de estado

let currentQuestionIndex = 0;

let score = 0;

 

// 3. Seletores do DOM

const questionEl = document.getElementById('question');

const optionsContainer = document.getElementById('options-container');

const submitBtn = document.getElementById('submit-btn');

const resultEl = document.getElementById('result');

 

// 4. Iniciar o Quiz

loadQuestion();

 

// 5. Ouvinte do botão

submitBtn.addEventListener('click', checkAnswer);

 

// 6. Função para carregar a pergunta

function loadQuestion() {

    resultEl.textContent = ''; // Limpa o resultado anterior

    const currentQuestion = questions[currentQuestionIndex];

    questionEl.textContent = currentQuestion.question;

    optionsContainer.innerHTML = ''; // Limpa opções anteriores

    currentQuestion.options.forEach(option => {

        // Cria o <label> que vai conter o rádio e o texto

        const label = document.createElement('label');

        label.className = 'option';

       

        // Cria o <input type="radio">

        const radio = document.createElement('input');

        radio.type = 'radio';

        radio.name = 'quiz';

        radio.value = option;

        label.appendChild(radio);

        label.appendChild(document.createTextNode(option)); // Adiciona o texto

        optionsContainer.appendChild(label);

    });

}

 

// 7. Função para checar a resposta

function checkAnswer() {

    // Achar o rádio que foi selecionado

    const selectedOption = document.querySelector('input[name="quiz"]:checked');

   

    // Se nada foi selecionado, não faz nada

    if (!selectedOption) {

        resultEl.textContent = 'Por favor, selecione uma opção.';

        resultEl.style.color = 'red';

        return;

    }

 

    const answer = selectedOption.value;

    const correctAnswer = questions[currentQuestionIndex].answer;

   

    // Dar feedback visual

    Array.from(optionsContainer.children).forEach(label => {

        const input = label.querySelector('input');

        if (input.value === correctAnswer) {

            label.classList.add('correct');

        } else if (input.value === answer) {

            label.classList.add('incorrect');

        }

    });

 

    // Atualizar pontuação e feedback

    if (answer === correctAnswer) {

        score++;

        resultEl.textContent = 'Correto!';

        resultEl.style.color = 'green';

    } else {

        resultEl.textContent = `Errado! A resposta correta é: ${correctAnswer}`;

        resultEl.style.color = 'red';

    }

 

    // Desabilitar o botão para evitar cliques duplos

    submitBtn.disabled = true;

 

    // Ir para a próxima pergunta ou mostrar resultado final

    setTimeout(() => {

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {

            loadQuestion();

            submitBtn.disabled = false; // Reabilita o botão

        } else {

            showFinalResults();

        }

    }, 2000); // Espera 2 segundos antes de avançar

}

 

function showFinalResults() {

    questionEl.textContent = 'Quiz Concluído!';

    optionsContainer.innerHTML = '';

    submitBtn.style.display = 'none'; // Esconde o botão

    resultEl.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;

    resultEl.style.color = 'black';

}