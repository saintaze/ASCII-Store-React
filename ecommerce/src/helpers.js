const getDuration = (timeAgoInSeconds) => {
  const epochs = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ];
  for (let [epoch, seconds] of epochs) {
    if (timeAgoInSeconds >= seconds) {
      const interval = Math.floor(timeAgoInSeconds / seconds);
      return { epoch, interval }
    }
  }
};

export const timeAgo = (date) => {
  const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
  const { epoch, interval } = getDuration(timeAgoInSeconds);
  const suffix = interval === 1 ? '' : 's';
  return `${interval} ${epoch}${suffix} ago`;
};

export const convertCentToDollar = price => price / 100

export var getApiUrl = (params) => {
  const BASE_URL = 'http://localhost:3000/api/products';
  let paramsString = '';
  let paramsKeys = Object.keys(params);
  paramsKeys.forEach((k, i) => {
    paramsString += `${k}=${params[k]}`;
    if (i !== paramsKeys.length - 1) paramsString += '&';
  })
  return `${BASE_URL}?${paramsString}`;
}