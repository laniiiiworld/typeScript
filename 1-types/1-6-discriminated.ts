{
  /**
   * Discriminated Union
   * 유니온 타입에 차별화되는 이름이 동일한 타입을 두어 간편하게 구분할 수 있는 것을 말한다.
   */
  //예제 ⏱
  //function: login -> success, fail
  type SuccessState = {
    result: 'success';
    response: { body: string };
  };
  type FailState = {
    result: 'fail';
    reason: string;
  };
  type LoginState = SuccessState | FailState;
  function login(id: string, password: string): LoginState {
    return { result: 'success', response: { body: 'logged in!' } };
  }
  //printLoginState(state: LoginState)
  //success -> 🎉 body
  //fail -> 😭 reason
  function printLoginState(state: LoginState) {
    //Discriminated Union
    if (state.result === 'success') {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }
  printLoginState({ result: 'success', response: { body: 'Login Success!' } });
}
