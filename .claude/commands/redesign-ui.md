---
description: Redesign Vue 3 app UI to modern SaaS-style vertical sidebar layout
---

Redesign the inventory management app's layout from a horizontal top nav bar to a modern SaaS-style vertical left sidebar.

**MANDATORY:** Per CLAUDE.md, ANY significant modification to `.vue` files MUST be delegated to the `vue-expert` subagent. Do not edit `.vue` files directly.

## Step 1: Read current files first

Read these files before making any changes:
- `client/src/App.vue` — current layout, top nav, router-link structure
- `client/src/components/FilterBar.vue` — current sticky positioning (look for `top: 70px`)

## Step 2: Delegate ALL Vue changes to vue-expert

Invoke the `vue-expert` subagent with the full specification below. Pass it the content you read in Step 1 as context.

---

### Changes to `client/src/App.vue`

Replace the `.top-nav` horizontal tab bar with a fixed left sidebar. The new outer layout must be:

```
display: flex; flex-direction: row; min-height: 100vh;
```

**Left sidebar** — fixed, 240px wide, full viewport height:
- Background: `#0f172a`, text: `#94a3b8`
- Top section: company logo area + app name ("Inventory Management" or similar)
- Middle section: vertical nav links for all 6 routes:
  - Dashboard (`/`)
  - Inventory (`/inventory`)
  - Orders (`/orders`)
  - Spending (`/spending`)
  - Demand (`/demand`)
  - Reports (`/reports`)
  - Each nav item: SVG icon (inline, simple) + text label
  - Active state: background `#1e3a5f` or highlight, left accent bar in `#2563eb`, text `#fff`
  - Hover state: background `#1e293b`
  - Nav item padding: `0.625rem 1rem`; gap between items: `0.25rem`
- Bottom section: `LanguageSwitcher` and `ProfileMenu` components (currently in top nav)
- Sidebar padding: `1.5rem 1rem`

**Main content area:**
- `flex: 1`, sits to the right of the sidebar
- Column layout: FilterBar at top, then `<router-view>`
- Background: `#f8fafc`

Remove all `.top-nav` CSS and HTML. Remove the `margin-left: 240px` approach if using flex siblings — prefer flex layout so sidebar and main are siblings.

Use these SVG icons (simple, 18×18, `currentColor` stroke):
- Dashboard: grid/squares icon
- Inventory: box/package icon
- Orders: list/clipboard icon
- Spending: credit card icon
- Demand: chart/trending icon
- Reports: document/file icon

### Changes to `client/src/components/FilterBar.vue`

Change sticky positioning offset:
- Find `top: 70px` (the old top-nav height offset) and change it to `top: 0`
- No other logic changes — keep all filter composable calls, dropdowns, and event handling identical

---

## Step 3: Design tokens reference

Use only these existing tokens:
- Sidebar bg: `#0f172a`
- Sidebar text muted: `#94a3b8`
- Active nav accent: `#2563eb`
- Active nav bg: `#1e3a5f`
- Hover nav bg: `#1e293b`
- Content bg: `#f8fafc`
- Card bg: `#ffffff`
- Borders: `#e2e8f0`
- Font: already global (`Inter, -apple-system, sans-serif`) — no change needed

No emojis in UI. No external icon libraries — use inline SVG only.

## Step 4: Verify with Playwright

After vue-expert completes the changes, use `mcp__playwright__screenshot` to capture `http://localhost:3000`.

Verify:
1. Left sidebar is visible with dark background and nav links
2. Active route is highlighted
3. Main content area appears to the right
4. FilterBar renders at the top of main content (no gap from a top nav)
5. Navigate to at least 2 other routes and screenshot to confirm sidebar persists
6. Click a filter dropdown to confirm filter functionality still works
7. Confirm ProfileMenu and LanguageSwitcher are visible in the sidebar bottom area

If the servers are not running, start them first with `/start`.
