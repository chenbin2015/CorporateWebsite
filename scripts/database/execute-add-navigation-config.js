/**
 * 执行添加 navigation_config 字段的数据库迁移
 */

const mysql = require('mysql2/promise')
const fs = require('fs')
const path = require('path')

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'corporate_platform',
  multipleStatements: true,
}

async function executeMigration() {
  let connection
  try {
    console.log('🔌 连接数据库...')
    connection = await mysql.createConnection(dbConfig)
    console.log('✓ 数据库连接成功\n')

    // 读取 SQL 文件
    const sqlFile = path.join(__dirname, 'add-navigation-config.sql')
    const sql = fs.readFileSync(sqlFile, 'utf-8')

    console.log('📝 执行 SQL 迁移...')
    
    // 执行 SQL，忽略已存在的字段错误
    try {
      await connection.query(sql)
      console.log('✓ SQL 执行成功\n')
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('⚠ 字段已存在，跳过创建\n')
      } else {
        throw error
      }
    }

    console.log('✅ 数据库迁移完成！')
  } catch (error) {
    console.error('❌ 数据库迁移失败:', error.message)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

executeMigration()

