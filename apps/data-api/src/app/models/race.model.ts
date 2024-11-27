import { Schema, Document } from 'mongoose';

export interface Race extends Document {
    name: string;
    location: string;
    date: Date;
    results: Record<string, any>;
}

export const RaceSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String },
    date: { type: Date, required: true },
    results: { type: Object, default: {} }
});
