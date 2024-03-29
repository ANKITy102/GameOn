export interface Game {
	_id: string;
	name: string;
	price: number;
	image: Array<{
		_key: string;
		url: string;
	}>;
	isFeatured: boolean;
	isTrending: boolean;
	category: { name: string; slug: { current: string }, subtitle?:string };
	slug: { current: string };
	quantity: number;
	description: string;
}


export type GameSubset = Pick<
	Game,
	'_id' | 'price' | 'quantity' | 'image' | 'name'
> & { maxQuantity: number };