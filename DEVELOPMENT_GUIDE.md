# Boarding House Management System - Implementation Guide

## 🎓 Learning Path for Beginners

This guide helps you understand and develop the BHMS project step by step.

---

## 📚 Understanding the Project Structure

### Backend Structure (Node.js + Express)

```
backend/
├── src/
│   ├── server.js           # Entry point - starts the server
│   ├── config/
│   │   └── database.js     # PostgreSQL connection setup
│   ├── routes/             # API endpoint definitions
│   │   ├── roomRoutes.js
│   │   ├── boarderRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── utilityRoutes.js
│   ├── controllers/        # Business logic
│   │   ├── roomController.js
│   │   ├── boarderController.js
│   │   ├── paymentController.js
│   │   └── utilityController.js
│   └── middleware/
│       └── errorHandler.js # Error handling
```

**How it works:**
1. `server.js` starts the Express server
2. Routes define URL endpoints (e.g., `/api/rooms`)
3. Controllers handle the logic (query database, process data)
4. Database connection retrieves/stores data in PostgreSQL

### Frontend Structure (React)

```
frontend/
├── src/
│   ├── index.js            # React entry point
│   ├── App.js              # Main App component with routes
│   ├── pages/              # Full page components
│   │   ├── Dashboard.js
│   │   ├── Rooms.js
│   │   ├── Boarders.js
│   │   ├── Payments.js
│   │   └── Utilities.js
│   ├── components/         # Reusable components
│   │   ├── Navbar.js
│   │   └── DashboardCard.js
│   └── services/           # API communication
│       └── api.js          # Axios API calls
```

**How it works:**
1. `index.js` loads React app into HTML
2. `App.js` defines page routes
3. Pages fetch data using `api.js` service
4. Components display the data to user

---

## 🔄 How Data Flows

### Example: Viewing Rooms

```
1. User clicks "Rooms" in Navbar
   ↓
2. React Router loads Rooms.js page
   ↓
3. Rooms.js calls: roomAPI.getAllRooms()
   ↓
4. api.js sends GET request to http://localhost:5000/api/rooms
   ↓
5. Backend receives request in roomRoutes.js
   ↓
6. Route calls roomController.getAllRooms()
   ↓
7. Controller queries PostgreSQL database
   ↓
8. Database returns rooms data
   ↓
9. Controller sends JSON response
   ↓
10. Frontend receives data and renders Rooms page
```

---

## 🛠️ Key Concepts Explained

### 1. Routes (Backend)

**File:** `backend/src/routes/roomRoutes.js`

```javascript
router.get('/', roomController.getAllRooms);
// This means: GET /api/rooms → call getAllRooms function
```

### 2. Controllers (Backend)

**File:** `backend/src/controllers/roomController.js`

```javascript
const getAllRooms = async (req, res) => {
  // req = request (what user is asking for)
  // res = response (what we send back)
  
  const result = await pool.query('SELECT * FROM rooms');
  res.json(result.rows); // Send rooms as JSON
};
```

### 3. Database (PostgreSQL)

**File:** `database/schema.sql`

```sql
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  room_number VARCHAR(50),
  capacity INTEGER,
  monthly_rent DECIMAL(10,2),
  ...
);
```

### 4. API Service (Frontend)

**File:** `frontend/src/services/api.js`

```javascript
export const roomAPI = {
  getAllRooms: () => api.get('/rooms'),
  // This calls: GET http://localhost:5000/api/rooms
};
```

### 5. React Component (Frontend)

**File:** `frontend/src/pages/Rooms.js`

```javascript
useEffect(() => {
  const response = await roomAPI.getAllRooms();
  setRooms(response.data.data); // Store rooms in state
}, []);

// Render rooms
return (
  <div>
    {rooms.map(room => (
      <div key={room.id}>{room.room_number}</div>
    ))}
  </div>
);
```

---

## 📖 Step-by-Step Development Examples

### Example 1: Adding a New Room (Complete Flow)

**1. Backend Route** (`backend/src/routes/roomRoutes.js`)
```javascript
router.post('/', roomController.createRoom);
// POST /api/rooms → creates a room
```

**2. Backend Controller** (`backend/src/controllers/roomController.js`)
```javascript
const createRoom = async (req, res) => {
  const { room_number, capacity, monthly_rent } = req.body;
  const result = await pool.query(
    'INSERT INTO rooms (...) VALUES (...)',
    [room_number, capacity, monthly_rent]
  );
  res.json(result.rows[0]); // Return created room
};
```

