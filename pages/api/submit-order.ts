import type { NextApiRequest, NextApiResponse } from "next";
const sgMail = require("@sendgrid/mail");
import { postOrder } from '@/lib/airtable';

type ResponseData = {
  data: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  sgMail.setApiKey(process.env.SENDGRID_API);
  console.log(req.body);

  const data = req.body;

  const msg = {
    from: "mae.sunji@gmail.com",
    text: "Thank you for ordering from Spring Books Taiwan!",
    template_id: "d-8eb9a55a89e54d4eb8da1957044f3c86",
    html: "<p>Thank you for ordering from Spring Books Taiwan</p>",
    to: data.email,
    bcc:["mae.sunji@gmail.com"],
    dynamic_template_data: {
      data: data
    },
  }

  try {
    if(!data.fullName || !data.email || !data.mobile || !data.pickup|| !data.cartDetails) {
      return res.status(400).json({
        data: "Customer details and cart details seem to be empty."
      })
    }
    await sgMail.send(msg);
    await postOrder(data);
    res.status(200).json({ data: "Firing correctly" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Failed to fetch data" });
  }

}