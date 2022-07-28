 //Select elements 
let category=document.querySelector('.category');
let count=document.querySelector('.count span');
let question=document.querySelector('.quiz-area');
let answersArea=document.querySelector('.answers-area');
let bulletsContainer=document.querySelector('.bullets');
let spans=document.querySelector(".spans");
let submit=document.querySelector('.submit-button');
let theAnswers=document.getElementsByName('questions');
let result=document.querySelector('.results');
let counter=document.querySelector('.countDown');

//The Variables
let chosenAnswer,chosenRightAnswer=0;
let theBullets=[], questionsCount,rightAnswer,countDownInterval,questionDuration=4;




//set Options
let currentIndex=0;

//get questions
function getQuestions() {
  let myRequest=new XMLHttpRequest();
  myRequest.onreadystatechange=function(){
   if(this.readyState===4 && this.status===200){
    let questionsObject=JSON.parse(this.responseText);

    //Creat the Bullets and set the question Count
     questionsCount=questionsObject.length;
    creatBullets(questionsCount);

    //add  Questions Data 
    addQuestionData(questionsObject[currentIndex],questionsCount);
   // counter
   countDown(questionDuration,questionsCount);
  //click on submit
  submit.addEventListener('click',(e)=>{
    // Get the right answer
    if (currentIndex<questionsCount){
    rightAnswer=questionsObject[currentIndex].right_answer;
    
    //increase the currentindex
    currentIndex++;
    checkAnswer(rightAnswer,questionsCount);
    //remouve Previous Question
    question.innerHTML="";
    answersArea.innerHTML="";
    //get Next Question
    addQuestionData(questionsObject[currentIndex],questionsCount);
   //Change Active Bullte
    handelBullets();
    clearInterval(countDownInterval);
    countDown(questionDuration,questionsCount);
    //show result
    showResult(questionsCount);
  }
    
  });
   }
  }
  myRequest.open("GET","../Html_questions.json",true);
  myRequest.send();
}
getQuestions();

//Creat function Bullets
function creatBullets(num) {
  count.innerHTML=num

//  Create Span 
for (let index = 0; index < num; index++) {
  // Create the Bullets and add it to container
  theBullets[index]=document.createElement('span');
  spans.appendChild(theBullets[index]);

 //make first bullets active
  if(index==0){
    theBullets[index].className='active';
  }
}
}

//Create Function to add  Questions Data 
function addQuestionData(questionObj,nbrQuestions){
  if (currentIndex<questionsCount){
// Create H2 Question title 
let questionTitle=document.createElement('h2');
// Create  Question text
let textQuestion=document.createTextNode(questionObj['title']);
questionTitle.appendChild(textQuestion);
question.appendChild(questionTitle);

// Create the answers 
for (let i = 1; i <= 4; i++) {
  //Create answer text
  let mainDiv=document.createElement("div");
  mainDiv.className="answer";
  //make first answer active
  if(i==1){
    mainDiv.classList.add("active")
  }
  //Create radio button 
  let radioBtn=document.createElement('input');
  radioBtn.type='radio';
  radioBtn.name='questions';
  radioBtn.id=`answer_${i}`;
  radioBtn.dataset.answer=questionObj[`answer_${i}`];

  
//make first option checked
  if(i==1){
   radioBtn.checked='true';
  }

  //Create the label
  let theLabel=document.createElement('label');
  //Create for attribute  
  theLabel.htmlFor=`answer_${i}`;
  // text answer
  let labelText=document.createTextNode(questionObj[`answer_${i}`]);
  // add The text To label
  theLabel.appendChild(labelText);

  // add the label and radio to maindiv
  mainDiv.appendChild(radioBtn);
  mainDiv.appendChild(theLabel);
  // append all divs to  answers area
answersArea.appendChild(mainDiv);
}
}}
function checkAnswer(rAnswer,count){

  theAnswers.forEach(element => {
    if(element.checked){
      chosenAnswer=element.dataset.answer;
      
    }
  });
  if(chosenAnswer===rAnswer){
    chosenRightAnswer++;
  console.log('Good Answer');
    
  }
  
}
// function for change and mouve the bullets
function handelBullets(){
  if (currentIndex<questionsCount){
    theBullets[currentIndex].className='active';}}
// function for show result
function showResult(count){
let theResult;
 if(currentIndex===count){
   bulletsContainer.remove();
   submit.remove();
   answersArea.remove();
   let finQuestion=document.createElement('h3');
   finQuestion.textContent='The Questions are finished!';
   question.appendChild(finQuestion);
   
   //Rate The Result
   if(chosenRightAnswer>(count / 2) && chosenRightAnswer<count){
    theResult=`<span class="good">Good</span> : You Answered ${chosenRightAnswer} from ${count}`;
   }
   else if(chosenRightAnswer===count){
    theResult=`<span class="perfect">Perfect</span> : You Answered ${chosenRightAnswer} from ${count}`;
   }
   else{
    theResult=`<span class="bad">Bad</span> : You Answered ${chosenRightAnswer} from ${count}`;
   }
    result.style.padding='15px 15px';
    result.innerHTML=theResult;
}}
function countDown(duration,count){
  if(currentIndex<count){
   let minutes,seconds;
   countDownInterval=setInterval(function(){
    minutes=parseInt(duration /60);
    seconds=parseInt(duration % 60);
    minutes=minutes< 10 ? `0${minutes}` : minutes;
    seconds=seconds< 10 ? `0${seconds}` : seconds;
    counter.innerHTML=`${minutes} : ${seconds}`;
    if(--duration < 0){
  clearInterval(countDownInterval);
  submit.click();
    }
   },1000);
  }
}