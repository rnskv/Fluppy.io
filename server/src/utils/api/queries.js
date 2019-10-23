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
  'player.get': {
    method: 'GET',
    action: () => '/player'
  },
  'auth.vk': {
    method: 'POST',
    action: () => '/auth/vk'
  }
}
