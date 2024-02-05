export const filterVacancies = (vacancies, filters) => {
  const {
    city,
    'pay-from': payFrom,
    'pay-to': payTo,
    experience,
    format,
    type,
  } = filters;
  return vacancies
    .filter(vacancy => !(city && vacancy.location !== city))
    .filter(vacancy => !(payFrom && vacancy.salary < parseInt(payFrom)))
    .filter(vacancy => !(payTo && vacancy.salary > parseInt(payTo)))
    .filter(vacancy => {
      if (experience) {
        if (typeof experience === 'string') {
          return experience.toLowerCase() === vacancy.experience;
        }
        if (Array.isArray(experience)) {
          return experience.some(
            item => item.toLowerCase() === vacancy.experience,
          );
        }
      }
      return true;
    })
    .filter(vacancy => {
      if (format) {
        if (typeof format === 'string') {
          return format.toLowerCase() === vacancy.format;
        }
        if (Array.isArray(format)) {
          return format.some(item => item.toLowerCase() === vacancy.format);
        }
      }
      return true;
    })
    .filter(vacancy => {
      if (type) {
        if (typeof type === 'string') {
          return type.toLowerCase() === vacancy.type;
        }
        if (Array.isArray(type)) {
          return type.some(item => item.toLowerCase() === vacancy.type);
        }
      }
      return true;
    });
};
