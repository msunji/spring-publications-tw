import Thumbnail from './thumbnail';
import { Book } from '@/types/types';

type ProductProps = {
  productData: Array<Book>
}

export default function ProductGrid({ productData } : ProductProps) {
  return (
    <div className="product-grid grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-8 mb-10">
      {productData.map((book:Book) => <Thumbnail key={book.id} {...book} />)}
    </div>
  )
}