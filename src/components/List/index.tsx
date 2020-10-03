import React, { useContext } from "react";
import { Container } from "./styles";

import BoardContext from "../Board/context";
import { useDrop } from "react-dnd";
import { MdAdd } from "react-icons/md";
import Card from "../Card";
import { DataList } from "../Board/state";

type Props = {
  data: DataList;
  index: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const List: React.FC<Props> = ({ data, index: listIndex, setShowModal }) => {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button" onClick={() => setShowModal(true)}>
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>
      <ul>
        <CardEmpty listIndex={listIndex} data={data} />
        {data.cards.map((card, index) => (
          <Card
            setShowModal={setShowModal}
            key={card.id}
            listIndex={listIndex}
            index={index}
            data={card}
          />
        ))}
      </ul>
    </Container>
  );
};

const CardEmpty: React.FC<any> = ({ listIndex, data }) => {
  const { move } = useContext(BoardContext);

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item: { listIndex: number; index: number; type: "CARD" }) {
      console.log("item", item);
      console.log("listIndex", listIndex);

      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = 0;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  if (data.cards.length) {
    return null;
  }

  return (
    <Container ref={dropRef}>
      <div>Empty</div>
    </Container>
  );
};

export default React.memo(List);
