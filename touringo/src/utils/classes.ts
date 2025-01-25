import { formatDate } from "./utils";

/**
 * Represents a user account.
 */
export class Account {
    public username: string = "";
    public password: string = "";
    public name: string = "";
    public bio: string = "";
    public about: string = "";

    /**
     * Constructor for initializing an Account instance.
     * @param username The user's username.
     * @param password The user's password.
     * @param name The user's name.
     * @param bio A short description or biography of the user.
     * @param about More detailed information about the user.
     */
    constructor(username: string, password: string, name: string, bio: string, about: string) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.bio = bio;
        this.about = about;
    }

    /**
     * Creates an Account instance from a JSON object.
     * @param json The JSON object containing user data.
     * @returns The Account instance.
     */
    static fromJSON(json: { username: string, password: string, name: string, bio: string, about: string }): Account {
        return new Account(json.username, json.password, json.name, json.bio, json.about);
    }

    /**
     * Creates an array of Account instances from an array of JSON objects.
     * @param jsonArray Array of JSON objects containing user data.
     * @returns An array of Account instances.
     */
    static fromJSON_array(jsonArray: { username: string, password: string, name: string, bio: string, about: string }[]): Account[] {
        return jsonArray.map(json => Account.fromJSON(json));
    }

    /**
     * Parses a JSON string to create an Account instance.
     * @param json The JSON string containing user data.
     * @returns The Account instance.
     */
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

/**
 * Represents an image associated with an event.
 */
export class TR_Image {
    public title: string;
    public img_buffer: Buffer | null;
    public img_url: string;
    public img_type: string;

    /**
     * Constructor for initializing a TR_Image instance.
     * @param title The title of the image.
     * @param img_buffer The image data in buffer form (can be null).
     * @param img_url The URL of the image.
     * @param img_type The MIME type of the image (e.g., 'jpg', 'png').
     */
    constructor(title: string, img_buffer: Buffer | null, img_url: string, img_type: string) {
        this.title = title;
        this.img_buffer = img_buffer;
        this.img_type = img_type;
        this.img_url = img_url;
    }

    /**
     * Generates the base64-encoded image source string.
     * @returns The image source string, either from buffer or URL.
     */
    get src(): string {
        if (!this.img_buffer) {
            return this.img_url;
        }
        const base64Data = this.img_buffer.toString('base64');
        const src = `data:image/${this.img_type};base64,${base64Data}`;
        return src;
    }

    /**
     * Creates a TR_Image instance from a JSON object.
     * @param json The JSON object containing image data.
     * @returns The TR_Image instance.
     */
    static fromJSON(json: { title: string, img_buffer: string | null, img_url: string, img_type: string }): TR_Image {
        return new TR_Image(json.title, json.img_buffer ? Buffer.from(json.img_buffer, 'base64') : null, json.img_url, json.img_type);
    }

    /**
     * Creates an array of TR_Image instances from an array of JSON objects.
     * @param jsonArray Array of JSON objects containing image data.
     * @returns An array of TR_Image instances.
     */
    static fromJSON_array(jsonArray: { title: string, img_buffer: string | null, img_url: string, img_type: string }[]): TR_Image[] {
        return jsonArray.map(json => TR_Image.fromJSON(json));
    }
}

