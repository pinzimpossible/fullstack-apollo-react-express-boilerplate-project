// import Sequelize from 'sequelize'

// let sequelize;
// if (process.env.DATABASE_URL) {
//   sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     operatorsAliases: Sequelize.Op
//   });
// } else {
//   sequelize = new Sequelize(
//     process.env.TEST_DATABASE || process.env.DATABASE,
//     process.env.DATABASE_USER,
//     process.env.DATABASE_PASSWORD,
//     {
//       dialect: 'postgres',
//     },
//   );
// }

// const models = {
//   User: sequelize.import('./user'),
//   Message: sequelize.import('./message'),
// };

// Object.keys(models).forEach(key => {
//   if ('associate' in models[key]) {
//     models[key].associate(models);
//   }
// });

// export { sequelize };

import mongoose from 'mongoose'
import User from './m_user'
import Message from './m_message'

if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('connecting to database successful'))
  .catch(err => console.error('could not connect to mongo DB', err));
}

const models = {
  User,
  Message
}

export default models;
