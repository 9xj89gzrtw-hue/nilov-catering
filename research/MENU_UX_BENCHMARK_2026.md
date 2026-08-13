# Catering Menu UX Benchmark — NiloV vs CanapeClub / A-Catering / Catery / Eva-Catering

> Owner pain: «меню вообще неудобное просматривать и собирать».
> Research date: 2026 (z-ai page_reader on canapeclub.ru, a-catering.com, catery.ru, eva-catering.ru + NiloV source audit).

---

## 0. TL;DR — the one-paragraph diagnosis

NiloV's catalog is a **well-engineered Pinterest feed** (124 dishes, 5 stations, allergen filters, drag‑and‑drop constructor) but it **breaks the fundamental "browse → add → keep browsing" loop**: every "Открыть в конструкторе →" click on a DishCard navigates away from `/menu/catalog` to `/plan/constructor` and **wipes the cart** (`store.clearItems(); store.addDish(dishParam)` in `ConstructorWizard.tsx:135‑137`). So a user who wants to assemble a 12‑dish menu has to click 12 times, with 12 page navigations, and loses their previous picks on visit #2. CanapeClub, A‑Catering, Eva and Catery all solve this with a **persistent in‑page cart** — and that is the #1 fix.

---

## 1. Competitor teardown

### 1.1 CanapeClub.ru — **e‑commerce OpenCart catalog + cart**

- **Stack**: OpenCart (`catalog/view/`), jQuery 2.1, Slick carousel, Magnific Popup, mmlivesearch (live search), Bootstrap.
- **Layout**: classic e‑commerce. Mega‑menu categories: Фуршетное меню · Кейтеринг · Готовые сеты · Премиум · Канапе · Тарталетки · Десерты · Выпечка · Шашлык · Кухни мира · Доставка домашней еды · Бизнес‑ланчи · Напитки и посуда · Организация праздников.
- **Dish presentation**: product card grid (square photo + name + price + "В корзину" button). Hover state lifts the card.
- **Menu building**: full e‑commerce cart ("Корзина" in header), `__PRODUCT_IN_BASKET_BUTTON_TEXT` shows "Товар в корзине" / "В корзине" inline on the button after add. Live search across the catalog.
- **Tariff modal pattern**: each format opens a Magnific Popup modal with structured fields — **Норма** (от 450 г/чел), **Включено** (закуски, напитки, посуда, столы, официанты), **Подходит для** (кейсы). Six+ named tariffs: Фуршет «Стандарт» от 2100₽, Фуршет «ВИП» от 6000₽, Фуршет «Премиум» от 3500₽, Приветственный фуршет от 1500₽, Лёгкий кофе‑брейк от 1500₽, Кофе‑брейк «Премиум» от 3500₽, Выездной пикник от 2100₽, Барбекю от 3500₽.
- **Named sets**: "Сет Премиум 21–25 персон 31 820₽", "Фуршетный сет «Ели мясо мужики» 24 830₽".
- **Filters**: by category (dropdown mega‑menu), by tags (Хиты, Скидки), live search.
- **Mobile**: hamburger "Еще", sticky header, sticky "Каталог" CTA.
- **Bonus**: 500 баллов новым пользователям приложения.
- **Animations**: Slick carousel autoplay, Magnific fade‑in modal, button color shift on add‑to‑cart.

### 1.2 A-Catering.com — **named format packages + named food stations**

- **Stack**: UIkit 3 (`.uk-notouch`, `.uk-grid`), Owl Carousel (`.four-menu-slider .owl-nav`), Fira Sans + Philosopher fonts, Yandex SmartCaptcha.
- **Layout**: format‑first index page (`/menyu`) → individual format pages (Банкет, Фуршет, Кофе‑брейк, Гриль, Свадебное, На теплоход, Детям, Коптильня «Копчёный Пёс», Плов станция, Барашек на вертеле, Зал Гирлянда).
- **Dish presentation**: format page shows curated package composition. Owl Carousel slider `.four-menu-slider` (4 items per slide, navigation arrows at `top:-130px`).
- **Menu building**: cart in header — `КОРЗИНА ( 0 ₽) 0 шт.`. "Подбор меню" sidebar CTA.
- **Food stations as named packages**: 20+ named stations each on its own page — Бургеры и Хот‑дог, Плов станция в настоящем казане, Баран на вертеле, Салат‑бар, Хамонера, Sea food bar, Сырный бар, Бельгийские и гонконгские вафли, Стойка с пончиками, Станция с мороженым, Тайское жареное мороженое, Сахарная вата, Шоколадный фонтан, Попкорн станция, Кенди‑бар, Лимонадный Бар, Горячие напитки, Разливное пиво, Бар алкогольный/безалкогольный, Горка с шампанским, Масленица с блинами.
- **Discount anchor**: 5% / 10% / 15% за бронирование за 1 / 2 / 3 месяца — visible above the fold.
- **Cart UX**: "Вы еще ничего не выбрали" empty state, "Продолжить покупки" / "В корзину" modal toggle.
- **Personalisation**: Личный координатор, Повар по вызову, Аренда мебели, Закупка напитков, Фирменные блюда, Декорации в подарок — listed as cross‑sell services.
- **Mobile**: hamburger nav, sticky call buttons (3 phone numbers).
- **Animations**: Owl Carousel slide, hover lift on cards, smooth scroll.

