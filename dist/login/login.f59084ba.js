function e(e,t,n,s){Object.defineProperty(e,t,{get:n,set:s,enumerable:!0,configurable:!0})}var t=globalThis,n={},s={},o=t.parcelRequire94c2;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in s){var t=s[e];delete s[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){s[e]=t},t.parcelRequire94c2=o);var a=o.register;a("fEjG7",function(t,n){e(t.exports,"getAccountExamples",()=>d),e(t.exports,"getDailyEventExamples",()=>c),e(t.exports,"getOneTimeEventExamples",()=>u);var s=o("d3EX7");let a=[new s.Account("john_doe","password123"),new s.Account("jane_doe","securePass456"),new s.Account("admin","admin"),new s.Account("alice123","alicePwd789"),new s.Account("bob_the_builder","builder123")];new s.Town("New York"),new s.Town("Chicago"),new s.Town("Los Angeles"),new s.Town("San Francisco"),new s.Town("Seattle");let r=[new s.Event_Image(1,"Main Event","..\\..\\assets\\images\\mainEvent.jpeg",1),new s.Event_Image(2,"Side Event","..\\..\\assets\\images\\sideEvent.jpeg",1),new s.Event_Image(3,"Workshop Image","..\\..\\assets\\images\\workshop.jpg",2),new s.Event_Image(4,"City Tour Photo","..\\..\\assets\\images\\cityTour.jpg",3),new s.Event_Image(5,"Holiday Fair Poster","..\\..\\assets\\images\\holidayFair.jpg",5),new s.Event_Image(6,"Exhibition Booth","..\\..\\assets\\images\\booth.jpg",6),new s.Event_Image(7,"Concert Poster","..\\..\\assets\\images\\concertPoster.jpg",7),new s.Event_Image(8,"VIP Access","..\\..\\assets\\images\\vip.jpg",8),new s.Event_Image(9,"Evening Gala","..\\..\\assets\\images\\gala.jpg",9),new s.Event_Image(10,"Event Speaker","..\\..\\assets\\images\\speaker.png",10)],i=[new s.Daily_Event(1,new Date("2024-01-02"),"123 Apple St","555-2222","Morning Yoga Classes","06:00","12:00","New York","john_doe",[r[0],r[1]],[1,2,3,4,5,6],"attraction",30),new s.Daily_Event(2,new Date("2024-03-10"),"789 Elm St","555-7777","Daily Art Workshop","09:00","17:00","Chicago","jane_doe",[r[2]],[1,2,3,4,5],"restaurant",50),new s.Daily_Event(3,new Date("2024-06-01"),"456 Market St","555-5555","City Tour","10:00","18:00","San Francisco","admin",[r[3]],[1,2,3,4],"attraction",100),new s.Daily_Event(4,new Date("2024-09-15"),"222 Ocean Ave","555-4444","Beach Volleyball Tournament","08:00","20:00","Los Angeles","alice123",[r[4]],[1,6,7],"attraction",20),new s.Daily_Event(5,new Date("2024-12-25"),"555 Holiday Dr","555-6666","Holiday Fair","12:00","22:00","Seattle","bob_the_builder",[r[5]],[1,2,3,7],"restaurant",300)],l=[new s.OneTime_Event(6,new Date("2024-02-14"),"567 Love Ln","555-7771","Valentine's Day Gala","19:00","23:00","New York","john_doe",[r[6]],200),new s.OneTime_Event(7,new Date("2024-03-17"),"890 Green St","555-7772","St. Patrick's Day Parade","12:00","17:00","Chicago","jane_doe",[r[7]],500),new s.OneTime_Event(8,new Date("2024-07-04"),"123 Freedom Blvd","555-7773","Independence Day Fireworks","20:00","23:59","Los Angeles","admin",[r[8]],1e3),new s.OneTime_Event(9,new Date("2024-11-25"),"999 Thanksgiving Rd","555-7774","Thanksgiving Dinner","16:00","21:00","San Francisco","alice123",[r[9]],150),new s.OneTime_Event(10,new Date("2024-12-31"),"888 New Year Ave","555-7775","New Year's Eve Party","21:00","02:00","Seattle","bob_the_builder",[r[0]],400)];function d(){return a}function c(){return i}function u(){return l}new s.Review(1,5,new Date("2024-01-15"),1,"john_doe"),new s.Review(2,4,new Date("2024-02-20"),2,"jane_doe"),new s.Review(3,3,new Date("2024-03-05"),3,"admin"),new s.Review(4,5,new Date("2024-04-10"),4,"alice123"),new s.Review(5,2,new Date("2024-05-25"),5,"bob_the_builder"),new s.Booking(1,new Date("2024-01-01"),!0,"john_doe",1),new s.Booking(2,new Date("2024-01-15"),!1,"jane_doe",2),new s.Booking(3,new Date("2024-02-01"),!0,"admin",3),new s.Booking(4,new Date("2024-02-20"),!1,"alice123",4),new s.Booking(5,new Date("2024-03-01"),!0,"bob_the_builder",5)}),a("d3EX7",function(t,n){e(t.exports,"Account",()=>s),e(t.exports,"Town",()=>o),e(t.exports,"Daily_Event",()=>i),e(t.exports,"OneTime_Event",()=>l),e(t.exports,"Event_Image",()=>d),e(t.exports,"Review",()=>c),e(t.exports,"Booking",()=>u);class s{constructor(e,t){this.username=e,this.password=t}displayInfo(){console.log(`Username: ${this.username}, Password: ${this.password}`)}}class o{constructor(e){this.name=e}}class a{constructor(e,t,n,s,o,a,r,i,l,d){this.id=e,this.date=t,this.address=n,this.phone=s,this.description=o,this.openingTime=a,this.closingTime=r,this.townName=i,this.creatorUsername=l,this.images=d}buildHeadersHTML(){return`</tr>
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
        </tr>`}buildElement(){let e=document.createElement("tr");e.className="border border-slate-700 p-3 shadow rounded-lg";let t=`
            <th class="font-bold">${this.id}</th>
            <td>${this.date.getFullYear()+"/"+(this.date.getMonth()+1)+"/"+this.date.getDate()}</td>
            <td>${this.address}</td>
            <td>${this.phone}</td>
            <td>${this.description}</td>
            <td>${this.openingTime}</td>
            <td>${this.closingTime}</td>
            <td>${this.townName}</td>
            <td class="flex space-x-2 ">
                ${this.images.map(e=>`<img src="${e.url}" alt="${e.title}" class="w-16 h-16 rounded-lg border img-fluid">`).join("")}
            </td>
        `;return e.innerHTML=t,e}}function r(e){if(e<1||e>7)throw Error("Day number must be between 1 and 7");return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][e-1]}class i extends a{constructor(e,t,n,s,o,a,r,i,l,d,c,u,g){super(e,t,n,s,o,a,r,i,l,d),this.openDays=c,this.type=u,this.maxPossibleBookingperDay=g}buildElement(){let e=super.buildElement(),t=this.openDays.map(r).toString();return e.innerHTML+=`
            <td class="maxPossibleBookings">${this.maxPossibleBookingperDay.toString()} Per Day</td>
            <td class="openDays">${t.toString()}</td>
            <td class="eventType">${this.type.toString()}</td>
        `,this.id%3?e.innerHTML+=`
                <td class="eventType">
                    <button class="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Book Event
                    <button>
                </td>
            `:e.innerHTML+=`
                <td class="eventType">
                    <button class="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Cancel Booking
                    <button>
                </td>
            `,e}}class l extends a{constructor(e,t,n,s,o,a,r,i,l,d,c){super(e,t,n,s,o,a,r,i,l,d),this.maxPossibleBookingper=c}buildElement(){let e=super.buildElement();return e.innerHTML+=`
            <td class="maxPossibleBookings">${this.maxPossibleBookingper.toString()} Total</td>
            <td class="maxPossibleBookings">Only at date</td>
            <td class="maxPossibleBookings">Event</td>
        `,this.id%3?e.innerHTML+=`
                <td class="eventType">
                    <button class="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Book Event
                    <button>
                </td>
            `:e.innerHTML+=`
                <td class="eventType">
                    <button class="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Cancel Booking
                    <button>
                </td>
            `,e}}class d{constructor(e,t,n,s){this.id=e,this.title=t,this.url=n,this.eventId=s}}class c{constructor(e,t,n,s,o){this.reviewId=e,this.score=t,this.date=n,this.eventId=s,this.accountUsername=o}}class u{constructor(e,t,n,s,o){this.id=e,this.date=t,this.isActive=n,this.accountUsername=s,this.eventId=o}}});var r=o("fEjG7");let i=!1;window.changeToDarkMode=function(e){document.documentElement.classList.toggle("dark"),e.innerHTML=i?"Dark Mode":"Light Mode",console.log(e.innerHTML),i=!i},window.submitClicked=function(e){e.preventDefault();let t=document.getElementById("login_infoText"),n=new FormData(e.target),s=r.getAccountExamples(),o=n.get("username").toLocaleLowerCase(),a=n.get("password");for(let e of s)if(e.username==o&&e.password==a)return console.log(`Found user: ${e}`),localStorage.setItem("username",o),window.location.href="../home/home.html",!1;return console.log("Invalid"),t.innerHTML="Invalid username or password",!1};
//# sourceMappingURL=login.f59084ba.js.map
