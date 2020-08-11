const mongoose = require('mongoose');

const setup = async () => {

  await mongoose.connect(`mongodb://localhost/Pets`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var db=mongoose.connection;
  db.on('connection',()=>{

    console.log("Mongodb connecteed");
  
  })
  db.on('error',console.error.bind(console, 'MongoDB connection error:'))
};

before(async () => {
  await setup();
});


