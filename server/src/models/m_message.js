import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
  text:{
    type: String
  },
  author: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
})

MessageSchema.pre('find', async (next) => {
  console.log('message findAll');
  next()
})

export default mongoose.model('message', MessageSchema);