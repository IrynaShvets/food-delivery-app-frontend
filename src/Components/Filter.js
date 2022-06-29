import { useEffect } from "react";
import PropTypes from "prop-types";
import { shops } from "../products";

const Filter = ({ products, activeShop, setActiveShop, setFilter }) => {
  useEffect(() => {
    if (activeShop === "All") {
      setFilter(products);
      return;
    }

    const filterShop = products.filter((product) => {
      return activeShop === "All" ? product : product.shop === activeShop;
    });

    setFilter(filterShop);
  }, [products, activeShop, setFilter]);

  return (
    <>
      {shops.map((shop) => (
        <button
          type="button"
          onClick={() => setActiveShop(shop.name)}
          key={shop.id}
          className={`bg-red-500 rounded-lg py-3 px-8 mb-3 mr-3 font-mono hover:bg-red-800 hover:text-white ${
            activeShop === shop.name &&
            "bg-red-800 text-white font-bold hover:bg-red-800"
          }`}
        >
          {shop.name}
        </button>
      ))}
    </>
  );
};

export default Filter;

Filter.propTypes = {
  activeShop: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  setActiveShop: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};
