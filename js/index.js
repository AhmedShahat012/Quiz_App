//https://opentdb.com/api.php?amount=10&category=10&difficulty=easy

import Quesstions from "./question.js";
import Quiz from "./quiz.js";

////////////////////////////////////////////////////////

/// ===============> Html Elments

let categoryMenu = document.getElementById("categoryMenu");
let difficultyOptions = document.getElementById("difficultyOptions");
let questionsNumber = document.getElementById("questionsNumber");
let startQuizbtn = document.getElementById("startQuiz");
let formQuiz = document.getElementById("quizOptions");
export let QuestionsContainer = document.querySelector(".questions-container");
//===========>App Varibails
export let quesstion = [];
export let currentquiz = {};

//=========================>events
startQuizbtn.addEventListener("click", async function () {
  let categry = categoryMenu.value;
  let amount = questionsNumber.value;
  let difficulty = difficultyOptions.value;

  //   console.log(categry);
  //   console.log(amount);
  //   console.log(difficulty);
  currentquiz = new Quiz(difficulty, amount, categry);
  //   console.log(currentquiz);
  //هعمل كول للميثود بتاعه الاسئله من الكويز كلاس
  quesstion = await currentquiz.getQuetions();
  console.log(quesstion); //===>هيطلع مشكله pendding ليه؟ لان ديه api بتاخد وقت فالبتالي هنا ال cosole مش بتاخد وقت الحل؟اني احط await  currentquiz.getQuetions()قبل ال  وكمان احط async قبل الانونمس فنكشن فوق
  //هخفي الفوره علشات اظهر الاسئله
  formQuiz.classList.replace("d-flex", "d-none");

  const firstquestion = new Quesstions(0);
  //   console.log(firstquestion);
  firstquestion.displayQuestion(); //كده بعمل كول للفنكشن اللي بتعرض السوال
});
