import mongoose from "mongoose";

const watchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },  
    model: { type: String, trim: true },                 
    color: { type: String, trim: true },                  
    strap: { type: String, trim: true },                  
    dial: { type: String, trim: true },          
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalprice: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: [String], required: true },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

watchSchema.pre("save", function () {
  const discountAmount = (this.price * this.discount) / 100;
  this.totalprice = this.price - discountAmount;
});

const Watch = mongoose.model("Watch", watchSchema);
export default Watch;
