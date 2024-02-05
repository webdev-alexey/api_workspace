import { readFile } from 'node:fs/promises';
export const loadVacanciesData = async () => {
  const data = await readFile('./db.json');
  return JSON.parse(data);
};
