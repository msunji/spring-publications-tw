import type { NextApiRequest, NextApiResponse } from "next";
const sgMail = require("@sendgrid/mail");
import { CartItemType, OrderData } from '@/types/types';
import { postOrder } from '@/lib/airtable';

type ResponseData = {
  data: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  sgMail.setApiKey(process.env.SENDGRID_API);
  const { fullName, email, mobile, pickup, orderId, cartDetails, total } = req.body;

  const data = {
    fullName,
    email,
    mobile,
    pickup,
    orderId,
    cartDetails,
    total
  }

  console.log(data);

  const msg = {
    from: "mae.sunji@gmail.com",
    text: "Thank you for ordering from Spring Books Taiwan!",
    template_id: "d-8eb9a55a89e54d4eb8da1957044f3c86",
    html: "<p>Thank you for ordering from Spring Books Taiwan</p>",
    to: data.email,
    bcc: ["xiaolu500@gmail.com", "spring1902@yahoo.com"],
    dynamic_template_data: {
      data: data
    },
  }

  try {
    if(!fullName || !email || !cartDetails) {
      return res.status(400).json({
        data: "Customer details and cart details seem to be empty."
      })
    }
    await sgMail.send(msg);
    await postOrder(data);
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch data" });
  }

}