export default {
  'users.get': {
    method: 'GET',
    action: () => '/users'
  },
  'user.get': {
    method: 'GET',
    action: ({ id }) => `/users/${id}`,
  }
}
