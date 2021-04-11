import mongoose from "mongoose";

function dynamicModel(suffix) {
      const addressSchema = new mongoose.Schema(
          {
            "message": {type: String},
            "name": {type: String},
            "timestamp": {type: String},
            "received": {type: Boolean},
          }
      );
      return new mongoose.model(suffix, addressSchema);
}

export default dynamicModel;