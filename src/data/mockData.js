// Mock Data for Karaoke Booking System

export const rooms = [
  {
    id: 1,
    name: "VIP Diamond",
    price: 50000,
    capacity: 15,
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"
    ],
    description: "Манай хамгийн том, тансаг өрөө. Олон найз нөхөд, гэр бүлийн хамт цагийг зугаатай өнгөрүүлэхэд тохиромжтой. Өндөр чанарын дуу чанга яригч, LED дэлгэц, тав тухтай суудал."
  },
  {
    id: 2,
    name: "Gold Room",
    price: 35000,
    capacity: 10,
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
      "https://images.unsplash.com/photo-1571266028243-d220c6a85c5e?w=800",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800"
    ],
    description: "Дунд зэргийн хэмжээтэй, гоёмсог өрөө. Найз нөхөдтэйгээ хамт караокед ороход тохиромжтой. Чанартай микрофон, сайн дуу чимээ тусгаарлалттай."
  },
  {
    id: 3,
    name: "Silver Room",
    price: 25000,
    capacity: 6,
    thumbnail: "https://images.unsplash.com/photo-1504509546545-e000b4a62425?w=400",
    images: [
      "https://images.unsplash.com/photo-1504509546545-e000b4a62425?w=800",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800"
    ],
    description: "Жижиг бүлэг найз нөхдөд зориулсан өрөө. Хосуудад болон бага бүлгүүдэд тохиромжтой. Энгийн боловч чанартай тоноглолтой."
  },
  {
    id: 4,
    name: "Bronze Room",
    price: 20000,
    capacity: 4,
    thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400",
    images: [
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800",
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800"
    ],
    description: "Хамгийн жижиг өрөө. 2-4 хүнд тохиромжтой. Хосууд болон ойр дотны найзуудад зориулсан."
  }
];

export const categories = [
  { id: 1, name: "Ундаа", icon: "🥤" },
  { id: 2, name: "Хоол", icon: "🍔" },
  { id: 3, name: "Багц", icon: "🎁" }
];

export const products = [
  { id: 1, categoryId: 1, name: "Coca Cola", price: 3000, unit: "ширхэг", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200" },
  { id: 2, categoryId: 1, name: "Fanta", price: 3000, unit: "ширхэг", image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=200" },
  { id: 3, categoryId: 1, name: "Sprite", price: 3000, unit: "ширхэг", image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=200" },
  { id: 4, categoryId: 1, name: "Цай", price: 2000, unit: "ширхэг", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200" },
  { id: 5, categoryId: 1, name: "Кофе", price: 4000, unit: "ширхэг", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200" },
  { id: 6, categoryId: 2, name: "Пицца", price: 25000, unit: "ширхэг", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200" },
  { id: 7, categoryId: 2, name: "Бургер", price: 15000, unit: "ширхэг", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200" },
  { id: 8, categoryId: 2, name: "Хуурга", price: 12000, unit: "таваг", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200" },
  { id: 9, categoryId: 2, name: "Жигнэсэн тахиа", price: 18000, unit: "таваг", image: "https://images.unsplash.com/photo-1626645738196-c2a72c89a6d0?w=200" },
  { id: 10, categoryId: 3, name: "Найзуудын багц", price: 80000, unit: "багц", image: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=200" },
  { id: 11, categoryId: 3, name: "Гэр бүлийн багц", price: 120000, unit: "багц", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200" },
  { id: 12, categoryId: 3, name: "VIP багц", price: 200000, unit: "багц", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200" }
];

export const timeSlots = [
  { id: 1, time: "10:00 - 12:00", available: true },
  { id: 2, time: "12:00 - 14:00", available: true },
  { id: 3, time: "14:00 - 16:00", available: false },
  { id: 4, time: "16:00 - 18:00", available: true },
  { id: 5, time: "18:00 - 20:00", available: true },
  { id: 6, time: "20:00 - 22:00", available: false },
  { id: 7, time: "22:00 - 00:00", available: true }
];

export const contactInfo = {
  phone: "+976 9911 2233",
  email: "info@altantuya-karaoke.mn",
  address: "Улаанбаатар хот, Баянзүрх дүүрэг, 1-р хороо, Энхтайваны өргөн чөлөө 15",
  workingHours: {
    weekdays: "10:00 - 00:00",
    weekends: "12:00 - 02:00"
  },
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.8!2d106.9!3d47.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU0JzAwLjAiTiAxMDbCsDU0JzAwLjAiRQ!5e0!3m2!1sen!2smn!4v1234567890"
};

export const initialUser = {
  id: 1,
  name: "Болд",
  phone: "99112233",
  isAdmin: false
};

export const adminUser = {
  id: 0,
  name: "Админ",
  phone: "99001100",
  isAdmin: true
};

