import styled from '@emotion/styled';
import { colors } from '@styles/colors';
import { Text } from '@components/common/Typo';

interface DetailTableProps {
  tableData: Record<string, any>;
}

const DetailTable = ({ tableData }: DetailTableProps ) => {
  return (
    <Table>
      <TableBody>
        {
          Object.entries(tableData).map(([key, value]) => (
            <TableRow key={key}>
              <TableData bgColor={colors.Gray50} width="30%">
                <Text typo="Body3" colorCode={colors.Gray500}>
                  {key}
                </Text>
              </TableData>
              <TableData bgColor={colors.White} width="70%">
                <Text typo="Body3" colorCode={colors.Gray700}>
                  {value}
                </Text>
              </TableData>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableBody = styled.tbody`
  display: table-row-group;
`;

const TableRow = styled.tr`
  display: table-row;
  vertical-align: inherit;
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.Gray200};
`;

const TableData = styled.td<{
  bgColor?: string;
  width?: string;
}>`
  width: ${({ width }) => width ?? `${width}`};
  border-width: 1px;
  padding: 8px 12px;
  background-color: ${({ bgColor }) => bgColor ?? `${bgColor}`};
`;

export default DetailTable;
