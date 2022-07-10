import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import InsideGroupPage from './pages/InsideGroupPage/InsideGroupPage';
import CreateGroupPage from './pages/CreateGroupPage/CreateGroupPage';
import { GroupContextProvider } from './context/GroupContext';
import AppWrapper from './components/AppWrapper/AppWrapper';
import CreateFriendPage from './pages/CreateFriendPage/CreateFriendPage';
import RegisterExpensePage from './pages/RegisterExpensePage/RegisterExpensePage';
import PaymentSuggestionsPage from './pages/PaymentSuggestionsPage/PaymentSuggestionsPage';

function App() {
  return (
    <GroupContextProvider>
      <AppWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CreateGroupPage />} />
            <Route path="/:groupName" element={<InsideGroupPage />} />
            <Route
              path="/:groupName/create-friend"
              element={<CreateFriendPage />}
            />
            <Route
              path="/:groupName/register-expense"
              element={<RegisterExpensePage />}
            />
            <Route
              path="/:groupName/payment-suggestions"
              element={<PaymentSuggestionsPage />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </GroupContextProvider>
  );
}

export default App;
