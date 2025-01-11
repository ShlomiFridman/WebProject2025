import path from "path";
import {Account, TR_Image, TR_Event, Review, Booking} from "./classes";
import fs from 'fs';
// import {fetchImageAsBlob} from "@/utils/utils";


const imageNames = [
    "booth.jpg",
    "cityTour.jpg",
    "concertPoster.jpg",
    "gala.jpg",
    "holidayFair.jpg",
    "mainEvent.jpeg",
    "sideEvent.jpeg",
    "speaker.png",
    "vip.jpg",
    "workshop.jpg"
];

const imagesPromises = imageNames.map(async name => {
    const [simpleName, extension] = name.split('.');
    const capitalized = simpleName.charAt(0).toUpperCase() + simpleName.slice(1);
    const imagePath = path.join(process.cwd(), 'public', 'event_images', `${simpleName}.${extension}`); // Assuming images are JPG files
    const imageData = await fs.promises.readFile(imagePath);
    // const blob = new Blob([imageData], {type: `image/${extension}`});
    return new TR_Image(capitalized, imageData, extension);
  });

// Account examples
export const accountExamples = [
    new Account("user1", "pass123", "User One", "A passionate coder who loves learning new technologies.", "I enjoy building web applications and exploring different programming languages."),
    new Account("admin", "adminPass", "Admin", "The go-to person for managing everything in the system.", "I ensure the smooth operation of the platform and oversee user management and security."),
    new Account("guest", "guestPass", "Guest", "Temporary user with limited access.", "I have a basic understanding of how the system works and explore its features."),
    new Account("johnDoe", "jdPass2024", "John Doe", "A software engineer with a love for open-source projects.", "I contribute to open-source projects and focus on building scalable systems for businesses."),
    new Account("alice", "alicePass99", "Alice", "Designer by day, developer by night.", "I specialize in UI/UX design and also dabble in front-end development, ensuring the best user experience.")
];


// TR_Image examples
const imageExamples = await Promise.all(imagesPromises);
// export const imageExamples = [
//     new TR_Image(1, 101, "Image1", new Blob(["data1"]), "jpeg"),
//     new TR_Image(2, 102, "Image2", new Blob(["data2"]), "png"),
//     new TR_Image(3, 103, "EventImage", new Blob(["data3"]), "gif"),
//     new TR_Image(4, 104, "PromoImage", new Blob(["data4"]), "bmp"),
//     new TR_Image(5, 105, "GalleryPic", new Blob(["data5"]), "webp"),
// ];

// TR_Event examples
export const eventExamples = [
    new TR_Event(201, "Music Fest", "Live music festival", "123-456-7890", accountExamples[0].username, [imageExamples[0], imageExamples[1]], "18:00:00", "23:00:00", "2024-01-15", "2025-12-31", "New York", "123 Broadway", [true, true, true, true, true, false, false], "Concert"),
    new TR_Event(202, "Art Expo", "Modern art exhibition", "098-765-4321", accountExamples[1].username, [imageExamples[2], imageExamples[3]], "09:00:00", "18:00:00", "2024-02-10", "2025-12-31", "San Francisco", "456 Market St", [true, false, true, false, true, false, true], "Exhibition"),
    new TR_Event(203, "Tech Conference", "Technology and innovation", "555-123-4567", accountExamples[2].username, [imageExamples[4], imageExamples[5]], "10:00:00", "17:00:00", "2024-03-05", "2025-12-31", "Austin", "789 Tech Rd", [true, true, true, false, false, false, false], "Conference"),
    new TR_Event(204, "Food Carnival", "Taste global cuisines", "333-999-1111", accountExamples[3].username, [imageExamples[6], imageExamples[7]], "11:00:00", "21:00:00", "2024-04-10", "2025-12-31", "Seattle", "101 Pine St", [false, true, true, true, false, true, false], "Festival"),
    new TR_Event(205, "Book Fair", "Explore a world of books", "222-444-8888", accountExamples[4].username, [imageExamples[8], imageExamples[9]], "08:00:00", "16:00:00", "2024-05-20", "2025-12-31", "Boston", "202 Book Ln", [true, false, false, true, true, false, true], "Fair"),
    new TR_Event(206, "Gala Night", "Elegant evening of music and dining", "555-555-5555", accountExamples[0].username, [imageExamples[0], imageExamples[5]], "19:00:00", "23:00:00", "2024-06-25", "2025-12-31", "Los Angeles", "456 Sunset Blvd", [true, true, false, false, true, false, true], "Gala"),
    new TR_Event(207, "Holiday Fair", "Holiday market with festive food", "444-444-4444", accountExamples[1].username, [imageExamples[4], imageExamples[9]], "10:00:00", "20:00:00", "2024-07-12", "2025-12-31", "Chicago", "789 Winter St", [true, false, true, true, false, false, true], "Fair"),
    new TR_Event(208, "Speaker Series", "Talks from industry leaders", "666-777-8888", accountExamples[2].username, [imageExamples[7]], "14:00:00", "17:00:00", "2024-08-30", "2025-12-31", "San Diego", "123 Convention Center", [true, false, true, true, true, false, false], "Conference"),
    new TR_Event(209, "Main Event", "Grand event with all attractions", "777-888-9999", accountExamples[3].username, [imageExamples[6], imageExamples[3]], "12:00:00", "22:00:00", "2024-09-15", "2025-12-31", "Houston", "500 Main St", [true, true, true, true, false, false, true], "Event"),
    new TR_Event(210, "Workshop Weekend", "Skill-building weekend workshops", "888-999-0000", accountExamples[4].username, [imageExamples[8]], "09:00:00", "16:00:00", "2024-10-05", "2025-12-31", "Miami", "888 Skill St", [false, true, true, true, true, true, false], "Workshop")
  ];

// Review examples
export const reviewExamples = [
    new Review(accountExamples[0].username, eventExamples[0].event_id, 5, "Amazing event!", "2024-01-16"),
    new Review(accountExamples[1].username, eventExamples[1].event_id, 4, "Great experience.", "2024-02-11"),
    new Review(accountExamples[2].username, eventExamples[2].event_id, 3, "It was okay.", "2024-03-06"),
    new Review(accountExamples[3].username, eventExamples[3].event_id, 2, "Not as expected.", "2024-04-02"),
    new Review(accountExamples[4].username, eventExamples[4].event_id, 1, "Disappointed.", "2024-05-13"),
];

// Booking examples
export const bookingExamples = [
    new Booking(301, accountExamples[0].username, eventExamples[0].event_id, "2024-01-16", 2),
    new Booking(302, accountExamples[1].username, eventExamples[1].event_id, "2024-02-11", 4),
    new Booking(303, accountExamples[2].username, eventExamples[2].event_id, "2024-03-06", 1),
    new Booking(304, accountExamples[3].username, eventExamples[3].event_id, "2024-04-02", 3),
    new Booking(305, accountExamples[4].username, eventExamples[4].event_id, "2024-05-13", 5),
];
