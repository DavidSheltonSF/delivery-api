import mongoose from 'mongoose';
import 'dotenv/config';

export default async () => {
  const MONGO_URL = process.env.MONGO_URI;
  mongoose.Promise = Promise;
  await mongoose.connect(MONGO_URL);
  mongoose.connection.on('error', (error: Error) => console.log(error));
}