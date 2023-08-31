import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { createOrder, updateGameQuantity } from './../../../libs/apis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2023-08-16',
});

import sanityClient from '@/libs/Sanity';
import { Game, GameSubset } from '@/models/game';

export async function POST(req: Request, res: Response) {
	const { cartItems, userEmail } = await req.json();
	const origin = req.headers.get('origin');
    // console.log("here")
    // console.log(origin)
    // console.log(parseInt((item.price * 100).toString()))
	const updatedItems: GameSubset[] =
		(await fetchAndCalculateItemPricesAndQuantity(cartItems)) as GameSubset[];
    console.log(updatedItems)
	try {
		console.log("before sesson")
		const session = await stripe.checkout.sessions.create({
			line_items: updatedItems.map(item => {
                // console.log((item.price * 100).toString())
				// console.log(item.quantity,item.maxQuantity,item.name,item.image[0].url, parseInt((item.price * 100).toString()))
                return ({
				quantity: item.quantity,
				adjustable_quantity: {
					enabled: true,
					maximum: item.maxQuantity,
					minimum: 1,
				},
				price_data: {
					currency: 'usd',
					product_data: {
						name: item.name,
						images: [item.image[0].url],
					},
					unit_amount: parseInt((item.price * 100).toString()),
				},
			})}),
			payment_method_types: ['card'],
			billing_address_collection: 'required',
			mode: 'payment',
			success_url: `${origin}/?success=true`,
			phone_number_collection: { enabled: true },
		});
		console.log("after session")
		await updateGameQuantity(updatedItems);

		await createOrder(updatedItems, userEmail);
		
		return NextResponse.json(session, {
			status: 200,
			statusText: 'payment successful',
		});
	} catch (error: any) {
		console.log('ERROR==', error);
		return new NextResponse(error, { status: 500 });
	}
}

async function fetchAndCalculateItemPricesAndQuantity(cartItems: Game[]) {
	const query = `*[_type == "game" && _id in $itemIds] {
        _id,
        name,
        price,
        quantity,
        image
    }`;

	try {
		// Fetch items from sanity based on game IDS
		const itemIds = cartItems.map(item => item._id);
		const sanityItems: GameSubset[] = await sanityClient.fetch({
			query,
			params: { itemIds },
		});

		const updatedItems: GameSubset[] = sanityItems.map(item => ({
			...item,
			maxQuantity: item.quantity,
		}));

		// Check the quantity
		if (checkQuantitiesAgainstSanity(cartItems, updatedItems)) {
			return new NextResponse(
				'Quantiy has been updated, please update your cart',
				{ status: 500 }
			);
		}

		// calculate prices
		const calculatedItemPrices: GameSubset[] = updatedItems.map(item => {
			const cartItem = cartItems.find(cartItem => cartItem._id === item._id);

			return {
				_id: item._id,
				name: item.name,
				image: item.image,
				quantity: cartItem?.quantity as number,
				maxQuantity: item.quantity,
				price: item.price,
			};
		});

		return calculatedItemPrices;
	} catch (error) {
		return new NextResponse(
			'Quantiy has been updated, please update your cart',
			{ status: 500 }
		);
	}
}

function checkQuantitiesAgainstSanity(
	cartItems: Game[],
	sanityItems: GameSubset[]
) {
	for (let i = 0; i < cartItems.length; i++) {
		const cartItem = cartItems[i];
		const sanityItem = sanityItems[i];

		if (cartItem.quantity <= sanityItem.quantity) {
			return false;
		}
	}

	return true;
}
