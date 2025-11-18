/**
 * 更新东南大学首页内容
 */

const BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// 项目 Code（从之前的输出中获取）
const PROJECT_CODE = 'f4afaf3c-52c7-43ff-b604-3eab4fa5d861'
// 首页 Code（从之前的输出中获取）
const PAGE_CODE = 'd533b3d0-b529-49ec-a0c0-f458b218a8a8'

async function updateHomePage() {
  // 根据东南大学网站，首页应该包含：
  // 1. 顶部导航（MainHeader）
  // 2. Hero轮播图（HeroCarousel）
  // 3. 统计数据（StatsHighlight）
  // 4. 新闻动态（NewsSection）
  // 5. 活动预告（EventSpotlight）
  // 6. 快速链接（ServiceLinks）
  // 7. 页脚（Footer）

  const homePageSchema = [
    {
      id: 'MainHeader-1',
      key: 'MainHeader',
      label: 'MainHeader',
      source: 'frontend/src/components/MainHeader.vue',
      props: {
        title: '东南大学',
        subtitle: '止于至善',
        navBackgroundColor: '#2d3748',
        showSearch: false,
        menuItems: [
          { label: '首页', href: '/', navigation: { type: 'none' } },
          {
            label: '学校概况',
            href: '#',
            navigation: { type: 'none' },
            children: [
              { label: '学校简介', href: '#', navigation: { type: 'none' } },
              { label: '历史沿革', href: '#', navigation: { type: 'none' } },
              { label: '现任领导', href: '#', navigation: { type: 'none' } },
            ],
          },
          {
            label: '新闻动态',
            href: '#',
            navigation: { type: 'none' },
            children: [
              { label: '学校新闻', href: '#', navigation: { type: 'none' } },
              { label: '通知公告', href: '#', navigation: { type: 'none' } },
              { label: '媒体报道', href: '#', navigation: { type: 'none' } },
            ],
          },
          {
            label: '人才培养',
            href: '#',
            navigation: { type: 'none' },
          },
          {
            label: '科学研究',
            href: '#',
            navigation: { type: 'none' },
          },
          {
            label: '国际交流',
            href: '#',
            navigation: { type: 'none' },
          },
        ],
      },
    },
    {
      id: 'HeroCarousel-1',
      key: 'HeroCarousel',
      label: 'HeroCarousel',
      source: 'frontend/src/components/HeroCarousel.vue',
      props: {
        items: [
          {
            title: '东南大学：止于至善',
            description: '以科学名世，以人才报国，建设世界一流大学',
            category: '学校简介',
            action: '了解更多',
            href: '#',
            cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
          },
          {
            title: '创新驱动发展',
            description: '面向国家重大需求，服务经济社会发展',
            category: '科学研究',
            action: '了解更多',
            href: '#',
            cover: 'https://images.unsplash.com/photo-1532619675605-1ede6c27edc0?auto=format&fit=crop&w=1600&q=80',
          },
          {
            title: '国际化办学',
            description: '与世界一流大学合作，培养具有国际视野的创新型人才',
            category: '国际交流',
            action: '了解更多',
            href: '#',
            cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
          },
        ],
        interval: 5000,
        navigation: {
          type: 'none',
          targetPageCode: null,
          path: null,
          url: '',
          params: {},
        },
      },
    },
    {
      id: 'StatsHighlight-1',
      key: 'StatsHighlight',
      label: 'StatsHighlight',
      source: 'frontend/src/components/StatsHighlight.vue',
      props: {
        items: [
          { label: '在校学生', value: '37000+' },
          { label: '教职工', value: '3200+' },
          { label: '学科门类', value: '11' },
          { label: '国家重点学科', value: '12' },
        ],
        columns: 4,
      },
    },
    {
      id: 'InfoCardGrid-1',
      key: 'InfoCardGrid',
      label: 'InfoCardGrid',
      source: 'frontend/src/components/InfoCardGrid.vue',
      props: {
        title: '学校特色',
        items: [
          {
            title: '一流学科建设',
            description: '12个国家重点学科，11个学科门类，涵盖理、工、医、文、管、法、经、哲、教育、艺术、历史',
            icon: 'trophy',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
          },
          {
            title: '科研创新',
            description: '承担国家重大科研项目，获得多项国家级科技奖励，服务国家战略需求',
            icon: 'research',
            image: 'https://images.unsplash.com/photo-1532619675605-1ede6c27edc0?auto=format&fit=crop&w=800&q=80',
          },
          {
            title: '人才培养',
            description: '培养具有家国情怀、国际视野、创新精神的高素质人才',
            icon: 'education',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
          },
          {
            title: '国际交流',
            description: '与全球200多所知名大学建立合作关系，开展学生交换和联合培养',
            icon: 'global',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
    },
    {
      id: 'ContentSplit-1',
      key: 'ContentSplit',
      label: 'ContentSplit',
      source: 'frontend/src/components/sections/ContentSplit.vue',
      props: {
        title: '百年学府，薪火相传',
        description: '东南大学是中央直管、教育部直属的全国重点大学，是"985工程"和"211工程"重点建设的大学之一。学校历史悠久，文化底蕴深厚，为国家培养了大批优秀人才。',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        imagePosition: 'right',
        buttonText: '了解学校历史',
        navigation: {
          type: 'none',
          targetPageCode: null,
          path: null,
          url: '',
          params: {},
        },
      },
    },
    {
      id: 'NewsSection-1',
      key: 'NewsSection',
      label: 'NewsSection',
      source: 'frontend/src/components/NewsSection.vue',
      props: {
        title: '新闻动态',
        moreText: '更多',
        highlight: {
          id: '1',
          title: '东南大学召开2024年度工作会议',
          summary: '总结2023年工作，部署2024年重点任务，推动学校高质量发展。会议回顾了过去一年学校在人才培养、科学研究、社会服务等方面取得的显著成绩。',
          date: '2024-01-15',
          cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        },
        items: [
          { id: '1', title: '学校召开新学期工作部署会', date: '01-15' },
          { id: '2', title: '我校科研成果获国家科技进步奖', date: '01-12' },
          { id: '3', title: '国际学术会议在我校成功举办', date: '01-10' },
          { id: '4', title: '学生创新创业大赛圆满落幕', date: '01-08' },
          { id: '5', title: '我校与知名企业签署战略合作协议', date: '01-05' },
          { id: '6', title: '优秀校友回校分享创业经验', date: '01-03' },
        ],
        detailPage: {
          type: 'template',
          templateType: 'news',
          targetPageCode: null,
          paramKey: 'id',
          paramSource: 'id',
          openInNewTab: false,
        },
      },
    },
    {
      id: 'EventSpotlight-1',
      key: 'EventSpotlight',
      label: 'EventSpotlight',
      source: 'frontend/src/components/EventSpotlight.vue',
      props: {
        title: '活动预告',
        moreText: '更多',
        events: [
          {
            id: '1',
            title: '2024年春季学期开学典礼',
            date: '2024-02-20',
            location: '九龙湖校区',
            description: '欢迎新同学，开启新学期，共同书写青春华章',
          },
          {
            id: '2',
            title: '学术前沿讲座：人工智能与未来教育',
            date: '2024-02-25',
            location: '四牌楼校区',
            description: '邀请知名专家分享AI在教育领域的应用与发展趋势',
          },
          {
            id: '3',
            title: '校园开放日',
            date: '2024-03-10',
            location: '各校区',
            description: '面向社会公众开放，展示学校风采，欢迎各界人士参观',
          },
          {
            id: '4',
            title: '春季招聘会',
            date: '2024-03-15',
            location: '九龙湖校区',
            description: '为毕业生提供优质就业机会，搭建校企合作平台',
          },
        ],
        detailPage: {
          type: 'template',
          templateType: 'event',
          targetPageCode: null,
          paramKey: 'id',
          paramSource: 'id',
          openInNewTab: false,
        },
      },
    },
    {
      id: 'FocusGrid-1',
      key: 'FocusGrid',
      label: 'FocusGrid',
      source: 'frontend/src/components/FocusGrid.vue',
      props: {
        title: '重点专题',
        items: [
          {
            id: '1',
            title: '本科招生',
            summary: '2024年本科招生计划、专业介绍、录取政策',
            cover: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
          },
          {
            id: '2',
            title: '研究生教育',
            summary: '硕士、博士研究生招生、培养、学位授予',
            cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80',
          },
          {
            id: '3',
            title: '科学研究',
            summary: '科研项目、成果转化、产学研合作',
            cover: 'https://images.unsplash.com/photo-1532619675605-1ede6c27edc0?auto=format&fit=crop&w=900&q=80',
          },
        ],
        detailPage: {
          type: 'template',
          templateType: 'focus',
          targetPageCode: null,
          paramKey: 'id',
          paramSource: 'id',
          openInNewTab: false,
        },
      },
    },
    {
      id: 'ServiceLinks-1',
      key: 'ServiceLinks',
      label: 'ServiceLinks',
      source: 'frontend/src/components/ServiceLinks.vue',
      props: {
        title: '快速通道',
        items: [
          { label: '信息门户', icon: 'portal', href: '#' },
          { label: '图书馆', icon: 'library', href: '#' },
          { label: '教务系统', icon: 'education', href: '#' },
          { label: '学生服务', icon: 'student', href: '#' },
          { label: '就业指导', icon: 'career', href: '#' },
          { label: '校友网', icon: 'alumni', href: '#' },
        ],
      },
    },
    {
      id: 'CTABanner-1',
      key: 'CTABanner',
      label: 'CTABanner',
      source: 'frontend/src/components/sections/CTABanner.vue',
      props: {
        title: '欢迎报考东南大学',
        description: '加入我们，开启你的学术之旅，成就更好的自己',
        buttonText: '了解招生信息',
        navigation: {
          type: 'none',
          targetPageCode: null,
          path: null,
          url: '',
          params: {},
        },
      },
    },
    {
      id: 'Footer-1',
      key: 'Footer',
      label: 'Footer',
      source: 'frontend/src/components/Footer.vue',
      props: {
        copyright: '© 2024 东南大学 版权所有',
        links: [
          { label: '关于我们', href: '#' },
          { label: '联系我们', href: '#' },
          { label: '隐私政策', href: '#' },
          { label: '使用条款', href: '#' },
        ],
        contact: {
          address: '地址：江苏省南京市四牌楼2号',
          phone: '电话：025-83792401',
          email: '邮箱：webmaster@seu.edu.cn',
        },
      },
    },
  ]

  try {
    const response = await fetch(`${BASE_URL}/projects/${PROJECT_CODE}/pages/${PAGE_CODE}/draft`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        schemaData: JSON.stringify(homePageSchema),
      }),
    })

    if (!response.ok) {
      throw new Error(`更新首页失败: ${response.statusText}`)
    }

    const page = await response.json()
    console.log('✓ 首页更新成功:', page.name)
    return page
  } catch (error) {
    console.error('✗ 更新首页失败:', error.message)
    throw error
  }
}

async function main() {
  console.log('开始更新东南大学首页...\n')

  try {
    await updateHomePage()
    console.log('\n✓ 首页更新完成！')
    console.log(`访问地址: http://localhost:5173/projects/${PROJECT_CODE}/design/pages/${PAGE_CODE}`)
  } catch (error) {
    console.error('\n✗ 更新失败:', error)
    process.exit(1)
  }
}

main()

