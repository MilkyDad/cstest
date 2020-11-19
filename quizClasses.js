class Test {
    constructor(questions, results) {
        this.questions = questions;
        this.results = results;
        this.score = 0;
        this.result = 0;
        this.current = 0;
    }

    Click(index) {
        let value = this.questions[this.current].Click(index);
        this.score += value;
        let correct = -1;
        if (value >= 1) {
            correct = index;
        } else {
            for (let i = 0; i < this.questions[this.current].answers.length; i++) {
                if (this.questions[this.current].answers[i].value >= 1) {
                    correct = i;
                    break;
                }
            }
        }
        this.NextQuestion();
        return correct;
    }

    NextQuestion() {
        this.current += 1;
        if (this.current >= this.questions.length) {
            this.EndTest();
        }
    }

    EndTest() {
        let counter = 0;
        this.results.forEach(element => {
            if (element.Check(this.score)) {
                this.result = counter;
            }
            counter++;
        });
    }
}

class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }

    Click(i) {
        return this.answers[i].value;
    }
}

class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}

class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }

    Check(value) {
        if (this.value <= value) {
            return true;
        }
        return false;
    }
}