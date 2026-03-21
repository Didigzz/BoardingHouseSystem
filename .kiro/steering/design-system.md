---
inclusion: always
---

# Haven Space - Unified Design System Rules

This design system covers all three applications in the Haven Space platform:
- **Landlord Portal** - Property management for landlords
- **Boarder Dashboard** - Booking and accommodation management for boarders
- **Public Platform** - Public-facing marketplace for browsing listings
- **Admin Dashboard** - Platform administration and oversight

## Color System

### Primary Colors
- Primary: `hsl(var(--primary))` - Main brand color for buttons, links, active states
- Primary Foreground: `hsl(var(--primary-foreground))` - Text on primary backgrounds

### Semantic Colors
- Success/Green: Used for positive metrics, active status, completed states
  - Light: `bg-green-100 text-green-800`
  - Medium: `text-green-600`
- Warning/Yellow: Used for pending states, alerts
  - Light: `bg-yellow-100 text-yellow-800`
  - Medium: `text-yellow-600`
- Error/Red: Used for overdue, errors, destructive actions
  - Light: `bg-red-100 text-red-800`
  - Medium: `text-red-600`
- Info/Blue: Used for informational states
  - Light: `bg-blue-100 text-blue-800`
  - Medium: `text-blue-600`

### Neutral Colors
- Background: `bg-background` - Main page background
- Foreground: `text-foreground` - Primary text color
- Muted: `bg-muted` / `text-muted-foreground` - Secondary backgrounds and text
- Border: `border` - Default border color
- Sidebar: `bg-sidebar` - Sidebar background

## Typography

### Font Sizes
- 3xl: `text-3xl` - Page titles (Dashboard, Properties, etc.)
- 2xl: `text-2xl` - Large numbers in stats
- lg: `text-lg` - Card titles, section headers
- base: Default - Body text
- sm: `text-sm` - Secondary information, descriptions
- xs: `text-xs` - Metadata, timestamps, helper text

### Font Weights
- bold: `font-bold` - Stats values, important numbers
- semibold: `font-semibold` - Card titles, names
- medium: `font-medium` - Labels, active items
- normal: Default - Body text

## Spacing

### Padding
- Page container: `space-y-6` - Vertical spacing between sections
- Card content: `p-4` or `p-6` - Internal card padding
- Card header: `pb-2` or `pb-4` - Header bottom padding
- Form fields: `space-y-2` or `space-y-4` - Vertical field spacing

### Gaps
- Grid gaps: `gap-4` or `gap-6` - Between grid items
- Flex gaps: `gap-2`, `gap-3`, `gap-4` - Between flex items
- Icon-text gaps: `gap-2` - Between icons and labels

## Layout Patterns

### Grid Layouts
- Stats cards: `grid gap-4 md:grid-cols-2 lg:grid-cols-4`
- Property cards: `grid gap-6 md:grid-cols-2 lg:grid-cols-3`
- Room cards: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Two-column forms: `grid gap-4 sm:grid-cols-2`

### Responsive Breakpoints
- sm: 640px - Small tablets
- md: 768px - Tablets
- lg: 1024px - Desktops
- xl: 1280px - Large desktops

## Component Patterns

### Cards
- Base: `<Card>` with `<CardHeader>` and `<CardContent>`
- Header: Contains title and optional description
- Content: Main card body with appropriate padding
- Variants: Default, with border accent (colored left border)

### Stats Cards
- Structure: Icon + Title + Value + Optional trend/description
- Icon: 4x4 size, muted color
- Title: Small, muted, medium weight
- Value: 2xl or 3xl, bold
- Trend: Small text with color (green positive, red negative)

### Badges
- Status badges: Colored backgrounds with semantic colors
- Variants: `variant="secondary"` with custom color classes
- Common statuses: Active, Pending, Completed, Cancelled

### Buttons
- Primary: Default button style
- Outline: `variant="outline"` for secondary actions
- Ghost: `variant="ghost"` for tertiary actions
- Icon: `size="icon"` for icon-only buttons
- Sizes: `size="sm"`, default, `size="lg"`

### Data Tables
- Structure: `<Table>` with `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableCell>`
- Pagination: Bottom controls with Previous/Next buttons
- Actions: Dropdown menu in last column
- Filters: Search input + select dropdowns above table

