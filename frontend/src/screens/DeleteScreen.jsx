import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useDeleteUserMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { removeCart } from '../slices/cartSlice';

const DeleteScreen = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [deleteProfile, { isLoading }] = useDeleteUserMutation();

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.firstName, userInfo.lastName]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteProfile({
        _id: userInfo._id,
        firstName,
        lastName,
        email,
      }).unwrap();
      console.log(res);
      dispatch(logout());
      dispatch(removeCart());
      navigate('/login');
      toast.success('Profile delete successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Delete Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="name" placeholder="Enter first name" value={firstName} readOnly></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="name" placeholder="Enter last name" value={lastName} readOnly></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} readOnly></Form.Control>
        </Form.Group>

        <Button type="submit" variant="danger" className="mt-3">
          Delete
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default DeleteScreen;
