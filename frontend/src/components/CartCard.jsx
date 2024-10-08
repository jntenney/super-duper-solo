// eslint-disable-next-line no-unused-vars
import React from 'react';
import Card from 'react-bootstrap/Card';
import Loader from '../components/Loader';
import { useGetProductQuery } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const CartCard = ({ productId }) => {
  // eslint-disable-next-line no-unused-vars
  const { data: product, isLoading, isFetching, isError } = useGetProductQuery(productId);

  if (isError) {
    toast.error("We're sorry. Error loading product!");
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <Card>
        <Card.Img variant="top" src={product.imgUrl} height={400} width={100} />
        <Card.Body>
          <Card.Title>{product.asin}</Card.Title>
          <Card.Text>{product.title.slice(0, 79)}</Card.Text>
          <Card.Link href={product.productURL}>Product URL</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default CartCard;
