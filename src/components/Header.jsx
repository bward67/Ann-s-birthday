import React from "react";

const Header = ({ lastMatch }) => {
  return (
    <>
      <h1>Welcome, Ann Hounjet, to your very own game of Pair Snair!</h1>
      <p className="grey-p">One of your Aunty Patsy's favorite games. </p>
      <p>
        You might recognize some of these SUPER STARS who look like they may
        have special SUPER POWERS!
      </p>
      {lastMatch === true && (
        <h4 style={{ backgroundColor: "green" }}>That's a Pair - well done!</h4>
      )}
      {lastMatch === false && (
        <h4 style={{ backgroundColor: "red" }}>
          That's NOT a Pair - try again!
        </h4>
      )}
    </>
  );
};

export default Header;
