import { QuestionsContainer, currentquiz, quesstion } from "./index.js";

export default class Quesstions {
  //محتاج اعرف ايه(السؤال والاجابه الصح والاجابه الغلط وهل السؤال اتجاوب ولا لا)
  constructor(index) {
    this.index = index;
    this.question = quesstion[index].question;
    this.correct = quesstion[index].correct_answer;
    this.category = quesstion[index].category;
    this.wrong = quesstion[index].incorrect_answers;
    this.Allanswer = this.getAllAnswers();
    this.isanswerd = false;
  }
  getAllAnswers() {
    return this.wrong.concat(this.correct).sort();
    //انا عملت الفنكشن ديه علشان اخزن كل الاجابات ف مكان واحد الغلط والصح علشان اقدر اعرضهم مع بعض وكمان عملت ال  sort  علشان الغبط الاجابات ف كل سوال ع حسب الحروف الابجديه
  }
  displayQuestion() {
    const quetionHtml = `
    <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      quesstion.length
    } Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
      ${this.Allanswer.map((choice) => `<li>${choice}</li>`).join("")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold">
        <i class="bi bi-emoji-laughing"></i> 
        Score: ${currentquiz.score}
      </h2>        
    </div>
  `;
    QuestionsContainer.innerHTML = quetionHtml;
    const allchoices = document.querySelectorAll(".choices li");
    allchoices.forEach((chocic) => {
      chocic.addEventListener("click", (e) => {
        this.checkAnswer(e);
      });
    });
  }

  checkAnswer(e) {
    // console.log(e.target.innerHTML);
    if (!this.isanswerd) {
      this.isanswerd = true;
      if (this.correct == e.target.innerHTML) {
        e.target.classList.add(
          "correct",
          "animate__animated",
          "animate__flipInY"
        );
        currentquiz.score++;
      } else {
        e.target.classList.add("wrong", "animate__animated", "animate__shakeX");
      }
      this.animateQuestion(e.target);
    }
  }

  nextQuestion() {
    this.index++;
    if (this.index < quesstion.length) {
      const nextquestion = new Quesstions(this.index);
      nextquestion.displayQuestion();
      return;
    }
    const quizHtml = currentquiz.endQuiz();
    QuestionsContainer.innerHTML = quizHtml;
    const tryAgain = document.querySelector(".again");
    tryAgain.addEventListener("click", function () {
      window.location.reload();
    });
    //المفروع هعمل للفنكشن ديه كول لما يضغط ع اجابه
  }
  animateQuestion(elment) {
    setTimeout(() => {
      elment
        .closest(".question")
        .classList.add("animate__animated", "animate__bounceOutLeft");
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    }, 1000);
  }
}
