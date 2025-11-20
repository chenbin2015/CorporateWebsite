/**
 * 检查 navigation_config 字段是否存在
 */

const mysql = require('mysql2/promise')

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'corporate_platform',
}

async function checkField() {
  let connection
  try {
    console.log('🔌 连接数据库...')
    connection = await mysql.createConnection(dbConfig)
    console.log('✓ 数据库连接成功\n')

    // 检查字段是否存在
    const [rows] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'corporate_platform' 
      AND TABLE_NAME = 'projects' 
      AND COLUMN_NAME = 'navigation_config'
    `)

    if (rows.length > 0) {
      console.log('✅ navigation_config 字段已存在')
    } else {
      console.log('❌ navigation_config 字段不存在')
      console.log('请执行以下命令添加字段：')
      console.log('  node scripts/database/execute-add-navigation-config.js')
    }
  } catch (error) {
    console.error('❌ 检查失败:', error.message)
    if (error.message.includes('Access denied')) {
      console.log('\n提示：请检查数据库配置（用户名、密码）')
    }
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

checkField()

