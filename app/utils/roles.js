export function cantRoleEdit(role) {
  if (role.name === 'Viewer') {
    return true;
  } else {
    return false;
  }
}
