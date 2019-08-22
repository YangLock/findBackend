const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models');
let js_files = files.filter((f)=>{
    return f.endsWith('.js');
},files);

module.exports = {};

for(let f of js_files){
    console.log('import model from file ${f}...');
    let file_name = f.substring(0,f.length-3);
    module.exports[file_name] = require(__dirname + '/models/' + f);
}

module.exports.sync = ()=>{
  return db.sync();
};