
var mysql = require('mysql')
var util = require('util')
var pool = mysql.createConnection({ connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodedb' });

pool.query = util.promisify(pool.query) // Magic happens here.
//module.exports = pool
var cdr=async()=>{
  try {
  return  await pool.query('SELECT CURRENT_DATE')
} catch(err) {
  throw new Error(err)
}
}
cdr().then((ss)=>{
console.log(ss);
});


function doubleAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x * 2);
      }, 2000);
    });
  }
  
  async function addAsync(x) {
    const a = await doubleAfter2Seconds(x + 10);
    const b = await doubleAfter2Seconds(x + 20);
    const c = await doubleAfter2Seconds(x + 30);
    return x + a + b + c;
  }
  
  
  addAsync(101).then((sum) => {
    console.log(sum);
  });