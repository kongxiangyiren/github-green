import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import isLeapYear from 'dayjs/plugin/isLeapYear.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isLeapYear);
// 星期日为开始
dayjs.locale('zh-cn');



dayjs.tz.setDefault('Asia/Shanghai');

export default dayjs;
