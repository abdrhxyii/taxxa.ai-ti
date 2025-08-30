import { NextRequest, NextResponse } from 'next/server';
import { db } from '@workspace/db/src/drizzle/db';
import { salesTable } from '@workspace/db/src/drizzle/schema/sales';
import { z } from 'zod';

const createSaleSchema = z.object({
  userId: z.number().int().positive('Invalid user ID'),
  productId: z.number().int().positive('Invalid product ID'),
  quantity: z.string().min(1, 'Quantity is required').max(255, 'Quantity too long'),
});

export async function POST(req: NextRequest) {
  console.log("api/sale ")
  try {
    const body = await req.json();
    const { userId, productId, quantity } = createSaleSchema.parse(body);
    console.log(userId, productId, quantity, "userId, productId, quantity")

    const newSale = await db
      .insert(salesTable)
      .values({ userId, productId, quantity })
      .returning();

    return NextResponse.json({
      sale: newSale[0],
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors, success: false }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create sale', success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sales = await db.select().from(salesTable);
    return NextResponse.json({
      sales,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sales', success: false }, { status: 500 });
  }
}