### Forms
- Field structure: Label + Input + Optional error message
- Label: `<Label>` component
- Input: `<Input>` with appropriate type
- Spacing: `space-y-2` between label and input
- Grid: Two-column layout for related fields

### Navigation
- Sidebar: Collapsible, 64px collapsed / 256px expanded
- Nav items: Icon + text, with optional badge
- Collapsible groups: With chevron indicator
- Active state: Background accent color

### Header
- Height: 64px (h-16)
- Structure: Search + Property selector + Theme toggle + Notifications + User menu
- Sticky: `sticky top-0 z-50`

## Icon Usage

### Common Icons (lucide-react)
- Building2: Properties
- DoorOpen: Rooms
- CalendarCheck: Bookings
- MessageSquare: Messages
- Wallet: Earnings/Payments
- Wrench: Maintenance
- Bell: Notifications
- Settings: Settings
- User: Users/Tenants
- Plus: Add actions
- Edit: Edit actions
- Trash2: Delete actions
- Eye: View actions
- Search: Search functionality
- Filter: Filter controls
- Download: Export actions

### Icon Sizes
- 3x3: `h-3 w-3` - Small badges, inline indicators
- 4x4: `h-4 w-4` - Standard UI icons, buttons
- 5x5: `h-5 w-5` - Larger buttons, headers
- 12x12: `h-12 w-12` - Empty states, large illustrations

## Interactive States

### Hover
- Cards: `hover:shadow-md` - Subtle shadow on hover
- Buttons: Built-in hover states
- Links: `hover:underline` for text links
- Nav items: `hover:bg-sidebar-accent` for sidebar

### Active/Selected
- Nav items: `bg-sidebar-accent text-sidebar-accent-foreground`
- Tabs: Built-in active styling
- Cards: `ring-2 ring-primary` for selected state

### Disabled
- Buttons: `disabled` prop with reduced opacity
- Inputs: `disabled` prop with muted background

## Animation

### Transitions
- Standard: `transition-colors` for color changes
- Transform: `transition-transform` for rotations
- All: `transition-all` for multiple properties
- Duration: Default 300ms

### Animations
- Spin: `animate-spin` for loading indicators
- Pulse: `animate-pulse` for skeleton loaders
- Slide in: `animate-in slide-in-from-*` for toasts

## Accessibility

### Focus States
- Visible focus rings on interactive elements
- Keyboard navigation support
- ARIA labels where needed

### Color Contrast
- Sufficient contrast ratios for text
- Semantic colors with appropriate backgrounds

## Data Visualization

### Charts (Recharts)
- Area charts: Revenue trends
- Bar charts: Comparisons, expenses
- Pie charts: Distribution breakdowns
- Colors: Use chart color variables `hsl(var(--chart-1))` through `hsl(var(--chart-4))`

## Empty States

### Structure
- Icon: Large (12x12), muted color
- Title: Medium weight, lg size
- Description: Muted, sm size
- Optional action button

### Common Patterns
- No data: Centered in card/container
- No search results: With suggestion to adjust filters
- No items: With "Add" call-to-action

## Loading States

### Patterns
- Skeleton: `<Skeleton>` component with pulse animation
- Spinner: `<Loader2>` icon with spin animation
- Button loading: Spinner + "Loading..." text
- Disabled state during loading

## Responsive Design

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement with breakpoints
- Hidden elements: `hidden md:block` for desktop-only
- Responsive grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

### Mobile Adaptations
- Stacked layouts on mobile
- Collapsible sections
- Bottom sheets for mobile menus
- Touch-friendly tap targets (min 44x44px)


---

## Application-Specific Design Patterns

### Landlord Portal (apps/landlord)

**Purpose**: Property and tenant management for landlords

**Key Screens**:
- Dashboard with stats, bookings, messages, charts
- Properties (list, add, map view)
- Rooms management
- Bookings and tenant management
- Payments, earnings, finances
- Maintenance requests
- Messages, notifications, settings
- Audit logs, user management

**Design Characteristics**:
- Professional, data-dense interface
- Heavy use of data tables and charts
- Multi-column layouts for efficiency
- Action-oriented with quick access to management tools
- Status badges for tracking (active, pending, completed)
- Sidebar navigation with collapsible groups