### 1.3 Catery.ru — **aggregator with comparison grid**

- **Stack**: React SPA (`data-react-helmet`), CDN static (`cdn-s-static.catery.ru`), Yandex Maps, Jivosite chat, code splitting (`vendor.a60bada2.chunk.css`, `bundle.7c82edff.css`).
- **Layout**: search bar + multi‑axis filter sidebar + comparison grid of caterers.
- **Filters**: Новинки, Акции, Экспресс‑кейтеринг, Обслуживание, Аренда, НДС не важен · **Блюда** (Боксы, Канапе, Закуски, Бургеры, Сэндвичи, Тарталетки, Пицца, Барбекю, Салаты, Пироги + «Еще...») · **Вид кейтеринга** (Фуршет, Банкет, Кофе‑брейк, Барбекю, Доставка готовых блюд, Сладкий кейтеринг, Фан кейтеринг, Фудтрак) · **Бюджет** (Любой, $, $$, $$$).
- **Comparison card per caterer** (94 found): rating (4,6/4,7), minimum order (1 000₽), delivery zones broken out (Москва‑сити: 2 200₽, внутри ТТК: 1 000₽, внутри МКАД: 1 200₽, МО: +100₽/км), free‑delivery threshold (бесплатно от 8 000₽), reviews count (555 оценок, 358 отзывов), last order time ("9 часов назад"), preparation lead time ("Принимает заказы за 10 часов").
- **Top dishes preview per caterer**: 10 dishes inline with weight+price (Сет из 50 брускетт 1.9кг 7 500₽; Фуршетный сет из 80 закусок 1.2кг 7 200₽; «Для милых дам» 1.6кг 8 900₽ → 8 790₽ strikethrough) and "Посмотреть все меню" link.
- **Named sets per caterer**: Jet Фуршет, «Канапе Пати», «Вумэн Пати», «Healthy Life» №1/№2, «Долгожданная встреча», «Ди Парма», «Корпоратив Классик», «Романтическая Коллекция», «Мясоед», «Баффало Друзьям», «Баффало Закусочный», «Праздник», «Компания», «Добрая беседа», «Вечер танцев», «Баффало», «Женская вечеринка», «С мужским характером», «Стандарт», «Стандарт +», «Выгодный», «Люкс», «Максимальный», «Матрешка», «Доброе утро».
- **Bonus system**: "3x Бонусов", "Подарок в день рождения", "Скидки на сеты".
- **Smart assist CTA**: "Затрудняетесь с выбором? Поможем с подбором меню! Оставить заявку".
- **Context input in header**: "Москва, укажите адрес, дату и время" — filters results by logistics.
- **Pagination**: rel="next" across pages of caterers.
- **Mobile**: viewport `user-scalable=no` (locked zoom), sticky filter chips, sticky bottom chat.

### 1.4 Eva-Catering.ru — **numbered tiered menu ladder (the simplest mental model)**

- **Stack**: custom MODX, jQuery, Fancybox, Google reCAPTCHA v3, Roboto Flex.
- **Layout**: numbered list of complete menus, one per tier.
- **7 numbered furchet menus** as a clean price ladder:

  | #   | Выход | Цена   |
  | --- | ----- | ------ |
  | 1   | 620 г | 2 300₽ |
  | 2   | 710 г | 2 800₽ |
  | 3   | 800 г | 3 350₽ |
  | 4   | 815 г | 4 200₽ |
  | 5   | 885 г | 4 500₽ |
  | 6   | 895 г | 4 700₽ |
  | 7   | 885 г | 6 000₽ |

  Each menu card lists full composition: Холодные закуски → Салаты в «баночке» → Горячие закуски → Фрукты и десерты → Напитки — **every dish with weight** ("Брускетта с лососем шеф посола 50 г", "Канапе с сыром и виноградом 30 г", "Мини‑бургер с жареным цыпленком 100 г"). "Заказать" button per menu.

