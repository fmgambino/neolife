export function fetchAccessToken ({ commit }) {
  commit('updateAccessToken', JSON.parse(localStorage.getItem('_SESSION_INFO_')))
}
export function logout ({ commit }) {
  localStorage.removeItem('_SESSION_INFO_')
  commit('logout')
}
