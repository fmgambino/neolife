export function updateAccessToken (state, _SESSION_INFO_) {
  if (_SESSION_INFO_) {
    state._SESSION_INFO_ = _SESSION_INFO_
  } else {
    state._SESSION_INFO_ = {}
    state.permissions = []
  }
}
export function login (state, data) {
  var permissions = []
  if (data.data.rol === 'SuperAdministrator') {
    permissions = [1, 7, 5]
  }
  if (data.data.rol === 'Administrator') {
    permissions = [1, 2, 3, 4, 6, 8]
  }
  if (data.data.rol === 'Responsible') {
    permissions = [1, 2, 3, 4]
  }
  data.permissions = permissions
  localStorage.setItem('_SESSION_INFO_', JSON.stringify(data))
  state._SESSION_INFO_ = data
  state.permissions = permissions
}

export function logout (state) {
  localStorage.removeItem('_SESSION_INFO_')
  state._SESSION_INFO_ = ''
  state.permissions = []
}
