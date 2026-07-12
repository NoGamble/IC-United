/* ============================================================
   IC UNITED FC — Data
   Edit this file to populate real content.
   ============================================================ */

/* ============================================================
   IMAGE CONFIG — 填这里就够了，其他文件不需要动
   图片放入对应目录后，在下方填写路径即可显示真实图片。
   留空字符串 '' = 继续显示占位符。

   目录结构：
     assets/images/hero.jpg           ← 首页合照
     assets/images/players/1.jpg      ← 球员头像，以 player id 命名
     assets/images/gallery/1.jpg      ← 图库图片，以 gallery id 命名
   ============================================================ */
const IMAGE_CONFIG = {
  // 首页合照
  hero: 'assets/images/gallery/1.jpg',
  // 球员头像：key = player id（见下方 PLAYERS 数组的 id 字段）
  players: {
    1: 'assets/images/players/1.jpg',
    2: 'assets/images/players/2.jpg',
    3: 'assets/images/players/3.jpg',
    4: 'assets/images/players/4.jpg',
    5: 'assets/images/players/5.jpg',
    6: 'assets/images/players/6.jpg',
    7: 'assets/images/players/7.jpg',
    8: 'assets/images/players/8.jpg',
    9: 'assets/images/players/9.jpg',
    10: 'assets/images/players/10.jpg',
    11: 'assets/images/players/11.jpg',
    12: 'assets/images/players/12.jpg',
    13: 'assets/images/players/13.jpg',
    14: 'assets/images/players/14.jpg',
    15: 'assets/images/players/15.jpg',
    16: 'assets/images/players/16.jpg',
  },
  // 图库图片：key = gallery item id（见下方 GALLERY 数组的 id 字段）
  gallery: {
    1: 'assets/images/gallery/1.jpg',
    2: 'assets/images/gallery/2.png',
    3: 'assets/images/gallery/3.jpg',
    4: 'assets/images/gallery/4.jpg',
    5: 'assets/images/gallery/5.jpg',
    6: 'assets/images/gallery/6.jpg',
    7: 'assets/images/gallery/7.jpg',
    8: 'assets/images/gallery/8.jpg',
    9: 'assets/images/gallery/9.jpg',
  },
};

const TEAM = {
  name: "IC United FC",
  college: "集成电路学院",
  founded: "2020",
  motto: "技术铸就荣耀",
};

