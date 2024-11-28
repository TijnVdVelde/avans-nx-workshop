import { Schema, Document } from 'mongoose';

export interface Constructor extends Document {
    name: string;
    url: string;
    nationality: string;
}

export const ConstructorSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    nationality: { type: String, required: true },
});
