document.addEventListener('DOMContentLoaded', () => {
    var jsonData;
    var correctAnswer1;
    var correctAnswer2;
    var questionIndex = 0;
    var history = [];
    const options = {
        Cirrus: ['fibratus', 'uncinus', 'spissatus', 'castellanus', 'floccus'],
        Cirrostratus: ['fibratus', 'nebulosus'],
        Cirrocumulus: ['stratiformis', 'lenticularis', 'castellanus', 'floccus'],
        Altostratus: [''],
        Altocumulus: ['stratiformis', 'lenticularis', 'castellanus', 'floccus'],
        Stratus: ['nebulosus', 'fractus'],
        Stratocumulus: ['stratiformis', 'lenticularis', 'castellanus', 'floccus'],
        Nimbostratus: [''],
        Cumulus: ['humilis', 'mediocris', 'congestus'],
        Cumulonimbus: ['calvus', 'capillatus']
    };
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            console.log(jsonData);
            loadNewQuiz();
            document.getElementById('checkButton').addEventListener('click', () => {
                checkAnswers(data, questionIndex);
            });
            dropdown1.addEventListener('change', () => {
                const selectedValue = dropdown1.value;
                updateDropdown2(selectedValue);
            });
            document.getElementById('nextButton').addEventListener('click', () => {
                loadNewQuiz();
            });
            document.getElementById('showAnswerButton').addEventListener('click', () => {
                document.getElementById('answer').textContent = `Oikea vastaus: ${correctAnswer1} ${correctAnswer2}`;
            });
        });


    function updateDropdown2(selectedValue) {
        // Clear existing options
        dropdown2.innerHTML = '';
    
        // Populate new options based on the selected value of dropdown1
        options[selectedValue].forEach(option => {
            const newOption = document.createElement('option');
            newOption.value = option;
            newOption.textContent = option;
            dropdown2.appendChild(newOption);
        });
    }

    
    function loadNewQuiz() {
        questionIndex = Math.floor(Math.random() * jsonData.length);
        while (history.includes(questionIndex)) {
            questionIndex = Math.floor(Math.random() * jsonData.length);
        }
        history.push(questionIndex);
        if (history.length === jsonData.length) {
            history = [];
        }
        console.log(history);
        loadQuizData(jsonData, questionIndex);
        document.getElementById('result').textContent = '';
        document.getElementById('answer').textContent = '';
    }

    // Function to load quiz data into the UI
    function loadQuizData(data, index) {
        const imageElement = document.getElementById('image');
        imageElement.src = `static/${data[index].image_name}`; // Update the image based on the JSON file
        correctAnswer1 = data[index].correct_answer_1;
        correctAnswer2 = data[index].correct_answer_2;
    }

    // Function to check the selected answers against the correct answers in the JSON
    function checkAnswers() {
        const selectedAnswer1 = document.getElementById('dropdown1').value;
        const selectedAnswer2 = document.getElementById('dropdown2').value;

        const resultElement = document.getElementById('result');

        if (selectedAnswer1 === correctAnswer1 && selectedAnswer2 === correctAnswer2) {
            resultElement.textContent = 'Oikein!';
            resultElement.style.color = 'green';
        } else {
            resultElement.textContent = 'Väärä vastaus, yritä uudestaan.';
            resultElement.style.color = 'red';
        }
    }
    updateDropdown2(dropdown1.value);
});
