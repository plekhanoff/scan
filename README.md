# SCAN - Сервис поиска публикаций о компании по ИНН

Приложение SCAN предназначено для поиска и анализа публикаций о компаниях с использованием API Interfax.

## Информация об ИНН для тестирования

Для тестирования приложения можно использовать следующие ИНН:

### Юридические лица (10 цифр)

| Компания | ИНН | Комментарий |
|----------|-----|-------------|
| Сбербанк | 7707083893 | Крупнейший банк РФ |
| МТС | 7740000076 | Телекоммуникационная компания |
| Газпром | 7736050003 | Газовая компания |
| Яндекс | 7736207543 | Технологическая компания |
| ЛУКОЙЛ | 7708004767 | Нефтяная компания |

### Физические лица (12 цифр)

| ИНН | Комментарий |
|-----|-------------|
| 500100732259 | Тестовый ИНН физ. лица |
| 771234567891 | Тестовый ИНН физ. лица |
| 366212345678 | Тестовый ИНН физ. лица |

## Особенности работы с ИНН

1. **Валидация ИНН**:
   - Приложение автоматически проверяет корректность введенного ИНН
   - Поддерживаются только 10-значные (юр. лица) или 12-значные (физ. лица) ИНН
   - Проверка включает контрольную сумму согласно алгоритму ФНС

2. **Ввод ИНН**:
   - При вводе можно использовать пробелы и другие разделители, они будут автоматически удалены
   - При некорректном вводе пользователь увидит понятное сообщение об ошибке

3. **Поиск по ИНН**:
   - После ввода корректного ИНН и параметров поиска, система найдет все публикации, связанные с указанной компанией
   - Результаты будут отображены в виде списка и статистики

## Учетные данные для тестирования

- Логин: sf_student1
- Пароль: 4i2385j

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
