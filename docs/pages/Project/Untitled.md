### 缓存时间

```
import moment from 'moment';

/**
 * 设置LocalStorage缓存
 * @param key
 * @param value
 */
export function setLocalStorageItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
}

/**
 *  设置带过期时间的缓存
 * 缓存的数据结构将为 { value, expiredTime:时间戳 }
 * @param key
 * @param value
 * @param expiredMoment
 */
export function setTimingLocalStorageItem(
  /**
   * 缓存的key
   */
  key: string,
  /**
   * 缓存的值
   */
  value: any,
  /**
   * 设定到某个时间后缓存过期
   */
  expiredTime: Date,
) {
  setLocalStorageItem(
    key,
    JSON.stringify({
      value,
      expiredTime: expiredTime.getTime(),
    }),
  );
}
/**
 * 获取带过期时间的缓存值，
 * 当已过期，则返回空
 * @param key
 */
export function getTimingLocalStorageItem(key: string) {
  let cacheValue = null;
  try {
    const cacheItem = JSON.parse(localStorage.getItem(key));
    if (cacheItem?.expiredTime && moment().isBefore(moment(new Date(cacheItem.expiredTime)), 'minutes')) {
      cacheValue = cacheItem.value;
    }
  } catch (error) {
    console.error(error);
  }
  return cacheValue;
}
```

```
// 一天后到期
setTimingLocalStorageItem('SHOW_OVERTIME_COUNT', Number(showCount) + 1, moment().add(1, 'day').toDate());
```

