
export class Account{

    public username: string = "";
    public password: string = "";
    public name: string = "";   // TODO add to schema
    public bios: string = "";   // TODO add to schema
    public about: string = "";   // TODO add to schema

    constructor(username: string, password: string, name: string, bios: string, about: string){
        this.username = username;
        this.password = password;
        this.name = name;
        this.bios = bios;
        this.about = about;
    }
}

export class TR_Image {
    public title: string;
    public data: Buffer;
    public img_type: string;
    public img_src;

    constructor(title: string, data: Buffer, img_type: string) {
        this.title = title;
        this.data = data;
        this.img_type = img_type;
        this.img_src = this.bufferToSrc();
    }

    bufferToSrc():string {
        const base64Data = this.data.toString('base64');
        return `data:image/${this.img_type};base64,${base64Data}`;
    }
    
}

export class TR_Event {
    public event_id: number;
    public name: string;
    public description: string;
    public phone: string;
    public creator_username: string;
    public images: TR_Image[];
    public openingTime: string; // Time in 'HH:MM:SS' format
    public closingTime: string; // Time in 'HH:MM:SS' format
    public startDate: string; // Date in "YYYY-mm-dd" format
    public endDate: string; // Date in "YYYY-mm-dd" format
    public town: string;
    public address: string;
    public openDays: boolean[]; // Array of booleans for each day of the week (7 days)
    public eventType: string; // Type of event
    public isActive: boolean;

    constructor(
        event_id: number,
        name: string,
        description: string,
        phone: string,
        creator_username: string,
        images: TR_Image[],
        openingTime: string,
        closingTime: string,
        startDate: string,
        endDate: string,
        town: string,
        address: string,
        openDays: boolean[],
        eventType: string,
        isActive: boolean = true
    ) {
        this.event_id = event_id;
        this.name = name;
        this.description = description;
        this.phone = phone;
        this.creator_username = creator_username;
        this.images = images;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.startDate = startDate;
        this.endDate = endDate;
        this.town = town;
        this.address = address;
        this.openDays = openDays;
        this.eventType = eventType;
        this.isActive = isActive
    }

    isOngoing(): boolean {
        const currentDate = new Date();

        // Combine the start date with the opening time to form a full DateTime
        const eventStartDateTime = new Date(`${this.startDate}T${this.openingTime}`);
        const eventEndDateTime = new Date(`${this.endDate}T${this.closingTime}`);

        // Check if current date is between the event's start and end date/time
        return currentDate >= eventStartDateTime && currentDate <= eventEndDateTime;
    }
}


export class Review {
    public username: string;
    public event_id: number;
    public score: number; // Score should be an integer between 1 and 5
    public description: string;
    public date: string; // Date of the review in 'YYYY-MM-DD' format

    constructor(username: string, event_id: number, score: number, description: string, date: string) {
        if (score < 1 || score > 5) {
            throw new Error("Score must be between 1 and 5.");
        }

        this.username = username;
        this.event_id = event_id;
        this.score = score;
        this.description = description;
        this.date = date;
    }
}

export class Booking {
    public booking_id: number;
    public creator_username: string;
    public event_id: number;
    public date: string; // Date of booking in 'YYYY-MM-DD' format
    public amount: number; // Amount of the booking
    public isActive: boolean;

    constructor(
        booking_id: number,
        creator_username: string,
        event_id: number,
        date: string,
        amount: number,
        isActive: boolean = true
    ) {
        this.booking_id = booking_id;
        this.creator_username = creator_username;
        this.event_id = event_id;
        this.date = date;
        this.amount = amount;
        this.isActive = isActive;
    }

    canCancel(): boolean{
        const currentDate = new Date();
        const bookingDate = new Date(this.date);
        // Assuming booking is completed if the event date has passed and the booking is still active
        return !(this.isActive && bookingDate < currentDate);
    }

    wasCancelled(): boolean{
        return !this.isActive;
    }
}

export class TR_Alert{

    public alert_id: number;
    public username: string;
    public msg: string;
    public createdAt: Date;
    public wasRead: boolean;
    
    constructor(alert_id: number, username: string, msg: string, createdAt:Date, wasRead: boolean = false) {
        this.alert_id = alert_id;
        this.username = username;
        this.msg = msg;
        this.createdAt = createdAt;
        this.wasRead = wasRead;
    }

}

export interface MongooseError extends Error {
    name: string;
    message: string;
    code: number;
    errors?: Record<string, unknown>;
}