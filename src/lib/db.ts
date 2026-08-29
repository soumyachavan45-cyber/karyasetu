import path from "path";
import fs from "fs";
import { SERVICE_CATEGORIES, MOCK_WORKERS, INITIAL_BOOKINGS } from "@/data/mockData";

// In-Memory fallback store for serverless/cloud environments (Vercel)
interface InMemStore {
  services: any[];
  workers: any[];
  bookings: any[];
  welfare_ledgers: any[];
  audit_logs: any[];
}

const memoryStore: InMemStore = {
  services: [...SERVICE_CATEGORIES.map((s) => ({ ...s, popularServices: JSON.stringify(s.popularServices) }))],
  workers: [
    ...MOCK_WORKERS.map((w) => ({
      ...w,
      lat: w.currentLocation.lat,
      lng: w.currentLocation.lng,
      area: w.currentLocation.area,
      verifiedAadhaar: w.verifiedAadhaar ? 1 : 0,
      verifiedNCD: w.verifiedNCD ? 1 : 0,
      hasSmartphone: w.hasSmartphone ? 1 : 0,
      skills: JSON.stringify(w.skills),
      languages: JSON.stringify(w.languages),
    })),
  ],
  bookings: [
    ...INITIAL_BOOKINGS.map((b) => ({
      ...b,
      assignedWorkerId: b.assignedWorker?.id || null,
      isOfflineWorker: b.isOfflineWorker ? 1 : 0,
    })),
  ],
  welfare_ledgers: [
    {
      id: 1,
      bookingId: "BK-9025",
      workerId: "w3",
      workerUan: "UAN-9921-5102-1134",
      amount: 126.0,
      schemeName: "Code on Social Security 2020 - PMSBY & Pension",
      status: "SETTLED",
      settledAt: new Date().toISOString(),
    },
  ],
  audit_logs: [
    {
      id: 1,
      eventType: "PLATFORM_INITIALIZED",
      description: "KaryaSetu database initialized with sovereign cooperative records.",
      payload: JSON.stringify({ version: "v1.0-NLCF" }),
      timestamp: new Date().toISOString(),
    },
  ],
};

let sqliteInstance: any = null;
let isSqliteAvailable = false;

// Attempt to load sqlite3 dynamically if native addon is present
try {
  const sqlite3 = require("sqlite3");
  // Choose writable path: /tmp in serverless, or ./data locally
  const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
  const baseDir = isVercel ? "/tmp" : path.join(process.cwd(), "data");

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const dbPath = path.join(baseDir, "sahakargig.db");
  sqliteInstance = new sqlite3.Database(dbPath);
  isSqliteAvailable = true;
} catch (err) {
  // If native sqlite3 fails (common in some serverless platforms), fallback to memory store
  isSqliteAvailable = false;
}

export const query = async <T = any>(sql: string, params: any[] = []): Promise<T[]> => {
  if (isSqliteAvailable && sqliteInstance) {
    return new Promise((resolve) => {
      sqliteInstance.all(sql, params, (err: any, rows: any[]) => {
        if (err || !rows) {
          resolve(fallbackQuery(sql, params));
        } else {
          resolve(rows as T[]);
        }
      });
    });
  }
  return fallbackQuery(sql, params);
};

