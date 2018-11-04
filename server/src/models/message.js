import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // createdAt: {
  //   type: Schema.Types.Date,
  //   default: null
  // },
  // updatedAt: {
  //   type: Schema.Types.Date,
  //   default: null
  // }
}, {
    timestamps: true
})

MessageSchema.pre('save', function(next){
  next()
})

MessageSchema.pre('find', async (next) => {
  next()
})

export default mongoose.model('message', MessageSchema);