**3. Frontend API Service** (`frontend/src/services/api.js`)
```javascript
export const roomAPI = {
  createRoom: (data) => api.post('/rooms', data),
};
```

**4. Frontend Component** (`frontend/src/pages/Rooms.js`)
```javascript
const handleAddRoom = async (formData) => {
  const response = await roomAPI.createRoom(formData);
  // formData = { room_number: '106', capacity: 4, ... }
  setRooms([...rooms, response.data.data]);
};
```

---

## 🎯 Common Development Tasks

### Task 1: Add a New Field to Boarders

**Steps:**

1. **Database** - Add column:
   ```sql
   ALTER TABLE boarders ADD COLUMN guardian_name VARCHAR(255);
   ```

2. **Backend Controller** - Update create function:
   ```javascript
   const { first_name, guardian_name, ... } = req.body;
   ```

3. **Frontend Form** - Add input field:
   ```javascript
   <input type="text" name="guardian_name" placeholder="Guardian Name" />
   ```

### Task 2: Display Boarders in a Room

1. **Backend Route** (already exists):
   ```javascript
   router.get('/room/:roomId', boarderController.getBoardersByRoom);
   ```

2. **Frontend Page** - Create `RoomDetail.js`:
   ```javascript
   const boarders = await boarderAPI.getBoardersByRoom(roomId);
   ```

### Task 3: Calculate Total Revenue

1. **Backend Controller**:
   ```javascript
   const totalRevenue = rooms.reduce((sum, room) => sum + room.monthly_rent, 0);
   ```

2. **Frontend Dashboard**:
   ```javascript
   <DashboardCard title="Total Revenue" value={`₱${totalRevenue}`} />
   ```

---

## 🐛 Debugging Tips

### Check Backend is Running
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"Server is running"}
```

### Check Database Connection
```sql
psql -U postgres -d boarding_house_db
SELECT * FROM rooms;
```

### Check Frontend API Calls
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Perform action (click button)
4. See if API request appears and check response

### Check React State
```javascript
// Add console.log in component
useEffect(() => {
  console.log('Rooms data:', rooms);
}, [rooms]);
```

---

## 📝 Common Code Patterns

### Fetching Data in React
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await API.getData();
      setData(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
return <div>{/* render data */}</div>;
```

### Creating Data in Backend
```javascript
const create = async (req, res) => {
  try {
    const { field1, field2 } = req.body;
    const result = await pool.query(
      'INSERT INTO table (field1, field2) VALUES ($1, $2) RETURNING *',
      [field1, field2]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

### Updating Data
```javascript
router.put('/resource/:id', async (req, res) => {
  const { id } = req.params;
  const { field } = req.body;
  const result = await pool.query(
    'UPDATE table SET field = $1 WHERE id = $2 RETURNING *',
    [field, id]
  );
  res.json(result.rows[0]);
});
```

---

## 🚀 What to Build Next

### Easy Tasks (For Beginners):
1. ✅ Display rooms (done)
2. ⬜ Add form to create rooms
3. ⬜ Edit room details
4. ⬜ Delete room button
5. ⬜ Display boarders list

### Medium Tasks:
1. ⬜ Add new boarder form
2. ⬜ Assign boarder to room
3. ⬜ Display payments list
4. ⬜ Record payment form
5. ⬜ Overdue payment alerts

### Advanced Tasks:
1. ⬜ User login/authentication
2. ⬜ Multiple boarding houses
3. ⬜ Payment gateway integration
4. ⬜ Email notifications
5. ⬜ Advanced reports

---

## 📚 Useful Code References

### Get All Records
```javascript
// Backend
const getAll = async (req, res) => {
  const result = await pool.query('SELECT * FROM table');
  res.json({ success: true, data: result.rows });
};

// Frontend
const fetchAll = async () => {
  const response = await api.get('/resource');
  console.log(response.data.data);
};
```

### Get Single Record
```javascript
// Backend
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM table WHERE id = $1', [id]);
  res.json(result.rows[0]);
};

// Frontend
const fetchOne = async (id) => {
  const response = await api.get(`/resource/${id}`);
  return response.data.data;
};
```

### Delete Record
```javascript
// Backend
const delete = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM table WHERE id = $1 RETURNING *', [id]);
  res.json({ success: true, message: 'Deleted' });
};

// Frontend
const handleDelete = async (id) => {
  await api.delete(`/resource/${id}`);
  setData(data.filter(item => item.id !== id));
};
```

---

**Happy Coding! 🚀**  
Remember: Start small, build incrementally, test often!
