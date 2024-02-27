import { Rating } from "flowbite-react";

function DynamicRating({ numberOfStars, showText = true }) {
  const filledStars = Array.from({ length: numberOfStars }, (_, index) => (
    <Rating.Star key={index} />
  ));

  const emptyStars = Array.from({ length: 5 - numberOfStars }, (_, index) => (
    <Rating.Star key={numberOfStars + index} filled={false} />
  ));

  return (
    <div className="flex items-center">
      <Rating>
        {filledStars}
        {emptyStars}
      </Rating>

      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {showText && `${numberOfStars} out of 5`}
      </p>
    </div>
  );
}

export default DynamicRating;
