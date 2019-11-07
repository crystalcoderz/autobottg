import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true
};


export async function connectDatabase(host, port, database) {
  try {
    await mongoose.connect(`mongodb://${host}:${port}/${database}`, options);

    console.log(`Database connection successful on ${host}:${port}/${database}`);
  } catch (error) {
    throw error;
  }
}