/* ---- PLAYERS ---- */
const PLAYERS = [
  {
    id: 1, name: "周子杰", nameEn: "Zhou Zijie", number: 99, grade: 2024,
    position: "GK", height: "—", hometown: "—",
    favoriteClub: "", clubId: "",
    goals: 0, assists: 0, appearances: 0,
    bio: "球员简介待填写。"
  },
  {
    id: 2, name: "梁宸宾", nameEn: "Liang Chenbin", number: 15, grade: 2024,
    position: "CB", height: "—", hometown: "—",
    favoriteClub: "", clubId: "",
    goals: 0, assists: 0, appearances: 0,
    bio: "宾哥"
  },
  {
    id: 3, name: "李方洲", nameEn: "Li Fangzhou", number: 23, grade: 2024,
    position: "GK", height: "—", hometown: "—",
    favoriteClub: " ", clubId: "",
    goals: 0, assists: 0, appearances: 0,
    bio: "球员简介待填写。"
  },
  {
    id: 4, name: "刘灏铷", nameEn: "Liu Haoru", number: 25, grade: 2022,
    position: "LB", height: "—", hometown: "Chongqing",
    favoriteClub: "Bayern Munich", clubId: "BAY",
    goals: 0, assists: 0, appearances: 0,
    bio: "球员简介待填写。"
  },
  {
    id: 5, name: "黄子轩", nameEn: "Huang Zixuan", number: 7, grade: 2024,
    position: "RW", height: "—", hometown: "Chengdu",
    favoriteClub: "", clubId: "",
    goals: 0, assists: 0, appearances: 0,
    bio: "2024级"
  },
  {
    id: 6, name: "白杨杰皓", nameEn: "Baiyang Jiehao", number: 8, grade: 2024,
    position: "CDM", height: "—", hometown: "Chongqing",
    favoriteClub: "Real Madrid", clubId: "RM",
    goals: 0, assists: 0, appearances: 0,
    bio: "2024级"
  },
  {
    id: 7, name: "熊昱晶", nameEn: "Xiong Yujing", number: 19, grade: 2023,
    position: "CM", height: "—", hometown: "Chongqing",
    favoriteClub: "AC Milan", clubId: "ACM",
    goals: 0, assists: 0, appearances: 0,
    bio: "2023级"
  },
  {
    id: 8, name: "闫宇晗", nameEn: "Yan Yuhan", number: 10, grade: 2023,
    position: "LW", height: "—", hometown: "Tianjin",
    favoriteClub: "Barcelona", clubId: "BAR",
    goals: 0, assists: 0, appearances: 0,
    bio: "2023级"
  },
  {
    id: 9, name: "李由", nameEn: "Li You", number: 6, grade: 2023,
    position: "CDM", height: "—", hometown: "Chongqing",
    favoriteClub: "", clubId: "",
    goals: 0, assists: 0, appearances: 0,
    bio: "球员简介待填写。"
  },
  {
    id: 10, name: "肖雯", nameEn: "Xiao Wen", number: 28, grade: 2021,
    position: "RB", height: "180", hometown: "Chengdu",
    favoriteClub: "Real Madrid", clubId: "RM",
    goals: 0, assists: 0, appearances: 0,
    bio: "集电足球联谊的神。"
  },
  {
    id: 11, name: "敖其涵", nameEn: "Aao Qihan", number: 37, grade: 2024,
    position: "RW", height: "—", hometown: "Chengdu",
    favoriteClub: "", clubId: "",
    goals: 0, assists: 0, appearances: 0,
    bio: "眼镜"
  },
  {
    id: 12, name: "陈宝霖", nameEn: "Chen Baolin", number: 92, grade: 2024,
    position: "ST", height: "—", hometown: "",
    favoriteClub: "", clubId: "",
    goals: 0, assists: 0, appearances: 0,
    bio: "硬"
  },
  {
    id: 13, name: "吴南骏", nameEn: "Wu Nanjun", number: 14, grade: 2025,
    position: "CM", height: "—", hometown: "Yunnan",
    favoriteClub: "Barcelona", clubId: "BAR",
    goals: 0, assists: 0, appearances: 0,
    bio: "2025级"
  },
  {
    id: 14, name: "唐发恒", nameEn: "Tang Faheng", number: 33, grade: 2024,
    position: "LB", height: "—", hometown: "Guangxi",
    favoriteClub: "", clubId: "",
    goals: 0, assists: 0, appearances: 0,
    bio: "奶龙"
  },
  {
    id: 15, name: "杨卓霖", nameEn: "Yang Zhuolin", number: 55, grade: 2022,
    position: "LB", height: "—", hometown: "",
    favoriteClub: "", clubId: "",
    goals: 0, assists: 0, appearances: 0,
    bio: "贝贝"
  },
  {
    id: 16, name: "王睿", nameEn: "Wang Rui", number: 12, grade: 2021,
    position: "LB", height: "—", hometown: "",
    favoriteClub: "Real Madrid", clubId: "RM",
    goals: 0, assists: 0, appearances: 0,
    bio: "睿哥"
  },
];

const POSITION_LABELS = {
  GK: "守门员", CB: "中后卫", LB: "左后卫", RB: "右后卫",
  CDM: "后腰", CM: "中场", CAM: "前腰",
  LW: "左翼", RW: "右翼", ST: "中锋"
};

