import { BookingModel, TR_EventModel } from "@/db_utils/collectionModels";
import { TR_Event } from "@/utils/classes";

export async function getAllEvents(): Promise<TR_Event[]>{
    try{
        const eventsRes = await TR_EventModel.find(
            {}
        ).sort({startDate: 1});;
        return eventsRes;
    } catch(err){
        throw err;
    }
}

export async function getEventsByCreator(creator_username: string): Promise<TR_Event[]>{
    try{
        const eventsRes = await TR_EventModel.find(
            {creator_username: creator_username}
        ).sort({startDate: 1});
        return eventsRes;
    } catch(err){
        throw err;
    }
}

export async function getEventById(event_id: number): Promise<TR_Event>{
    try{
        const eventsRes = await TR_EventModel.findOne(
            {event_id: event_id}
        );
        return eventsRes;
    } catch(err){
        throw err;
    }
}

export async function createEvent(newEvent: TR_Event): Promise<TR_Event>{
    try{
        const lastEvent = await TR_EventModel.findOne() // No filter, get all users
            .sort({ event_id: -1 }) // Sort by userId in descending order
            .exec(); // Execute the query
        newEvent.event_id = lastEvent.event_id+1;
        newEvent.isActive = true;
        // console.log(newEvent.event_id)
        const eventsRes = await TR_EventModel.create(newEvent);
        return eventsRes;
    } catch(err){
        throw err;
    }
}

export async function updateEvent(event_id: number, updatedEvent: TR_Event): Promise<TR_Event>{
    try{
        const updateRes = await TR_EventModel.findOneAndUpdate(
            {event_id: event_id},
            updatedEvent    
        );
        return updateRes;
    } catch(err){
        throw err;
    }
}

export async function cancelEvent(event_id: number): Promise<TR_Event>{
    try{
        // cancel the event
        const cancelRes = await TR_EventModel.findOneAndUpdate(
            {event_id: event_id, isActive: true},
            {isActive: false},
            {new: true}
        );
        // if !cancelRes then the update has failed
        if (!cancelRes)
            return cancelRes;
        // update future bookings
        const formattedToday = new Date().toISOString().split('T')[0];
        const res = await BookingModel.updateMany(
            {
                event_id:event_id,
                date: {$gt: formattedToday}
            },
            {isActive:false}
        );
        console.log(`event ${event_id} cancelled and ${res.modifiedCount} bookings were cancelled`)
        // console.log(deleteRes)
        return cancelRes;
    } catch(err){
        throw err;
    }
}
