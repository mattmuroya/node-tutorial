


const int = setInterval(() => {
  console.log(new Date);
}, 1000);

setTimeout(() => {
  clearInterval(int);
}, 3000);

console.log(__dirname)
console.log(__filename)

