"use client";

import { useState, useMemo } from "react";
import { ALL_DISHES, DISH_CATEGORIES, DIET_FILTERS } from "@/lib/menu-data";
import { getDishImage, getObjectPositionForDish } from "@/lib/dish-images";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FoodPhoto from "@/components/common/FoodPhoto";
import type { Dish, Diet, Allergen } from "@/lib/types";
import { ALLERGEN_LABEL } from "@/lib/types";

const STATIONS = [
  { key: "all", label: "Все" },
  { key: "cold", label: "Холодные" },
  { key: "hot", label: "Горячее" },
  { key: "desserts", label: "Десерты" },
  { key: "drinks", label: "Напитки" },
] as const;

const DIETS: Diet[] = ["vegan", "gluten-free", "halal", "sugar-free", "nut-free"];

// 14 обязательных аллергенов ТР ТС 022/2011 / EU 1169/2011
// Сокращённый набор для UI (топ-6 частых) + expandable для остальных
const TOP_ALLERGENS: Allergen[] = ["nuts", "peanuts", "fish", "milk", "eggs", "soy"];
const EXTRA_ALLERGENS: Allergen[] = [
  "gluten",
  "crustaceans",
  "celery",
  "mustard",
  "sesame",
  "sulphites",
  "lupin",
  "molluscs",
];

const STATION_EMOJI: Record<string, string> = {
  cold: "",
  hot: "",
  desserts: "",
  drinks: "",
  show: "",
};

const ALLERGEN_EMOJI: Record<string, string> = {
  nuts: "",
  peanuts: "",
  fish: "",
  milk: "",
  eggs: "",
  soy: "",
  gluten: "",
  crustaceans: "",
  celery: "",
  mustard: "",
  sesame: "",
  sulphites: "",
  lupin: "",
  molluscs: "",
};

export interface MenuBuilderProps {
  selectedItems: { dishId: string; qty: number }[];
  onAdd: (dishId: string) => void;
  onRemove: (dishId: string) => void;
  onSetQty: (dishId: string, qty: number) => void;
  onReorder?: (fromIdx: number, toIdx: number) => void;
  // Опционально: контролируемые excludedAllergens (если передан — синхронизируются со store)
  excludedAllergens?: Set<Allergen>;
  onExcludedAllergensChange?: (allergens: Set<Allergen>) => void;
  formatFilter?: string;
  // Фильтр по диете активной группы (например 'vegan' / 'halal' / 'gluten-free')
  dietFilter?: string;
  catalogTitle?: string;
  cartTitle?: string;
  emptyCartText?: string;
  unit?: string;
  enableReorder?: boolean;
  enableHybridMode?: boolean;
}

