import { usersTable } from '@workspace/db';
import { db } from '@workspace/db/src/drizzle/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

type User = {
  id?: number;
  name?: string;
  email?: string;
};

const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email').min(1, 'Email is required').optional(),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  console.log(params, "params ids")
  try {
    const { id: idParam } = await params;
    console.log(idParam, "idParam")
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid user ID', success: false },
        { status: 400 }
      );
    }

    const body = await req.json();
    const data = updateUserSchema.parse(body);

    if (data.email) {
      const existingUsers = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, data.email));

      if (existingUsers.length > 0 && existingUsers[0]?.id !== id) {
        return NextResponse.json(
          { error: 'Email already exists', success: false },
          { status: 400 }
        );
      }
    }

    const updateData: User = { ...data };

    const updatedUser = await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found', success: false },
        { status: 404 }
      );
    }

    console.log(updatedUser, "updatedUser PUT in the api")

    const user = updatedUser[0];
    if (!user) {
      return NextResponse.json(
        { error: 'User not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ user, success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors, success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update user', success: false },
      { status: 500 }
    );
  }
}