/**
 * Represents an event created by a user.
 */
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

    /**
     * Constructor for initializing a TR_Event instance.
     * @param event_id The event's unique identifier.
     * @param name The name of the event.
     * @param description A description of the event.
     * @param phone The contact phone number for the event.
     * @param creator_username The username of the event creator.
     * @param images Array of images associated with the event.
     * @param openingTime The time the event opens (HH:MM:SS).
     * @param closingTime The time the event closes (HH:MM:SS).
     * @param startDate The start date of the event (YYYY-MM-DD).
     * @param endDate The end date of the event (YYYY-MM-DD).
     * @param town The town where the event takes place.
     * @param address The address where the event takes place.
     * @param openDays An array indicating whether the event is open on each day of the week.
     * @param eventType The type of event.
     * @param isActive A flag indicating if the event is active.
     */
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

    /**
     * Checks if the event has passed based on the end date.
     * @returns True if the event has passed; otherwise, false.
     */
    hasPassed(): boolean {
        const currentDate = new Date();
        const eventEndDateTime = new Date(this.endDate);
        return eventEndDateTime < currentDate;
    }

    /**
     * Creates a TR_Event instance from a JSON object.
     * @param json The JSON object containing event data.
     * @returns The TR_Event instance.
     */
    static fromJSON(json: {
        event_id: number,
        name: string,
        description: string,
        phone: string,
        creator_username: string,
        images: { title: string, img_buffer: string | null, img_url: string, img_type: string }[],
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

    /**
     * Creates an array of TR_Event instances from an array of JSON objects.
     * @param jsonArray Array of JSON objects containing event data.
     * @returns An array of TR_Event instances.
     */
    static fromJSON_array(jsonArray: {
        event_id: number,
        name: string,
        description: string,
        phone: string,
        creator_username: string,
        images: { title: string, img_buffer: string | null, img_url: string, img_type: string }[],
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

    /**
     * Filters valid dates for which the event is open based on the openDays array.
     * @returns An array of valid dates in "YYYY-MM-DD" format.
     */
    getValidDates(): string[] {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const validDates: string[] = [];

        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        const currentDate = new Date(start);

        while (currentDate <= end) {
            const dayOfWeek = currentDate.getDay();
            if (this.openDays[dayOfWeek]) {
                validDates.push(currentDate.toISOString().split('T')[0]);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return validDates;
    }

    /**
     * Returns a list of days the event is open (based on openDays).
     * @returns An array of day names when the event is open.
     */
    getActiveDays(): string[] {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return daysOfWeek.filter((_, index) => this.openDays[index]);
    }

    /**
     * Maps important event information to a Map object.
     * @returns A Map of key-value pairs of event details.
     */
    infoMap(): Map<string, string> {
        const activeDays = this.getActiveDays();
        return new Map<string, string>([
            ["Location", `${this.town}, ${this.address}`],
            ["Phone Number", `${this.phone}`],
            ["From", `${formatDate(this.startDate)}`],
            ["Until", `${formatDate(this.endDate)}`],
            ["Time", `${this.openingTime.slice(0, 5)}-${this.closingTime.slice(0, 5)}`],
            ["Open Days", `${activeDays.length > 0 ? activeDays.join(", ") : "No open days"}`],
        ]);
    }
}

/**
 * Represents a review for an event.
 */
export class Review {
    public booking_id: number;
    public username: string;
    public event_id: number;
    public score: number; // Score should be an integer between 1 and 5
    public description: string;
    public date: string; // Date of the review in 'YYYY-MM-DD' format

    /**
     * Constructor for initializing a Review instance.
     * @param booking_id The booking ID for which the review is made.
     * @param username The username of the person giving the review.
     * @param event_id The ID of the event being reviewed.
     * @param score The score given in the review (1 to 5).
     * @param description The description of the review.
     * @param date The date the review was given.
     */
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

    /**
     * Creates a Review instance from a JSON object.
     * @param json The JSON object containing review data.
     * @returns The Review instance.
     */
    static fromJSON(json: { booking_id: number, username: string, event_id: number, score: number, description: string, date: string }): Review {
        return new Review(json.booking_id, json.username, json.event_id, json.score, json.description, json.date);
    }

    /**
     * Creates an array of Review instances from an array of JSON objects.
     * @param jsonArray Array of JSON objects containing review data.
     * @returns An array of Review instances.
     */
    static fromJSON_array(jsonArray: { booking_id: number, username: string, event_id: number, score: number, description: string, date: string }[]): Review[] {
        return jsonArray.map(json => Review.fromJSON(json));
    }
}

/**
 * Represents a booking for an event made by a user.
 */
export class Booking {
    public booking_id: number;
    public creator_username: string;
    public event_id: number;
    public date: string; // Date of booking in 'YYYY-MM-DD' format
    public amount: number; // Amount of the booking (tickets, etc.)
    public isActive: boolean;

    /**
     * Constructor for initializing a Booking instance.
     * @param booking_id The booking's unique identifier.
     * @param creator_username The username of the person who made the booking.
     * @param event_id The ID of the event being booked.
     * @param date The date the booking was made (YYYY-MM-DD).
     * @param amount The amount associated with the booking.
     * @param isActive Whether the booking is still active.
     */
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

    /**
     * Checks if the booking can be canceled (i.e., if it has passed).
     * @returns True if the booking has passed, false otherwise.
     */
    hasPassed(): boolean {
        const currentDate = new Date();
        const bookingDate = new Date(this.date);
        return bookingDate < currentDate;
    }

    /**
     * Checks if the booking was canceled.
     * @returns True if the booking was canceled, false if it is still active.
     */
    wasCancelled(): boolean {
        return !this.isActive;
    }

    /**
     * Creates a Booking instance from a JSON object.
     * @param json The JSON object containing booking data.
     * @returns The Booking instance.
     */
    static fromJSON(json: { booking_id: number, creator_username: string, event_id: number, date: string, amount: number, isActive: boolean }): Booking {
        return new Booking(json.booking_id, json.creator_username, json.event_id, json.date, json.amount, json.isActive);
    }

    /**
     * Creates an array of Booking instances from an array of JSON objects.
     * @param jsonArray Array of JSON objects containing booking data.
     * @returns An array of Booking instances.
     */
    static fromJSON_array(jsonArray: { booking_id: number, creator_username: string, event_id: number, date: string, amount: number, isActive: boolean }[]): Booking[] {
        return jsonArray.map(json => Booking.fromJSON(json));
    }

    /**
     * Maps important booking information to a Map object.
     * @param event The associated event for the booking.
     * @returns A Map of key-value pairs for booking details.
     */
    infoMap(event: TR_Event): Map<string, string> {
        return new Map<string, string>([
            ["Booking ID", `${this.booking_id} (${this.amount} tickets)`],
            ["Date", `${formatDate(this.date)}`],
            ["Location", `${event.town}, ${event.address}`],
            ["Time", `${event.openingTime.slice(0, 5)}-${event.closingTime.slice(0, 5)}`],
        ]);
    }
}

/**
 * Represents a system alert for a user.
 */
export class TR_Alert {
    public alert_id: number;
    public username: string;
    public msg: string;
    public createdAt: Date;
    public wasRead: boolean;

    /**
     * Constructor for initializing a TR_Alert instance.
     * @param alert_id The alert's unique identifier.
     * @param username The username to whom the alert is targeted.
     * @param msg The message content of the alert.
     * @param createdAt The timestamp when the alert was created.
     * @param wasRead Whether the alert has been read.
     */
    constructor(alert_id: number, username: string, msg: string, createdAt: Date, wasRead: boolean = false) {
        this.alert_id = alert_id;
        this.username = username;
        this.msg = msg;
        this.createdAt = createdAt;
        this.wasRead = wasRead;
    }

    /**
     * Creates a TR_Alert instance from a JSON object.
     * @param json The JSON object containing alert data.
     * @returns The TR_Alert instance.
     */
    static fromJSON(json: { alert_id: number, username: string, msg: string, createdAt: string, wasRead: boolean }): TR_Alert {
        return new TR_Alert(json.alert_id, json.username, json.msg, new Date(json.createdAt), json.wasRead);
    }

    /**
     * Creates an array of TR_Alert instances from an array of JSON objects.
     * @param jsonArray Array of JSON objects containing alert data.
     * @returns An array of TR_Alert instances.
     */
    static fromJSON_array(jsonArray: { alert_id: number, username: string, msg: string, createdAt: string, wasRead: boolean }[]): TR_Alert[] {
        return jsonArray.map(json => TR_Alert.fromJSON(json));
    }
}

export interface MongooseError {
    code: number;
    message: string;
}