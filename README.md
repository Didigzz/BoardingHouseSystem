# Boarding House Management System (BHMS)
## Complete Setup & Running Guide

### 📦 Project Structure

```
Boarding House System/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── server.js          # Main server entry
│   │   ├── config/
│   │   │   └── database.js    # PostgreSQL connection
│   │   ├── routes/            # API routes
│   │   ├── controllers/       # Business logic
│   │   └── middleware/        # Express middleware
│   ├── package.json
│   └── .env.example           # Environment variables template
├── frontend/                   # React web application
│   ├── src/
│   │   ├── index.js           # React entry point
│   │   ├── App.js             # Main App component
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   └── services/          # API service calls
│   ├── public/
│   │   └── index.html         # HTML template
│   └── package.json
├── database/
│   └── schema.sql             # PostgreSQL database schema
├── docs/
│   └── README.md              # This file
└── SYSTEM_DESIGN.md           # Complete system design document
```

---

## 🚀 QUICK START (5 Steps)

### Step 1: Install Prerequisites

You need to have installed:
- **Node.js** (v14 or higher) - Download from https://nodejs.org/
- **PostgreSQL** (v12 or higher) - Download from https://www.postgresql.org/
- **Git** (optional) - Download from https://git-scm.com/

**Verify Installation:**
```bash
node --version
npm --version
psql --version
```

### Step 2: Set Up Database

1. **Open PostgreSQL:**
   - Windows: Use pgAdmin or psql command line
   - Run: `psql -U postgres` (or your username)

2. **Create Database:**
   ```sql
   CREATE DATABASE boarding_house_db;
   \c boarding_house_db
   ```

3. **Run Schema:**
   ```bash
   # Copy and paste the contents of database/schema.sql into psql
   # OR run from command line:
   psql -U postgres -d boarding_house_db -f database/schema.sql
   ```

4. **Verify Tables Created:**
   ```sql
   \dt
   ```
   You should see tables: boarding_houses, rooms, boarders, payments, utilities, etc.

### Step 3: Set Up Backend

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` with your database credentials:**
   ```
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=boarding_house_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_secret_key
   API_BASE_URL=http://localhost:5000
   ```

5. **Start backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   🚀 Server running on port 5000
   📍 API Base URL: http://localhost:5000/api
   ```

### Step 4: Set Up Frontend

1. **Open new terminal and navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   
   Browser should automatically open at `http://localhost:3000`

### Step 5: Test the System

