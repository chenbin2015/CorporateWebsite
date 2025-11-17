// 生成 SQL 初始化脚本
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// 生成唯一 ID
const generateId = (key) => `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

// 创建首页的组件数据
const createHomePageSchema = () => {
  return [
    {
      id: generateId('HeroCarousel'),
      key: 'HeroCarousel',
      label: 'HeroCarousel',
      source: 'frontend/src/components/HeroCarousel.vue',
      props: {
        headline: '智慧校园，连结未来',
        subline: '构建国际化、数字化、可持续的校园体验',
        accent: '#2563eb',
      },
    },
    {
      id: generateId('StatisticsBar'),
      key: 'StatisticsBar',
      label: 'StatisticsBar',
      source: 'frontend/src/components/sections/StatisticsBar.vue',
      props: {
        items: [
          { value: '120+', label: 'Years of history' },
          { value: '35k+', label: 'Students enrolled' },
          { value: '98%', label: 'Graduate employment rate' },
        ],
        variant: 'light',
      },
    },
    {
      id: generateId('InfoCardGrid'),
      key: 'InfoCardGrid',
      label: 'InfoCardGrid',
      source: 'frontend/src/components/InfoCardGrid.vue',
      props: {
        title: '核心服务',
        columns: 3,
        cards: [],
      },
    },
    {
      id: generateId('ContentSplit'),
      key: 'ContentSplit',
      label: 'ContentSplit',
      source: 'frontend/src/components/sections/ContentSplit.vue',
      props: {
        title: '关于我们',
        description: '我们致力于提供优质的教育服务，培养具有创新精神和实践能力的人才。',
        image: 'https://picsum.photos/seed/split/600/400',
        reversed: false,
        bullets: [
          '优质的教学资源',
          '国际化的教育理念',
          '完善的实践平台',
        ],
      },
    },
    {
      id: generateId('CTABanner'),
      key: 'CTABanner',
      label: 'CTABanner',
      source: 'frontend/src/components/sections/CTABanner.vue',
      props: {
        title: '预约校园参观',
        description: '体验智慧校园解决方案与可视化搭建平台。',
        buttonText: '立即预约',
      },
    },
  ]
}

// 创建关于我们页面的组件数据
const createAboutPageSchema = () => {
  return [
    {
      id: generateId('PageHero'),
      key: 'PageHero',
      label: 'PageHero',
      source: 'frontend/src/components/PageHero.vue',
      props: {
        title: '关于我们',
        subtitle: 'About Us',
        description: '了解我们的历史、使命和愿景',
        background: '',
      },
    },
    {
      id: generateId('BreadcrumbHeader'),
      key: 'BreadcrumbHeader',
      label: 'BreadcrumbHeader',
      source: 'frontend/src/components/sections/BreadcrumbHeader.vue',
      props: {
        items: [
          { label: '首页', href: '/' },
          { label: '关于我们', href: '/about' },
        ],
        title: '关于我们',
        description: '了解我们的历史、使命和愿景',
      },
    },
    {
      id: generateId('TextImageSection'),
      key: 'TextImageSection',
      label: 'TextImageSection',
      source: 'frontend/src/components/TextImageSection.vue',
      props: {
        title: '我们的使命',
        subtitle: 'Mission',
        details: '我们致力于提供优质的教育服务，培养具有创新精神和实践能力的人才，为社会发展和进步做出贡献。',
        image: 'https://picsum.photos/seed/mission/800/600',
        imageHeight: '18rem',
        titleColor: '#0f172a',
        titleSize: '1.8rem',
        subtitleColor: '#64748b',
        subtitleSize: '1rem',
        detailsColor: '#0f172a',
        detailsSize: '0.98rem',
        reverse: false,
      },
    },
    {
      id: generateId('SectionHero'),
      key: 'SectionHero',
      label: 'SectionHero',
      source: 'frontend/src/components/sections/SectionHero.vue',
      props: {
        title: '我们的愿景',
        description: '成为国际一流的教育机构，引领教育创新与发展。',
        tag: '愿景',
      },
    },
    {
      id: generateId('TimelineHorizontal'),
      key: 'TimelineHorizontal',
      label: 'TimelineHorizontal',
      source: 'frontend/src/components/sections/TimelineHorizontal.vue',
      props: {
        title: '发展历程',
        items: [
          { time: '2020', label: '成立' },
          { time: '2021', label: '快速发展' },
          { time: '2022', label: '国际化' },
          { time: '2023', label: '数字化转型' },
        ],
      },
    },
  ]
}

// 创建联系我们页面的组件数据
const createContactPageSchema = () => {
  return [
    {
      id: generateId('PageHero'),
      key: 'PageHero',
      label: 'PageHero',
      source: 'frontend/src/components/PageHero.vue',
      props: {
        title: '联系我们',
        subtitle: 'Contact Us',
        description: '我们期待与您取得联系',
        background: '',
      },
    },
    {
      id: generateId('ContactCard'),
      key: 'ContactCard',
      label: 'ContactCard',
      source: 'frontend/src/components/sections/ContactCard.vue',
      props: {
        info: {
          address: 'XX 大学 XX 校区 XX 路 123 号',
          email: 'contact@example.edu',
          phone: '010-1234 5678',
          qr: 'https://picsum.photos/seed/contactqr/200/200',
        },
      },
    },
    {
      id: generateId('SimpleForm'),
      key: 'SimpleForm',
      label: 'SimpleForm',
      source: 'frontend/src/components/sections/SimpleForm.vue',
      props: {
        title: '留言表单',
        submitText: '提交',
        fields: [],
      },
    },
    {
      id: generateId('PartnerLogoGrid'),
      key: 'PartnerLogoGrid',
      label: 'PartnerLogoGrid',
      source: 'frontend/src/components/sections/PartnerLogoGrid.vue',
      props: {
        title: '合作伙伴',
        logos: [
          { name: 'Partner A', logo: 'https://picsum.photos/seed/logo1/200/80' },
          { name: 'Partner B', logo: 'https://picsum.photos/seed/logo2/200/80' },
          { name: 'Partner C', logo: 'https://picsum.photos/seed/logo3/200/80' },
          { name: 'Partner D', logo: 'https://picsum.photos/seed/logo4/200/80' },
        ],
      },
    },
  ]
}

// 转义 SQL 字符串
const escapeSql = (str) => {
  if (typeof str !== 'string') {
    return JSON.stringify(str)
  }
  return `'${str.replace(/'/g, "''").replace(/\\/g, '\\\\')}'`
}

