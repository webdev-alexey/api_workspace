import { loadVacanciesData } from '../loadVacanciesData.js';

export const getVacancyId = async (req, res) => {
  const vacanciesData = await loadVacanciesData();
  const vacancyId = req.params.id;

  // Find the vacancy with the matching ID
  const vacancy = vacanciesData.find(vacancy => vacancy.id === vacancyId);

  if (vacancy) {
    res.json(vacancy);
  } else {
    res.status(404).json({ error: 'Vacancy not found' });
  }
};
