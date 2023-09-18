import axios from "axios";
import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { apiURL } from "../api/config";

export const CarouselImages = ( {id} : props ) => {
  const [images, setImages] = useState([{image_name: ''}]);
  const [currentIndex, setCurrentIndex] = useState(0);

    const getImages = async () => {
      try {
        const {data} = await axios.get(
`          ${apiURL}giveaway/images/${id}`
        );
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getImages();
    }, []);


  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="h-[780px] w-full m-auto mt-10 group mb-16">
      <div
        style={{ backgroundImage: `url(https://black-diamond-back-production.up.railway.app/uploads/${images[currentIndex].image_name})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      <div className="flex top-4 justify-center py-2">
        {images.map((image, imageIndex) => (
          <div
            key={imageIndex}
            onClick={() => goToSlide(imageIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};
