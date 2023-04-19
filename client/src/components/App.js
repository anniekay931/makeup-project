import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from "./Home";
import Users from "./Users";
import Brands from "./Brands";
import Products from "./Products";
import UserProducts from "./UserProducts";
import Routine from "./Routine";
import SavedRoutine from "./SavedRoutine";
import Login from "./Login";
import Navbar from "./Navbar";
import ProductDetails from "./ProductDetails";
import UserContext from "./UserContext";

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff8a80', // Light pink
    },
    secondary: {
      main: '#ff1744', // Darker pink
    },
  },
  typography: {
    fontFamily: 'Didot, serif',
  },
});

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/products')
    .then(resp => resp.json())
    .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar user={user} />
          <UserContext.Provider value={{ user, setUser }} >
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/users' component={Users} />
              <Route path='/brands' component={Brands} />
              <Route path='/products/:productId' component={ProductDetails} />
              <Route path='/products' component={Products} />
              <Route path='/user_products' component={UserProducts} />
              <Route path='/routine'>
                <Routine user={user} products={products} />
              </Route>
              <Route path='/saved-routine' component={SavedRoutine} />
              <Route path='/login'>
                <Login user={user} products={products}/>
              </Route> 
            </Switch>
          </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
} 

export default App;
