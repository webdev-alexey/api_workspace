import { loadVacanciesData } from '../loadVacanciesData.js';

export const getLocation = async (req, res) => {
  const vacanciesData = await loadVacanciesData();
  const locations = vacanciesData.reduce((acc, vacancy) => {
    if (!acc.includes(vacancy.location)) {
      acc.push(vacancy.location);
    }
    return acc;
  }, []);
  res.json(locations);
};
