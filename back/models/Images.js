const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const imgSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref:'User'},
  image: String,
  description: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Images = mongoose.model('Images', imgSchema);
module.exports = Images;