import React, { useContext, useState } from "react";
import BoardContext from "../Board/context";

import List from "../List";
import Modal from "../Modal";

function Board() {
  const { lists } = useContext(BoardContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      {lists.map((list, index) => (
        <List
          setShowModal={setShowModal}
          key={list.title}
          index={index}
          data={list}
        />
      ))}
    </>
  );
}

export default Board;
