import mongoose from 'mongoose'
import User from './user'
import Message from './message'

if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI,{ 
      useNewUrlParser: true,
      // sets how many times to try reconnecting
      reconnectTries: Number.MAX_VALUE,
      // sets the delay between every retry (milliseconds)
      reconnectInterval: 30000 
    }
  )
  .then(() => console.log('connecting to database successful'))
  .catch(err => console.error('could not connect to mongo DB', err));
}

const models = {
  User,
  Message
}

export default models;
