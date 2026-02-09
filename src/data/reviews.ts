export type Review = {
  id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    bookId: "b1",
    userName: "Anonymous",
    rating: 5,
    comment: "อ่านง่ายมาก ได้ข้อคิดหลายอย่าง เอาไปปรับใช้ได้จริง",
    createdAt: "2024-12-01",
  },
  {
    id: "r2",
    bookId: "b1",
    userName: "Book Lover",
    rating: 4,
    comment: "เนื้อหาดี แต่บางบทสั้นไปหน่อย",
    createdAt: "2024-12-10",
  },
  {
    id: "r3",
    bookId: "b2",
    userName: "Mindset Reader",
    rating: 5,
    comment: "เป็นหนังสือที่ทำให้กลับมาคิดทบทวนตัวเองอีกครั้ง",
    createdAt: "2024-11-22",
  },
{
    id: "r4",
    bookId: "b3",
    userName: "Sunday Reader",
    rating: 4,
    comment: "อ่านเพลินมาก เหมาะกับวันพักผ่อนจริง ๆ",
    createdAt: "2024-12-05",
  },
  {
    id: "r5",
    bookId: "b5",
    userName: "Finance Guy",
    rating: 5,
    comment: "อธิบายเรื่องเงินได้เข้าใจง่าย มุมมองดีมาก",
    createdAt: "2024-11-30",
  },
  {
    id: "r6",
    bookId: "b6",
    userName: "Habit Builder",
    rating: 5,
    comment: "อ่านจบแล้วอยากเริ่มเปลี่ยนนิสัยทันที",
    createdAt: "2024-12-12",
  },
  {
    id: "r7",
    bookId: "b8",
    userName: "Thinker",
    rating: 4,
    comment: "เนื้อหาค่อนข้างลึก ต้องอ่านช้า ๆ แต่คุ้ม",
    createdAt: "2024-11-18",
  },
  {
    id: "r8",
    bookId: "b10",
    userName: "Novel Fan",
    rating: 5,
    comment: "อบอุ่นหัวใจ อ่านแล้วรู้สึกดีมาก",
    createdAt: "2024-12-08",
  },
  {
    id: "r9",
    bookId: "b12",
    userName: "New Investor",
    rating: 4,
    comment: "เหมาะกับคนเริ่มต้นเรื่องการเงิน",
    createdAt: "2024-10-27",
  },
  {
    id: "r10",
    bookId: "b14",
    userName: "Life Seeker",
    rating: 5,
    comment: "อ่านแล้วมุมมองต่อเวลาเปลี่ยนไปเลย",
    createdAt: "2024-12-03",
  },
  {
    id: "r11",
    bookId: "b15",
    userName: "Classic Reader",
    rating: 5,
    comment: "คลาสสิกตลอดกาล อ่านกี่รอบก็ยังดี",
    createdAt: "2024-09-15",
  },
  {
    id: "r12",
    bookId: "b18",
    userName: "Startup Mind",
    rating: 4,
    comment: "ไอเดียดีมาก เหมาะกับคนทำธุรกิจและลงทุน",
    createdAt: "2024-12-11",
  },
  {
    id: "r13",
    bookId: "b1",
    userName: "Money Learner",
    rating: 4,
    comment: "ทำให้เข้าใจแหล่งรายได้และการวางแผนเงินมากขึ้น",
    createdAt: "2024-11-05",
  },
];