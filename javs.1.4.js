
let letters = [];
let isGenerated = false;

function toggleGenerate() {
    const passageBox = document.getElementById("userPassage");
    const btn = document.getElementById("generateBtn");
    
    if (!isGenerated) {
        generateTest();
        passageBox.style.display = "none";
        btn.textContent = "Regenerate Test";
        isGenerated = true;
    } else {
        passageBox.style.display = "block";
        document.getElementById("passageOutput").innerHTML = "";
        document.getElementById("answersBox").style.display = "none";
        letters = [];
        btn.textContent = "Generate Test";
        isGenerated = false;
    }
}

function generateTest() {
    const passageText = document.getElementById("userPassage").value;
    const output = document.getElementById("passageOutput");
    output.innerHTML = "";
    letters = [];

    const words = passageText.split(/\s+/);

    words.forEach(word => {
        if (word.includes("_")) {
            const answer = word.replace(/_/g, "").toLowerCase();
            let prefixLength;

            if (answer.length <= 2) {
                prefixLength = 1; // کلمات خیلی کوتاه فقط یک حرف
            } else if (answer.length >= 6) {
                prefixLength = Math.floor(Math.random() * (answer.length - 2)) + 3; 
                // حداقل 3 حرف، حداکثر طول - 1
            } else {
                prefixLength = Math.floor(Math.random() * 3) + 1; // 1 تا 3 حرف برای بقیه
            }

            prefixLength = Math.min(prefixLength, answer.length - 1);
            const prefixText = answer.slice(0, prefixLength);
            const remaining = answer.slice(prefixLength);

            const span = document.createElement("span");
            span.classList.add("word");
            span.dataset.answer = answer;
            span.dataset.prefix = prefixLength;
            
            const prefix = document.createElement("span");
            prefix.classList.add("prefix");
            prefix.textContent = prefixText;
            span.appendChild(prefix);

            for (let i = 0; i < remaining.length; i++) {
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.classList.add("letter");
                span.appendChild(input);
                letters.push(input);
            }

            output.appendChild(span);
            output.appendChild(document.createTextNode(" "));
        } else {
            output.appendChild(document.createTextNode(word + " "));
        }
    });
}


document.addEventListener("input", e => {
    if (e.target.classList.contains("letter") && e.target.value.length === 1) {
        const i = letters.indexOf(e.target);
        if (letters[i+1]) letters[i+1].focus();
    }
});

document.addEventListener("keydown", e => {
    if (e.target.classList.contains("letter") && e.key === "Backspace") {
        const i = letters.indexOf(e.target);
        if (e.target.value === "" && letters[i-1]) {
            e.preventDefault();
            letters[i-1].value = "";
            letters[i-1].focus();
        }
    }
});

function checkAnswers() {
    const answersList = document.getElementById("answersList");
    answersList.innerHTML = "";
    document.querySelectorAll(".word").forEach(word => {
        const answer = word.dataset.answer.toLowerCase();
        const prefixLength = parseInt(word.dataset.prefix);
        const inputs = word.querySelectorAll(".letter");

        inputs.forEach((input, i) => {
            input.classList.remove("correct", "wrong", "empty");
            if (!input.value) {
                input.classList.add("empty");
            } else if (input.value.toLowerCase() === answer[prefixLength+i]) {
                input.classList.add("correct");
            } else {
                input.classList.add("wrong");
            }
        });

        const li = document.createElement("li");
        li.textContent = answer;
        answersList.appendChild(li);
    });

    document.getElementById("answersBox").style.display = "block";
}







