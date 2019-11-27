import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let optionss = {};
const SSL = true;
optionss.SSL = SSL;

export async function connectDatabase(host, port, database) {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${host}:${port}/${database}`, options);

    console.log(`Database connection successful on ${host}:${port}/${database}`);
  } catch (error) {
    throw error;
  }
}
