import { getPages } from '@/lib/airtable';
import { Book } from '@/types/types';
import Link from 'next/link';
import Paginated from '@/components/paginated';


export default function Page({ data, currentPage } : { data: {
  total: number,
  paginatedData: Array<Book>
}, currentPage:number}) {

  const {total, paginatedData} = data;
  // const [currPage, setCurrPage] = useState(1);
  // const maxProducts = 8;
  // const numProducts = data.length;
  // const numPages = Math.ceil(numProducts / maxProducts);

  // const onSetPage = (pageNum:number) => {
  //   setCurrPage(pageNum);
  // }

  // const paginateData = (dataArr:Array<Book>, currPageNum:number, pageLimit:number) => {
  //   if (dataArr.length === 0) return [];
  //   const startIdx = (currPageNum - 1) * pageLimit;
  //   return dataArr.slice(startIdx, startIdx + pageLimit)
  // }

  return (
    <section>
      <div className="container mx-auto">
        <h1>全部商品</h1>
        <div>
          { data ? (<Paginated paginatedData={paginatedData} currPage={currentPage} pageLimit={8} totalProducts={total}/>): (<p>Error Loading Data</p>) }
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps() {
  try {
    const res = await getPages({
      baseLabel: "Product List",
      filter: "{Publish} = 1",
      pageLimit: 8,
      page: 1
    });
    const data = JSON.parse(JSON.stringify(res));
    return {
      props: {
        data,
        currentPage: 1
      }
    }
  } catch (err) {
    return {
      props: {
        err: "Something went wrong"
      }
    }
  }
}
