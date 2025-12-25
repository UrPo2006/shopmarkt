import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
  totalStars?: number;
}

export default function Rating({ rating, totalStars = 5 }: RatingProps) {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-xl" />);
    } else if (i - rating < 1 && i - rating > 0) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-xl" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400 text-xl" />);
    }
  }

  return (
    <div className="flex items-center gap-2">
     
      <div className="flex gap-1">
        {stars}
      </div>

     
     <div className="dark:text-white">
       <span className=" text-sm font-medium">
       ({rating})
      </span>
     </div>
    </div>
  );
}
