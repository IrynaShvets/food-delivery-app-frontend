import React from 'react';
import PropTypes from 'prop-types';
import { SiFoodpanda } from 'react-icons/si';
import { MdAddShoppingCart } from 'react-icons/md';

const Header = ({ carts, setShowCart }) => {
  return (
    <>
      <header>
        <div className="container mx-auto flex items-center justify-start py-1 text-white px-2">
          <SiFoodpanda className="text-red-800 w-16 h-16 mr-20 hover:text-white" />
          <h2 className="font-mono font-black hover:text-red-800 text-[44px] mr-20">
            PandaSHOPS
          </h2>

          <div className="flex items-center">
            <div
              className="flex items-center relative"
              onClick={() => setShowCart(true)}
            >
              <MdAddShoppingCart className="w-14 h-14 text-red-800 hover:text-white" />
              {carts.length > 0 && (
                <span className="bg-white text-red-900 font-bold w-5 h-5 rounded-full absolute -top-1 -left-6 text-center leading-5 ">
                  {carts.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

Header.propTypes = {
  carts: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      _id: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      shop: PropTypes.string.isRequired,
    }),
  ),
  setShowCart: PropTypes.func.isRequired,
};