// 生成 SQL
const homeSchema = JSON.stringify(createHomePageSchema())
const aboutSchema = JSON.stringify(createAboutPageSchema())
const contactSchema = JSON.stringify(createContactPageSchema())

const sql = `-- 初始化项目和页面数据
-- 这个脚本会创建一个示例项目和三个页面，每个页面都包含组件数据

-- 插入示例项目
INSERT INTO projects (name, description, created_at) VALUES
('示例项目', '这是一个示例项目，包含多个页面和组件数据', NOW());

-- 获取刚插入的项目ID
SET @project_id = LAST_INSERT_ID();

-- 插入首页（包含${createHomePageSchema().length}个组件）
INSERT INTO pages (project_id, name, path, title, description, status, schema_data, version, created_at, updated_at) VALUES
(@project_id, '首页', '/home', '首页 - 智慧校园', '智慧校园首页，展示核心服务和信息', 'DRAFT', ${escapeSql(homeSchema)}, 1, NOW(), NOW());

-- 插入关于我们页面（包含${createAboutPageSchema().length}个组件）
INSERT INTO pages (project_id, name, path, title, description, status, schema_data, version, created_at, updated_at) VALUES
(@project_id, '关于我们', '/about', '关于我们 - 智慧校园', '了解我们的历史、使命和愿景', 'DRAFT', ${escapeSql(aboutSchema)}, 1, NOW(), NOW());

-- 插入联系我们页面（包含${createContactPageSchema().length}个组件）
INSERT INTO pages (project_id, name, path, title, description, status, schema_data, version, created_at, updated_at) VALUES
(@project_id, '联系我们', '/contact', '联系我们 - 智慧校园', '联系方式和服务信息', 'DRAFT', ${escapeSql(contactSchema)}, 1, NOW(), NOW());

-- 显示插入结果
SELECT 
  p.id as project_id,
  p.name as project_name,
  COUNT(pg.id) as page_count
FROM projects p
LEFT JOIN pages pg ON pg.project_id = p.id
WHERE p.id = @project_id
GROUP BY p.id, p.name;

SELECT 
  pg.id,
  pg.name,
  pg.path,
  JSON_LENGTH(pg.schema_data) as component_count
FROM pages pg
WHERE pg.project_id = @project_id
ORDER BY pg.id;
`

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// scripts 目录在 admin-frontend/scripts，所以需要上两级到项目根目录
const rootDir = join(__dirname, '../..')
const sqlPath = join(rootDir, 'init-project-data.sql')

writeFileSync(sqlPath, sql, 'utf8')
console.log('✅ SQL 文件已生成:', sqlPath)

