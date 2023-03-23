import { Currency } from './Currency'
import { Money } from "./Money";
import { MissingExchangeRateError } from './MissingExchangeRateError'

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()

  static withExchangeRate (currency1: Currency, currency2: Currency, rate: number): Bank {
    const bank = new Bank()
    bank.addExchangeRate(currency1, currency2, rate)
    return bank
  }

  addExchangeRate (currency1: Currency, currency2: Currency, rate: number): void {
    this._exchangeRates.set(currency1 + '->' + currency2, rate)
  }

  convertOld (amount: number, currency1: Currency, currency2: Currency): number {
    if (currency1 !== currency2 && !this._exchangeRates.has(currency1 + '->' + currency2)){
      throw new MissingExchangeRateError(currency1, currency2)
    }

    return currency2 === currency1 ? amount : amount * this._exchangeRates.get(currency1 + '->' + currency2)
  }

  convert(money: Money, to:Currency): Money {
    if(!this.canConvert(money.currency,to )) {
      throw new MissingExchangeRateError(money.currency, to)
    }
    return this.convertSafely(money,to)
  }
  private convertSafely(money: Money, to:Currency): Money {
    return to === money.currency
    ? money : new Money(to, money.amount * this._exchangeRates.get(this.getKey(money.currency,to)));
  }
  private canConvert(from: Currency, to: Currency) {
    return from === to || this._exchangeRates.has(this.getKey(from, to))
  }

  private getKey(from: Currency, to: Currency) {
    return from + '->' + to;
  }
}