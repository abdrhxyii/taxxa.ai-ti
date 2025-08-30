import { productsTable } from '@workspace/db';
import { db } from '@workspace/db/src/drizzle/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.string().min(1, 'Price is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, price } = createProductSchema.parse(body);

    const newProduct = await db
      .insert(productsTable)
      .values({ title, price })
      .returning();

    return NextResponse.json(
      { product: newProduct[0], success: true },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors, success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create product', success: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await db.select().from(productsTable);

    return NextResponse.json({ products, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products', success: false },
      { status: 500 }
    );
  }
}
