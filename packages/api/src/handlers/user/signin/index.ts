import { usersTable } from '@workspace/db';
import { db } from '@workspace/db/src/drizzle/db';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const signinSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body, "body")
    const { email, password } = signinSchema.parse(body);

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1)
      .then(users => users[0]);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password', success: false },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password', success: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors, success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to sign in', success: false },
      { status: 500 }
    );
  }
}