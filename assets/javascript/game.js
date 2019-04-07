//Create a question bank
var questions = [
{
    question: "What is the name of Jon's direwolf?",
    answer: 'Ghost',
    choices: ['Summer', "Ghost", "Grey Wind"],
    userAnswer: ""
  },
  {
    question: "At Hoster Tully's funeral, who shot the burning arrow that hit its mark",
    answer: 'Brynden Tully',
    choices: ['Rhaegar Targaryen', "Brynden Tully", "Rob Stark"],
    userAnswer: ""
  },
  {
    question: "In season 1 who is King of Westeros?",
    answer: 'Robert Baratheon',
    choices: ['Tommen Baratheon', "Aerys Targaryen", "Robert Baratheon"],
    userAnswer: ""
  },
  {
    question: "What is Olenna's relationship to Mace Tyrell",
    answer: 'mother',
    choices: ['Aunt', "Mother", "Sister"],
    userAnswer: ""
  },
  {
    question: "Which name is given to the bastards of the Westerlands?",
    answer: 'Hill',
    choices: ['Snow', "Flower", "Hill"],
    userAnswer: ""
  },
  {
    question: "What noble house is Catelyn Stark from?",
    answer: 'House Tully',
    choices: ['House Tully', "House Stark", "House Tyrell"],
    userAnswer: ""
  },
  {
    question: "Brienne pledged her alliance to which of these pairs?",
    answer: 'Catelyn and Renly',
    choices: ['Catelyn and Renly', "Stannis and Catelyn", "Renly and Melisandre"],
    userAnswer: ""
  },
  {
    question: "How many kings were there in The Seven Kingdoms at the end of season 2?",
    answer: 'Four',
    choices: ['Four', "Seven", "Two"],
    userAnswer: ""
  },
  {
    question: "Who is the true heir to the iron throne after Robert's death?",
    answer: 'Stannis Baratheon',
    choices: ['Stannis Baratheon', "Jeoffry Baratheon", "Rob Stark"],
    userAnswer: ""
  },
  {
    question: "Which type of wine does the wine merchant try to poison Daenery's with?",
    answer: 'Arbor Red',
    choices: ['Dornish Red', "Arbor Red", "Vale White"],
    userAnswer: ""
  }
];

// Setting the user score
var correct = 0;

// Function to print all questions to the page
function renderQuestions() {
  
  // Empties the quiz form
  $("#quiz-form").empty();



  // Loops through questions in Array 
  questions.forEach(function (question, index) {
    
    // Create a <div> to hold questions
    var $question = $("<div>").addClass("form-group text-center qtext");
      // <div class="form-group"></div>
    
    // Adds the questions to the <div>
    var $label = $("<h2>")
      .text(question.question)
      .appendTo($question);
       

    // Shuffles the questions in array
    question.choices = question.choices.sort(function() {
      return .5 - Math.random();
    });

    // create a loop to iterate through question's choices and create radio buttons for each one
    for (var i = 0; i < question.choices.length; i++) {

      // create a div for choice and add bootstrap classes
      var $choice = $('<div>');
      $choice.addClass('form-check form-check-inline atext');
      
      // create an input tag for the radio button
      var $radio = $('<input>');

      // add attributes to provide the answer choice
      // the "name" attribute is super important, all radio buttons per question need to have the same "name" so they know which question it applies to
      $radio
        .attr({
          type: "radio",
          value: question.choices[i],
          name: index,
          class: "form-check-input"
        })
        .appendTo($choice);
      
      // Creating a label to print choices to page
      var $choiceLabel = $('<label>');
      $choiceLabel
        .text(question.choices[i])
        .addClass('form-check-label')
        .appendTo($choice);
      
      // add whole radio button choice to question
      $choice.appendTo($question);
    }
    // when done making all of the choices, add whole question to the page
    $("#quiz-form").append($question);
  });
}

// create on "change" listener for all radio buttons but bind them to quiz-form since it's permanently on the page
$("#quiz-form").on("change", ".form-check-input", function() {
  console.log(this);
  
  // GET question index out of "name" attribute so we know what question you answered
  var questionIndex = $(this).attr("name");

  console.log(questions[questionIndex]);

  // get value out of radio button you selected
  var answer = $(this).val();

  // set answer to question's userAnswer property
  questions[questionIndex].userAnswer = answer;
  
});

// my start button to run time and game
$("#start-triva").on("click", function () {

  // Start time function runs with these values
  start();
    var time = 60;
    var intervalId;
    var rAwn = 0;
    var wAwn = 0;
    // Takes time and goes down buy one second
  function decrement() {
      time--;
    // prints timer to the page
      $("#timer").text(`White walkers will reach the wall in ${time}`);
    // if timer hits 0 STOP the game
      if (time === 0) {
          stop();
    // checking user awnser
          for (var i = 0; i < questions.length; i++) {
          //if user awnser === answer 
            if (questions[i].userAnswer === questions[i].answer) {
          // Increment right answer by one
                  rAwn++;
              }
          // Else increment wrong answer by one 
              else{
                  wAwn++;
              }
          }
          // Print right and wrong awnser to page
          $("#rAwn").text(rAwn);
          $("#wAwn").text(wAwn);
      }
  }

  // clock start function and setInterval id to decrement by 1sec (in milliseconds)
  function start() {
      clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
  }

  // Stops clock when hits 0 and clears the intervalID
  function stop() {
      clearInterval(intervalId);
  }       

})

renderQuestions();