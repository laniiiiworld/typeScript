{
  /**
   * 객체지향적으로 커피기계 만들기(+캡슐화)☕️
   * 🌼 정보은닉, 캡슐화란?
   *  - 외부에서 알면 안되는 정보, 알필요 없는 정보, 직접적으로 수정하면 안되는 정보(상태와 내부에서만 쓰이는 함수)들을 숨기는 테크닉
   *  - 외부에서 접근이 가능하고, 해도 되고, 필요한 것들만 노출하는 것
   * 🌼 다양한 레벨로 정보를 은닉하기 위한 접근제어자들 🌼
   * public : default값. 외부에서 다 볼 수 있도록 공개적으로 설정된 상태
   * private : 외부에서 절!대! 볼 수 없고, 접근도 할 수 없는 상태
   * protected : 외부에서는 접근할 수 없지만, 이 클래스를 상속한 자식 클래스에서는 접근 가능한 상태
   */

  //커피 타입
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  //커피기계
  class CoffeeMachine {
    //class level. 클래스 자체에 만들어져 인스턴스 사이에서 공유된다. 클래스 이름으로 접근.
    private static BEANS_GRAM_PER_SHOT = 7; //커피 한잔을 만드는 데 필요한 커피콩(g)
    private static MILK_LITER_PER_CUP = 0.35; //커피 한잔을 만드는 데 필요한 우유(l)

    //instance (object) level. 멤버변수. this로 접근.
    private coffeeBeans: number = 0;
    private milk: number = 0;

    private constructor(coffeeBeans: number, milk: number) {
      this.coffeeBeans = coffeeBeans;
      this.milk = milk;
    }

    //커피머신을 만드는 함수.
    //Tips🌼 static으로 오브젝트를 만드는 함수를 제공한다 = 생성자를 외부에서 사용하는 것을 금지한다. = constructor()를 private로 생성
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
      if (shots < 1) throw new Error(`${shots}샷은 0보다 커야합니다.`);
      if (this.coffeeBeans < CoffeeMachine.BEANS_GRAM_PER_SHOT * shots) throw new Error('커피콩이 부족합니다.');
      if (isMilk && this.milk < CoffeeMachine.MILK_LITER_PER_CUP) throw new Error('우유가 부족합니다.');

      //만들어지는 샷(커피콩)과 우유 사용
      this.coffeeBeans -= CoffeeMachine.BEANS_GRAM_PER_SHOT * shots;
      if (isMilk) this.milk -= CoffeeMachine.MILK_LITER_PER_CUP;

      return { shots, hasMilk: isMilk };
    }
  }
  //실행 테스트
  const coffeeBrewer = CoffeeMachine.makeCoffeeMachine(70, 2);
  const espresso = CoffeeMachine.makeCoffeeMachine(75, 0);

  //❗️외부에서 나의 오브젝트 상태를 유효하지 않은 상태로 만들 수 있는 위험한 상태❗️
  // espresso.coffeeBeans = -22; //invalid. encapsulation 필요
  espresso.fillCoffeeBeans(20);

  /**
   * 🌼 유용한 Getter와 Setter 🌼
   * 사용할 때는 일반 변수(멤버 변수)처럼 사용이 가능하다.
   * 어떠한 계산을 해야될 때 조금 더 유용하게 쓸 수 있다.
   */
  class User {
    //나이
    private internalAge = 20;
    get age(): number {
      return this.internalAge;
    }
    set age(age: number) {
      if (age < 0) throw new Error(`나이는 0보다 작게 설정할 수 없습니다.(입력 : ${age})`);
      this.internalAge = age;
    }
    //이름
    set firstName(firstName: string) {
      this.firstNm = firstName;
    }
    get fullName(): string {
      return `${this.firstNm} ${this.lastNm}`;
    }

    //🌼 생성자에서 접근제어자를 작성하면 바로 멤버 변수로 설정된다.
    constructor(private firstNm: string, private lastNm: string) {
      this.firstNm = firstNm;
      this.lastNm = lastNm;
    }
  }

  const user = new User('Steve', 'Jobs');
  console.log(user.fullName);
  user.firstName = 'Lani';
  console.log(user.fullName);
  user.age = 24;
  console.log(user.age);
}
