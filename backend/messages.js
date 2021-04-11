import mongoose from "mongoose";

const WhatsappSchema = mongoose.Schema( {
      message: String,
      name: String,
      timestamp: Date,
      received: Boolean,
});

const messageContent = mongoose.model('messageContent', WhatsappSchema);

export default messageContent;