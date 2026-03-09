# ⚠️ DEPRECATED - Package Consolidated

This package has been **deprecated** and its contents have been moved to `@bhms/shared`.

## Migration

Replace imports:

```typescript
// Before
import { AppProviders } from "@bhms/providers";
import { DashboardLayout } from "@bhms/layouts";

// After
import { AppProviders } from "@bhms/shared/providers";
import { DashboardLayout } from "@bhms/shared/layouts";
```

## Update package.json

```json
{
  "dependencies": {
    "@bhms/shared": "workspace:*"
  }
}
```

Remove:
- `@bhms/providers`
- `@bhms/layouts`

## Reason

As part of architecture improvements (March 2026), we consolidated small packages to reduce complexity and dependency chains.