- **Choice statement**: "Вы можете выбрать из готовых вариантов или составить индивидуальное меню" — clear binary.
- **Cross‑sell block**: Дополнительные услуги (Цветы и декор от 1 500₽, Праздничный торт от 2 650₽, Коктейль‑бар от 15 000₽).
- **Sticky cart**: "Ваш заказ 0 позиций · Для заказов до 7 000 руб. доставка — 1 000 руб. · Корзина пуста · Общая стоимость (0 позиций) 0 ₽" — always visible.
- **Mobile**: hamburger, sticky bottom cart, Fancybox gallery.
- **Animations**: simple, restrained — card hover, Fancybox transitions.

### 1.5 Cross‑competitor scorecard

| Feature                                | CanapeClub              | A‑Catering      | Catery            | Eva           | **NiloV today**                           |
| -------------------------------------- | ----------------------- | --------------- | ----------------- | ------------- | ----------------------------------------- |
| Persistent cart visible on catalog     | ✅ header               | ✅ header       | ✅ header         | ✅ sticky     | ❌ only in constructor                    |
| Add multiple dishes without navigation | ✅                      | ✅              | ✅                | ✅            | ❌ each click clears cart                 |
| Named packages / sets                  | ✅ «Ели мясо мужики»    | ✅ 20+ stations | ✅ «Healthy Life» | ✅ #1–#7      | ⚠️ has tariffs but hidden in wizard       |
| Tiered price ladder                    | ✅ VIP/Премиум/Стандарт | ⚠️ formats only | ✅ $/$$/$$$       | ✅ #1→#7      | ⚠️ economy/standard/premium/luxury hidden |
| Per‑dish weight (г)                    | ❌                      | ❌              | ✅ kg per set     | ✅ every dish | ❌ description only                       |
| Live search                            | ✅ mmlivesearch         | ❌              | ✅                | ❌            | ✅ input search                           |
| Filters (diet/allergen)                | ❌                      | ❌              | ✅ format/budget  | ❌            | ✅ best‑in‑class allergen filters         |
| Drag‑and‑drop menu builder             | ❌                      | ❌              | ❌                | ❌            | ✅ dnd‑kit (unique advantage!)            |
| Live total while building              | ✅ cart                 | ✅ cart         | ✅ cart           | ✅ cart       | ⚠️ only in constructor step 1             |
| Saved menus / share link               | ❌                      | ❌              | ⚠️ profile        | ❌            | ⚠️ share button only                      |
| Food stations as named items           | ⚠️                      | ✅ 20+          | ⚠️                | ❌            | ⚠️ has «show» station only                |
| Cross‑sell services block              | ⚠️                      | ✅              | ✅                | ✅            | ⚠️ add‑ons only in wizard                 |
| Mobile bottom sheet cart               | ✅                      | ✅              | ✅                | ✅            | ❌                                        |

**Verdict**: NiloV has the **best allergen/diet filtering** and the **only real drag‑and‑drop constructor** in the market — but loses on **cart persistence**, **named packages**, **per‑dish weights**, and **price‑tier ladders**.

---

## 2. Top 10 menu UX patterns NiloV should adopt

### Pattern 1 — **In‑page persistent cart on `/menu/catalog`**

**What**: Add a sticky "Корзина меню" panel (right rail on desktop ≥1280px, bottom sheet on mobile) that stays visible while browsing dishes. Each "Добавить" click on a DishCard adds to the cart **without navigating away**.
**Why**: All 4 competitors do this. NiloV's current "Открыть в конструкторе →" link breaks the browse loop.
**Example**: CanapeClub's `__PRODUCT_IN_BASKET_BUTTON_TEXT` flips the card button from "В корзину" to "В корзине" instantly. Eva's sticky "Ваш заказ N позиций · X ₽" stays on screen while you scroll 7 menu cards.

### Pattern 2 — **Named package sets, not just 124 flat dishes**

**What**: Surface 6–10 named sets on the catalog page (above the dish grid): «Фуршет Лёгкий 1500₽/чел», «Фуршет Премиум 3500₽/чел», «Банкет Стандарт 2500₽/чел», «Кофе‑брейк на 15 чел 6800₽», «Свадебный сет на 50 чел 145 000₽», «Веган‑фуршет на 20 чел», «Детский праздник 12 чел», «Корпоратив‑Классик 100 чел».
**Why**: Eva's #1–#7 ladder and Catery's named sets ("Healthy Life №1", "Женская вечеринка", «Мужской характер») give customers an instant anchor. NiloV already has `DELIVERY_PRESETS` (coffee‑break‑15, coffee‑break‑40) in `useDeliveryCart.ts:33` — extend this pattern to the main catalog.
**Example**: A "Готовые сеты" row above the "Шеф рекомендует" section, each card → `?set=coffee-break-15` preloads the cart.

