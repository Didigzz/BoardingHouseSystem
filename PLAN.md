# System Prompt / Platform Specification

## Phase 1: Public Platform (Marketplace & Discovery)

The platform begins with a public-facing landing page that serves as a marketplace for boarding houses. This public area allows visitors to browse, search, and view boarding house listings without logging in. Users can search by location, price range, availability, and amenities, view detailed listing pages with photos and descriptions, and see boarding house locations pinned on an interactive map using a mapping API (such as Google Maps API, Mapbox, or OpenStreetMap). The map displays all available boarding houses as pins, allowing users to visualize locations and explore nearby options. The public platform also includes authentication entry points such as login and registration, as well as a clear call-to-action for users who want to apply as landlords ("Become a Landlord").

The public platform is shared by all users and does not expose any private or tenant-specific data. It acts as the discovery layer of the system.

## Phase 2: Boarders / Renters (Authenticated Users) 

After registration and login, users who are looking for boarding houses (referred to as boarders or renters, not limited to students) gain access to their personal dashboard. These users are assigned the role `boarder` and are immediately active without requiring approval.

Authenticated boarders can:

- Manage their profile and personal information
- Save and bookmark boarding house listings
- Communicate with landlords through in-platform messaging
- Request bookings or reservations
- Complete payments through the platform
- View their booking and payment history

Boarders can only interact with listings and landlords but cannot modify property data. Their access is limited to boarder-specific routes and features.

## Phase 3: Landlord Dashboard (Multi-Tenant Area) (this is done implimented)

Landlords are treated as tenants within the platform. A landlord begins by applying through the public "Become a Landlord" flow. During this application process, the user submits personal information, verification details, and optional initial boarding house information.

Upon application, the user account is created with the role `landlord` and a status of `pending`. Pending landlords can log in but are restricted to viewing their application status and profile; they cannot publish listings, accept bookings, or receive payments until approved.

Once approved by an admin, the landlord's status changes to `approved`, unlocking access to the landlord dashboard. The landlord dashboard is a private, role-protected area where each landlord can:

- Create, edit, and manage their boarding house listings
- Upload images, set pricing, and define availability
- Pin property locations on the interactive map using mapping API integration (Google Maps API, Mapbox, or OpenStreetMap), allowing their boarding houses to be displayed as pins on the public map
- Manage incoming booking requests
- Communicate with boarders
- View earnings and payout information

Each landlord can only access and manage their own data. Tenant isolation is enforced at the database and API level using landlord identifiers.

## Phase 4: Platform Admin Dashboard

The admin dashboard is a restricted area accessible only to users with the `admin` role. This dashboard allows platform owners or moderators to oversee the entire system.

Admins can:

- Review and approve or reject landlord applications
- Suspend or deactivate landlords or listings
- Moderate boarding house content
- Monitor bookings and payments
- Handle disputes, reports, and system-wide analytics

Admins do not act as landlords or boarders and have full visibility across all tenants and users.

## User Roles & Access Control

The platform uses a single authentication system and a unified users table. Each user has a role and, where applicable, a status. Roles determine what areas of the platform a user can access, while status determines what actions they are allowed to perform.

- `boarder`: Can browse, book, message, and pay
- `landlord`: Can manage listings and bookings once approved
- `admin`: Can manage users, landlords, and platform operations

Landlords require admin approval before gaining full access, while boarders do not.

## Authentication & Authorization Model

All users authenticate through the same login and registration system. After login, users are redirected based on their role and status. Route-level and API-level guards ensure that users can only access areas and perform actions permitted by their role and approval status.