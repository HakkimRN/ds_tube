import React, { useRef } from "react";
import Button from "./Button";

const ButtonList = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = 100;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex fixed items-center z-40 w-full top-24 overflow-hidden">
      <button
        onClick={() => scroll('left')}
        className="bg-gray-800 hover:bg-gray-700 text-red-600 font-bold py-4 px-3 rounded-2xl"
      >
        &lt;
      </button>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto bg-transparent scroll-smooth w-full whitespace-nowrap scrollbar-hide"
      >
        <Button name="All" />
        <Button name="Gaming" />
        <Button name="News" />
        <Button name="Tech" />
        <Button name="Space" />
        <Button name="All" />
        <Button name="Gaming" />
        <Button name="News" />
        <Button name="Tech" />
        <Button name="Space" />
        <Button name="All" />
        <Button name="Gaming" />
        <Button name="News" />
        <Button name="Tech" />
        <Button name="Space" />
        <Button name="All" />
        <Button name="Gaming" />
        <Button name="News" />
        <Button name="Tech" />
        <Button name="Space" />
      </div>
      <button
        onClick={() => scroll('right')}
        className="bg-gray-800 hover:bg-gray-700 text-red-600 font-bold py-4 px-3 rounded-2xl"
      >
        &gt;
      </button>
    </div>
  );
};

export default ButtonList;