**Color Usage**:
- Primary purple/blue for main actions
- Green for positive metrics (revenue, occupancy)
- Yellow for pending/warning states
- Red for overdue/urgent items
- Neutral grays for data presentation

---

### Boarder Dashboard (apps/boarder)

**Purpose**: Accommodation search and booking management for boarders

**Key Screens**:
- Dashboard with personalized greeting and quick stats
- Browse listings with search and filters
- Saved/bookmarked properties
- Active bookings and booking history
- Payment management
- Messages with landlords
- Profile and settings

**Design Characteristics**:
- Friendly, welcoming interface
- Card-based layouts with visual emphasis
- Personalized greetings ("Good morning, Juan!")
- Quick action buttons for common tasks
- Visual property cards with images
- Emphasis on discovery and browsing
- Mobile-friendly, touch-optimized

**Color Usage**:
- Colorful stat cards (blue, red, green, purple)
- Warm, inviting color palette
- Status badges (active, pending, upcoming)
- Star ratings in yellow
- Unread indicators in blue

**Unique Components**:
- Property cards with images, ratings, location
- Booking status timeline
- Payment due date reminders
- Message preview cards with unread indicators
- Quick action grid buttons

---

### Public Platform (apps/(public))

**Purpose**: Public marketplace for discovering boarding houses

**Key Screens**:
- Landing page with hero section
- Browse listings with filters
- Listing detail pages
- Map view for location-based search
- Login/Register pages
- Become a Landlord page

**Design Characteristics**:
- Marketing-focused, conversion-optimized
- Large hero sections with CTAs
- Feature highlights with icons
- Testimonials and social proof
- Gradient backgrounds and visual flair
- SEO-optimized content structure
- Guest-friendly navigation

**Color Usage**:
- Primary brand color for CTAs
- Gradient backgrounds (primary/5 to primary/10)
- Muted backgrounds for sections
- Yellow stars for ratings
- Trust indicators in green

**Unique Components**:
- Hero section with search bar
- Feature cards with icons (4-column grid)
- Listing cards with hover effects
- Quick stats display (500+ properties, 2000+ boarders)
- Testimonial cards with avatars
- CTA sections with contrasting backgrounds
- Footer with links and information

**Layout Patterns**:
- Full-width hero sections
- Container-based content sections
- Alternating background colors (white/muted)
- Centered content with max-width constraints
- Responsive grid layouts (1/2/3/4 columns)

---

### Admin Dashboard (apps/admin)

**Purpose**: Platform administration and oversight

**Key Screens**:
- Dashboard with platform-wide metrics
- User management (boarders, landlords, admins)
- Listing management and verification
- Booking oversight
- Payment and revenue tracking
- Reports and analytics
- Settings and configuration

**Design Characteristics**:
- High-level overview focus
- Comprehensive data visualization
- Multi-level navigation
- Approval workflows
- Flagged items and alerts
- System-wide controls
- Audit trail visibility

**Color Usage**:
- Purple for primary actions
- Cyan for secondary metrics
- Orange for warnings/flags
- Red for critical alerts
- Green for approvals/success

**Unique Components**:
- Platform-wide stat cards
- User distribution pie charts
- Revenue trend area charts
- Booking status bar charts
- Pending application cards
- Flagged item alerts
- Quick action cards with icons

---

## Shared Component Library

### From @havenspace/shared/ui

**Core Components**:
- Button (primary, outline, ghost, destructive variants)
- Card (with CardHeader, CardTitle, CardDescription, CardContent)
- Input, Label, Textarea
- Select, Dropdown Menu
- Badge (status indicators)
- Table (data tables with sorting/filtering)
- Tabs (navigation between views)
- Dialog, Alert Dialog (modals)
- Toast (notifications)
- Skeleton (loading states)
- Avatar (user profiles)
- Progress (loading bars, occupancy rates)
- Separator (dividers)
- Switch, Checkbox (form controls)
- Scroll Area (scrollable containers)

**Chart Components** (Recharts):
- AreaChart (revenue trends)
- BarChart (comparisons)
- PieChart (distributions)
- LineChart (time series)

### From @havenspace/shared/features

