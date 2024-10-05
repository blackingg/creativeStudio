import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { FaTimes } from "react-icons/fa";

const galleryData = [
  {
    id: 1,
    title: "Pop",
    description:
      "A vibrant autumn forest, showcasing a spectrum of warm colors as leaves change their hues.",
    type: "image",
    url: "/img/gallery/Pop.png",
  },
  {
    id: 2,
    title: "CHARGE - Blender Open Movie",
    description:
      "A timelapse video capturing the pulsating energy of a bustling cityscape from day to night.",
    type: "video",
    url: "https://www.youtube.com/watch?v=UXqq0ZvbOnk",
  },
  {
    id: 3,
    title: "White-haired Girl",
    description:
      "A breathtaking view of the sun setting over calm waters, painting the sky in hues of orange and purple.",
    type: "image",
    url: "/img/gallery/WhiteHairedGirl.png",
  },
  {
    id: 4,
    title: "Dawn",
    description:
      "An immersive video journey through a coral reef, revealing the diverse marine life in crystal clear waters.",
    type: "video",
    url: "https://www.youtube.com/watch?v=UqaIGkQE3O0",
  },
  {
    id: 5,
    title: "Sprite Fright - Blender Open Movie",
    description:
      "A mesmerizing video showcasing the rotation of stars in the night sky over a tranquil landscape.",
    type: "video",
    url: "https://www.youtube.com/watch?v=_cMxraX_5RE",
  },

  {
    id: 6,
    title: "Mephisto",
    description:
      "Sweeping sand dunes stretching to the horizon, their shapes ever-changing in the shimmering heat.",
    type: "image",
    url: "/img/gallery/Mephisto.png",
  },
  {
    id: 7,
    title: "Ancient Cathedral",
    description:
      "A vibrant mural bringing life and color to an urban wall, telling stories through intricate designs.",
    type: "image",
    url: "/img/gallery/AncientCathedral.png",
  },
  {
    id: 8,
    title: "Mountain Majesty",
    description:
      "A panoramic view of snow-capped mountains piercing through a sea of clouds at dawn.",
    type: "image",
    url: "/img/gallery/Cloud.png",
  },
];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    if (selectedItem) {
      gsap.from(".modal-content", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [selectedItem]);

  const firstRowItems = galleryData.slice(0, 4);
  const secondRowItems = galleryData.slice(4);

  const getRowBasis = (index, rowIndex) => {
    if (rowIndex === 0) {
      return index % 2 === 0
        ? "basis-[60%] md:basis-[42%] lg:w-[30%]"
        : "basis-[80%] md:basis-[50%] lg:w-[60%]";
    } else {
      return index % 2 === 0
        ? "basis-[80%] md:basis-[42%] lg:w-[25%]"
        : "basis-full md:basis-[50%] lg:w-[70%]";
    }
  };

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getThumbnailUrl = (item) => {
    if (item.type === "video") {
      const videoId = getYouTubeVideoId(item.url);
      return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : "";
    }
    return item.url;
  };

  const renderGalleryItem = (item, rowIndex) => {
    const basisClass = getRowBasis(item.id - 1, rowIndex);
    const thumbnailUrl = getThumbnailUrl(item);

    return (
      <div
        key={item.id}
        className={`${basisClass} flex flex-col`}
      >
        <div
          className="relative group bg-gray-200 rounded-lg overflow-hidden w-[60vw] lg:w-full cursor-pointer"
          onClick={() => openModal(item)}
          style={{
            height: "25vh",
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-center items-center backdrop-blur-md transition-opacity duration-300 text-white opacity-0 group-hover:opacity-100">
            <p className="text-xl">
              {item.type === "video" ? "Click to play" : "Click to view"}
            </p>
          </div>
        </div>
        <h3 className="lg:text-xl font-bold mt-2">{item.title}</h3>
      </div>
    );
  };

  return (
    <div className="h-screen relative w-full bg-black text-[#fff] px-4 lg:px-8 lg:py-14">
      <div className="lg:mx-[10%]">
        <h2 className="text-4xl font-bold mb-8 pt-7 lg:pt-1">Gallery</h2>
        <div className="flex flex-col gap-4">
          <div className="flex scrollbar-none overflow-x-auto pb-4 gap-4">
            {firstRowItems.map((item, index) => renderGalleryItem(item, 0))}
          </div>
          <div className="flex scrollbar-none overflow-x-auto pb-4 gap-4">
            {secondRowItems.map((item, index) => renderGalleryItem(item, 1))}
          </div>
        </div>
      </div>
      {selectedItem && (
        <GalleryModal
          item={selectedItem}
          closeModal={closeModal}
          getYouTubeVideoId={getYouTubeVideoId}
        />
      )}
    </div>
  );
};

const GalleryModal = ({ item, closeModal, getYouTubeVideoId }) => {
  const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };
  return (
    <div
      className="fixed inset-0 backdrop-blur-2xl flex flex-row items-center justify-center z-50 p-4 sm:p-6 md:p-8"
      onClick={closeModal}
    >
      <div
        className="text-white overflow-hidden w-screen h-screen flex flex-col gap-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={closeModal}
          className="alt-cursor absolute top-2 left-4 bg-[#8e8d4c] p-3 rounded-full text-white z-max hover:bg-[#55542e] transition-colors duration-200"
        >
          <FaTimes size={20} />
        </div>

        <div className="alt-cursor h-screen max-h-[80%] py-4 pt-10 px-3">
          {item.type === "image" ? (
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <iframe
              src={getYouTubeEmbedUrl(item.url)}
              title={item.title}
              className="w-full h-full rounded-lg object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="p-3 md:p-8 my-auto">
          <h2 className="text-2xl lg:text-5xl font-semibold mb-4">
            {item.title}
          </h2>
          <p className="text-lg lg:text-2xl mb-4">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
