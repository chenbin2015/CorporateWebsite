// 生成 BCrypt 密码哈希
const bcrypt = require('bcryptjs');

const password = 'admin123';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('生成哈希失败:', err);
    return;
  }
  console.log('密码:', password);
  console.log('BCrypt 哈希:', hash);
  console.log('\nSQL 语句:');
  console.log(`INSERT IGNORE INTO users (username, password, role, created_at) VALUES`);
  console.log(`('admin', '${hash}', 'ADMIN', NOW());`);
});