**Feature Components**:
- ListingCard (property display)
- SearchFilters (search and filter UI)
- PropertySelector (dropdown for switching properties)

---

## Typography Scale

### Headings
- h1: `text-3xl` (30px) - Page titles
- h2: `text-2xl` (24px) - Section titles
- h3: `text-xl` (20px) - Subsection titles
- h4: `text-lg` (18px) - Card titles

### Body Text
- Large: `text-lg` (18px) - Emphasis text
- Base: `text-base` (16px) - Default body
- Small: `text-sm` (14px) - Secondary info
- Extra Small: `text-xs` (12px) - Metadata, timestamps

### Font Weights
- Black: `font-black` (900) - Rarely used
- Bold: `font-bold` (700) - Stats, important numbers
- Semibold: `font-semibold` (600) - Headings, names
- Medium: `font-medium` (500) - Labels, active items
- Normal: `font-normal` (400) - Body text
- Light: `font-light` (300) - Rarely used

---

## Spacing System

### Margin/Padding Scale
- 0: 0px
- 1: 4px (0.25rem)
- 2: 8px (0.5rem)
- 3: 12px (0.75rem)
- 4: 16px (1rem)
- 5: 20px (1.25rem)
- 6: 24px (1.5rem)
- 8: 32px (2rem)
- 10: 40px (2.5rem)
- 12: 48px (3rem)
- 16: 64px (4rem)
- 20: 80px (5rem)

### Common Spacing Patterns
- Page container: `space-y-6` (24px vertical)
- Section spacing: `py-20` (80px vertical padding)
- Card padding: `p-4` or `p-6` (16px or 24px)
- Grid gaps: `gap-4` or `gap-6` (16px or 24px)
- Flex gaps: `gap-2` (8px) for icons, `gap-4` (16px) for cards
- Form field spacing: `space-y-2` (8px) or `space-y-4` (16px)

---

## Border Radius

### Radius Scale
- sm: `rounded-sm` (2px) - Subtle rounding
- default: `rounded` (4px) - Standard UI elements
- md: `rounded-md` (6px) - Cards, inputs
- lg: `rounded-lg` (8px) - Cards, modals
- xl: `rounded-xl` (12px) - Large cards
- 2xl: `rounded-2xl` (16px) - Hero sections
- full: `rounded-full` - Circles, pills

### Common Usage
- Buttons: `rounded-md`
- Cards: `rounded-lg`
- Inputs: `rounded-md`
- Badges: `rounded-full` or `rounded`
- Avatars: `rounded-full`
- Images: `rounded-lg`

---

## Shadow System

### Shadow Scale
- sm: `shadow-sm` - Subtle elevation
- default: `shadow` - Standard cards
- md: `shadow-md` - Hover states
- lg: `shadow-lg` - Modals, dropdowns
- xl: `shadow-xl` - Prominent elements
- 2xl: `shadow-2xl` - Hero sections

### Common Usage
- Cards: `shadow` default, `hover:shadow-md` on hover
- Dropdowns: `shadow-lg`
- Modals: `shadow-xl`
- Sticky headers: `shadow-sm`

---

## Icon System (Lucide React)

### Icon Sizes
- 3: `h-3 w-3` (12px) - Inline badges, small indicators
- 4: `h-4 w-4` (16px) - Standard UI icons, buttons
- 5: `h-5 w-5` (20px) - Larger buttons, section headers
- 6: `h-6 w-6` (24px) - Feature icons
- 8: `h-8 w-8` (32px) - Large feature icons
- 10: `h-10 w-10` (40px) - Avatar placeholders
- 12: `h-12 w-12` (48px) - Empty states, hero icons

### Icon Categories

**Navigation & Actions**:
- Home, Building2, DoorOpen - Properties/Rooms
- Calendar, CalendarCheck - Bookings/Dates
- MessageSquare - Messages/Chat
- Bell - Notifications
- Settings - Configuration
- User, Users - People/Accounts
- Search - Search functionality
- Filter - Filtering options
- Plus - Add/Create actions
- Edit, Pencil - Edit actions
- Trash2 - Delete actions
- Eye - View actions
- Download - Export actions
- Upload - Upload actions
- X, XCircle - Close/Cancel
- Check, CheckCircle - Confirm/Success
- ChevronRight, ChevronDown - Navigation arrows

