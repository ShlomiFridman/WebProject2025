import { TR_EventModel } from "@/db_utils/collectionModels";
import { TR_Event } from "@/utils/classes";

export async function getAllEvents(): Promise<TR_Event[]>{
    try{
        const eventsRes = await TR_EventModel.find(
            {isActive: true}
        );
        return eventsRes;
    } catch(err){
        throw err;
    }
}

export async function getEventsByCreator(creator_username: string): Promise<TR_Event[]>{
    try{
        const eventsRes = await TR_EventModel.find(
            {creator_username: creator_username, isActive: true}
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
        const deleteRes = await TR_EventModel.findOneAndUpdate(
            {event_id: event_id, isActive: true},
            {isActive: false},
            {new: true}
        );
        // console.log(deleteRes)
        return deleteRes;
    } catch(err){
        throw err;
    }
}
