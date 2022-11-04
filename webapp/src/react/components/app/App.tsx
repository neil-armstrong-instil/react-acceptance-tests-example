import "./App.css";
import React from "react";
import type {FC} from "react";
import {MainView} from "@src/react/components/structure/main-view/MainView";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const App: FC = () => (
  <DndProvider backend={HTML5Backend}>
    <div className="app">
      <MainView/>
    </div>
  </DndProvider>
);

export default App;
