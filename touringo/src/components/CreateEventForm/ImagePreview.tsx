import React from "react";

interface ImagePreviewProps {
  src: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src }) => (
  <div className="mb-4">
    <img src={src} alt="Preview" className="w-full max-h-64 object-cover rounded" />
  </div>
);

export default ImagePreview;
