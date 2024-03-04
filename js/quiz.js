export default class Quiz {
  constructor(difficulty, amount, categry) {
    //محتاج اعرف ايه(عددالاسئله و صعوبه الاسئله ونوع الاسئله وال score بتاعي )
    this.difficulty = difficulty;
    this.amount = amount;
    this.categry = categry;
    this.score = 0;
  }

  //دلوقتي محتاج اخد القيم ديه وابصيها لل (Api) علشان اعرض الاسئله
  //هعمل methode هكلم من خلالها ال api

  async getQuetions() {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${this.amount}&category=${this.categry}&difficulty=${this.difficulty}`
    );
    const data = await response.json();
    // console.log(data); //لوروحت ع ال browser ودخلت داتا وعملت ال  start ووحت ال console مش هلاقي اسئله ليه؟علشان انا معماتش كول للفنكشن ديه المفروض اروح اعملها كول عن الكلك بتاع البوتن
    return data.results; //كده انا برجع الاسئله اللي موجوده ف الاوبجكت اللي اسمه داتا بس وملحوظه من غير ال ريترن الفنكشن هناك مش هتشتغل لان ساعتها  مبترجعش حاجه
  }
  endQuiz() {
    return `
    <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3"
    >
      <h2 class="mb-0">
      ${
        this.score == this.amount
          ? `Congratulations 🎉`
          : `Your score is ${this.score}`
      }      
      </h2>
      <button class="again btn btn-primary rounded-pill"><i class="bi bi-arrow-repeat"></i> Try Again</button>
    </div>
  `;
  }
}
