import React, { useRef, useContext } from "react";
import { Container, Label } from "./styles";
import { useDrag, useDrop } from "react-dnd";

import BoardContext from "../Board/context";

type Props = {
  data: {
    id: string;
    content: string;
    label: string;
    user?: string | undefined;
  };
  index: number;
  listIndex: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Card: React.FC<Props> = ({ data, index, listIndex, setShowModal }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { move, setContextCard } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "CARD", index, listIndex, id: data.id },
    isDragging: (monitor) => data.id === monitor.getItem().id,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<
    { listIndex: number; index: number; type: "CARD" },
    unknown,
    unknown
  >({
    accept: "CARD",
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current!.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset!.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  dragRef(dropRef(ref));

  const openModal = () => {
    setShowModal(true);
    setContextCard({
      content: data.content,
      colorItem: data.label,
      listIndex,
      index,
      isNew: false,
    });
  };

  return (
    <Container ref={ref} isDragging={isDragging} onClick={openModal}>
      <header>
        <Label color={data.label} />
      </header>
      <p dangerouslySetInnerHTML={{ __html: data.content }} />
    </Container>
  );
};

export default React.memo(Card);
