let arr=[[1,2,3,4,5],
        [6,7,8,9,1],
        [3,2,5,4,6],
        [7,8,9,1,2]]
let n=arr.length
let b=""
for(let i=n;i>=0;i--){
  b=b+arr[0][i]+" "
}
for(let i=0;i<=n;i++){
  b=b+arr[1][i]+" "
}
for(let i=n;i>=0;i--){
  b=b+arr[2][i]+" "
}
for(let i=0;i<=n;i++){
  b=b+arr[3][i]+" "
}
console.log(b)

