// 영어-한글 키 매핑
const keyMappings: Record<string, string> = {
  main_ingredient: '주 원료',
  food_function: '식품 기능',
  target_age: '대상 연령',
  food_type: '식품 종류',
  target_size: '대상 크기',
  is_grainfree: '그레인프리 여부',
  snack_type: '간식 종류',
  supplement_type: '보조제 종류',
};

const tableData = (data: Record<string, any>) => {
  // data 객체의 키 배열 생성
  const keys = Object.keys(data);
  // description_img 키의 인덱스 찾기
  const startIdx = keys.indexOf('description_img') + 1;

  // description_img 이후의 키만 선택하여 새로운 객체 생성
  // reduce 함수의 초기값 타입 설정
  const afterDescriptionImg = keys.slice(startIdx).reduce((obj, key) => {
    const translatedKey = keyMappings[key] || key;
    // is_grainfree 키의 값이 boolean이므로 한글로 변환
    if (key === 'is_grainfree') {
      obj[translatedKey] = data[key] ? '그레인프리' : '그레인프리 아님';
    } else {
      obj[translatedKey] = data[key as keyof typeof data];
    }
    return obj;
  }, {} as Record<string, any>);

  // JSON 문자열로 리턴
  return afterDescriptionImg;
};

export default tableData;