### Pattern 3 — **Tiered price ladder visible as comparable cards**

**What**: Show 3–4 tier cards side‑by‑side: Эконом / Стандарт / Премиум / Люкс — each with price/guest, weight/guest (выход), 3‑4 signature dishes, "Что входит" (посуда, официанты, столы), "Подходит для" (свадьба, корпоратив, день рождения).
**Why**: Eva's #1→#7 ladder converts browsers into orders because customers compare prices, not dishes. CanapeClub uses the same pattern in its tariff modals ("Фуршет Стандарт 2100₽ / Фуршет Премиум 3500₽ / Фуршет ВИП 6000₽").
**Example**: Replace the existing `MenuTariffs.tsx` block with an interactive 3‑column comparison card with a sticky "Выбрать" button per tier.

### Pattern 4 — **Per‑dish weight + per‑guest servings, structured**

**What**: On every DishCard, add a structured line: `50 г · 2 шт/гость` (weight × servingsPerGuest). Currently the catalog only shows `190 ₽/гость`.
**Why**: Eva shows «Брускетта с лососем шеф посола 50 г», «Канапе с сыром и виноградом 30 г» — customers can mentally total the per‑guest plate weight. Catery shows «1.9 кг» per set. NiloV already has `servingsPerGuest` on every dish in `menu-data.ts` (e.g. `canape-salmon` has `servingsPerGuest: 2`) — surface it.

### Pattern 5 — **"Подбор меню" wizard CTA on catalog**

**What**: Add a prominent "Затрудняетесь с выбором? Поможем подобрать меню за 2 минуты" CTA at the top of the catalog. Clicking opens a 3‑question quiz (сколько гостей? формат? бюджет?) → suggests 2‑3 named sets.
**Why**: Catery's "Затрудняетесь с выбором? Поможем с подбором меню! Оставить заявку" and A‑Catering's "Подбор меню" sidebar CTA capture users who are overwhelmed by 124 dishes. This is exactly the user NiloV's owner is describing.

### Pattern 6 — **Food stations as named packages, not a flat filter chip**

**What**: Today the catalog has a "Шоу‑станции" station filter. Replace/augment with 8–12 named station cards: Хамонера, Сырный бар, Sea food bar, Шоколадный фонтан, Кенди‑бар, Пончик‑стена, Лимонадный бар, Горка с шампанским, Масленица с блинами, Плов‑станция, Баран на вертеле, Бургер‑станция. Each card shows photo + 1‑line description + "Добавить станцию" button (price is per event, not per guest).
**Why**: A‑Catering lists 20+ named stations — they're high‑margin, high‑wow products that don't fit the per‑guest dish model. Hiding them as a station filter under‑sells them.

### Pattern 7 — **Cross‑sell services block**

**What**: Below the dish grid, add a "Дополнительно" section with named service cards: Личный координатор, Повар по вызову, Аренда мебели и текстиля, Закупка напитков, Фирменные блюда, Декорации в подарок, Флористика, Видео/фото, Ведущий, Аниматор, Сомелье.
**Why**: A‑Catering, Eva, Catery all surface this on the menu page. NiloV has add‑ons in the wizard (`toggleAddOn`) but they're invisible on the catalog.

### Pattern 8 — **Comparison view for similar dishes**

**What**: "Сравнить" toggle on each DishCard → adds dish to a 2‑4 slot comparison tray that floats at the bottom. Tray shows side‑by‑side: фото, цена/гость, вес, аллергены, диеты, КБЖУ. "Выбрать" → adds winner to cart.
**Why**: Catery's whole model is comparison. For catering, customers compare 2‑3 similar canapés or 2‑3 hot mains before deciding. NiloV's catalog forces them to scroll back and forth.

### Pattern 9 — **Saved menus + shareable link**

**What**: Add "Сохранить меню" button in the cart → generates `/menu/saved/{id}` URL with the dish list + guest count. Email or share via WhatsApp/Telegram.
**Why**: Catery has a profile with order history. NiloV has `ShareButton` in the constructor but not on the catalog. Catering decisions are usually made by 2–3 people (organizer + boss + spouse) — shareable links are critical.

### Pattern 10 — **Mobile bottom sheet cart with swipe‑up**

**What**: On mobile (<768px), the cart becomes a 56px‑tall sticky bar at the bottom showing `🛒 3 блюда · 4 200₽`. Swipe up (or tap) expands a bottom sheet with the full cart, qty steppers, and "Перейти к оформлению" CTA.
**Why**: All 4 competitors have this on mobile. NiloV's mobile menu experience today is just the desktop grid squished — no sticky cart, no bottom sheet.

