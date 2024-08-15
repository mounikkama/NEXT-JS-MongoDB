import { clientPromise } from '../config/database';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password, firstName, lastName } = body;

    if (!username || !email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('new_project_db');
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    });

    if (result.acknowledged) {
      return NextResponse.json({ message: 'User registered successfully', user: result.insertedId }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'User registration failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
