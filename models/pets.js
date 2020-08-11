const mongoose = require('mongoose');

const PetsSchema = new mongoose.Schema ({
  Name: {
    type:String,
    required:true
  },
  age: {
    type:Number,
    required:true
  },
  colour: {
    type:String,
    required:true}
});


const Petsdb =  mongoose.connection;
const Pet= Petsdb.model('pets', PetsSchema);


module.exports = {Petsdb,Pet};
 