export default function MenuBuilder({
  selectedItems,
  onAdd,
  onRemove,
  onSetQty,
  onReorder,
  excludedAllergens: controlledExcluded,
  onExcludedAllergensChange,
  formatFilter,
  dietFilter,
  catalogTitle = "Каталог блюд",
  cartTitle = "Ваше меню",
  emptyCartText = "Нажмите «+ Добавить» на блюде или перетащите его сюда",
  unit = "порц.",
  enableReorder = true,
  enableHybridMode = false,
}: MenuBuilderProps) {
  const [search, setSearch] = useState("");
  const [station, setStation] = useState<string>("all");
  const [activeDiets, setActiveDiets] = useState<Set<string>>(new Set());
  // Локальный state — используется если не передан controlledExcluded
  const [localExcludedAllergens, setLocalExcludedAllergens] = useState<Set<Allergen>>(new Set());
  // Actual excludedAllergens (controlled or local)
  const excludedAllergens =
    controlledExcluded !== undefined ? controlledExcluded : localExcludedAllergens;
  const setExcludedAllergens = (next: Set<Allergen>) => {
    if (onExcludedAllergensChange) onExcludedAllergensChange(next);
    else setLocalExcludedAllergens(next);
  };
  const [allergenMode, setAllergenMode] = useState<"highlight" | "hide">("highlight");
  const [showExtraAllergens, setShowExtraAllergens] = useState(false);
  const [showAllFormats, setShowAllFormats] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // dnd-kit sensors: PointerSensor (desktop), TouchSensor (mobile), KeyboardSensor (a11y)
  // TouchSensor with delay prevents accidental drags when scrolling
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Case 1: dragging catalog dish → cart zone (add to cart)
    if (activeId.startsWith("dish-") && (overId === "cart-dropzone" || overId === "cart-empty")) {
      const dishId = activeId.replace("dish-", "");
      if (!selectedIds.has(dishId)) onAdd(dishId);
      return;
    }

    // Case 2: dragging cart item → reorder
    if (activeId.startsWith("cart-item-") && overId.startsWith("cart-item-") && onReorder) {
      const fromIdx = parseInt(activeId.replace("cart-item-", ""));
      const toIdx = parseInt(overId.replace("cart-item-", ""));
      if (fromIdx !== toIdx) onReorder(fromIdx, toIdx);
      return;
    }

    // Case 3: dragging catalog dish over a cart item — add to cart at that position
    if (activeId.startsWith("dish-") && overId.startsWith("cart-item-")) {
      const dishId = activeId.replace("dish-", "");
      if (!selectedIds.has(dishId)) onAdd(dishId);
      return;
    }
  };

  const toggleDiet = (d: string) => {
    const next = new Set(activeDiets);
    if (next.has(d)) next.delete(d);
    else next.add(d);
    setActiveDiets(next);
  };

  const toggleAllergen = (a: Allergen) => {
    const next = new Set(excludedAllergens);
    if (next.has(a)) next.delete(a);
    else next.add(a);
    setExcludedAllergens(next);
  };

  const selectedIds = new Set(selectedItems.map((i) => i.dishId));

  const filtered = useMemo(() => {
    let dishes: Dish[] = ALL_DISHES;
    if (formatFilter && !showAllFormats) {
      dishes = dishes.filter((d) => d.format.includes(formatFilter as Dish["format"][number]));
    }
    if (station !== "all") dishes = dishes.filter((d) => d.station === station);
    // Diet filter — либо из активной группы (dietFilter prop), либо из ручных чипов (activeDiets)
    if (dietFilter) {
      dishes = dishes.filter((d) => d.dietBadges.includes(dietFilter as Diet));
    } else if (activeDiets.size > 0) {
      dishes = dishes.filter((d) =>
        [...activeDiets].every((diet) => d.dietBadges.includes(diet as Diet))
      );
    }
    // Allergen filter
    if (excludedAllergens.size > 0 && allergenMode === "hide") {
      dishes = dishes.filter((d) => !d.allergens.some((a) => excludedAllergens.has(a)));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      dishes = dishes.filter(
        (d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      );
    }
    return dishes;
  }, [
    station,
    activeDiets,
    search,
    formatFilter,
    excludedAllergens,
    allergenMode,
    showAllFormats,
    dietFilter,
  ]);

  // Количество блюд, скрытых фильтром аллергенов (для подсказки)
  const hiddenByAllergens = useMemo(() => {
    if (excludedAllergens.size === 0 || allergenMode !== "hide") return 0;
    let count = 0;
    for (const d of ALL_DISHES) {
      if (formatFilter && !d.format.includes(formatFilter as Dish["format"][number])) continue;
      if (station !== "all" && d.station !== station) continue;
      if (
        activeDiets.size > 0 &&
        ![...activeDiets].every((diet) => d.dietBadges.includes(diet as Diet))
      )
        continue;
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!d.name.toLowerCase().includes(q) && !d.description.toLowerCase().includes(q)) continue;
      }
      if (d.allergens.some((a) => excludedAllergens.has(a))) count++;
    }
    return count;
  }, [excludedAllergens, allergenMode, formatFilter, station, activeDiets, search]);

  // Touch-friendly: move item up/down via buttons (works without drag)
  const moveItem = (idx: number, direction: -1 | 1) => {
    if (!onReorder) return;
    const toIdx = idx + direction;
    if (toIdx < 0 || toIdx >= selectedItems.length) return;
    onReorder(idx, toIdx);
  };

  // Cart is droppable for drag-and-drop
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveDragId(null);
      }}
    >
      <div className="grid gap-4 md:grid-cols-[1fr_360px] md:gap-6 lg:grid-cols-[1fr_400px]">
        {/* === КАТАЛОГ === */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading text-lg font-medium">{catalogTitle}</h3>
            <span className="text-muted-foreground text-xs">
              {filtered.length} доступно
              {hiddenByAllergens > 0 && ` · ${hiddenByAllergens} скрыто аллергенами`}
            </span>
          </div>

          {/* Search */}
          <input
            type="search"
            placeholder="Поиск блюда…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-line bg-card focus:border-gold-text mb-3 inline-flex min-h-[44px] w-full items-center rounded-xl border px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E5530]"
          />

          {/* Station filters */}
          <div className="mb-2 flex flex-wrap gap-1.5">
            {STATIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setStation(s.key)}
                className={`touch-target rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  station === s.key
                    ? "border-gold-text bg-gold-tint text-gold-text"
                    : "border-line text-muted-foreground hover:border-gold-text hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Hybrid mode toggle — для смешанных событий (дети + взрослые) */}
          {enableHybridMode && formatFilter && (
            <div className="mb-3">
              <label className="text-muted-foreground flex cursor-pointer items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={showAllFormats}
                  onChange={(e) => setShowAllFormats(e.target.checked)}
                  className="accent-gold-text"
                />
                <span>
                  Показать блюда других форматов (для гибрида «дети + взрослые» или смешанных диет)
                </span>
              </label>
            </div>
          )}

          {/* Diet filters */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {DIETS.map((d) => (
              <button
                key={d}
                onClick={() => toggleDiet(d)}
                className={`touch-target rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  activeDiets.has(d)
                    ? "border-gold-text bg-gold-tint text-gold-text"
                    : "border-line text-muted-foreground hover:border-gold-text hover:text-foreground"
                }`}
              >
                {DIET_FILTERS[d]}
              </button>
            ))}
          </div>

          {/* === AllergenFilterBar === */}
          <div className="border-line bg-card mb-3 rounded-xl border p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-foreground text-xs font-semibold">Исключить аллергены</span>
                <div className="bg-muted flex rounded-md p-0.5">
                  <button
                    onClick={() => setAllergenMode("highlight")}
                    className={`touch-target rounded px-3 py-1.5 text-xs ${allergenMode === "highlight" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
                  >
                    Подсветить
                  </button>
                  <button
                    onClick={() => setAllergenMode("hide")}
                    className={`touch-target rounded px-3 py-1.5 text-xs ${allergenMode === "hide" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
                  >
                    Скрыть
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowExtraAllergens(!showExtraAllergens)}
                className="text-muted-foreground hover:text-foreground touch-target px-2 py-1 text-xs transition-colors"
              >
                {showExtraAllergens ? "← основные" : "ещё аллергены →"}
              </button>
            </div>

            {/* Premium allergen filter — custom styled toggle buttons (1px gold border, hover, scale-105) */}
            <div className="flex flex-wrap gap-2">
              {(showExtraAllergens ? [...TOP_ALLERGENS, ...EXTRA_ALLERGENS] : TOP_ALLERGENS).map(
                (a) => {
                  const isOn = excludedAllergens.has(a);
                  const isHighRisk = [
                    "nuts",
                    "peanuts",
                    "gluten",
                    "fish",
                    "crustaceans",
                    "molluscs",
                  ].includes(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAllergen(a)}
                      className={`touch-target inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                        isOn
                          ? isHighRisk
                            ? "scale-105 bg-red-600 text-white shadow-md"
                            : "scale-105 bg-[#B45309] text-white shadow-md"
                          : "bg-card text-foreground border border-[#C4A77D]/30 hover:border-[#C4A77D] hover:bg-[#C4A77D]/5"
                      }`}
                      title={ALLERGEN_LABEL[a]}
                      aria-pressed={isOn}
                    >
                      <span
                        className={`h-3 w-3 rounded-full border transition-all ${
                          isOn ? "border-transparent bg-white" : "border-[#C4A77D]/40"
                        }`}
                      >
                        {isOn && (
                          <svg
                            className="h-full w-full text-current"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </span>
                      {ALLERGEN_EMOJI[a]} {ALLERGEN_LABEL[a]}
                    </button>
                  );
                }
              )}
            </div>

            {excludedAllergens.size > 0 && (
              <p className="text-muted-foreground mt-2 text-[10px]">
                Фильтр носит информационный характер. Финальную проверку по аллергенам делает
                менеджер по телефону перед заказом.
              </p>
            )}
          </div>

          {/* Legend */}
          <div className="text-muted-foreground mb-3 flex items-center gap-3 text-[10px]">
            <span>
              <span className="mr-0.5 inline-block h-3 w-3 rounded-sm bg-emerald-600 align-middle" />
              <b className="font-semibold">VG</b>— веган
            </span>
            <span>
              <span className="mr-0.5 inline-block h-3 w-3 rounded-sm bg-amber-500 align-middle" />
              <b className="font-semibold">GF</b>— без глютена
            </span>
            <span>
              <span className="mr-0.5 inline-block h-3 w-3 rounded-sm bg-blue-500 align-middle" />
              <b className="font-semibold">H</b>— халяль (по запросу)
            </span>
            <span>
              <span className="mr-0.5 inline-block h-3 w-3 rounded-sm bg-purple-500 align-middle" />
              <b className="font-semibold">Дети</b>— безопасно для детей
            </span>
          </div>

          {/* Drag hint */}
          <p className="text-muted-foreground mb-2 px-1 text-xs">
            Нажмите «+ Добавить» на блюде или перетащите его в корзину (на десктопе).
          </p>

          {/* Catalog grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filtered.map((dish) => {
              const isSelected = selectedIds.has(dish.id);
              const hasExcludedAllergen =
                excludedAllergens.size > 0 && dish.allergens.some((a) => excludedAllergens.has(a));
              const dimmed = allergenMode === "highlight" && hasExcludedAllergen;
              // Опасные аллергены (орехи, арахис) — аларм по умолчанию, без активации фильтра
              const hasNuts = dish.allergens.some((a) => a === "nuts" || a === "peanuts");
              const isKidsFormat = formatFilter === "detskoe";
              const alarmNutsInKids = hasNuts && isKidsFormat;
              return (
                <DraggableDishCard
                  key={dish.id}
                  dish={dish}
                  isSelected={isSelected}
                  dimmed={dimmed}
                  alarmNutsInKids={alarmNutsInKids}
                  hasExcludedAllergen={hasExcludedAllergen}
                  excludedAllergens={excludedAllergens}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-muted-foreground py-10 text-center text-sm">
              <p className="mb-2">Ничего не найдено — попробуйте изменить фильтры</p>

              {/* Спец-баннер для халяль-фильтра */}
              {activeDiets.has("halal") && (
                <div className="border-gold-tint bg-gold-tint/30 mx-auto mt-4 max-w-md rounded-xl border p-4 text-left">
                  <p className="text-foreground mb-1 text-sm font-medium">
                    Халяль-меню готовим под заказ
                  </p>
                  <p className="text-muted-foreground mb-2 text-xs">
                    В базовом каталоге нет сертифицированных халяль-блюд, но мы готовим их на
                    отдельной линии по запросу — от 3 рабочих дней. Курица, говядина, баранина без
                    свинины и алкоголя.
                  </p>
                  <a
                    href="/menu/halal"
                    className="text-gold-text text-xs font-semibold hover:underline"
                  >
                    Подробнее про халяль-меню →
                  </a>
                </div>
              )}

              {(excludedAllergens.size > 0 || activeDiets.size > 0) && (
                <button
                  onClick={() => {
                    setExcludedAllergens(new Set());
                    setActiveDiets(new Set());
                  }}
                  className="text-gold-text touch-target mt-3 rounded px-3 py-1.5 text-xs hover:underline"
                >
                  Сбросить все фильтры
                </button>
              )}
            </div>
          )}
        </div>

        {/* === КОРЗИНА (Droppable) === */}
        <DroppableCart
          cartTitle={cartTitle}
          emptyCartText={emptyCartText}
          unit={unit}
          selectedItems={selectedItems}
          enableReorder={!!onReorder && enableReorder}
          excludedAllergens={excludedAllergens}
          onDragOverChange={() => {}}
          activeDragId={activeDragId}
          onRemove={onRemove}
          onSetQty={onSetQty}
          onMoveItem={moveItem}
        />
      </div>
    </DndContext>
  );
}

// === DraggableDishCard ===
function DraggableDishCard({
  dish,
  isSelected,
  dimmed,
  alarmNutsInKids,
  hasExcludedAllergen,
  excludedAllergens,
  onAdd,
  onRemove,
}: {
  dish: Dish;
  isSelected: boolean;
  dimmed: boolean;
  alarmNutsInKids: boolean;
  hasExcludedAllergen: boolean;
  excludedAllergens: Set<Allergen>;
  onAdd: (dishId: string) => void;
  onRemove: (dishId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `dish-${dish.id}`,
    disabled: isSelected, // disable drag for already-added dishes
  });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : undefined,
    zIndex: isDragging ? 50 : undefined,
    // touch-action: none ONLY when actively dragging — otherwise page scroll works normally
    touchAction: isDragging ? "none" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      role="button"
      tabIndex={0}
      aria-label={`${dish.name}, ${dish.pricePerGuest} ₽. Нажмите Enter чтобы добавить в меню. Или перетащите в корзину.`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!isSelected) onAdd(dish.id);
        }
      }}
      className={`bg-card cursor-pointer overflow-hidden rounded-xl border transition-all ${
        isSelected
          ? "border-gold-text ring-gold-text opacity-60 ring-1"
          : dimmed
            ? "border-destructive/40 opacity-50"
            : alarmNutsInKids
              ? "border-destructive/60 ring-destructive/40 ring-1"
              : "border-line hover:border-gold-text hover:shadow-sm"
      } ${isDragging ? "ring-gold-text shadow-2xl ring-2" : ""}`}
    >
      <div className="bg-secondary group relative aspect-square overflow-hidden">
        <FoodPhoto
          src={getDishImage(dish.id, dish.station)}
          alt={dish.name}
          aspectRatio="square"
          objectPosition={getObjectPositionForDish(dish.id, dish.station)}
          className="h-full w-full"
        />
        {isSelected && (
          <div className="bg-gold-text absolute top-1 right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white"></div>
        )}
        {/* Diet badges */}
        <div className="absolute top-1 left-1 z-10 flex gap-0.5">
          {dish.dietBadges.includes("vegan") && (
            <span className="rounded bg-[#065F46] px-1 py-0.5 text-[10px] font-bold text-white">
              VG
            </span>
          )}
          {dish.dietBadges.includes("gluten-free") && (
            <span className="rounded bg-[#B45309] px-1 py-0.5 text-[10px] font-bold text-white">
              GF
            </span>
          )}
          {dish.dietBadges.includes("halal") && (
            <span className="rounded bg-blue-500 px-1 py-0.5 text-[10px] font-bold text-white">
              H
            </span>
          )}
          {dish.dietBadges.includes("sugar-free") && (
            <span
              className="rounded bg-purple-600 px-1 py-0.5 text-[10px] font-bold text-white"
              title="Без добавленного сахара — для СД1/СД2"
            >
              SF
            </span>
          )}
          {dish.dietBadges.includes("nut-free") && (
            <span
              className="rounded bg-red-500 px-1 py-0.5 text-[10px] font-bold text-white"
              title="Без орехов — для анафилаксии"
            >
              NF
            </span>
          )}
          {dish.childFriendly && (
            <span className="rounded bg-purple-500 px-1 py-0.5 text-[10px] font-bold text-white">
              Дети
            </span>
          )}
        </div>
        {/* Allergen warning badge */}
        {hasExcludedAllergen && (
          <div className="bg-destructive absolute right-1 bottom-1 left-1 z-10 rounded px-1 py-0.5 text-center text-[10px] font-semibold text-white">
            {dish.allergens
              .filter((a) => excludedAllergens.has(a))
              .map((a) => ALLERGEN_EMOJI[a] || "·")
              .join(" ")}
          </div>
        )}
        {/* Nuts alarm — по умолчанию в детском меню */}
        {alarmNutsInKids && !hasExcludedAllergen && (
          <div className="bg-destructive absolute right-1 bottom-1 left-1 z-10 rounded px-1 py-0.5 text-center text-[10px] font-semibold text-white">
            Орехи
          </div>
        )}
      </div>
      <div className="p-2">
        <h4 className="mb-0.5 line-clamp-2 text-xs leading-tight font-medium">{dish.name}</h4>
        {/* ХЕ (хлебные единицы) — extracted from description for СД1 visibility */}
        {dish.description.match(/ХЕ=([0-9.]+)/) && (
          <p className="mb-0.5 text-[10px] font-semibold text-purple-700">
            ХЕ={dish.description.match(/ХЕ=([0-9.]+)/)?.[1]} · для СД1
          </p>
        )}
        {/* Compact allergen tags */}
        {dish.allergens.length > 0 && (
          <div className="mb-1 flex flex-wrap gap-0.5">
            {dish.allergens.slice(0, 4).map((a) => (
              <span
                key={a}
                className={`rounded px-1 py-0.5 text-[10px] leading-none ${
                  a === "nuts" || a === "peanuts"
                    ? "bg-destructive/20 text-destructive font-semibold"
                    : "bg-muted text-muted-foreground"
                }`}
                title={ALLERGEN_LABEL[a]}
              >
                {ALLERGEN_LABEL[a]}
              </span>
            ))}
            {dish.allergens.length > 4 && (
              <span className="bg-muted text-muted-foreground rounded px-1 py-0.5 text-[10px] leading-none">
                +{dish.allergens.length - 4}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between gap-1">
          <span className="text-gold-text text-[11px] font-semibold whitespace-nowrap">
            {dish.pricePerGuest} ₽<span className="text-muted-foreground font-normal">/гость</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isSelected) {
                onRemove(dish.id);
              } else {
                onAdd(dish.id);
              }
            }}
            disabled={isSelected}
            className={`touch-target rounded px-3 py-1.5 text-xs font-medium transition-colors ${
              isSelected
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-gold-text hover:bg-gold-text/90 text-white"
            }`}
            aria-label={isSelected ? "Уже добавлено" : "Добавить в меню"}
          >
            {isSelected ? "" : "+ Добавить"}
          </button>
        </div>
      </div>
    </div>
  );
}

// === DroppableCart ===
function DroppableCart({
  cartTitle,
  emptyCartText,
  unit,
  selectedItems,
  enableReorder,
  excludedAllergens,
  onDragOverChange,
  activeDragId,
  onRemove,
  onSetQty,
  onMoveItem,
}: {
  cartTitle: string;
  emptyCartText: string;
  unit: string;
  selectedItems: { dishId: string; qty: number }[];
  enableReorder: boolean;
  excludedAllergens?: Set<Allergen>;
  onDragOverChange: (v: boolean) => void;
  activeDragId: string | null;
  onRemove: (dishId: string) => void;
  onSetQty: (dishId: string, qty: number) => void;
  onMoveItem: (idx: number, direction: -1 | 1) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "cart-dropzone" });

  // Update parent state for visual feedback when isOver changes
  useMemo(() => {
    onDragOverChange(isOver && !!activeDragId?.startsWith("dish-"));
  }, [isOver, activeDragId, onDragOverChange]);

  const cartItemIds = selectedItems.map((_, idx) => `cart-item-${idx}`);

  return (
    <div
      ref={setNodeRef}
      className={`sticky top-20 max-h-[calc(100vh-6rem)] self-start overflow-y-auto overscroll-contain rounded-2xl border-2 border-dashed p-4 transition-colors ${
        isOver && activeDragId?.startsWith("dish-")
          ? "border-gold-text bg-gold-tint/40 scale-[1.02]"
          : "border-line bg-card/50"
      }`}
      aria-live="polite"
      aria-label={`Корзина меню: ${selectedItems.length} ${selectedItems.length === 1 ? "блюдо" : "блюд"}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-heading text-lg font-medium">{cartTitle}</h3>
        {selectedItems.length > 0 && (
          <span className="bg-gold-tint text-gold-text rounded-full px-2 py-0.5 text-xs font-semibold">
            {selectedItems.length}
          </span>
        )}
      </div>

      {selectedItems.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-3 text-4xl opacity-50"></div>
          <p className="text-muted-foreground px-4 text-sm">{emptyCartText}</p>
          <p className="text-muted-foreground/70 mt-2 text-[10px]">
            Нажмите «+ Добавить» на блюде или перетащите его сюда.
          </p>
        </div>
      ) : (
        <SortableContext items={cartItemIds} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {selectedItems.map((item, idx) => {
              const dish = ALL_DISHES.find((d) => d.id === item.dishId);
              if (!dish) return null;
              return (
                <SortableCartItem
                  key={item.dishId}
                  id={`cart-item-${idx}`}
                  dish={dish}
                  qty={item.qty}
                  unit={unit}
                  idx={idx}
                  total={selectedItems.length}
                  excludedAllergens={excludedAllergens ?? new Set()}
                  enableReorder={enableReorder}
                  onRemove={onRemove}
                  onSetQty={onSetQty}
                  onMoveItem={onMoveItem}
                />
              );
            })}
          </ul>
        </SortableContext>
      )}

      {/* Helper hint */}
      {selectedItems.length > 0 && enableReorder && (
        <p className="text-muted-foreground/70 mt-3 text-center text-[10px]">
          ⟲ Перетащите карточку за ручку ⠿ или используйте для порядка блюд
        </p>
      )}
    </div>
  );
}

