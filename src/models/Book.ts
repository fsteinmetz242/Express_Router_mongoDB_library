import { Document, model, Schema, type ObjectId } from "mongoose";

export interface IBook extends Document {
  isbn: string;
  title: string;
  author: string;
  numpages: number;
  genre: string;
  price: number;
  publisher: string;
  publication: number;
  lendOut: Boolean;
  lendRef: ObjectId;
  lendDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    isbn: { type: String, required: [true, "ISBN is required"], unique: true },
    title: { type: String, required: [true, "ISBN is required"] },
    author: { type: String, required: [true, "ISBN is required"] },
    price: { type: Number, required: [true, "price is required"] },
    lendOut: { type: Boolean, required: false },
    lendRef: { type: Number, required: false },
    lendDate: { type: Date, required: false },
  },
  { timestamps: true }
);

export default model<IBook>("Book", bookSchema);
