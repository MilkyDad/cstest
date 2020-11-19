const Shuffle = array => {
    array.sort(() => Math.random() - 0.5);
}


const test = new Test(questions, results);
Shuffle(test.questions) // Первое - А, второе - В, третье...
Update();


function Init() {
    let buttons = document.querySelectorAll(".button");
    buttons.forEach(element => {
        element.addEventListener("click", function(e) { Click(e.target.getAttribute("i")); });
    });
}


function Update() {
    let buttons = document.querySelector(".buttonsInner");
    let headElem = document.querySelector(".headInner");
    let footerElem = document.querySelector(".footerInner");
    if (test.current < test.questions.length) {
        headElem.innerHTML = test.questions[test.current].text;
        buttons.innerHTML = "";
        let counter = 0;
        Shuffle(test.questions[test.current].answers) // и тут тоже
        test.questions[test.current].answers.forEach(element => {
            let newBtn = document.createElement("button");
            newBtn.className = "button";
            newBtn.innerHTML = element.text;
            newBtn.setAttribute("i", counter);
            counter++;
            buttons.appendChild(newBtn);
        });
        footerElem.innerHTML = test.current + 1 + " / " + test.questions.length;
        Init();
    } else {
        buttons.innerHTML = "";
        headElem.innerHTML = test.results[test.result].text;
        footerElem.innerHTML = "Вы набрали: " + test.score;
    }
}


function Click(i) {
    let correct = test.Click(i);
    let buttons = document.querySelectorAll("button");
    buttons.forEach(element => {
        element.className = "button nonActiveBtn";
        element.innerHTML = "Видимо, неправильно";
    });
    if (correct >= 0) {
        buttons[correct].className = "button rightBtn";
        buttons[correct].innerHTML = "Правильно!";
    }
    if (i != correct) {
        buttons[i].className = "button wrongBtn";
        buttons[correct].innerHTML = "Ошибка!";
    }
    setTimeout(Update, 1000);
}