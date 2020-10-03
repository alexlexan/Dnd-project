import React, { useState, useContext } from "react";
import BoardContext from "../Board/context";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Body,
  BackDrop,
  ColorSection,
  Span,
  Description,
  ColorSquare,
  ColorPickerContainer,
  ColorPicker,
  Button,
} from "./styles";
import { AnimatePresence } from "framer-motion";
import { ColorResult, TwitterPicker } from "react-color";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { stateTicket } from "../Board/state";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0, transition: { delay: 0.2 } },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0, x: "-50%" },
  visible: {
    y: "0px",
    x: "-50%",
    opacity: 1,
  },
};

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<Props> = ({ setShowModal, showModal }) => {
  const { update, contextCard, setContextCard, deleteList } = useContext(
    BoardContext
  );

  const { content, colorItem, listIndex, index, isNew } = contextCard;

  const [color, setColor] = useState<string>(colorItem);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [text, setText] = useState(content);

  React.useEffect(() => {
    setText(content);
    setColor(colorItem);
  }, [content, colorItem]);

  const handleChangeColor = (color: ColorResult) => {
    setColor(color.hex);
  };

  const handleChange = (evt: ContentEditableEvent) => {
    setText(evt.target.value);
  };

  const save = () => {
    const list = {
      id: uuidv4(),
      content: text,
      label: color,
    };
    update(list, listIndex, index, isNew);
    setShowModal(false);
  };

  const deleteListAndCloseModal = () => {
    deleteList(listIndex, index);
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setContextCard(stateTicket);
    setDisplayColorPicker(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <Container>
          <BackDrop
            onClick={closeModal}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          ></BackDrop>
          <Body
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <h2>{isNew ? `New ticket` : `Current ticket`}</h2>
            <ColorSection>
              <ColorSquare onClick={() => setDisplayColorPicker(true)}>
                <Span background={color} />
              </ColorSquare>
              {displayColorPicker ? (
                <ColorPickerContainer>
                  <ColorPicker onClick={() => setDisplayColorPicker(false)} />
                  <TwitterPicker color={color} onChange={handleChangeColor} />
                </ColorPickerContainer>
              ) : null}
            </ColorSection>
            <Description>
              <ContentEditable html={text} onChange={handleChange} />
            </Description>
            <Button onClick={save}>Save</Button>
            {!isNew && (
              <Button primary={"#ecf1f8"} onClick={deleteListAndCloseModal}>
                Delete
              </Button>
            )}
          </Body>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Modal;
