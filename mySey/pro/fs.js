const fs = require('fs');

const result = fs.readFile('./cosmod.js', (err, data) => {
  if (err) {
    console.log(err);

  } else {
    console.log(data.toString());
  }

})
console.log(result)