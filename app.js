const quizData = [
    {
        question: "Apa kepanjangan dari HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlink Text Mode Language"
        ],
        correct: 0
    },
    {
        question: "CSS digunakan untuk?",
        options: [
            "Struktur halaman",
            "Styling halaman",
            "Logika program",
            "Database"
        ],
        correct: 1
    },
    {
        question: "Apa fungsi JavaScript pada website?",
        options: [
            "Membuat database",
            "Mengatur server",
            "Membuat halaman interaktif",
            "Mengganti sistem operasi"
        ],
        correct: 2
    },
    {
        question: "DOM merupakan singkatan dari?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Object Method",
            "Document Online Manager"
        ],
        correct: 0
    },
    {
        question: "Method untuk memilih satu elemen dengan CSS selector adalah?",
        options: [
            "querySelector()",
            "queryAll()",
            "selectElement()",
            "getSelector()"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressEl = document.getElementById("progress");
const scoreDisplay = document.getElementById("score-display");

const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const restartBtn = document.getElementById("restartBtn");


// MENAMPILKAN SOAL
function renderQuestion() {

    const soal = quizData[currentQuestion];

    progressEl.textContent =
        `Soal ${currentQuestion + 1}/${quizData.length}`;

    scoreDisplay.textContent =
        `Skor: ${score}`;

    questionEl.textContent = soal.question;

    // Hapus pilihan sebelumnya
    optionsEl.innerHTML = "";

    // Buat tombol jawaban
    soal.options.forEach((jawaban, index) => {

        const button = document.createElement("button");

        button.textContent = jawaban;

        button.classList.add("option-btn");

        button.dataset.index = index;

        optionsEl.appendChild(button);
    });

    nextBtn.classList.add("hidden");
}


// EVENT DELEGATION
optionsEl.addEventListener("click", function(event) {

    const button = event.target.closest(".option-btn");

    if (!button) {
        return;
    }

    const jawabanDipilih = Number(button.dataset.index);

    const jawabanBenar =
        quizData[currentQuestion].correct;

    const semuaButton =
        optionsEl.querySelectorAll(".option-btn");

    // Matikan semua tombol
    semuaButton.forEach(function(btn) {
        btn.disabled = true;
    });

    // JAWABAN BENAR
    if (jawabanDipilih === jawabanBenar) {

        button.classList.add("correct");

        score++;

        scoreDisplay.textContent =
            `Skor: ${score}`;

    }

    // JAWABAN SALAH
    else {

        button.classList.add("wrong");

        // Tandai jawaban yang benar
        semuaButton[jawabanBenar]
            .classList.add("correct");
    }

    // Munculkan tombol berikutnya
    nextBtn.classList.remove("hidden");
});


// TOMBOL NEXT
nextBtn.addEventListener("click", function() {

    currentQuestion++;

    if (currentQuestion < quizData.length) {

        renderQuestion();

    } else {

        showResult();
    }
});


// HASIL
function showResult() {

    const total = quizData.length;

    const percentage =
        Math.round((score / total) * 100);

    scoreEl.textContent =
        `${score}/${total} (${percentage}%)`;

    const highScore =
        Number(localStorage.getItem("quizHighScore")) || 0;

    if (percentage > highScore) {

        localStorage.setItem(
            "quizHighScore",
            percentage
        );

        highScoreEl.textContent =
            `${percentage}% 🎉 Rekor Baru!`;

    } else {

        highScoreEl.textContent =
            `${highScore}%`;
    }

    document
        .querySelector(".quiz-content")
        .classList.add("hidden");

    resultEl.classList.remove("hidden");
}


// RESTART
restartBtn.addEventListener("click", function() {

    currentQuestion = 0;
    score = 0;

    resultEl.classList.add("hidden");

    document
        .querySelector(".quiz-content")
        .classList.remove("hidden");

    renderQuestion();
});


// JALANKAN QUIZ
renderQuestion();