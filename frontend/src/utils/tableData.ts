// 영어-한글 키 매핑
const keyMappings: Record<string, string> = {
  mainIngredient: '주 원료',
  productFunction: '제품 기능',
  targetAge: '대상 연령',
  foodType: '식품 종류',
  targetSize: '대상 크기',
  isGrainfree: '그레인프리 여부',
  snackType: '간식 종류',
  supplementType: '보조제 종류',
};

const tableData = (data: Record<string, any>) => {
  // data 객체의 키 배열 생성
  const keys = Object.keys(data);
  // description_img 키의 인덱스 찾기
  const startIdx = keys.indexOf('descriptionImg') + 1;

  // description_img 이후의 키만 선택하여 새로운 객체 생성
  // reduce 함수의 초기값 타입 설정
  const afterDescriptionImg = keys.slice(startIdx).reduce((obj, key) => {
    const translatedKey = keyMappings[key] || key;
    // is_grainfree 키의 값이 boolean이므로 한글로 변환
    if (key === 'isGrainfree') {
      obj[translatedKey] = data[key] ? '그레인프리' : '그레인프리 아님';
    } else if (key === 'averageScore') {
      // averageScore 키는 포함하지 않음
    }
    else {
      obj[translatedKey] = data[key as keyof typeof data];
    }
    return obj;
  }, {} as Record<string, any>);

  // console.log(afterDescriptionImg);

  // JSON 문자열로 리턴
  return afterDescriptionImg;
};

export default tableData;
