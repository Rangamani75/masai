function Traversing_Objects_with(books){
    let b=""
    for(let i in books){
      b=b+i+": "+books[i]+" "
    }
    return b
    
  }
  let book = { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }
  console.log(Traversing_Objects_with(book))