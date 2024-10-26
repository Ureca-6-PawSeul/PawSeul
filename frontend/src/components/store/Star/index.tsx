import { FaRegStar, FaStar } from 'react-icons/fa';
import { Flex } from '@components/common/Flex';

const StarRating = ({ score }: { score: number }) => {
  return (
    <Flex width={40} height={12}>
      {Array.from({ length: 5 }, (_, index) => {
        const key = index + 1;
        return key <= score ? (
          <FaStar key={key} size={12} />
        ) : (
          <FaRegStar key={key} size={12} />
        );
      })}
    </Flex>
  );
};

export default StarRating;
