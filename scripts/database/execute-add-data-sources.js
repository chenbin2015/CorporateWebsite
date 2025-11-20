const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// 数据库配置（从环境变量或默认值读取）
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root123456',
  database: process.env.DB_NAME || 'corporate_platform',
  multipleStatements: true,
};

async function executeMigration() {
  let connection;
  try {
    console.log('正在连接数据库...');
    connection = await mysql.createConnection(dbConfig);
    console.log('数据库连接成功');

    // 读取 SQL 文件
    const sqlFile = path.join(__dirname, 'add-data-sources.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('正在执行 SQL 脚本...');
    // 直接执行整个 SQL 文件（使用 multipleStatements）
    try {
      await connection.query(sql);
      console.log('✓ SQL 脚本执行成功');
    } catch (error) {
      // 忽略已存在的表或索引错误
      if (error.code === 'ER_TABLE_EXISTS_ERROR' || 
          error.code === 'ER_DUP_KEYNAME' ||
          error.code === 'ER_DUP_FIELDNAME') {
        console.log('⚠ 表或索引已存在，跳过:', error.message);
      } else {
        console.error('❌ SQL 执行错误:', error.message);
        throw error;
      }
    }

    console.log('\n✅ 数据库迁移完成！');
  } catch (error) {
    console.error('❌ 数据库迁移失败:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

executeMigration();

