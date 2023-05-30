import type { NextApiRequest, NextApiResponse } from 'next';
import { Book } from '@/types/types';
import { getBookId } from '@/lib/airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Book | { error: string }>
) {
  const { bookId } = req.query;
  const itemId = (typeof bookId === "string") ? bookId : "";

  try {
    const book:Book = await getBookId(itemId);
    res.status(200).json(book);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error.";
    res.json({ error: message });
  }
}
