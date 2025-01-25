// import path from "path";
import {Account, TR_Image, TR_Event, Review, Booking} from "./classes";
// import fs from 'fs';
// import {fetchImageAsBlob} from "@/utils/utils";


const imagesUrls: [string, string][] = [
  ["Booth", "https://imgcdn.stablediffusionweb.com/2024/9/6/51df4600-410c-471c-92ef-66420eb15aa6.jpg"],
  ["City Tour", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY3cX3Px9YgVJK3tVYJmNsUZD_lN5xs6vgwg&s"],
  ["Concert Poster", "https://recordmecca.com/wp-content/uploads/2019/02/Screen-Shot-2019-02-27-at-9.25.09-AM.jpeg"],
  ["Gala", "https://design-assets.adobeprojectm.com/content/download/express/public/urn:aaid:sc:VA6C2:a994d11f-5f53-5373-a631-a2fd00cde8bd/component?assetType=TEMPLATE&etag=be61436dfd274fcfa1582226f1802b0d&revision=1cf5b797-2c76-4753-beb7-a51317bda9f4&component_id=7897f3a3-e13c-4d54-9202-49b58a1af81b"],
  ["Holiday Fair", "https://images.squarespace-cdn.com/content/v1/65032eded54a724936bfa8f1/3f6fce05-09f8-42fd-9861-157b0ffc1a53/1-203.jpg"],
  ["F1 Race", "https://cdn.wynnresorts.com/q_auto,f_auto/Wynn%20Las%20Vegas/Experiences/F1/F1%202024/f1-race-week-wynn-las-vegas-driver-with-car-828x466?h=466&iar=0&w=828"],
  ["Music Festival", "https://marketplace.canva.com/EAF2v5ucX74/1/0/1131w/canva-blue-and-yellow-gradient-cute-playful-summer-music-festival-flyer-fYVv97vxRds.jpg"],
  ["Speaker", "https://i.pinimg.com/originals/ac/3b/d1/ac3bd12c52c04fe1d8591c525360e6f0.jpg"],
  ["Vip", "https://assets.imcas.com/congresses/imcas2021/rooms/702/2.jpg"],
  ["Workshop", "https://c8.alamy.com/comp/2EKYCRC/woodwork-joiner-or-carpenter-workshop-metal-plate-rusty-or-vector-retro-poster-wood-carpentry-and-timber-works-tools-joiner-plane-or-jointer-woodw-2EKYCRC.jpg"],
  ["Tel Aviv Museum", "https://media.cntraveler.com/photos/5474be4bcbbd2620680dd52b/16:9/w_2560,c_limit/tel-aviv-museum-of-art-israel.jpg"],
  ["Eretz Israel Museum", "https://upload.wikimedia.org/wikipedia/commons/4/4e/Eretz_Israel_Museum2.jpg"],
  ["Cultural District", "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/9e/78/6d/caption.jpg?w=1200&h=-1&s=1"],
  ["Market", "https://www.secrettelaviv.com/wp-content/uploads/2016/03/21862_Shuk-hacarmel.jpg"],
  ["Cultural Hub", "https://www.itraveltelaviv.com/wp-content/uploads/2014/10/tel-aviv-port_676x330.jpg"],
  ["Taizu Restaurant", "https://images.adsttc.com/media/images/5167/b938/b3fc/4bf5/7e00/0079/large_jpg/TAIZU_022.jpg?1365752115"],
  ["Shila Restaurant", "https://www.theworlds50best.com/discovery/filestore/jpg/shila-israel-a%20(3).jpg"],
  ["White Night Festival", "https://irp-cdn.multiscreensite.com/c846e0b3/Tel-Aviv-White-Night-010.jpg"],
  ["Music Festival", "https://www.secrettelaviv.com/wp-content/uploads/2014/10/15271763_1286130451408439_1952906880145158519_o-1024x684.jpg"],
  ["Jaffa Market", "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/26/67/1c/jaffa-s-flea-market.jpg?w=1200&h=1200&s=1"]
];

// const imagesPromises = imageNames.map(async name => {
//     const [simpleName, extension] = name.split('.');
//     const capitalized = simpleName.charAt(0).toUpperCase() + simpleName.slice(1);
//     const imagePath = path.join(process.cwd(), 'public', 'event_images', `${simpleName}.${extension}`); // Assuming images are JPG files
//     const imageData = await fs.promises.readFile(imagePath);
//     // const blob = new Blob([imageData], {type: `image/${extension}`});
//     return new TR_Image(capitalized, imageData, extension);
//   });

// Account examples
export const accountExamples = [
    new Account("user1", "pass123", "User One", "A passionate coder who loves learning new technologies.", "I enjoy building web applications and exploring different programming languages."),
    new Account("admin", "adminPass", "Admin", "The go-to person for managing everything in the system.", "I ensure the smooth operation of the platform and oversee user management and security."),
    new Account("guest", "guestPass", "Guest", "Temporary user with limited access.", "I have a basic understanding of how the system works and explore its features."),
    new Account("johnDoe", "jdPass2024", "John Doe", "A software engineer with a love for open-source projects.", "I contribute to open-source projects and focus on building scalable systems for businesses."),
    new Account("alice", "alicePass99", "Alice", "Designer by day, developer by night.", "I specialize in UI/UX design and also dabble in front-end development, ensuring the best user experience.")
];


// TR_Image examples
// const imageExamples = await Promise.all(imagesPromises);
export const imageExamples = imagesUrls.map(([title, imageUrl]) => 
    new TR_Image(title, null, imageUrl, 'url') 
  );

// TR_Event examples
export const eventExamples = [
  new TR_Event(201, "Music Fest", "Live music festival", "123-456-7890", accountExamples[0].username, [imageExamples[18]], "18:00:00", "23:00:00", "2024-01-15", "2025-12-31", "New York", "123 Broadway", [true, true, true, true, true, false, false], "Concert"),
  new TR_Event(202, "Art Expo", "Modern art exhibition", "098-765-4321", accountExamples[1].username, [imageExamples[2]], "09:00:00", "18:00:00", "2024-02-10", "2025-12-31", "San Francisco", "456 Market St", [true, false, true, false, true, false, true], "Exhibition"),
  new TR_Event(203, "Tech Conference", "Technology and innovation", "555-123-4567", accountExamples[2].username, [imageExamples[7]], "10:00:00", "17:00:00", "2024-03-05", "2025-12-31", "Austin", "789 Tech Rd", [true, true, true, false, false, false, false], "Conference"),
  new TR_Event(204, "Food Carnival", "Taste global cuisines", "333-999-1111", accountExamples[3].username, [imageExamples[14]], "11:00:00", "21:00:00", "2024-04-10", "2025-12-31", "Seattle", "101 Pine St", [false, true, true, true, false, true, false], "Festival"),
  new TR_Event(205, "Book Fair", "Explore a world of books", "222-444-8888", accountExamples[4].username, [imageExamples[10]], "08:00:00", "16:00:00", "2024-05-20", "2025-12-31", "Boston", "202 Book Ln", [true, false, false, true, true, false, true], "Fair"),
  new TR_Event(206, "Gala Night", "Elegant evening of music and dining", "555-555-5555", accountExamples[0].username, [imageExamples[3]], "19:00:00", "23:00:00", "2024-06-25", "2025-12-31", "Los Angeles", "456 Sunset Blvd", [true, true, false, false, true, false, true], "Gala"),
  new TR_Event(207, "Holiday Fair", "Holiday market with festive food", "444-444-4444", accountExamples[1].username, [imageExamples[4]], "10:00:00", "20:00:00", "2024-07-12", "2025-12-31", "Chicago", "789 Winter St", [true, false, true, true, false, false, true], "Fair"),
  new TR_Event(208, "Speaker Series", "Talks from industry leaders", "666-777-8888", accountExamples[2].username, [imageExamples[8]], "14:00:00", "17:00:00", "2024-08-30", "2025-12-31", "San Diego", "123 Convention Center", [true, false, true, true, true, false, false], "Conference"),
  new TR_Event(209, "Main Event", "Grand event with all attractions", "777-888-9999", accountExamples[3].username, [imageExamples[0]], "12:00:00", "22:00:00", "2024-09-15", "2025-12-31", "Houston", "500 Main St", [true, true, true, true, false, false, true], "Event"),
  new TR_Event(210, "Workshop Weekend", "Skill-building weekend workshops", "888-999-0000", accountExamples[4].username, [imageExamples[9]], "09:00:00", "16:00:00", "2024-10-05", "2025-12-31", "Miami", "888 Skill St", [false, true, true, true, true, true, false], "Workshop"),
  new TR_Event(301, "Tel Aviv Museum of Art", "Premier modern and contemporary art museum", "123-987-6543", accountExamples[0].username, [imageExamples[10]], "09:00:00", "18:00:00", "2025-01-01", "2025-12-31", "Tel Aviv", "27 Shaul Hamelech Blvd", [true, true, true, false, true, false, false], "Museum"),
  new TR_Event(302, "Eretz Israel Museum", "Museum dedicated to archaeology and ethnography", "098-123-4567", accountExamples[1].username, [imageExamples[11]], "09:00:00", "18:00:00", "2025-01-01", "2025-12-31", "Tel Aviv", "2 Haim Levanon St", [true, true, true, true, true, false, true], "Museum"),
  new TR_Event(303, "Neve Tzedek", "Historic neighborhood with charming streets, shops, and galleries", "555-987-6543", accountExamples[2].username, [imageExamples[12]], "10:00:00", "20:00:00", "2025-01-01", "2025-12-31", "Tel Aviv", "Neve Tzedek", [true, true, false, true, false, false, true], "Cultural"),
  new TR_Event(304, "Carmel Market (Shuk HaCarmel)", "Vibrant marketplace with fresh produce, spices, and delicacies", "333-444-5555", accountExamples[3].username, [imageExamples[13]], "08:00:00", "18:00:00", "2025-01-01", "2025-12-31", "Tel Aviv", "Carmel St", [true, true, false, true, true, false, false], "Market"),
  new TR_Event(305, "Tel Aviv Port Area (Namal Tel Aviv)", "Revitalized waterfront area with shops, restaurants, and cultural venues", "666-777-8888", accountExamples[4].username, [imageExamples[14]], "09:00:00", "23:00:00", "2025-01-01", "2025-12-31", "Tel Aviv", "Hamered St", [true, true, true, true, true, false, true], "Cultural"),
  new TR_Event(306, "Taizu Restaurant", "Asian fusion cuisine with Southeast Asian street food-inspired dishes", "444-555-6666", accountExamples[0].username, [imageExamples[15]], "12:00:00", "23:00:00", "2025-01-01", "2025-12-31", "Tel Aviv", "Rothschild Blvd", [true, true, false, false, true, false, true], "Restaurant"),
  new TR_Event(307, "Shila Restaurant", "Fresh seafood and grilled dishes", "777-888-9999", accountExamples[1].username, [imageExamples[16]], "12:00:00", "23:00:00", "2025-01-01", "2025-12-31", "Tel Aviv", "Ben Yehuda St", [true, true, true, false, true, false, true], "Shila Restaurant"),
  new TR_Event(308, "White Night (Laila Lavan)", "Citywide celebration with free events, concerts, and performances", "888-999-0000", accountExamples[2].username, [imageExamples[17]], "18:00:00", "06:00:00", "2025-06-15", "2025-06-15", "Tel Aviv", "Rothschild Boulevard", [true, true, false, true, true, true, false], "Festival"),
  new TR_Event(309, "Israel Festival", "Multi-disciplinary arts festival featuring theater, dance, and music", "555-666-7777", accountExamples[3].username, [imageExamples[18]], "10:00:00", "22:00:00", "2025-05-01", "2025-05-10", "Jerusalem", "Jerusalem Theater, 20 David Marcus Street", [true, false, true, true, false, false, true], "Festival"),
  new TR_Event(310, "Jaffa Flea Market", "Historic market with antiques, crafts, live music, and performances", "444-111-2222", accountExamples[4].username, [imageExamples[19]], "10:00:00", "22:00:00", "2025-01-01", "2025-12-31", "Tel Aviv", "Jaffa", [true, true, false, true, false, true, true], "Jaffa Market")
];


// Review examples
export const reviewExamples = [
    new Review(301, accountExamples[0].username, eventExamples[0].event_id, 5, "Amazing event!", "2024-01-16"),
    new Review(302, accountExamples[1].username, eventExamples[1].event_id, 4, "Great experience.", "2024-02-11"),
    new Review(303, accountExamples[2].username, eventExamples[2].event_id, 3, "It was okay.", "2024-03-06"),
    new Review(304, accountExamples[3].username, eventExamples[3].event_id, 2, "Not as expected.", "2024-04-02"),
    new Review(305, accountExamples[4].username, eventExamples[4].event_id, 1, "Disappointed.", "2024-05-13"),
];

// Booking examples
export const bookingExamples = [
    new Booking(301, accountExamples[0].username, eventExamples[0].event_id, "2024-01-16", 2),
    new Booking(302, accountExamples[1].username, eventExamples[1].event_id, "2024-02-11", 4),
    new Booking(303, accountExamples[2].username, eventExamples[2].event_id, "2024-03-06", 1),
    new Booking(304, accountExamples[3].username, eventExamples[3].event_id, "2024-04-02", 3),
    new Booking(305, accountExamples[4].username, eventExamples[4].event_id, "2024-05-13", 5),
];