// === SortableCartItem ===
function SortableCartItem({
  id,
  dish,
  qty,
  unit,
  idx,
  total,
  excludedAllergens,
  enableReorder,
  onRemove,
  onSetQty,
  onMoveItem,
}: {
  id: string;
  dish: Dish;
  qty: number;
  unit: string;
  idx: number;
  total: number;
  excludedAllergens: Set<Allergen>;
  enableReorder: boolean;
  onRemove: (dishId: string) => void;
  onSetQty: (dishId: string, qty: number) => void;
  onMoveItem: (idx: number, direction: -1 | 1) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    zIndex: isDragging ? 50 : undefined,
    // touch-action: none ONLY when actively dragging — otherwise page scroll works normally
    touchAction: isDragging ? "none" : undefined,
  };

  // Check if dish has excluded allergen (warning in cart)
  const excludedInDish = dish.allergens.filter((a) => excludedAllergens.has(a));

  return (
    <li
      ref={setNodeRef}
      style={style}
      role="listitem"
      aria-label={`Блюдо ${idx + 1}: ${dish.name}. Перетащите за ручку ⠿ для перестановки или используйте кнопки .`}
      className={`bg-card rounded-xl border p-2.5 transition-all ${
        isDragging ? "border-gold-text ring-gold-text shadow-lg ring-2" : "border-line"
      } ${excludedInDish.length > 0 ? "border-destructive/40 bg-destructive/5" : ""}`}
    >
      <div className="flex gap-2.5">
        {/* Drag handle (desktop + mobile via dnd-kit) + ↑↓ buttons */}
        {enableReorder && (
          <div className="flex flex-col items-center gap-0.5">
            <button
              onClick={() => onMoveItem(idx, -1)}
              disabled={idx === 0}
              className="text-muted-foreground hover:text-gold-text touch-target rounded px-2 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Поднять вверх"
            ></button>
            <button
              {...attributes}
              {...listeners}
              className="text-muted-foreground hover:text-gold-text touch-target cursor-grab rounded px-2 py-1.5 active:cursor-grabbing"
              aria-label="Перетащить для перестановки"
              title="Перетащите для перестановки"
            >
              ⠿
            </button>
            <button
              onClick={() => onMoveItem(idx, 1)}
              disabled={idx === total - 1}
              className="text-muted-foreground hover:text-gold-text touch-target rounded px-2 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Опустить вниз"
            ></button>
          </div>
        )}
        {/* Image placeholder */}
        <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg">
          {STATION_EMOJI[dish.station] || ""}
        </div>
        {/* Info */}
        <div className="min-w-0 flex-1">
          <h4 className="mb-0.5 line-clamp-1 text-xs leading-tight font-medium">{dish.name}</h4>
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-muted-foreground text-[10px]">
              {DISH_CATEGORIES[dish.station] || dish.station}
            </span>
            {/* Diet badges in cart */}
            {dish.dietBadges.includes("vegan") && (
              <span className="rounded bg-emerald-100 px-1 text-[10px] text-emerald-700">VG</span>
            )}
            {dish.dietBadges.includes("gluten-free") && (
              <span className="rounded bg-amber-100 px-1 text-[10px] text-amber-700">GF</span>
            )}
            {dish.childFriendly && (
              <span className="rounded bg-purple-100 px-1 text-[10px] text-purple-700">Дети</span>
            )}
            {/* Allergen tags in cart */}
            {dish.allergens.slice(0, 3).map((a) => (
              <span
                key={a}
                className={`rounded px-1 text-[10px] ${excludedAllergens.has(a) ? "bg-destructive font-semibold text-white" : "bg-muted text-muted-foreground"}`}
              >
                {ALLERGEN_EMOJI[a]} {ALLERGEN_LABEL[a]}
              </span>
            ))}
            {dish.allergens.length > 3 && (
              <span className="bg-muted text-muted-foreground rounded px-1 text-[10px]">
                +{dish.allergens.length - 3}
              </span>
            )}
          </div>
          {excludedInDish.length > 0 && (
            <p className="text-destructive mt-0.5 text-[10px] font-medium">
              Содержит исключённый аллерген!
            </p>
          )}
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-gold-text text-[11px] font-semibold">
              {dish.pricePerGuest} ₽ × {qty} {unit} ={" "}
              {(dish.pricePerGuest * qty).toLocaleString("ru-RU")} ₽
            </span>
          </div>
        </div>
        {/* Qty controls */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSetQty(dish.id, qty - 1)}
              className="border-line hover:border-gold-text hover:text-gold-text touch-target flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors"
              aria-label="Уменьшить"
            >
              −
            </button>
            <span className="w-5 text-center text-xs font-semibold tabular-nums">{qty}</span>
            <button
              onClick={() => onSetQty(dish.id, qty + 1)}
              className="border-line hover:border-gold-text hover:text-gold-text touch-target flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors"
              aria-label="Увеличить"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemove(dish.id)}
            className="text-muted-foreground hover:text-destructive touch-target rounded px-2 py-1 text-xs transition-colors"
            aria-label="Удалить"
          >
            удалить
          </button>
        </div>
      </div>
    </li>
  );
}
