/* eslint-disable react/prop-types */

import ListItem from "@components/ListItem.jsx";

export default function List({ elements = [] }) {
  return (
    <>
      {elements.map((el) => (
        <ListItem data={el} key={Math.random()} />
      ))}
    </>
  );
}
