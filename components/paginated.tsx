import ProductGrid from './productGrid';
import { Book } from '@/types/types';
import Link from 'next/link';

type PaginatedProps = {
  paginatedData: Array<Book>,
  currPage: number,
  pageLimit: number,
  totalProducts: number,
}

export default function Paginated({ paginatedData, currPage, pageLimit, totalProducts } : PaginatedProps) {
  const totalPages = Math.ceil(totalProducts / pageLimit);

  return (
    <div>
      <ProductGrid productData={paginatedData} />
      <div className="text-center">
          <div className="join page-select">
            { Array.from({ length: totalPages }).map((_, i) => {
              return (
                <Link href={`/view-products/${i+1}`} key={i+1}>
                  <button key={i} className="join-item btn">{i+1}</button>
                </Link>
              )
            })}
          </div>
        </div>
    </div>
  )
}