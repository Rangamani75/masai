function Student_Grades_Based_on_Score(student){
  
    for(let i in student){
      let bag=""
      if(student[i]>=90){
        bag=bag + `${i} - A`
      }
      else if((student[i]>=80)&&(student[i]<90)){
        bag= bag+ `${i} - B`
      }
      else if((student[i]>=70)&&(student[i]<80)){
        bag=bag+ `${i} - C`
      }
       else if((student[i]>=60)&&(student[i]<70)){
        bag=bag+ `${i} - D`
      }
       else if(student[i]<60){
        bag=bag+ `${i} - F`
      }
      console.log(bag)
      
    }
    
  }
  let studentScores = {
    John: 85,
    Emma: 92,
    Sam: 67,
    Bob: 45
  };
  Student_Grades_Based_on_Score(studentScores)
  
  