import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/${API_PATH}/products`,
        );
        setProducts(response.data.products);
      } catch {
        alert("取得產品失敗");
      }
    };
    getProducts();
  }, []);

  const handleView = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <div className="container">
        <div className="mt-3 row">
          {products.map((product) => (
            <div className="col-md-4 col-lg-3" key={product.id}>
              <div className="card mb-3">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <div className="d-flex">
                    <p className="card-text">
                      NT$ {product.price.toLocaleString()}
                    </p>
                    <p className="card-text text-decoration-line-through ms-2 fw-light">
                      <small className="text-body-secondary">
                        {product.origin_price.toLocaleString()}
                      </small>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleView(product.id)}
                  >
                    查看更多
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
