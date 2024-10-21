export class RiskDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static calculateRiskScore(): RiskDto {
    return new RiskDto(100000, 200, 30, true, 1000, 12)
  }

  static calculateInvalidRiskScore(): RiskDto {
    return new RiskDto(0, 1, 30, true, 1000, 12)
  }
}
