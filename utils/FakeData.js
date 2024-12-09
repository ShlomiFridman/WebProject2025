import {Account, Town, Event_Image, OneTime_Event, Daily_Event, Review, Booking} from "./DataClasses.js";

// Examples for each class
const e_account = [
    new Account("john_doe", "password123"),
    new Account("jane_doe", "securePass456"),
    new Account("admin", "admin"),
    new Account("alice123", "alicePwd789"),
    new Account("bob_the_builder", "builder123"),
];

const e_town = [
    new Town("New York"),
    new Town("Chicago"),
    new Town("Los Angeles"),
    new Town("San Francisco"),
    new Town("Seattle"),
];

// Example Event_Image instances
const e_eventImage = [
    new Event_Image(1, "Main Event", "..\\..\\assets\\images\\mainEvent.jpeg", 1),
    new Event_Image(2, "Side Event", "..\\..\\assets\\images\\sideEvent.jpeg", 1),
    new Event_Image(3, "Workshop Image", "..\\..\\assets\\images\\workshop.jpg", 2),
    new Event_Image(4, "City Tour Photo", "..\\..\\assets\\images\\cityTour.jpg", 3),
    new Event_Image(5, "Holiday Fair Poster", "..\\..\\assets\\images\\holidayFair.jpg", 5),
    new Event_Image(6, "Exhibition Booth", "..\\..\\assets\\images\\booth.jpg" , 6),
    new Event_Image(7, "Concert Poster", "..\\..\\assets\\images\\concertPoster.jpg", 7),
    new Event_Image(8, "VIP Access", "..\\..\\assets\\images\\vip.jpg", 8),
    new Event_Image(9, "Evening Gala", "..\\..\\assets\\images\\gala.jpg", 9),
    new Event_Image(10, "Event Speaker", "..\\..\\assets\\images\\speaker.png", 10),
];


// Example Daily_Event instances
/*var nowDate = new Date(); 
var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();*/

const e_dailyEvent = [
    new Daily_Event(
        1, new Date("2024-01-02"), "123 Apple St", "555-2222",
        "Morning Yoga Classes", "06:00", "12:00",
        "New York", "john_doe", [e_eventImage[0], e_eventImage[1]],
        [1, 2, 3, 4, 5, 6], "attraction", 30
    ),
    new Daily_Event(
        2, new Date("2024-03-10"), "789 Elm St", "555-7777",
        "Daily Art Workshop", "09:00", "17:00",
        "Chicago", "jane_doe", [e_eventImage[2]],
        [1, 2, 3, 4, 5], "restaurant", 50
    ),
    new Daily_Event(
        3, new Date("2024-06-01"), "456 Market St", "555-5555",
        "City Tour", "10:00", "18:00",
        "San Francisco", "admin", [e_eventImage[3]],
        [1, 2, 3, 4], "attraction", 100
    ),
    new Daily_Event(
        4, new Date("2024-09-15"), "222 Ocean Ave", "555-4444",
        "Beach Volleyball Tournament", "08:00", "20:00",
        "Los Angeles", "alice123", [e_eventImage[4]],
        [1, 6, 7], "attraction", 20
    ),
    new Daily_Event(
        5, new Date("2024-12-25"), "555 Holiday Dr", "555-6666",
        "Holiday Fair", "12:00", "22:00",
        "Seattle", "bob_the_builder", [e_eventImage[5]],
        [1, 2, 3, 7], "restaurant", 300
    ),
];

// Example OneTime_Event instances
const e_oneTimeEvent = [
    new OneTime_Event(
        6, new Date("2024-02-14"), "567 Love Ln", "555-7771",
        "Valentine's Day Gala", "19:00", "23:00",
        "New York", "john_doe", [e_eventImage[6]], 200
    ),
    new OneTime_Event(
        7, new Date("2024-03-17"), "890 Green St", "555-7772",
        "St. Patrick's Day Parade", "12:00", "17:00",
        "Chicago", "jane_doe", [e_eventImage[7]], 500
    ),
    new OneTime_Event(
        8, new Date("2024-07-04"), "123 Freedom Blvd", "555-7773",
        "Independence Day Fireworks", "20:00", "23:59",
        "Los Angeles", "admin", [e_eventImage[8]], 1000
    ),
    new OneTime_Event(
        9, new Date("2024-11-25"), "999 Thanksgiving Rd", "555-7774",
        "Thanksgiving Dinner", "16:00", "21:00",
        "San Francisco", "alice123", [e_eventImage[9]], 150
    ),
    new OneTime_Event(
        10, new Date("2024-12-31"), "888 New Year Ave", "555-7775",
        "New Year's Eve Party", "21:00", "02:00",
        "Seattle", "bob_the_builder", [e_eventImage[0]], 400
    ),
];

const e_review = [
    new Review(1, 5, new Date("2024-01-15"), 1, "john_doe"),
    new Review(2, 4, new Date("2024-02-20"), 2, "jane_doe"),
    new Review(3, 3, new Date("2024-03-05"), 3, "admin"),
    new Review(4, 5, new Date("2024-04-10"), 4, "alice123"),
    new Review(5, 2, new Date("2024-05-25"), 5, "bob_the_builder"),
];

const e_booking = [
    new Booking(1, new Date("2024-01-01"), true, "john_doe", 1),
    new Booking(2, new Date("2024-01-15"), false, "jane_doe", 2),
    new Booking(3, new Date("2024-02-01"), true, "admin", 3),
    new Booking(4, new Date("2024-02-20"), false, "alice123", 4),
    new Booking(5, new Date("2024-03-01"), true, "bob_the_builder", 5),
];

// export functions to return examples
export function getAccountExamples() {
    return e_account;
}

export function getTownExamples() {
    return e_town;
}

export function getDailyEventExamples() {
    return e_dailyEvent;
}

export function getOneTimeEventExamples() {
    return e_oneTimeEvent;
}

export function getEventImageExamples() {
    return e_eventImage;
}

export function getReviewExamples() {
    return e_review;
}

export function getBookingExamples() {
    return e_booking;
}