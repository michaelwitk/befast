import { headers } from 'next/headers'
// import Stripe from 'stripe'

export const GET = async (req) => {
  console.log(await req.json())
  console.log(headers())

  // const stripe = new Stripe(process.env.STRIPE_KEY)
  // const customer = await stripe.customers.create({
  //   email: 'customer@example.com',
  // })
  // console.log(customer.id)

  return Response.json({})
}
