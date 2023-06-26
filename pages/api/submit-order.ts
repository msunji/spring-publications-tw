import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fullName, email, orderId, cartDetails, total } = req.body;
  console.log("body: ", fullName, email, orderId, cartDetails, total);
  try {
    if(!fullName || !email || !cartDetails) {
      return res.status(400).json({
        data: "Customer details and cart details seem to be empty."
      })
    }
    // res.status(200).json({ data: { fullName, email, orderId, cartDetails, total } });
    res.redirect(307, "/thankyou");
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch data" });
  }

}