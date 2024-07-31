// import { Link, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useGetCartQuery } from '../slices/usersApiSlice';
import CartCard from '../components/CartCard';

const CartScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const { data: cart, isLoading, isFetching, isError } = useGetCartQuery();

  if (isError) {
    toast.error("We're sorry. Error loading cart!");
  }

  if (isLoading) return <Loader />;

  console.log(cart);

  return (
    <>
      <Row xs={1} md={2} className="g-4">
        {cart.map((el) => (
          <Col key={el}>
            <CartCard productId={el} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CartScreen;
