// src/app/api/login/route.js
import { clientPromise } from '../config/database';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const client = await clientPromise;
    const db = client.db('new_project_db');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ username });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }

    const token = user.username; // For simplicity, use the username as the token
    return NextResponse.json({ success: true, message: 'Login successful', token }, { status: 200 });
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
