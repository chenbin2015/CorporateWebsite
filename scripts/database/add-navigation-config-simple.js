/**
 * 简单的数据库迁移脚本 - 添加 navigation_config 字段
 * 使用方法：修改下面的数据库配置，然后运行 node scripts/database/add-navigation-config-simple.js
 */

const mysql = require('mysql2/promise')

// ⚠️ 请根据你的实际数据库配置修改以下信息
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root123456',  // 从 application.yml 读取的密码
  database: 'corporate_platform',
}

async function addNavigationConfigField() {
  let connection
  try {
    console.log('🔌 连接数据库...')
    connection = await mysql.createConnection(dbConfig)
    console.log('✓ 数据库连接成功\n')

    console.log('📝 执行 SQL：添加 navigation_config 字段...')
    
    try {
      await connection.query(`
        ALTER TABLE projects 
        ADD COLUMN navigation_config TEXT COMMENT '全局导航配置（JSON格式）' AFTER description
      `)
      console.log('✅ navigation_config 字段添加成功！\n')
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('⚠  navigation_config 字段已存在，跳过创建\n')
      } else {
        throw error
      }
    }

    console.log('✅ 数据库迁移完成！')
    console.log('\n📝 下一步：')
    console.log('  1. 重启后端服务')
    console.log('  2. 刷新前端页面')
    console.log('  3. 再次尝试保存导航配置')
    
  } catch (error) {
    console.error('\n❌ 数据库迁移失败:', error.message)
    if (error.message.includes('Access denied')) {
      console.log('\n💡 提示：')
      console.log('  请检查并修改脚本中的数据库配置：')
      console.log('  - host: ' + dbConfig.host)
      console.log('  - port: ' + dbConfig.port)
      console.log('  - user: ' + dbConfig.user)
      console.log('  - password: ' + (dbConfig.password ? '***' : '(未设置)'))
      console.log('  - database: ' + dbConfig.database)
    } else if (error.message.includes('Unknown database')) {
      console.log('\n💡 提示：数据库不存在，请先创建数据库')
    }
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

addNavigationConfigField()

