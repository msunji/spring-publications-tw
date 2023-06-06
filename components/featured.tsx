import { Book } from '@/types/types';
import Image from 'next/image';

type FeaturedProps = {
  featuredList:Array<Book>
}

const FeaturedThumbnail = ({...props}:Book) => {
  console.log(props);
  const { id, title } = props;

  let thumbnailSrc;

  if (props.thumbnail && typeof Array.isArray(props.thumbnail)) {
    thumbnailSrc = props.thumbnail[0].thumbnails.large.url;
  } else {
    thumbnailSrc = "/images/PlaceholderCover.jpg";
  }

  return (
    <div key={id} className="carousel-item">
      <Image
        src={thumbnailSrc}
        width={150}
        height={250}
        alt={`Cover for ${title}`} />
    </div>
  )
}

export default function Featured ({ featuredList }: FeaturedProps) {

  return(
    <section className="full-bleed-section-yellow">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between gap-5 align-center">
          <h1 className="text-4xl md:text-8xl">Featured<br />Books</h1>
          <div>
            <div className="grid grid-cols-2 grid-row-2 gap-5">
              { featuredList.map((featuredBook, index) => (
                <FeaturedThumbnail key={featuredBook.id} {...featuredBook} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}