---

## 3. How the menu builder should work — step‑by‑step user flow

This is the idealised flow that fixes "собирать неудобно":

### Step 0 — **Entry**

User lands on `/menu/catalog`. Sees, top to bottom:

1. Hero strip: "124 блюда · 7 категорий · Цены от 100₽/гость" + search bar + "Подобрать меню за 2 мин" CTA.
2. **Готовые сеты** carousel (6–8 named packages with prices).
3. **Тарифы** comparison row (Эконом / Стандарт / Премиум / Люкс cards).
4. **Шеф рекомендует** (8 dishes, already exists).
5. Station‑grouped dish grid (already exists).
6. **Шоу‑станции** named package grid.
7. **Дополнительно** services grid.
8. Footer CTAs: PDF, "Собрать меню в конструкторе", "В заказ доставки".

### Step 1 — **Browse + add**

User clicks "Добавить" on any DishCard. Dish animates (fly‑to‑cart) into the **sticky cart rail** (right side on desktop, bottom bar on mobile). Card button flips to "✓ В корзине · 2 порц" with a `−` / `+` stepper. **No navigation.** User keeps scrolling and adds 5–10 more dishes.

### Step 2 — **Cart review (in‑page drawer)**

User clicks the cart bar. Drawer slides in from the right (or bottom sheet on mobile) showing:

- Guest count stepper at top (`Гостей: 20  −  +`).
- Per‑dish row: thumbnail · name · qty stepper · price · remove.
- Live total updates as qty changes.
- "Перейти в конструктор" CTA → opens `/plan/constructor` with the cart preloaded.
- "Сохранить меню" CTA → generates shareable link.

### Step 3 — **Constructor (deeper customisation)**

User lands on `/plan/constructor?fromCart=1`. Constructor loads with the cart already populated (NOT cleared). User can:

- Reorder dishes via drag‑and‑drop (already exists via dnd‑kit).
- Adjust qty per dish (already exists).
- Add guest groups (already exists: «Веганы 10 чел + Халяль 8 чел + Всеядные 12 чел»).
- Switch tier (preset → custom or back).
- Add cross‑sell services.
- See live total breakdown (base + addons + service + gamma discount).

### Step 4 — **Contacts + submit**

Already exists. Step 2 in current wizard.

### Step 5 — **Confirmation + share**

Already exists. Step 3 in current wizard.

### Critical fix to make this work

**Remove the destructive `store.clearItems()` call in `ConstructorWizard.tsx:135‑137`**. Replace with: if `?fromCart=1` is present, load cart as‑is. If `?dish=X` is present without `?fromCart=1`, _append_ X to the existing cart instead of clearing.

---

## 4. Interactive features that are missing

| Feature                                | Status today                                                            | What's missing                                                                                      |
| -------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **In‑page add‑to‑cart from catalog**   | ❌ catalog links to constructor                                         | DishCard "Добавить" button writes to a shared cart store (NOT navigation)                           |
| **Persistent cart across pages**       | ⚠️ `useConstructor` is persisted via zustand but never shown on catalog | Render `<CartRail/>` on `/menu/catalog` that reads from `useConstructor`                            |
| **Live total on catalog**              | ❌                                                                      | Show `20 гостей · 5 блюд · 4 200₽` in the cart rail                                                 |
| **Qty stepper on DishCard**            | ❌ card has "Открыть в конструкторе" only                               | `−` `+` stepper appears once dish is in cart                                                        |
| **Fly‑to‑cart animation**              | ❌                                                                      | Framer Motion: card photo tweens to cart icon on click                                              |
| **Comparison tray**                    | ❌                                                                      | "Сравнить" toggle → bottom tray with 2–4 dishes side by side                                        |
| **Saved menus / shareable URLs**       | ⚠️ `ShareButton` exists in constructor only                             | Generate `/menu/saved/{id}` short links from the catalog cart                                       |
| **Drag‑and‑drop FROM catalog TO cart** | ⚠️ dnd‑kit exists but only inside constructor                           | Make DishCards draggable; cart rail is the drop zone (already pattern‑matched in `MenuBuilder.tsx`) |
| **Bottom sheet on mobile**             | ❌                                                                      | Implement `BottomSheet` component (use existing `useFocusTrap` hook)                                |
| **Smart Save (email capture)**         | ⚠️ `showSaveDialog` exists in wizard only                               | Trigger after user adds 5+ dishes on catalog — "Сохранить меню, чтобы не потерять? Введите email"   |
| **Per‑dish weight display**            | ❌                                                                      | Show `50 г · 2 шт/гость` on card                                                                    |
| **Recent / popular dishes**            | ❌                                                                      | "Смотрели недавно" rail (track via localStorage)                                                    |
| **Filter by weight per guest**         | ❌                                                                      | Add "Выход на гостя: 200г / 400г / 600г / 800г+" filter chips                                       |
| **Filter by price per guest**          | ❌                                                                      | Add "До 200₽ / 200–400₽ / 400–600₽ / 600₽+" filter chips                                            |
| **Sticky format context**              | ❌                                                                      | "Я собираю меню на: Свадьба · 50 гостей · Банкет" pill at top of catalog, editable inline           |
| **Cart min‑order warning**             | ⚠️ only in wizard                                                       | Show "Минимальный заказ: 30 000₽ для фуршета" in catalog cart rail                                  |
| **"Добавить всё из раздела"**          | ❌                                                                      | At the bottom of each station section: "Добавить все 24 холодных закуски"                           |

