import mongoose, { Document, Schema } from "mongoose";

export interface SomeDataType extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    text: string;
    details: string;
}

const SomeDataSchema: Schema = new Schema({
    name: { type: String, required: true },
    text: { type: String, required: true, unique: false },
    details: { type: String, require: false },
});

const SomeData = mongoose.model<SomeDataType>("SomeData", SomeDataSchema);

export default SomeData;