import { Schema } from 'mongoose';
import Model from '../core/Model';

const userSchema = new Schema({
    uid: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    accessToken: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    skin: {
      type: Number,
      default: 0
    },
    totalScores: {
      type: Number,
      default: 0
    },
    inventory: {
        type: Array,
        default: [0, 1, 2]
    }
});

const UserModel = new Model('user', userSchema);

export default UserModel;
