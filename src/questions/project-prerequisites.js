const isEmpty = require('lodash/isEmpty')
const isNil = require('lodash/isNil')

/**
 * Return engines as formatted choices
 *
 * @param {Object} engines
 */
const buildFormattedChoices = engines =>
  isNil(engines)
    ? null
    : Object.keys(engines).map(key => ({
        name: `${key} ${engines[key]}`,
        value: {
          name: key,
          value: engines[key]
        },
        checked: true
      }))

/**
 * Check if projectInfos has engines properties
 *
 * @param {Object} projectInfos
 */
const hasProjectInfosEngines = projectInfos =>
  !isNil(projectInfos.engines) && !isEmpty(projectInfos.engines)

module.exports = projectInfos => ({
  type: 'checkbox',
  message: '⚠️  Project prerequisites',
  name: 'projectPrerequisites',
  choices: buildFormattedChoices(projectInfos.engines),
  when: () => hasProjectInfosEngines(projectInfos)
})
