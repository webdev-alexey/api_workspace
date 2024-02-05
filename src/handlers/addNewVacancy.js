import fs from 'node:fs/promises';
import mime from 'mime-types';

export const addNewVacancy = async (req, res) => {
  // Получение данных новой вакансии из тела запроса
  const {
    title,
    company,
    description,
    email,
    salary,
    type,
    format,
    experience,
    location,
  } = req.body;

  const logoFile = req.file;
  // Проверка наличия файла изображения
  if (!logoFile) {
    return res.status(400).send('Файл изображения не найден');
  }

  // Проверка наличия обязательных полей
  if (
    !title ||
    !company ||
    !description ||
    !email ||
    !salary ||
    !type ||
    !format ||
    !experience ||
    !location
  ) {
    // удалить файл изображения
    try {
      await fs.unlink(logoFile.path);
    } catch (error) {
      console.log(error);
    }
    return res.status(400).send('Не все обязательные поля заполнены');
  }

  try {
    // Чтение существующих данных из файла db.json
    const data = await fs.readFile('db.json', 'utf8');
    const vacancies = JSON.parse(data);

    // Генерация уникального идентификатора для новой вакансии

    console.log(logoFile);
    // Создание объекта новой вакансии
    const newVacancy = {
      id: logoFile.filename.substring(0, logoFile.filename.lastIndexOf('.')),
      title,
      company,
      description,
      email,
      salary,
      type,
      format,
      experience,
      location,
      logo: logoFile.path,
    };

    // Добавление новой вакансии в массив
    vacancies.push(newVacancy);

    // Запись обновленных данных обратно в файл db.json
    await fs.writeFile('db.json', JSON.stringify(vacancies));

    res.send('Новая вакансия успешно добавлена');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
};
