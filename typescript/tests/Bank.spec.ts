import {Currency} from '../src/Currency'
import {Bank} from '../src/Bank'
import {Money} from "../src/Money";
import {MissingExchangeRateError} from '../src/MissingExchangeRateError'
class BankBuilder {
  private currency: Currency = Currency.EUR
  private rates: Map<Currency, number> = new Map<Currency, number>()

  static aBank(): BankBuilder {
    return new BankBuilder()
  }

  withPivotCurrency(currency: Currency): BankBuilder {
    this.currency = currency
    return this
  }

  withExchangeRate(currency: Currency, rate: number): BankBuilder {
    this.rates.set(currency, rate)
    return this
  }

  build() {
    const bank = new Bank()
    this.rates.forEach((rate, currency) => {
      bank.addExchangeRate(this.currency, currency, rate)
      bank.addExchangeRate(this.currency, this.currency, 1/rate)
    })
    return bank
  }
}

const aBank = () => BankBuilder.aBank()

describe('Bank', function () {
  let bank: Bank = aBank().withPivotCurrency(Currency.EUR).withExchangeRate(Currency.USD, 1.2).build()
  beforeEach(() => {
    bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
    bank = BankBuilder.aBank().withPivotCurrency(Currency.EUR).withExchangeRate(Currency.USD, 1.2).build()
  })
  test('convert from eur to usd returns number', () => {
    const money:Money = new Money(Currency.EUR, 10)
    const conversion = bank.convert(money, Currency.USD)
    expect(JSON.stringify(conversion)).toStrictEqual(JSON.stringify( new Money(Currency.USD, 12)))
  })

  test('convert from usd to usd returns same value', () => {
    const money:Money = new Money(Currency.USD, 10)
    const conversion = bank.convert(money, Currency.USD)
    expect(JSON.stringify(conversion)).toStrictEqual(JSON.stringify( new Money(Currency.USD, 10)))
  })

  test('convert throws error in case of missing exchange rates', () => {
    const money:Money = new Money(Currency.EUR, 10)
    expect(() => bank.convert(money, Currency.KRW)).toThrowWithMessage(
        MissingExchangeRateError, "EUR-> KRW")
  })

  test('convert with different exchange rates returns different numbers', () => {
    const money:Money = new Money(Currency.EUR, 10)

    const initialConversion = bank.convert(money, Currency.USD);

    bank.addExchangeRate(Currency.EUR, Currency.USD, 1.3)
    const actual = bank.convert(money, Currency.USD)
    expect(JSON.stringify(actual)).not.toStrictEqual(JSON.stringify(initialConversion))
  })
})
