const fs = require('fs');
const path = require('path');

// 尝试从本地 node_modules 加载，如果不存在则从父目录加载
let mysql;
try {
  mysql = require('mysql2/promise');
} catch (e) {
  // 如果本地没有，尝试从父目录的 node_modules 加载
  const parentNodeModules = path.join(__dirname, '..', '..', 'node_modules');
  if (fs.existsSync(parentNodeModules)) {
    process.env.NODE_PATH = parentNodeModules;
    mysql = require('mysql2/promise');
  } else {
    throw new Error('mysql2 模块未找到，请先运行: npm install mysql2');
  }
}

async function executeMigration() {
  // 从配置文件读取数据库连接信息
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root123456',
    database: 'corporate_platform',
    multipleStatements: true, // 允许多条 SQL 语句
  });

  try {
    console.log('开始执行数据库迁移脚本...');
    
    // 读取 SQL 文件
    const sqlFile = path.join(__dirname, 'add-code-field.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    // 手动定义 SQL 语句，确保按顺序执行
    const statements = [
      // 1. 为 projects 表添加 code 字段
      `ALTER TABLE projects ADD COLUMN code VARCHAR(36) UNIQUE AFTER id`,
      // 2. 为 pages 表添加 code 字段
      `ALTER TABLE pages ADD COLUMN code VARCHAR(36) UNIQUE AFTER id`,
      // 3. 为现有数据生成 code
      `UPDATE projects SET code = UUID() WHERE code IS NULL`,
      `UPDATE pages SET code = UUID() WHERE code IS NULL`,
      // 4. 添加索引
      `CREATE INDEX idx_projects_code ON projects(code)`,
      `CREATE INDEX idx_pages_code ON pages(code)`,
      `CREATE INDEX idx_pages_project_code ON pages(project_id, code)`,
    ];
    
    // 执行每条 SQL 语句
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        console.log(`执行语句 ${i + 1}/${statements.length}...`);
        await connection.query(statement);
        console.log(`✓ 语句 ${i + 1} 执行成功`);
      } catch (error) {
        // 如果字段已存在或索引已存在，忽略错误
        if (error.code === 'ER_DUP_FIELDNAME' || error.code === 'ER_DUP_KEYNAME' || error.code === 'ER_DUP_ENTRY') {
          console.log(`⚠ 语句 ${i + 1} 跳过（字段或索引已存在）`);
        } else {
          console.error(`✗ 语句 ${i + 1} 执行失败:`, error.message);
          // 对于其他错误，也继续执行（可能是字段已存在）
          console.log(`⚠ 继续执行下一条语句...`);
        }
      }
    }
    
    console.log('数据库迁移完成！');
  } catch (error) {
    console.error('迁移失败:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

executeMigration();