---

## 5. Animations that create a "wow effect"

### 5.1 Fly‑to‑cart

When user clicks "Добавить" on a DishCard, the dish photo clones, shrinks, and tweens along a bezier curve into the cart icon in the header. Cart count bumps with a spring. Use Framer Motion `layoutId` + `motion.div`.

```tsx
<motion.div layoutId={`dish-img-${dish.id}`}>
  <FoodPhoto .../>
</motion.div>
// On click:
animate(layoutId) → fly to cart icon coordinates
```

### 5.2 Card hover — subtle 3D tilt (already partially exists as `drinqit-3d`)

The catalog already has `drinqit-3d` class on DishCards. Extend it: on mousemove, tilt the card ±3° based on cursor position (vanilla‑JS pointer handler, no library). Add a soft gold glow on the border.

### 5.3 Sticky filter bar — morph on scroll

The current sticky filter bar at `top-16` is functional but static. On scroll past 200px, morph it: collapse the search input into a search icon, hide the "Сбросить" link, shrink the height from 64px → 48px. Reverse on scroll up.

### 5.4 Cart rail — slide‑in with backdrop

Desktop: cart rail slides in from the right (width 380px), pushing main content left by 380px (or overlay with semi‑transparent backdrop). Use Framer Motion `AnimatePresence` + `motion.aside` with `initial={{x: '100%'}}` → `animate={{x: 0}}` → `exit={{x: '100%'}}`.

### 5.5 Live total — count‑up animation

When total changes, animate the number from old → new value over 400ms with `AnimatedCounter` (already exists at `components/effects/AnimatedCounter.tsx`). Add a brief gold flash on the price text.

### 5.6 Tier comparison cards — staggered reveal

When the "Тарифы" section enters viewport (use existing `TextReveal` or new IntersectionObserver), the 4 tier cards reveal with a 80ms stagger: card 1 fades up, card 2 fades up 80ms later, etc. The "popular" tier (Standard) gets a slight scale‑up + gold ring.

### 5.7 Mobile bottom sheet — spring physics

Bottom sheet cart uses spring physics: drag down 30% to dismiss, drag up to expand to full screen. Framer Motion `drag="y"` + `dragConstraints` + `dragElastic={0.2}`.

### 5.8 Dish card image — Ken Burns on hover

On card hover (desktop), the dish photo slowly zooms 1.0 → 1.08 over 800ms with a slight pan — the "alive photo" effect. Already have `PhotoAliveCard.tsx` component — wire it into DishCard.

### 5.9 "Шеф рекомендует" — auto‑rotating spotlight

Currently the 8 recommended dishes are a static 4×2 grid. Make it a 4‑card carousel that auto‑rotates every 5s with a smooth slide. Pause on hover. On mobile, becomes swipeable (use existing `MenuPreview.tsx` carousel pattern).

### 5.10 Page transition — fade + slide

When navigating from `/menu/catalog` to `/plan/constructor?fromCart=1`, use the existing `PageTransition.tsx` to fade out the catalog and fade in the constructor with a 12px upward slide. Avoid jarring hard navigation.

---

## 6. Specific code recommendations

### 6.1 `/menu/catalog/page.tsx` — the 5 critical changes

**Change A — Add a `useConstructor` cart subscription + sticky CartRail**

