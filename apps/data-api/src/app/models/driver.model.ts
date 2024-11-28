import { Schema } from 'mongoose';

export const DriverSchema = new Schema({
    driverId: String,
    givenName: String,
    familyName: String,
    nationality: String,
    dateOfBirth: String,
    permanentNumber: String
});
