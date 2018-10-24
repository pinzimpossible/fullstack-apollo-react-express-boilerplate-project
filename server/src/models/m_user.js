import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  tolr: {
    type: String
  },
});

UserSchema.pre('save', async (next) => {
  console.log('insert');
  next()
})

export default mongoose.model('user', UserSchema);