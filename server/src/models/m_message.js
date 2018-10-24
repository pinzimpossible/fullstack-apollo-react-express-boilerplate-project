import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
  text:{
    type: String
  }
})

MessageSchema.pre('find', async (next) => {
  console.log('message findAll');
  next()
})

export default mongoose.model('message', MessageSchema);