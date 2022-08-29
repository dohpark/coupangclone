import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";

const Star: React.FC<StarProps> = ({ rating }) => {
  const starCheck = ["star", "star", "star", "star", "star"].map((v, i) => {
    if (rating >= i + 1) return "starFilled";
    if (rating >= i + 0.5) return "starHalf";
    else return "starEmpty";
  });

  return (
    <span>
      {starCheck.map((type, index) => {
        if (type === "starFilled")
          return (
            <FontAwesomeIcon
              key={"faStar" + index}
              icon={faStar}
              style={{ color: "#F5C400" }}
            />
          );
        if (type === "starHalf")
          return (
            <FontAwesomeIcon
              key={"faStarHalfStroke" + index}
              icon={faStarHalfStroke}
              style={{ color: "#F5C400" }}
            />
          );
        if (type === "starEmpty")
          return (
            <FontAwesomeIcon
              key={"faEmptyStar" + index}
              icon={faEmptyStar}
              style={{ color: "#F5C400" }}
            />
          );
      })}
    </span>
  );
};

interface StarProps {
  rating: number;
}

export default Star;
