import {Currency} from '../src/Currency'
import {Money} from "../src/Money";

describe('Money', function () {

  test('add in usd returns number', () => {
    const money1: Money = new Money(Currency.USD, 5)
    const money2:Money = new Money(Currency.USD, 10)

    const addition = money1.add(money2)
    expect(addition).toEqual(15)
  })


  test('multiply in eur returns positive number', () => {
    const money3:Money = new Money(Currency.EUR, 10)
    const multiplied:number = money3.times(2)
    expect(multiplied).toEqual(20)
  })

  test('divide in korean won returns number', () => {
    const money4:Money = new Money(Currency.KRW, 4002)
    const divided = money4.divide(4)
    expect(divided).toEqual(1000.5)
  })

})