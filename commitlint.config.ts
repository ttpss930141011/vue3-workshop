// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */

module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release'
      ]
    ]
  },
  prompt: {
    messages: {
      // type: "Select the type of change that you're committing:",
      // scope: "Denote the SCOPE of this change (optional):",
      // customScope: "Denote the SCOPE of this change:",
      // subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
      // body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      // breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      // footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
      // customFooterPrefixs: "Input ISSUES prefix:",
      // footer: "List any ISSUES by this change. E.g.: #31, #34:\n",
      // confirmCommit: "Are you sure you want to proceed with the commit above?"
      // 中文版
      type: '選擇你要提交的類型 :',
      scope: '選擇一個提交範圍（可選）:',
      customScope: '請輸入自定義的提交範圍 :',
      subject: '填寫簡短精煉的變更描述 :\n',
      body: '填寫更加詳細的變更描述（可選）。使用 "|" 換行 :\n',
      breaking: '列舉非兼容性重大的變更（可選）。使用 "|" 換行 :\n',
      footerPrefixsSelect: '選擇關聯issue前綴（可選）:',
      customFooterPrefixs: '輸入自定義issue前綴 :',
      footer: '列舉關聯issue (可選) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      // {
      // 	value: "feat",
      // 	name: "feat:     🚀  A new feature",
      // 	emoji: "🚀"
      // },
      // {
      // 	value: "fix",
      // 	name: "fix:      🧩  A bug fix",
      // 	emoji: "🧩"
      // },
      // {
      // 	value: "docs",
      // 	name: "docs:     📚  Documentation only changes",
      // 	emoji: "📚"
      // },
      // {
      // 	value: "style",
      // 	name: "style:    🎨  Changes that do not affect the meaning of the code",
      // 	emoji: "🎨"
      // },
      // {
      // 	value: "refactor",
      // 	name: "refactor: ♻️   A code change that neither fixes a bug nor adds a feature",
      // 	emoji: "♻️"
      // },
      // {
      // 	value: "perf",
      // 	name: "perf:     ⚡️  A code change that improves performance",
      // 	emoji: "⚡️"
      // },
      // {
      // 	value: "test",
      // 	name: "test:     ✅  Adding missing tests or correcting existing tests",
      // 	emoji: "✅"
      // },
      // {
      // 	value: "build",
      // 	name: "build:    📦️   Changes that affect the build system or external dependencies",
      // 	emoji: "📦️"
      // },
      // {
      // 	value: "ci",
      // 	name: "ci:       🎡  Changes to our CI configuration files and scripts",
      // 	emoji: "🎡"
      // },
      // {
      // 	value: "chore",
      // 	name: "chore:    🔨  Other changes that don't modify src or test files",
      // 	emoji: "🔨"
      // },
      // {
      // 	value: "revert",
      // 	name: "revert:   ⏪️  Reverts a previous commit",
      // 	emoji: "⏪️"
      // }
      // 中文版
      { value: 'feat', name: 'feat:   🚀  新增功能', emoji: '🚀' },
      { value: 'fix', name: 'fix:   🧩  修復缺陷', emoji: '🧩' },
      { value: 'docs', name: 'docs:   📚  文檔變更', emoji: '📚' },
      { value: 'style', name: 'style:   🎨  代碼格式（不影響功能，例如空格、分號等格式修正）', emoji: '🎨' },
      { value: 'refactor', name: 'refactor:   ♻️  代碼重構（不包括 bug 修復、功能新增）', emoji: '♻️' },
      { value: 'perf', name: 'perf:   ⚡️  性能優化', emoji: '⚡️' },
      { value: 'test', name: 'test:   ✅  添加疏漏測試或已有測試改動', emoji: '✅' },
      {
        value: 'build',
        name: 'build:   📦️  構建流程、外部依賴變更（如昇級 npm 包、修改 webpack 設定等）',
        emoji: '📦️'
      },
      { value: 'ci', name: 'ci:   🎡  修改 CI 設定、腳本', emoji: '🎡' },
      { value: 'chore', name: 'chore:   ⏪️  回滾 commit', emoji: '⏪️' },
      { value: 'revert', name: 'revert:   🔨  對構建過程或輔助工具和庫的更改（不影響源文件、測試用例）', emoji: '🔨' }
    ],
    useEmoji: true,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
}
