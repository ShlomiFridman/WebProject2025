import { TR_EventModel } from "@/db_utils/collectionModels";
import { TR_Event } from "@/utils/classes";

export async function getAllEvents(): Promise<TR_Event[]>{
    try{
        const eventsRes = await TR_EventModel.find({});
        return eventsRes;
    } catch(err){
        throw err;
    }
}

export async function getEventsByCreator(creator_username: string): Promise<TR_Event[]>{
    try{
        const eventsRes = await TR_EventModel.find({creator_username: creator_username});
        return eventsRes;
    } catch(err){
        throw err;
    }
}

// TODO create event

// TODO update event

// TODO remove event by id
