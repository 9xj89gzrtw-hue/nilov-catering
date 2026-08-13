"use client";

import { useState } from "react";

const VACANCIES = [
  {
    id: "chef",
    title: "Шеф-повар",
    department: "Кухня",
    type: "Полная занятость",
    salary: "от 120 000 ₽",
    experience: "От 5 лет",
    emoji: "👨‍🍳",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    description: "Французская и итальянская кухня. Работа на выезде, управление бригадой.",
    requirements: [
      "Опыт работы шефом от 5 лет в кейтеринге или ресторане",
      "Знание технологий европейской кухни",
      "Умение работать в условиях выездного обслуживания",
      "Наличие санитарной книжки",
      "Лидерские качества, ответственность",
    ],
    image: "/images/team/chef-nilov.jpg",
    hot: true,
  },
  {
    id: "manager",
    title: "Менеджер событий",
    department: "Продажи",
    type: "Полная занятость",
    salary: "от 80 000 ₽ + % с заказа",
    experience: "От 2 лет",
    emoji: "💼",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    description: "Работа с клиентами, расчёт смет, координация событий от А до Я.",
    requirements: [
      "Опыт в сфере мероприятий или HoReCa",
      "Коммуникабельность, грамотная речь",
      "Навыки переговоров и продаж",
      "Наличие автомобиля — преимущество",
      "Стрессоустойчивость, многозадачность",
    ],
    image: "/images/team/manager.jpg",
    hot: false,
  },
  {
    id: "pastry",
    title: "Кондитер",
    department: "Кухня",
    type: "Полная / Частичная",
    salary: "от 60 000 ₽",
    experience: "От 3 лет",
    emoji: "🧁",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
        />
      </svg>
    ),
    description: "Торты, десерты, капкейки, авторские сладкие столы.",
    requirements: [
      "Опыт работы кондитером от 3 лет",
      "Портфолио работ обязательно",
      "Знание кондитерского искусства",
      "Творческий подход к оформлению",
      "Внимание к деталям",
    ],
    image: "/images/team/pastry-chef.svg",
    hot: false,
  },
  {
    id: "waiter",
    title: "Официант (выездной)",
    type: "По сменам",
    salary: "от 3 500 ₽/смена + чаевые",
    experience: "От 1 года",
    emoji: "🍽️",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
    description: "Обслуживание на банкетах, фуршетах, корпоративах по всему СПб.",
    requirements: [
      "Опыт работы официантом от 1 года",
      "Знание правил сервировки и этикета",
      "Аккуратный внешний вид",
      "Английский язык — преимущество",
      "Пунктуальность, доброжелательность",
    ],
    image: "/images/catering/staff-02-480.webp",
    hot: true,
  },
  {
    id: "cook",
    title: "Повар (линия)",
    department: "Кухня",
    type: "Полная занятость",
    salary: "от 65 000 ₽",
    experience: "От 2 лет",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
      </svg>
    ),
    description: "Приготовление блюд на производстве и на площадках клиента.",
    requirements: [
      "Опыт повара от 2 лет",
      "Санитарная книжка",
      "Готовность к работе на выезде",
      "Исполнительность, чистоплотность",
      "Любовь к своему делу",
    ],
    image: "/images/restaurant/kitchen.svg",
    hot: false,
  },
];

const departmentColors: Record<string, string> = {
  Кухня: "bg-orange-100 text-orange-700",
  Продажи: "bg-blue-100 text-blue-700",
};

export default function CareersClient() {
  const [selectedVacancy, setSelectedVacancy] = useState(VACANCIES[0].id);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vacancy: VACANCIES[0].id,
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the API call
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Vacancies Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {VACANCIES.map((v) => (
          <div
            key={v.id}
            className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
              selectedVacancy === v.id
                ? "border-gold-text shadow-gold/20 shadow-lg"
                : "border-line hover:border-gold/50 hover:shadow-md"
            }`}
          >
            {/* Header */}
            <div className="border-line bg-card border-b p-5">
              <div className="flex items-start gap-4">
                {/* Icon with Emoji */}
                <div
                  className={`relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${
                    selectedVacancy === v.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {v.icon}
                  {v.emoji && <span className="absolute -top-1 -right-1 text-lg">{v.emoji}</span>}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-heading truncate text-lg font-medium">{v.title}</h3>
                    {v.hot && (
                      <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                        🔥 Срочно
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`rounded-full px-2 py-0.5 font-medium ${departmentColors[v.department ?? ""] || "bg-muted text-muted-foreground"}`}
                    >
                      {v.department}
                    </span>
                    <span>{v.type}</span>
                    <span>·</span>
                    <span className="text-foreground font-semibold">{v.salary}</span>
                  </div>
                </div>

                {/* Select button */}
                <button
                  onClick={() => setSelectedVacancy(v.id)}
                  className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    selectedVacancy === v.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-primary/10"
                  }`}
                >
                  {selectedVacancy === v.id ? "Выбрано" : "Выбрать"}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="bg-card/50 p-5">
              <p className="text-muted-foreground mb-3 text-sm">{v.description}</p>

              {/* Requirements */}
              <ul className="space-y-1.5">
                {v.requirements.slice(0, selectedVacancy === v.id ? undefined : 2).map((req, i) => (
                  <li key={i} className="text-muted-foreground flex items-start gap-2 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>

              {selectedVacancy !== v.id && v.requirements.length > 2 && (
                <button
                  onClick={() => setSelectedVacancy(v.id)}
                  className="text-gold-text hover:text-gold-hover mt-2 text-sm font-medium"
                >
                  Ещё {v.requirements.length - 2} требования →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Application Form */}
      <div id="application-form" className="border-line bg-card rounded-2xl border p-6 md:p-8">
        <h3 className="font-heading mb-2 text-xl font-medium">Откликнуться на вакансию</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          Заполните форму — мы свяжемся с вами в течение 1 рабочего дня.
        </p>

        {isSubmitted ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h4 className="mb-1 font-medium text-green-800">Заявка отправлена!</h4>
            <p className="text-sm text-green-600">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-xl border px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (___) ___-__-__"
                  className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-xl border px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Vacancy select */}
            <div>
              <label htmlFor="vacancy" className="mb-2 block text-sm font-medium">
                Вакансия *
              </label>
              <select
                id="vacancy"
                value={formData.vacancy}
                onChange={(e) => setFormData({ ...formData, vacancy: e.target.value })}
                className="border-input bg-background text-foreground focus:ring-ring w-full cursor-pointer appearance-none rounded-xl border px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
              >
                {VACANCIES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title} — {v.salary}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                О себе или ссылка на резюме
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Расскажите о вашем опыте, прикрепите ссылку на резюме (hh.ru, LinkedIn)..."
                className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full resize-none rounded-xl border px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 touch-target shadow-primary/20 inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold shadow-lg transition-colors"
              >
                Отправить заявку
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>

              <a
                href={`mailto:info@nilov-catering.ru?subject=Вакансия: ${VACANCIES.find((v) => v.id === formData.vacancy)?.title}`}
                className="border-line hover:border-gold-text touch-target inline-flex items-center justify-center gap-2 rounded-lg border px-8 py-3.5 text-sm font-semibold transition-colors"
              >
                Отправить резюме на email
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
