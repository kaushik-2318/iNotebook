const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

//Not Working
// const connectToMongo = () => {
//   mongoose.connect(mongoURI, ()=>{
//     console.log("succesfully");
//   })
// }


//Comment
// connectToMongo().catch(err => console.log(err));
// async function connectToMongo() {
//   await mongoose.connect(mongoURI);
//   console.log("Connected to Mongo Successfully");
// }

//Github
const connectToMongo = () => {
mongoose.connect(mongoURI);
console.log("connected to mongo");
};


module.exports = connectToMongo;