/* ---- HONORS ---- */
const HONORS = [
  {
    id: "h1", year: "2026",
    title: "五人制足球联赛 冠军", titleEn: "Gezhi Cup Five-a-side Football League of UESTC",
    competition: "电子科技大学“格致杯”五人制足球联赛",
    rank: "champion", trophy: "1st",
    description: "学院史上首届学院杯冠军，淘汰赛鏖战至三次点球大战，最终获得首冠。",
    stats: { matches: 6, wins: 5, goals: 9, goalsAgainst: 4 },
    playerIds: [1, 2, 3, 5, 6, 7, 8, 9, 11],
    topScorer: { playerId: 11, goals: 3},
    topAssister: { playerId: 2, assists: 2 },
  },
  {
    id: "h2", year: "2026",
    title: "八人制足球超级联赛 季军", titleEn: "UESTC Premier League ",
    competition: "电子科技大学八人制足球超级联赛",
    rank: "third place", trophy: "3rd",
    description: "IC United在电超的第一年稳扎稳打，最终拿下联赛第三名的好成绩",
    stats: { matches: 7, wins: 3, goals: 11, goalsAgainst: 12 },
    playerIds: [1, 2, 3, 4, 7, 12, 14],
    topScorer: { playerId: 8, goals: 3},
    topAssister: { playerId: 2, assists: 2 },
  },
];

/* ---- CLUBS ----
   Fan Wall 会自动尝试读取 assets/icons/clubs/{club id 小写}.png/.jpg/.jpeg/.webp。
   例如 RM 会尝试 assets/icons/clubs/rm.png，然后 rm.jpg 等。
   可选 logo 字段仍支持手动指定本地路径或远程图片 URL。
   图片白底会在浏览器端尽量处理成透明；未找到图片时显示球队颜色和缩写。
*/
const CLUBS = [
  { id: "RM",  name: "Real Madrid",          league: "La Liga",       color: "#00529F", secondary: "#FEBE10", abbr: "RM",  supporterIds: [6, 10] },
  { id: "BAR", name: "Barcelona",            league: "La Liga",       color: "#A50044", secondary: "#004D98", abbr: "FCB", supporterIds: [8, 13] },
  { id: "MCI", name: "Manchester City",      league: "Premier League",color: "#6CABDD", secondary: "#1C2C5B", abbr: "MCI", supporterIds: [] },
  { id: "BAY", name: "Bayern Munich",        league: "Bundesliga",    color: "#DC052D", secondary: "#0066B2", abbr: "FCB", supporterIds: [4] },
  { id: "LIV", name: "Liverpool",            league: "Premier League",color: "#C8102E", secondary: "#F6EB61", abbr: "LFC", supporterIds: [] },
  { id: "PSG", name: "Paris Saint-Germain",  league: "Ligue 1",       color: "#003399", secondary: "#DA291C", abbr: "PSG", supporterIds: [] },
  { id: "ARS", name: "Arsenal",              league: "Premier League",color: "#EF0107", secondary: "#9C824A", abbr: "AFC", supporterIds: [] },
  { id: "ACM", name: "AC Milan",             league: "Serie A",       color: "#FB090B", secondary: "#000000", abbr: "ACM", supporterIds: [7] },
  { id: "JUV", name: "Juventus",             league: "Serie A",       color: "#1a1a1a", secondary: "#FFFFFF", abbr: "JUV", supporterIds: [] },
  { id: "ATL", name: "Atletico Madrid",      league: "La Liga",       color: "#CB3524", secondary: "#272E61", abbr: "ATM", supporterIds: [] },
];

const LEAGUES = ["La Liga", "Premier League", "Bundesliga", "Serie A", "Ligue 1"];

/* ---- GALLERY ---- */
const GALLERY = [
  { id: 1, title: "2024年毕业退役赛", date: "2024-05", category: "match",    ratio: "landscape" },
  { id: 2, title: "2026成电杯八分之一决赛",     date: "2026-05", category: "match",     ratio: "portrait"  },
  { id: 3, title: "2026成电杯小组赛",         date: "2026-05", category: "match", ratio: "landscape"    },
  { id: 4, title: "2025级新生杯",     date: "2025-11", category: "match",    ratio: "landscape" },
  { id: 5, title: "2023级新生杯",       date: "2023-09", category: "match",     ratio: "landscape"      },
  { id: 6, title: "2026格致杯决赛颁奖",       date: "2026-05", category: "ceremony", ratio: "landscape"  },
  { id: 7, title: "2022级新生杯",       date: "2022-10", category: "match", ratio: "landscape" },
  { id: 8, title: "赛前会议",     date: "2025", category: "meeting",    ratio: "landscape"    },
  { id: 9, title: "2026格致杯决赛",date:"2026-5", category: "match",    ratio: "landscape"  },
];