```tsx
// At the top of CatalogPage():
import { useConstructor } from "@/hooks/useConstructor";
// ...
const cartItems = useConstructor((s) => s.selectedItems);
const addDish = useConstructor((s) => s.addDish);
const removeDish = useConstructor((s) => s.removeDish);
const setItemQty = useConstructor((s) => s.setItemQty);
const guestCount = useConstructor((s) => s.guestCount);
const total = useConstructor((s) => s.total);

// Render at the end of the main container:
<CartRail
  items={cartItems}
  guestCount={guestCount}
  total={total}
  onQty={setItemQty}
  onRemove={removeDish}
  onCheckout={() => (window.location.href = "/plan/constructor?fromCart=1")}
/>;
```

**Change B — Replace DishCard's "Открыть в конструкторе →" link with an "Добавить" button**

In `DishCard` (lines 473–583), replace:

```tsx
<Link href={constructorHref} className="bg-gold-text mt-auto ... ...">
  Открыть в конструкторе →
</Link>
```

with:

```tsx
{
  isInCart ? (
    <div className="mt-auto flex items-center gap-2">
      <button onClick={() => setItemQty(dish.id, currentQty - 1)}>−</button>
      <span className="flex-1 text-center">
        {currentQty} порц · {currentQty * dish.pricePerGuest}₽
      </span>
      <button onClick={() => setItemQty(dish.id, currentQty + 1)}>+</button>
    </div>
  ) : (
    <button
      onClick={() => {
        addDish(dish.id);
        flyToCart(dish.id);
      }}
      className="bg-gold-text mt-auto ... ..."
    >
      Добавить в меню
    </button>
  );
}
```

**Change C — Add `servingsPerGuest` and weight to the card UI**

In `DishCard`, after the price line (line 528):

```tsx
<span className="text-xs text-gold-text font-semibold whitespace-nowrap">
  {dish.pricePerGuest} ₽<span className="text-muted-foreground font-normal">/гость</span>
</span>
<span className="text-[10px] text-muted-foreground">
  {dish.servingsPerGuest} шт/гость · {dish.weightGrams || '?'} г
</span>
```

Requires adding `weightGrams` to the Dish type in `lib/types.ts` and to each dish in `menu-data.ts` (small data migration).

**Change D — Add a "Готовые сеты" section above "Шеф рекомендует"**

```tsx
<section className="mb-10">
  <h2 className="font-heading mb-4 text-2xl">Готовые сеты</h2>
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    {NAMED_SETS.map((set) => (
      <NamedSetCard key={set.id} set={set} onApply={() => applySet(set.id)} />
    ))}
  </div>
</section>
```

Add a `NAMED_SETS` constant in `lib/menu-data.ts` (modeled on `DELIVERY_PRESETS` in `useDeliveryCart.ts`).

**Change E — Add "Сравнить" toggle on DishCard + ComparisonTray component**

```tsx
// In DishCard:
<button onClick={() => toggleCompare(dish.id)} aria-pressed={isComparing}>
  {isComparing ? '✓ В сравнении' : 'Сравнить'}
</button>

// At bottom of page:
<ComparisonTray items={compareItems} onChoose={addDish} onClose={clearCompare} />
```

### 6.2 `/components/interactive/ConstructorWizard.tsx` — the 2 critical fixes

**Fix 1 — Stop wiping the cart on `?dish=` URL param** (lines 130–144)

Replace:

```tsx
if (dishParam) {
  const dish = ALL_DISHES.find((d) => d.id === dishParam);
  if (dish && !store.selectedItems.find((i) => i.dishId === dishParam)) {
    store.setTierMode("custom");
    store.clearItems(); // ← THIS IS THE BUG
    store.addDish(dishParam);
  }
  // ...
}
```

with:

```tsx
if (dishParam) {
  const dish = ALL_DISHES.find((d) => d.id === dishParam);
  if (dish && !store.selectedItems.find((i) => i.dishId === dishParam)) {
    store.setTierMode("custom");
    // DON'T clear — append to existing cart
    store.addDish(dishParam);
  }
  // ...
}
```

**Fix 2 — Honor `?fromCart=1` to skip the dish‑param logic entirely**

```tsx
const fromCartParam = params.get("fromCart");
// ...
if (fromCartParam === "1") {
  // Cart was assembled on /menu/catalog — just jump to the Меню step
  if (store.tierMode !== "custom") store.setTierMode("custom");
  store.setStep(1);
  return; // skip the rest of the URL‑param logic
}
```

### 6.3 New components to create

