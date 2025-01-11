import DB_Service from "./dbService";
import mongoose from "mongoose";

const mongoDbInstance = DB_Service.getInstance();
const db = await mongoDbInstance.connect();
const Schema = mongoose.Schema;

// Account Schema
const accountSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: {type: String, required: true },
    bio: {type: String, default: "" },
    about: {type: String, default: "" },
});
export const AccountModel = db.models.Account || db.model('Account', accountSchema);

// TR_Image Schemay
const trImageSchema = new Schema({
    title: { type: String, required: true },
    data: { type: Buffer, required: true }, // Blob data is stored as Buffer
    img_type: { type: String, required: true },
});
// export const TR_ImageModel = db.models.TR_Image || db.model('TR_Image', trImageSchema);

// TR_Event Schema
const trEventSchema = new Schema({
    event_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: true },
    creator_username: { type: String, required: true },
    images: [trImageSchema], // Array of images
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    town: { type: String, required: true },
    address: { type: String, required: true },
    openDays: { type: [Boolean], required: true },
    eventType: { type: String, required: true },
    isActive: { type: Boolean, default: true }
});
trEventSchema.index({ creator_username: 1 });
export const TR_EventModel = db.models.TR_Event || db.model('TR_Event', trEventSchema);

// Review Schema
const reviewSchema = new Schema({
    username: { type: String, required: true },
    event_id: { type: Number, required: true },
    score: { type: Number, required: true, min: 1, max: 5 }, // Between 1 and 5
    description: { type: String, required: true },
    date: { type: String, required: true } // Date in 'YYYY-MM-DD' format
});
reviewSchema.index({ username: 1 });
reviewSchema.index({ event_id: 1 });
export const ReviewModel = db.models.Review || db.model('Review', reviewSchema);

// Booking Schema
const bookingSchema = new Schema({
    booking_id: { type: Number, required: true, unique: true },
    creator_username: { type: String, required: true },
    event_id: { type: Number, required: true },
    date: { type: String, required: true }, // Date in 'YYYY-MM-DD' format
    amount: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
});
bookingSchema.index({ creator_username: 1 });
bookingSchema.index({ event_id: 1 });

export const BookingModel = db.models.Booking || db.model('Booking', bookingSchema);

const TRAlertSchema = new mongoose.Schema({
    alert_id: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    wasRead: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

export const TR_AlertModel = db.models.TR_Alert || mongoose.model('TR_Alert', TRAlertSchema);