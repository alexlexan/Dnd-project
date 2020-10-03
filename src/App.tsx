import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GlobalStyle from "./styles/global";

import Header from "./components/Header/index";
import Board from "./components/Board/index";
import BoardState from "./components/Board/state";

const App: React.FC = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <BoardState>
          <Board />
        </BoardState>

        <GlobalStyle />
      </DndProvider>
    </>
  );
};

export default App;
