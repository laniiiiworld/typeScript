{
  /**
   * Type Assertions π©
   * νμμ κ°μ λ‘ μΊμ€νν  λ μ¬μ©νλ€.
   * βοΈ λ΄κ° μ λ§X100 νμμ μ₯λ΄ν  λ, μμ κ° 1000%μμ λλ§ μ¬μ©ν΄μΌ νλ€.
   */
  function jsStrFunc(): any {
    return 2;
  }
  const result = jsStrFunc();
  console.log((result as string).length); //undefined
  console.log((<string>result).length); //undefined

  const wrong: any = 5;
  // console.log((wrong as Array<number>).push(1)); //π±

  //! : 'λ¬΄μ‘°κ±΄ nullμ΄ μλμΌ!'λΌλ λ». optionμ΄ μλλΌ μ λ§ νμ ν  λ μ¬μ©.
  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers();
  // numbers!.push(2); //π±

  const button = document.querySelector('class')!;
  // if(button) button.nodeValue;
}
