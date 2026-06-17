# Client Management CRUD Implementation Plan

## Goal Description
Implement full CRUD operations for client management using Prisma, replace mock data with real database access, and ensure the application builds without errors.

## Proposed Changes
- **Prisma Model**: Verify `Client` model exists in `prisma/schema.prisma`. If not, add it with required fields (name, email, phone, etc.) and run `npx prisma db push`.
- **Prisma Client Wrapper**: Create `lib/prisma.ts` exporting a singleton PrismaClient.
- **Server Actions** (`lib/actions/client.actions.ts`):
  - `createClient(data: Prisma.ClientCreateInput)`
  - `updateClient(id: string, data: Prisma.ClientUpdateInput)`
  - `deleteClient(id: string)`
  - `getClients(): Promise<Client[]>`
  - `getClientById(id: string): Promise<Client | null>`
- **Update Pages**:
  - `app/clients/page.tsx` → fetch client list via `await getClients()`.
  - `app/clients/[id]/page.tsx` → fetch detail via `await getClientById(params.id)`.
  - `app/clients/new/page.tsx` → submit form to `createClient`.
  - Add edit functionality calling `updateClient`.
- **Remove Mock Data**: Delete `lib/data/mockClients.ts` and related imports.
- **UI Adjustments**: Ensure components receive `Client` type from Prisma.
- **Testing**: Run `npm run build` and fix any TypeScript errors.

## Verification Plan
- Run `npm run dev` and manually verify CRUD flows.
- Run `npm run build` to ensure compile passes.
- Check database tables for correct records.

## Open Questions
- None at this time.

---
*All changes are saved. You can resume work later by continuing from these artifacts.*
