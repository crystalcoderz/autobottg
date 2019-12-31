import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
};

export async function connectDatabase(host, port, database) {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${host}:${port}/${database}`, options);
    mongoose.set('useFindAndModify', false);

    console.log(`Database connection successful on ${host}:${port}/${database}`);
  } catch (error) {
    throw error;
  }
}
