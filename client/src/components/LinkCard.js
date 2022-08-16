import React from "react";

const LinkCard = ({ link }) => {
  return (
    <>
      <h3> Link </h3>
      <p>
        Your link:
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        From link:
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          _{link.from}
        </a>
      </p>
      <p>
        Quantity clicks: <strong> {link.clicks}</strong>
      </p>
      <p>
        Date creating:
        <strong> {new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};

export default LinkCard;
