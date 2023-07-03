const Airtable = require("airtable");
import { Book, HeroType, OrderData } from '@/types/types';

function initAirtable() {
  const base = new Airtable({ apiKey:process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE_ID);
  return base;
}

function getFieldData(record:any = {}) {
  const id:string = record.getId();
  const title:string = record.get("Title");
  const author:string = record.get("Author");
  const quantity:number = record.get("Quantity");
  const thumbnail:string = record.get("CloudinaryUrl");
  const price:number = record.get("Price");
  const desc:string = record.get("Description");

  const book:Book = {
    id,
    title,
    author,
    quantity,
    thumbnail,
    price,
    desc
  };

  return book;
}

export function getBooks(baseName:string, filterName:string, maxBooks:number) {
  const base = initAirtable();
  const inventory:Array<any> = [];

  return new Promise<Array<any>>((resolve, reject) => {
    base(baseName)
      .select({
        maxRecords: maxBooks,
        fields: ["Title", "Author", "Quantity", "CloudinaryUrl", "Price", "Description"],
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

type pagesParams = {
  baseLabel: string,
  filter: string,
  pageLimit: number,
  page: number
}

export function getPages(pagesParams : pagesParams) {
  const { baseLabel, filter, pageLimit, page} = pagesParams;

  const base = initAirtable();
  const inventory:Array<{}> = [];

  return new Promise<{}>((resolve, reject) => {
    base(baseLabel)
      .select({
        fields: ["Title", "Author", "Quantity", "CloudinaryUrl", "Price", "Description"],
        filterByFormula: filter,
      })
      .eachPage(
        function page(records:Array<{}>, fetchNextPage: () =>{}) {
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
          const startIdx = (page - 1) * pageLimit;
          const paginatedInventory = inventory.slice(startIdx, startIdx + pageLimit)

          return resolve({
            total: inventory.length,
            paginatedData: paginatedInventory
          })
      });
  });
}

export function getHero() {
  const base = initAirtable();
  let heroData:HeroType;

  return new Promise<{}>((resolve, reject) => {
    base("Hero")
      .select({
        maxRecords: 1,
        fields: ["Header","Subtitle", "CloudinaryUrl", "Link"]
      })
      .eachPage(
        function page(records:Array<{}>, fetchNextPage: () =>{}) {
          records.forEach((record:any = {}) => {
            const id:string = record.getId();
            const header:string = record.get("Header");
            const subtitle:string = record.get("Subtitle");
            const image:string = record.get("CloudinaryUrl");
            const link:string = record.get("Link");

            heroData = {
              id,
              header,
              subtitle,
              image,
              link
            }
          });
          fetchNextPage();
        }, function done(err:string) {
          if (err) {
            console.error(err);
            return;
          }
          return resolve(heroData)
      });
  });
}

export function postOrder(orderData:OrderData) {
  const base = initAirtable();
  const { fullName, email, mobile, pickup, orderId, cartDetails, total, totalItems } = orderData;

  const orderDetailText = cartDetails.map((cartItem) => ` - **${cartItem.title}** — x${cartItem.quantity}\n`).join("");

  return new Promise<{}>((resolve, reject) => {
    base('Orders').create({
      "Name": fullName,
      "Mobile": mobile,
      "Email": email,
      "Pickup": pickup,
      "Order ID": orderId,
      "Total Cost": total,
      "Total Items": totalItems,
      "Status": "Received Order",
      "Order Details": orderDetailText,
      "Product IDs": [
        ...cartDetails.map(product => product.id)
      ]
    }, function(err: string) {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve("New record added");
    });
  })
}