**Business & Finance**:
- Wallet, CreditCard - Payments/Money
- DollarSign - Currency
- TrendingUp, TrendingDown - Trends
- Receipt - Invoices
- PiggyBank - Savings/Deposits

**Status & Alerts**:
- AlertCircle, AlertTriangle - Warnings
- Info - Information
- Clock - Time/Pending
- Wrench - Maintenance
- Shield - Security/Verification
- Star - Ratings/Favorites
- Bookmark - Saved items
- Heart - Favorites

**Location & Map**:
- MapPin - Location markers
- Map - Map view
- Navigation - Directions

**Communication**:
- Mail - Email
- Phone - Phone calls
- Video - Video calls
- Send - Send messages

---

## Status Badge System

### Status Types & Colors

**Booking/Tenant Status**:
- Active: `bg-green-100 text-green-800`
- Pending: `bg-yellow-100 text-yellow-800`
- Confirmed: `bg-blue-100 text-blue-800`
- Completed: `bg-gray-100 text-gray-800`
- Cancelled: `bg-red-100 text-red-800`
- Upcoming: `bg-blue-100 text-blue-800`

**Payment Status**:
- Paid: `bg-green-100 text-green-800`
- Pending: `bg-yellow-100 text-yellow-800`
- Overdue: `bg-red-100 text-red-800`
- Cancelled: `bg-gray-100 text-gray-800`

**Property/Room Status**:
- Available: `bg-green-100 text-green-800`
- Occupied: `bg-blue-100 text-blue-800`
- Maintenance: `bg-yellow-100 text-yellow-800`
- Inactive: `bg-gray-100 text-gray-800`

**Priority Levels**:
- Low: `bg-gray-100 text-gray-800`
- Medium: `bg-blue-100 text-blue-800`
- High: `bg-orange-100 text-orange-800`
- Urgent: `bg-red-100 text-red-800`

**User Roles**:
- Admin: `bg-purple-100 text-purple-800`
- Manager: `bg-blue-100 text-blue-800`
- Landlord: `bg-cyan-100 text-cyan-800`
- Boarder: `bg-green-100 text-green-800`
- Staff: `bg-gray-100 text-gray-800`

---

## Form Patterns

### Input Fields
```tsx
<div className="space-y-2">
  <Label htmlFor="field">Field Label *</Label>
  <Input 
    id="field" 
    type="text" 
    placeholder="Enter value..."
    required 
  />
  {error && <p className="text-destructive text-sm">{error}</p>}
</div>
```

### Two-Column Layout
```tsx
<div className="grid gap-4 sm:grid-cols-2">
  <div className="space-y-2">...</div>
  <div className="space-y-2">...</div>
</div>
```

### Form Actions
```tsx
<div className="flex items-center justify-end gap-4">
  <Button type="button" variant="outline">Cancel</Button>
  <Button type="submit" disabled={isSubmitting}>
    {isSubmitting ? "Saving..." : "Save Changes"}
  </Button>
</div>
```

---

## Data Table Patterns

### Table Structure
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
      <TableHead className="w-[70px]"></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.value1}</TableCell>
        <TableCell>{item.value2}</TableCell>
        <TableCell>
          <DropdownMenu>...</DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Pagination
```tsx
<div className="flex items-center justify-between px-2 py-4">
  <div className="text-muted-foreground text-sm">
    Showing {count} of {total} items
  </div>
  <div className="flex items-center space-x-2">
    <Button variant="outline" size="sm" onClick={previousPage}>
      Previous
    </Button>
    <Button variant="outline" size="sm" onClick={nextPage}>
      Next
    </Button>
  </div>
</div>
```

---

## Chart Patterns

### Area Chart (Revenue Trends)
- Gradient fill from primary color
- Grid lines in muted color
- Tooltip with formatted currency
- Responsive container
- X-axis: months, Y-axis: currency

### Bar Chart (Comparisons)
- Rounded top corners `radius={[4, 4, 0, 0]}`
- Primary color fill
- Grid lines
- Tooltip with formatted numbers

### Pie Chart (Distributions)
- Inner radius for donut style
- Padding angle between segments
- Legend below chart
- Custom colors per segment

