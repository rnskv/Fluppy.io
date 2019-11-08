export default {
  'users.get': {
    method: 'GET',
    action: () => '/users'
  },
  'user.get': {
    method: 'GET',
    action: ({ id }) => `/users/${id}`,
  },
  'player.changeSkin': {
    method: 'PUT',
    action: () => '/player/changeSkin'
  },
  'player.get': {
    method: 'GET',
    action: () => '/player'
  }
}
