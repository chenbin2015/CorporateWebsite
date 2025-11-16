export const componentSchemas = {
  HeroCarousel: {
    defaults: {
      headline: '智慧校园，连结未来',
      subline: '构建国际化、数字化、可持续的校园体验',
      accent: '#2563eb',
    },
    fields: [
      { prop: 'headline', label: '主标题', type: 'text', placeholder: '输入标题' },
      { prop: 'subline', label: '副标题', type: 'textarea', placeholder: '输入简介' },
      { prop: 'accent', label: '主题色', type: 'color' },
    ],
  },
  SectionHero: {
    defaults: {
      title: '学院使命',
      description: '以创新驱动教学，以科研服务社会。',
      tag: '关于我们',
    },
    fields: [
      { prop: 'tag', label: '角标文字', type: 'text' },
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
    ],
  },
  CTABanner: {
    defaults: {
      title: '预约校园参观',
      description: '体验智慧校园解决方案与可视化搭建平台。',
      buttonText: '立即预约',
    },
    fields: [
      { prop: 'title', label: '标题', type: 'text' },
      { prop: 'description', label: '描述', type: 'textarea' },
      { prop: 'buttonText', label: '按钮文案', type: 'text' },
    ],
  },
}

export const getComponentSchema = (key) => componentSchemas[key]