### Chart Colors
- Chart 1: `hsl(var(--chart-1))` - Primary
- Chart 2: `hsl(var(--chart-2))` - Secondary
- Chart 3: `hsl(var(--chart-3))` - Tertiary
- Chart 4: `hsl(var(--chart-4))` - Quaternary

---

## Navigation Patterns

### Sidebar Navigation (Landlord/Boarder/Admin)
- Collapsible: 64px (collapsed) / 256px (expanded)
- Logo at top (64px height)
- Scrollable nav area
- Grouped sections with labels
- Active state highlighting
- Badge indicators for counts
- Collapse toggle at bottom

### Top Navigation (Public)
- Sticky header with shadow
- Logo on left
- Navigation links in center
- Auth buttons on right
- Mobile hamburger menu
- Transparent on hero, solid on scroll

### Breadcrumbs
- Separator: `/` or `>`
- Current page not linked
- Muted color for non-current items
- Truncate long paths

---

## Modal/Dialog Patterns

### Dialog Structure
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Alert Dialog (Destructive Actions)
- Red accent for destructive actions
- Clear warning message
- Two-button footer (Cancel + Confirm)
- Focus trap for accessibility

---

## Loading States

### Skeleton Loaders
```tsx
<Skeleton className="h-32 w-full" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-1/2" />
```

### Button Loading
```tsx
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

### Page Loading
- Full-page skeleton matching layout
- Shimmer animation with `animate-pulse`
- Preserve layout structure

---

## Empty States

### Structure
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <Icon className="text-muted-foreground h-12 w-12" />
  <h3 className="mt-4 text-lg font-medium">No items found</h3>
  <p className="text-muted-foreground text-sm">
    Description or suggestion
  </p>
  <Button className="mt-4">
    <Plus className="mr-2 h-4 w-4" />
    Add Item
  </Button>
</div>
```

### Variations
- No data: Generic empty state
- No search results: Suggest adjusting filters
- No items yet: CTA to create first item
- Error state: Retry button

---

## Responsive Design Guidelines

### Breakpoint Strategy
- Mobile first: Base styles for mobile
- sm (640px): Small tablets, large phones
- md (768px): Tablets
- lg (1024px): Desktops
- xl (1280px): Large desktops
- 2xl (1536px): Extra large screens

### Common Responsive Patterns
- Grid columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Hidden elements: `hidden md:block`
- Flex direction: `flex-col md:flex-row`
- Text size: `text-2xl md:text-3xl lg:text-4xl`
- Padding: `px-4 md:px-6 lg:px-8`
- Container: `container mx-auto px-4`

### Mobile Adaptations
- Stack layouts vertically
- Full-width buttons
- Collapsible sections
- Bottom navigation for apps
- Touch-friendly targets (min 44x44px)
- Simplified navigation
- Reduced data density

---

## Accessibility Guidelines

### Focus Management
- Visible focus rings: `focus-visible:ring-2 focus-visible:ring-primary`
- Skip to content links
- Keyboard navigation support
- Focus trap in modals

### ARIA Labels
- Descriptive button labels
- Form field associations
- Status announcements
- Loading states

### Color Contrast
- WCAG AA minimum (4.5:1 for text)
- Semantic colors with sufficient contrast
- Don't rely on color alone for meaning

### Screen Reader Support
- Semantic HTML elements
- Alt text for images
- ARIA labels where needed
- Proper heading hierarchy

---

## Animation & Transitions

### Transition Classes
- `transition-colors` - Color changes (200ms)
- `transition-transform` - Transforms (200ms)
- `transition-all` - Multiple properties (300ms)
- `transition-opacity` - Fade effects (200ms)

### Animation Classes
- `animate-spin` - Loading spinners
- `animate-pulse` - Skeleton loaders
- `animate-bounce` - Attention grabbers
- `animate-in` - Enter animations
- `animate-out` - Exit animations

### Hover Effects
- Cards: `hover:shadow-md transition-shadow`
- Buttons: Built-in hover states
- Links: `hover:underline`
- Images: `hover:scale-105 transition-transform`

### Duration Guidelines
- Micro-interactions: 100-200ms
- Standard transitions: 200-300ms
- Complex animations: 300-500ms
- Page transitions: 500ms+

---

## Performance Considerations

