import { Schema } from 'mongoose';
import Model from '../core/Model';

const serverSchema = new Schema({
  type: {
    type: Number,
    required: true,
  },
  protocol: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  port: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  }
});

const ServerModel = new Model('server', serverSchema);


export default ServerModel;
