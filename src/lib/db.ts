import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";
import { SERVICE_CATEGORIES, MOCK_WORKERS, INITIAL_BOOKINGS } from "@/data/mockData";

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "sahakargig.db");

// Initialize SQLite database instance
const db = new sqlite3.Database(DB_PATH);

// Helper for running queries with Promises
export const query = <T = any>(sql: string, params: any[] = []): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as T[]);
    });
  });
};

export const run = (sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

// Database schema initialization
export const initDatabase = async () => {
  // 1. Services Table
  await run(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      nameHi TEXT NOT NULL,
      nameMr TEXT NOT NULL,
      icon TEXT NOT NULL,
      description TEXT NOT NULL,
      descriptionHi TEXT NOT NULL,
      category TEXT NOT NULL,
      baseWage REAL NOT NULL,
      unit TEXT NOT NULL,
      societiesCount INTEGER NOT NULL,
      avgRating REAL NOT NULL,
      completedJobs INTEGER NOT NULL,
      popularServices TEXT NOT NULL,
      govWageStandard TEXT NOT NULL
    )
  `);

  // 2. Workers Table
  await run(`
    CREATE TABLE IF NOT EXISTS workers (
      id TEXT PRIMARY KEY,
      workerId TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      nameHi TEXT NOT NULL,
      nameMr TEXT NOT NULL,
      photoUrl TEXT NOT NULL,
      phone TEXT NOT NULL,
      trade TEXT NOT NULL,
      tradeHi TEXT NOT NULL,
      tradeMr TEXT NOT NULL,
      rating REAL NOT NULL,
      totalJobs INTEGER NOT NULL,
      societyName TEXT NOT NULL,
      societyTier TEXT NOT NULL,
      verifiedAadhaar INTEGER NOT NULL,
      verifiedNCD INTEGER NOT NULL,
      eShramCardNo TEXT NOT NULL,
      status TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      area TEXT NOT NULL,
      todayEarnings REAL NOT NULL,
      todayWelfareSaved REAL NOT NULL,
      upiId TEXT NOT NULL,
      skills TEXT NOT NULL,
      languages TEXT NOT NULL,
      hasSmartphone INTEGER NOT NULL
    )
  `);

  // 3. Bookings Table
  await run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      customerPhone TEXT NOT NULL,
      serviceId TEXT NOT NULL,
      serviceName TEXT NOT NULL,
      category TEXT NOT NULL,
      area TEXT NOT NULL,
      city TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      timestamp TEXT NOT NULL,
      status TEXT NOT NULL,
      baseAmount REAL NOT NULL,
      workerPayout REAL NOT NULL,
      welfareLocker REAL NOT NULL,
      adminFund REAL NOT NULL,
      assignedWorkerId TEXT,
      otpCode TEXT NOT NULL,
      isOfflineWorker INTEGER NOT NULL,
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 4. Welfare Ledger (e-Shram Social Security Trust)
  await run(`
    CREATE TABLE IF NOT EXISTS welfare_ledgers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bookingId TEXT NOT NULL,
      workerId TEXT NOT NULL,
      workerUan TEXT NOT NULL,
      amount REAL NOT NULL,
      schemeName TEXT NOT NULL,
      status TEXT NOT NULL,
      settledAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 5. Audit Logs Table (For cooperative transparency)
  await run(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventType TEXT NOT NULL,
      description TEXT NOT NULL,
      payload TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed default data if empty
  const existingServices = await query("SELECT COUNT(*) as count FROM services");
  if ((existingServices[0] as any).count === 0) {
    await seedInitialData();
  }
};

export const seedInitialData = async () => {
  // Clear existing
  await run("DELETE FROM services");
  await run("DELETE FROM workers");
  await run("DELETE FROM bookings");

  // Insert Services
  for (const s of SERVICE_CATEGORIES) {
    await run(
      `INSERT INTO services (id, name, nameHi, nameMr, icon, description, descriptionHi, category, baseWage, unit, societiesCount, avgRating, completedJobs, popularServices, govWageStandard)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        s.id,
        s.name,
        s.nameHi,
        s.nameMr,
        s.icon,
        s.description,
        s.descriptionHi,
        s.category,
        s.baseWage,
        s.unit,
        s.societiesCount,
        s.avgRating,
        s.completedJobs,
        JSON.stringify(s.popularServices),
        s.govWageStandard,
      ]
    );
  }

  // Insert Workers
  for (const w of MOCK_WORKERS) {
    await run(
      `INSERT INTO workers (id, workerId, name, nameHi, nameMr, photoUrl, phone, trade, tradeHi, tradeMr, rating, totalJobs, societyName, societyTier, verifiedAadhaar, verifiedNCD, eShramCardNo, status, lat, lng, area, todayEarnings, todayWelfareSaved, upiId, skills, languages, hasSmartphone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        w.id,
        w.workerId,
        w.name,
        w.nameHi,
        w.nameMr,
        w.photoUrl,
        w.phone,
        w.trade,
        w.tradeHi,
        w.tradeMr,
        w.rating,
        w.totalJobs,
        w.societyName,
        w.societyTier,
        w.verifiedAadhaar ? 1 : 0,
        w.verifiedNCD ? 1 : 0,
        w.eShramCardNo,
        w.status,
        w.currentLocation.lat,
        w.currentLocation.lng,
        w.currentLocation.area,
        w.todayEarnings,
        w.todayWelfareSaved,
        w.upiId,
        JSON.stringify(w.skills),
        JSON.stringify(w.languages),
        w.hasSmartphone ? 1 : 0,
      ]
    );
  }

  // Insert Bookings
  for (const b of INITIAL_BOOKINGS) {
    await run(
      `INSERT INTO bookings (id, customerName, customerPhone, serviceId, serviceName, category, area, city, lat, lng, timestamp, status, baseAmount, workerPayout, welfareLocker, adminFund, assignedWorkerId, otpCode, isOfflineWorker, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        b.id,
        b.customerName,
        b.customerPhone,
        b.serviceId,
        b.serviceName,
        b.category,
        b.area,
        b.city,
        b.lat,
        b.lng,
        b.timestamp,
        b.status,
        b.baseAmount,
        b.workerPayout,
        b.welfareLocker,
        b.adminFund,
        b.assignedWorker ? b.assignedWorker.id : null,
        b.otpCode,
        b.isOfflineWorker ? 1 : 0,
        b.notes || null,
      ]
    );

    // If completed, record welfare ledger
    if (b.status === "completed" && b.assignedWorker) {
      await run(
        `INSERT INTO welfare_ledgers (bookingId, workerId, workerUan, amount, schemeName, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          b.id,
          b.assignedWorker.id,
          b.assignedWorker.eShramCardNo,
          b.welfareLocker,
          "Code on Social Security 2020 - PMSBY & Pension",
          "SETTLED",
        ]
      );
    }
  }

  // Log Audit Event
  await run(
    `INSERT INTO audit_logs (eventType, description, payload) VALUES (?, ?, ?)`,
    [
      "DATABASE_SEEDED",
      "Initial seed data for SahakarGig platform loaded successfully",
      JSON.stringify({ servicesCount: SERVICE_CATEGORIES.length, workersCount: MOCK_WORKERS.length, bookingsCount: INITIAL_BOOKINGS.length }),
    ]
  );
};

// Database helper functions
export const getDatabase = async () => {
  await initDatabase();
  return db;
};
