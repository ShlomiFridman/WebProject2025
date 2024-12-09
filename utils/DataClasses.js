
const row = (content) => `<div class="row">${content}</div>`
const col = (content) => `<div class="col">${content}</div>`

export class Account {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // Method to display user info (for demonstration purposes)
    displayInfo() {
        console.log(`Username: ${this.username}, Password: ${this.password}`);
    }
}

export class Town {

    constructor(name) {
        this.name = name;
    }
}

export class WP_Event {

    constructor(id, date, address, phone, description,
        openingTime, closingTime, townName, creatorUsername, images) {
        this.id = id;
        this.date = date;
        this.address = address;
        this.phone = phone;
        this.description = description;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.townName = townName;
        this.creatorUsername = creatorUsername;
        this.images = images;
    }

    buildHeadersHTML(){
        let headers = `</tr>
            <th class="border border-slate-600">ID</th>
            <th class="border border-slate-600 ">Date</th>
            <th class="border border-slate-600 ">Address</th>
            <th class="border border-slate-600 ">Phone</th>
            <th class="border border-slate-600 ">Description</th>
            <th class="border border-slate-600 ">Opening</th>
            <th class="border border-slate-600 ">Closing</th>
            <th class="border border-slate-600 ">Town</th>
            <th class="border border-slate-600">
                Images
            </th>
            <th class="border border-slate-600 ">Max Bookings</th>
            <th class="border border-slate-600 ">Days Opened</th>
            <th class="border border-slate-600 ">Event Type</th>
            <th class="border border-slate-600 "></th>
        </tr>`;
        return headers
    }
/*var nowDate = new Date(); 
var date = this.date.getFullYear()+'/'+(this.date.getMonth()+1)+'/'+this.date.getDate();*/
    buildElement() {
        const rowDiv = document.createElement('tr'); //bg-gradient-to-r from-blue-100 to-blue-200
        rowDiv.className = 'border border-slate-700 p-3 shadow rounded-lg'; // Add a class for styling purposes
        const htmlContent = `
            <th class="font-bold">${this.id}</th>
            <td>${this.date.getFullYear()+'/'+(this.date.getMonth()+1)+'/'+this.date.getDate()}</td>
            <td>${this.address}</td>
            <td>${this.phone}</td>
            <td>${this.description}</td>
            <td>${this.openingTime}</td>
            <td>${this.closingTime}</td>
            <td>${this.townName}</td>
            <td class="flex space-x-2 ">
                ${this.images.map(img => `<img src="${img.url}" alt="${img.title}" class="w-16 h-16 rounded-lg border img-fluid">`).join('')}
            </td>
        `;
        rowDiv.innerHTML = htmlContent;
        return rowDiv; 
    }
}

function getDayName(dayNumber) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (dayNumber < 1 || dayNumber > 7) {
        throw new Error("Day number must be between 1 and 7");
    }
    return days[dayNumber - 1];
}

export class Daily_Event extends WP_Event {

    constructor(id, date, address, phone, description,
        openingTime, closingTime, townName, creatorUsername, images,
        openDays, type, maxPossibleBookingperDay) {
        super(id, date, address, phone, description,
            openingTime, closingTime, townName, creatorUsername, images);
        this.openDays = openDays;
        this.type = type;
        this.maxPossibleBookingperDay = maxPossibleBookingperDay;
    }


    buildElement() {
        const rowDiv = super.buildElement();
        let dayNames = this.openDays.map(getDayName).toString();
        rowDiv.innerHTML += `
            <td class="maxPossibleBookings">${this.maxPossibleBookingperDay.toString()} Per Day</td>
            <td class="openDays">${dayNames.toString()}</td>
            <td class="eventType">${this.type.toString()}</td>
        `;
        if (this.id%3){
            rowDiv.innerHTML += `
                <td class="eventType">
                    <button class="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Book Event
                    <button>
                </td>
            `;
        }
        else{
            rowDiv.innerHTML += `
                <td class="eventType">
                    <button class="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Cancel Booking
                    <button>
                </td>
            `;
        }
        return rowDiv;
    }
}

export class OneTime_Event extends WP_Event {

    constructor(id, date, address, phone, description,
        openingTime, closingTime, townName, creatorUsername, images, maxPossibleBookingper) {
        super(id, date, address, phone, description,
            openingTime, closingTime, townName, creatorUsername, images);
        this.maxPossibleBookingper = maxPossibleBookingper;
    }

    buildElement() {
        const rowDiv = super.buildElement();
        rowDiv.innerHTML += `
            <td class="maxPossibleBookings">${this.maxPossibleBookingper.toString()} Total</td>
            <td class="maxPossibleBookings">Only at date</td>
            <td class="maxPossibleBookings">Event</td>
        `;
        if (this.id%3){
            rowDiv.innerHTML += `
                <td class="eventType">
                    <button class="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Book Event
                    <button>
                </td>
            `;
        }
        else{
            rowDiv.innerHTML += `
                <td class="eventType">
                    <button class="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Cancel Booking
                    <button>
                </td>
            `;
        }
        return rowDiv;
    }
}

export class Event_Image {

    constructor(id, title, url, eventId) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.eventId = eventId;
    }
}

export class Review {

    constructor(reviewId, score, date, eventId, accountUsername) {
        this.reviewId = reviewId;
        this.score = score;
        this.date = date;
        this.eventId = eventId;
        this.accountUsername = accountUsername;
    }
}

export class Booking {

    constructor(id, date, isActive, accountUsername, eventId) {
        this.id = id;
        this.date = date;
        this.isActive = isActive;
        this.accountUsername = accountUsername;
        this.eventId = eventId;
    }
}