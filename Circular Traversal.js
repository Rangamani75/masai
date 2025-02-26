let arr=[[1,2,3],[4,5,6],[7,8,9]]
let n = arr.length
let b=""
for(let i=n-1;i>=0;i--){
  b=b+arr[i][0]+" "
}
for(let i=1;i<n;i++){
  b=b+arr[0][i]+" "
}
for(let i=1;i<n;i++){
  b=b+arr[i][n-1]+" "
}
for(let i=n-2;i>0;i--){
  b=b+arr[n-1][i]
}
console.log(b)