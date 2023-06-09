import { Book } from '@/types/types';
import { getPages } from '@/lib/airtable';
import Paginated from '@/components/paginated';

export default function Page({ data, currentPage } : { data: {
  total: number,
  paginatedData: Array<Book>
}, currentPage:number}) {

  const {total, paginatedData} = data;
  console.log(currentPage);

  return (
    <section>
      <div className="container">
        { data ? (<Paginated paginatedData={paginatedData} currPage={currentPage} pageLimit={8} totalProducts={total}/>) : (<p>Error loading data</p>)}
      </div>
    </section>
  )
}

export async function getServerSideProps({ params }: { params: { page: number }}) {
  const pageNum = Number(params?.page) || 1;

  if (pageNum === 1) {
    return {
      redirect: {
        destination: "/view-products",
        permanent: false
      }
    }
  }

  try {
    const res = await getPages({
      baseLabel: "Product List",
      filter: "{Publish} = 1",
      pageLimit: 8,
      page: pageNum
    });
    const data = JSON.parse(JSON.stringify(res));
    return {
      props: {
        data,
        currentPage: pageNum
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
