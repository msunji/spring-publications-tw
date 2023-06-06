const Airtable = require("airtable");
import { Thumbnail, Book } from '@/types/types';

function initAirtable() {
  const base = new Airtable({ apiKey:process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE_ID);
  return base;
}

function getFieldData(record:any = {}) {
  const id:string = record.getId();
  const title:string = record.get("Title");
  const author:string = record.get("Author");
  const thumbnail:Array<Thumbnail> = record.get("Thumbnail");
  const price:number = record.get("Price");
  const desc:string = record.get("Description");

  const book:Book = {
    id,
    title,
    author,
    thumbnail,
    price,
    desc
  };

  return book;
}

export function getBooks(baseName:string, filterName:string) {
  const base = initAirtable();
  const inventory:Array<any> = [];
  return new Promise<Array<any>>((resolve, reject) => {
    base(baseName)
      .select({
        fields: ["Title", "Author", "Thumbnail", "Price", "Description"],
        filterByFormula: filterName,
      })
      .eachPage(
        function page(records:Array<any>, fetchNextPage: () =>{}) {
          records.forEach((record:any = {}) => {
            const book = getFieldData(record);
            inventory.push(book);
          });
          fetchNextPage();
        }, function done(err:string) {
          if (err) {
            console.error(err);
            return;
          }
          return resolve(inventory);
      });
  });
}

export function getBookId(id:string) {
  const base = initAirtable();
  return new Promise<Book>((resolve, reject) => {
    base("Product List")
      .find(id, function(err:string, record: any = {}) {
        if (err) {
          console.error(err);
          return;
        }
        const book = getFieldData(record);
        return resolve(book);
      })
  })
}
