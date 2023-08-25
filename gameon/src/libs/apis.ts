import { Category } from "@/models/category";
import sanityClient from "./Sanity";
import { Game } from "@/models/game";

export const getCategories = async (): Promise<Category[]> => {
    const query = `*[_type == "category"]{
        _id,
        name,
        slug {current},
        image,
        subtitle
    }`

    const categories: Category[] = await sanityClient.fetch({query});
    return categories;
}

export const getGames = async (): Promise<Game[]> => {
	const query = `*[_type == "game"] {
        name,
        price,
        image,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0] {
          name,
          slug {
            current
          }
        },
        slug,
        quantity,
        description
      }`;

	const games: Game[] = await sanityClient.fetch({ query });

	return games;
};

export const getCategoryGames = async (slug: string): Promise<Game[]> => {
  const query = `*[_type == "game" && category-> slug.current == "${slug}"]{
    name,
    price,
    image,
    isFeatured,
    isTrending,
    slug,
    quantity,
    description,
     category -> {
      name,
      subtitle
     }
  }`
  const games : Game[] = await sanityClient.fetch({query});
  return games

} 

export const getCategory = async (slug: string): Promise<Category> => {
  const query = `*[_type=="category" && slug.current=="${slug}"][0]`
  const category: Category = await sanityClient.fetch({query});
  return category;
}


export const getRecentGame = async (): Promise<Game[]> => {
	const query = `*[_type == "game"] | order(_createdAt desc)[0...4]  {
        name,
        price,
        image,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0] {
          name,
          slug {
            current
          }
        },
        slug,
        quantity,
        description
      }`;
      const games : Game[] = await sanityClient.fetch({query});
      return games
    
    } 
