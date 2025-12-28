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

            if (answer.length <= 3) {
                prefixLength = 1; // کلمات کوتاه فقط یک حرف اول
            } else if (answer.length > 6) {
                // کلمات طولانی حداقل 3 حرف اول
                prefixLength = Math.floor(Math.random() * 2) + 3; // 3 یا 4 حرف اول
                prefixLength = Math.min(prefixLength, answer.length - 1);
            } else {
                // کلمات متوسط 4 تا 6 حرف، 1 تا 3 حرف اول
                prefixLength = Math.floor(Math.random() * 3) + 1;
                prefixLength = Math.min(prefixLength, answer.length - 1);
            }

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
