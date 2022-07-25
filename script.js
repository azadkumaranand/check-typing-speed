let inputField = document.querySelector('.inputField');
let typingField = document.querySelector('.typing_content p');
let accuracyValue = document.querySelector('.accuracyvalue');
let scroll_text = document.getElementById('scroll_text');
let timeValue = document.querySelector('.timevalue');
let wpmValue = document.querySelector('.wpmvalue');
let charIndex = mistake = flag = chekctime = 0;
let maxtime = 60;
let timeLimit = maxtime;
document.addEventListener("keydown", () => inputField.focus());
function randomParagaph() {
    let paraIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[paraIndex].split("").forEach((element) => {
        typingField.innerHTML += `<span>${element}</span>`;
    })
    typingField.addEventListener("click", () => inputField.focus());
    typingField.querySelectorAll('span')[0].classList.add('active');
}

function timerUpdate() {
    timeLimit--;
    timeValue.innerText = timeLimit;
}

function inputcheck() {
    
    let inputCharacter = inputField.value.split('')[charIndex];
    let character = typingField.querySelectorAll('span');
    if (flag == 0) {
        let timer = setInterval(timerUpdate, 1000);
        flag = 1;
    }
    character[charIndex+22].scrollIntoView({behavior: "smooth"});
    if (inputCharacter == null) {
        charIndex--;
        if (character[charIndex].classList.contains('incorrect')) {
            mistake--;
        }
        character[charIndex].classList.remove("correct", "incorrect")
    }
    else {
        if (character[charIndex].innerText === inputCharacter) {
            character[charIndex].classList.add('correct');
        }
        else {
            mistake++;
            character[charIndex].classList.add('incorrect');
        }
        charIndex++;
    }
    character.forEach(element => { element.classList.remove('active') })
    let wpm = Math.round(((((charIndex - mistake) / 5) / (maxtime - timeLimit)) * 60));
    wpm = wpn = 0 || wpm === Infinity || !wpm ? 0 : wpm;
    let accuracy = Math.floor(((charIndex - mistake) / charIndex) * 100);
    accuracyValue.innerText = accuracy;
    wpmValue.innerText = wpm;
    chekctime = wpm;
    
    character[charIndex].classList.add('active');
    
}
function timerUpdate() {
    if (timeLimit > 0) {
        timeLimit--;
        timeValue.innerText = timeLimit;
        if(timeLimit == 1){
            alert("Hello! Time Out Try Agin");
            window.location.reload();
            if(chekctime>40){
                alert("Wooooo! You are typed like a pro");
            }
        }
    } 
    else {
        clearInterval(timer);
    }
}

randomParagaph();
inputField.addEventListener("input", inputcheck);
