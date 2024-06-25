export const data = Array.from({ length: 100000 }, (_, i) => ({
  id: i.toString(),
  name: `Item ${i}`,
}));
