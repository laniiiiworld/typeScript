{
  /**
   * 객체지향적으로 커피기계 만들기(+추상화)☕️
   * 🌼 추상화란?
   *  - 정말 필요한 기능만 노출해서 양식을 조금 더 간단하게 만드는 프로세스 자체를 의미
   *  - 여러 클래스에 걸쳐서 공통적으로 사용되는 함수들의 규격을 정의하는 것
   * 🌼 추상화 포인트
   *  - 어떻게 사용할 수 있도록 할 것인가?
   *  - 무엇을 사용할 수 있도록 할 것인가?
   * 🌼 추상화 구현 방법
   * 1. 접근제어자를 사용하여 캡슐화를 통한 추상화 성취
   * 2. 인터페이스
   */

  //커피 타입
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  /**
   * 외부에서 사용하는 이름
   */
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  //커피기계
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7; //커피 한잔을 만드는 데 필요한 커피콩(g)
    private static MILK_LITER_PER_CUP = 0.35; //커피 한잔을 만드는 데 필요한 우유(l)

    private coffeeBeans: number = 0;
    private milk: number = 0;

    private constructor(coffeeBeans: number, milk: number) {
      this.coffeeBeans = coffeeBeans;
      this.milk = milk;
    }

    //커피머신을 만드는 함수.
    static makeCoffeeMachine(coffeeBeans: number, milk: number) {
      if (coffeeBeans < 0) throw new Error(`커피콩은 0보다 커야합니다.(입력 : ${coffeeBeans})`);
      if (milk < 0) throw new Error(`우유는 0보다 커야합니다.(입력 : ${milk})`);
      return new CoffeeMachine(coffeeBeans, milk);
    }

    //커피를 채워준다.
    fillCoffeeBeans(coffeeBeans: number) {
      if (coffeeBeans < 0) throw new Error(`커피콩은 0보다 커야합니다.(입력 : ${coffeeBeans})`);
      this.coffeeBeans += coffeeBeans;
      console.log(`커피 콩이 채워졌습니다.(잔여 : ${this.coffeeBeans})`);
    }

    //우유를 채워준다.
    fillMilk(milk: number) {
      if (milk < 0) throw new Error(`우유는 0보다 커야합니다.(입력 : ${milk})`);
      this.milk += milk;
      console.log(`우유가 채워졌습니다.(잔여 : ${this.milk})`);
    }

    //커피를 만드는 함수
    makeCoffe(shots: number, isMilk: boolean): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
      /*
      if (shots < 1) throw new Error(`${shots}샷은 0보다 커야합니다.`);
      if (this.coffeeBeans < CoffeeMachine.BEANS_GRAM_PER_SHOT * shots) throw new Error('커피콩이 부족합니다.');
      if (isMilk && this.milk < CoffeeMachine.MILK_LITER_PER_CUP) throw new Error('우유가 부족합니다.');

      //만들어지는 샷(커피콩)과 우유 사용
      this.coffeeBeans -= CoffeeMachine.BEANS_GRAM_PER_SHOT * shots;
      if (isMilk) this.milk -= CoffeeMachine.MILK_LITER_PER_CUP;

      return { shots, hasMilk: isMilk };
      */
    }
  }
  //실행 테스트
  const coffeeBrewer: CoffeeMachine = CoffeeMachine.makeCoffeeMachine(70, 2);
  const espresso: CoffeeMaker = CoffeeMachine.makeCoffeeMachine(75, 0);
}
