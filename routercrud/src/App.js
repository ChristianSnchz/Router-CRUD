import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Productos from './Componentes/Productos';
import AgregarProducto from './Componentes/AgregarProducto';
import EditarProducto from './Componentes/EditarProducto';
import Producto from './Componentes/Producto';
import Header from './Componentes/Header';
import axios from 'axios';

function App() {

  const [productos, guardarProductos] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);

  useEffect(() => {
    if (recargarProductos) {
      const consultarApi = async () => {
        //consultar la api de json-server
        const resultado = await axios.get('http://localhost:4000/restaurant');

        guardarProductos(resultado.data);
      }
      consultarApi();

      guardarRecargarProductos(false);
    }
  }, [recargarProductos]);

  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route exact path='/nuevo-producto' render={() => (
            <AgregarProducto
              guardarRecargarProductos={guardarRecargarProductos}
            />
          )} />
          <Route exact path='/productos' render={() => (
            <Productos
              productos={productos}
              guardarRecargarProductos = {guardarRecargarProductos}
            />
          )} />
          <Route exact path='/productos/:id' component={Producto} />
          <Route exact path='/productos/editar/:id' render={props => {
              //tomar el id del producto
              const idProducto = parseInt(props.match.params.id);
            
              // el producto que se pasa al state
              const producto = productos.filter(producto => producto.id === idProducto);
              return (
              <EditarProducto
                guardarRecargarProductos = {guardarRecargarProductos}
                producto = {producto[0]}
              />
            )
          }} />

        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos Reservados</p>
    </Router>
  );
}

export default App;
