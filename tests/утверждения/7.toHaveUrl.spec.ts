import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveurl');
});

test('1. Проверка изменения URL при навигации', async ({ page }) => {
  // Задание: Проверить изменение URL при клике по ссылкам
  // 1. Нажать на ссылку "О нас"
  // 2. Проверить что URL изменился и содержит "#about"
  // 3. Нажать на ссылку "Контакты"
  // 4. Проверить что URL изменился и содержит "#contacts"
  // 5. Нажать на ссылку "Главная"
  // 6. Проверить что URL снова содержит "#home"

  const aboutLink = page.getByRole('link', { name: 'О нас' });
  const contactsLink = page.getByRole('link', { name: 'Контакты' });
  const homeLink = page.getByRole('link', { name: 'Главная' });

  await aboutLink.click();
  await expect(page).toHaveURL('https://osstep.github.io/assertion_tohaveurl#about');
  await contactsLink.click();
  await expect(page).toHaveURL('https://osstep.github.io/assertion_tohaveurl#contacts');
  await homeLink.click();
  await expect(page).toHaveURL('https://osstep.github.io/assertion_tohaveurl#home');
});

test('2. Проверка URL при программной навигации', async ({ page }) => {
  // Задание: Проверить URL после программного перехода
  // 1. Нажать кнопку "Перейти в раздел"
  // 2. Проверить что URL изменился на "#contacts"
  // 3. Нажать кнопку "Вернуться назад" (back() в истории)
  // 4. Проверить что URL вернулся к "#home"

  const baseUrl = 'https://osstep.github.io/assertion_tohaveurl';

  const redirectButton = page.getByRole('button', { name: 'Перейти в раздел' });
  const backButton = page.getByRole('button', { name: 'Вернуться назад' });

  await redirectButton.click();
  await expect(page).toHaveURL(`${baseUrl}#contacts`);

  await backButton.click();
  await expect(page).toHaveURL(`${baseUrl}#home`);
});

test('3. Проверка URL после ручного ввода', async ({ page }) => {
  // Задание: Проверить обработку ручного ввода URL
  // 1. Перейти напрямую по URL с хешем "#about"
  // 2. Проверить что страница отображает раздел "О нас"
  // 3. Проверить что URL содержит "#about"
  // 4. Обновить страницу
  // 5. Проверить что URL сохранился с "#about"

  const aboutUrl = 'https://osstep.github.io/assertion_tohaveurl#about';
  const aboutSection = page.locator('#about-section');

  await page.goto(aboutUrl);
  await expect(aboutSection).toBeVisible();
  await expect(page).toHaveURL(/.*#about$/);
  await page.reload();
  await expect(page).toHaveURL(/.*#about$/);
});
