export class Account {
    public username: string = "";
    public password: string = "";
    public name: string = "";
    public bio: string = "";
    public about: string = "";

    constructor(username: string, password: string, name: string, bio: string, about: string) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.bio = bio;
        this.about = about;
    }

    // Static method to create an Account instance from JSON
    static fromJSON(json: { username: string, password: string, name: string, bio: string, about: string }): Account {
        return new Account(json.username, json.password, json.name, json.bio, json.about);
    }

    // Static method to create an array of Account instances from an array of JSON objects
    static fromJSON_array(jsonArray: { username: string, password: string, name: string, bio: string, about: string }[]): Account[] {
        return jsonArray.map(json => Account.fromJSON(json));
    }

    static parseJSON(json: string): Account {
        const obj = JSON.parse(json);
        return new Account(
          obj.username || "",
          obj.password || "",
          obj.name || "",
          obj.bio || "",
          obj.about || ""
        );
      }
}

export class TR_Image {
    public title: string;
    public img_buffer: Buffer|null;
    public img_url: string;
    public img_type: string;

    constructor(title: string, img_buffer: Buffer|null, img_url: string, img_type: string) {
        this.title = title;
        this.img_buffer = img_buffer;
        this.img_type = img_type;
        this.img_url = img_url;
    }

    // Method to generate base64-encoded image source string
    get src(): string {
        if (!this.img_buffer){
            return this.img_url;
        }
        const base64Data = this.img_buffer.toString('base64');
        const src = `data:image/${this.img_type};base64,${base64Data}`;
        return src;
    }

    // Static method to create a TR_Image instance from JSON
    static fromJSON(json: { title: string, img_buffer: string|null, img_url: string, img_type: string }): TR_Image {
        return new TR_Image(json.title, json.img_buffer? Buffer.from(json.img_buffer, 'base64') : null, json.img_url, json.img_type);
    }

    // Static method to create an array of TR_Image instances from an array of JSON objects
    static fromJSON_array(jsonArray: { title: string, img_buffer: string|null, img_url: string, img_type: string }[]): TR_Image[] {
        return jsonArray.map(json => TR_Image.fromJSON(json));
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
        this.isActive = isActive;
    }

    // Method to check if the event is ongoing
    isOngoing(): boolean {
        const currentDate = new Date();
        const eventStartDateTime = new Date(`${this.startDate}T${this.openingTime}`);
        const eventEndDateTime = new Date(`${this.endDate}T${this.closingTime}`);
        return currentDate >= eventStartDateTime && currentDate <= eventEndDateTime;
    }

    // Static method to create a TR_Event instance from JSON
    static fromJSON(json: {
        event_id: number,
        name: string,
        description: string,
        phone: string,
        creator_username: string,
        images: { title: string, img_buffer: string|null, img_url: string, img_type: string }[],
        openingTime: string,
        closingTime: string,
        startDate: string,
        endDate: string,
        town: string,
        address: string,
        openDays: boolean[],
        eventType: string,
        isActive: boolean
    }): TR_Event {
        const images = TR_Image.fromJSON_array(json.images);
        return new TR_Event(
            json.event_id,
            json.name,
            json.description,
            json.phone,
            json.creator_username,
            images,
            json.openingTime,
            json.closingTime,
            json.startDate,
            json.endDate,
            json.town,
            json.address,
            json.openDays,
            json.eventType,
            json.isActive
        );
    }

    // Static method to create an array of TR_Event instances from an array of JSON objects
    static fromJSON_array(jsonArray: {
        event_id: number,
        name: string,
        description: string,
        phone: string,
        creator_username: string,
        images: { title: string, img_buffer: string|null, img_url: string, img_type: string }[],
        openingTime: string,
        closingTime: string,
        startDate: string,
        endDate: string,
        town: string,
        address: string,
        openDays: boolean[],
        eventType: string,
        isActive: boolean
    }[]): TR_Event[] {
        return jsonArray.map(json => TR_Event.fromJSON(json));
    }
}

export class Review {
    public booking_id: number;
    public username: string;
    public event_id: number;
    public score: number; // Score should be an integer between 1 and 5
    public description: string;
    public date: string; // Date of the review in 'YYYY-MM-DD' format

    constructor(booking_id: number, username: string, event_id: number, score: number, description: string, date: string) {
        if (score < 1 || score > 5) {
            throw new Error("Score must be between 1 and 5.");
        }
        this.booking_id = booking_id;
        this.username = username;
        this.event_id = event_id;
        this.score = score;
        this.description = description;
        this.date = date;
    }

    // Static method to create a Review instance from JSON
    static fromJSON(json: { booking_id: number, username: string, event_id: number, score: number, description: string, date: string }): Review {
        return new Review(json.booking_id, json.username, json.event_id, json.score, json.description, json.date);
    }

    // Static method to create an array of Review instances from an array of JSON objects
    static fromJSON_array(jsonArray: { booking_id: number, username: string, event_id: number, score: number, description: string, date: string }[]): Review[] {
        return jsonArray.map(json => Review.fromJSON(json));
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

    // Method to check if the booking can be canceled
    canCancel(): boolean {
        const currentDate = new Date();
        const bookingDate = new Date(this.date);
        return !(this.isActive && bookingDate < currentDate);
    }

    // Method to check if the booking was canceled
    wasCancelled(): boolean {
        return !this.isActive;
    }

    // Static method to create a Booking instance from JSON
    static fromJSON(json: { booking_id: number, creator_username: string, event_id: number, date: string, amount: number, isActive: boolean }): Booking {
        return new Booking(json.booking_id, json.creator_username, json.event_id, json.date, json.amount, json.isActive);
    }

    // Static method to create an array of Booking instances from an array of JSON objects
    static fromJSON_array(jsonArray: { booking_id: number, creator_username: string, event_id: number, date: string, amount: number, isActive: boolean }[]): Booking[] {
        return jsonArray.map(json => Booking.fromJSON(json));
    }
}

export class TR_Alert {
    public alert_id: number;
    public username: string;
    public msg: string;
    public createdAt: Date;
    public wasRead: boolean;

    constructor(alert_id: number, username: string, msg: string, createdAt: Date, wasRead: boolean = false) {
        this.alert_id = alert_id;
        this.username = username;
        this.msg = msg;
        this.createdAt = createdAt;
        this.wasRead = wasRead;
    }

    // Static method to create a TR_Alert instance from JSON
    static fromJSON(json: { alert_id: number, username: string, msg: string, createdAt: string, wasRead: boolean }): TR_Alert {
        return new TR_Alert(json.alert_id, json.username, json.msg, new Date(json.createdAt), json.wasRead);
    }

    // Static method to create an array of TR_Alert instances from an array of JSON objects
    static fromJSON_array(jsonArray: { alert_id: number, username: string, msg: string, createdAt: string, wasRead: boolean }[]): TR_Alert[] {
        return jsonArray.map(json => TR_Alert.fromJSON(json));
    }
}

export interface MongooseError {
    code: number;
    message: string;
}