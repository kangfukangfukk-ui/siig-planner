# SIIG Thai Tax Rules

## Thai Progressive Income Tax
Personal income tax in Thailand is progressive with annual taxable income brackets.

Typical bracket structure:
- 0 THB – 150,000 THB: 0%
- 150,001 THB – 300,000 THB: 5%
- 300,001 THB – 500,000 THB: 10%
- 500,001 THB – 750,000 THB: 15%
- 750,001 THB – 1,000,000 THB: 20%
- 1,000,001 THB – 2,000,000 THB: 25%
- 2,000,001 THB – 5,000,000 THB: 30%
- 5,000,001 THB and above: 35%

Notes:
- Apply marginal rates to taxable income within each bracket.
- Standard personal deduction and allowances should be applied before computing taxable income.

## SSF (Super Savings Fund)
- Contributions to SSF are tax-deductible up to the lesser of 30% of income or 200,000 THB.
- SSF is designed for long-term retirement savings and typically requires a 10-year holding period.
- In a financial planning app, model SSF contributions as part of retirement and tax-optimized investment planning.

## RMF (Retirement Mutual Fund)
- Contributions to RMF are deductible up to the lesser of 30% of annual income or 500,000 THB.
- Combined deductible limit for SSF and RMF is 500,000 THB per tax year.
- RMF requires regular investing and a holding period until age 55.
- Use RMF deductions in retirement planning and annual tax optimization scenarios.

## Thai ESG
- ESG funds may qualify for tax deduction when they meet government criteria.
- Thai ESG funds often count toward the SSF and RMF deduction cap depending on fund structure.
- Model ESG investments as an overlay on tax-advantaged savings when fund qualifies under Thai tax rules.

## Thai ESGX
- ESGX refers to exchange-traded ESG funds or passive ESG fund products.
- Tax treatment depends on whether the ESGX product qualifies as RMF or SSF eligible.
- Use product metadata in the app to classify ESGX holdings by tax-deductible eligibility.

## Retirement Deduction Limits
- Annual deductible limit is the lower of 15% of net income or 500,000 THB for retirement savings contributions.
- SSF and RMF combined deduction cannot exceed 500,000 THB.
- Additional limits may apply for insurance premiums and pension mutual funds.
- Model retirement deductions with these constraints to prevent overestimation of tax savings.

## Implementation Notes
- Allow users to mark contributions as `SSF`, `RMF`, or `ESG` and calculate eligible deduction amounts.
- Separate tax-deductible savings from non-deductible investments.
- Provide scenario guidance when Thai deduction caps are reached.
- Keep the tax engine updatable for changes in Thai bracket thresholds, deduction limits, and fund eligibility.
