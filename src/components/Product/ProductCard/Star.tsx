import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";

const Star: React.FC<StarProps> = ({ rating }) => {
  const starCheck = [0, 0, 0, 0, 0].map((v, i) => {
    if (rating >= i + 1) return 3;
    if (rating >= i + 0.5) return 2;
    else return 1;
  });

  return (
    <span>
      {starCheck.map((type, index) => {
        if (type === 3)
          return (
            <FontAwesomeIcon
              key={"faStar" + index}
              icon={faStar}
              style={{ color: "#F5C400" }}
            />
          );
        if (type === 2)
          return (
            <FontAwesomeIcon
              key={"faStarHalfStroke" + index}
              icon={faStarHalfStroke}
              style={{ color: "#F5C400" }}
            />
          );
        if (type === 1)
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
