import React from "react";

type Event = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  rating: number;
};

type EventRowProps = {
  event: Event;
};



const EventRow: React.FC<EventRowProps> = ({ event }) => {
  return (
    <div className="event-row">
      {/* Inline style to control the image size */}
      <img 
        src={event.imageUrl} 
        alt={event.name} 
        style={{ width: '300px', height: 'auto' }}  // Adjust the width and height as needed
      />
      <div className="event-details">
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Rating:</strong> {event.rating} / 5</p>
      </div>
    </div>
  );
};

export default EventRow;
