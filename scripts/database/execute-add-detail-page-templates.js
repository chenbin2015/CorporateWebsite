const mysql = require('mysql2/promise')

async function executeMigration() {
  let connection
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root123456',
      database: process.env.DB_NAME || 'corporate_platform',
      multipleStatements: true,
    })

    console.log('开始执行数据库迁移：添加 detail_page_templates 字段...')

    // 检查字段是否已存在
    const [columns] = await connection.execute(
      "SHOW COLUMNS FROM projects LIKE 'detail_page_templates'"
    )

    if (columns.length > 0) {
      console.log('字段 detail_page_templates 已存在，跳过迁移')
      return
    }

    // 添加字段
    await connection.execute(
      'ALTER TABLE projects ADD COLUMN detail_page_templates TEXT COMMENT "详情页模板配置（JSON格式）" AFTER navigation_config'
    )

    console.log('✅ 迁移完成：detail_page_templates 字段已添加')
  } catch (error) {
    console.error('❌ 迁移失败:', error.message)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

executeMigration()

