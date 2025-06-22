import React, { useState, useEffect } from "react";
import MemoryCard from "./components/MemoryCard";

const App = () => {
  const [hasWon, setHasWon] = useState(false);
  const [gameKey, setGameKey] = useState(0); //! Each time you increment this key, React will fully re-render the MemoryCard component — which effectively resets all its state.

  const currentYear = new Date().getFullYear();

  function handlePlayAgain() {
    console.log("Game started!");
    setGameKey((prev) => prev + 1); // Increment the key will trigger a full remount of the MemoryCard component
    setHasWon(false); // Reset the win state whe the game restarts
  }

  useEffect(() => {
    if (hasWon) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page when the game is won
    }
  }, [hasWon]);

  return (
    <div>
      {hasWon ? (
        <>
          <h2 className={hasWon ? "bounce" : ""}>
            WINNER WINNER - CHICKEN DINNER!!
          </h2>{" "}
          <p>Why not Play Again?</p>
        </>
      ) : (
        <>
          <h1>Welcome, Ann Hounjet, to your very own game of Pair Snair!</h1>
          <p className="grey-p">One of your Aunty Patsy's favorite games. </p>
          <p>
            You might recognize some of these SUPER STARS who look like they may
            have special SUPER POWERS!
          </p>
        </>
      )}

      {hasWon && (
        <button className="start-game-btn" onClick={handlePlayAgain}>
          Play Again
        </button>
      )}
      <MemoryCard key={gameKey} setHasWon={setHasWon} />
      {/* setting a different key on a component forces it to unmount + remount which resets all its internal state. */}
      <small>
        &copy;
        {currentYear} Barbara Ward. All rights reserved.
      </small>
    </div>
  );
};

export default App;
