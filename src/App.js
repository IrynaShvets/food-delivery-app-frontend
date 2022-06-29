import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import Product from './Components/Product';
import Header from './Components/Header';
import Carts from './Components/Carts';
import Filter from './Components/Filter';
import Loader from './Components/Loader';
import axios from './axios';
import { dataProducts } from './products';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [activeShop, setActiveShop] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useLocalStorage('contacts', {});

  const addContacts = ({
    name,
    email,
    phone,
    address,
    totalPriceAddToForm,
  }) => {
    const contact = {
      id: nanoid(),
      name,
      email,
      phone,
      address,
      totalPriceAddToForm,
    };
    setContacts(contact);
  };

  useEffect(() => {
    try {
      axios.get('/api/contacts').then(response => console.log(response.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchDataProducts = async () => {
      setLoading(true);
      try {
        setLoading(true);
        setProducts(dataProducts);
        setFilter(dataProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchDataProducts();
  }, [setProducts]);

  const addToCart = product => {
    setCarts(prev => {
      const findProduct = prev.find(item => item.id === product.id);

      if (findProduct) {
        return prev.map(item =>
          item.id === product.id ? { ...item, amount: item.amount + 1 } : item,
        );
      }
      return [...prev, { ...product, amount: 1 }];
    });
  };

  const deleteFromCart = id => {
    setCarts(prev => {
      return prev.reduce((previousValue, currentValue) => {
        if (currentValue.id === id) {
          if (currentValue.amount === 1) return previousValue;

          return [
            ...previousValue,
            { ...currentValue, amount: currentValue.amount - 1 },
          ];
        }

        return [...previousValue, { ...currentValue }];
      }, []);
    });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-red-500 shadow-lg shadow-red-500/50">
        {<Header carts={carts} setShowCart={setShowCart} />}
      </div>
      <h1 className="font-mono text-2xl italic font-bold text-center text-red-600/50 mt-4">
        You can order delicious food from us. Hurry up!
      </h1>

      <div className=" flex flex-column my-1 container md:mx-auto mx-1 space-x-8">
        <div className="inset-y-0 left-0 w-10 mx-1  my-4 ">
          <Filter
            products={products}
            setFilter={setFilter}
            activeShop={activeShop}
            setActiveShop={setActiveShop}
          />
        </div>
        <div className="">
          <div className="flex flex-wrap container md:mx-auto mx-2 mt-4">
            {filter.map(product => (
              <Product
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>

          {showCart && (
            <Carts
              carts={carts}
              addToCart={addToCart}
              deleteFromCart={deleteFromCart}
              setShowCart={setShowCart}
              onSubmit={addContacts}
            />
          )}

          {loading && <Loader />}
        </div>
      </div>
      <ToastContainer autoClose={3000} position="top-right" />
    </>
  );
}
