import { Schema, Document } from 'mongoose';

export interface Team extends Document {
    name: string;
    base: string;
    championships: number;
    drivers: string[];
    stats: Record<string, any>;
}

export const TeamSchema = new Schema({
    name: { type: String, required: true },
    base: { type: String },
    championships: { type: Number, default: 0 },
    drivers: { type: [String], default: [] },
    stats: { type: Object, default: {} }
});
