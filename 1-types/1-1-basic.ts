{
  //JavaScript
  //old: var π© νΈμ΄μ€νκ³Ό μ¬λ¬κ°μ§ μμνμ§ λͺ»νλ λ¬Έμ  λ°μ μνμ΄ μλ€.
  var age = 5;
  age = 1;

  //let es6
  let name = 'hello';
  name = 'hi';

  //const
  const id = '0001';
}

{
  /**
   * JavaScript
   * Primitive: number, string, boolean, bigint, symbol, null, undefined
   * Object:function, array, ...
   */

  //number
  const num: number = -6;

  //string
  const str: string = 'hello';

  //boolean
  const bool: boolean = false;

  //undefined
  let name: undefined; //π©
  let age: number | undefined;
  age = undefined;
  age = 1;
  function find(): number | undefined {
    // return 1;
    return undefined;
  }

  //null
  let person: null; //π©
  let person2: string | null;

  //unknown : λ μ΄λ€ κ²μ λ΄μμ§ μ λͺ¨λ₯΄κ² μ΄ π©
  let notSure: unknown = 0;
  notSure = 'he';
  notSure = true;

  //any : λ μ΄λ€κ²μ΄λ  λ΄μ μ μμ΄! π©
  let anything: any = 0;
  anything = 'hello';

  //void : μλ¬΄κ²λ λ¦¬ν΄νμ§ μμ λ μ¬μ©. λΉμ΄μλ.
  function print(): void {
    console.log('hello');
    return;
  }
  let unusable: void = undefined; //π©

  //never : ν¨μμμ μ λ λ¦¬ν΄νμ§ μλ κ²½μ°μ λͺμνκΈ° μν΄ μ¬μ©
  function throwError(message: string): never {
    //message -> server (log)
    throw new Error(message);
    //while(true){}
  }
  let neverEnding: never; //π©

  //object
  let obj: object; //π©
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: 'lani' });
  acceptSomeObject({ animal: 'dog' });
}
