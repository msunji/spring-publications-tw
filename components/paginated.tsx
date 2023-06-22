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
      <div className="mb-8">
        <h1>全部商品</h1>
        <p>您正在瀏覽第 1-12 件 商品</p>
      </div>

      <ProductGrid productData={paginatedData} />
      <div className="text-left border-t border-base-200">
          <div className="join page-select mt-8">
            { Array.from({ length: totalPages }).map((_, i) => {
              return (
                <Link href={`/view-products/${i+1}`} key={i+1}>
                  <button key={i} className="btn bg-transparent border-1 border-base-200 rounded-none text-neutral text-lg join-item hover:text-white hover">{i+1}</button>
                </Link>
              )
            })}
          </div>
        </div>
    </div>
  )
}