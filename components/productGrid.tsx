import Thumbnail from './thumbnail';
import { Book } from '@/types/types';

type ProductProps = {
  productData: Array<Book>
}

export default function ProductGrid({ productData } : ProductProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
      {productData.map((book:Book) => <Thumbnail key={book.id} {...book} />)}
    </div>
  )
}