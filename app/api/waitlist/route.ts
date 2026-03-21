import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Auto-create table on first request
let tableCreated = false;

async function ensureTable() {
  if (tableCreated) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      role VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  tableCreated = true;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, role } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    await ensureTable();

    await pool.query(
      'INSERT INTO waitlist (name, email, role) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET name = $1, role = $3',
      [name, email, role || null]
    );

    return NextResponse.json({ success: true, message: 'Added to waitlist' });
  } catch (error: any) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await ensureTable();
    const result = await pool.query('SELECT COUNT(*) as count FROM waitlist');
    return NextResponse.json({ count: parseInt(result.rows[0].count) });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
