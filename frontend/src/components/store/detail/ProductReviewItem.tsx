import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import { ReviewType } from '@assets/types/ReviewType';
import StarRating from '@components/store/Star';
import { ReviewText } from '@components/store/detail/ReviewText';
import { Hr } from '@components/store/Hr';
import { MdOutlinePets } from "react-icons/md";
import styled from '@emotion/styled';

interface ProductReviewItemProps {
  review: ReviewType;
}

const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  return (
    <>
      <Flex direction="column" padding="0px 16px" gap={16} align="flex-start">
        <Flex justify="space-between" align="flex-start">
          <Flex gap={12} justify="flex-start">
            <Profile backgroundColor={colors.Gray200} padding='8px' width='40px'>
              <MdOutlinePets size={24} color={colors.White}/>
            </Profile>
            <Flex
              direction="column"
              justify="flex-start"
              align="start"
              width="auto"
            >
              <Flex gap={4} height={20}>
                <Text typo="Body2">{review.pet.petname}</Text>
                <StarRating score={review.score} size={12} width={64} gap={1} />
              </Flex>
              <Flex gap={4} justify="flex-start">
                <ReviewText
                  typo="Body3"
                  colorCode={colors.Gray300}
                  fontWeight="lighter"
                >
                  {review.pet.age}살,{' '}
                </ReviewText>
                <ReviewText
                  typo="Body3"
                  colorCode={colors.Gray300}
                  fontWeight="lighter"
                >
                  {review.pet.weight}kg
                </ReviewText>
              </Flex>
            </Flex>
          </Flex>
          <ReviewText
            typo="Body3"
            colorCode={colors.Gray300}
            whiteSpace="nowrap"
            fontWeight="lighter"
          >
            {review.createdAt.slice(0, 10)}
          </ReviewText>
        </Flex>
        <ReviewText
          typo="Body3"
          colorCode={colors.Gray700}
          whiteSpace="pre-wrap"
          fontWeight="400"
          fontSize={14}
        >
          {review.text}
        </ReviewText>
      </Flex>
      <Hr />
    </>
  );
};

const Profile = styled(Flex)`
  border-radius: 50%;
`

export default ProductReviewItem;
