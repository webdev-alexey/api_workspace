import { filterVacancies } from '../filterVacancies.js';
import { loadVacanciesData } from '../loadVacanciesData.js';

export const getVacancy = async (req, res) => {
  const vacanciesData = await loadVacanciesData();
  const filteredVacancies = filterVacancies(vacanciesData, req.query);

  // Получение параметров пагинации из запроса
  const { page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 12;

  // Вычисление индексов начала и конца данных,
  // основываясь на текущей странице и лимите
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  // Получение данных для текущей страницы
  const paginatedVacancies = filteredVacancies.slice(startIndex, endIndex);

  // Вычисление общего количества страниц и вакансий
  const totalPages = Math.ceil(filteredVacancies.length / limitNumber);
  const totalVacancies = filteredVacancies.length;

  // Создание объекта с информацией о текущей странице,
  // количестве страниц и количестве вакансий
  const paginationInfo = {
    currentPage: pageNumber,
    totalPages,
    totalVacancies,
  };

  // Создание объекта с информацией о вакансиях и пагинации
  const response = {
    vacancies: paginatedVacancies,
    pagination: paginationInfo,
  };

  res.json(response);
};
