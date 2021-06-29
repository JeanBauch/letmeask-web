import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';



import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import  { GlobalStyle }  from './global/style';

import { useTheme } from './hooks/useTheme';
import { darkTheme, lightTheme } from './global/theme';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <GlobalStyle />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/rooms/new" component={NewRoom}/>
            <Route path="/rooms/:id" component={Room}/>
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </ThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
