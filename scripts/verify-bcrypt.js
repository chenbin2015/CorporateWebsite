// 验证和生成 BCrypt 密码哈希
// 使用 bcryptjs 库（与 Spring Security BCrypt 兼容）

// 如果使用 Node.js，需要先安装: npm install bcryptjs
// 如果使用在线工具，可以使用: https://bcrypt-generator.com/

const bcrypt = require('bcryptjs');

// 测试密码
const password = 'admin123';

// SQL 中的哈希值
const sqlHash = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwK8pLN6';

console.log('验证 SQL 中的 BCrypt 哈希值...\n');
console.log('密码:', password);
console.log('SQL 中的哈希:', sqlHash);
console.log('');

// 验证
bcrypt.compare(password, sqlHash, (err, result) => {
  if (err) {
    console.error('验证失败:', err);
    return;
  }
  
  if (result) {
    console.log('✓ SQL 中的哈希值是正确的！');
    console.log('密码 admin123 可以正常使用。');
  } else {
    console.log('✗ SQL 中的哈希值不正确！');
    console.log('正在生成正确的 BCrypt 哈希...\n');
    
    // 生成新的哈希
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('生成哈希失败:', err);
        return;
      }
      
      console.log('新的 BCrypt 哈希:', hash);
      console.log('\n请更新 SQL 文件:');
      console.log(`INSERT IGNORE INTO users (username, password, role, created_at) VALUES`);
      console.log(`('admin', '${hash}', 'ADMIN', NOW());`);
      console.log(`-- 默认密码：admin123（BCrypt 加密）`);
    });
  }
});

