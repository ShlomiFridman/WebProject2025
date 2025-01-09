import { MainLayout } from "@/components/layout";
import { ThemeProvider } from '@/context/ThemeProvider';
import EventTable from "@/components/EventTable";


const events = [
  {
    id: "1",
    name: "Ocean View Restaurant",
    description: "A beautiful seaside restaurant offering fresh seafood.",
    imageUrl: "/event_images/ocean-view.jpg",
    location: "123 Beachside Ave, Miami, FL",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Mountain Adventure Hiking",
    description: "Guided hikes with breathtaking mountain views.",
    imageUrl: "/event_images/mountain-hiking.jpg",
    location: "456 High Trail Rd, Denver, CO",
    rating: 4.8,
  },
  {
    id: "3",
    name: "City Lights Rooftop Bar",
    description: "Enjoy drinks and stunning city views at this rooftop hotspot.",
    imageUrl: "/event_images/city-lights-bar.jpg",
    location: "789 Downtown Blvd, New York, NY",
    rating: 4.6,
  },
  {
    id: "4",
    name: "Wild Safari Adventure",
    description: "A thrilling safari experience with exotic wildlife.",
    imageUrl: "/images/safari.jpg",
    location: "Safari Park Rd, Orlando, FL",
    rating: 4.9,
  },
  {
    id: "5",
    name: "Art & Culture Museum",
    description: "Explore world-class art and cultural exhibits.",
    imageUrl: "/images/museum.jpg",
    location: "456 Museum Lane, Chicago, IL",
    rating: 4.7,
  },
  {
    id: "6",
    name: "Cozy Cabin Getaway",
    description: "Relax in a charming cabin surrounded by nature.",
    imageUrl: "/images/cozy-cabin.jpg",
    location: "123 Forest Drive, Asheville, NC",
    rating: 4.4,
  },
  {
    id: "7",
    name: "Wine Tasting Tour",
    description: "Savor the finest wines in the region with guided tours.",
    imageUrl: "/images/wine-tasting.jpg",
    location: "456 Vineyard Way, Napa Valley, CA",
    rating: 4.8,
  },
  {
    id: "8",
    name: "Adventure Water Park",
    description: "Experience thrilling water slides and lazy rivers.",
    imageUrl: "/images/water-park.jpg",
    location: "789 Splash Ave, Las Vegas, NV",
    rating: 4.3,
  },
];


const page = () => {
  return (
    <ThemeProvider>
    <MainLayout title='Page'>
      <div className="max-w-[1000px] my-4 mx-auto">
        <div className="text-3xl text-green-600 font-bold pb-4">Welcome to TouRingo!</div>
        <h1>Attractions</h1>
        <div>
        <EventTable events={events} />
        </div>

      </div>
    </MainLayout>
  </ThemeProvider>
  );
};

export default page;

