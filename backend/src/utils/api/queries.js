export default {
  'users.get': {
    method: 'GET',
    action: () => '/users'
  },
  'users.create': {
    method: 'POST',
    action: () => '/users'
  },
  'users.update': {
    method: 'PUT',
    action: ({id}) => `/users/${id}`
  },
  'auth.vk': {
    method: 'POST',
    action: () => '/auth/vk'
  }
}