1. **Check Dashboard** (http://localhost:3000)
   - Should show: Total Rooms (5), Total Boarders, etc.

2. **Check Rooms Page** (http://localhost:3000/rooms)
   - Should display 5 sample rooms (101-105)

3. **Test API Directly:**
   ```bash
   # In a new terminal or Postman:
   curl http://localhost:5000/api/rooms
   ```
   Should return JSON with list of rooms.

---

## 📋 API ENDPOINTS

### Rooms
```
GET    /api/rooms              - Get all rooms
GET    /api/rooms/:id          - Get room by ID
POST   /api/rooms              - Create new room
PUT    /api/rooms/:id          - Update room
DELETE /api/rooms/:id          - Delete room
GET    /api/rooms/:id/occupancy - Get room occupancy
```

### Boarders
```
GET    /api/boarders           - Get all boarders
GET    /api/boarders/:id       - Get boarder by ID
POST   /api/boarders           - Create new boarder
PUT    /api/boarders/:id       - Update boarder
DELETE /api/boarders/:id       - Delete boarder
GET    /api/boarders/room/:roomId - Get boarders by room
```

### Payments
```
GET    /api/payments           - Get all payments
GET    /api/payments/:id       - Get payment by ID
POST   /api/payments           - Create new payment
PUT    /api/payments/:id       - Update payment
DELETE /api/payments/:id       - Delete payment
GET    /api/payments/boarder/:boarderId - Get boarder payments
GET    /api/payments/status/overdue - Get overdue payments
```

### Utilities
```
GET    /api/utilities          - Get all utilities
GET    /api/utilities/:id      - Get utility by ID
POST   /api/utilities          - Create new utility
PUT    /api/utilities/:id      - Update utility
DELETE /api/utilities/:id      - Delete utility
```

---

## 🧪 TESTING WITH POSTMAN

1. **Download Postman**: https://www.postman.com/downloads/

2. **Import Collection** (optional):
   - Create new request
   - Set URL: `http://localhost:5000/api/rooms`
   - Click Send

3. **Example: Create a Room**
   ```
   Method: POST
   URL: http://localhost:5000/api/rooms
   Body (JSON):
   {
     "room_number": "106",
     "capacity": 4,
     "type": "SHARED",
     "rental_mode": "BED_SPACER",
     "monthly_rent": 2400
   }
   ```

---

## 🛠️ TROUBLESHOOTING

### Backend Won't Start
**Error:** `Error: connect ECONNREFUSED 127.0.0.1:5432`
- **Solution:** PostgreSQL not running. Start PostgreSQL service.
  - Windows: Services → PostgreSQL → Start
  - Mac: `brew services start postgresql`
  - Linux: `sudo systemctl start postgresql`

### Frontend Page Blank
**Error:** Blank white page with no errors
- **Solution:** Backend not running. Run `npm run dev` in backend folder.

### Database Connection Error
**Error:** `error: password authentication failed`
- **Solution:** Check `.env` file has correct DB_PASSWORD

### Port Already in Use
**Error:** `Error: listen EADDRINUSE :::5000`
- **Solution:** Kill process on port 5000
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - Mac/Linux: `lsof -ti:5000 | xargs kill -9`

### Dependencies Installation Error
**Error:** `npm ERR! code E404`
- **Solution:** 
  1. Delete `node_modules` folder: `rm -rf node_modules`
  2. Delete lock file: `rm package-lock.json`
  3. Clear npm cache: `npm cache clean --force`
  4. Reinstall: `npm install`

---

## 📚 LEARNING RESOURCES

### For Beginners:

**Node.js & Express:**
- YouTube: "Express.js Crash Course" by Traversy Media
- Official: https://expressjs.com/

**React:**
- YouTube: "React Crash Course" by Traversy Media
- Official: https://react.dev/

**PostgreSQL:**
- YouTube: "PostgreSQL Tutorial" by Edureka
- Official: https://www.postgresql.org/docs/

**REST APIs:**
- YouTube: "REST API Basics" by Programming with Mosh

---

## 📝 NEXT STEPS

### Phase 1 (Currently Complete):
- ✅ Database schema
- ✅ Backend API setup
- ✅ Basic React frontend
- ✅ Room listing page
- ✅ Dashboard with metrics

### Phase 2 (To Do):
- [ ] Create/Edit/Delete forms for all entities
- [ ] Boarder management full UI
- [ ] Payment recording & tracking
- [ ] Utility management UI
- [ ] Reports page
- [ ] User authentication (Login)
- [ ] Search & filter functionality

### Phase 3 (Future):
- [ ] Mobile app (React Native)
- [ ] Payment gateway integration
- [ ] Email/SMS notifications
- [ ] Advanced analytics
- [ ] Multi-landlord support
- [ ] Document storage

---

## 🤝 CONTRIBUTING

When adding new features:

1. **Backend:**
   - Add route in `backend/src/routes/`
   - Add controller logic in `backend/src/controllers/`
   - Test with Postman or curl

2. **Frontend:**
   - Create new page in `frontend/src/pages/`
   - Add route in `frontend/src/App.js`
   - Use API service from `frontend/src/services/api.js`

3. **Database:**
   - Update schema in `database/schema.sql`
   - Document changes in comments

---

## 📞 SUPPORT

- **System Design**: See [SYSTEM_DESIGN.md](../SYSTEM_DESIGN.md)
- **API Documentation**: Postman collection (create manually for now)
- **Issues**: Common issues section above

---

## ✨ FEATURES SUMMARY

### Dashboard
- Real-time metrics (rooms, occupancy, revenue)
- Overdue payments alert
- Quick action buttons

### Rooms Management
- View all rooms with occupancy status
- Add/Edit/Delete rooms
- Track bed-spacer and whole-room rentals
- Color-coded availability status

### Boarders Management
- Complete boarder profiles
- Contract tracking
- Automatic move-out date calculation
- Boarder status tracking

### Payments & Billing
- Monthly rent calculation
- Utility charge allocation
- Payment status tracking (Paid/Pending/Overdue)
- Payment history per boarder

### Utilities Management
- Bundled or metered billing modes
- Electricity, Water, Wi-Fi tracking
- Consumption records

---

## 🎯 QUICK COMMANDS REFERENCE

**Backend:**
```bash
cd backend
npm install              # Install dependencies
npm run dev             # Start development server (with auto-reload)
npm start               # Start production server
npm test                # Run tests
```

**Frontend:**
```bash
cd frontend
npm install              # Install dependencies
npm start               # Start development server
npm run build           # Create production build
npm test                # Run tests
```

**Database:**
```bash
psql -U postgres                          # Connect to PostgreSQL
createdb boarding_house_db                # Create database
psql -d boarding_house_db -f schema.sql   # Run schema
\dt                                       # List tables
\q                                        # Quit
```

---

**Version**: 1.0  
**Last Updated**: January 10, 2026  
**Status**: Ready for Development
