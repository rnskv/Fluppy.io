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
  'player.setTotalScores': {
    method: 'PUT',
    action: () => '/player/totalScores'
  },
  'auth.vk': {
    method: 'POST',
    action: () => '/auth/vk'
  },
}