export const run = async (sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> => {
  if (isSqliteAvailable && sqliteInstance) {
    return new Promise((resolve) => {
      sqliteInstance.run(sql, params, function (this: any, err: any) {
        if (err) {
          resolve(fallbackRun(sql, params));
        } else {
          resolve({ lastID: this?.lastID || 1, changes: this?.changes || 1 });
        }
      });
    });
  }
  return fallbackRun(sql, params);
};

// Resilient In-Memory SQL Simulator for cloud serverless
const fallbackQuery = (sql: string, params: any[] = []): any[] => {
  const lower = sql.toLowerCase();

  if (lower.includes("from services")) {
    if (params.length > 0 && params[0]) {
      return memoryStore.services.filter((s) => s.category === params[0]);
    }
    return memoryStore.services;
  }

  if (lower.includes("from workers")) {
    let result = [...memoryStore.workers];
    if (lower.includes("where id = ?") || lower.includes("workerid = ?")) {
      const id = params[0];
      return result.filter((w) => w.id === id || w.workerId === id);
    }
    return result;
  }

  if (lower.includes("from bookings")) {
    let result = [...memoryStore.bookings];
    if (lower.includes("where id = ?")) {
      return result.filter((b) => b.id === params[0]);
    }
    return result;
  }

  if (lower.includes("from welfare_ledgers")) {
    return memoryStore.welfare_ledgers;
  }

  if (lower.includes("from audit_logs")) {
    return memoryStore.audit_logs.slice(-10);
  }

  return [];
};

const fallbackRun = (sql: string, params: any[] = []): { lastID: number; changes: number } => {
  const lower = sql.toLowerCase();

  if (lower.includes("insert into bookings")) {
    const [
      id, customerName, customerPhone, serviceId, serviceName, category, area, city,
      lat, lng, timestamp, status, baseAmount, workerPayout, welfareLocker, adminFund,
      assignedWorkerId, otpCode, isOfflineWorker, notes,
    ] = params;

    memoryStore.bookings.unshift({
      id, customerName, customerPhone, serviceId, serviceName, category, area, city,
      lat, lng, timestamp, status, baseAmount, workerPayout, welfareLocker, adminFund,
      assignedWorkerId, otpCode, isOfflineWorker, notes,
    });
  } else if (lower.includes("update bookings")) {
    if (lower.includes("status = 'in_transit'")) {
      const workerId = params[0];
      const bookingId = params[1];
      const b = memoryStore.bookings.find((x) => x.id === bookingId);
      if (b) {
        b.status = "in_transit";
        b.assignedWorkerId = workerId;
      }
    } else if (lower.includes("status = 'otp_verified'")) {
      const bookingId = params[0];
      const b = memoryStore.bookings.find((x) => x.id === bookingId);
      if (b) b.status = "otp_verified";
    } else if (lower.includes("status = 'completed'")) {
      const bookingId = params[0];
      const b = memoryStore.bookings.find((x) => x.id === bookingId);
      if (b) b.status = "completed";
    }
  } else if (lower.includes("insert into welfare_ledgers")) {
    memoryStore.welfare_ledgers.unshift({
      id: memoryStore.welfare_ledgers.length + 1,
      bookingId: params[0],
      workerId: params[1],
      workerUan: params[2],
      amount: params[3],
      schemeName: params[4],
      status: params[5],
      settledAt: new Date().toISOString(),
    });
  } else if (lower.includes("insert into audit_logs")) {
    memoryStore.audit_logs.unshift({
      id: memoryStore.audit_logs.length + 1,
      eventType: params[0],
      description: params[1],
      payload: params[2],
      timestamp: new Date().toISOString(),
    });
  }

  return { lastID: Date.now(), changes: 1 };
};

export const initDatabase = async () => {
  if (!isSqliteAvailable || !sqliteInstance) return;

  try {
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

    await run(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eventType TEXT NOT NULL,
        description TEXT NOT NULL,
        payload TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const existingServices = await query("SELECT COUNT(*) as count FROM services");
    if ((existingServices[0] as any)?.count === 0) {
      await seedInitialData();
    }
  } catch (e) {}
};

export const seedInitialData = async () => {
  if (!isSqliteAvailable || !sqliteInstance) return;

  try {
    await run("DELETE FROM services");
    await run("DELETE FROM workers");
    await run("DELETE FROM bookings");

    for (const s of SERVICE_CATEGORIES) {
      await run(
        `INSERT INTO services (id, name, nameHi, nameMr, icon, description, descriptionHi, category, baseWage, unit, societiesCount, avgRating, completedJobs, popularServices, govWageStandard)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          s.id, s.name, s.nameHi, s.nameMr, s.icon, s.description, s.descriptionHi,
          s.category, s.baseWage, s.unit, s.societiesCount, s.avgRating, s.completedJobs,
          JSON.stringify(s.popularServices), s.govWageStandard,
        ]
      );
    }

    for (const w of MOCK_WORKERS) {
      await run(
        `INSERT INTO workers (id, workerId, name, nameHi, nameMr, photoUrl, phone, trade, tradeHi, tradeMr, rating, totalJobs, societyName, societyTier, verifiedAadhaar, verifiedNCD, eShramCardNo, status, lat, lng, area, todayEarnings, todayWelfareSaved, upiId, skills, languages, hasSmartphone)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          w.id, w.workerId, w.name, w.nameHi, w.nameMr, w.photoUrl, w.phone,
          w.trade, w.tradeHi, w.tradeMr, w.rating, w.totalJobs, w.societyName, w.societyTier,
          w.verifiedAadhaar ? 1 : 0, w.verifiedNCD ? 1 : 0, w.eShramCardNo, w.status,
          w.currentLocation.lat, w.currentLocation.lng, w.currentLocation.area,
          w.todayEarnings, w.todayWelfareSaved, w.upiId,
          JSON.stringify(w.skills), JSON.stringify(w.languages), w.hasSmartphone ? 1 : 0,
        ]
      );
    }
  } catch (e) {}
};
