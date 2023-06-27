import { getPages } from '@/lib/airtable';
import { Book } from '@/types/types';

import Paginated from '@/components/paginated';


export default function Page({ data, currentPage } : { data: {
  total: number,
  paginatedData: Array<Book>
}, currentPage:number}) {

  const {total, paginatedData} = data;

  return (
    <section>
      <div className="container mx-auto">
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
