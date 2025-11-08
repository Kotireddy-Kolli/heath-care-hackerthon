import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/',
    prepareHeaders: (headers, { getState }) => {
      // You can add auth headers here if needed
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'users',
        method: 'GET', // This would typically be POST in a real API
        // In a real API, you'd send credentials in the body
        // method: 'POST',
        // body: credentials
      }),
      // Custom response handling for login
      transformResponse: async (response, meta, arg) => {
        const users = response;
        const user = users.find(
          (u) => u.email === arg.email && u.password === arg.password
        );
        if (!user) {
          throw new Error('Invalid credentials');
        }
        return user;
      },
    }),
    getPatients: builder.query({
      query: () => 'patients',
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginMutation,
  useGetPatientsQuery,
} = api;