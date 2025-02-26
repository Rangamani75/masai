function Advanced_User_Privilege_Management_System(person1){
    let result = 
    (person1.role=="admin" && person1.experience>5 && person1.active==true && person1.department=="IT")?"Full IT Admin Access":
    (person1.role=="admin" && person1.experience>5 && person1.active==true && person1.department!=="IT")?"Full General Admin Access":
    (person1.role=="admin" && person1.experience<=5 && person1.active==true)?"Limited Admin Access":
    (person1.role=="admin"  && person1.active==false)?"Admin Access Revoked":
    (person1.role=="manager" && person1.experience>3 && person1.active==true && person1.department=="Sales")?"Full Sales Manager Access":
    (person1.role=="manager" && person1.experience>3 && person1.active==true && person1.department!=="Sales")?"Full Manager Access":
    (person1.role=="manager" && person1.experience<=3 && person1.active==true)?"Limited Mnager Access":
    (person1.role=="manager"  && person1.active==false)?"manager Access Revoked":
    (person1.role=="user" && person1.active==true && person1.department=="Support")?"Priority Support Access":
    (person1.role=="user" && person1.active==true && person1.department!=="Support")?"User Access":
    (person1.role=="user"  && person1.active==false)?"User Access Revoked":"Invalid Role"
    return result
    }
    let person = { role: "admin", experience: 3, active: false, department: "Finance" };
    console.log(Advanced_User_Privilege_Management_System(person))
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    