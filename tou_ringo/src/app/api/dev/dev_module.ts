import DB_Service from "@/utils/dbService";
const mongoose = require('mongoose');

export async function createCollections(){
    const mongoDbInstance = DB_Service.getInstance();
    const db = await mongoDbInstance.connect();
    const Schema = mongoose.Schema;

    // Account Schema
    const accountSchema = new Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    });
    const Account = db.model('Account', accountSchema);

    // TR_Image Schema
    const trImageSchema = new Schema({
        img_id: { type: Number, required: true, unique: true },
        event_id: {type: Number, required: true},
        title: { type: String, required: true },
        data: { type: Buffer, required: true }, // Blob data is stored as Buffer
        img_type: { type: String, required: true },
    });
    trImageSchema.index({event_id: 1});
    const TR_Image = db.model('TR_Image', trImageSchema);

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
        eventType: { type: String, required: true }
    });
    trEventSchema.index({creator_username: 1});
    const TR_Event = db.model('TR_Event', trEventSchema);

    // Review Schema
    const reviewSchema = new Schema({
        username: { type: String, required: true },
        event_id: { type: Number, required: true },
        score: { type: Number, required: true, min: 1, max: 5 }, // Between 1 and 5
        description: { type: String, required: true },
        date: { type: String, required: true } // Date in 'YYYY-MM-DD' format
    });
    reviewSchema.index({username: 1});
    reviewSchema.index({event_id: 1});
    const Review = db.model('Review', reviewSchema);

    // Booking Schema
    const bookingSchema = new Schema({
        booking_id: { type: Number, required: true, unique: true  },
        creator_username: { type: String, required: true },
        event_id: { type: Number, required: true },
        date: { type: String, required: true }, // Date in 'YYYY-MM-DD' format
        amount: { type: Number, required: true }
    });
    bookingSchema.index({creator_username: 1});
    bookingSchema.index({event_id: 1});
    const Booking = db.model('Booking', bookingSchema);
    module.exports = { Account, TR_Image, TR_Event, Review, Booking };
    
}

export async function createExamples(){
    
}