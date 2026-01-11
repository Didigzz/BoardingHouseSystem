-- Boarding House Management System Database Schema
-- PostgreSQL

-- Create BoardingHouse table
CREATE TABLE IF NOT EXISTS boarding_houses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  owner_name VARCHAR(255),
  owner_contact VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Room table
CREATE TABLE IF NOT EXISTS rooms (
  id SERIAL PRIMARY KEY,
  boarding_house_id INTEGER REFERENCES boarding_houses(id),
  room_number VARCHAR(50) NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 4,
  type VARCHAR(50) NOT NULL, -- PRIVATE or SHARED
  rental_mode VARCHAR(50) NOT NULL, -- WHOLE_ROOM, BED_SPACER, FLEXIBLE
  monthly_rent DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE', -- AVAILABLE, PARTIALLY_OCCUPIED, FULLY_OCCUPIED
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(boarding_house_id, room_number)
);

-- Create Bed table
CREATE TABLE IF NOT EXISTS beds (
  id SERIAL PRIMARY KEY,
  room_id INTEGER NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  bed_number INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE', -- AVAILABLE or OCCUPIED
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(room_id, bed_number)
);

-- Create Boarder table
CREATE TABLE IF NOT EXISTS boarders (
  id SERIAL PRIMARY KEY,
  boarding_house_id INTEGER REFERENCES boarding_houses(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  id_type VARCHAR(50), -- VALID_ID, PASSPORT, etc
  id_number VARCHAR(100) UNIQUE,
  move_in_date DATE NOT NULL,
  move_out_date DATE,
  contract_duration INTEGER NOT NULL, -- in months
  rental_type VARCHAR(50) NOT NULL, -- WHOLE_ROOM or BED_SPACER
  room_id INTEGER REFERENCES rooms(id),
  bed_id INTEGER REFERENCES beds(id),
  emergency_contact VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, MOVE_OUT_NOTICE, MOVED_OUT
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Payment table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  boarder_id INTEGER NOT NULL REFERENCES boarders(id) ON DELETE CASCADE,
  payment_date DATE,
  due_date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_type VARCHAR(50) NOT NULL, -- RENT, UTILITY, SECURITY_DEPOSIT
  status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PAID, PENDING, OVERDUE, PARTIAL
  paid_amount DECIMAL(10, 2),
  payment_method VARCHAR(50), -- CASH, BANK_TRANSFER, ONLINE, CHEQUE
  reference_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Utility table
CREATE TABLE IF NOT EXISTS utilities (
  id SERIAL PRIMARY KEY,
  boarding_house_id INTEGER REFERENCES boarding_houses(id),
  type VARCHAR(50) NOT NULL, -- ELECTRICITY, WATER, WIFI
  billing_mode VARCHAR(50) NOT NULL, -- BUNDLED or METERED
  monthly_rate DECIMAL(10, 2), -- if BUNDLED
  unit_rate DECIMAL(10, 2), -- if METERED
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create UtilityBill table
CREATE TABLE IF NOT EXISTS utility_bills (
  id SERIAL PRIMARY KEY,
  utility_id INTEGER NOT NULL REFERENCES utilities(id),
  billing_period VARCHAR(50), -- e.g., "2024-01"
  total_usage DECIMAL(10, 2),
  total_amount DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create BillingRecord table
CREATE TABLE IF NOT EXISTS billing_records (
  id SERIAL PRIMARY KEY,
  boarder_id INTEGER NOT NULL REFERENCES boarders(id) ON DELETE CASCADE,
  billing_month VARCHAR(50) NOT NULL, -- e.g., "2024-01"
  rent_amount DECIMAL(10, 2) NOT NULL,
  utility_amount DECIMAL(10, 2) DEFAULT 0,
  other_charges DECIMAL(10, 2) DEFAULT 0,
  total_due DECIMAL(10, 2) NOT NULL,
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  due_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PAID, PENDING, OVERDUE
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(boarder_id, billing_month)
);

-- Create indexes for better performance
CREATE INDEX idx_rooms_boarding_house ON rooms(boarding_house_id);
CREATE INDEX idx_boarders_room ON boarders(room_id);
CREATE INDEX idx_boarders_boarding_house ON boarders(boarding_house_id);
CREATE INDEX idx_payments_boarder ON payments(boarder_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_billing_records_boarder ON billing_records(boarder_id);
CREATE INDEX idx_billing_records_status ON billing_records(status);
CREATE INDEX idx_utilities_boarding_house ON utilities(boarding_house_id);

-- Insert sample data (optional)
INSERT INTO boarding_houses (name, location, owner_name, owner_contact)
VALUES ('Sample Boarding House', 'Manila', 'Juan Dela Cruz', '09123456789')
ON CONFLICT DO NOTHING;

INSERT INTO rooms (boarding_house_id, room_number, capacity, type, rental_mode, monthly_rent)
VALUES 
  (1, '1', 4, 'SHARED', 'BED_SPACER', 2400.00),
  (1, '2', 4, 'SHARED', 'BED_SPACER', 2400.00),
  (1, '3', 4, 'SHARED', 'BED_SPACER', 2400.00),
  (1, '4', 4, 'SHARED', 'BED_SPACER', 2400.00),
  (1, '5', 4, 'SHARED', 'BED_SPACER', 2400.00),
  (1, '6', 4, 'SHARED', 'BED_SPACER', 2400.00),
  (1, '7', 4, 'SHARED', 'BED_SPACER', 2400.00),
  (1, '8', 4, 'SHARED', 'BED_SPACER', 2400.00),
  (1, '9', 4, 'SHARED', 'BED_SPACER', 2400.00),
  (1, '10', 4, 'SHARED', 'BED_SPACER', 2400.00)
ON CONFLICT DO NOTHING;

-- Insert beds for each room
INSERT INTO beds (room_id, bed_number)
SELECT id, generate_series(1, capacity) FROM rooms
ON CONFLICT DO NOTHING;

INSERT INTO utilities (boarding_house_id, type, billing_mode, monthly_rate)
VALUES 
  (1, 'ELECTRICITY', 'BUNDLED', 500.00),
  (1, 'WATER', 'BUNDLED', 200.00),
  (1, 'WIFI', 'BUNDLED', 300.00)
ON CONFLICT DO NOTHING;

-- Verify tables
-- SELECT * FROM boarding_houses;
-- SELECT * FROM rooms;
-- SELECT * FROM boarders;
-- SELECT * FROM payments;
-- SELECT * FROM utilities;
