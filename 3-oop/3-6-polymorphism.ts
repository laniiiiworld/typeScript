{
  /**
   * 객체지향적으로 커피기계 만들기(+다형성)☕️
   * 🌼 다형성이란?
   * - 하나의 인터페이스나 부모의 클래스를 상속한 자식 클래스들이 인터페이스와 부모 클래스에 있는 함수들을 다른 방식으로 다양하게 구성하여 사용하는 것.
   * - 인터페이스와 부모 클래스에 있는 동일한 함수 API를 통해
   * -  => 각각 구현된 자식 클래스의 내부 구현사항을 신경쓰지 않고,
   * -  => 약속된 한가지의 API를 호출함으로써
   * -  => 사용하는 사람도 간편하게 다양한 기능들을 활용할 수 있도록 도와주는 것.
   */

  //커피 타입
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSuger?: boolean;
  };

  //인터페이스
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  //커피기계
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7; //커피 한잔을 만드는 데 필요한 커피콩(g)

    private coffeeBeans: number = 0;
    private milk: number = 0;

    constructor(coffeeBeans: number, milk: number) {
      this.coffeeBeans = coffeeBeans;
      this.milk = milk;
    }

    //커피머신을 만드는 함수
    static makeCoffeeMachine(coffeeBeans: number, milk: number) {
      if (coffeeBeans < 0) throw new Error(`커피콩은 0보다 커야합니다.(입력 : ${coffeeBeans})`);
      return new CoffeeMachine(coffeeBeans, milk);
    }

    //커피를 채워준다.
    fillCoffeeBeans(coffeeBeans: number) {
      if (coffeeBeans < 0) throw new Error(`커피콩은 0보다 커야합니다.(입력 : ${coffeeBeans})`);
      this.coffeeBeans += coffeeBeans;
      console.log(`커피 콩이 채워졌습니다.(잔여 : ${this.coffeeBeans})`);
    }

    private grindBeans(shots: number) {
      if (shots < 1) throw new Error(`${shots}샷은 0보다 커야합니다.`);
      if (this.coffeeBeans < CoffeeMachine.BEANS_GRAM_PER_SHOT * shots) throw new Error('커피콩이 부족합니다.');

      this.coffeeBeans -= CoffeeMachine.BEANS_GRAM_PER_SHOT * shots;

      console.log('커피 가는중...');
    }
    private preheat() {
      console.log('기계를 데우는 중...🔥');
    }
    private extract(shots: number): CoffeeCup {
      console.log('커피를 추출하는 중...');
      return { shots, hasMilk: false };
    }
    //커피를 만드는 함수
    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }

    clean() {
      console.log('기계를 청소중입니다...🫧');
    }
  }

  //카페라떼 기계
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, milk: number, public readonly serialNumber: String) {
      super(beans, milk);
    }
    private steamMilk() {
      console.log('우유를 데우는 중...🥛');
    }
    //커피를 만드는 함수
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return { ...coffee, hasMilk: true };
    }
  }

  //커피에 설탕을 추가해주는 기계
  class SweetCoffeeMaker extends CoffeeMachine {
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return { ...coffee, hasSuger: true };
    }
  }

  //실행 테스트
  const machines = [
    //
    new CoffeeMachine(16, 0),
    new CaffeLatteMachine(16, 0, '001'),
    new SweetCoffeeMaker(16, 0),
    new CoffeeMachine(16, 0),
    new CaffeLatteMachine(16, 0, '002'),
    new SweetCoffeeMaker(16, 0),
  ];
  //🌼 각각 구현된 자식 클래스의 내부 구현사항을 신경쓰지 않고, 약속된 한가지의 API를 호출
  //🌼 사용하기 간편하다
  machines.forEach((machine) => {
    console.log('---------------------------');
    machine.makeCoffee(2);
  });
}
