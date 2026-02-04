# Boarding House System Flow Diagrams

## User Authentication & Role Flow

```mermaid
flowchart TD
    A[Visitor] --> B{Browse Public Platform}
    B --> C[View Listings]
    B --> D[Search Properties]
    B --> E[View Map]
    B --> F{Want to Register?}
    
    F -->|Yes| G{Registration Type}
    F -->|No| B
    
    G -->|Boarder| H[Register as Boarder]
    G -->|Landlord| I[Apply as Landlord]
    
    H --> J[Boarder Account Created]
    J --> K[Role: boarder, Status: active]
    K --> L[Boarder Dashboard Access]
    
    I --> M[Landlord Application]
    M --> N[Role: landlord, Status: pending]
    N --> O[Limited Access - View Application Status]
    
    O --> P{Admin Review}
    P -->|Approved| Q[Status: approved]
    P -->|Rejected| R[Application Rejected]
    
    Q --> S[Full Landlord Dashboard Access]
    R --> T[Can Reapply]
    
    U[Admin Login] --> V[Admin Dashboard]
    V --> W[Manage All Users & Platform]
```

## Boarder User Journey

```mermaid
flowchart TD
    A[Boarder Login] --> B[Boarder Dashboard]
    B --> C[Manage Profile]
    B --> D[Browse Listings]
    B --> E[Saved Properties]
    B --> F[Messages]
    B --> G[Booking History]
    B --> H[Payment History]
    
    D --> I[View Property Details]
    I --> J[Save/Bookmark Property]
    I --> K[Message Landlord]
    I --> L[Request Booking]
    
    L --> M[Booking Request Sent]
    M --> N{Landlord Response}
    N -->|Approved| O[Complete Payment]
    N -->|Rejected| P[Find Other Properties]
    
    O --> Q[Booking Confirmed]
    Q --> R[Update Booking History]
```

## Landlord User Journey

```mermaid
flowchart TD
    A[Landlord Application] --> B{Admin Approval}
    B -->|Pending| C[Limited Dashboard Access]
    B -->|Approved| D[Full Dashboard Access]
    B -->|Rejected| E[Reapply Process]
    
    D --> F[Manage Listings]
    D --> G[View Bookings]
    D --> H[Messages]
    D --> I[Earnings & Payouts]
    
    F --> J[Create New Listing]
    F --> K[Edit Existing Listing]
    F --> L[Upload Images]
    F --> M[Set Pricing & Availability]
    
    G --> N[Review Booking Requests]
    N --> O{Approve/Reject}
    O -->|Approve| P[Booking Confirmed]
    O -->|Reject| Q[Send Rejection Notice]
    
    H --> R[Communicate with Boarders]
    I --> S[View Payment History]
    I --> T[Request Payouts]
```

## Admin Management Flow

```mermaid
flowchart TD
    A[Admin Dashboard] --> B[User Management]
    A --> C[Landlord Applications]
    A --> D[Content Moderation]
    A --> E[System Analytics]
    A --> F[Dispute Resolution]
    
    B --> G[View All Users]
    B --> H[Suspend/Activate Users]
    
    C --> I[Review Applications]
    I --> J{Approve/Reject}
    J -->|Approve| K[Landlord Activated]
    J -->|Reject| L[Send Rejection Notice]
    
    D --> M[Review Listings]
    D --> N[Moderate Content]
    D --> O[Handle Reports]
    
    E --> P[Booking Analytics]
    E --> Q[Revenue Reports]
    E --> R[User Activity Stats]
    
    F --> S[Handle Disputes]
    F --> T[Mediate Issues]
```

## System Architecture Flow

```mermaid
flowchart LR
    A[Public Web Interface] --> B[Authentication System]
    B --> C{Role Check}
    
    C -->|boarder| D[Boarder Dashboard]
    C -->|landlord + pending| E[Limited Landlord Access]
    C -->|landlord + approved| F[Full Landlord Dashboard]
    C -->|admin| G[Admin Dashboard]
    
    D --> H[Boarder API Routes]
    E --> I[Limited API Access]
    F --> J[Landlord API Routes]
    G --> K[Admin API Routes]
    
    H --> L[Database - Boarder Data]
    I --> M[Database - Application Status]
    J --> N[Database - Landlord Data]
    K --> O[Database - All Data]
    
    P[Public API] --> Q[Listings Database]
    P --> R[Search & Filter Engine]
    P --> S[Map Integration]
```

## Entity Relationship Diagram

