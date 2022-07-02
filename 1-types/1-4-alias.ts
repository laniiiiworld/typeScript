{
  /**
   * TypeScript를 쓰는 이유, TypeScript의 type이 강력한 이유!
   * Type Alias🌼 : 새로운 타입을 정의하는 것
   */
  //기본적인 Type Alias
  type Text = string;
  const name: Text = 'lani';
  const address: Text = 'korea';
  type Num = number;
  type Student = {
    name: string;
    age: number;
  };
  const student: Student = {
    name: 'lani',
    age: 12,
  };

  //Sting Literal Types : 문자열을 타입으로 지정
  type Name = 'name';
  let laniName: Name;
  laniName = 'name';
  type JSON = 'json';
  const json: JSON = 'json';
}
