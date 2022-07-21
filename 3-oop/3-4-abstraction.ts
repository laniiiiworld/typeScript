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
   * 🌼 인터페이스
   *  - 계약서, 사용설명서
   *  - 네이밍 시에는 외부에서 사용하는 이름을 고려
   */

  //커피 타입
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  //인터페이스
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }
  interface CommercialCoffeeMaker {
    fillCoffeeBeans(coffeeBeans: number): void;
    makeCoffee(shots: number): CoffeeCup;
    clean(): void;
  }

  //커피기계. 구현하는 클래스 ex) CoffeeMakerImpl
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7; //커피 한잔을 만드는 데 필요한 커피콩(g)

    private coffeeBeans: number = 0;
    private milk: number = 0;

    private constructor(coffeeBeans: number, milk: number) {
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

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }
  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(30);
      this.machine.clean();
    }
  }
  //실행 테스트
  const maker: CoffeeMachine = CoffeeMachine.makeCoffeeMachine(50, 0);
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);
  amateur.makeCoffee();
  pro.makeCoffee();
}
