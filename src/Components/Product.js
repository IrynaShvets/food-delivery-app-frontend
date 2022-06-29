import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product, addToCart }) => {
  return (
    <div className="flex-1 flex flex-col self-stretch items-center border-double border-4 border-pink-700 min-w-[300px] px-2 mb-2 ml-12 rounded-lg  transition ease-in-out delay-250 hover:-translate-y-1 hover:scale-105 duration-300 cursor-zoom-in">
      <img
        className=""
        src={product.img}
        alt={product.name}
        width={300}
        height={280}
      />
      <h4 className="text-red-900 font-bold font-mono">{product.shop}</h4>
      <h3 className="text-red-900 font-bold font-mono text-[20px]">
        {product.name}
      </h3>
      <p className="text-pink-700 font-bold font-mono text-[17px]">
        ${product.price}
      </p>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="bg-gradient-to-r from-purple-500 to-red-500 w-full rounded-lg py-1 mt-auto mb-2 text-red-800 font-bold hover:opacity-80 hover:text-white font-mono"
      >
        Order
      </button>
    </div>
  );
};

export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    shop: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  addToCart: PropTypes.func.isRequired,
};
