module.exports = projectInfos => ({
  type: 'input',
  message:
    '📄  Changelog url. See more info : https://keepachangelog.com/en/1.0.0/ (use empty value to skip)',
  name: 'changelogUrl',
  default: projectInfos.changelogUrl
})
