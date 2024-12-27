
// // example of how to request and display image
// import React, { useState, useEffect } from 'react';

// const BinaryImageDisplay: React.FC = () => {
//     const [imageUrl, setImageUrl] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchImage = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/image/myImage');
//                 if (response.ok) {
//                     const blob = await response.blob();
//                     setImageUrl(URL.createObjectURL(blob)); // Convert binary data to a URL
//                 } else {
//                     console.error('Failed to fetch image');
//                 }
//             } catch (error) {
//                 console.error('Error fetching image:', error);
//             }
//         };

//         fetchImage();
//     }, []);

//     return (
//         <div>
//             {imageUrl ? (
//                 <img src={imageUrl} alt="Binary Image" style={{ width: '100%', height: 'auto' }} />
//             ) : (
//                 <p>Loading image...</p>
//             )}
//         </div>
//     );
// };

// export default BinaryImageDisplay;