```mermaid
erDiagram
    USERS {
        string id PK
        string email UK
        string password_hash
        string first_name
        string last_name
        string phone
        enum role "boarder, landlord, admin"
        enum status "active, pending, suspended, rejected"
        datetime created_at
        datetime updated_at
        datetime last_login
    }
    
    BOARDING_HOUSES {
        string id PK
        string landlord_id FK
        string name
        text description
        string address
        decimal latitude
        decimal longitude
        decimal price_per_month
        integer available_rooms
        integer total_rooms
        json amenities
        enum status "active, inactive, pending_review"
        datetime created_at
        datetime updated_at
    }
    
    PROPERTY_IMAGES {
        string id PK
        string boarding_house_id FK
        string image_url
        string alt_text
        boolean is_primary
        integer sort_order
        datetime uploaded_at
    }
    
    BOOKINGS {
        string id PK
        string boarder_id FK
        string boarding_house_id FK
        string landlord_id FK
        datetime start_date
        datetime end_date
        decimal total_amount
        enum status "pending, confirmed, cancelled, completed"
        text notes
        datetime created_at
        datetime updated_at
    }
    
    PAYMENTS {
        string id PK
        string booking_id FK
        string boarder_id FK
        string landlord_id FK
        decimal amount
        enum status "pending, completed, failed, refunded"
        string payment_method
        string transaction_id
        datetime processed_at
        datetime created_at
    }
    
    MESSAGES {
        string id PK
        string sender_id FK
        string recipient_id FK
        string boarding_house_id FK
        text content
        boolean is_read
        datetime sent_at
        datetime read_at
    }
    
    SAVED_PROPERTIES {
        string id PK
        string boarder_id FK
        string boarding_house_id FK
        datetime saved_at
    }
    
    LANDLORD_APPLICATIONS {
        string id PK
        string user_id FK
        text business_name
        text business_address
        string tax_id
        json verification_documents
        text notes
        enum status "pending, approved, rejected"
        string reviewed_by FK
        datetime reviewed_at
        datetime created_at
        datetime updated_at
    }
    
    REVIEWS {
        string id PK
        string boarder_id FK
        string boarding_house_id FK
        string booking_id FK
        integer rating
        text comment
        datetime created_at
        datetime updated_at
    }
    
    REPORTS {
        string id PK
        string reporter_id FK
        string reported_user_id FK
        string boarding_house_id FK
        enum type "inappropriate_content, fraud, harassment, other"
        text description
        enum status "pending, investigating, resolved, dismissed"
        string handled_by FK
        datetime created_at
        datetime resolved_at
    }

    %% Relationships
    USERS ||--o{ BOARDING_HOUSES : "landlord owns"
    USERS ||--o{ BOOKINGS : "boarder books"
    USERS ||--o{ BOOKINGS : "landlord receives"
    USERS ||--o{ PAYMENTS : "boarder pays"
    USERS ||--o{ PAYMENTS : "landlord receives"
    USERS ||--o{ MESSAGES : "sender"
    USERS ||--o{ MESSAGES : "recipient"
    USERS ||--o{ SAVED_PROPERTIES : "boarder saves"
    USERS ||--o{ LANDLORD_APPLICATIONS : "applies"
    USERS ||--o{ REVIEWS : "boarder reviews"
    USERS ||--o{ REPORTS : "reporter"
    USERS ||--o{ REPORTS : "reported_user"
    USERS ||--o{ REPORTS : "admin_handler"
    
    BOARDING_HOUSES ||--o{ PROPERTY_IMAGES : "has"
    BOARDING_HOUSES ||--o{ BOOKINGS : "booked"
    BOARDING_HOUSES ||--o{ MESSAGES : "about"
    BOARDING_HOUSES ||--o{ SAVED_PROPERTIES : "saved"
    BOARDING_HOUSES ||--o{ REVIEWS : "reviewed"
    BOARDING_HOUSES ||--o{ REPORTS : "reported"
    
    BOOKINGS ||--|| PAYMENTS : "payment_for"
    BOOKINGS ||--o{ REVIEWS : "reviewed"
    
    LANDLORD_APPLICATIONS ||--|| USERS : "reviewed_by_admin"
```

## Database Schema Notes

### Key Design Decisions:

1. **Single Users Table**: All user types (boarders, landlords, admins) are stored in one table with role and status fields for access control.

2. **Tenant Isolation**: Landlords can only access their own boarding houses through landlord_id foreign keys.

3. **Approval Workflow**: Landlord applications are tracked separately, with status changes reflected in the users table.

4. **Flexible Amenities**: JSON field allows for dynamic amenity lists without schema changes.

5. **Comprehensive Messaging**: Messages are linked to specific properties for context.

6. **Audit Trail**: Created/updated timestamps on all major entities for tracking changes.

7. **Soft Relationships**: Status fields allow for soft deletion and state management without losing data.

### Indexes Recommended:

- `users.email` (unique)
- `users.role, users.status`
- `boarding_houses.landlord_id`
- `boarding_houses.status`
- `bookings.boarder_id, bookings.status`
- `bookings.landlord_id, bookings.status`
- `messages.recipient_id, messages.is_read`
- `saved_properties.boarder_id`