import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InsideGroupPage from './pages/InsideGroupPage/InsideGroupPage';
import CreateGroupPage from './pages/CreateGroupPage/CreateGroupPage';
import { GroupContextProvider } from './context/GroupContext';
import AppWrapper from './components/AppWrapper/AppWrapper';

function App() {
  return (
    <GroupContextProvider>
      <AppWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CreateGroupPage />} />
            <Route path="/:groupName" element={<InsideGroupPage />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </GroupContextProvider>
  );
}

export default App;
