import { BookingModel, TR_EventModel } from "@/db_utils/collectionModels";
import { TR_Event } from "@/utils/classes";

/**
 * Retrieves all events from the database, sorted by start date.
 * @returns A promise resolving to an array of TR_Event objects
 * @throws Any errors that occur during the database query
 */
export async function getAllEvents(): Promise<TR_Event[]> {
    try {
        const eventsRes = await TR_EventModel.find({}).sort({ startDate: 1 });
        return eventsRes;
    } catch (err) {
        throw err;
    }
}

/**
 * Retrieves all events created by a specific user (creator), sorted by start date.
 * @param creator_username The username of the event creator
 * @returns A promise resolving to an array of TR_Event objects created by the specified user
 * @throws Any errors that occur during the database query
 */
export async function getEventsByCreator(creator_username: string): Promise<TR_Event[]> {
    try {
        const eventsRes = await TR_EventModel.find({ creator_username }).sort({ startDate: 1 });
        return eventsRes;
    } catch (err) {
        throw err;
    }
}

/**
 * Retrieves a specific event by its ID.
 * @param event_id The ID of the event to retrieve
 * @returns A promise resolving to a TR_Event object if found, or null if not found
 * @throws Any errors that occur during the database query
 */
export async function getEventById(event_id: number): Promise<TR_Event> {
    try {
        const eventsRes = await TR_EventModel.findOne({ event_id });
        return eventsRes;
    } catch (err) {
        throw err;
    }
}

/**
 * Creates a new event, assigning it a unique event_id and setting it as active.
 * @param newEvent The event data to create
 * @returns A promise resolving to the created TR_Event object
 * @throws Any errors that occur during the creation process
 */
export async function createEvent(newEvent: TR_Event): Promise<TR_Event> {
    try {
        const lastEvent = await TR_EventModel.findOne().sort({ event_id: -1 }).exec();
        newEvent.event_id = lastEvent ? lastEvent.event_id + 1 : 1; // Ensure the first event starts at event_id 1
        newEvent.isActive = true;
        const eventsRes = await TR_EventModel.create(newEvent);
        return eventsRes;
    } catch (err) {
        throw err;
    }
}

/**
 * Updates an existing event with the provided data.
 * @param event_id The ID of the event to update
 * @param updatedEvent The new event data to apply
 * @returns A promise resolving to the updated TR_Event object
 * @throws Any errors that occur during the update process
 */
export async function updateEvent(event_id: number, updatedEvent: TR_Event): Promise<TR_Event> {
    try {
        const updateRes = await TR_EventModel.findOneAndUpdate({ event_id }, updatedEvent, { new: true });
        return updateRes;
    } catch (err) {
        throw err;
    }
}

/**
 * Cancels an event by setting its `isActive` flag to false, and cancels any future bookings for that event.
 * @param event_id The ID of the event to cancel
 * @returns A promise resolving to the cancelled TR_Event object
 * @throws Any errors that occur during the cancellation process
 */
export async function cancelEvent(event_id: number): Promise<TR_Event> {
    try {
        // Cancel the event by marking it as inactive
        const cancelRes = await TR_EventModel.findOneAndUpdate(
            { event_id, isActive: true },
            { isActive: false },
            { new: true }
        );

        if (!cancelRes) return cancelRes; // Return null if no event is found or already cancelled

        // Cancel all future bookings for the event
        const formattedToday = new Date().toISOString().split('T')[0]; // Format today's date
        const res = await BookingModel.updateMany(
            { event_id, date: { $gt: formattedToday } },
            { isActive: false }
        );
        console.log(`Event ${event_id} cancelled and ${res.modifiedCount} bookings were cancelled`);
        return cancelRes;
    } catch (err) {
        throw err;
    }
}
