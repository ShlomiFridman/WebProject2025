import { TR_AlertModel } from "@/db_utils/collectionModels";
import { TR_Alert } from "@/utils/classes";

export async function getByUsername(username: string){
    try{
        const alerts = await TR_AlertModel.find(
            {username: username}
        );
        return alerts;
    } catch (err){
        throw err;
    }
}

export async function postNewAlert(username: string, msg: string) {
    try {
        const lastBooking = await TR_AlertModel.findOne() // No filter, get all users
            .sort({ alert_id: -1 }) // Sort by userId in descending order
            .exec() || 100; // Execute the query
        const alertParam = {
            alert_id: lastBooking.alert_id+1,
            username: username,
            msg: msg,
            wasRead: false
        } as TR_Alert
        const savedAlert = await TR_AlertModel.create(alertParam);
        console.log(`New alert created: ${savedAlert}`);
        return savedAlert;
    } catch (err) {
        console.error("postNewBooking - Error creating a new alert:", err);
        throw err;
    }
}

export async function updateAlertToRead(id: number){
    try{
        const res = await TR_AlertModel.updateOne(
            {alert_id: id, wasRead: false},
            {wasRead: true}
        );
        return res;
    } catch (err){
        throw err;
    }
}