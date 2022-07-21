{
  /**
   * 객체지향적으로 커피기계 만들기(+composition)☕️
   * 🌼 불필요한 상속(Inheritance) 대신에 Composition(구성요소, 구성)을 선호하라.
   * 🌼 상속의 문제점
   * - 상속은 수직적으로 관계가 형성된다.
   * - => 부모 클래스를 수정하면 상속하는 모든 자식 클래스에 영향을 미친다.
   * - => 새로운 기능을 도입하려 할 때 상속의 구조가 복잡해 질 수 있다.
   * - ❗️타입스크립트는 부모 클래스를 하나만 상속할 수 있다.
   * 🌼 의존성 주입(Dependency Injection)
   * - 필요한 기능을 외부에서 주입받아 composition을 이용해서 재사용 하는 것.
   * - 객체간의 결합도(Coupling;두 소프트웨어 모듈 간에 상호 의존성 정도)를 낮추고, 유지보수가 좋은 코드를 만들어 준다.
   * - => 클래스 간에 너무 잘 알고 지내는 것은 좋지 않다.
   * - 디커플링(Decoupling)은 유연성, 재사용성을 높이지만 코드가 직관적이지 못할 수 있으므로 주의해야한다.
   * 🌼 디커플링(Decoupling)의 원칙
   * - 클래스들 간에 상호작용을 해야하는 경우, 클래스 자신을 직접 노출하는 것이 아니라 인터페이스(계약서)에 의거하여 의사소통하도록 한다.
   */

  //커피 타입
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  //인터페이스
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }
  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  //🥛 싸구려 우유 거품기
  class CheapMilkSteamer implements MilkFrother {
    private steamMilk() {
      console.log('우유를 데우는 중...🥛');
      return true;
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      const hasMilk = this.steamMilk();
      return { ...cup, hasMilk };
    }
  }
  //🥛 고급 우유 거품기
  class FancyMilkSteamer implements MilkFrother {
    private steamMilk() {
      console.log('고급 우유거품을 만드는 중...🥛');
      return true;
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      const hasMilk = this.steamMilk();
      return { ...cup, hasMilk };
    }
  }
  //🥛 차가운 우유 거품기
  class ColdMilkSteamer implements MilkFrother {
    private steamMilk() {
      console.log('차가운 우유거품을 만드는 중...🥛');
      return true;
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      const hasMilk = this.steamMilk();
      return { ...cup, hasMilk };
    }
  }
  //🍬 설탕 제조기
  class CandySugarMixer implements SugarProvider {
    private getSugar() {
      console.log('사탕으로 설탕을 만드는 중...🍬');
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const hasSugar = this.getSugar();
      return { ...cup, hasSugar };
    }
  }
  //🍬 설탕 제조기
  class SugarMixer implements SugarProvider {
    private getSugar() {
      console.log('고급 설탕을 만드는 중...🍬');
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const hasSugar = this.getSugar();
      return { ...cup, hasSugar };
    }
  }

  //☕️ 커피기계
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7; //커피 한잔을 만드는 데 필요한 커피콩(g)

    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    //커피머신을 만드는 함수
    static makeCoffeeMachine(coffeeBeans: number) {
      if (coffeeBeans < 0) throw new Error(`커피콩은 0보다 커야합니다.(입력 : ${coffeeBeans})`);
      return new CoffeeMachine(coffeeBeans);
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

  //☕️ 카페라떼 기계
  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: String, private milk: MilkFrother) {
      super(beans);
    }
    //커피를 만드는 함수
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milk.makeMilk(coffee);
    }
  }

  //☕️ 커피에 설탕을 추가해주는 기계
  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(beans: number, private sugar: SugarProvider) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  //☕️ 커피에 설탕과 우유를 추가하는 기계
  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, private milk: MilkFrother, private sugar: SugarProvider) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const addedMilk = this.milk.makeMilk(coffee);
      const addedSugar = this.sugar.addSugar(addedMilk);
      return addedSugar;
    }
  }

  //실행 테스트
  //우유
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  //설탕
  const candySugarMixer = new CandySugarMixer();
  const sugarMixer = new SugarMixer();

  //커피기계
  const sweetCandyMachine = new SweetCoffeeMaker(20, candySugarMixer);
  const sweetMachine = new SweetCoffeeMaker(20, sugarMixer);

  const latteMachine = new CaffeLatteMachine(20, 'BBB', cheapMilkMaker);
  const coldLatteMachine = new CaffeLatteMachine(30, 'SSS', coldMilkMaker);
  const sweetLatteMachine = new SweetCaffeLatteMachine(20, cheapMilkMaker, sugarMixer);
}
