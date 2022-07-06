{
  /**
   * 절차지향적으로 커피기계 만들기☕️
   */
  //커피 타입
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
    // hasIce: boolean;
    // hasSyrup: boolean;
  };
  const BEANS_GRAM_PER_SHOT = 7; //커피 한잔을 만드는 데 필요한 커피콩(g)
  let totalCoffeeBeans: number = 0; //전체 커피콩(g)

  //커피를 만드는 함수
  function makeCoffe(shots: number): CoffeeCup {
    if (shots < 1) throw new Error(`${shots}샷은 잘못된 입력입니다.`);
    if (totalCoffeeBeans < BEANS_GRAM_PER_SHOT * shots) throw new Error('커피콩이 부족합니다.');

    //만들어지는 샷만큼 커피 콩(g) 사용
    totalCoffeeBeans -= BEANS_GRAM_PER_SHOT * shots;

    return { shots, hasMilk: false };
  }

  //실행 테스트
  totalCoffeeBeans += BEANS_GRAM_PER_SHOT * 10;
  const coffee = makeCoffe(2);
  console.log(coffee, totalCoffeeBeans);
}
