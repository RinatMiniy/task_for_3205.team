JSON файл
[{ email: ‘jim@gmail.com’, number: ‘221122’ }, { email: ‘jam@gmail.com’, number: ‘830347’ }, { email: ‘john@gmail.com’, number: ‘221122’ }, { email: ‘jams@gmail.com’, number: ‘349425’ }, { email: ‘jams@gmail.com’, number: ‘141424’ }, { email: ‘jill@gmail.com’, number: ‘822287’ }, { email: ‘jill@gmail.com’, number: ‘822286’ }]

Напишите приложение с одной страницей, на котором находится форма с двумя полями email (обязательное) и number (опциональное) и кнопка submit при нажатии на submit запрос уходит на бек где нужно в JSON найти подходящих под поисковый запрос пользователей отобразить найденные данные на клиенте под формой

Условия - нужно на беке добавить задержку обработки запроса в 5 секунд (имитация долгой обработки ответа). При повторном запросе с фронта, отменять прошлый запрос. - обязательная валидация полей email и number.
Можно сделать либо на фронте либо на беке, будьте готовы объяснить выбранный подход - на фронте на поле number нужно добавить маску, чтобы номер отображался с дефисами каждые два знака. например 22-11-22, 83-03-47