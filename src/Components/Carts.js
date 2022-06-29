import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai';
import axios from 'axios';
import Loader from './Loader';

const BASE_URL = process.env.REACT_APP_API_URL;

const Carts = ({ carts, addToCart, deleteFromCart, setShowCart, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const cartRef = useRef();

  const nameInputId = nanoid();
  const emailInputId = nanoid();
  const phoneInputId = nanoid();
  const addressInputId = nanoid();

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'address':
        setAddress(value);
        break;

      default:
        break;
    }
  };

  const totalPrice = array => {
    return array.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.price * currentValue.amount,
      0,
    );
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(false);
    try {
      setLoading(true);
      const totalSumOfOrder = totalPrice(carts);
      setTotal(totalSumOfOrder);
      const fields = {
        name,
        email,
        phone,
        address,
        totalSumOfOrder,
      };
      const { data } = await axios.post(`${BASE_URL}/api/contacts`, fields);
      onSubmit({ data });

      toast.success('Your order has been added successfully');
      cartRef.current.classList.add('animate-fade-out');

      setTimeout(() => {
        setShowCart(false);
      }, 100);
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeCart = () => {
    setLoading(true);
    cartRef.current.classList.remove('animate-fade-in');
    cartRef.current.classList.add('animate-fade-out');
    setTimeout(() => {
      setShowCart(false);
      setLoading(false);
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)]" onClick={closeCart}>
      <div
        ref={cartRef}
        onClick={event => event.stopPropagation()}
        className="bg-white w-5/6 h-full absolute right-0 overflow-y-scroll animate-fade-in"
      >
        <h2 className="py-5 bg-gradient-to-r from-red-500 to-pink-900 text-center text-white font-mono text-[40px]">
          Shopping cart
        </h2>
        <div className="flex flex-col items-center px-2 py-4">
          {carts.map(cart => (
            <div
              key={cart.id}
              className="text-center border-b-[3px] w-full mb-2 flex flex-col items-center"
            >
              <img
                className="h-70 w-100"
                src={cart.img}
                alt={cart.name}
                width={390}
                height={350}
              />
              <p className="text-white font-bold w-6 h-6 rounded-full bg-red-700 font-mono">
                {cart.amount}
              </p>
              <p className="text-red-900 font-mono">{cart.shop}</p>
              <h3 className="text-red-900 font-bold font-mono text-[25px]">
                {cart.name}
              </h3>
              <div className="flex items-center my-2">
                <button type="button" onClick={() => deleteFromCart(cart.id)}>
                  <AiFillMinusSquare className="text-red-700 text-[35px]" />
                </button>
                <p className="text-red-600 mx-2 font-mono text-[25px]">
                  ${cart.price}
                </p>
                <button type="button" onClick={() => addToCart(cart)}>
                  <AiFillPlusSquare className="text-red-700 text-[35px]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <form
          className="inline-flex flex-col w-700 font-mono h-auto mr-auto ml-auto rounded-br-lg border-0 mb-40 ml-20 p-10 bg-gradient-to-r from-red-500 to-pink-900"
          onSubmit={handleSubmit}
        >
          <h3 className="text-center text-white text-[35px]">Add your data</h3>
          <label className="mb-1 text-[18px] text-white" htmlFor={nameInputId}>
            Name
          </label>
          <input
            className="w-full px-4 py-1 rounded"
            type="text"
            name="name"
            value={name}
            htmlFor={nameInputId}
            onChange={handleChange}
            required
          />

          <label className="mb-1 text-[18px] text-white" htmlFor={emailInputId}>
            Email
          </label>
          <input
            className="w-full px-4 py-1 rounded"
            type="email"
            name="email"
            value={email}
            htmlFor={emailInputId}
            onChange={handleChange}
            required
          />

          <label className="mb-1 text-[18px] text-white" htmlFor={phoneInputId}>
            Phone
          </label>
          <input
            className="w-full px-4 py-1 rounded"
            type="tel"
            name="phone"
            value={phone}
            htmlFor={phoneInputId}
            onChange={handleChange}
            required
          />

          <label
            className="mb-1 text-[18px] text-white"
            htmlFor={addressInputId}
          >
            Address
          </label>
          <input
            className="w-full px-4 py-1 rounded"
            type="text"
            name="address"
            value={address}
            htmlFor={addressInputId}
            onChange={handleChange}
            required
          />
          {carts.length > 0 && (
            <p className="text-[30px] font-mono font-bold text-white">
              Total: ${totalPrice(carts)}{' '}
            </p>
          )}
          <button
            className="block w-1/1 rounded border-0 bg-white p-1 text-red-900 text-xl mt-2 hover:bg-red-900 hover:text-white"
            type="submit"
          >
            Add contacts
          </button>
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Carts;

Carts.propTypes = {
  carts: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      id: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      shop: PropTypes.string.isRequired,
    }),
  ),
  addToCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  setShowCart: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
