import { test, expect } from '@playwright/test';

test.describe('Продвинутые CSS-селекторы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_css');
  });

  // Было: "Комбинированные условия поиска" (два разных сценария в одном)
  // Стало: два чистых, атомарных теста

  test('Найти карточку товара с классом featured и ценой 49 999 ₽', async ({ page }) => {
    const featuredSmartphonePrice = page.locator(
      '.product-card.featured:has-text("Смартфон") .price-value',
    );

    // Сначала ждём, пока элемент станет видимым (защита от гонки условий)
    await expect(featuredSmartphonePrice).toBeVisible();

    // toContainText спасает от лишних пробелов и скрытых символов, которые ломают toHaveText
    await expect(featuredSmartphonePrice).toContainText('49 999');
  });

  test('Найти активную кнопку отправки в форме регистрации', async ({ page }) => {
    const submitButton = page.locator('#registration-form > .btn.submit-btn:not([disabled])');

    await expect(submitButton).toBeVisible();
    // toBeEnabled() — самый надежный способ проверить, что кнопка не disabled
    await expect(submitButton).toBeEnabled();
  });
});

test.describe('Динамический контент с условиями', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_css');
  });

  test('Фильтрация динамических элементов', async ({ page }) => {
    // 1. Динамическая кнопка: класс disabled, текст "Недоступно", не type="submit"
    const dynamicButton = page.locator(
      '#dynamic-content .btn.disabled:has-text("Недоступно"):not([type="submit"])',
    );
    // Увеличили таймаут, так как это динамический контент
    await expect(dynamicButton).toBeVisible({ timeout: 5000 });

    // 2. Динамический товар: не featured, цена содержит "9"
    const cheapProduct = page.locator(
      '#dynamic-content .product-card:not(.featured) .price-value:has-text("9")',
    );

    await expect(cheapProduct).toBeVisible();
    // Опять же, toContainText вместо toHaveText для стабильности
    await expect(cheapProduct).toContainText('9 999');
  });

  test('Комбинации с :has и :not', async ({ page }) => {
    // 1. Карточки без sold-out, внутри которых есть кнопка "В корзину"
    const availableProducts = page.locator(
      '.product-card:not(.sold-out):has(.btn:has-text("В корзину"))',
    );
    await expect(availableProducts).toHaveCount(2);

    // 2. Ячейки таблицы: строки с активными пользователями, но не ячейки с email (не 3-й столбец)
    const activeUserCells = page.locator(
      '#user-table tr:has(.status-active) td:not(:nth-child(3))',
    );
    await expect(activeUserCells).toHaveCount(3); // ID, Имя, Статус
  });
});
