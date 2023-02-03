exports.transformForExportToCsv = (user) => {
  const group = user.groups.find(() => true);

  return {
    groupName: group.name ?? '',
    username: user.username,
    email: user.email
  }
}