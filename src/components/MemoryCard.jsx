import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import data from "../data";
import images from "../images";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const MemoryCard = ({ setHasWon }) => {
  console.log(data);

  //   console.log(data[3].image);

  //   const randomNumber = Math.floor(Math.random() * data.length);
  //   console.log(randomNumber);
  //   const randomIndex = data[randomNumber];
  //   console.log(randomIndex);

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); // holds ID's of flipped cards
  const [matched, setMatched] = useState([]); // holds ID's of matched cards
  const [disabled, setDisabled] = useState(false); // to lock flipping while checking for matches

  //! for confetti to fall down to the end of the screen on a phone
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: document.documentElement.scrollHeight,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const doubled = [...data, ...data]; // to get 2 of each
    const shuffled = shuffleArray(
      doubled.map((card, index) => ({
        ...card,
        id: index, // we will need for unique keys
      }))
    );
    setCards(shuffled);
  }, []);

  function handleFlipCard(card) {
    if (disabled || flipped.includes(card.id) || matched.includes(card.id))
      return; // prevent flipping if disabled or already flipped

    const newFlipped = [...flipped, card.id]; // this adds the newly clicked card's ID to the flipped array
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true); // lock flipping while checking for matches

      const [firstCard, secondCard] = newFlipped;
      const card1 = cards.find((c) => c.id === firstCard);
      const card2 = cards.find((c) => c.id === secondCard);
      if (card1.name === card2.name) {
        setMatched((prev) => [...prev, card1.id, card2.id]);
      }
      setTimeout(() => {
        setFlipped([]); // reset flipped cards after a delay
        setDisabled(false); // unlock flipping
      }, 1500); // adjust delay as needed
    }
  }

  const hasWon = matched.length === cards.length && cards.length > 0;

  useEffect(() => {
    if (hasWon) {
      setHasWon(true); // notify parent component that the game is won
    }
  }, [hasWon, setHasWon]); // you don't need to add the setHasWon dependency, but it's a good practice to include all dependencies that are used in the effect.

  return (
    <ul className="card-grid">
      {hasWon && (
        <Confetti width={dimensions.width} height={dimensions.height} />
      )}
      {cards.map((card) => {
        const isFlipped =
          flipped.includes(card.id) || matched.includes(card.id);
        return (
          <li
            key={card.id}
            className="card"
            onClick={() => handleFlipCard(card)}
          >
            {isFlipped ? (
              <img src={images[card.image]} alt={card.name} />
            ) : (
              <div className="card-back">?</div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MemoryCard;
