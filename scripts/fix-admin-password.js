// 生成正确的 admin 用户 BCrypt 密码哈希
const bcrypt = require('bcryptjs');

const password = 'admin123';

console.log('正在生成 admin 用户的 BCrypt 密码哈希...\n');

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('生成哈希失败:', err);
    process.exit(1);
  }
  
  console.log('密码:', password);
  console.log('BCrypt 哈希:', hash);
  console.log('\n请更新 scripts/database/init-all.sql 文件:');
  console.log('---');
  console.log(`INSERT IGNORE INTO users (username, password, role, created_at) VALUES`);
  console.log(`('admin', '${hash}', 'ADMIN', NOW());`);
  console.log(`-- 默认密码：admin123（BCrypt 加密）`);
  console.log('---');
  
  // 验证生成的哈希
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.error('验证失败:', err);
      return;
    }
    if (result) {
      console.log('\n✓ 哈希值验证成功！');
    } else {
      console.log('\n✗ 哈希值验证失败！');
    }
  });
});

