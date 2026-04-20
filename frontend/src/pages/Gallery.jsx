import React, { useState } from 'react';

const Gallery = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    // Featured Luxury Images
    { id: 'unsplash-featured-1', src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=800&fit=crop' },
    { id: 'unsplash-featured-2', src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop' },
    { id: 'unsplash-featured-3', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop' },
    { id: 'unsplash-featured-4', src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop' },
    { id: 'unsplash-featured-5', src: 'https://images.unsplash.com/photo-1566367711988-89fc1529141f?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1566367711988-89fc1529141f?w=1200&h=800&fit=crop' },
    { id: 'unsplash-featured-6', src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=800&fit=crop' },
    { id: 'unsplash-featured-7', src: 'https://images.unsplash.com/photo-1541339907198-e08756edd811?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1541339907198-e08756edd811?w=1200&h=800&fit=crop' },
    { id: 'new-p-1', src: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&h=800&fit=crop' },
    { id: 'new-p-2', src: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?w=1200&h=800&fit=crop' },
    { id: 'new-p-3', src: 'https://images.unsplash.com/photo-1522335789203-aa9fb3d5133b?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1522335789203-aa9fb3d5133b?w=1200&h=800&fit=crop' },
    { id: 'new-p-4', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop' },
    // Unsplash images
    { id: 'unsplash-1', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop' },
    { id: 'unsplash-2', src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop' },
    { id: 'unsplash-3', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop' },
    { id: 'unsplash-4', src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop' },
    { id: 'unsplash-5', src: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&h=800&fit=crop' },
    { id: 'unsplash-6', src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop' },
    { id: 'unsplash-7', src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop' },
    { id: 'unsplash-8', src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop' },
    // Original images
    { id: 1, src: 'glimgs1/s/AKS09763_n.jpg?id=7039', fullSrc: 'glimgs1/AKS09763_n.jpg?id=7039' },
    { id: 2, src: 'glimgs1/s/AKS09817_n.jpg?id=7039', fullSrc: 'glimgs1/AKS09817_n.jpg?id=7039' },
    { id: 3, src: 'glimgs1/s/AKS09882_n.jpg?id=7039', fullSrc: 'glimgs1/AKS09882_n.jpg?id=7039' },
    { id: 4, src: 'glimgs1/s/AKS09889_n.jpg?id=7039', fullSrc: 'glimgs1/AKS09889_n.jpg?id=7039' },
    { id: 5, src: 'glimgs1/s/AKS09927_n.jpg?id=7039', fullSrc: 'glimgs1/AKS09927_n.jpg?id=7039' },
    { id: 6, src: 'glimgs1/s/DJI_0405_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0405_n.jpg?id=7039' },
    { id: 7, src: 'glimgs1/s/DJI_0410_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0410_n.jpg?id=7039' },
    { id: 8, src: 'glimgs1/s/DJI_0413_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0413_n.jpg?id=7039' },
    { id: 9, src: 'glimgs1/s/DJI_0426_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0426_n.jpg?id=7039' },
    { id: 10, src: 'glimgs1/s/DJI_0427_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0427_n.jpg?id=7039' },
    { id: 11, src: 'glimgs1/s/DJI_0429_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0429_n.jpg?id=7039' },
    { id: 12, src: 'glimgs1/s/DJI_0432_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0432_n.jpg?id=7039' },
    { id: 13, src: 'glimgs1/s/DJI_0437_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0437_n.jpg?id=7039' },
    { id: 14, src: 'glimgs1/s/DJI_0439_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0439_n.jpg?id=7039' },
    { id: 15, src: 'glimgs1/s/DJI_0470_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0470_n.jpg?id=7039' },
    { id: 16, src: 'glimgs1/s/DJI_0485_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0485_n.jpg?id=7039' },
    { id: 17, src: 'glimgs1/s/DJI_0494_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0494_n.jpg?id=7039' },
    { id: 18, src: 'glimgs1/s/DJI_0500_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0500_n.jpg?id=7039' },
    { id: 19, src: 'glimgs1/s/DJI_0501_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0501_n.jpg?id=7039' },
    { id: 20, src: 'glimgs1/s/DJI_0514_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0514_n.jpg?id=7039' },
    { id: 21, src: 'glimgs1/s/DJI_0517_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0517_n.jpg?id=7039' },
    { id: 22, src: 'glimgs1/s/DJI_0518_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0518_n.jpg?id=7039' },
    { id: 23, src: 'glimgs1/s/DJI_0522_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0522_n.jpg?id=7039' },
    { id: 24, src: 'glimgs1/s/DJI_0526_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0526_n.jpg?id=7039' },
    { id: 25, src: 'glimgs1/s/DJI_0528_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0528_n.jpg?id=7039' },
    { id: 26, src: 'glimgs1/s/DJI_0543_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0543_n.jpg?id=7039' },
    { id: 27, src: 'glimgs1/s/DJI_0545_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0545_n.jpg?id=7039' },
    { id: 28, src: 'glimgs1/s/DJI_0546_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0546_n.jpg?id=7039' },
    { id: 29, src: 'glimgs1/s/DJI_0548_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0548_n.jpg?id=7039' },
    { id: 30, src: 'glimgs1/s/DJI_0554_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0554_n.jpg?id=7039' },
    { id: 31, src: 'glimgs1/s/DJI_0555_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0555_n.jpg?id=7039' },
    { id: 32, src: 'glimgs1/s/DJI_0569_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0569_n.jpg?id=7039' },
    { id: 33, src: 'glimgs1/s/DJI_0585_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0585_n.jpg?id=7039' },
    { id: 34, src: 'glimgs1/s/DJI_0598_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0598_n.jpg?id=7039' },
    { id: 35, src: 'glimgs1/s/DJI_0603_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0603_n.jpg?id=7039' },
    { id: 36, src: 'glimgs1/s/DJI_0606_n.jpg?id=7039', fullSrc: 'glimgs1/DJI_0606_n.jpg?id=7039' },
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gallery</h1>
        </div>

        <div className="mb-4">
          <div className="row">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 list-none">
              {images.map((image) => (
                <li key={image.id} className="cursor-pointer" onClick={() => openLightbox(image)}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                        src={image.src}
                        alt="Gallery image"
                        style={{ borderRadius: '5px' }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeLightbox}>
          <div className="max-w-4xl max-h-full p-4">
            <img
              src={selectedImage.fullSrc}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={closeLightbox}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;