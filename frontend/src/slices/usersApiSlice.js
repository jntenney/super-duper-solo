import { apiSlice } from './apiSlice';
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
      query: () => ({ url: `${CARTS_URL}` }),
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
