import { Schema, Document } from 'mongoose';

export interface Constructor extends Document {
    constructorId: string;
    name: string;
    url: string;
    nationality: string;
}

export const ConstructorSchema = new Schema({
    constructorId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    nationality: { type: String, required: true }
});
