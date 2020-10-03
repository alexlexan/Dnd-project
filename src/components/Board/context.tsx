import { createContext } from "react";
import { DataLists } from "./state";

type Card = {
  content: string;
  colorItem: string;
  listIndex: number;
  index: number;
  isNew: boolean;
};

type PropsContext = {
  move: (fromList: number, toList: number, from: number, to: number) => void;
  update: (
    list: {
      id: string;
      content: string;
      label: string;
    },
    listIndex?: number,
    index?: number,
    newList?: boolean
  ) => void;
  deleteList: (index: number, listIndex: number) => void;
  lists: DataLists;
  setContextCard: React.Dispatch<React.SetStateAction<Card>>;
  contextCard: Card;
};

export default createContext<PropsContext>({} as PropsContext);
