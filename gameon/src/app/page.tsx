import GameCard from '@/components/GameCard/GameCard';
import HeroSection from '@/components/HeroSection/HeroSection'
import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <HeroSection/>

    <section className={sectionClassNames.section}>
      <div className={sectionClassNames.trending}>
        <h2 className={sectionClassNames.trendingTitle}>
          Currently Trending Games
        </h2>
      </div>
      <div className="flex gap-8 flex-wrap">
          {games.map(game=> <GameCard
          key={game.id}
          gameName={game.name}
          imageUrl={game.image}
          slug={game.slug}
          price={game.price}
          /> )}
      </div>
    </section>
      <section className={sectionClassNames.featured}>
        <div className={sectionClassNames.featuredContent}>
          <h2 className={featuredClassNames.gameName}>{featuredGame.name} </h2>
          <p className={featuredClassNames.gameDetails}>
            {featuredGame.description}
          </p>
          <Link href={`/games/${featuredGame.slug}`}>
            
          </Link>
        </div>
      </section>
    </>
  )
}


const sectionClassNames = {
  section: "px-6 sm:px-12 md:px-20 lg:px-36 mx-auto py-8 text-white",
  trending: "flex flex-col sm:flex-row items-center justify-between mb-8",
  trendingTitle: "font-bold text-3xl sm:mr-4",
  trendingButton:
    "mt-4 sm:mt-0 px-6 py-2 rounded-md bg-primary hover:bg-primary-dark",
  latestButton:
    "mt-4 sm:mt-0 px-6 py-2 rounded-md bg-primary-gradient border-2 border-primary-dark",
  featured: "pb-24 px-6 sm:px-12 md:px-20 lg:px-36 text-white",
  featuredContent: "mx-auto max-w-screen-xl",
};


const games = [
  {
    id: 1,
    price: 12,
    name: "Call of Duty: Modern Warfare",
    slug: "call-of-duty",
    image:
      "https://images.unsplash.com/photo-1602673221577-0b56d7ce446b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Q2FsbCUyMG9mJTIwRHV0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    price: 14,
    name: "Assassin's Creed Valhalla",
    slug: "assassin-creed",
    image:
      "https://images.unsplash.com/photo-1586325194227-7625ed95172b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8QXNzYXNzaW4ncyUyMENyZWVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    price: 42,
    name: "FIFA 23",
    slug: "fifa-23",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxheSUyMHN0YXRpb24lMjBmaWZhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    price: 27,
    name: "The Legend of Zelda: Breath of the Wild",
    slug: "the-legend-of-zelda",
    image:
      "https://images.unsplash.com/photo-1500856056008-859079534e9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVnZW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

const featuredClassNames = {
  gameName: "font-bold text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-8",
  gameDetails: "max-w-screen-md text-sm mb-8 md:mb-12",
  gameImage: "h-72 md:h-96 lg:h-112 w-full object-cover rounded-lg",
};

const featuredGame = {
  name: "Eternal Domination",
  description:
    "Immerse yourself in a vast fantasy realm where epic battles and strategic conquests await. In 'Eternal Domination,' you'll lead armies, forge alliances, and build your empire from scratch. Command powerful heroes, employ cunning tactics, and unleash your might on the battlefield. Will you rise as the supreme ruler or fall beneath the weight of your ambitions? Join the fray and claim your destiny in this thrilling strategy game.",
  slug: "eternal-domination",
  image: "/images/trending.jpeg",
};