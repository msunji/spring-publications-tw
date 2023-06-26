import type { NextApiRequest, NextApiResponse } from "next";
const sgMail = require("@sendgrid/mail");
import { CartItemType } from '@/types/types';

type ResponseData = {
  data: string
}

type OrderData = {
  data: {
    fullName: string,
    email: string,
    orderId: string,
    cartDetails: Array<CartItemType>,
    total: number
  }
}

function sendMail(orderData : OrderData) {
  sgMail.setApiKey(process.env.SENDGRID_API);
  const { data } = orderData;
  const msg = {
    from: "mae.sunji@gmail.com",
    text: "Thank you for ordering from Spring Books Taiwan!",
    template_id: "d-8eb9a55a89e54d4eb8da1957044f3c86",
    html: "<p>Thank you for ordering from Spring Books Taiwan</p>",
    dynamic_template_data: {
      data: data
    },
    personalizations: [
      {
        subject: "Spring Books Order Confirmation",
        to: [
          {
            email: data.email
          }
        ],
        bcc: [
          {
            email: "mae.sunji@gmail.com"
          }
        ]
      }
    ]
  }
  sgMail
    .send(msg)
    .then((res:NextApiResponse) => {
      console.log("Message sent")
    })
    .catch((err:any) => {
      console.log(err)
    })
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fullName, email, orderId, cartDetails, total } = req.body;

  try {
    if(!fullName || !email || !cartDetails) {
      return res.status(400).json({
        data: "Customer details and cart details seem to be empty."
      })
    }
    sendMail({ data: { fullName, email, orderId, cartDetails, total } });
    res.status(200).json({ data: { fullName, email, orderId, cartDetails, total } });
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch data" });
  }

}