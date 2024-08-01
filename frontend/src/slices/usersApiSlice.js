import { apiSlice } from './apiSlice';
import { setCart } from '../slices/cartSlice';

const USERS_URL = '/api/users';
const CARTS_URL = '/api/carts';
const PRODUCTS_URL = '/api/products';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'DELETE',
        body: data,
      }),
    }),
    getCart: builder.query({
      query: () => `${CARTS_URL}`,
      // eslint-disable-next-line no-shadow-restricted-names
      async onQueryStarted(undefined, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(setCart(data));
        } catch (err) {
          console.log(err);
          // `onError` side-effect
        }
      },
    }),
    getProduct: builder.query({
      query: (id) => ({ url: `${PRODUCTS_URL}/id/${id}` }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetCartQuery,
  useGetProductQuery,
} = userApiSlice;
