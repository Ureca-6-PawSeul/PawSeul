import { FaStar } from 'react-icons/fa';
import { Flex } from '@components/common/Flex';
import { colors } from '@styles/colors';

interface StarRatingProps {
  score: number;
  size?: number;
  width?: number;
  gap?: number;
}

const StarRating = ({
  score,
  size = 12,
  width = 40,
  gap = 0,
}: StarRatingProps) => {
  return (
    <Flex width={width} height={size} gap={gap}>
      {Array.from({ length: 5 }, (_, index) => {
        const key = index + 1;
        return key <= score ? (
          <FaStar key={key} size={size} color={colors.Star} />
        ) : (
          <FaStar key={key} size={size} color={colors.Gray200} />
        );
      })}
    </Flex>
  );
};

export default StarRating;
