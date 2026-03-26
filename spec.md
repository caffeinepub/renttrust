# RentTrust

## Current State
- One-page landing site with landlord-focused copy
- Early access signup form (name, phone, email, number of properties) wired to backend
- Backend stores signups with a UserType (landlord/tenant) but numberOfProperties is not persisted
- Admin view for signups is NOT yet built
- No separate landlord or tenant views exist

## Requested Changes (Diff)

### Add
- Admin view: protected page (login via Internet Identity) showing all early access signups in a table — name, email, phone, userType, numberOfProperties, date
- Landlord view: dedicated `/landlord` page with landlord-focused messaging, early access form pre-set to landlord
- Tenant view: dedicated `/tenant` page with tenant-focused messaging, early access form pre-set to tenant
- Navigation between views (nav links on landing page to landlord/tenant sections, admin accessible via `/admin` route)
- Authorization component for admin login

### Modify
- Backend: add `numberOfProperties` field to Signup type (Nat); fix admin access to use Internet Identity principal stored via authorization
- Landing page: add links to "For Landlords" and "For Tenants" separate pages
- Early access form: pass correct `userType` based on which page the form is on

### Remove
- Nothing removed

## Implementation Plan
1. Select `authorization` component
2. Regenerate backend with Signup including numberOfProperties, proper admin role via authorization
3. Build three frontend views:
   - `/` — current landing page with links to /landlord and /tenant
   - `/landlord` — landlord-specific page with existing landlord copy + early access form (userType=landlord)
   - `/tenant` — tenant-specific page with tenant-focused copy + early access form (userType=tenant)
   - `/admin` — protected page using Internet Identity login, shows table of all signups
4. Add React Router for routing between pages
