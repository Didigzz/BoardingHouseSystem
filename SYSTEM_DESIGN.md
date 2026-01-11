# Boarding House Management System (BHMS) - Design Document

**Version**: 1.0  
**Date**: January 10, 2026  
**Status**: Design Specification  

---

## 📋 TABLE OF CONTENTS

1. [System Context](#system-context)
2. [Core Objectives](#core-objectives)
3. [System Architecture](#system-architecture)
4. [Entity Relationship Model](#entity-relationship-model)
5. [Pricing & Billing Logic](#pricing--billing-logic)
6. [Business Rules & Edge Cases](#business-rules--edge-cases)
7. [User Flows](#user-flows)
8. [UI/UX Wireframe Descriptions](#uiux-wireframe-descriptions)
9. [Functional Requirements](#functional-requirements)
10. [Data Validation & Error Prevention](#data-validation--error-prevention)
11. [Assumptions & Limitations](#assumptions--limitations)
12. [Future Improvements](#future-improvements)

---

## 🏠 SYSTEM CONTEXT

### Boarding House Profile

**Target Market**: Small to medium-sized boarding houses near schools, universities, and urban workplaces in the Philippines.

**Rental Models**:
- **Private Room**: Single boarder or family rents entire room
- **Bed-Spacer**: Individual rents a single bed in a shared room

**Common Areas**: Kitchen, CR/Toilet, Living/Common Space

**Utility Setup**: Electricity, Water, Wi-Fi (bundled or metered)

**Room-Only vs With Board**: Flexible (default room-only, optional meals package)

---

## 🎯 CORE OBJECTIVES

The BHMS must enable landlords to:

| Objective | Key Capability |
|-----------|-----------------|
| **Track Boarders** | Profile, room assignment, rental type, move-in date, contract duration, payment history |
| **Manage Rooms** | Visual display of capacity, occupancy, availability, rental mode (bed/whole) |
| **Visualize Occupancy** | Color-coded status, bed-level occupancy tracking, empty slot identification |
| **Track Billing & Due Dates** | Monthly rent, utilities, auto-overdue detection, payment status |
| **Manage Expenses** | Individual/shared utility breakdown, manual/automated computation |

---

## 🏗️ SYSTEM ARCHITECTURE

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  (Web UI: Dashboard, Rooms, Boarders, Payments, Reports)   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   API LAYER                                 │
│  (REST/GraphQL: Rooms, Boarders, Payments, Utilities)      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│               BUSINESS LOGIC LAYER                          │
│  (Services: RoomMgmt, BillingEngine, OccupancyCalc)        │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                 DATA ACCESS LAYER                           │
│  (Repositories: Rooms, Boarders, Payments, Utilities)      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  DATABASE LAYER                             │
│  (PostgreSQL/MySQL: Relational Database)                   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack (Recommended)

| Layer | Technology |
|-------|-----------|
| **Frontend** | React/Vue.js (mobile-first, responsive) |
| **Backend** | Node.js/Express or Python/Django |
| **Database** | PostgreSQL or MySQL |
| **Authentication** | JWT tokens |
| **Notifications** | Email/SMS alerts |
| **Reporting** | Integrated dashboard charts |

---

## 📊 ENTITY RELATIONSHIP MODEL

### Core Entities

#### **1. BoardingHouse**
```
BoardingHouse
├── id (PK)
├── name
├── location
├── ownerName
├── ownerContact
├── created_at
└── updated_at
```

#### **2. Room**
```
Room
├── id (PK)
├── boarding_house_id (FK)
├── roomNumber
├── capacity (number of beds)
├── type (PRIVATE / SHARED)
├── rentalMode (WHOLE_ROOM / BED_SPACER / FLEXIBLE)
├── status (AVAILABLE / PARTIALLY_OCCUPIED / FULLY_OCCUPIED)
├── monthlyRent (₱)
├── created_at
└── updated_at
```

#### **3. Bed**
```
Bed
├── id (PK)
├── room_id (FK)
├── bedNumber (1 to room.capacity)
├── status (AVAILABLE / OCCUPIED)
├── created_at
└── updated_at
```

#### **4. Boarder**
```
Boarder
├── id (PK)
├── boarding_house_id (FK)
├── firstName
├── lastName
├── email
├── phone
├── idType (VALID_ID / PASSPORT / etc)
├── idNumber
├── moveInDate
├── moveOutDate (nullable)
├── contractDuration (months)
├── rentalType (WHOLE_ROOM / BED_SPACER)
├── room_id (FK)
├── bed_id (FK - nullable if WHOLE_ROOM)
├── emergencyContact
├── status (ACTIVE / MOVE_OUT_NOTICE / MOVED_OUT)
├── created_at
└── updated_at
```

#### **5. Payment**
```
Payment
├── id (PK)
├── boarder_id (FK)
├── paymentDate
├── dueDate
├── amount (₱)
├── paymentType (RENT / UTILITY / SECURITY_DEPOSIT)
├── status (PAID / PENDING / OVERDUE / PARTIAL)
├── paidAmount (nullable)
├── paymentMethod (CASH / BANK_TRANSFER / ONLINE / CHEQUE)
├── referenceNumber
├── notes
├── created_at
└── updated_at
```

#### **6. Utility**
```
Utility
├── id (PK)
├── boarding_house_id (FK)
├── type (ELECTRICITY / WATER / WIFI)
├── billingMode (BUNDLED / METERED)
├── monthlyRate (if BUNDLED)
├── unitRate (if METERED)
├── startDate
├── endDate (nullable)
├── created_at
└── updated_at
```

#### **7. UtilityBill**
```
UtilityBill
├── id (PK)
├── utility_id (FK)
├── billingPeriod
├── totalUsage (if METERED)
├── totalAmount
├── created_at
└── updated_at
```

#### **8. BillingRecord**
```
BillingRecord
├── id (PK)
├── boarder_id (FK)
├── billingMonth
├── rentAmount
├── utilityAmount (calculated or breakdown)
├── otherCharges (late fees, damages, etc)
├── totalDue
├── amountPaid
├── dueDate
├── status (PAID / PENDING / OVERDUE)
├── created_at
└── updated_at
```

### ER Diagram (Text Representation)

```
BoardingHouse (1) ──── (M) Room
                ├──── (M) Boarder
                ├──── (M) Utility
                
Room (1) ──── (M) Bed
  │
  └──── (M) Boarder

Boarder (1) ──── (M) Payment
        └──── (M) BillingRecord

Utility (1) ──── (M) UtilityBill

BillingRecord and Payment work together to track boarder obligations
```

---

## 💰 PRICING & BILLING LOGIC

### Room Pricing Example

**Room Configuration**:
- Capacity: 4 beds
- Bed-spacer rate: ₱600 per person
- Whole-room rate: ₱2,400 (₱600 × 4)

### Pricing Scenarios

| Scenario | Rental Mode | Monthly Rent | Notes |
|----------|-------------|--------------|-------|
| 1 bed occupied | BED_SPACER | ₱600 | 3 beds available |
| 2 beds occupied | BED_SPACER | ₱1,200 | 2 beds available |
| 3 beds occupied | BED_SPACER | ₱1,800 | 1 bed available |
| 4 beds occupied | BED_SPACER | ₱2,400 | Room is full |
| Whole room rented | WHOLE_ROOM | ₱2,400 | BED_SPACER disabled |

### Billing Calculation

```
Monthly Bill Calculation:
─────────────────────────

Base Rent = Room Monthly Rate
            OR Sum of Occupied Bed Rates (if bed-spacer)

Utilities:
├── BUNDLED Mode: Add fixed utility rate per boarder
└── METERED Mode: Calculate share based on meter readings

Security Deposit: 1-2 months rent (one-time, on move-in)

Late Payment Fee: 5% of overdue amount (configurable)

Total Monthly Charge = Base Rent + Utility Share + Late Fees
```

### Payment Due Date Logic

```
Payment Due Date = Contract Start Date + Monthly Interval
Example:
├── Move-in: January 10
├── Due Date 1: February 10 (or configurable monthly date)
├── Due Date 2: March 10
└── Overdue if unpaid after due date
```

---

## 📋 BUSINESS RULES & EDGE CASES

### Business Rules

| Rule | Description |
|------|-------------|
| **BR-001** | A room in WHOLE_ROOM mode cannot have BED_SPACER occupancy |
| **BR-002** | Moving a bed-spacer boarder to another bed requires both beds to be in AVAILABLE state |
| **BR-003** | A boarder cannot have overlapping contracts in the same room |
| **BR-004** | Utility charges are pro-rated if boarder joins/leaves mid-month |
| **BR-005** | Security deposits are refundable and tracked separately from rent |
| **BR-006** | A room can only be marked AVAILABLE if all beds are empty |
| **BR-007** | Payment records must be immutable (no deletion, only refunds via new records) |

### Edge Cases & Solutions

#### **Edge Case 1: Bed-Spacer Leaves Mid-Month**

```
Scenario: Boarder A occupies Bed 1 (₱600), leaves on Day 15 of 30-day month
Solution:
├── Pro-rate rent: ₱600 × (15/30) = ₱300
├── Calculate refund if advance paid: (₱600 - ₱300) = ₱300 refund
├── Mark Bed 1 as AVAILABLE
└── Trigger notification for available bed
```

#### **Edge Case 2: Room Mode Switch (BED_SPACER → WHOLE_ROOM)**

```
Scenario: Room has 2 occupied beds, landlord wants to switch to WHOLE_ROOM
Solution:
├── ✗ NOT ALLOWED if room has active boarders
├── ✓ ALLOWED if all beds are vacant
├── Recommended: Create move-out notice (30 days)
└── Trigger message to occupants
```

#### **Edge Case 3: Partial Payment**

```
Scenario: Boarder owes ₱2,500, pays only ₱1,500
Solution:
├── Record payment as PARTIAL
├── Update balance: ₱2,500 - ₱1,500 = ₱1,000 outstanding
├── Status: OVERDUE (if past due date)
├── Next month: Add outstanding ₱1,000 to new month charges
└── Alert: Send overdue reminder
```

#### **Edge Case 4: Metered Utility Dispute**

```
Scenario: Boarder disputes utility charge allocation
Solution:
├── Store meter readings with timestamps
├── Allow landlord to comment on reading
├── Generate detailed breakdown per boarder
├── Allow one-time adjustment (up to 10%)
└── Create audit trail for disputes
```

#### **Edge Case 5: Boarder Move-Out with Outstanding Balance**

```
Scenario: Boarder moves out with ₱5,000 balance, security deposit ₱2,400
Solution:
├── Deduct security deposit from balance
├── New balance: ₱5,000 - ₱2,400 = ₱2,600
├── Option 1: Refund = ₱0, outstanding = ₱2,600
├── Option 2: Payment plan negotiation
└── Mark boarder status: MOVED_OUT
```

---

## 🔄 USER FLOWS

### User Flow 1: Add New Boarder

```
Landlord
  ↓
[Dashboard] → Click "Add Boarder"
  ↓
[Boarder Registration Form]
├── Personal Info: Name, Email, Phone, ID
├── Contract: Move-in date, duration (months)
├── Room Selection: Choose room/bed
├── Rental Type: Select WHOLE_ROOM or BED_SPACER
├── Payment Info: Collect security deposit
  ↓
[Validation Check]
├── Is room/bed available?
├── Is move-in date valid?
├── Capture ID document
  ↓
[Confirmation]
├── Generate contract/receipt
├── Create payment schedule
├── Mark bed as OCCUPIED
├── Send welcome email/SMS to boarder
  ↓
[Boarder Added Successfully]
```

### User Flow 2: Record Monthly Payment

```
Landlord
  ↓
[Dashboard] → Navigate to "Payments"
  ↓
[Payments List] → Filter by Boarder or Month
  ↓
[Click Boarder] → View due amount & balance
  ↓
[Record Payment]
├── Select payment method (CASH / BANK / ONLINE)
├── Enter amount paid
├── Input reference number (optional)
├── Add notes
  ↓
[Validation]
├── Is amount reasonable? (flag if overpayment)
├── Is due date in past? (auto-mark OVERDUE if applicable)
  ↓
[Payment Recorded]
├── Update balance
├── Send payment confirmation to boarder
├── Generate receipt
└── Update room occupancy status if needed
```

### User Flow 3: Move-Out Process

```
Boarder/Landlord
  ↓
[Initiate Move-Out] → Select boarder
  ↓
[Move-Out Notice]
├── Set notice date (30 days from today, recommended)
├── Record final meter readings
├── Note any damages
  ↓
[Status Update] → Boarder marked as "MOVE_OUT_NOTICE"
  ↓
[Final Bill Calculation]
├── Calculate pro-rated rent for final month
├── Finalize utility charges
├── Deduct security deposit if needed
├── Calculate refund or outstanding
  ↓
[Checkout]
├── Collect final payment
├── Record security deposit refund
├── Mark bed/room as AVAILABLE
├── Archive boarder record
  ↓
[Move-Out Complete]
```

### User Flow 4: View Room Occupancy

```
Landlord
  ↓
[Dashboard] → Click "Rooms"
  ↓
[Room Grid/List View]
├── Visual cards per room:
│  ├── Room number
│  ├── Occupancy indicator (3/4 beds)
│  ├── Status badge (AVAILABLE / PARTIALLY / FULL)
│  └── Rental mode (WHOLE / BED)
  ↓
[Click Room Card] → Room Detail View
  ↓
[Room Detail]
├── Room info: Number, capacity, type
├── Current boarders: Name, bed, contract end date
├── Empty beds: Available slots
├── Pricing: Current rate per bed/room
├── Actions: Add boarder, switch mode, view history
  ↓
[View/Edit Room]
```

---

## 🖥️ UI/UX WIREFRAME DESCRIPTIONS

### Screen 1: Dashboard (Landing Page)

**Purpose**: Overview of boarding house status at a glance

**Layout**: 
```
┌─────────────────────────────────────────────────────────────┐
│  Header: Logo | Boarding House Name | Profile | Logout      │
├─────────────────────────────────────────────────────────────┤
│ Sidebar:                         │ Main Content              │
│ ├─ Dashboard (active)            │                          │
│ ├─ Rooms                         │ ╔══════════════════════╗  │
│ ├─ Boarders                      │ ║  KEY METRICS         ║  │
│ ├─ Payments                      │ ╠══════════════════════╣  │
│ ├─ Reports                       │ ║ Total Rooms: 5       ║  │
│ └─ Settings                      │ ║ Occupied: 4          ║  │
│                                  │ ║ Available: 1         ║  │
│                                  │ ║ Total Boarders: 8    ║  │
│                                  │ ║ Revenue (Month): ₱19k║  │
│                                  │ ║ Overdue: ₱1,200      ║  │
│                                  │ ╚══════════════════════╝  │
│                                  │                          │
│                                  │ ╔══════════════════════╗  │
│                                  │ ║ UPCOMING DUE DATES   ║  │
│                                  │ ╠══════════════════════╣  │
│                                  │ ║ Juan Dela Cruz       ║  │
│                                  │ ║ Due: Jan 20, 2026    ║  │
│                                  │ ║ Amount: ₱2,400       ║  │
│                                  │ ║ [PAY] [SEND REMINDER]║  │
│                                  │ ╚══════════════════════╝  │
└─────────────────────────────────────────────────────────────┘
```

**Key Metrics** (Cards):
- Total Rooms | Occupied | Available
- Total Boarders | Overdue | Revenue This Month
- Quick action buttons: "Add Boarder", "Record Payment"

**Upcoming Due Dates** (List):
- Boarder name, room, due date, amount
- Status indicator (PAID, PENDING, OVERDUE)
- Quick action: Pay, Send Reminder

---

### Screen 2: Rooms Overview

**Purpose**: Visual display of all rooms and their occupancy

**Layout**: Grid view (responsive, 2-3 columns on desktop)

```
╔════════════════════════════════════════════════════════╗
║ Rooms                              [+ Add Room] [Filter]║
╚════════════════════════════════════════════════════════╝

┌──────────┐  ┌──────────┐  ┌──────────┐
│ Room 101 │  │ Room 102 │  │ Room 103 │
├──────────┤  ├──────────┤  ├──────────┤
│ Capacity │  │ Capacity │  │ Capacity │
│ 4 beds   │  │ 2 beds   │  │ 4 beds   │
│ Occupancy│  │ Occupancy│  │ Occupancy│
│ 3/4 ███  │  │ 2/2 ███  │  │ 0/4      │
│ Status   │  │ Status   │  │ Status   │
│ PARTIAL  │  │ FULL     │  │ AVAILABLE│
│ Rent Mode│  │ Rent Mode│  │ Rent Mode│
│ BED      │  │ WHOLE    │  │ BED      │
│ [Details]│  │ [Details]│  │ [Details]│
└──────────┘  └──────────┘  └──────────┘

┌──────────┐  ┌──────────┐
│ Room 104 │  │ Room 105 │
├──────────┤  ├──────────┤
│ Capacity │  │ Capacity │
│ 4 beds   │  │ 2 beds   │
│ Occupancy│  │ Occupancy│
│ 1/4 █    │  │ 1/2 █    │
│ Status   │  │ Status   │
│ PARTIAL  │  │ PARTIAL  │
│ Rent Mode│  │ Rent Mode│
│ BED      │  │ FLEXIBLE │
│ [Details]│  │ [Details]│
└──────────┘  └──────────┘
```

**Card Elements**:
- Room Number (clickable to detail)
- Capacity indicator
- Visual occupancy bar (3/4 ███░)
- Status badge (colored: AVAILABLE=green, PARTIAL=yellow, FULL=red)
- Rental mode badge
- Details button

---

### Screen 3: Room Detail Page

**Purpose**: Detailed view of a single room and its boarders

```
╔════════════════════════════════════════════════════════╗
║ Room 101 Details                    [Edit] [← Back]    ║
╚════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────┐
│ ROOM INFORMATION                                        │
├─────────────────────────────────────────────────────────┤
│ Room Number: 101          │ Capacity: 4 beds            │
│ Room Type: SHARED         │ Monthly Rate: ₱2,400        │
│ Rental Mode: BED_SPACER   │ Bed Rate: ₱600 per bed      │
│ Status: PARTIALLY_OCCUPIED│ Created: Jan 01, 2025       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ BED ALLOCATION (3/4 Occupied)                           │
├─────────────────────────────────────────────────────────┤
│ Bed 1: Juan Dela Cruz       Contract: Jan 15 - Jun 14  │
│        ID: 123-456-789      Status: ACTIVE             │
│        [View] [Move] [Details]                          │
│                                                         │
│ Bed 2: Maria Santos         Contract: Feb 01 - Jul 31  │
│        ID: 987-654-321      Status: ACTIVE             │
│        [View] [Move] [Details]                          │
│                                                         │
│ Bed 3: Carlos Ramos         Contract: Dec 20 - May 19  │
│        ID: 456-789-123      Status: MOVE_OUT_NOTICE    │
│        [View] [Move] [Details]                          │
│                                                         │
│ Bed 4: ◯ AVAILABLE                                      │
│        [Add Boarder]                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ROOM ACTIONS                                            │
├─────────────────────────────────────────────────────────┤
│ [+ Add Boarder] [Switch to WHOLE_ROOM] [Edit Room]     │
│ [View History]  [View Payments]        [Delete Room]   │
└─────────────────────────────────────────────────────────┘
```

---

### Screen 4: Boarder Profile

**Purpose**: Complete profile and payment history of a single boarder

```
╔════════════════════════════════════════════════════════╗
║ Boarder: Juan Dela Cruz               [Edit] [← Back]  ║
╚════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────┐
│ PERSONAL INFORMATION                                    │
├─────────────────────────────────────────────────────────┤
│ Name: Juan Dela Cruz           │ Email: juan@email.com  │
│ Phone: 09123456789             │ ID Type: VALID ID      │
│ ID Number: 123-456-789-0       │ Verified: ✓            │
│ Emergency Contact: Maria DC    │ Phone: 09987654321     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ CONTRACT DETAILS                                        │
├─────────────────────────────────────────────────────────┤
│ Room: 101                      │ Bed: 1                  │
│ Rental Type: BED_SPACER        │ Monthly Rent: ₱600      │
│ Move-in Date: Jan 15, 2025     │ Contract Duration: 6 mo │
│ Contract End: Jun 14, 2025     │ Status: ACTIVE          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PAYMENT SUMMARY                                         │
├─────────────────────────────────────────────────────────┤
│ Monthly Rent: ₱600                                      │
│ Utility Share: ₱100 (bundled Wi-Fi, Water)             │
│ Total Monthly: ₱700                                     │
│ Balance Due: ₱700                                       │
│ Outstanding (Previous): ₱0                              │
│ Next Due Date: Jan 15, 2026                             │
│ Status: PENDING                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PAYMENT HISTORY                                         │
├─────────────────────────────────────────────────────────┤
│ Month      │ Amount  │ Due Date  │ Paid Date  │ Status  │
├─────────────────────────────────────────────────────────┤
│ Dec 2025   │ ₱700    │ Dec 15    │ Dec 20     │ PAID    │
│ Nov 2025   │ ₱700    │ Nov 15    │ Nov 25     │ PAID    │
│ Oct 2025   │ ₱700    │ Oct 15    │ Oct 18     │ PAID    │
│ Sep 2025   │ ₱700    │ Sep 15    │ --         │ OVERDUE │
│                                                         │
│ [Load More] [Export PDF] [Print]                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ BOARDER ACTIONS                                         │
├─────────────────────────────────────────────────────────┤
│ [Record Payment] [Move Boarder] [Extend Contract]       │
│ [Move-Out Notice] [Print Contract] [Contact Boarder]    │
└─────────────────────────────────────────────────────────┘
```

---

### Screen 5: Payments & Billing

**Purpose**: Track and record payments for all boarders

```
╔════════════════════════════════════════════════════════╗
║ Payments & Billing                                     ║
├────────────────────────────────────────────────────────┤
║ [Filter: All Statuses] [Month: January 2026]           ║
║ [View: By Boarder] [By Date] [By Status]               ║
╚════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────┐
│ PAYMENT SUMMARY                                         │
├─────────────────────────────────────────────────────────┤
│ Total Due (This Month):    ₱5,600                      │
│ Total Paid (This Month):   ₱4,200                      │
│ Total Overdue:             ₱1,200                      │
│ Total Pending:             ₱1,400                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PAYMENT RECORDS                                         │
├─────────────────────────────────────────────────────────┤
│ [+ Record Payment]                                      │
│                                                         │
│ Boarder         │ Amount  │ Due Date  │ Status  │ Action│
├─────────────────────────────────────────────────────────┤
│ Juan Dela Cruz  │ ₱600    │ Jan 15    │ PENDING │ [Pay] │
│ Maria Santos    │ ₱600    │ Jan 15    │ PAID    │ --    │
│ Carlos Ramos    │ ₱1,200  │ Jan 15    │ OVERDUE │ [Pay] │
│ Ana Garcia      │ ₱600    │ Jan 20    │ PENDING │ [Pay] │
│ Luis Fernandez  │ ₱600    │ Jan 10    │ OVERDUE │ [Pay] │
│ Rosa Lopez      │ ₱600    │ Jan 25    │ PENDING │ [Pay] │
│ Pedro Martinez  │ ₱600    │ Jan 30    │ PAID    │ --    │
│ Sofia Gonzales  │ ₱600    │ Jan 20    │ PAID    │ --    │
│                                                         │
│ [Load More] [Export CSV] [Print Report]                │
└─────────────────────────────────────────────────────────┘

Sidebar:
┌──────────────────────┐
│ PAYMENT STATUS      │
├──────────────────────┤
│ 🟢 Paid: 4 (₱2,400) │
│ 🟡 Pending: 2 (₱1,200)
│ 🔴 Overdue: 2 (₱1,200)
│                     │
│ [Mark as Paid]      │
│ [Send Reminder]     │
│ [View Overdue]      │
│ [Print Receipts]    │
└──────────────────────┘
```

---

## 📝 FUNCTIONAL REQUIREMENTS

### FR-1: Room Management

| Requirement | Description |
|-------------|-------------|
| **FR-1.1** | Add, edit, delete rooms (with capacity, type) |
| **FR-1.2** | Toggle rental mode (WHOLE_ROOM ↔ BED_SPACER) only if vacant |
| **FR-1.3** | Display real-time occupancy status (AVAILABLE / PARTIAL / FULL) |
| **FR-1.4** | View occupancy history and status changes |
| **FR-1.5** | Set custom room pricing (override default per bed rate) |

### FR-2: Boarder Management

| Requirement | Description |
|-------------|-------------|
| **FR-2.1** | Register new boarder with full profile (personal info, ID, contact) |
| **FR-2.2** | Assign boarder to room/bed |
| **FR-2.3** | Set contract duration with automatic end date calculation |
| **FR-2.4** | Track boarder status (ACTIVE / MOVE_OUT_NOTICE / MOVED_OUT) |
| **FR-2.5** | Edit boarder details (name, contact, emergency contact) |
| **FR-2.6** | Archive/delete moved-out boarders |
| **FR-2.7** | Generate tenant contract/agreement for printing |

### FR-3: Billing & Payments

| Requirement | Description |
|-------------|-------------|
| **FR-3.1** | Auto-generate monthly billing records |
| **FR-3.2** | Calculate rent based on rental type (whole/bed-spacer) |
| **FR-3.3** | Include utility charges (bundled or metered) |
| **FR-3.4** | Detect and flag overdue payments automatically |
| **FR-3.5** | Record partial payments with balance tracking |
| **FR-3.6** | Generate payment receipts and send to boarder |
| **FR-3.7** | Track payment history per boarder |
| **FR-3.8** | Calculate pro-rated charges for mid-month move-in/out |

### FR-4: Utility Management

| Requirement | Description |
|-------------|-------------|
| **FR-4.1** | Add utilities (Electricity, Water, Wi-Fi) |
| **FR-4.2** | Set billing mode (BUNDLED per boarder or METERED) |
| **FR-4.3** | Record meter readings with timestamps |
| **FR-4.4** | Calculate consumption and allocate to boarders |
| **FR-4.5** | Flag usage anomalies (unusually high readings) |

### FR-5: Occupancy Visualization

| Requirement | Description |
|-------------|-------------|
| **FR-5.1** | Display room grid/cards with occupancy indicators |
| **FR-5.2** | Color-code status (Green: Available, Yellow: Partial, Red: Full) |
| **FR-5.3** | Show bed-level occupancy breakdown |
| **FR-5.4** | Display who occupies each bed |
| **FR-5.5** | Allow quick bed assignment/reassignment |

### FR-6: Reporting & Analytics

| Requirement | Description |
|-------------|-------------|
| **FR-6.1** | Dashboard with key metrics (occupancy, revenue, overdue) |
| **FR-6.2** | Monthly income report |
| **FR-6.3** | Boarder payment summary report |
| **FR-6.4** | Utility consumption report |
| **FR-6.5** | Occupancy history report |
| **FR-6.6** | Export reports (PDF, CSV) |

### FR-7: Notifications & Reminders

| Requirement | Description |
|-------------|-------------|
| **FR-7.1** | Email/SMS payment reminders before due date |
| **FR-7.2** | Alert on overdue payments |
| **FR-7.3** | Notify of available beds |
| **FR-7.4** | Contract expiration reminders (30 days before) |
| **FR-7.5** | Anomaly alerts (high utility usage, damaged property) |

### FR-8: Multi-Boarding House Support

| Requirement | Description |
|-------------|-------------|
| **FR-8.1** | Support multiple boarding houses per landlord |
| **FR-8.2** | Switch between boarding houses (UI dropdown) |
| **FR-8.3** | Separate data per boarding house |
| **FR-8.4** | Generate consolidated reports across all properties |

---

## 🔐 DATA VALIDATION & ERROR PREVENTION

### Input Validation

| Field | Rule | Error Message |
|-------|------|---------------|
| **Boarder Email** | Valid email format | "Please enter a valid email address" |
| **Phone Number** | 10-11 digits (PH format) | "Phone must be 10-11 digits" |
| **ID Number** | Cannot be null, unique per boarder | "ID is required" |
| **Move-in Date** | Cannot be in past | "Move-in date cannot be in the past" |
| **Contract Duration** | Minimum 1 month, max 60 months | "Duration must be 1-60 months" |
| **Monthly Rent** | Must be > ₱0 | "Rent must be greater than ₱0" |
| **Room Capacity** | Minimum 1 bed, max 10 beds | "Capacity must be 1-10 beds" |
| **Payment Amount** | Cannot exceed total due + 20% | "Payment appears abnormally high" |

### Business Logic Validation

```
Before Adding Boarder:
├── Is selected room/bed AVAILABLE?
├── Is move-in date valid?
├── Does boarder already exist in another room/bed?
├── Is room in correct rental mode?
└── Is ID document provided?

Before Recording Payment:
├── Is boarder ACTIVE status?
├── Is amount reasonable?
├── Is due date in system?
└── Is payment method valid?

Before Switching Rental Mode:
├── Are all beds in room AVAILABLE?
├── Are there active boarders?
└── Alert: "Cannot switch mode while room is occupied"

Before Move-Out:
├── Are all utilities billed?
├── Is final payment made?
├── Is security deposit calculated?
└── Record final meter readings
```

### Duplicate Prevention

| Rule | Mechanism |
|------|-----------|
| **Duplicate Boarder** | Check email, phone, ID number for uniqueness |
| **Duplicate Payment Record** | Prevent same payment entered twice (same amount, date, boarder) |
| **Duplicate Utility Bill** | One bill per utility per billing period |
| **Overlapping Contracts** | Ensure no overlapping contracts for same boarder |

---

## 🤔 ASSUMPTIONS & LIMITATIONS

### Assumptions

| # | Assumption | Rationale |
|---|-----------|-----------|
| **A-1** | Single landlord per boarding house | Simplifies permission model; can evolve to multi-admin later |
| **A-2** | All contracts are month-to-month or fixed duration | Supports standard Philippine rental practices |
| **A-3** | Payments are always in Philippine Pesos (₱) | Target market is Philippines; multi-currency not required initially |
| **A-4** | Boarders pay on or after due date (no advance rent) | Standard in PH; can evolve to support advance payment |
| **A-5** | Utility meters are read manually (not IoT) | Cost-effective; manual entry with photo support |
| **A-6** | One boarder per room (if WHOLE_ROOM) or per bed (if BED_SPACER) | Simplifies billing; family units can be handled as single entity |
| **A-7** | Security deposit is refundable | PH law requires; will be tracked separately |
| **A-8** | Landlord manages system (no boarder self-service initially) | Simplifies features; can add portal later |
| **A-9** | No integrations with banking/payment gateways | Manual payment recording; can add integrations later |
| **A-10** | Standard working hours for support | System is for small landlords, not 24/7 operation |

### Limitations

| Limitation | Impact | Future Solution |
|-----------|--------|-----------------|
| **No Multi-Landlord** | Only supports single landlord per system instance | Deploy separate instances or add role-based access |
| **Manual Utility Readings** | Prone to data entry errors | Integrate with smart meters or IoT devices |
| **No Payment Gateway** | Requires manual payment recording | Integrate PayMongo, GCash, BDO API |
| **No Mobile App** | Desktop/web only initially | Build React Native or Flutter app |
| **No Automated Notifications** | Manual reminder sending | Integrate Twilio SMS, SendGrid email |
| **No Repair/Maintenance Tracking** | No facility management features | Add maintenance tickets, contractor management |
| **No Guest Management** | Cannot track short-term guests or visitors | Add guest registry module |
| **Single Currency** | Only Philippine Pesos | Expand to multi-currency for OFWs or international operations |

---

## 🚀 FUTURE IMPROVEMENTS

### Phase 2 Features (Next 6-12 Months)

```
Priority 1 (High ROI):
├── Mobile app (iOS/Android)
├── Automated email/SMS notifications
├── Payment gateway integration (PayMongo, GCash)
├── Boarder self-service portal
└── Receipt/invoice printing templates

Priority 2 (Medium ROI):
├── Maintenance & repair tracking
├── Guest management & visitor log
├── Document storage (contracts, IDs, receipts)
├── Multi-landlord support (add managers/staff)
└── Advanced analytics (occupancy forecasting, trends)

Priority 3 (Nice to Have):
├── Integration with accounting software (QB)
├── Automated utility bill distribution
├── Video walkthrough storage
├── Online application form for boarders
└── Community features (bulletin board, announcements)
```

### Architectural Improvements

```
Scalability:
├── Migrate to microservices (Rooms, Boarders, Payments services)
├── Implement caching layer (Redis)
├── Database replication for backup
└── API rate limiting

Performance:
├── Optimize queries with indexes
├── Implement pagination for large lists
├── Lazy loading for images/documents
└── PWA for offline capability

Security:
├── Two-factor authentication (2FA)
├── Encryption for sensitive data (ID numbers, payments)
├── Audit logging for all transactions
├── PCI DSS compliance for payment handling
└── GDPR compliance for personal data
```

---

## 📞 SUPPORT & NEXT STEPS

### Questions for Clarification

Before implementation begins, consider:

1. **Budget**: What's the target monthly/annual fee structure?
2. **Timeline**: What's the MVP release date?
3. **Boarding Houses**: How many properties will the system support initially?
4. **Boarders**: Estimated total boarders at launch?
5. **Payment Methods**: Which payment methods to support initially?
6. **Language**: English only or include Filipino/Tagalog?

### Getting Started

**Phase 0 (This Week)**:
- [ ] Review and approve this design document
- [ ] Assign frontend and backend developers
- [ ] Set up development environment (Git, CI/CD)
- [ ] Create database schema based on ER model

**Phase 1 (MVP - 8-12 Weeks)**:
- [ ] Develop core APIs (Rooms, Boarders, Payments)
- [ ] Build UI screens (Dashboard, Rooms, Boarders, Payments)
- [ ] Implement billing engine
- [ ] Alpha testing with 1-2 real boarding houses
- [ ] Launch MVP

---

**Document Status**: Ready for Development  
**Next Review**: Upon MVP completion  
**Version**: 1.0 | Date: January 10, 2026
