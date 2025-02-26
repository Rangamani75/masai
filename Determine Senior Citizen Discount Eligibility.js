function Determine_Senior_Citizen_Discount_Eligibility(age){
    let result= (age>=60)?"Eligible for Senior Discount":
    (age<60 && age>0)?"Not Eligible for Senior Discount":"Invalid Age"
    return result
  }
  console.log(Determine_Senior_Citizen_Discount_Eligibility(76))
  