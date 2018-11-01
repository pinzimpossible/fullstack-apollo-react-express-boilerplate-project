import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
  text:{
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: {
    type: Schema.Types.Date,
    default: null
  }
})

MessageSchema.pre('save', function(next){
  this.createdAt = new Date()
  next()
})

MessageSchema.pre('find', async (next) => {
  next()
})

export default mongoose.model('message', MessageSchema);