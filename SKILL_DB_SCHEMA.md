# SIIG Personal Financial Planning App Database Schema

## Design Principles
- Use normalized relational models for user, financial, and planning data.
- Keep audit trails and scenario snapshots separate from transactional data.
- Support multi-profile planning workflows for household or joint budgeting.
- Use PostgreSQL indexes on foreign keys and timestamp-driven queries.

## Users
- `User`
  - `id` String @id @default(uuid())
  - `email` String @unique
  - `passwordHash` String
  - `createdAt` DateTime @default(now())
  - `updatedAt` DateTime @updatedAt
  - `lastLoginAt` DateTime?
  - `profiles` Profile[]
  - `auditLogs` AuditLog[]

## Profiles
- `Profile`
  - `id` String @id @default(uuid())
  - `userId` String
  - `name` String
  - `birthdate` DateTime?
  - `relationship` String? (e.g. self, spouse, child)
  - `incomeMonthly` Decimal?
  - `riskTolerance` String? (e.g. conservative, moderate, aggressive)
  - `createdAt` DateTime @default(now())
  - `updatedAt` DateTime @updatedAt
  - `user` User @relation(fields: [userId], references: [id])
  - `assets` Asset[]
  - `liabilities` Liability[]
  - `transactions` Transaction[]
  - `budgets` Budget[]
  - `goals` Goal[]
  - `scenarios` Scenario[]
  - `insurancePolicies` InsurancePolicy[]

## Assets
- `Asset`
  - `id` String @id @default(uuid())
  - `profileId` String
  - `type` String (e.g. cash, investment, property, vehicle)
  - `name` String
  - `category` String? (e.g. savings, investment, fixed)
  - `value` Decimal
  - `currency` String @default("THB")
  - `acquiredAt` DateTime?
  - `notes` String?
  - `createdAt` DateTime @default(now())
  - `updatedAt` DateTime @updatedAt
  - `profile` Profile @relation(fields: [profileId], references: [id])

## Liabilities
- `Liability`
  - `id` String @id @default(uuid())
  - `profileId` String
  - `type` String (e.g. mortgage, loan, credit)
  - `name` String
  - `balance` Decimal
  - `interestRate` Decimal?
  - `monthlyPayment` Decimal?
  - `dueDate` DateTime?
  - `maturityDate` DateTime?
  - `createdAt` DateTime @default(now())
  - `updatedAt` DateTime @updatedAt
  - `profile` Profile @relation(fields: [profileId], references: [id])

## Transactions
- `Transaction`
  - `id` String @id @default(uuid())
  - `profileId` String
  - `date` DateTime
  - `type` String (income, expense, transfer)
  - `category` String
  - `amount` Decimal
  - `currency` String @default("THB")
  - `description` String?
  - `account` String? (e.g. checking, savings, credit card)
  - `budgetId` String?
  - `goalId` String?
  - `createdAt` DateTime @default(now())
  - `updatedAt` DateTime @updatedAt
  - `profile` Profile @relation(fields: [profileId], references: [id])
  - `budget` Budget? @relation(fields: [budgetId], references: [id])
  - `goal` Goal? @relation(fields: [goalId], references: [id])

## Budgets
- `Budget`
  - `id` String @id @default(uuid())
  - `profileId` String
  - `name` String
  - `category` String
  - `amount` Decimal
  - `period` String (monthly, quarterly, annual)
  - `startDate` DateTime
  - `endDate` DateTime?
  - `actualSpent` Decimal @default(0)
  - `createdAt` DateTime @default(now())
  - `updatedAt` DateTime @updatedAt
  - `profile` Profile @relation(fields: [profileId], references: [id])

## Goals
- `Goal`
  - `id` String @id @default(uuid())
  - `profileId` String
  - `name` String
  - `targetAmount` Decimal
  - `currentAmount` Decimal @default(0)
  - `targetDate` DateTime
  - `monthlyContribution` Decimal?
  - `priority` Int? (1-5)
  - `status` String (planned, in_progress, achieved)
  - `goalType` String (education, retirement, purchase, emergency)
  - `createdAt` DateTime @default(now())
  - `updatedAt` DateTime @updatedAt
  - `profile` Profile @relation(fields: [profileId], references: [id])

## Scenarios
- `Scenario`
  - `id` String @id @default(uuid())
  - `profileId` String
  - `name` String
  - `description` String?
  - `snapshot` Json? (store scenario assumptions: income, expenses, savings rate)
  - `status` String (draft, active, archived)
  - `createdAt` DateTime @default(now())
  - `updatedAt` DateTime @updatedAt
  - `profile` Profile @relation(fields: [profileId], references: [id])

## InsurancePolicies
- `InsurancePolicy`
  - `id` String @id @default(uuid())
  - `profileId` String
  - `provider` String
  - `policyNumber` String?
  - `policyType` String (life, health, disability, critical_illness)
  - `coverageAmount` Decimal
  - `premium` Decimal
  - `renewalDate` DateTime?
  - `termYears` Int?
  - `notes` String?
  - `createdAt` DateTime @default(now())
  - `updatedAt` DateTime @updatedAt
  - `profile` Profile @relation(fields: [profileId], references: [id])

## AuditLogs
- `AuditLog`
  - `id` String @id @default(uuid())
  - `userId` String
  - `action` String
  - `entity` String
  - `entityId` String?
  - `changes` Json? (old and new values)
  - `ipAddress` String?
  - `userAgent` String?
  - `createdAt` DateTime @default(now())
  - `user` User @relation(fields: [userId], references: [id])

## Additional Notes
- Use `Decimal` for money-related fields and avoid floating point types.
- Model relationships explicitly and use `@index` on `profileId`, `userId`, and `date` fields.
- Keep scenario snapshots and audit logs in separate tables to preserve integrity of historical planning data.
