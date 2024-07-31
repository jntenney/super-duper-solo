import React from 'react';
import Card from 'react-bootstrap/Card';
import Loader from '../components/Loader';
import { useGetProductQuery } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

const CartCard = ({ productId }) => {
  const { data: product, isLoading, isFetching, isError } = useGetProductQuery(productId);

  if (isError) {
    toast.error("We're sorry. Error loading product!");
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <Card>
        <Card.Img variant="top" src={product.imgUrl} height={400} width={330} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Link href={product.productURL}>Product URL</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default CartCard;
