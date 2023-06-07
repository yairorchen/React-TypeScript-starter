
 function load<T>(key: string): T | null {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

 function store<T>(key: string, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}
export {
    store,
    load
}
