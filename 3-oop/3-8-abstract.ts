{
  /**
   * 객체지향적으로 커피기계 만들기(+Abstract)☕️
   * 🌼 Abstract
   * - 상속을 할 때 어떤 특정한 기능만 부모클래스와 상관없이 새롭게 구현되는 경우 사용
   * - abstract 클래스를 생성하면 인스턴스를 만들 수 없다❌.
   * - => 추상 클래스가 된다.
   * - => abstract 클래스 자체는 만들어지는 것을 목적으로 하지 않는다.
   * - abstract 함수는 인터페이스처럼 함수이름, 인자, 리턴값만 정의할 수 있다.
   * - => 내부 구현사항을 작성할 수 없다.
   * - => 상속을 할 때 공통적인 기능들을 구현하고, 구현하는 클래스마다 달라져야하는 내용이 있다면 그 부분만 abstract함수로 정의할 수 있다.
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

  //🌼 커피기계
  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7; //커피 한잔을 만드는 데 필요한 커피콩(g)

    private coffeeBeans: number = 0;
    private milk: number = 0;

    constructor(coffeeBeans: number, milk: number) {
      this.coffeeBeans = coffeeBeans;
      this.milk = milk;
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
    //🌼 커피 추출
    protected abstract extract(shots: number): CoffeeCup;

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
    //❗️커피를 만드는 함수
    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return { shots, hasMilk: true };
    }
  }

  //❗️커피에 설탕을 추가해주는 기계
  class SweetCoffeeMaker extends CoffeeMachine {
    protected extract(shots: number): CoffeeCup {
      return { shots, hasSuger: true };
    }
  }

  //실행 테스트
  const machines = [
    //
    new CaffeLatteMachine(16, 0, '001'),
    new SweetCoffeeMaker(16, 0),
    new CaffeLatteMachine(16, 0, '002'),
    new SweetCoffeeMaker(16, 0),
  ];
  machines.forEach((machine) => {
    console.log('---------------------------');
    machine.makeCoffee(2);
  });
}
