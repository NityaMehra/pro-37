class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements

    question.hide();

    //write code to change the background color here

    background("white");

    //write code to show a heading for showing the result of Quiz
    textSize("50");
    text("Result Of The Quiz",340,50);
    

    //call getContestantInfo( ) here
    Contestant.getContestantInfo();

    //write condition to check if contestantInfor is not undefined

    if (allContestants !== undefined) {
      textSize(20);
      text("Note : Contestants who have answered correctly are highlighted in green.",130,230);
    }

    //write code to highlight contest who answered correctly
    
    var y = 270;

    for(var player in allContestants){
      var correctAns = "2";
      if (correctAns === allContestants[player].answer) {
        fill("green");
      } else {
        fill("red");
      }
      text(allContestants[player].name +":"+ allContestants[player].answer,300,y);
      y+=30;

    }
  }

}
