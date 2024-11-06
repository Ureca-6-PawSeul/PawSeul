import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { colors } from '@styles/colors';
import { Text } from '@components/common/Typo';
import StarRating from '@components/store/Star';

interface ReviewStatsProps {
  score: number;
  scoreCounts: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

const ReviewStats = ({ score, scoreCounts }: ReviewStatsProps) => {
  const totalReviewCount = Object.values(scoreCounts).reduce(
    (acc, cur) => acc + cur,
    0,
  );

  return (
    <Flex
      gap={24}
      padding="16px 24px"
      backgroundColor={colors.Gray50}
      borderRadius={1}
      margin="16px 0px"
    >
      <Flex direction="column" gap={8} width="auto">
        <ScoreText typo="Heading1">{score}</ScoreText>
        <StarRating score={score} size={14} width={74} gap={1} />
      </Flex>
      <VerticalLine />
      <Flex direction="column">
        {Object.entries(scoreCounts).map(([key, count]) => (
          <Flex gap={8} key={key}>
            <ReviewText typo="Body3" colorCode={colors.Gray200} width="10%">
              {key}점
            </ReviewText>
            <StatusBarWrapper>
              <StatusBarBase />
              {count > 0 ? (
                <StatusBarFill ratio={(count / totalReviewCount) * 100} />
              ) : (
                <StatusBarFill ratio={0} />
              )}
            </StatusBarWrapper>
            <ReviewText typo="Body3" colorCode={colors.Gray200} width="20%">
              {count}
            </ReviewText>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

const ScoreText = styled(Text)`
  font-size: 28px;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 96px;
  background-color: ${colors.Gray200};
`;

const ReviewText = styled(Text)<{
  width?: string;
}>`
  white-space: nowrap;
  width: ${({ width }) => (width ? width : 'auto')};
  font-size: 12px;
`;

const StatusBarWrapper = styled.div`
  position: relative;
  width: 70%;
`;

const StatusBarBase = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${colors.Gray100};
  border-radius: 10px;
`;

const StatusBarFill = styled.div<{ ratio: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ ratio }) => `${ratio}%`};
  height: 6px;
  background-color: ${colors.Mint200};
  border-radius: 10px;
`;

export default ReviewStats;
