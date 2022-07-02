{
  /**
   * ✨ Union Types: OR ✨
   * 발생할 수 있는 케이스 중에 딱 하나를 담을 수 있는 타입을 만들고 싶을 때 사용
   */
  type Direction = 'left' | 'right' | 'up' | 'down';
  function move(direction: Direction) {
    console.log(direction);
  }
  move('up');

  type TileSize = 8 | 16 | 32;
  const tile: TileSize = 16;

  //예제 ⏱
  //function: login -> success, fail
  type SuccessState = {
    response: { body: string };
  };
  type FailState = {
    reason: string;
  };
  type LoginState = SuccessState | FailState;
  function login(id: string, password: string): LoginState {
    return { response: { body: 'logged in!' } };
  }
  //printLoginState(state: LoginState)
  //success -> 🎉 body
  //fail -> 😭 reason
  function printLoginState(state: LoginState) {
    //discriminated로 대체 가능
    if ('response' in state) {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }
  printLoginState({ reason: 'Fail test..' });
}
