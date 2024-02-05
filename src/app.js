import express from 'express';
import cors from 'cors';
import { getImage } from './handlers/getImage.js';
import { getVacancyId } from './handlers/getVacancyId.js';
import { getLocation } from './handlers/getLocation.js';
import { getVacancy } from './handlers/getVacancy.js';
import { addNewVacancy } from './handlers/addNewVacancy.js';
import multer from 'multer';
import mime from 'mime-types';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'img/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now().toString(36).substring(2, 10)}${Math.random()
        .toString(36)
        .substring(2, 10)}.${mime.extension(file.mimetype)}`,
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Разрешены только файлы в форматах JPEG и PNG'), false);
  }
};

const upload = multer({ storage, fileFilter });

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);

app.get('/api/vacancy', getVacancy);

// Обработчик запроса для /api/cities
app.get('/api/locations', getLocation);

app.get('/api/vacancy/:id', getVacancyId);

// Обработчик запроса для возвращения изображений
app.get('/img/:imageName', getImage);

app.post('/api/vacancy', upload.single('logo'), addNewVacancy);
export default app;
