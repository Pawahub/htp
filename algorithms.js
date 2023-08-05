//             10
//          /       \
//         4         7
//       /   \    /     \
//     1     98  5       2

// 1. создать дерево
// 2. реализовать алгоритм его обхода 10 4  7  1  98  5  2

const obj = {
  value: 10,
  children: [
    {
      value: 4,
      children: [{ value: 1 }, { value: 98 }],
    },
    {
      value: 7,
      children: [{ value: 5 }, { value: 2 }],
    },
  ],
};

const valueCollector = (tree) => {
  const arr = [tree];
  while (arr.length > 0) {
    const node = arr.shift();
    if (node.value) console.log(node.value);
    if (node.children?.length) arr.push(...node.children);
  }
};

const valueCollector2 = (tree) => {
  for (let key in tree) {
    if (typeof tree[key] === 'number') console.log(tree[key]);
    if (Array.isArray(tree[key]))
      tree[key].map((child) => setTimeout(() => valueCollector2(child)));
  }
};

const reducer = (arr) => {
  return arr
    .reduce((acc, key) => {
      let found = acc.find((el) => el.key === key);
      if (!found) acc.push({ key, count: 1 });
      else found.count++;
      return acc;
    }, [])
    .sort((el1, el2) => el2.count - el1.count)
    .map((el) => el.key);
};

const factorial = (n) => {
  if (n === 1) return 1;
  return n * factorial(n - 1);
};

const fibonacci = (n) => {
  if (n === 1 || n === 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  const bigger = [];
  const less = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[0] < arr[i]) {
      bigger.push(arr[i]);
    }
    if (arr[0] > arr[i]) {
      less.push(arr[i]);
    }
  }
  return [...quickSort(less), arr[0], ...quickSort(bigger)];
};

const binarySearch = (arr, item, start, end) => {
  let middle = Math.floor((start + end) / 2);
  if (arr[middle] === item) return middle;
  if (item > arr[middle]) return binarySearch(arr, item, middle + 1, end);
  else return binarySearch(arr, item, start, middle - 1);
};

const cacheFunction = (fn) => {
  const cache = {};
  return function (arg) {
    if (cache[arg]) {
      return cache[arg];
    }
    let result = fn(arg);
    cache[arg] = result;
    return result;
  };
};