### Image Optimization
- Use Next.js Image component
- Lazy loading for below-fold images
- Responsive images with srcset
- WebP format with fallbacks
- Proper sizing and compression

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting
- Lazy load modals and dialogs
- Defer non-critical JavaScript

### Loading Strategies
- Show skeleton loaders immediately
- Progressive enhancement
- Optimistic UI updates
- Debounce search inputs
- Paginate large lists

---

## Design Tokens Reference

### CSS Variables (Tailwind Config)

**Colors**:
- `--primary` - Main brand color
- `--secondary` - Secondary brand color
- `--destructive` - Error/delete actions
- `--muted` - Muted backgrounds
- `--accent` - Accent highlights
- `--popover` - Popover backgrounds
- `--card` - Card backgrounds

**Chart Colors**:
- `--chart-1` through `--chart-5` - Data visualization

**Semantic Colors**:
- `--success` - Success states
- `--warning` - Warning states
- `--error` - Error states
- `--info` - Information states

### Usage in Code
```tsx
// Tailwind classes
className="bg-primary text-primary-foreground"

// Direct CSS variables
style={{ backgroundColor: 'hsl(var(--primary))' }}

// Chart colors
fill="hsl(var(--chart-1))"
```

---

## Component Composition Patterns

### Card with Header and Actions
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between">
    <div>
      <CardTitle>Title</CardTitle>
      <CardDescription>Description</CardDescription>
    </div>
    <Button variant="outline">Action</Button>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Stats Card
```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Metric Name</CardTitle>
    <Icon className="text-muted-foreground h-4 w-4" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">{value}</div>
    <p className="text-muted-foreground text-xs">{description}</p>
  </CardContent>
</Card>
```

### List Item with Actions
```tsx
<div className="flex items-center justify-between rounded-lg border p-4">
  <div className="flex items-center gap-4">
    <Avatar />
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  </div>
  <div className="flex gap-2">
    <Button size="sm" variant="outline">Action 1</Button>
    <Button size="sm">Action 2</Button>
  </div>
</div>
```

---

## Best Practices Summary

### Do's
✓ Use semantic HTML elements
✓ Follow mobile-first approach
✓ Maintain consistent spacing
✓ Use design tokens (CSS variables)
✓ Provide loading states
✓ Show empty states
✓ Include error handling
✓ Add keyboard navigation
✓ Use proper ARIA labels
✓ Optimize images
✓ Test on multiple devices
✓ Follow accessibility guidelines

### Don'ts
✗ Don't use inline styles (use Tailwind)
✗ Don't hardcode colors (use design tokens)
✗ Don't skip loading states
✗ Don't ignore mobile users
✗ Don't rely on color alone for meaning
✗ Don't use tiny touch targets
✗ Don't block the main thread
✗ Don't skip error states
✗ Don't forget focus management
✗ Don't use non-semantic elements

---

## Design System Maintenance

### Version Control
- Document all changes to design system
- Maintain changelog
- Version design tokens
- Communicate updates to team

### Component Library
- Keep components in sync across apps
- Document component APIs
- Provide usage examples
- Test components in isolation

### Design-Dev Handoff
- Use Figma for design source of truth
- Export design tokens from Figma
- Maintain component mapping
- Regular design reviews

---

## Tools & Resources

### Development
- **Framework**: Next.js 16, React 18
- **Styling**: Tailwind CSS 4.x
- **Components**: Radix UI (unstyled primitives)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **State**: Zustand, TanStack Query

### Design
- **Design Tool**: Figma
- **Prototyping**: Figma prototypes
- **Icons**: Lucide icons
- **Fonts**: System fonts (Inter, SF Pro)

### Testing
- **Unit Tests**: Vitest
- **E2E Tests**: Playwright
- **Accessibility**: axe DevTools
- **Performance**: Lighthouse

---

## Figma Integration

### Component Mapping
- Map React components to Figma components
- Use consistent naming conventions
- Maintain design-code parity
- Document component variants

### Design Tokens
- Export colors from Figma
- Sync spacing values
- Match typography scale
- Align border radius values

### Workflow
1. Design in Figma
2. Review with stakeholders
3. Export design specs
4. Implement in code
5. Verify against design
6. Update Figma if needed
