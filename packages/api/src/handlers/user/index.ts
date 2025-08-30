import { usersTable } from '@workspace/db';
import { db } from '@workspace/db/src/drizzle/db';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid user ID', success: false },
        { status: 400 }
      );
    }

    const user = await db
      .select({ id: usersTable.id, name: usersTable.name, email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1)
      .then(users => users[0]);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ user, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get user', success: false },
      { status: 500 }
    );
  }
}