import React from "react";
import { Link } from "react-router-dom";
const LinksList = ({ links }) => {
  if (!links.length) {
    return <h1 className="center"> You haven't refers</h1>;
  }
  return (
    <>
      <h3>Your list refers</h3>

      <div className="collection">
        <table className="center">
          <thead>
            <tr>
              <th>N#</th>
              <th>Original link</th>
              <th>Short link</th>
              <th>Open</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {links.map((link, idx) => {
              return (
                <tr key={link._id}>
                  <td>{idx + 1}</td>
                  <td>{link.from}</td>
                  <td>{link.to}</td>
                  <td>
                    <Link to={`../detail/${link._id}`}>Uncover</Link>
                  </td>
                  <td>
                    <button className="center" onClick={() => {}}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LinksList;
