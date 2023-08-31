"use client"

import GameDetailsClient from "@/components/GameDetails/GameDetailsClient";
import GameDetailsServer from "@/components/GameDetails/GameDetailsServer";
// import GameDetailsClient from "@/components/GameDetails/GameDetailsClient";
// import GameDetailsServer from "@/components/GameDetails/GameDetailsServer";
import {FaShoppingCart} from "react-icons/fa";
const GameItem =  (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;
  // console.log(props);


 
  return (
      <GameDetailsClient slug={slug}>
        <GameDetailsServer slug={slug}/>
      </GameDetailsClient>
  );
};

export default GameItem;



