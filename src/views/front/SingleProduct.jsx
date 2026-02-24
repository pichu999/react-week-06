import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    const handleView = async (id) => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${id}`,
        );
        setProduct(res.data.product);
      } catch {
        alert("取得產品失敗");
      }
    };
    handleView(id);
  }, [id]);

  const addToCart = async (id, qty = 1) => {
    try {
      const data = {
        product_id: id,
        qty,
      };
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data,
      });
    } catch {
      alert("加入購物車失敗");
    }
  };

  return !product ? (
    <h2>查無此產品</h2>
  ) : (
    <div className="container mt-3">
      <div className="card mb-3 w-50 m-auto">
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.title}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <div className="d-flex">
            <p className="card-text">NT$ {product.price.toLocaleString()}</p>
            <p className="card-text text-decoration-line-through ms-2 fw-light">
              <small className="text-body-secondary">
                {product.origin_price.toLocaleString()}
              </small>
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addToCart(id)}
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
