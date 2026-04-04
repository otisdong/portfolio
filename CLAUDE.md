# React Project Conventions

## Quick Reference (Critical Rules)
- **Language:** ALWAYS English for code and documentation
- **Documentation:** NEVER create markdown files unless explicitly requested or confirm if necessary
- **Package Manager:** ALWAYS `pnpm`
- **Type Imports:** `import type { ... }`
- **Barrel Exports:** Every folder has `index.ts` EXCEPT `modules/index.ts` and `shared/components/index.ts`
- **Styling:** ALWAYS `cn()` + tokens only, NEVER hardcode colors
- **State:** Select fields `useStore(s => s.field)` NOT `useStore()`
- **Imports:** `~/modules/[feature]` ✓ NOT `~/modules` ✗

## Package Manager
ALWAYS `pnpm` - Never npm, yarn, bun

## TypeScript
Always: `import type { ... }` for type imports
`interface` for objects, `type` for unions/primitives

## Architecture
```
app/                    # Entry (routes only)
modules/                # Features (NO index.ts here)
  ├─ user/
  │  └─ index.ts ✓      # Barrel export
  └─ auth/
     └─ index.ts ✓
shared/                 # Cross-feature code
  ├─ components/        # NO index.ts here ✗
  │  └─ ui/
  │     └─ index.ts ✓
  ├─ utils/index.ts ✓
  └─ stores/index.ts ✓
```

**Barrel export rules:**
- Every feature/folder has `index.ts` ✓
- EXCEPT these NEVER have `index.ts`: ✗
  - `modules/index.ts`
  - `shared/components/index.ts`
- Import patterns:
  - `~/modules/[feature]` ✓ NOT `~/modules` ✗
  - `~/shared/components/[component]` ✓ NOT `~/shared/components` ✗

## File Naming
Files: `kebab-case`
Hooks: `use-[feature].ts`
Stores: `[feature]-store.ts`
Services: `[feature]-service.ts`
Types: `[feature]-types.ts`
Components: `[feature]-components.tsx`

## Components
Check exists FIRST: `ls shared/components/ui/[name].tsx`
If missing: `pnpm dlx shadcn@latest add @[registry]/[name]`
Never re-add existing components

Feature components: `modules/[feature]/components/`
Shared components: `shared/components/` (reused 2+ times)

## Styling
**Tokens:** `bg`, `fg`, `primary`, `secondary`, `success`, `danger`, `muted`, `border`
- ✓ `text-muted-fg` | ✗ `text-secondary`
- ✓ `bg-primary text-primary-fg` (pair bg/fg)
- ✗ NEVER hardcode: `bg-blue-500`

**className:** Layout ONLY (`w-*`, `h-*`, `m-*`, `p-*`, `flex`, `grid`, `gap-*`)
- ✓ Design via props: `intent="primary"` `size="lg"`
- ✗ `className="bg-blue-500 px-8"`

**cn():** `import { cn } from "~/shared/utils"`
- ✓ `cn("base", condition && "extra")`
- ✗ Template literals: `` `${base} ${extra}` ``

## Routing
Setup: TanStack Router with auto-generated `routeTree.gen.ts`
Routes in `src/routes/` directory
Keep routes thin - delegate to modules

**Routing Strategy:**
- Directory routes (`/`) for scalable apps with many routes
- Flat routes (`.`) for simpler apps or quick prototyping
- Mix both approaches as needed for your project

**Essential File Conventions:**
- Root: `__root.tsx` → Required root route file
- Index: `index.tsx` → `/` (exact match)
- Nested: `products.detail.tsx` OR `products/detail.tsx` → `/products/detail`
- Dynamic: `products.$id.tsx` → `/products/:id` (access `params.id`)
- Pathless layout: `_auth.login.tsx` → `/login` (renders in `_auth.tsx`)
- Skip parent: `products_.new.tsx` → `/products/new` (skips `products.tsx`)
- Route groups: `(admin)/users.tsx` → `/users` (folder not in URL)
- Splat: `files.$.tsx` → `/files/*` (access `params["*"]`)
- Escape: `api[.]v1.tsx` → `/api.v1`
- Colocate: `-components.tsx`, `-utils.ts` (excluded from routes)

**Router APIs:**
- Route: `export const Route = createFileRoute('/path')()`
- Root: `export const Route = createRootRoute()`
- Navigation: `<Link>`, `useNavigate()`, `useParams()`, `useSearch()`
- Layouts: `<Outlet />` for nested rendering

**Data Loading:**
- Loader: `createFileRoute('/path')({ loader: async () => {...} })`
- Access: `Route.useLoaderData()`
- React Query: `@tanstack/react-router-ssr-query`

## Forms
Default: Uncontrolled with `name` attributes
Extract: `new FormData(e.currentTarget)`
Controlled only for: complex validation, store sync, dependent fields

## State Management
**Zustand:** 
- Select fields: `useStore((s) => s.data)` ✓ NOT `useStore()` ✗
- Error handling: `error: string | null` in state
- Actions: try-catch with error messages
- Include `clearError` action

**React Query:** 
- `queryClient.invalidateQueries()` after mutations (CRITICAL)
- Wrap in custom hooks: `use[Feature]Data`

**Service Layer:**
- Pattern: Class with singleton export
- Location: `modules/[feature]/[feature]-service.ts`

## API/Config
Axios: `shared/lib/axios.ts` (NOT `shared/api/`)
API types: Define in same axios file
Environment: `shared/config/environment.ts`
Direct imports: `import { axiosInstance } from "~/shared/lib/axios"`

## SSR Safety
Browser APIs: `typeof window !== "undefined"` check
Hydration: `useState` + `useEffect` pattern for browser-only state
