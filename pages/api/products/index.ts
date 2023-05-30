import type { NextApiRequest, NextApiResponse } from 'next';
import { Book } from '@/types/types';
import { getBooks } from '@/lib/airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Book>>
) {
  const books = await getBooks();
  res.status(200).json(books);
}
