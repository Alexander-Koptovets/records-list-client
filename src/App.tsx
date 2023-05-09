import React, { useState } from 'react';

import { ModalTypes } from "./types";

import { TableList } from "./components/Table";
import { RecordsModal } from "./components/RecordsModal";
import { Filter } from "./components/Filter";
import { Button } from "@mui/material";

import './App.css';

function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
    <div className="App">
      <Filter />
      <TableList />
      <RecordsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          type={ModalTypes.create}
      />
      <Button onClick={() => setIsOpen(true)}>
          Create Record
      </Button>
    </div>
  );
}

export default App;
