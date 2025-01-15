import React from 'react';

interface StaticMapProps {
  address: string;
}

const StaticGoogleMap: React.FC<StaticMapProps> = ({ address}) => {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;

  return (
    <div className="w-full h-64">
      <iframe
        title="Google Map"
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

export default StaticGoogleMap;