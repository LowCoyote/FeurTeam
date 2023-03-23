import {Currency} from "./Currency";

export class Money {
    public currency: Currency;
    public amount: number;

    constructor(currency1: Currency, amount1: number) {
        this.currency = currency1;
        this.amount = amount1;
    }

     public add = (money2: Money): number => this.amount + money2.amount
     public times = (multiplier: number): number => this.amount * multiplier
     public divide = (divider: number): number => this.amount / divider
}