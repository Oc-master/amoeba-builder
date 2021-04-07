module.exports = {
  /**
   * Resolveable ids to commitlint configurations to extend
   */
  extends: ['@commitlint/config-conventional'],
  /**
   * Resolveable id to package, from node_modules, which formats the output
   */
  formatter: '@commitlint/format',
  /**
   * Rules to check against
   */
  rules: {
    'header-max-length': [1, 'always', 80],
    'scope-case': [0, 'never'],
    'subject-case': [0, 'never'],
  },
};
