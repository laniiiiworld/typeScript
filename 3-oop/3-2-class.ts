{
  /**
   * 객체지향적으로 커피기계 만들기☕️
   */
  //커피 타입
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  //커피기계
  class CoffeeMachine {
    //class level. 클래스 자체에 만들어져 인스턴스 사이에서 공유된다. 클래스 이름으로 접근.
    static BEANS_GRAM_PER_SHOT = 7; //커피 한잔을 만드는 데 필요한 커피콩(g)
    static MILK_LITER_PER_CUP = 0.35; //커피 한잔을 만드는 데 필요한 우유(l)

    //instance (object) level. 멤버변수. this로 접근.
    coffeeBeans: number = 0;
    milk: number = 0;

    constructor(coffeeBeans: number, milk: number) {
      this.coffeeBeans = coffeeBeans;
      this.milk = milk;
    }
    //커피를 만드는 함수
    makeCoffe(shots: number, isMilk: boolean): CoffeeCup {
      if (shots < 1) throw new Error(`${shots}샷은 잘못된 입력입니다.`);
      if (this.coffeeBeans < CoffeeMachine.BEANS_GRAM_PER_SHOT * shots) throw new Error('커피콩이 부족합니다.');
      if (isMilk && this.milk < CoffeeMachine.MILK_LITER_PER_CUP) throw new Error('우유가 부족합니다.');

      //만들어지는 샷(커피콩)과 우유 사용
      this.coffeeBeans -= CoffeeMachine.BEANS_GRAM_PER_SHOT * shots;
      if (isMilk) this.milk -= CoffeeMachine.MILK_LITER_PER_CUP;

      return { shots, hasMilk: isMilk };
    }
  }
  //실행 테스트
  const coffeeBrewer = new CoffeeMachine(70, 2);
  const espresso = new CoffeeMachine(50, 0);

  const coffee1 = coffeeBrewer.makeCoffe(2, true);
  const coffee2 = espresso.makeCoffe(3, false);

  console.log(coffeeBrewer);
  console.log(espresso);

  console.log(coffee1);
  console.log(coffee2);
}
