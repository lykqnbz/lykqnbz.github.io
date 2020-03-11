const EventEmitter = require('events')

class CustomEvent extends EventEmitter { }

const ce = new CustomEvent();

ce.on('error', (error, time) => {
  console.log(error);
  console.log(time);
})

ce.emit('error', new Error('oops!'), Date.now())