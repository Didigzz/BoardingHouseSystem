const Database = require('better-sqlite3');
const path = require('path');

// Create database file in backend folder
const dbPath = path.join(__dirname, '../../data/boarding_house.db');

// Ensure data directory exists
const fs = require('fs');
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize schema
const initSchema = () => {
  db.exec(`
    -- Create BoardingHouse table
    CREATE TABLE IF NOT EXISTS boarding_houses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT,
      owner_name TEXT,
      owner_contact TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create Room table
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      boarding_house_id INTEGER REFERENCES boarding_houses(id),
      room_number TEXT NOT NULL,
      capacity INTEGER NOT NULL DEFAULT 4,
      type TEXT DEFAULT 'SHARED',
      rental_mode TEXT DEFAULT 'BED_SPACER',
      monthly_rent REAL DEFAULT 2400,
      status TEXT DEFAULT 'AVAILABLE',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create Boarder table
    CREATE TABLE IF NOT EXISTS boarders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      boarding_house_id INTEGER REFERENCES boarding_houses(id),
      name TEXT NOT NULL,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      contact_number TEXT,
      phone TEXT,
      sex TEXT DEFAULT 'Male',
      id_type TEXT,
      id_number TEXT,
      move_in_date DATE,
      move_out_date DATE,
      contract_duration INTEGER DEFAULT 12,
      rental_type TEXT DEFAULT 'BED_SPACER',
      room_id INTEGER REFERENCES rooms(id),
      bed_id INTEGER,
      bed_spaces INTEGER DEFAULT 1,
      emergency_contact TEXT,
      status TEXT DEFAULT 'Active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create Payment table
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      boarder_id INTEGER NOT NULL REFERENCES boarders(id) ON DELETE CASCADE,
      payment_date DATE,
      due_date DATE NOT NULL,
      amount REAL NOT NULL,
      payment_type TEXT DEFAULT 'RENT',
      status TEXT DEFAULT 'PENDING',
      paid_amount REAL DEFAULT 0,
      payment_method TEXT,
      reference_number TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create Utility table
    CREATE TABLE IF NOT EXISTS utilities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      boarding_house_id INTEGER REFERENCES boarding_houses(id),
      type TEXT NOT NULL,
      billing_mode TEXT DEFAULT 'BUNDLED',
      monthly_rate REAL,
      unit_rate REAL,
      start_date DATE DEFAULT CURRENT_DATE,
      end_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Check if default data exists
  const boardingHouseCount = db.prepare('SELECT COUNT(*) as count FROM boarding_houses').get();
  
  if (boardingHouseCount.count === 0) {
    // Insert default boarding house
    const insertBH = db.prepare('INSERT INTO boarding_houses (name, location, owner_name, owner_contact) VALUES (?, ?, ?, ?)');
    const bhResult = insertBH.run('My Boarding House', 'Main Street', 'Owner', '09123456789');
    const bhId = bhResult.lastInsertRowid;

    // Insert 10 default rooms
    const insertRoom = db.prepare('INSERT INTO rooms (boarding_house_id, room_number, capacity, type, rental_mode, monthly_rent, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
    for (let i = 1; i <= 10; i++) {
      insertRoom.run(bhId, i.toString(), 4, 'SHARED', 'BED_SPACER', 2400, 'AVAILABLE');
    }

    console.log('✅ Default boarding house and 10 rooms created!');
  }
};

// Initialize on startup
initSchema();

// Wrapper to make SQLite work like pg Pool (for compatibility)
const pool = {
  query: async (text, params = []) => {
    try {
      // Convert $1, $2 style params to ? style
      let sqliteQuery = text.replace(/\$(\d+)/g, '?');
      
      const isSelect = sqliteQuery.trim().toUpperCase().startsWith('SELECT');
      const isInsert = sqliteQuery.trim().toUpperCase().startsWith('INSERT');
      const isUpdate = sqliteQuery.trim().toUpperCase().startsWith('UPDATE');
      const isDelete = sqliteQuery.trim().toUpperCase().startsWith('DELETE');

      if (isSelect) {
        const stmt = db.prepare(sqliteQuery);
        const rows = stmt.all(...params);
        return { rows, rowCount: rows.length };
      } else if (isInsert) {
        // Handle RETURNING clause for inserts
        if (sqliteQuery.toUpperCase().includes('RETURNING')) {
          sqliteQuery = sqliteQuery.replace(/\s+RETURNING\s+\*/i, '');
          const stmt = db.prepare(sqliteQuery);
          const result = stmt.run(...params);
          // Fetch the inserted row
          const tableName = sqliteQuery.match(/INSERT INTO\s+(\w+)/i)[1];
          const selectStmt = db.prepare(`SELECT * FROM ${tableName} WHERE id = ?`);
          const rows = [selectStmt.get(result.lastInsertRowid)];
          return { rows, rowCount: 1 };
        }
        const stmt = db.prepare(sqliteQuery);
        const result = stmt.run(...params);
        return { rows: [{ id: result.lastInsertRowid }], rowCount: result.changes };
      } else if (isUpdate || isDelete) {
        // Handle RETURNING clause for updates/deletes
        if (sqliteQuery.toUpperCase().includes('RETURNING')) {
          // Extract WHERE clause to get affected rows first
          const tableName = isUpdate 
            ? sqliteQuery.match(/UPDATE\s+(\w+)/i)[1]
            : sqliteQuery.match(/DELETE FROM\s+(\w+)/i)[1];
          const whereMatch = sqliteQuery.match(/WHERE\s+(.+?)(?:\s+RETURNING|$)/i);
          
          let rows = [];
          if (whereMatch) {
            const selectQuery = `SELECT * FROM ${tableName} WHERE ${whereMatch[1]}`;
            const selectStmt = db.prepare(selectQuery);
            rows = selectStmt.all(...params.slice(isUpdate ? -1 : 0));
          }
          
          sqliteQuery = sqliteQuery.replace(/\s+RETURNING\s+\*/i, '');
          const stmt = db.prepare(sqliteQuery);
          const result = stmt.run(...params);
          return { rows, rowCount: result.changes };
        }
        const stmt = db.prepare(sqliteQuery);
        const result = stmt.run(...params);
        return { rows: [], rowCount: result.changes };
      }
      
      // For other statements
      db.exec(sqliteQuery);
      return { rows: [], rowCount: 0 };
    } catch (err) {
      console.error('SQLite Error:', err.message, '\nQuery:', text, '\nParams:', params);
      throw err;
    }
  }
};

module.exports = pool;
