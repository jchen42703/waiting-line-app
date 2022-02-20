import { model, Schema } from 'mongoose';

export const userSchema = new Schema({
  userId: String,
  initQTime: Date,
});

export const User = model('User', userSchema);
