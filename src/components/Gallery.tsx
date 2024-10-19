import React, { useState } from 'react';

interface GalleryProps {
  mainPhoto: string;
  photos: string[];
  showThumbnails?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ mainPhoto, photos, showThumbnails = false }) => {
  const [currentPhoto, setCurrentPhoto] = useState(mainPhoto);

  return (
    <div className="gallery">
      <div className="main-photo">
        <img src={`/uploads/${currentPhoto}`} alt="Hovedbilde" className="w-full h-auto" />
      </div>
      {showThumbnails && (
        <div className="thumbnails flex mt-4 space-x-2">
          {[mainPhoto, ...photos].map((photo, index) => (
            <img
              key={index}
              src={`/uploads/${photo}`}
              alt={`Miniatyrbilde ${index + 1}`}
              className={`w-20 h-20 object-cover cursor-pointer ${photo === currentPhoto ? 'border-2 border-blue-500' : ''}`}
              onClick={() => setCurrentPhoto(photo)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
