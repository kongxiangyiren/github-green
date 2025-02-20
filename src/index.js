import { execSync } from 'child_process';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import dayjs from './day.js';

rmSync('./.git', {
  recursive: true,
  force: true
});
execSync('git init', { shell: true, stdio: 'inherit' });

rmSync('./time', { recursive: true, ignore: true });

execSync('git add .', { shell: true, stdio: 'inherit' });
execSync('git commit -m "init"', { shell: true, stdio: 'inherit' });

mkdirSync('./time', {
  recursive: true,
  mode: 0o777
});

// 判断离星期六的天数 补足天数
const daysToSaturday = dayjs().startOf('date').day(6).diff(dayjs().startOf('date'), 'day');

// 判断去年是不是闰年
const isLeapYear = dayjs().subtract(1, 'year').isLeapYear();
const daysInYear = (isLeapYear ? 366 : 365) + daysToSaturday;

// for 循环执行命令 过去365天
for (let i = 0; i < daysInYear; i++) {
  const date = dayjs()
    .subtract(daysInYear - i, 'day')
    .format('YYYY-MM-DD');
  writeFileSync('./time/date.txt', date + '\n', { flag: 'a' });
  execSync('git add .', {
    shell: true,
    stdio: 'inherit'
  });
  // ISO 8601
  const gitTime = dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ');
  const command = `set GIT_AUTHOR_DATE="${gitTime}" && set GIT_COMMITTER_DATE="${gitTime}" && git commit -m "${date}"`;
  execSync(command, {
    shell: true,
    stdio: 'inherit'
  });

  console.log(date);
}
