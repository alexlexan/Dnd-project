import React, { useState, useEffect } from "react";
import produce from "immer";

import { Container } from "./styles";
import BoardContext from "./context";

import { loadLists } from "../../services/api";

export type DataLists = DataList[];
export type DataList = {
  title: string;
  creatable: boolean;
  done?: boolean;
  cards: {
    id: string;
    content: string;
    label: string;
    user?: string;
  }[];
};

type Props = {
  children: React.ReactNode;
};

export const stateTicket = {
  content: "Describe your new ticket",
  colorItem: "#00D084",
  listIndex: 0,
  index: 0,
  isNew: true,
};

const BoardState: React.FC<Props> = ({ children }) => {
  const [lists, setLists] = useState([] as DataLists);
  const [contextCard, setContextCard] = useState(stateTicket);

  useEffect(() => {
    if (localStorage.homeState) {
      setLists(JSON.parse(localStorage.homeState));
    } else {
      const data: DataLists = loadLists();
      setLists(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("homeState", JSON.stringify(lists));
  }, [lists]);

  const move = (fromList: number, toList: number, from: number, to: number) => {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];

        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
  };
  const deleteList = (listIndex: number = 0, index: number = 0) => {
    setLists(
      produce(lists, (draft) => {
        draft[listIndex].cards.splice(index, 1);
      })
    );
  };
  const update = (
    list: {
      id: string;
      content: string;
      label: string;
    },
    listIndex: number = 0,
    index: number = 0,
    newList: boolean = false
  ) => {
    setLists(
      produce(lists, (draft) => {
        if (newList) {
          draft[listIndex].cards.splice(index, 0, list);
        } else {
          draft[listIndex].cards[index] = list;
        }
      })
    );
    setContextCard(stateTicket);
  };

  return (
    <BoardContext.Provider
      value={{
        lists,
        move,
        update,
        deleteList,
        setContextCard,
        contextCard,
      }}
    >
      <Container>{children}</Container>
    </BoardContext.Provider>
  );
};

export default BoardState;
