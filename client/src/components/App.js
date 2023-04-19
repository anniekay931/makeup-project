import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
      </div>
  );
}

export default App;
