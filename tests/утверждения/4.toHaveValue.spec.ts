import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavevalue');
});

test('1. Проверка начальных значений полей', async ({ page }) => {
  // Задание: Проверить начальные значения всех полей формы
  // 1. Найти поле "Имя пользователя" по лейблу и проверить значение "Гость"
  // 2. Найти поле "Электронная почта" и проверить что оно пустое
  // 3. Найти поле "Телефон" и проверить значение "+7"
  // 4. Найти поле "Комментарии" и проверить что оно пустое
  // 5. Найти выпадающий список "Страна" и проверить значение "ru"

  const userName = page.getByLabel('Имя пользователя:');
  const email = page.getByLabel('Электронная почта:');
  const phone = page.getByLabel('Телефон:');
  const comments = page.getByLabel('Комментарии:');
  const country = page.getByLabel('Страна:');

  await expect(userName).toHaveValue('Гость');
  await expect(email).toHaveValue('');
  await expect(phone).toHaveValue('+7');
  await expect(comments).toHaveValue('');
  await expect(country).toHaveValue('ru');
});

test('2. Проверка изменения значений полей', async ({ page }) => {
  // Задание: Проверить обновление значений полей
  // 1. Заполнить поле "Имя пользователя" значением "Алексей"
  // 2. Заполнить поле "Электронная почта" значением "alex@example.com"
  // 3. Заполнить поле "Телефон" значением "+7 (123) 456-78-90"
  // 4. Заполнить поле "Комментарии" значением "Тестовый комментарий"
  // 5. Выбрать в списке "Страна" значение "Казахстан" (kz)
  // 6. Проверить что все поля содержат новые значения

  const userName = page.getByLabel('Имя пользователя:');
  const email = page.getByLabel('Электронная почта:');
  const phone = page.getByLabel('Телефон:');
  const comments = page.getByLabel('Комментарии:');
  const country = page.getByLabel('Страна:');

  await userName.fill('Алексей');
  await email.fill('alex@example.com');
  await phone.fill('+7 (123) 456-78-90');
  await comments.fill('Тестовый комментарий');
  await country.selectOption('kz');

  await expect(userName).toHaveValue('Алексей');
  await expect(email).toHaveValue('alex@example.com');
  await expect(phone).toHaveValue('+7 (123) 456-78-90');
  await expect(comments).toHaveValue('Тестовый комментарий');
  await expect(country).toHaveValue('kz');
});

test('3. Проверка сброса формы', async ({ page }) => {
  // Задание: Проверить сброс значений формы к начальным
  // 1. Изменить поле "Имя пользователя" на "Петр"
  // 2. Изменить поле "Электронная почта" на "test@test.ru"
  // 3. Выбрать в списке "Страна" значение "Беларусь" (by)
  // 4. Нажать кнопку "Сбросить"
  // 5. Проверить что поле "Имя пользователя" содержит "Гость"
  // 6. Проверить что поле "Электронная почта" пустое
  // 7. Проверить что поле "Телефон" содержит "+7"
  // 8. Проверить что список "Страна" содержит значение "ru"

  const userName = page.getByLabel('Имя пользователя:');
  const email = page.getByLabel('Электронная почта:');
  const phone = page.getByLabel('Телефон:');
  const comments = page.getByLabel('Комментарии:');
  const country = page.getByLabel('Страна:');
  const resetButton = page.locator('#reset-btn');

  await userName.fill('Петр');
  await email.fill('test@test.ru');
  await country.selectOption('by');

  await resetButton.click();

  await expect(userName).toHaveValue('Гость');
  await expect(email).toHaveValue('');
  await expect(phone).toHaveValue('+7');
  await expect(country).toHaveValue('ru');
});

test('4. Проверка обновления данных', async ({ page }) => {
  // Задание: Проверить отображение введенных данных
  // 1. Заполнить поле "Имя пользователя" значением "Мария"
  // 2. Заполнить поле "Электронная почта" значением "maria@mail.ru"
  // 3. Заполнить поле "Комментарии" значением "Важный комментарий"
  // 4. Нажать кнопку "Обновить данные"
  // 5. Проверить что в блоке вывода содержится текст с введенными данными

  const userName = page.getByLabel('Имя пользователя:');
  const email = page.getByLabel('Электронная почта:');
  const comments = page.getByLabel('Комментарии:');
  const updateButton = page.getByRole('button', { name: 'Обновить данные' });
  const outputTextContent = page.locator('#output');

  await userName.fill('Мария');
  await email.fill('maria@mail.ru');
  await comments.fill('Важный комментарий');
  await updateButton.click();

  await expect(outputTextContent).toContainText('Мария');
  await expect(outputTextContent).toContainText('maria@mail.ru');
  await expect(outputTextContent).toContainText('Важный комментарий');
});

test('5. Проверка пустых значений', async ({ page }) => {
  // Задание: Проверить обработку пустых значений
  // 1. Очистить поле "Имя пользователя"
  // 2. Очистить поле "Телефон"
  // 3. Выбрать пустое значение в списке "Страна"
  // 4. Проверить что поле "Имя пользователя" пустое
  // 5. Проверить что поле "Телефон" пустое
  // 6. Проверить что список "Страна" содержит пустое значение
  // 7. Проверить что изначально пустое поле "Электронная почта" осталось пустым

  const userName = page.getByLabel('Имя пользователя:');
  const phone = page.getByLabel('Телефон:');
  const country = page.getByLabel('Страна:');
  const email = page.getByLabel('Электронная почта:');

  await userName.clear();
  await phone.clear();
  await country.selectOption('');

  await expect(userName).toHaveValue('');
  await expect(phone).toHaveValue('');
  await expect(country).toHaveValue('');
  await expect(email).toHaveValue('');
});