| Path                                        | Purpose                                                                          |
| ------------------------------------------- | -------------------------------------------------------------------------------- |
| `components/interactive/CartRail.tsx`       | Right‑rail cart on desktop, bottom sheet on mobile. Reads from `useConstructor`. |
| `components/blocks/NamedSetGrid.tsx`        | Carousel of named packages ("Готовые сеты") on catalog and home.                 |
| `components/blocks/TierComparisonRow.tsx`   | 4 tier cards (Эконом/Стандарт/Премиум/Люкс) with sticky "Выбрать" CTA.           |
| `components/blocks/FoodStationGrid.tsx`     | Named food‑station cards (Хамонера, Сырный бар, etc.).                           |
| `components/blocks/CrossSellServices.tsx`   | "Дополнительно" grid of services (Координатор, Флористика, etc.).                |
| `components/interactive/ComparisonTray.tsx` | Bottom tray for 2–4 dish comparison.                                             |
| `components/interactive/FlyToCart.tsx`      | Framer Motion fly‑to‑cart animation wrapper.                                     |
| `components/interactive/MenuQuiz.tsx`       | 3‑question "Подобрать меню за 2 минуты" modal.                                   |

### 6.4 New data structures in `lib/menu-data.ts`

```ts
export interface NamedSet {
  id: string;
  label: string; // «Фуршет Лёгкий»
  emoji?: string;
  format: Format;
  tier: Tier;
  guests: [number, number]; // [min, max]
  pricePerGuest: number;
  weightPerGuestGrams: number;
  composition: string[]; // dish IDs
  description: string;
  imageUrl?: string;
}

export const NAMED_SETS: NamedSet[] = [
  {
    id: "furshet-light",
    label: "Фуршет Лёгкий",
    format: "furshet",
    tier: "economy",
    guests: [20, 50],
    pricePerGuest: 1500,
    weightPerGuestGrams: 250,
    composition: [
      "canape-salmon",
      "bruschetta-tomato",
      "tartaletka-olivier",
      "mini-burger",
      "cranberry-mors",
    ],
    description: "Лёгкие закуски для приветственной зоны или coffee‑break",
  },
  // ... 6–8 more
];

export interface FoodStation {
  id: string;
  label: string; // «Хамонера»
  emoji: string;
  description: string;
  pricePerEvent: number;
  imageUrl?: string;
}

export const FOOD_STATIONS: FoodStation[] = [
  {
    id: "hamonera",
    label: "Хамонера",
    emoji: "🥩",
    description: "Нарезка хамона резцом на глазах у гостей",
    pricePerEvent: 12000,
  },
  // ... 10–12 more
];
```

### 6.5 Recommended implementation order (2‑week sprint)

**Week 1 — fix the bleed**

1. Fix `ConstructorWizard.tsx:135` (remove `clearItems`).
2. Add `?fromCart=1` support.
3. Create `CartRail.tsx` + render on `/menu/catalog`.
4. Replace DishCard "Открыть в конструкторе →" with "Добавить в меню" button.
5. Add qty steppers to in‑cart DishCards.

**Week 2 — add the "browse like a shop" layer** 6. Add `NAMED_SETS` data + `NamedSetGrid` section. 7. Add `servingsPerGuest` + `weightGrams` to DishCard UI. 8. Add `TierComparisonRow` block. 9. Mobile bottom sheet cart (spring physics). 10. Fly‑to‑cart Framer Motion animation.

**Week 3 (polish)** 11. `FoodStationGrid` for named stations. 12. `CrossSellServices` block. 13. `MenuQuiz` modal "Подобрать за 2 минуты". 14. Saved‑menu shareable URLs (`/menu/saved/{id}`). 15. `ComparisonTray` for side‑by‑side dish comparison.

---

## 7. What NOT to copy from competitors

- **Don't copy Catery's `user-scalable=no`** — it locks zoom and breaks accessibility. NiloV's accessibility work (ITER5_RECHECK_A11Y) is more important than Catery's locked viewport.
- **Don't copy Eva's static 7‑menu list as the only entry** — it's too rigid. Use it as one of several entry points (tier comparison + named sets + free‑form catalog).
- **Don't copy A‑Catering's 3‑phone‑number header** — NiloV's `LiveChatWidget` + sticky CTA is better.
- **Don't copy CanapeClub's OpenCart UIkit** — NiloV's Next.js + Tailwind stack is already ahead.

---

## 8. Measurable success criteria

After implementing the top 10 patterns:

- **Time‑to‑first‑dish‑in‑cart** should drop from "user must navigate to constructor" (current) to "1 click on catalog" (target).
- **Average dishes per submitted cart** should rise from current ~5–8 to 10+ (because the browse‑add loop is no longer broken).
- **Bounce rate on `/menu/catalog`** should drop (currently users bounce to constructor and lose context).
- **Mobile add‑to‑cart conversion** should rise (bottom sheet cart vs. hidden cart in wizard).
- **Owner satisfaction**: «меню вообще неудобное просматривать и собирать» → resolved when cart persists across catalog browsing.
