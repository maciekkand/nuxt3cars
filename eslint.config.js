import antfu from '@antfu/eslint-config'

export default await antfu(
  {
    stylistic: {
      'indent': 2,
      'semi': false,
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
    overrides: {
      vue: {
        'vue/block-order': ['error', {
          order: ['script', 'template', 'style'],
        }],
      },
    },
  },
)
