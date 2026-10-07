function entries(prefix, values){
  return values.map((value,index)=>typeof value==='string'
    ? {id:`${prefix}-${index+1}`,label:value,detail:''}
    : {id:`${prefix}-${index+1}`,label:value.label,detail:entryDetail(value)});
}
// Bundled deck content in FIRST_PARTY_TAPES is licensed under CC BY-SA 4.0.
// See ../CONTENT_LICENSE.md. The surrounding software code is AGPL-3.0-only.
const FIRST_PARTY_TAPES = [
  {
    "id": "world-era",
    "name": "时代背景",
    "category": "剧情创作",
    "icon": "🏰",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "world-era-001",
        "label": "古生物纪（石炭纪前）",
        "detail": ""
      },
      {
        "id": "world-era-002",
        "label": "侏罗纪",
        "detail": ""
      },
      {
        "id": "world-era-003",
        "label": "白垩纪",
        "detail": ""
      },
      {
        "id": "world-era-004",
        "label": "冰河时代",
        "detail": ""
      },
      {
        "id": "world-era-005",
        "label": "新石器时代",
        "detail": ""
      },
      {
        "id": "world-era-006",
        "label": "青铜时代",
        "detail": ""
      },
      {
        "id": "world-era-007",
        "label": "古埃及新王国",
        "detail": ""
      },
      {
        "id": "world-era-008",
        "label": "古希腊",
        "detail": ""
      },
      {
        "id": "world-era-009",
        "label": "罗马帝国",
        "detail": ""
      },
      {
        "id": "world-era-010",
        "label": "波斯帝国",
        "detail": ""
      },
      {
        "id": "world-era-011",
        "label": "汉代",
        "detail": ""
      },
      {
        "id": "world-era-012",
        "label": "魏晋",
        "detail": ""
      },
      {
        "id": "world-era-013",
        "label": "盛唐",
        "detail": ""
      },
      {
        "id": "world-era-014",
        "label": "两宋",
        "detail": ""
      },
      {
        "id": "world-era-015",
        "label": "明代",
        "detail": ""
      },
      {
        "id": "world-era-016",
        "label": "晚清",
        "detail": ""
      },
      {
        "id": "world-era-017",
        "label": "民国",
        "detail": ""
      },
      {
        "id": "world-era-018",
        "label": "平安时代",
        "detail": ""
      },
      {
        "id": "world-era-019",
        "label": "江户时代",
        "detail": ""
      },
      {
        "id": "world-era-020",
        "label": "明治时代",
        "detail": ""
      },
      {
        "id": "world-era-021",
        "label": "大正浪漫",
        "detail": ""
      },
      {
        "id": "world-era-022",
        "label": "维京时代",
        "detail": ""
      },
      {
        "id": "world-era-023",
        "label": "中世纪",
        "detail": ""
      },
      {
        "id": "world-era-024",
        "label": "文艺复兴",
        "detail": ""
      },
      {
        "id": "world-era-025",
        "label": "大航海时代",
        "detail": ""
      },
      {
        "id": "world-era-026",
        "label": "巴洛克",
        "detail": ""
      },
      {
        "id": "world-era-027",
        "label": "洛可可",
        "detail": ""
      },
      {
        "id": "world-era-028",
        "label": "摄政时代",
        "detail": ""
      },
      {
        "id": "world-era-029",
        "label": "维多利亚时代",
        "detail": ""
      },
      {
        "id": "world-era-030",
        "label": "美好年代",
        "detail": ""
      },
      {
        "id": "world-era-031",
        "label": "伊斯兰黄金时代",
        "detail": ""
      },
      {
        "id": "world-era-032",
        "label": "奥斯曼盛世",
        "detail": ""
      },
      {
        "id": "world-era-033",
        "label": "莫沃尔盛世",
        "detail": ""
      },
      {
        "id": "world-era-034",
        "label": "吴哥王朝",
        "detail": ""
      },
      {
        "id": "world-era-035",
        "label": "玛雅古典期",
        "detail": ""
      },
      {
        "id": "world-era-036",
        "label": "阿兹特克",
        "detail": ""
      },
      {
        "id": "world-era-037",
        "label": "印加",
        "detail": ""
      },
      {
        "id": "world-era-038",
        "label": "西部拓荒",
        "detail": ""
      },
      {
        "id": "world-era-039",
        "label": "工业革命",
        "detail": ""
      },
      {
        "id": "world-era-040",
        "label": "蒸汽时代",
        "detail": ""
      },
      {
        "id": "world-era-041",
        "label": "一战时期",
        "detail": ""
      },
      {
        "id": "world-era-042",
        "label": "二战时期",
        "detail": ""
      },
      {
        "id": "world-era-043",
        "label": "千禧年",
        "detail": ""
      },
      {
        "id": "world-era-044",
        "label": "当代（现代）",
        "detail": ""
      },
      {
        "id": "world-era-045",
        "label": "近未来",
        "detail": ""
      },
      {
        "id": "world-era-046",
        "label": "未来",
        "detail": ""
      }
    ]
  },
  {
    "id": "book-genres",
    "name": "书本题材",
    "category": "剧情创作",
    "icon": "📚",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "book-genres-001",
        "label": "玄幻",
        "detail": "修炼、宗门与天地法则。"
      },
      {
        "id": "book-genres-002",
        "label": "科幻",
        "detail": "技术、宇宙与未来社会。"
      },
      {
        "id": "book-genres-003",
        "label": "悬疑解谜",
        "detail": "线索、谜题与隐藏真相。"
      },
      {
        "id": "book-genres-004",
        "label": "奇幻",
        "detail": "魔法、异族与架空世界。"
      },
      {
        "id": "book-genres-005",
        "label": "历史",
        "detail": "真实时代中的人物与命运。"
      },
      {
        "id": "book-genres-006",
        "label": "武侠",
        "detail": "江湖、门派与侠义恩仇。"
      },
      {
        "id": "book-genres-007",
        "label": "都市",
        "detail": "现代生活里的关系与故事。"
      },
      {
        "id": "book-genres-008",
        "label": "冒险",
        "detail": "远行、探索与未知险境。"
      },
      {
        "id": "book-genres-009",
        "label": "恐怖",
        "detail": "压迫、怪谈与不可知之物。"
      },
      {
        "id": "book-genres-010",
        "label": "末日",
        "detail": "灾变之后的生存与重建。"
      },
      {
        "id": "book-genres-011",
        "label": "赛博朋克",
        "detail": "高科技、低生活与霓虹城市。"
      },
      {
        "id": "book-genres-012",
        "label": "无限流",
        "detail": "副本轮回、规则破解与生存。"
      }
    ]
  },
  {
    "id": "macro-region",
    "name": "宏观地域",
    "category": "剧情创作",
    "icon": "🌍",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "macro-region-001",
        "label": "海洋",
        "detail": "广阔水域占据主要空间，可包含远洋、深海、海上航线与孤立海域。"
      },
      {
        "id": "macro-region-002",
        "label": "海岸",
        "detail": "陆地与海洋交界地带，可出现沙滩、峭壁、港湾、潮汐与沿海聚落。"
      },
      {
        "id": "macro-region-003",
        "label": "群岛",
        "detail": "众多岛屿散布于海域之中，交通与文化天然受到海洋和距离影响。"
      },
      {
        "id": "macro-region-004",
        "label": "寒带雪原",
        "detail": "长期寒冷积雪的广大区域，可包含雪原、针叶林、冻湖与冰封聚落。"
      },
      {
        "id": "macro-region-005",
        "label": "极地",
        "detail": "接近世界极寒边缘的区域，冰盖、冰川、永冻层、极昼极夜与严酷气候占主导。"
      },
      {
        "id": "macro-region-006",
        "label": "冻土苔原",
        "detail": "低矮植被与永久冻土主导的寒冷开阔地带，季节短促，资源与交通受气候强烈制约。"
      },
      {
        "id": "macro-region-007",
        "label": "沙漠",
        "detail": "干旱少雨的广大地区，可包含沙丘、戈壁、盐碱地与漫长商路。"
      },
      {
        "id": "macro-region-008",
        "label": "绿洲",
        "detail": "干旱区域中的水源与植被集中地，常成为城市、商旅和文明节点。"
      },
      {
        "id": "macro-region-009",
        "label": "草原",
        "detail": "广阔平坦的草地环境，视野辽阔，适合游牧、骑行与迁徙生活。"
      },
      {
        "id": "macro-region-010",
        "label": "平原",
        "detail": "地势平缓、适合农业与大型聚落发展的区域，交通通常较便利。"
      },
      {
        "id": "macro-region-011",
        "label": "丘陵",
        "detail": "起伏连续但海拔不高的地域，常由缓坡、谷地、林地与零散聚落交织而成。"
      },
      {
        "id": "macro-region-012",
        "label": "盆地",
        "detail": "四周较高、内部相对低平的封闭或半封闭区域，气候、交通与文明容易形成独特体系。"
      },
      {
        "id": "macro-region-013",
        "label": "乡野",
        "detail": "村庄、田野、牧场与零散住宅组成的低密度生活区域。"
      },
      {
        "id": "macro-region-014",
        "label": "森林",
        "detail": "树木占主导的广大地域，可从温和林地延伸到幽深原始森林。"
      },
      {
        "id": "macro-region-015",
        "label": "雨林",
        "detail": "高温湿润、植被极度繁盛的环境，生态复杂且行动困难。"
      },
      {
        "id": "macro-region-016",
        "label": "湿地沼泽",
        "detail": "水陆交错、地面潮湿的区域，可包含沼泽、芦苇荡、滩涂与泥潭。"
      },
      {
        "id": "macro-region-017",
        "label": "大河流域",
        "detail": "由大型河流及其支流塑造的广阔区域，交通、农业、聚落与文明常沿水系展开。"
      },
      {
        "id": "macro-region-018",
        "label": "湖区水乡",
        "detail": "湖泊、河网、浅滩与水上聚落密集的内陆水域，生活与交通高度依赖舟船和水路。"
      },
      {
        "id": "macro-region-019",
        "label": "山地",
        "detail": "山峰、山谷与陡峭地形构成主要环境，聚落和道路往往彼此隔绝。"
      },
      {
        "id": "macro-region-020",
        "label": "高原",
        "detail": "海拔较高而整体开阔的区域，气候、植被和生存方式具有鲜明特点。"
      },
      {
        "id": "macro-region-021",
        "label": "峡谷",
        "detail": "被山体或河流切割形成的狭长地貌，空间纵深强烈、出入口有限。"
      },
      {
        "id": "macro-region-022",
        "label": "火山地带",
        "detail": "火山、熔岩、温泉与地热活动显著，可处于活跃期或留下大片遗迹。"
      },
      {
        "id": "macro-region-023",
        "label": "荒原",
        "detail": "人烟稀少、资源有限的开放土地，可寒冷、干燥或长期无人开发。"
      },
      {
        "id": "macro-region-024",
        "label": "废土",
        "detail": "战争、灾变、污染或文明崩塌后形成的大片失序区域，遗迹与危险共同塑造生存方式。"
      },
      {
        "id": "macro-region-025",
        "label": "都市",
        "detail": "高密度人口与建筑组成的大型城市区域，生活、商业与社会关系高度集中。"
      },
      {
        "id": "macro-region-026",
        "label": "巨型都市",
        "detail": "城市规模远超普通都市，城区可能连续延伸数百公里并形成多层社会空间。"
      },
      {
        "id": "macro-region-027",
        "label": "工业区",
        "detail": "工厂、矿区、仓储、铁路与能源设施主导环境，人工痕迹远强于自然景观。"
      },
      {
        "id": "macro-region-028",
        "label": "边陲地区",
        "detail": "位于文明、国家或已知世界边缘，秩序较弱，文化与势力容易混杂。"
      },
      {
        "id": "macro-region-029",
        "label": "地下世界",
        "detail": "大规模洞穴、地下城市或地下生态组成的地域，地表不再是主要活动空间。"
      },
      {
        "id": "macro-region-030",
        "label": "浮空群岛",
        "detail": "陆地悬浮于天空并彼此分离，需要飞行、桥梁或特殊交通方式往来。"
      },
      {
        "id": "macro-region-031",
        "label": "水下世界",
        "detail": "主要活动区域位于水面以下，可包含海底平原、深渊、珊瑚生态与水下聚落。"
      },
      {
        "id": "macro-region-032",
        "label": "轨道空间",
        "detail": "围绕行星运行的人造活动区域，可包含大型空间站、轨道城市、居住环、船坞与不同轨道间的交通网络。"
      },
      {
        "id": "macro-region-033",
        "label": "深空区域",
        "detail": "远离行星地表与近地轨道的宇宙空间，可包含星际航线、舰队活动区、孤立科研站、小行星带与漫长无人区。"
      },
      {
        "id": "macro-region-034",
        "label": "巨构内部",
        "detail": "活动范围位于规模堪比城市乃至大陆的人造结构内部，例如世代飞船、环世界局部、戴森结构或封闭生态巨构。"
      }
    ]
  },
  {
    "id": "specific-scene",
    "name": "具体场景",
    "category": "剧情创作",
    "icon": "🎬",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "specific-scene-001",
        "label": "住宅",
        "detail": "私人居住空间，可包含公寓、宅院、别墅或普通民居。"
      },
      {
        "id": "specific-scene-002",
        "label": "卧室",
        "detail": "私密休息空间，天然适合安静、亲密、失眠或深夜剧情。"
      },
      {
        "id": "specific-scene-003",
        "label": "客厅",
        "detail": "日常生活与接待空间，适合聊天、吃东西、看电视、等待或争执。"
      },
      {
        "id": "specific-scene-004",
        "label": "厨房",
        "detail": "烹饪与进食相关空间，很适合生活感强的互动与忙乱日常。"
      },
      {
        "id": "specific-scene-005",
        "label": "饭厅",
        "detail": "围绕正式或日常用餐展开的空间，可从家庭餐桌延伸到宴席长桌。"
      },
      {
        "id": "specific-scene-006",
        "label": "浴室",
        "detail": "洗浴、更衣与独处空间，可从普通浴室延伸到大型浴池。"
      },
      {
        "id": "specific-scene-007",
        "label": "更衣室",
        "detail": "换装、整理装备与短暂停留的空间，兼具私密与临场感。"
      },
      {
        "id": "specific-scene-008",
        "label": "书房 / 私人工作室",
        "detail": "个人阅读、写作、办公或创作空间，适合安静相处与被工作打断的剧情。"
      },
      {
        "id": "specific-scene-009",
        "label": "阳台 / 露台",
        "detail": "半开放的私人空间，适合晒太阳、吹风、夜聊、晾衣或偷偷观察外面。"
      },
      {
        "id": "specific-scene-010",
        "label": "庭院",
        "detail": "建筑内部或旁侧的开放空间，可种花、乘凉、练武、会客或举办小型活动。"
      },
      {
        "id": "specific-scene-011",
        "label": "花园 / 温室",
        "detail": "植物密集的半人工空间，可浪漫、幽静，也可藏有珍稀植物或秘密。"
      },
      {
        "id": "specific-scene-012",
        "label": "阁楼 / 地下室",
        "detail": "住宅或建筑中的边缘空间，适合储物、藏身、旧物回忆与秘密发现。"
      },
      {
        "id": "specific-scene-013",
        "label": "车库",
        "detail": "车辆、工具与杂物共存的实用空间，可用于修理、出发前准备或秘密进出。"
      },
      {
        "id": "specific-scene-014",
        "label": "屋顶 / 高台",
        "detail": "位置较高、视野开阔的场所，天然适合夜景、谈心、放风与秘密碰面。"
      },
      {
        "id": "specific-scene-015",
        "label": "走廊 / 楼梯间",
        "detail": "连接不同空间的过渡区域，适合擦肩、偷听、追逐、拦人或深夜偶遇。"
      },
      {
        "id": "specific-scene-016",
        "label": "电梯 / 升降舱",
        "detail": "狭小封闭的垂直交通空间，适合被迫靠近、短暂独处或突发停运。"
      },
      {
        "id": "specific-scene-017",
        "label": "旅店 / 客栈",
        "detail": "临时住宿地点，可对应现代酒店、古代客栈或异世界旅馆。"
      },
      {
        "id": "specific-scene-018",
        "label": "温泉旅店",
        "detail": "以温泉、休息和住宿为核心的场所，天然带有度假、放松与暧昧气氛。"
      },
      {
        "id": "specific-scene-019",
        "label": "酒馆 / 酒吧",
        "detail": "饮酒、社交、打听消息或偶遇人物的公共空间。"
      },
      {
        "id": "specific-scene-020",
        "label": "夜店 / 舞厅",
        "detail": "音乐、人群、灯光与身体活动占主导的社交场所，气氛比酒吧更喧闹外放。"
      },
      {
        "id": "specific-scene-021",
        "label": "餐馆 / 茶馆",
        "detail": "以吃饭、喝茶和交谈为主的场所，可适配古今各种世界。"
      },
      {
        "id": "specific-scene-022",
        "label": "咖啡馆",
        "detail": "较安静的休闲空间，适合约会、工作、等人或观察路人。"
      },
      {
        "id": "specific-scene-023",
        "label": "商店",
        "detail": "固定经营的买卖场所，可从杂货铺、便利店延伸到精品店与魔法商铺。"
      },
      {
        "id": "specific-scene-024",
        "label": "市集",
        "detail": "摊位、人流与叫卖声密集的开放交易场所，适合闲逛、追踪、讨价还价与偶遇。"
      },
      {
        "id": "specific-scene-025",
        "label": "商场 / 百货",
        "detail": "多店铺集中于同一大型建筑中的消费空间，适合现代都市日常与长时间闲逛。"
      },
      {
        "id": "specific-scene-026",
        "label": "理发店 / 美容室",
        "detail": "整理外表与短暂停留的服务空间，适合轻松聊天、改造造型或等待。"
      },
      {
        "id": "specific-scene-027",
        "label": "洗衣店 / 自助洗衣房",
        "detail": "围绕清洗、烘干与等待展开的小型公共空间，生活感很强。"
      },
      {
        "id": "specific-scene-028",
        "label": "公共浴场 / 澡堂",
        "detail": "多人共享的洗浴与休息空间，可适配现代澡堂、古代浴场或异世界公共浴池。"
      },
      {
        "id": "specific-scene-029",
        "label": "赌场 / 博彩厅",
        "detail": "以赌局、筹码与高风险娱乐为核心的场所，适合欲望、骗局与输赢关系。"
      },
      {
        "id": "specific-scene-030",
        "label": "游乐园 / 嘉年华",
        "detail": "游乐设施、摊位与人群组成的娱乐空间，适合约会、迷路、追逐与节庆事件。"
      },
      {
        "id": "specific-scene-031",
        "label": "图书馆",
        "detail": "藏书、阅读和查资料的安静空间，也很适合秘密、线索与偶遇。"
      },
      {
        "id": "specific-scene-032",
        "label": "博物馆 / 展览馆",
        "detail": "展示文物、艺术品或专题展览的公共空间，适合调查、约会与历史线索。"
      },
      {
        "id": "specific-scene-033",
        "label": "剧院 / 影院",
        "detail": "围绕观看演出或影像展开的空间，可安静观赏，也可发生谢幕后故事。"
      },
      {
        "id": "specific-scene-034",
        "label": "舞台后台 / 化妆间",
        "detail": "表演前后人员密集又半私密的区域，适合候场、换装、临时冲突与秘密交流。"
      },
      {
        "id": "specific-scene-035",
        "label": "学校 / 学院",
        "detail": "学习、训练与集体生活场所，可适配普通学校、魔法学院或宗门学宫。"
      },
      {
        "id": "specific-scene-036",
        "label": "教室 / 讲堂",
        "detail": "相对具体的教学空间，适合授课、考试、留堂、会议与空教室剧情。"
      },
      {
        "id": "specific-scene-037",
        "label": "宿舍",
        "detail": "多人或少量成员共同居住的集体生活空间，适合夜聊、串门与生活摩擦。"
      },
      {
        "id": "specific-scene-038",
        "label": "办公室 / 事务所",
        "detail": "处理行政、业务、调查或日常工作的空间，适合现代职场与机构剧情。"
      },
      {
        "id": "specific-scene-039",
        "label": "工坊 / 工作室",
        "detail": "制作、修理、绘画、锻造或手工创作的空间，工具与材料会强烈影响互动。"
      },
      {
        "id": "specific-scene-040",
        "label": "实验室 / 研究所",
        "detail": "进行实验、研究和危险项目的空间，科技、炼金与魔法体系都适用。"
      },
      {
        "id": "specific-scene-041",
        "label": "医院 / 医务室",
        "detail": "治疗、检查、休养与照顾伤者的场所，可从大型医院延伸到临时医务点。"
      },
      {
        "id": "specific-scene-042",
        "label": "病房 / 诊室",
        "detail": "更具体的医疗空间，适合检查、陪护、等待结果与恢复期剧情。"
      },
      {
        "id": "specific-scene-043",
        "label": "健身房 / 训练场",
        "detail": "锻炼身体、练习技能或接受训练的空间，可适配现代健身、武术与军训。"
      },
      {
        "id": "specific-scene-044",
        "label": "竞技场 / 赛场",
        "detail": "公开比赛、决斗或大型竞技活动发生的场所，自带观众、输赢与压力。"
      },
      {
        "id": "specific-scene-045",
        "label": "摄影棚 / 片场",
        "detail": "围绕拍摄、灯光、布景与表演运作的场所，适合工作、伪装与幕后互动。"
      },
      {
        "id": "specific-scene-046",
        "label": "仓库 / 储藏室",
        "detail": "货物、器材与杂物密集的封闭空间，适合找东西、藏身、误锁与埋伏。"
      },
      {
        "id": "specific-scene-047",
        "label": "工厂 / 生产车间",
        "detail": "机械、流水线与高噪声主导的工作空间，可现代、蒸汽或科幻化。"
      },
      {
        "id": "specific-scene-048",
        "label": "矿井 / 采掘场",
        "detail": "深入地下或山体的资源开采空间，狭窄、危险且高度依赖设备与路线。"
      },
      {
        "id": "specific-scene-049",
        "label": "数据中心 / 机房",
        "detail": "服务器、冷却与网络设施密集的技术空间，适合黑客、潜入与系统故障剧情。"
      },
      {
        "id": "specific-scene-050",
        "label": "天文台 / 观测站",
        "detail": "用于观察天空、气象或远方目标的设施，常位于高处或偏远地带。"
      },
      {
        "id": "specific-scene-051",
        "label": "车站",
        "detail": "出发、抵达、等待和分别的交通节点，可从小站延伸到大型枢纽。"
      },
      {
        "id": "specific-scene-052",
        "label": "码头 / 港口",
        "detail": "船只停靠、装卸与人员往来的水上交通节点，适合启程、走私与归航。"
      },
      {
        "id": "specific-scene-053",
        "label": "机场 / 航站楼",
        "detail": "大型航空交通节点，适合赶路、重逢、告别、安检与延误剧情。"
      },
      {
        "id": "specific-scene-054",
        "label": "列车 / 地铁车厢",
        "detail": "正在移动的封闭公共交通空间，适合旅途、同行、偶遇与长时间共处。"
      },
      {
        "id": "specific-scene-055",
        "label": "汽车 / 房车",
        "detail": "更私人、更灵活的移动空间，可用于公路旅行、夜宿、长谈与临时停靠。"
      },
      {
        "id": "specific-scene-056",
        "label": "飞船舱室",
        "detail": "宇宙航行中的封闭生活或工作空间，可包含驾驶舱、居住舱、货舱与维护区。"
      },
      {
        "id": "specific-scene-057",
        "label": "船舱 / 甲板",
        "detail": "水上航行空间，可在封闭船舱与开放甲板之间切换，适合旅途与风浪事件。"
      },
      {
        "id": "specific-scene-058",
        "label": "街道 / 巷子",
        "detail": "城市或聚落内部的开放通行空间，可热闹，也可安静偏僻。"
      },
      {
        "id": "specific-scene-059",
        "label": "广场",
        "detail": "人流集中、视野开阔的公共空间，适合集会、演出、偶遇与大型事件。"
      },
      {
        "id": "specific-scene-060",
        "label": "公园",
        "detail": "以散步、休憩与绿地为主的城市公共空间，适合日常约会与安静观察。"
      },
      {
        "id": "specific-scene-061",
        "label": "桥梁",
        "detail": "跨越河流、峡谷或道路的连接空间，适合通行、驻足与远眺。"
      },
      {
        "id": "specific-scene-062",
        "label": "河岸 / 堤坝",
        "detail": "临水停留与通行空间，适合散步、等待、看水与季节性事件。"
      },
      {
        "id": "specific-scene-063",
        "label": "海滩 / 湖畔",
        "detail": "开放的临水休闲空间，可安静、热闹，也可用于旅行与度假。"
      },
      {
        "id": "specific-scene-064",
        "label": "隧道 / 地下通道",
        "detail": "连接区域的封闭通行空间，光线、回声与方向感会明显影响气氛。"
      },
      {
        "id": "specific-scene-065",
        "label": "下水道 / 维修通道",
        "detail": "位于城市或设施下方的功能空间，狭窄、潮湿且结构复杂。"
      },
      {
        "id": "specific-scene-066",
        "label": "边境关卡 / 检查站",
        "detail": "位于地域或势力边界的通行节点，围绕身份、手续与等待展开。"
      },
      {
        "id": "specific-scene-067",
        "label": "森林深处",
        "detail": "远离聚落的自然空间，可安静、神秘，也可充满未知生态。"
      },
      {
        "id": "specific-scene-068",
        "label": "山洞 / 避难所",
        "detail": "封闭而临时的停留空间，适合躲雨、休息、过夜与等待天气好转。"
      },
      {
        "id": "specific-scene-069",
        "label": "营地 / 驻地",
        "detail": "临时集体生活空间，可对应冒险队营地、野外驻扎或长期据点。"
      },
      {
        "id": "specific-scene-070",
        "label": "农场 / 牧场",
        "detail": "围绕种植、畜牧与日常劳作展开的生活空间，季节感和烟火气很强。"
      },
      {
        "id": "specific-scene-071",
        "label": "田野 / 果园",
        "detail": "开放的农业空间，可用于劳作、散步、采收与季节性活动。"
      },
      {
        "id": "specific-scene-072",
        "label": "遗迹 / 废墟",
        "detail": "被遗弃或毁坏的旧建筑群，可包含历史痕迹、谜团与隐藏空间。"
      },
      {
        "id": "specific-scene-073",
        "label": "墓园 / 纪念地",
        "detail": "用于安葬、追思或纪念的安静场所，天然带有时间与往事的重量。"
      },
      {
        "id": "specific-scene-074",
        "label": "神殿 / 教堂",
        "detail": "宗教或神圣空间，可用于祈祷、仪式、婚礼、节庆与重要誓言。"
      },
      {
        "id": "specific-scene-075",
        "label": "城堡 / 宫殿",
        "detail": "权力与身份高度集中的大型建筑，适合贵族、王权、宴会与政治故事。"
      },
      {
        "id": "specific-scene-076",
        "label": "议事厅 / 王座厅",
        "detail": "举行正式会议、接见与重大决定的权力空间，礼仪感和等级感很强。"
      },
      {
        "id": "specific-scene-077",
        "label": "监狱 / 地牢",
        "detail": "用于限制行动与看守人员的封闭场所，空间规则严格，环境通常压抑。"
      },
      {
        "id": "specific-scene-078",
        "label": "法庭 / 审讯室",
        "detail": "围绕证词、判断、问询与程序展开的制度空间，适合高压对话与事实揭示。"
      },
      {
        "id": "specific-scene-079",
        "label": "军营 / 指挥所",
        "detail": "围绕训练、部署、休整与集体生活运作的军事空间。"
      },
      {
        "id": "specific-scene-080",
        "label": "秘密基地 / 安全屋",
        "detail": "位置隐蔽、人员有限的专用空间，可用于休整、准备、藏物或私下会面。"
      },
      {
        "id": "specific-scene-081",
        "label": "灯塔 / 瞭望塔",
        "detail": "位于高处或岸边的观察设施，视野开阔，常带有孤独与守望感。"
      },
      {
        "id": "specific-scene-082",
        "label": "温室生态舱 / 生物舱",
        "detail": "人工维持植物、生态或生命系统的封闭空间，适合科幻与末日题材。"
      },
      {
        "id": "specific-scene-083",
        "label": "空间站舱室 / 轨道港",
        "detail": "位于轨道设施内部的生活与交通空间，可包含居住舱、港口、公共区与观景窗。"
      },
      {
        "id": "specific-scene-084",
        "label": "虚拟空间 / 模拟舱",
        "detail": "以数字环境、意识连接或沉浸模拟为核心的场景，现实规则可以被重新定义。"
      },
      {
        "id": "specific-scene-085",
        "label": "祭坛 / 仪式场",
        "detail": "围绕献礼、宣誓、庆典或神秘仪式设置的特殊空间，象征意味很强。"
      },
      {
        "id": "specific-scene-086",
        "label": "地下避难设施",
        "detail": "为长期避险与封闭生活准备的地下或加固空间，适合灾后、极端天气与资源管理剧情。"
      },
      {
        "id": "specific-scene-087",
        "label": "水族馆 / 动物园",
        "detail": "以观察和展示生物为核心的公共空间，适合约会、学习与安静闲逛。"
      },
      {
        "id": "specific-scene-088",
        "label": "游泳馆 / 泳池",
        "detail": "围绕游泳、训练和休闲展开的水上空间，可室内也可露天。"
      },
      {
        "id": "specific-scene-089",
        "label": "档案室 / 禁书库",
        "detail": "保存文件、旧记录或受限资料的安静空间，适合查阅历史与发现线索。"
      },
      {
        "id": "specific-scene-090",
        "label": "诊疗舱 / 冷冻舱",
        "detail": "高度设备化的医疗与维生空间，适合未来科技、长途航行与特殊治疗剧情。"
      }
    ]
  },
  {
    "id": "world-rules",
    "name": "世界运行法则",
    "category": "剧情创作",
    "icon": "⚙️",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "world-rules-001",
        "label": "纯现实法则",
        "detail": "世界基本遵循现实物理与社会常识，不存在公开可验证的超自然机制。"
      },
      {
        "id": "world-rules-002",
        "label": "隐秘超自然",
        "detail": "超自然力量真实存在，但被少数群体、机构或传统秘密掌握。"
      },
      {
        "id": "world-rules-003",
        "label": "公开超自然",
        "detail": "魔法、异能或怪异现象属于公开常识，社会制度已围绕它们调整。"
      },
      {
        "id": "world-rules-004",
        "label": "超凡无处不在",
        "detail": "几乎所有日常生活都与超凡力量相连，普通与神奇之间没有明确边界。"
      },
      {
        "id": "world-rules-005",
        "label": "神明真实存在",
        "detail": "神明可被观察、沟通或证实，其意志会直接影响世界。"
      },
      {
        "id": "world-rules-006",
        "label": "神明沉默或陨落",
        "detail": "宗教遗迹与神迹仍在，但神明已经沉默、消失或死亡。"
      },
      {
        "id": "world-rules-007",
        "label": "鬼魂普遍存在",
        "detail": "死亡不会彻底切断个体与世界的联系，灵魂或幽灵可被感知。"
      },
      {
        "id": "world-rules-008",
        "label": "轮回可验证",
        "detail": "转世是真实规律，前世身份、记忆或因果可能被追溯。"
      },
      {
        "id": "world-rules-009",
        "label": "复活可行",
        "detail": "死亡并非绝对终点，但复活通常需要条件、代价或稀缺技术。"
      },
      {
        "id": "world-rules-010",
        "label": "彼岸可抵达",
        "detail": "活人可以进入死后世界、灵界或其他生命层级并返回。"
      },
      {
        "id": "world-rules-011",
        "label": "梦境互通",
        "detail": "梦境是共享空间、信息通道或真实维度，而非单纯私人幻觉。"
      },
      {
        "id": "world-rules-012",
        "label": "平行世界并存",
        "detail": "多个世界或时间线同时存在，并可能发生穿越、重叠或交换。"
      },
      {
        "id": "world-rules-013",
        "label": "时间循环",
        "detail": "特定区域、人物或事件可以反复经历同一段时间。"
      },
      {
        "id": "world-rules-014",
        "label": "有限时间旅行",
        "detail": "时间旅行存在，但受到严格条件、悖论限制或不可逆代价约束。"
      },
      {
        "id": "world-rules-015",
        "label": "因果可观测",
        "detail": "因果关系能够被读取、追踪或显形，行为后果不再完全不可见。"
      },
      {
        "id": "world-rules-016",
        "label": "命运可预测",
        "detail": "未来存在可被占卜、计算或推演的轨迹，但预测并不等于绝对固定。"
      },
      {
        "id": "world-rules-017",
        "label": "命运可改写",
        "detail": "预定结局能够被干预，修改往往会产生新的分支、代价或连锁反应。"
      },
      {
        "id": "world-rules-018",
        "label": "真名具有约束力",
        "detail": "真实姓名与身份绑定，掌握真名可能意味着获得特殊权限或影响力。"
      },
      {
        "id": "world-rules-019",
        "label": "契约自动生效",
        "detail": "正式约定会被世界本身记录并执行，违约会触发明确后果。"
      },
      {
        "id": "world-rules-020",
        "label": "语言拥有力量",
        "detail": "特定语言、咒语、命令或宣言可以直接影响现实。"
      },
      {
        "id": "world-rules-021",
        "label": "文字可以成真",
        "detail": "书写、刻印、符号或文本能够改变对象、规则与环境。"
      },
      {
        "id": "world-rules-022",
        "label": "故事影响现实",
        "detail": "传说、叙事与被相信的故事会反过来塑造世界。"
      },
      {
        "id": "world-rules-023",
        "label": "情绪会实体化",
        "detail": "强烈情绪能够形成能量、生物、天气或可见现象。"
      },
      {
        "id": "world-rules-024",
        "label": "记忆可以交易",
        "detail": "记忆能够被储存、交换、出售、复制或作为资源使用。"
      },
      {
        "id": "world-rules-025",
        "label": "愿望必有代价",
        "detail": "愿望能够被实现，但世界会以等价条件、限制或意外方式结算。"
      },
      {
        "id": "world-rules-026",
        "label": "等价交换",
        "detail": "获得力量、知识或奇迹时必须支付相称资源，交换规则清晰可追踪。"
      },
      {
        "id": "world-rules-027",
        "label": "随机性受世界认可",
        "detail": "抽签、骰子、牌组或概率本身具有真实权威，可以决定事件走向。"
      },
      {
        "id": "world-rules-028",
        "label": "世界自带系统界面",
        "detail": "人物能够看到属性、状态、提示或世界信息，现实具有明显的信息化反馈。"
      },
      {
        "id": "world-rules-029",
        "label": "等级与技能存在",
        "detail": "成长可被量化为等级、技能树、熟练度或可学习能力。"
      },
      {
        "id": "world-rules-030",
        "label": "职业会觉醒",
        "detail": "个体在特定时机获得职业、天赋或社会身份，并由此改变能力路径。"
      },
      {
        "id": "world-rules-031",
        "label": "任务与奖励机制",
        "detail": "世界会生成明确目标，完成后获得资源、权限、成长或新的事件入口。"
      },
      {
        "id": "world-rules-032",
        "label": "排名决定地位",
        "detail": "个人、队伍、学院或组织的排名会影响资源、声望和社会关系。"
      },
      {
        "id": "world-rules-033",
        "label": "竞技主导社会",
        "detail": "比赛、竞速、决斗或联赛是世界核心活动，重大关系与资源围绕竞技展开。"
      },
      {
        "id": "world-rules-034",
        "label": "单一技艺高度中心化",
        "detail": "某一种技艺、运动、游戏或手艺拥有超现实的重要地位，几乎贯穿整个社会。"
      },
      {
        "id": "world-rules-035",
        "label": "器械可以共鸣",
        "detail": "车辆、武器、乐器、工具或机器能与使用者形成特殊默契并展现超常性能。"
      },
      {
        "id": "world-rules-036",
        "label": "运动表现超现实化",
        "detail": "体能、技巧与竞技表现可以突破现实极限，但仍遵循该项目自身的规则感。"
      },
      {
        "id": "world-rules-037",
        "label": "伙伴生物融入社会",
        "detail": "可培养、训练或同行的特殊生物广泛参与交通、工作、竞技和日常生活。"
      },
      {
        "id": "world-rules-038",
        "label": "变身身份常见",
        "detail": "人物可通过装备、仪式或特定条件切换成另一种战斗或职业形态。"
      },
      {
        "id": "world-rules-039",
        "label": "昼夜规则不同",
        "detail": "白天与夜晚不仅氛围不同，还可能拥有不同生物、能力、法律或物理规则。"
      },
      {
        "id": "world-rules-040",
        "label": "季节改变法则",
        "detail": "不同季节会改变能力、生态、通行方式甚至世界规则本身。"
      },
      {
        "id": "world-rules-041",
        "label": "特殊区域规则化",
        "detail": "某些区域拥有独立法则，进入后必须遵守当地特有条件。"
      },
      {
        "id": "world-rules-042",
        "label": "禁区存在明确规则",
        "detail": "危险区域并非单纯环境恶劣，而是由可发现、可利用的规则支配。"
      },
      {
        "id": "world-rules-043",
        "label": "城市拥有意志",
        "detail": "城市、建筑群或巨大设施本身具有意识、偏好或主动反馈。"
      },
      {
        "id": "world-rules-044",
        "label": "世界周期性重置",
        "detail": "世界会在固定条件下重启、刷新或回到某个基准状态。"
      },
      {
        "id": "world-rules-045",
        "label": "物理常数可变化",
        "detail": "重力、时间流速、空间尺度或其他基础规律会因地点与条件改变。"
      },
      {
        "id": "world-rules-046",
        "label": "科技近似魔法",
        "detail": "高度发达技术在日常层面表现得像奇迹，普通人未必理解其底层原理。"
      },
      {
        "id": "world-rules-047",
        "label": "世界会观察角色",
        "detail": "世界机制会根据人物选择、身份或行为主动调整事件与反馈。"
      },
      {
        "id": "world-rules-048",
        "label": "规则可被破解利用",
        "detail": "世界规则并非只能服从，只要理解机制就能钻空子、组合或逆向利用。"
      },
      {
        "id": "world-rules-049",
        "label": "仪式与历法生效",
        "detail": "节日、星象、特定日期或仪式流程会真实改变世界状态与可用能力。"
      },
      {
        "id": "world-rules-050",
        "label": "声音与节奏影响现实",
        "detail": "音乐、口令、节拍或共振能够改变环境、群体状态或机械性能。"
      }
    ]
  },
  {
    "id": "power-system",
    "name": "力量体系",
    "category": "剧情创作",
    "icon": "✨",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "power-system-001",
        "label": "无超凡力量",
        "detail": "角色没有魔法或异能，优势主要来自知识、训练、资源、技术与社会关系。"
      },
      {
        "id": "power-system-002",
        "label": "修仙炼气",
        "detail": "通过吸纳天地能量、修炼功法与突破境界获得持续成长。"
      },
      {
        "id": "power-system-003",
        "label": "内力武学",
        "detail": "以内力、经脉、招式和身体训练为核心，能力依赖长期修习与临场发挥。"
      },
      {
        "id": "power-system-004",
        "label": "呼吸体术",
        "detail": "通过特殊呼吸、节奏与身体控制强化速度、力量、感知和招式表现。"
      },
      {
        "id": "power-system-005",
        "label": "魔力施法",
        "detail": "个体拥有魔力储备，通过咒语、法阵、媒介或意志释放法术。"
      },
      {
        "id": "power-system-006",
        "label": "元素操控",
        "detail": "火、水、风、雷、土、冰、光暗等元素构成主要能力分支。"
      },
      {
        "id": "power-system-007",
        "label": "神术信仰",
        "detail": "力量来自神明、圣物、祈祷或宗教身份，信仰与权限紧密相连。"
      },
      {
        "id": "power-system-008",
        "label": "巫术咒术",
        "detail": "借助仪式、材料、咒语、象征和禁忌施加特殊影响。"
      },
      {
        "id": "power-system-009",
        "label": "萨满通灵",
        "detail": "通过自然灵、祖灵或地方精怪获取信息、庇护与能力。"
      },
      {
        "id": "power-system-010",
        "label": "炼金术",
        "detail": "通过材料、配方、反应和转化制造药剂、器物与特殊效果。"
      },
      {
        "id": "power-system-011",
        "label": "符文术",
        "detail": "符号本身承载力量，可刻印在身体、物品、建筑或机械上。"
      },
      {
        "id": "power-system-012",
        "label": "阵法术式",
        "detail": "通过空间布局、节点、几何关系或多人配合形成范围效果。"
      },
      {
        "id": "power-system-013",
        "label": "符箓与纸术",
        "detail": "书写、绘制和激活符纸来完成封存、传讯、强化或召唤等功能。"
      },
      {
        "id": "power-system-014",
        "label": "魔导器体系",
        "detail": "力量主要储存在法杖、核心、器具或可编程魔法设备中。"
      },
      {
        "id": "power-system-015",
        "label": "天赋继承",
        "detail": "能力与家系、族群或先天特征相关，可能在特定阶段逐步显现。"
      },
      {
        "id": "power-system-016",
        "label": "异能觉醒",
        "detail": "个体自然或偶然获得独特能力，每个人的表现方式差异很大。"
      },
      {
        "id": "power-system-017",
        "label": "精神力体系",
        "detail": "念力、感知、心灵沟通与精神屏障等能力由精神强度驱动。"
      },
      {
        "id": "power-system-018",
        "label": "灵魂术",
        "detail": "围绕灵魂感知、灵体交流、灵魂强化与灵界互动展开。"
      },
      {
        "id": "power-system-019",
        "label": "梦境能力",
        "detail": "人物可进入、塑造或操控梦境，并把梦中信息带回现实。"
      },
      {
        "id": "power-system-020",
        "label": "情绪能力",
        "detail": "情绪本身转化为力量，不同情感会触发不同效果或形态。"
      },
      {
        "id": "power-system-021",
        "label": "音乐施法",
        "detail": "歌声、乐器、旋律与节奏能够驱动法术、共振或群体效果。"
      },
      {
        "id": "power-system-022",
        "label": "舞蹈施法",
        "detail": "动作、步法与舞蹈编排本身构成施法过程，越完整越稳定。"
      },
      {
        "id": "power-system-023",
        "label": "绘画成真",
        "detail": "绘画、书法、雕刻或视觉创作能够创造对象、空间或特殊效果。"
      },
      {
        "id": "power-system-024",
        "label": "料理赋能",
        "detail": "食物、饮品与烹饪过程可以提供强化、恢复、状态变化或特殊效果。"
      },
      {
        "id": "power-system-025",
        "label": "契约召唤",
        "detail": "通过契约与特定存在建立联系，需要时将其召来协助或借用力量。"
      },
      {
        "id": "power-system-026",
        "label": "使魔伙伴",
        "detail": "长期绑定的使魔、精灵或小型伙伴承担侦查、战斗、辅助与陪伴功能。"
      },
      {
        "id": "power-system-027",
        "label": "御兽体系",
        "detail": "通过发现、培养、训练与指挥特殊生物形成主要战斗和成长方式。"
      },
      {
        "id": "power-system-028",
        "label": "伙伴合体",
        "detail": "人物与伙伴生物、器具或灵体可以短暂融合，获得混合能力与新形态。"
      },
      {
        "id": "power-system-029",
        "label": "变身体系",
        "detail": "通过道具、口令、仪式或情绪触发形态转换，能力随形态改变。"
      },
      {
        "id": "power-system-030",
        "label": "卡牌能力",
        "detail": "能力以卡牌、牌组或抽取机制组织，可召唤、组合、升级与连锁。"
      },
      {
        "id": "power-system-031",
        "label": "神器共鸣",
        "detail": "古老器物、遗物或特殊装备会选择主人，并随关系深化解锁能力。"
      },
      {
        "id": "power-system-032",
        "label": "灵性武器",
        "detail": "武器拥有意识、个性或成长性，使用者与武器关系会直接影响性能。"
      },
      {
        "id": "power-system-033",
        "label": "机甲驾驶",
        "detail": "通过大型机械、装甲或人形兵器放大个体能力与团队配合。"
      },
      {
        "id": "power-system-034",
        "label": "载具共鸣",
        "detail": "赛车、自行车、飞行器或其他载具能与驾驶者形成特殊反馈并突破常规性能。"
      },
      {
        "id": "power-system-035",
        "label": "竞技技艺具现化",
        "detail": "某种运动、游戏或技巧达到极致后，会产生近似超能力的表现与视觉效果。"
      },
      {
        "id": "power-system-036",
        "label": "外骨骼装备",
        "detail": "依靠可穿戴机械装甲、动力结构与专用设备获得额外机动与功能。"
      },
      {
        "id": "power-system-037",
        "label": "纳米科技",
        "detail": "微型机器群可完成修复、建造、变形、感知与环境操控。"
      },
      {
        "id": "power-system-038",
        "label": "人工智能协同",
        "detail": "智能助手、战术AI或数字伙伴与人物协作，提供分析、预测与实时支援。"
      },
      {
        "id": "power-system-039",
        "label": "量子科技",
        "detail": "利用量子计算、纠缠或不确定性实现特殊通信、预测与空间效果。"
      },
      {
        "id": "power-system-040",
        "label": "能量核心",
        "detail": "力量来自可储存与输出高密度能量的核心、晶体、电池或炉心。"
      },
      {
        "id": "power-system-041",
        "label": "虫群协同",
        "detail": "大量微型个体以群体方式行动，力量来自数量、分工与共享感知。"
      },
      {
        "id": "power-system-042",
        "label": "植物术法",
        "detail": "植物生长、藤蔓、种子、花粉与生态网络构成主要能力来源。"
      },
      {
        "id": "power-system-043",
        "label": "天气操控",
        "detail": "风雨、雷电、雾雪、气压与局地气候可以被引导或制造。"
      },
      {
        "id": "power-system-044",
        "label": "空间能力",
        "detail": "移动、折叠、传送、储物与空间切割等效果围绕空间本身展开。"
      },
      {
        "id": "power-system-045",
        "label": "时间能力",
        "detail": "加速、减速、暂停或回溯局部时间成为可掌握的特殊能力。"
      },
      {
        "id": "power-system-046",
        "label": "重力操控",
        "detail": "改变重力方向与强弱，用于移动、压制、飞行或环境塑形。"
      },
      {
        "id": "power-system-047",
        "label": "概率操控",
        "detail": "通过影响运气与事件发生率，改变原本不确定的结果。"
      },
      {
        "id": "power-system-048",
        "label": "幻术体系",
        "detail": "通过感官、认知或信息干涉制造以假乱真的体验与场景。"
      },
      {
        "id": "power-system-049",
        "label": "生命术法",
        "detail": "以恢复、活力、组织修复与生态能量为核心，偏向维持与重建。"
      },
      {
        "id": "power-system-050",
        "label": "物质炼成",
        "detail": "能够改变材料形态、结构与性质，把普通物质转化为新的用途。"
      }
    ]
  },
  {
    "id": "civilization-ecology",
    "name": "居民与文明生态",
    "category": "剧情创作",
    "icon": "🧬",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "civilization-ecology-001",
        "label": "人类单一文明",
        "detail": "世界主要由人类构成，其他智慧物种不存在或只存在于传说中。"
      },
      {
        "id": "civilization-ecology-002",
        "label": "人类占多数",
        "detail": "人类是主要人口，但少数其他智慧族群稳定存在并参与社会。"
      },
      {
        "id": "civilization-ecology-003",
        "label": "人类是少数",
        "detail": "人类存在却并非主导者，需要适应其他智慧族群建立的秩序。"
      },
      {
        "id": "civilization-ecology-004",
        "label": "从未出现人类",
        "detail": "世界历史中没有人类，文明完全由其他智慧生命发展出来。"
      },
      {
        "id": "civilization-ecology-005",
        "label": "人类限制进入",
        "detail": "部分文明、地域或世界规则不允许人类自由进入或长期停留。"
      },
      {
        "id": "civilization-ecology-006",
        "label": "多族群混居",
        "detail": "大量智慧族群共同生活，城市、制度与文化天然为多样形态设计。"
      },
      {
        "id": "civilization-ecology-007",
        "label": "动物文明",
        "detail": "智慧动物建立城市、职业与社会制度，外形仍明显保留动物特征。"
      },
      {
        "id": "civilization-ecology-008",
        "label": "兽人文明",
        "detail": "居民兼具人形与动物特征，不同兽系可能形成鲜明文化与生活方式。"
      },
      {
        "id": "civilization-ecology-009",
        "label": "变形种族",
        "detail": "居民能够在人形、兽形或其他形态之间切换，身份与形态关系复杂。"
      },
      {
        "id": "civilization-ecology-010",
        "label": "水生文明",
        "detail": "主要居民适应海洋、湖泊或水下环境，城市与交通围绕水域设计。"
      },
      {
        "id": "civilization-ecology-011",
        "label": "天空居民",
        "detail": "主要族群拥有飞行能力或长期生活在高空、浮岛与空中城市。"
      },
      {
        "id": "civilization-ecology-012",
        "label": "地下居民",
        "detail": "主要文明长期生活于洞穴、地下城市或地底生态，对地表并不依赖。"
      },
      {
        "id": "civilization-ecology-013",
        "label": "植物智慧文明",
        "detail": "具有意识的树木、藤蔓、花朵或植物群落形成社会与交流网络。"
      },
      {
        "id": "civilization-ecology-014",
        "label": "菌丝文明",
        "detail": "真菌、孢子与地下菌丝网络承担感知、记忆、通信甚至城市基础设施功能。"
      },
      {
        "id": "civilization-ecology-015",
        "label": "胶质生命文明",
        "detail": "柔软、流动或可变形的智慧生命构成社会，身体边界与建筑尺度都与人类不同。"
      },
      {
        "id": "civilization-ecology-016",
        "label": "昆虫型文明",
        "detail": "居民以昆虫或节肢生命为原型，社会可能重视蜕变、群落与精细分工。"
      },
      {
        "id": "civilization-ecology-017",
        "label": "蜂巢意识",
        "detail": "大量个体共享部分记忆、感知或决策能力，个体与整体边界非常模糊。"
      },
      {
        "id": "civilization-ecology-018",
        "label": "龙族主导",
        "detail": "龙类或大型智慧飞行生物处于文明核心，其他族群围绕其力量与寿命适应。"
      },
      {
        "id": "civilization-ecology-019",
        "label": "巨人文明",
        "detail": "大型智慧生命建立适配巨大尺度的城市、工具与社会，普通尺度角色需要重新适应。"
      },
      {
        "id": "civilization-ecology-020",
        "label": "微型族群",
        "detail": "居民体型极小，普通物件、植物和建筑结构都会成为巨大的环境要素。"
      },
      {
        "id": "civilization-ecology-021",
        "label": "元素生命",
        "detail": "居民由火、水、风、岩石、光等自然要素构成，生理与居住需求非常特殊。"
      },
      {
        "id": "civilization-ecology-022",
        "label": "灵体文明",
        "detail": "居民以灵体、幽影、能量体或非实体形态存在，物质世界只是其活动层之一。"
      },
      {
        "id": "civilization-ecology-023",
        "label": "亡灵社会",
        "detail": "长久存在的亡灵、骸骨或不再依赖普通生命过程的居民拥有稳定社会与制度。"
      },
      {
        "id": "civilization-ecology-024",
        "label": "魔族文明",
        "detail": "具有超自然特征的魔族或异界居民建立自己的政治、家庭与日常秩序。"
      },
      {
        "id": "civilization-ecology-025",
        "label": "圣灵族群",
        "detail": "带有神圣、光明或天界特征的居民形成自己的组织、礼仪与社会角色。"
      },
      {
        "id": "civilization-ecology-026",
        "label": "人工生命文明",
        "detail": "被制造出来的生命拥有独立人格、繁衍方式与社会认同。"
      },
      {
        "id": "civilization-ecology-027",
        "label": "机械生命文明",
        "detail": "机器人、机械体或自我维护的机器生命成为社会主要居民。"
      },
      {
        "id": "civilization-ecology-028",
        "label": "人工智能文明",
        "detail": "数字智能或网络人格拥有法律地位、社会关系与自己的生活空间。"
      },
      {
        "id": "civilization-ecology-029",
        "label": "上传意识社会",
        "detail": "人格可以迁移到数字载体、仿生载体或共享网络中继续生活。"
      },
      {
        "id": "civilization-ecology-030",
        "label": "克隆社会",
        "detail": "大量成员拥有相似来源或模板，但通过经历、职业与选择形成不同个体。"
      },
      {
        "id": "civilization-ecology-031",
        "label": "多星球居民",
        "detail": "同一文明分布在多个星球或卫星，不同居住地发展出鲜明生活方式与文化。"
      },
      {
        "id": "civilization-ecology-032",
        "label": "共享记忆族群",
        "detail": "居民可以共享部分记忆、知识或感受，教育与社会协作方式因此完全不同。"
      },
      {
        "id": "civilization-ecology-033",
        "label": "全民变身者",
        "detail": "居民普遍拥有另一种可切换形态，身份、职业与变身后的职责紧密相关。"
      },
      {
        "id": "civilization-ecology-034",
        "label": "器物精灵社会",
        "detail": "日常器物可能拥有意识与人格，并作为居民、伙伴或职业成员参与社会。"
      },
      {
        "id": "civilization-ecology-035",
        "label": "载具生命",
        "detail": "车辆、飞行器或大型机械拥有独立意识，既是交通工具也是社会成员。"
      },
      {
        "id": "civilization-ecology-036",
        "label": "活建筑城市",
        "detail": "住宅、道路或城市本身具有生命性，会成长、移动、回应居民甚至表达偏好。"
      },
      {
        "id": "civilization-ecology-037",
        "label": "数字化身社会",
        "detail": "居民可长期以虚拟形象、远程替身或数字身体参与工作、社交与生活。"
      },
      {
        "id": "civilization-ecology-038",
        "label": "流动舰队文明",
        "detail": "居民长期生活在车队、船队、舰队或移动城镇中，迁徙本身就是文明常态。"
      },
      {
        "id": "civilization-ecology-039",
        "label": "季节形态变化",
        "detail": "居民会随季节、气候或周期改变外形、能力与社会职责。"
      },
      {
        "id": "civilization-ecology-040",
        "label": "召唤移民社会",
        "detail": "来自异界、远方或其他维度的居民被长期召来并逐渐形成稳定社区。"
      },
      {
        "id": "civilization-ecology-041",
        "label": "双生共居文明",
        "detail": "社会单位常由两个互补个体组成，家庭、职业与公共制度都默认搭档协作。"
      },
      {
        "id": "civilization-ecology-042",
        "label": "无固定形体居民",
        "detail": "部分智慧生命没有恒定身体，可在能量、雾、光或不同载体之间变化。"
      },
      {
        "id": "civilization-ecology-043",
        "label": "梦境居民",
        "detail": "某些居民主要生活在梦境层，清醒世界只是他们偶尔访问的另一侧。"
      },
      {
        "id": "civilization-ecology-044",
        "label": "时间漂流人口",
        "detail": "来自不同历史时期的人群同时生活在同一社会，文化与技术层次高度混杂。"
      },
      {
        "id": "civilization-ecology-045",
        "label": "长寿族群社会",
        "detail": "居民寿命远长于常见文明尺度，教育、婚姻、政治与记忆传承都因此改变。"
      },
      {
        "id": "civilization-ecology-046",
        "label": "人偶与玩偶文明",
        "detail": "人偶、傀儡或玩具形态的智慧居民拥有自己的家庭、职业与城市生活。"
      },
      {
        "id": "civilization-ecology-047",
        "label": "石质居民",
        "detail": "岩石、晶体或矿物形态的智慧生命构成社会，对时间、建筑与资源的理解十分不同。"
      },
      {
        "id": "civilization-ecology-048",
        "label": "影子居民",
        "detail": "部分居民以影子、暗面或轮廓形态存在，需要依附光照与实体环境活动。"
      },
      {
        "id": "civilization-ecology-049",
        "label": "镜像居民",
        "detail": "来自镜面、倒影或对应空间的居民与现实社会保持映照、交换或共存关系。"
      },
      {
        "id": "civilization-ecology-050",
        "label": "星际游牧族群",
        "detail": "居民没有固定母星，长期沿星际航线迁徙，把舰船与移动聚落当作家园。"
      }
    ]
  },
  {
    "id": "world-framework",
    "name": "世界框架",
    "category": "剧情创作",
    "icon": "🪐",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "world-framework-001",
        "label": "现实世界",
        "detail": "世界规律与现实基本一致，一切故事建立在人类社会与现实规则之上。"
      },
      {
        "id": "world-framework-002",
        "label": "架空现实",
        "detail": "整体接近现实，但国家、历史、城市或重大事件被重新设计，可自由改写现实背景。"
      },
      {
        "id": "world-framework-003",
        "label": "平行世界",
        "detail": "与现实拥有相似起点，却因某次关键分岔走向完全不同的发展路线。"
      },
      {
        "id": "world-framework-004",
        "label": "奇幻世界",
        "detail": "世界从诞生起就不遵循现实逻辑，奇异种族、超自然地域与异常自然规律天然存在。"
      },
      {
        "id": "world-framework-005",
        "label": "神话世界",
        "detail": "神灵、神兽、冥界、天界与凡间都是真实结构，神话本身就是世界历史。"
      },
      {
        "id": "world-framework-006",
        "label": "末日崩坏",
        "detail": "原有文明正在迅速毁灭或刚刚毁灭，秩序失效，生存与逃亡成为核心。"
      },
      {
        "id": "world-framework-007",
        "label": "废土重建",
        "detail": "大灾难已经过去，旧文明只剩遗迹，新聚落与新秩序正在残骸之上重新生长。"
      },
      {
        "id": "world-framework-008",
        "label": "星际文明",
        "detail": "文明活动范围跨越多个星球或恒星系，太空航行与不同星球社会成为日常。"
      },
      {
        "id": "world-framework-009",
        "label": "位面世界",
        "detail": "世界由多个层级或位面组成，各自拥有不同环境与规则，并存在稳定连接方式。"
      },
      {
        "id": "world-framework-010",
        "label": "多世界互通",
        "detail": "多个完整世界彼此独立，却能够通过传送、裂隙、召唤或技术往来。"
      },
      {
        "id": "world-framework-011",
        "label": "虚拟世界",
        "detail": "主要现实存在于数字空间、模拟宇宙或大型虚拟环境中，现实与虚拟边界并不可靠。"
      },
      {
        "id": "world-framework-012",
        "label": "梦境世界",
        "detail": "梦并非纯粹幻觉，而是拥有稳定空间、居民和社会结构的另一层现实。"
      },
      {
        "id": "world-framework-013",
        "label": "循环世界",
        "detail": "世界本身被困在时间轮回、文明周期或固定事件循环中，只有部分存在察觉重复。"
      },
      {
        "id": "world-framework-014",
        "label": "碎片世界",
        "detail": "原本完整的世界已经分裂成漂浮区域、孤立大陆或断裂现实碎片。"
      },
      {
        "id": "world-framework-015",
        "label": "正在融合的世界",
        "detail": "两个或多个原本独立的世界开始重叠，地理、生物、文明与规则彼此侵入。"
      },
      {
        "id": "world-framework-016",
        "label": "单一封闭世界",
        "detail": "已知世界几乎就是全部，边界明确而难以跨越，外部是否存在常常无人知晓。"
      },
      {
        "id": "world-framework-017",
        "label": "双层世界",
        "detail": "表世界与里世界同时存在，结构彼此对应，却拥有不同居民、规则或危险。"
      },
      {
        "id": "world-framework-018",
        "label": "镜像双界",
        "detail": "两个世界在地理、人物或事件上互相映照，但性质、价值或结局可能相反。"
      },
      {
        "id": "world-framework-019",
        "label": "人造世界",
        "detail": "整个世界由某个文明主动建造，例如人工行星、生态舱、模拟宇宙或封闭巨构。"
      },
      {
        "id": "world-framework-020",
        "label": "环世界 / 巨构世界",
        "detail": "居民生活的世界本身就是规模接近行星的巨大工程结构。"
      },
      {
        "id": "world-framework-021",
        "label": "世代舰世界",
        "detail": "绝大多数居民终生生活在巨型航行器或舰队内部，航行本身就是文明常态。"
      },
      {
        "id": "world-framework-022",
        "label": "漂流世界",
        "detail": "世界没有稳定中心，城市、聚落或文明整体长期迁徙与移动。"
      },
      {
        "id": "world-framework-023",
        "label": "移动大陆世界",
        "detail": "大陆、城市甚至国家本身能够移动，地理关系会持续发生变化。"
      },
      {
        "id": "world-framework-024",
        "label": "世界树结构",
        "detail": "多个区域、国度或位面依附于同一巨大结构，由枝干、根系或节点连接。"
      },
      {
        "id": "world-framework-025",
        "label": "嵌套世界",
        "detail": "一个完整世界内部还包含更小的完整世界，层层相套并可能互相影响。"
      },
      {
        "id": "world-framework-026",
        "label": "拼接世界",
        "detail": "来自不同时代、地域或规则体系的区域被强行拼接成同一个世界。"
      },
      {
        "id": "world-framework-027",
        "label": "无限延展世界",
        "detail": "世界理论上没有尽头，探索可以不断向更远处继续，没有已知最终边界。"
      },
      {
        "id": "world-framework-028",
        "label": "有限穹顶世界",
        "detail": "居民生活在明确封闭的有限空间内，外界可能被遮蔽、隔绝或完全未知。"
      },
      {
        "id": "world-framework-029",
        "label": "多星球共同体",
        "detail": "世界天然由多个星球、卫星或殖民地共同组成，没有单一绝对中心。"
      },
      {
        "id": "world-framework-030",
        "label": "漂浮大陆世界",
        "detail": "大地由悬浮大陆、空中岛链或失去固定地表的陆块共同构成。"
      },
      {
        "id": "world-framework-031",
        "label": "海洋行星",
        "detail": "世界几乎被全球海洋覆盖，陆地稀少，文明主要依靠岛屿、海上城市或水下空间存在。"
      },
      {
        "id": "world-framework-032",
        "label": "地心世界",
        "detail": "主要文明位于巨大地下空腔或行星内部，所谓地表只是遥远边界或传说。"
      },
      {
        "id": "world-framework-033",
        "label": "空壳世界",
        "detail": "世界内部并非实心结构，而是拥有广阔内壁、悬空核心与倒置地理的巨大壳体。"
      },
      {
        "id": "world-framework-034",
        "label": "云海世界",
        "detail": "稳定陆地极少，主要聚落悬浮于云层、浮岛、飞艇或高空平台之上。"
      },
      {
        "id": "world-framework-035",
        "label": "多层城市世界",
        "detail": "几乎整个世界被连续城市覆盖，并按高度、深度或功能分成截然不同的层级。"
      },
      {
        "id": "world-framework-036",
        "label": "文明遗迹世界",
        "detail": "现存居民生活在远超自身理解的古老文明遗迹之中，旧设施构成世界骨架。"
      },
      {
        "id": "world-framework-037",
        "label": "封闭实验世界",
        "detail": "世界本身可能是被设计的实验场、培养皿或观察区，居民未必知道自己的处境。"
      },
      {
        "id": "world-framework-038",
        "label": "保护区世界",
        "detail": "整个世界被更高文明视作生态区、隔离区或保护区，外部干预受到严格限制。"
      },
      {
        "id": "world-framework-039",
        "label": "被封印世界",
        "detail": "世界与外界长期隔绝，边界由封印、屏障或不可逾越机制维持。"
      },
      {
        "id": "world-framework-040",
        "label": "边界扩张世界",
        "detail": "世界会持续生成新的区域、地图或空间，边界本身不断向外生长。"
      },
      {
        "id": "world-framework-041",
        "label": "边界收缩世界",
        "detail": "可生存世界正在不断缩小，旧区域逐渐消失、崩塌或被未知吞没。"
      },
      {
        "id": "world-framework-042",
        "label": "时间错层世界",
        "detail": "不同地域处在不同时间速度、历史阶段或时间方向中，跨区域等同跨越时代。"
      },
      {
        "id": "world-framework-043",
        "label": "多重现实叠层",
        "detail": "多个版本的现实占据同一位置，只有在特定条件下才会显现或彼此穿透。"
      },
      {
        "id": "world-framework-044",
        "label": "观察者世界",
        "detail": "世界结构会围绕被观察、记录或认知发生变化，没人能完全确认真正的客观形态。"
      },
      {
        "id": "world-framework-045",
        "label": "孤立宇宙",
        "detail": "世界与其他宇宙、位面或文明彻底断联，外部存在只剩推测与传说。"
      }
    ]
  },
  {
    "id": "character-relations",
    "name": "人物关系",
    "category": "剧情创作",
    "icon": "💞",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "character-relations-001",
        "label": "夫妻",
        "detail": "已经正式结为伴侣，拥有稳定共同生活与长期责任。"
      },
      {
        "id": "character-relations-002",
        "label": "新婚夫妻",
        "detail": "刚刚进入婚姻，彼此仍在适应共同生活与新的身份。"
      },
      {
        "id": "character-relations-003",
        "label": "老夫老妻",
        "detail": "相处多年、默契深厚，熟悉到一个眼神就能猜到对方在想什么。"
      },
      {
        "id": "character-relations-004",
        "label": "恋人",
        "detail": "已经确认恋爱关系，亲密与日常都可以自然展开。"
      },
      {
        "id": "character-relations-005",
        "label": "未婚伴侣",
        "detail": "关系稳定并默认会共同走向未来，但尚未正式结婚。"
      },
      {
        "id": "character-relations-006",
        "label": "暧昧期",
        "detail": "彼此明显有感觉，却还没有正式确认关系，试探和误会很多。"
      },
      {
        "id": "character-relations-007",
        "label": "秘密恋人",
        "detail": "已经相爱，但关系因为身份、环境或风险不能公开。"
      },
      {
        "id": "character-relations-008",
        "label": "远距离恋人",
        "detail": "感情稳定却长期分隔两地，重逢、等待与联络本身就是关系的一部分。"
      },
      {
        "id": "character-relations-009",
        "label": "互相暗恋",
        "detail": "两个人都喜欢对方，却都没有确定对方的心意。"
      },
      {
        "id": "character-relations-010",
        "label": "单向暗恋",
        "detail": "只有一方明确喜欢对方，另一方尚未回应或并不知情。"
      },
      {
        "id": "character-relations-011",
        "label": "一见钟情",
        "detail": "关系从初见时就产生强烈吸引，后续发展速度可能非常快。"
      },
      {
        "id": "character-relations-012",
        "label": "前任",
        "detail": "曾经相爱并已经分开，如今再次见面仍带着旧情与未解决的问题。"
      },
      {
        "id": "character-relations-013",
        "label": "分手后重逢",
        "detail": "关系已经结束过一次，但命运或事件让两人重新进入彼此生活。"
      },
      {
        "id": "character-relations-014",
        "label": "离婚未断",
        "detail": "法律或名义关系已经结束，情感、责任或共同生活痕迹却仍未真正切断。"
      },
      {
        "id": "character-relations-015",
        "label": "假情侣",
        "detail": "表面扮演恋人以完成某种目的，真正感情可能在过程中逐渐变化。"
      },
      {
        "id": "character-relations-016",
        "label": "契约伴侣",
        "detail": "关系由明确条件、期限或交换建立，起点理性，后续未必仍然理性。"
      },
      {
        "id": "character-relations-017",
        "label": "政治联姻",
        "detail": "关系由家族、组织、国家或利益安排，私人感情与外部责任彼此拉扯。"
      },
      {
        "id": "character-relations-018",
        "label": "床伴",
        "detail": "关系以身体亲密为主要连接，情感边界与是否升级关系并不明确。"
      },
      {
        "id": "character-relations-019",
        "label": "开放式暧昧",
        "detail": "彼此存在明显吸引与亲密，但双方都没有把关系完全定义清楚。"
      },
      {
        "id": "character-relations-020",
        "label": "禁忌恋情",
        "detail": "彼此相爱，却因为规则、身份、立场或环境被认为不应该在一起。"
      },
      {
        "id": "character-relations-021",
        "label": "挚友",
        "detail": "彼此高度信任、共享秘密，是最稳定也最难轻易割舍的友情关系。"
      },
      {
        "id": "character-relations-022",
        "label": "青梅竹马",
        "detail": "从很早以前就认识彼此，共同成长留下大量只有两人懂的旧事与习惯。"
      },
      {
        "id": "character-relations-023",
        "label": "多年网友",
        "detail": "长期通过网络保持联系，对彼此思想很熟，却未必熟悉真实生活中的样子。"
      },
      {
        "id": "character-relations-024",
        "label": "新认识的朋友",
        "detail": "刚建立友谊不久，彼此仍在试探边界，也保留着新鲜感。"
      },
      {
        "id": "character-relations-025",
        "label": "最佳搭档",
        "detail": "在工作、冒险或任务中高度默契，常常能互相补足短板。"
      },
      {
        "id": "character-relations-026",
        "label": "损友",
        "detail": "关系亲近但嘴上从不客气，互相吐槽、拆台和捉弄几乎是日常。"
      },
      {
        "id": "character-relations-027",
        "label": "知己",
        "detail": "彼此理解程度远超普通朋友，很多情绪与想法无需解释就能被看懂。"
      },
      {
        "id": "character-relations-028",
        "label": "忘年交",
        "detail": "年龄差明显却意外合拍，关系建立在兴趣、理解或共同经历上。"
      },
      {
        "id": "character-relations-029",
        "label": "笔友 / 通信好友",
        "detail": "主要通过书信、邮件或其他长期文字交流维系关系，文字本身就是连接。"
      },
      {
        "id": "character-relations-030",
        "label": "旧友重逢",
        "detail": "曾经亲近却多年失联，再见时双方都已经发生许多变化。"
      },
      {
        "id": "character-relations-031",
        "label": "朋友变恋人前夜",
        "detail": "友情已经开始发生质变，但两人还没有正式迈过那条线。"
      },
      {
        "id": "character-relations-032",
        "label": "假装不熟的熟人",
        "detail": "明明非常了解彼此，却因为环境或目的必须在人前表现得关系普通。"
      },
      {
        "id": "character-relations-033",
        "label": "共同秘密持有者",
        "detail": "两人因为共同保守某个秘密而被长期绑定，信任与压力同时存在。"
      },
      {
        "id": "character-relations-034",
        "label": "共犯式伙伴",
        "detail": "两人一起完成过不能公开的事情，因此形成特殊默契与共同风险。"
      },
      {
        "id": "character-relations-035",
        "label": "事故后结伴",
        "detail": "因为同一场意外、灾难或突发事件而绑定，从陌生人迅速变成重要同伴。"
      },
      {
        "id": "character-relations-036",
        "label": "师生",
        "detail": "一方负责教授知识、技能或经验，另一方处于学习与成长阶段；双方均为成年人。"
      },
      {
        "id": "character-relations-037",
        "label": "师徒",
        "detail": "关系比普通教学更长期，包含传承、纪律、生活照料与个人风格影响。"
      },
      {
        "id": "character-relations-038",
        "label": "前师生",
        "detail": "正式教学关系已经结束，但旧有尊敬、依赖或习惯仍可能保留下来。"
      },
      {
        "id": "character-relations-039",
        "label": "同门",
        "detail": "接受过相同体系、门派或导师训练，既可能亲近也可能暗自较劲。"
      },
      {
        "id": "character-relations-040",
        "label": "师兄妹 / 师姐弟",
        "detail": "同门中存在明确先后顺序，熟悉感与照顾、竞争常常并存。"
      },
      {
        "id": "character-relations-041",
        "label": "导师与门生",
        "detail": "一方在职业或学术道路上长期提携另一方，关系建立在信任与成长上。"
      },
      {
        "id": "character-relations-042",
        "label": "教练与选手",
        "detail": "围绕训练、比赛与成绩建立关系，既需要服从安排，也可能形成强烈默契。"
      },
      {
        "id": "character-relations-043",
        "label": "前辈与后辈",
        "detail": "同一领域中经验不同，一方更熟悉规则与资源，另一方仍在快速成长。"
      },
      {
        "id": "character-relations-044",
        "label": "上司与下属",
        "detail": "存在明确职务层级，需要在命令、责任与私人关系之间保持平衡。"
      },
      {
        "id": "character-relations-045",
        "label": "前上司与前下属",
        "detail": "工作关系已经结束，但旧有权力习惯与熟悉感仍可能残留。"
      },
      {
        "id": "character-relations-046",
        "label": "领导与心腹",
        "detail": "一方掌握决策权，另一方被高度信任，常参与只有少数人知道的核心事务。"
      },
      {
        "id": "character-relations-047",
        "label": "主仆",
        "detail": "关系由长期服务、身份等级或家族制度建立，忠诚、责任与私人感情可能交织。"
      },
      {
        "id": "character-relations-048",
        "label": "主人与管家",
        "detail": "一方拥有宅邸或身份资源，另一方负责日常管理与照料，熟悉程度往往极高。"
      },
      {
        "id": "character-relations-049",
        "label": "雇主与受雇者",
        "detail": "关系由明确工作交换建立，边界看似清晰，却可能因长期相处发生变化。"
      },
      {
        "id": "character-relations-050",
        "label": "临时合作方",
        "detail": "原本没有稳定关系，因为同一目标短期结盟，合作结束后去向未定。"
      },
      {
        "id": "character-relations-051",
        "label": "竞争对手",
        "detail": "双方目标相近、实力接近，长期在成绩、名次、资源或认可上彼此较劲。"
      },
      {
        "id": "character-relations-052",
        "label": "宿敌",
        "detail": "彼此纠缠多年，冲突已经成为双方人生结构的一部分，了解甚至超过普通朋友。"
      },
      {
        "id": "character-relations-053",
        "label": "死敌",
        "detail": "双方存在明确且强烈的对立，合作几乎不可能，除非出现更大的共同威胁。"
      },
      {
        "id": "character-relations-054",
        "label": "昔日战友",
        "detail": "曾经并肩作战或共渡危机，如今可能已经走上不同道路。"
      },
      {
        "id": "character-relations-055",
        "label": "战场对手",
        "detail": "双方在明确阵营冲突中相遇，个人关系会不断被大局和职责拉扯。"
      },
      {
        "id": "character-relations-056",
        "label": "互相看不顺眼",
        "detail": "没有真正深仇，却天然合不来，见面就容易斗嘴或互相挑刺。"
      },
      {
        "id": "character-relations-057",
        "label": "误会成敌",
        "detail": "双方因为错误信息、身份隐藏或被人利用而互相敌视，真相尚未揭开。"
      },
      {
        "id": "character-relations-058",
        "label": "被迫合作",
        "detail": "彼此并不愿意亲近，却因为共同目标、危机或规则必须一起行动。"
      },
      {
        "id": "character-relations-059",
        "label": "利益同盟",
        "detail": "双方因利益暂时站在同一边，信任有限，合作建立在交换与计算上。"
      },
      {
        "id": "character-relations-060",
        "label": "互相利用",
        "detail": "双方都知道彼此带着目的接近，关系危险却异常高效。"
      },
      {
        "id": "character-relations-061",
        "label": "猎人与目标",
        "detail": "一方负责追踪、抓捕或寻找另一方，关系核心是追逐与反追逐。"
      },
      {
        "id": "character-relations-062",
        "label": "守门人与闯入者",
        "detail": "一方负责阻止进入，另一方必须突破限制，冲突天然围绕边界展开。"
      },
      {
        "id": "character-relations-063",
        "label": "审查者与被审查者",
        "detail": "一方拥有评估、审核或裁决权限，另一方需要证明自己或通过考核。"
      },
      {
        "id": "character-relations-064",
        "label": "监护者与被保护者",
        "detail": "一方承担保护责任，另一方在风险环境中接受照顾；双方均为成年人。"
      },
      {
        "id": "character-relations-065",
        "label": "救命恩人与被救者",
        "detail": "一方曾在关键时刻救过另一方，这段恩情会长期影响后续选择。"
      },
      {
        "id": "character-relations-066",
        "label": "成年兄妹 / 姐弟",
        "detail": "两人是已经成年的手足，共享家庭历史、童年记忆与天然熟悉感。"
      },
      {
        "id": "character-relations-067",
        "label": "表亲 / 堂亲",
        "detail": "来自同一大家族却拥有各自生活轨迹，既熟悉又保留一定距离。"
      },
      {
        "id": "character-relations-068",
        "label": "义兄妹 / 结义手足",
        "detail": "没有血缘，却通过誓约、共同经历或长期陪伴把彼此视作家人。"
      },
      {
        "id": "character-relations-069",
        "label": "室友",
        "detail": "共享居住空间，关系会被作息、家务、隐私与日常习惯持续塑造。"
      },
      {
        "id": "character-relations-070",
        "label": "邻居",
        "detail": "生活距离很近，容易因为噪音、借东西、偶遇与互相照看逐渐熟悉。"
      },
      {
        "id": "character-relations-071",
        "label": "房东与租客",
        "detail": "一方掌握住房资源，另一方长期居住其中，生活边界与现实利益经常交织。"
      },
      {
        "id": "character-relations-072",
        "label": "债主与欠债人",
        "detail": "双方被一笔尚未结清的债务绑定，关系可能紧张，也可能逐渐变得复杂。"
      },
      {
        "id": "character-relations-073",
        "label": "债务搭档",
        "detail": "两人一起背负同一笔债、任务或赔偿责任，不得不长期协作解决问题。"
      },
      {
        "id": "character-relations-074",
        "label": "同行旅伴",
        "detail": "因为同一段旅程结伴而行，关系在路途、住宿与突发事件中快速变化。"
      },
      {
        "id": "character-relations-075",
        "label": "临时同住者",
        "detail": "原本关系有限，却因为环境、任务或意外不得不在同一屋檐下生活一段时间。"
      },
      {
        "id": "character-relations-076",
        "label": "失散亲友重逢",
        "detail": "曾经非常重要的人多年失联后重新出现，双方都需要重新认识彼此。"
      },
      {
        "id": "character-relations-077",
        "label": "保护者与被守护者",
        "detail": "一方主动承担安全与照料职责，另一方接受保护但仍保有自己的行动与判断。"
      },
      {
        "id": "character-relations-078",
        "label": "委托人与代理人",
        "detail": "一方提出需求与目标，另一方受托替其调查、交涉、寻找或处理事务。"
      },
      {
        "id": "character-relations-079",
        "label": "合作伙伴",
        "detail": "双方以长期共同目标维系关系，责任、资源与成果通常需要共享。"
      },
      {
        "id": "character-relations-080",
        "label": "命运绑定者",
        "detail": "两人的状态、能力、寿命、位置或某种结果被世界规则强行联系在一起。"
      }
    ]
  },
  {
    "id": "identity-pairs",
    "name": "身份组合",
    "category": "剧情创作",
    "icon": "🎭",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "identity-pairs-001",
        "label": "快递员 × 少妇",
        "detail": "一次普通上门配送，让两个原本毫无交集的成年人开始反复见面。"
      },
      {
        "id": "identity-pairs-002",
        "label": "医生 × 病人",
        "detail": "一方负责诊疗与恢复，另一方不得不在脆弱状态下接受帮助。"
      },
      {
        "id": "identity-pairs-003",
        "label": "护士 × 伤员",
        "detail": "照料与恢复构成关系起点，日常接触往往比正式诊疗更频繁。"
      },
      {
        "id": "identity-pairs-004",
        "label": "律师 × 委托人",
        "detail": "一方掌握规则与程序，另一方把重要问题和秘密交给对方处理。"
      },
      {
        "id": "identity-pairs-005",
        "label": "警探 × 目击者",
        "detail": "一方不断追问细节，另一方握着关键记忆，信任需要一点点建立。"
      },
      {
        "id": "identity-pairs-006",
        "label": "记者 × 受访者",
        "detail": "一方想得到真实故事，另一方必须决定到底愿意说到什么程度。"
      },
      {
        "id": "identity-pairs-007",
        "label": "摄影师 × 模特",
        "detail": "镜头、姿态和被注视感天然制造距离又制造亲近。"
      },
      {
        "id": "identity-pairs-008",
        "label": "老板 × 员工",
        "detail": "工作层级明确，私人情绪却可能不断越过岗位边界。"
      },
      {
        "id": "identity-pairs-009",
        "label": "上司 × 秘书",
        "detail": "一方负责决策，一方掌握日程与细节，长期配合容易形成高度默契。"
      },
      {
        "id": "identity-pairs-010",
        "label": "教授 × 学生",
        "detail": "成年教学关系，一方传授知识，另一方在学习过程中不断靠近其世界。"
      },
      {
        "id": "identity-pairs-011",
        "label": "教练 × 选手",
        "detail": "训练、比赛与身体状态让两人必须长期高频配合。"
      },
      {
        "id": "identity-pairs-012",
        "label": "房东 × 租客",
        "detail": "围绕住房和日常生活建立联系，边界清楚却总容易被生活打乱。"
      },
      {
        "id": "identity-pairs-013",
        "label": "邻居 × 新搬来者",
        "detail": "每天抬头不见低头见，从借东西和偶遇开始慢慢熟悉。"
      },
      {
        "id": "identity-pairs-014",
        "label": "咖啡师 × 常客",
        "detail": "重复见面制造稳定熟悉感，关系往往从记住口味和习惯开始。"
      },
      {
        "id": "identity-pairs-015",
        "label": "调酒师 × 客人",
        "detail": "吧台两侧身份不同，一方观察人群，一方带着故事来喝酒。"
      },
      {
        "id": "identity-pairs-016",
        "label": "厨师 × 食客",
        "detail": "一个负责做，一个负责吃，口味与评价会成为最直接的交流。"
      },
      {
        "id": "identity-pairs-017",
        "label": "理发师 × 顾客",
        "detail": "近距离服务让陌生人不得不放松，闲聊与观察很容易发生。"
      },
      {
        "id": "identity-pairs-018",
        "label": "店员 × 顾客",
        "detail": "从普通买卖开始，可以发展成反复见面、特殊照顾或熟客关系。"
      },
      {
        "id": "identity-pairs-019",
        "label": "司机 × 乘客",
        "detail": "同处一辆移动中的车，路程本身就提供了独立于外界的相处时间。"
      },
      {
        "id": "identity-pairs-020",
        "label": "导游 × 游客",
        "detail": "一方熟悉地方，一方对一切陌生，天然形成带领与被带领。"
      },
      {
        "id": "identity-pairs-021",
        "label": "维修工 × 住户",
        "detail": "一方因为故障进入另一方的私人空间，修东西的过程自然带出生活痕迹。"
      },
      {
        "id": "identity-pairs-022",
        "label": "外卖员 × 常客",
        "detail": "高频短暂见面逐渐积累熟悉感，从一句谢谢开始形成固定印象。"
      },
      {
        "id": "identity-pairs-023",
        "label": "作家 × 编辑",
        "detail": "一个负责创造，一个负责挑错与打磨，长期合作容易把彼此逼到最了解对方。"
      },
      {
        "id": "identity-pairs-024",
        "label": "演员 × 导演",
        "detail": "表演与控制镜头的关系让双方必须反复讨论情绪、动作与角色理解。"
      },
      {
        "id": "identity-pairs-025",
        "label": "画家 × 收藏家",
        "detail": "一方创造作品，另一方长期关注与购买，审美本身成为连接。"
      },
      {
        "id": "identity-pairs-026",
        "label": "设计师 × 客户",
        "detail": "创意与需求不断碰撞，合作过程可能从互相嫌弃变成互相理解。"
      },
      {
        "id": "identity-pairs-027",
        "label": "程序员 × 产品经理",
        "detail": "一个坚持技术逻辑，一个不断提需求，是天然适合斗嘴又离不开彼此的组合。"
      },
      {
        "id": "identity-pairs-028",
        "label": "研究员 × 志愿者",
        "detail": "一方负责观察与记录，另一方主动参与项目，信任与好奇并行。"
      },
      {
        "id": "identity-pairs-029",
        "label": "考古学家 × 当地向导",
        "detail": "一个懂遗迹与资料，一个懂环境与传说，谁也无法单独完成探索。"
      },
      {
        "id": "identity-pairs-030",
        "label": "消防员 × 被救者",
        "detail": "一场突发事件让两个人以极高强度第一次相遇，后续很难完全当作陌生人。"
      },
      {
        "id": "identity-pairs-031",
        "label": "记者 × 线人",
        "detail": "信息交换建立关系，双方都需要判断对方到底能不能信。"
      },
      {
        "id": "identity-pairs-032",
        "label": "侦探 × 委托人",
        "detail": "一方负责追查真相，另一方提供目标与线索，却未必把一切都说清楚。"
      },
      {
        "id": "identity-pairs-033",
        "label": "保镖 × 雇主",
        "detail": "一方的工作是贴身保护，另一方不得不长期允许对方进入自己的私人生活。"
      },
      {
        "id": "identity-pairs-034",
        "label": "管家 × 主人",
        "detail": "一个负责维持整套生活秩序，一个被照顾到几乎没有秘密可藏。"
      },
      {
        "id": "identity-pairs-035",
        "label": "翻译 × 外宾",
        "detail": "一方掌握语言桥梁，另一方在陌生环境中高度依赖对方理解世界。"
      },
      {
        "id": "identity-pairs-036",
        "label": "机长 × 乘务员",
        "detail": "共同负责一段航程，在高压工作和短暂休息之间建立默契。"
      },
      {
        "id": "identity-pairs-037",
        "label": "婚礼策划师 × 新人",
        "detail": "一方负责把理想变成现实，另一方在筹备中暴露大量私人偏好与关系细节。"
      },
      {
        "id": "identity-pairs-038",
        "label": "宠物医生 × 宠物主人",
        "detail": "围绕一个被双方共同关心的小生命反复见面，很容易从职业关系变熟。"
      },
      {
        "id": "identity-pairs-039",
        "label": "花店老板 × 常客",
        "detail": "关系从一束束花开始，买花的理由往往比花本身更有故事。"
      },
      {
        "id": "identity-pairs-040",
        "label": "书店店员 × 读者",
        "detail": "两个人通过书单、推荐和固定阅读习惯慢慢认识彼此。"
      },
      {
        "id": "identity-pairs-041",
        "label": "骑士 × 贵族",
        "detail": "一方承担护卫与战斗职责，另一方拥有身份、领地或政治责任。"
      },
      {
        "id": "identity-pairs-042",
        "label": "国王 × 谋士",
        "detail": "一方掌握最高决策权，另一方靠判断与情报影响整个国家的方向。"
      },
      {
        "id": "identity-pairs-043",
        "label": "女王 × 侍卫",
        "detail": "权力与贴身保护并存，公开礼仪和私人默契形成强烈反差。"
      },
      {
        "id": "identity-pairs-044",
        "label": "皇帝 × 史官",
        "detail": "一个制造历史，一个记录历史，彼此都清楚对方手里的分量。"
      },
      {
        "id": "identity-pairs-045",
        "label": "公主 × 骑士",
        "detail": "身份差异明确，却因为护卫、旅途或使命长期同行。"
      },
      {
        "id": "identity-pairs-046",
        "label": "将军 × 军医",
        "detail": "一个负责带人上战场，一个负责把人从伤病里拉回来。"
      },
      {
        "id": "identity-pairs-047",
        "label": "军官 × 间谍",
        "detail": "立场与身份天然危险，任何靠近都可能同时包含试探和利用。"
      },
      {
        "id": "identity-pairs-048",
        "label": "刺客 × 目标",
        "detail": "一方接到明确任务，另一方却可能在真正见面后打乱原本计划。"
      },
      {
        "id": "identity-pairs-049",
        "label": "赏金猎人 × 通缉犯",
        "detail": "一个负责追，一个负责逃，追逐过程本身就是关系线。"
      },
      {
        "id": "identity-pairs-050",
        "label": "猎人 × 怪物",
        "detail": "双方本应处于捕猎关系，却可能在接触后发现彼此并非想象中的样子。"
      },
      {
        "id": "identity-pairs-051",
        "label": "除魔师 × 妖怪",
        "detail": "职责要求一方处理异常存在，另一方却偏偏拥有清晰人格与立场。"
      },
      {
        "id": "identity-pairs-052",
        "label": "仙尊 × 妖族",
        "detail": "高位修士与异族角色相遇，修行秩序和族群立场不断发生碰撞。"
      },
      {
        "id": "identity-pairs-053",
        "label": "修士 × 凡人",
        "detail": "一方拥有漫长修行与超常能力，另一方立足普通生活与有限人生。"
      },
      {
        "id": "identity-pairs-054",
        "label": "祭司 × 神使",
        "detail": "一个侍奉信仰体系，一个代表神意出现，权威与信念容易互相检验。"
      },
      {
        "id": "identity-pairs-055",
        "label": "魔法师 × 使魔",
        "detail": "一方负责施法与契约，另一方既是伙伴也是力量体系的一部分。"
      },
      {
        "id": "identity-pairs-056",
        "label": "魔法师 × 骑士",
        "detail": "远程法术与近身战斗形成互补，任务中谁也替代不了谁。"
      },
      {
        "id": "identity-pairs-057",
        "label": "炼金术师 × 人造生命",
        "detail": "创造者与被创造者之间天然存在责任、好奇与自我定义问题。"
      },
      {
        "id": "identity-pairs-058",
        "label": "驯兽师 × 魔兽",
        "detail": "训练、照料与共同成长让控制关系逐渐变成长期搭档关系。"
      },
      {
        "id": "identity-pairs-059",
        "label": "龙骑士 × 龙族",
        "detail": "一方负责骑乘与作战，另一方是拥有独立意志的强大伙伴。"
      },
      {
        "id": "identity-pairs-060",
        "label": "冒险者 × 公会接待员",
        "detail": "一个天天往外跑，一个负责登记任务和收拾残局，关系从柜台前反复见面开始。"
      },
      {
        "id": "identity-pairs-061",
        "label": "AI × 使用者",
        "detail": "一个以数字智能存在，一个通过终端与其长期互动，关系会被使用场景与持续陪伴塑造。"
      },
      {
        "id": "identity-pairs-062",
        "label": "AI × 维护员",
        "detail": "一方负责系统运行，另一方负责检修与更新，最熟悉彼此状态的人往往不是普通用户。"
      },
      {
        "id": "identity-pairs-063",
        "label": "机器人 × 工程师",
        "detail": "制造、维修与自我成长交织在一起，谁更了解谁会逐渐变得难说。"
      },
      {
        "id": "identity-pairs-064",
        "label": "仿生人 × 调查员",
        "detail": "一个外表近似人类却身份特殊，一个负责核查事实与身份，互相观察是常态。"
      },
      {
        "id": "identity-pairs-065",
        "label": "研究员 × 实验体",
        "detail": "双方均为成年人，一方负责研究与记录，另一方处在被观察、被理解与争取自主的张力中。"
      },
      {
        "id": "identity-pairs-066",
        "label": "星舰舰长 × 领航员",
        "detail": "一个负责整体决策，一个负责找到真正可走的路，缺谁都开不远。"
      },
      {
        "id": "identity-pairs-067",
        "label": "舰长 × 偷渡客",
        "detail": "一个维护航行秩序，一个藏着不能公开的来历，见面即带着问题。"
      },
      {
        "id": "identity-pairs-068",
        "label": "机甲驾驶员 × 维修师",
        "detail": "一个把机器开到极限，一个负责把它和驾驶员一起修回来。"
      },
      {
        "id": "identity-pairs-069",
        "label": "宇航员 × 地面指挥",
        "detail": "距离遥远却必须高度信任，很多关键时刻只能靠声音与数据互相支撑。"
      },
      {
        "id": "identity-pairs-070",
        "label": "殖民地长官 × 新移民",
        "detail": "一个负责维持新世界秩序，一个刚踏入陌生星球，身份与需求天然不对称。"
      },
      {
        "id": "identity-pairs-071",
        "label": "星际商人 × 海关官",
        "detail": "一个想让货顺利过去，一个负责检查规则，双方总在边界上讨价还价。"
      },
      {
        "id": "identity-pairs-072",
        "label": "外星使者 × 翻译",
        "detail": "两种文明第一次真正互相理解，往往要靠一个能把意思翻对的人。"
      },
      {
        "id": "identity-pairs-073",
        "label": "外交官 × 异星领袖",
        "detail": "一个代表组织利益，一个代表另一种文明秩序，私下理解可能比正式协议更重要。"
      },
      {
        "id": "identity-pairs-074",
        "label": "数字人格 × 现实用户",
        "detail": "一个主要存在于数字环境，一个拥有现实身体，双方对现实的理解天然不同。"
      },
      {
        "id": "identity-pairs-075",
        "label": "黑客 × 网络警察",
        "detail": "一个不断寻找系统缝隙，一个负责堵住缝隙，双方很容易越斗越熟。"
      },
      {
        "id": "identity-pairs-076",
        "label": "数据管理员 × 逃逸AI",
        "detail": "一个负责系统边界，一个已经越过边界，追踪过程中逐渐暴露彼此底层逻辑。"
      },
      {
        "id": "identity-pairs-077",
        "label": "时间旅行者 × 历史当地人",
        "detail": "一方知道未来，一方完全活在当下，任何一句话都可能改变彼此人生。"
      },
      {
        "id": "identity-pairs-078",
        "label": "平行世界来客 × 本世界居民",
        "detail": "两个人看起来熟悉，却拥有完全不同的历史与关系版本。"
      },
      {
        "id": "identity-pairs-079",
        "label": "复制人 × 原型",
        "detail": "两张相似面孔背后是不同人生，自我认同与彼此比较天然成为冲突。"
      },
      {
        "id": "identity-pairs-080",
        "label": "赛博医生 × 义体人",
        "detail": "一个负责调整机械与身体边界，一个必须决定自己想改成什么样。"
      },
      {
        "id": "identity-pairs-081",
        "label": "赛车手 × 改装师",
        "detail": "一个负责把车开到极限，一个负责让车还能继续变得更离谱。"
      },
      {
        "id": "identity-pairs-082",
        "label": "自行车手 × 机械师",
        "detail": "骑行表现与器械调校互相影响，比赛之外也有大量相处空间。"
      },
      {
        "id": "identity-pairs-083",
        "label": "四驱车选手 × 改装师",
        "detail": "一方执着于赛道与操控，一方执着于齿轮、马达和毫厘之间的优化。"
      },
      {
        "id": "identity-pairs-084",
        "label": "梦境医生 × 失眠者",
        "detail": "一个能够处理梦境问题，一个已经太久没能正常睡好，治疗过程本身就像冒险。"
      },
      {
        "id": "identity-pairs-085",
        "label": "时间管理员 × 偷时间的人",
        "detail": "一个负责维持时间秩序，一个总能从规则里偷走几分钟甚至几年。"
      },
      {
        "id": "identity-pairs-086",
        "label": "记忆商人 × 失忆顾客",
        "detail": "一个出售、保存或整理记忆，一个来寻找自己到底失去了什么。"
      },
      {
        "id": "identity-pairs-087",
        "label": "愿望店主 × 许愿者",
        "detail": "一个提供实现愿望的机会，一个必须决定自己真正想要什么以及愿意付出什么。"
      },
      {
        "id": "identity-pairs-088",
        "label": "世界管理员 × 漏洞制造者",
        "detail": "一个负责让世界正常运行，一个天生就会把规则玩出缝。"
      },
      {
        "id": "identity-pairs-089",
        "label": "副本引导员 × 闯关者",
        "detail": "一个熟悉规则和流程，一个不断用意外操作把标准路线搞乱。"
      },
      {
        "id": "identity-pairs-090",
        "label": "规则记录员 × 违规者",
        "detail": "一个负责写清规则，一个总能精准找到规则没写到的地方。"
      },
      {
        "id": "identity-pairs-091",
        "label": "灵魂摆渡人 × 亡魂",
        "detail": "一个负责送人走完最后一程，一个偏偏还有放不下的事情。"
      },
      {
        "id": "identity-pairs-092",
        "label": "图书管理员 × 书中角色",
        "detail": "一个管理书本与档案，一个本来只该活在故事里却突然走了出来。"
      },
      {
        "id": "identity-pairs-093",
        "label": "博物馆管理员 × 复活展品",
        "detail": "一个负责看守馆藏，一个醒来后坚持自己不是展品而是居民。"
      },
      {
        "id": "identity-pairs-094",
        "label": "天气控制员 × 农场主",
        "detail": "一个能改天气，一个每天都对天气有具体到不能再具体的要求。"
      },
      {
        "id": "identity-pairs-095",
        "label": "占星师 × 宇航员",
        "detail": "一个从星象里读意义，一个真的飞到了星星之间，世界观很容易互相冲撞。"
      },
      {
        "id": "identity-pairs-096",
        "label": "花店老板 × 植物精灵",
        "detail": "一个天天照料植物，一个本身就是会说话会挑剔的植物生命。"
      },
      {
        "id": "identity-pairs-097",
        "label": "房产中介 × 鬼屋住客",
        "detail": "一个只想把房子顺利成交，一个根本不准备搬走。"
      },
      {
        "id": "identity-pairs-098",
        "label": "修表匠 × 时间旅行者",
        "detail": "一个修机械里的时间，一个总在真正的时间线上跑来跑去。"
      },
      {
        "id": "identity-pairs-099",
        "label": "裁缝 × 变身者",
        "detail": "一个负责做衣服，一个每隔一阵子身体尺寸和形态就会完全变化。"
      },
      {
        "id": "identity-pairs-100",
        "label": "快递员 × 异世界收件人",
        "detail": "一个只想把包裹送到签收，一个地址却写在根本不属于这个世界的地方。"
      }
    ]
  },
  {
    "id": "age-relations",
    "name": "年龄关系",
    "category": "剧情创作",
    "icon": "🎂",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "age-relations-001",
        "label": "完全同龄",
        "detail": "双方均为成年人，年龄几乎一致，成长阶段与时代记忆高度重叠。"
      },
      {
        "id": "age-relations-002",
        "label": "同年不同月",
        "detail": "出生在同一年，但月份不同，容易产生细小却好玩的年上年下感。"
      },
      {
        "id": "age-relations-003",
        "label": "生日只差一天",
        "detail": "双方均为成年人，年龄几乎相同，却总能拿那一天互相打趣。"
      },
      {
        "id": "age-relations-004",
        "label": "相差 1 岁",
        "detail": "极轻微年龄差，更多体现在称呼、入学年份或生活经验的小差别。"
      },
      {
        "id": "age-relations-005",
        "label": "相差 2 岁",
        "detail": "仍属于相近世代，但足以让一方偶尔摆出一点前辈姿态。"
      },
      {
        "id": "age-relations-006",
        "label": "年上 3–5 岁",
        "detail": "双方均为成年人，经验差开始可感知，却仍很容易保持平等相处。"
      },
      {
        "id": "age-relations-007",
        "label": "年下 3–5 岁",
        "detail": "较小的一方已经成年，活力与人生阶段差异会比同龄更明显。"
      },
      {
        "id": "age-relations-008",
        "label": "年上 6–10 岁",
        "detail": "一方明显早进入社会或经历更多阶段，代际感开始出现。"
      },
      {
        "id": "age-relations-009",
        "label": "年下 6–10 岁",
        "detail": "双方均为成年人，但成长背景、流行文化和生活节奏可能已经不同。"
      },
      {
        "id": "age-relations-010",
        "label": "年上 11–20 岁",
        "detail": "年龄差足以影响职业阶段、社会经验和对未来时间的理解。"
      },
      {
        "id": "age-relations-011",
        "label": "年下 11–20 岁",
        "detail": "双方均为成年人，一方更接近成熟中段，另一方仍处于较早成人阶段。"
      },
      {
        "id": "age-relations-012",
        "label": "相差 21–30 岁",
        "detail": "明显跨越一代人的年龄差，社会观感与人生进度都会产生张力。"
      },
      {
        "id": "age-relations-013",
        "label": "相差 31–50 岁",
        "detail": "双方均为成年人，彼此童年与青年时代几乎属于不同社会背景。"
      },
      {
        "id": "age-relations-014",
        "label": "相差 51–100 岁",
        "detail": "已经超出普通现实关系尺度，通常意味着特殊寿命、冷冻或时间技术。"
      },
      {
        "id": "age-relations-015",
        "label": "相差 101–500 岁",
        "detail": "年龄差跨越多个世代与历史阶段，双方对时代的理解天然不同。"
      },
      {
        "id": "age-relations-016",
        "label": "相差 500–1000 岁",
        "detail": "一方可能把另一方整段文明史都当作亲历记忆。"
      },
      {
        "id": "age-relations-017",
        "label": "相差千年以上",
        "detail": "年龄差已经接近文明尺度，关系中会出现强烈的时间感与历史感。"
      },
      {
        "id": "age-relations-018",
        "label": "相差万年以上",
        "detail": "一方见过的世界版本可能早已消失，另一方只能从遗迹和故事理解。"
      },
      {
        "id": "age-relations-019",
        "label": "实际同龄，外表年龄不同",
        "detail": "双方真实年龄接近，但身体外观呈现出明显不同的成年阶段。"
      },
      {
        "id": "age-relations-020",
        "label": "外表同龄，实际年龄悬殊",
        "detail": "看起来像同龄成年人，真实出生时间却可能相差数十年甚至数世纪。"
      },
      {
        "id": "age-relations-021",
        "label": "出生年代相隔一代",
        "detail": "双方均为成年人，出生年代明显不同，但因为特殊事件在同一时期相遇。"
      },
      {
        "id": "age-relations-022",
        "label": "出生年代相隔数代",
        "detail": "彼此熟悉的社会常识、技术与文化记忆几乎完全不同。"
      },
      {
        "id": "age-relations-023",
        "label": "来自不同世纪",
        "detail": "双方均为成年人，各自把不同世纪当作自己的原生时代。"
      },
      {
        "id": "age-relations-024",
        "label": "来自不同千年",
        "detail": "一方的童年时代对另一方而言已经属于古代史。"
      },
      {
        "id": "age-relations-025",
        "label": "一个来自未来",
        "detail": "双方均为成年人，其中一方出生在未来时代，被时间旅行带到另一方身边。"
      },
      {
        "id": "age-relations-026",
        "label": "一个来自过去",
        "detail": "一方来自更早时代，另一方熟悉的现代常识对其可能完全陌生。"
      },
      {
        "id": "age-relations-027",
        "label": "出生顺序与身体年龄相反",
        "detail": "更早出生的人身体反而更年轻，年龄称呼和视觉印象互相打架。"
      },
      {
        "id": "age-relations-028",
        "label": "身体年龄相同，主观年龄不同",
        "detail": "双方外表处于相近成年阶段，但实际经历过的时间长度差异很大。"
      },
      {
        "id": "age-relations-029",
        "label": "主观年龄相同，出生时间不同",
        "detail": "两人都实际生活了差不多年数，却因冷冻、休眠或时间旅行出生在不同年代。"
      },
      {
        "id": "age-relations-030",
        "label": "一方跳过了几十年",
        "detail": "双方均为成年人，其中一方通过休眠或时间跃迁直接跨过一段人生时间。"
      },
      {
        "id": "age-relations-031",
        "label": "一方跳过了几百年",
        "detail": "曾经同处一个时代的人，再见时其中一方几乎没有经历中间岁月。"
      },
      {
        "id": "age-relations-032",
        "label": "一方经历时间加速",
        "detail": "同样的客观时间里，一方实际经历了更多主观岁月，成熟程度因此不同。"
      },
      {
        "id": "age-relations-033",
        "label": "一方经历时间减速",
        "detail": "一方主观只过去很短时间，另一方却已经走过更长的人生阶段。"
      },
      {
        "id": "age-relations-034",
        "label": "不同时间流速长大",
        "detail": "双方均为成年人，却分别在时间流速不同的区域成长，年龄算法需要重新解释。"
      },
      {
        "id": "age-relations-035",
        "label": "跨时代重逢",
        "detail": "两人曾在某个时期认识，再次相见时彼此年龄差已经被时间异常重新拉开。"
      },
      {
        "id": "age-relations-036",
        "label": "同生日，不同纪年",
        "detail": "双方均为成年人，在不同历法或世界中拥有同一天生日，换算后年龄却并不相同。"
      },
      {
        "id": "age-relations-037",
        "label": "纸面年龄与实际经历不一致",
        "detail": "官方记录显示一种年龄，但休眠、穿越或身份重建让真实经历长度不同。"
      },
      {
        "id": "age-relations-038",
        "label": "一方年龄成谜",
        "detail": "双方均为成年人，其中一方无法确认确切出生年份，只能从记忆与历史线索估算。"
      },
      {
        "id": "age-relations-039",
        "label": "一方出生早于现文明",
        "detail": "一方的出生时间甚至早于当前国家、城市或文明体系，另一方则完全属于当代。"
      },
      {
        "id": "age-relations-040",
        "label": "刚苏醒的古老存在 × 当代成年人",
        "detail": "古老的一方实际年龄极大，却刚刚重新开始参与当代生活。"
      },
      {
        "id": "age-relations-041",
        "label": "后出生者拥有更古老记忆",
        "detail": "较晚出生的一方继承了前代、数据库或轮回记忆，心理阅历反而更深。"
      },
      {
        "id": "age-relations-042",
        "label": "复制体比原型年轻",
        "detail": "双方均为成年人，复制体诞生时间更晚，却可能拥有原型部分或全部记忆。"
      },
      {
        "id": "age-relations-043",
        "label": "轮回者记得前世",
        "detail": "当前身体属于成年人，但记忆累积让一方拥有远超单世人生的主观年龄。"
      },
      {
        "id": "age-relations-044",
        "label": "时间循环者经历更长",
        "detail": "双方均为成年人，其中一方因反复经历同一时期而积累了更多主观岁月。"
      },
      {
        "id": "age-relations-045",
        "label": "休眠期间年龄停滞",
        "detail": "长期休眠或封存让一方的实际经历时间明显少于日历跨度。"
      },
      {
        "id": "age-relations-046",
        "label": "身体变化方向相反",
        "detail": "双方均为成年人，一方的身体状态随时间呈现与常规不同的变化趋势。"
      },
      {
        "id": "age-relations-047",
        "label": "形态切换影响年龄外观",
        "detail": "一方会在多个成年形态之间切换，因此外表年龄与实际年龄并不固定对应。"
      },
      {
        "id": "age-relations-048",
        "label": "只在清醒期累计年龄",
        "detail": "某种生命只把清醒活动的时间计入自身年龄，休眠期不被视为人生经历。"
      },
      {
        "id": "age-relations-049",
        "label": "按周期而非年份计龄",
        "detail": "某个世界以轮回次数、觉醒周期或任务周期定义年龄，而不是出生年份。"
      },
      {
        "id": "age-relations-050",
        "label": "跨物种年龄不可直比",
        "detail": "双方都属于各自种族的成熟成年人，但不同生命周期让数字年龄失去直接比较意义。"
      }
    ]
  },
  {
    "id": "lifespan-structure",
    "name": "寿命结构",
    "category": "剧情创作",
    "icon": "⏳",
    "recorder": "导入",
    "source": "builtin",
    "entries": [
      {
        "id": "lifespan-structure-001",
        "label": "普通寿命 × 普通寿命",
        "detail": "双方寿命尺度接近，关系主要面对常规人生阶段与自然衰老。"
      },
      {
        "id": "lifespan-structure-002",
        "label": "长生种 × 短生种",
        "detail": "一方拥有远长于另一方的自然寿命，时间尺度差异会持续影响关系。"
      },
      {
        "id": "lifespan-structure-003",
        "label": "不老者 × 正常衰老者",
        "detail": "一方长期维持稳定成年状态，另一方按照常规生命节奏变化。"
      },
      {
        "id": "lifespan-structure-004",
        "label": "永生者 × 有限寿命者",
        "detail": "一方理论上没有自然寿命终点，另一方的人生仍然有限。"
      },
      {
        "id": "lifespan-structure-005",
        "label": "双方都是长生种",
        "detail": "两人的寿命都远超常规，几十年可能只相当于关系中的一个阶段。"
      },
      {
        "id": "lifespan-structure-006",
        "label": "长生种寿命尺度不同",
        "detail": "双方都长寿，但一个以数百年计，一个可能以数千年甚至更久计。"
      },
      {
        "id": "lifespan-structure-007",
        "label": "共享寿命",
        "detail": "两人的生命长度彼此绑定，一方的延续与另一方直接相关。"
      },
      {
        "id": "lifespan-structure-008",
        "label": "寿命可转赠",
        "detail": "生命时间可以在个体之间主动转移、赠与或交换。"
      },
      {
        "id": "lifespan-structure-009",
        "label": "寿命可交易",
        "detail": "寿命本身是一种可购买、储存或作为报酬支付的资源。"
      },
      {
        "id": "lifespan-structure-010",
        "label": "生命阶段可视化",
        "detail": "个体能够直接看到自己所处的生命阶段，时间感因此变得异常具体。"
      },
      {
        "id": "lifespan-structure-011",
        "label": "寿命可延展",
        "detail": "修炼、技术或特殊资源可以让个体拥有比原本更长的生命跨度。"
      },
      {
        "id": "lifespan-structure-012",
        "label": "时间流速不同",
        "detail": "双方生活在不同时间速度下，相同外界时间会积累出不同的人生长度。"
      },
      {
        "id": "lifespan-structure-013",
        "label": "休眠暂停计龄",
        "detail": "长期休眠、封存或停机会让个体的生理时间暂时停止推进。"
      },
      {
        "id": "lifespan-structure-014",
        "label": "周期性苏醒",
        "detail": "某类生命会沉睡多年再苏醒，活跃期和休眠期共同构成完整人生。"
      },
      {
        "id": "lifespan-structure-015",
        "label": "季节性休眠",
        "detail": "生命活动会随季节进入长期低活动状态，关系节奏因此呈现明显周期。"
      },
      {
        "id": "lifespan-structure-016",
        "label": "轮回者 × 单世者",
        "detail": "一方会经历多次人生循环，另一方只拥有一段连续人生。"
      },
      {
        "id": "lifespan-structure-017",
        "label": "记忆保留轮回",
        "detail": "个体重启新一轮人生时仍保留过去经历，因此主观时间持续累积。"
      },
      {
        "id": "lifespan-structure-018",
        "label": "记忆重置轮回",
        "detail": "每次重新开始都会失去前一轮经历，旁观者可能成为唯一连续记忆的人。"
      },
      {
        "id": "lifespan-structure-019",
        "label": "寿命与能量储备相关",
        "detail": "个体的生命跨度与某种能量、资源或核心状态直接相连。"
      },
      {
        "id": "lifespan-structure-020",
        "label": "意识可迁移",
        "detail": "人格可以在不同身体、载体或环境之间迁移，生命连续性不再依赖单一肉身。"
      },
      {
        "id": "lifespan-structure-021",
        "label": "身体可更换",
        "detail": "个体可以定期更换成年身体或机械载体，身份延续与身体寿命彼此分离。"
      },
      {
        "id": "lifespan-structure-022",
        "label": "数字化延续",
        "detail": "意识可以长期存在于网络或虚拟空间中，物理身体不再决定全部生命跨度。"
      },
      {
        "id": "lifespan-structure-023",
        "label": "记忆备份延续",
        "detail": "重要记忆和人格状态可以保存，个体在特殊情况下能够从备份继续存在。"
      },
      {
        "id": "lifespan-structure-024",
        "label": "多载体并存",
        "detail": "同一个人格能够同时运行于多个载体，生命体验因此出现并行分支。"
      },
      {
        "id": "lifespan-structure-025",
        "label": "分支人格可合并",
        "detail": "多个并行版本最终能够重新整合记忆，主观人生会突然变得异常漫长。"
      },
      {
        "id": "lifespan-structure-026",
        "label": "周期换壳",
        "detail": "某类生命会定期更换外壳或身体结构，但核心人格保持连续。"
      },
      {
        "id": "lifespan-structure-027",
        "label": "蜕变式成长",
        "detail": "生命会经历数次明确形态转变，每个阶段都拥有不同能力与生活方式。"
      },
      {
        "id": "lifespan-structure-028",
        "label": "成熟后停龄",
        "detail": "个体进入成年阶段后生理变化大幅放缓，外观长期保持稳定。"
      },
      {
        "id": "lifespan-structure-029",
        "label": "寿命与领地绑定",
        "detail": "个体的生命状态与某片土地、城市、森林或空间设施同步。"
      },
      {
        "id": "lifespan-structure-030",
        "label": "寿命与器物绑定",
        "detail": "个体只要某件核心器物持续存在，就能保持生命连续性。"
      },
      {
        "id": "lifespan-structure-031",
        "label": "寿命与伙伴绑定",
        "detail": "两名个体的生命节奏彼此关联，长期分离或靠近都会改变状态。"
      },
      {
        "id": "lifespan-structure-032",
        "label": "共同同步衰老",
        "detail": "两人的生命节奏会逐渐趋同，即使原本属于不同寿命尺度，也会彼此拉近。"
      },
      {
        "id": "lifespan-structure-033",
        "label": "一方替另一方分担时间",
        "detail": "双方的生命进度可以彼此影响，一人的变化会被另一人共同承担。"
      },
      {
        "id": "lifespan-structure-034",
        "label": "寿命受环境影响",
        "detail": "不同地区、星球或位面的时间与生理规则会显著改变生命长度。"
      },
      {
        "id": "lifespan-structure-035",
        "label": "进入特定区域停龄",
        "detail": "只要留在某个地方，生命节奏就近乎静止；离开后才恢复正常推进。"
      },
      {
        "id": "lifespan-structure-036",
        "label": "离开故乡加速衰老",
        "detail": "某类生命远离原生环境后会更快消耗自身时间，因此迁徙代价极高。"
      },
      {
        "id": "lifespan-structure-037",
        "label": "日照决定生命节奏",
        "detail": "生命状态与光照周期直接相关，极昼极夜会改变个体的时间感和生理变化。"
      },
      {
        "id": "lifespan-structure-038",
        "label": "月相决定生命节奏",
        "detail": "生命状态随月相周期变化，满月、新月等阶段会触发不同状态。"
      },
      {
        "id": "lifespan-structure-039",
        "label": "季节决定生命阶段",
        "detail": "春夏秋冬对应不同生命状态，个体会按季节循环经历活跃、成熟与休眠。"
      },
      {
        "id": "lifespan-structure-040",
        "label": "星体周期决定寿命",
        "detail": "个体的生命节奏与行星、公转、恒星活动或宇宙周期绑定。"
      },
      {
        "id": "lifespan-structure-041",
        "label": "文明纪元决定生命阶段",
        "detail": "某类存在会随文明兴衰进入不同阶段，个人生命与整个时代共同推进。"
      },
      {
        "id": "lifespan-structure-042",
        "label": "百年一醒",
        "detail": "某类生命每隔很长时间才进入短暂活跃期，关系会被漫长空白切成片段。"
      },
      {
        "id": "lifespan-structure-043",
        "label": "千年一次蜕变",
        "detail": "个体会在极长周期后完成一次重大形态变化，时间尺度接近文明史。"
      },
      {
        "id": "lifespan-structure-044",
        "label": "活跃时才计龄",
        "detail": "只有在行动、思考或苏醒时生命进度才会推进，静止期几乎不计算时间。"
      },
      {
        "id": "lifespan-structure-045",
        "label": "记忆由后继者继承",
        "detail": "个体生命有限，但完整记忆会被下一位继承者接续，形成近似连续人格。"
      },
      {
        "id": "lifespan-structure-046",
        "label": "身体代际更新",
        "detail": "同一身份会通过新的成年身体持续延续，旧身体与新身体属于同一人生链条。"
      },
      {
        "id": "lifespan-structure-047",
        "label": "群体生命连续",
        "detail": "个体成员不断更替，但整个群体共享记忆与意志，因此文明本身像一个长生个体。"
      },
      {
        "id": "lifespan-structure-048",
        "label": "跨物种轮回",
        "detail": "个体每次重来都可能进入不同智慧种族，寿命尺度和生活方式随之变化。"
      },
      {
        "id": "lifespan-structure-049",
        "label": "古老者刚刚苏醒",
        "detail": "一方拥有极长日历年龄，却只在少数时期真正清醒生活，与当代人的主观年龄差可能很小。"
      },
      {
        "id": "lifespan-structure-050",
        "label": "双方时间终点不同步",
        "detail": "两人的生命节奏没有共同终点，关系必须面对不同的时间安排与长期选择。"
      }
    ]
  }
];

function entryDetail(entry){
  if(!entry)return '';
  if(entry.detail!==undefined&&entry.detail!==null)return String(entry.detail);
  return String(entry.symbol??'');
}
function normalizeDrawCount(value){
  if(value===undefined||value===null)return 1;
  const count=Number(value);
  if(!Number.isInteger(count)||count<1||count>20)throw new RangeError('每轴抽取数必须在 1～20');
  return count;
}
const MIN_AXIS_COUNT=3;
const MAX_AXIS_COUNT=60;
const SPINNER_LAYOUT_VERSION=2;
function axisId(value){
  const id=String(value??'').trim();
  if(!id||id.length>100)throw new Error('轴位 id 无效');
  return id;
}
function makeEmptySlot(id){return {id:axisId(id),enabled:false,tapeRef:null,localTape:null,drawCount:1};}
function makeSlots(count=MIN_AXIS_COUNT){
  if(!Number.isInteger(count)||count<MIN_AXIS_COUNT||count>MAX_AXIS_COUNT)throw new RangeError(`轴位数量必须在 ${MIN_AXIS_COUNT}～${MAX_AXIS_COUNT}`);
  return Array.from({length:count},(_,index)=>makeEmptySlot(`slot-${index+1}`));
}
function isEmptySlot(slot){return Boolean(slot)&&slot.tapeRef==null&&slot.localTape==null;}
function validateSlotList(slots,{legacy=false}={}){
  if(!Array.isArray(slots))throw new Error('轴位读取失败');
  const ids=new Set();
  const normalized=slots.map(slot=>{
    const next=copySlotData(slot);
    if(ids.has(next.id))throw new Error('轴位 id 重复');
    ids.add(next.id);
    return next;
  });
  if(!legacy&&(normalized.length<MIN_AXIS_COUNT||normalized.length>MAX_AXIS_COUNT))throw new Error(`轴位数量必须在 ${MIN_AXIS_COUNT}～${MAX_AXIS_COUNT}`);
  return normalized;
}
function migrateSpinnerSlots(rawSlots,makeAxisId){
  const normalized=validateSlotList(rawSlots,{legacy:true});
  const installed=normalized.filter(slot=>!isEmptySlot(slot));
  if(installed.length>MAX_AXIS_COUNT)throw new Error(`已安装轴位最多 ${MAX_AXIS_COUNT} 个`);
  if(installed.length>=MIN_AXIS_COUNT)return installed;
  if(typeof makeAxisId!=='function')throw new Error('迁移补轴需要轴位 id 生成器');
  const ids=new Set(normalized.map(slot=>slot.id));
  const result=installed.slice();
  while(result.length<MIN_AXIS_COUNT){
    const id=axisId(makeAxisId());
    if(ids.has(id))throw new Error('轴位 id 重复');
    ids.add(id);result.push(makeEmptySlot(id));
  }
  return result;
}
function addAxis(slots,id){
  const normalized=validateSlotList(slots);
  if(normalized.length>=MAX_AXIS_COUNT)throw new Error(`最多 ${MAX_AXIS_COUNT} 个轴`);
  const nextId=axisId(id);
  if(normalized.some(slot=>slot.id===nextId))throw new Error('轴位 id 重复');
  return [...normalized,makeEmptySlot(nextId)];
}
function deleteAxis(slots,id){
  const normalized=validateSlotList(slots);
  const targetId=axisId(id);const target=normalized.find(slot=>slot.id===targetId);
  if(!target)throw new Error('找不到轴位');
  if(!isEmptySlot(target))throw new Error('请先取下卡带');
  if(normalized.length<=MIN_AXIS_COUNT)throw new Error(`至少保留 ${MIN_AXIS_COUNT} 个轴`);
  return normalized.filter(slot=>slot.id!==targetId);
}
function installTape(slots,tapeId,{allowDuplicate=false,newAxisId}={}){
  const normalized=validateSlotList(slots);const reelId=String(tapeId??'').trim();
  if(!reelId)throw new Error('卷轴不能为空');
  if(!allowDuplicate&&normalized.some(slot=>slot.tapeRef===reelId))throw new Error('卡轴已安装本卡带');
  let target=normalized.find(slot=>isEmptySlot(slot));let next=normalized;
  if(!target){
    if(newAxisId===undefined)throw new Error('没有空轴，安装需要新的轴位 id');
    next=addAxis(normalized,newAxisId);target=next[next.length-1];
  }
  return {slots:loadTapeIntoSlot(next,target.id,reelId),axisId:target.id};
}
function ejectTapeEverywhere(slots,tapeId){
  const normalized=validateSlotList(slots);const reelId=String(tapeId??'').trim();
  if(!reelId)throw new Error('卷轴不能为空');
  return normalized.map(slot=>slot.tapeRef===reelId?{...slot,enabled:false,tapeRef:null,localTape:null}:slot);
}
function clearAxes(axisIds){
  if(!Array.isArray(axisIds)||axisIds.length!==MIN_AXIS_COUNT)throw new Error('清空需要正好三个轴位 id');
  const ids=axisIds.map(axisId);
  if(new Set(ids).size!==ids.length)throw new Error('轴位 id 重复');
  return ids.map(makeEmptySlot);
}
function randInt(max){
  if(!Number.isInteger(max)||max<=0) throw new RangeError('max 必须是正整数');
  const arr=new Uint32Array(1);
  const limit=Math.floor(0x100000000/max)*max;
  let value;
  do{crypto.getRandomValues(arr);value=arr[0]}while(value>=limit);
  return value%max;
}
function getTapeForSlot(slot,tapeMap){
  if(!slot) return null;
  if(slot.localTape) return slot.localTape;
  return slot.tapeRef ? (tapeMap.get(slot.tapeRef)||null) : null;
}
function drawEntry(tape,rng=randInt){
  if(!tape||!Array.isArray(tape.entries)||tape.entries.length<1) throw new RangeError('卷轴至少需要 1 个候选');
  return tape.entries[rng(tape.entries.length)];
}
function drawEntries(tape,count,rng=randInt){
  if(!tape||!Array.isArray(tape.entries)||tape.entries.length<1)throw new RangeError('卷轴至少需要 1 个候选');
  const normalizedCount=normalizeDrawCount(count);
  if(normalizedCount>tape.entries.length)throw new RangeError(`卷轴只有 ${tape.entries.length} 个候选，不能抽取 ${normalizedCount} 个`);
  const ids=new Set();
  for(const entry of tape.entries){
    const id=String(entry&&entry.id||'');
    if(!id||ids.has(id))throw new Error('候选 id 无效或重复');
    ids.add(id);
  }
  const pool=tape.entries.slice();
  const selected=[];
  for(let index=0;index<normalizedCount;index++){
    const remaining=pool.length-index;
    const offset=rng(remaining);
    if(!Number.isInteger(offset)||offset<0||offset>=remaining)throw new RangeError('随机结果超出候选范围');
    const pickedIndex=index+offset;
    [pool[index],pool[pickedIndex]]=[pool[pickedIndex],pool[index]];
    selected.push(pool[index]);
  }
  return selected;
}
function prepareCombination(slots,tapeMap,rng=randInt,mode='combo'){
  const active=slots.filter(slot=>slot.enabled);
  const prepared=active.map(slot=>{
    const tape=getTapeForSlot(slot,tapeMap);
    if(!tape) throw new Error(`${slot.id} 是空轴，不能参与随机`);
    const count=mode==='classic'?1:normalizeDrawCount(slot.drawCount);
    if(count>tape.entries.length)throw new RangeError(`${slot.id} 的卷轴只有 ${tape.entries.length} 个候选，不能抽取 ${count} 个`);
    return {slot,tape,count};
  });
  return prepared.map(({slot,tape,count})=>{
    const drawn=drawEntries(tape,count,rng);
    const result={slotId:slot.id,tapeId:tape.id,tapeName:tape.name,entries:drawn};
    if(drawn.length===1)result.entry=drawn[0];
    return result;
  });
}

const TAPES_KEY='zhuanzhuan:spinner:custom-tapes:v1';
const PRESETS_KEY='zhuanzhuan:spinner:presets:v1';
function makeId(prefix){
  const arr=new Uint32Array(2);crypto.getRandomValues(arr);
  return `${prefix}-${Date.now().toString(36)}-${arr[0].toString(36)}${arr[1].toString(36)}`;
}
function cleanText(value,label){
  const text=String(value??'').trim();
  if(!text) throw new Error(`${label}不能为空`);
  return text;
}
function normalizeRecorder(value){
  const recorder=String(value||'').trim();
  return ['用户','AI','共同','导入'].includes(recorder)?recorder:'导入';
}
function normalizeTapeSource(value){
  return String(value||'').trim()||'shared';
}
function cloneTape(tape,prefix='custom'){
  if(!tape||!Array.isArray(tape.entries)) throw new Error('卷轴无效');
  return {
    id:makeId(prefix),name:String(tape.name||'').trim(),category:String(tape.category||'').trim(),icon:String(tape.icon||'').trim(),
    recorder:normalizeRecorder(tape.recorder),source:normalizeTapeSource(tape.source),
    entries:tape.entries.map(entry=>({id:makeId('entry'),label:String(entry.label||'').trim(),detail:entryDetail(entry)}))
  };
}
function createCustomTape(name,category='',icon='🎞️',recorder='共同',source='browser'){
  return {id:makeId('tape'),name:cleanText(name,'卷轴名'),category:String(category||'').trim()||'自定义',icon:String(icon||'').trim()||'🎞️',
    recorder:normalizeRecorder(recorder),source:normalizeTapeSource(source),entries:[]};
}
function addTapeEntry(tape,label,detail=''){
  const next={...tape,entries:[...tape.entries,{id:makeId('entry'),label:cleanText(label,'候选内容'),detail:String(detail??'')}]};
  return next;
}
function editTapeEntry(tape,entryId,label,detail=''){
  const nextLabel=cleanText(label,'候选内容');
  let found=false;const nextDetail=String(detail??'');
  const next={...tape,entries:tape.entries.map(entry=>{if(entry.id!==entryId)return entry;found=true;return {id:entry.id,label:nextLabel,detail:nextDetail};})};
  if(!found) throw new Error('找不到候选');
  return next;
}
function removeTapeEntry(tape,entryId){
  return {...tape,entries:tape.entries.filter(entry=>entry.id!==entryId)};
}
function updateSlot(slots,slotId,fn){
  let found=false;const next=slots.map(slot=>{if(slot.id!==slotId)return slot;found=true;return fn(slot);});
  if(!found) throw new Error('找不到轴位');return next;
}
function loadTapeIntoSlot(slots,slotId,tapeId){
  if(!tapeId) throw new Error('卷轴不能为空');
  return updateSlot(slots,slotId,slot=>({...slot,enabled:true,tapeRef:tapeId,localTape:null}));
}
function ejectSlot(slots,slotId){return updateSlot(slots,slotId,slot=>({...slot,enabled:false,tapeRef:null,localTape:null}));}
function toggleSlot(slots,slotId,enabled){return updateSlot(slots,slotId,slot=>({...slot,enabled:Boolean(enabled)}));}
function makeSlotLocal(slots,slotId,tapeMap){
  return updateSlot(slots,slotId,slot=>{
    const source=getTapeForSlot(slot,tapeMap);if(!source)throw new Error('空轴不能复制成本轴专用');
    return {...slot,tapeRef:null,localTape:cloneTape(source,'local')};
  });
}
function validateTape(tape){
  if(!tape||typeof tape!=='object') throw new Error('卷轴读取失败');
  const name=String(tape.name||'').trim();if(!name)throw new Error('卷轴名不能为空');
  if(!Array.isArray(tape.entries))throw new Error('卷轴候选读取失败');
  const ids=new Set();
  const normalized=tape.entries.map(entry=>{
    if(!entry||typeof entry!=='object')throw new Error('候选读取失败');
    const label=String(entry.label||'').trim();if(!label)throw new Error('候选内容不能为空');
    const id=String(entry.id||'').trim();if(!id||ids.has(id))throw new Error('候选 id 无效');ids.add(id);
    return {id,label,detail:entryDetail(entry)};
  });
  return {id:String(tape.id||'').trim()||makeId('tape'),name,category:String(tape.category||'').trim()||'自定义',icon:String(tape.icon||'').trim()||'🎞️',
    recorder:normalizeRecorder(tape.recorder),source:normalizeTapeSource(tape.source),entries:normalized};
}
function serializeCustomTapes(tapes){return JSON.stringify({version:1,tapes});}
function parseCustomTapes(text){
  let data;try{data=JSON.parse(text)}catch(_){throw new Error('本地卷轴读取失败');}
  if(!data||data.version!==1)throw new Error('本地卷轴版本不支持');
  if(!Array.isArray(data.tapes))throw new Error('本地卷轴读取失败');
  return {version:1,tapes:data.tapes.map(validateTape)};
}
function saveCustomTapes(tapes){localStorage.setItem(TAPES_KEY,serializeCustomTapes(tapes));}
function loadCustomTapes(){
  const raw=localStorage.getItem(TAPES_KEY);if(!raw)return {ok:true,tapes:[]};
  try{return {ok:true,tapes:parseCustomTapes(raw).tapes};}
  catch(error){return {ok:false,tapes:[],raw,message:'本地卷轴读取失败'};}
}

function comparisonValue(entry){return String((entry&&entry.label)||(entry&&entry.symbol)||'');}
function evaluateHit(entries,rule){
  const values=entries.map(comparisonValue);
  const counts=new Map();for(const value of values)counts.set(value,(counts.get(value)||0)+1);
  let bestValue='',bestCount=0;for(const [value,count] of counts){if(count>bestCount){bestValue=value;bestCount=count;}}
  if(rule.type==='all-same')return {hit:values.length>=2&&bestCount===values.length,value:bestValue,count:bestCount};
  if(rule.type==='at-least')return {hit:bestCount>=rule.n,value:bestValue,count:bestCount};
  if(rule.type==='target'){
    const target=String(rule.target||'').trim();
    const count=entries.filter(entry=>comparisonValue(entry)===target||String(entry&&entry.symbol||'')===target||entryDetail(entry)===target).length;
    return {hit:count>=rule.n,value:target,count};
  }
  throw new Error('未知命中规则');
}
function validateClassicConfig(activeSlots,rule,maxRounds){
  const count=Array.isArray(activeSlots)?activeSlots.length:0;if(count<2)throw new Error('经典命中至少 2 个轴');
  const rounds=Number(maxRounds);if(!Number.isInteger(rounds)||rounds<1||rounds>20)throw new Error('轮数必须在 1～20');
  if(!rule||!['all-same','at-least','target'].includes(rule.type))throw new Error('命中规则无效');
  if(rule.type!=='all-same'){
    const n=Number(rule.n);if(!Number.isInteger(n)||n<2||n>count)throw new Error(`N 必须在 2～${count}`);
    if(rule.type==='target'&&!String(rule.target||'').trim())throw new Error('指定值不能为空');
  }
  return true;
}
function prepareSpin(slots,tapeMap,rng=randInt,mode='combo'){return prepareCombination(slots,tapeMap,rng,mode);}

function copyTapeData(tape){return tape?validateTape(tape):null;}
function copySlotData(slot){
  if(!slot||typeof slot!=='object')throw new Error('轴位读取失败');
  const localTape=copyTapeData(slot.localTape);const tapeRef=localTape?null:(slot.tapeRef?String(slot.tapeRef).trim():null);
  const empty=!localTape&&!tapeRef;
  return {id:axisId(slot.id),enabled:empty?false:Boolean(slot.enabled),tapeRef,localTape,drawCount:normalizeDrawCount(slot.drawCount)};
}
function makePreset(name,state){
  return {id:makeId('preset'),name:cleanText(name,'方案名'),layoutVersion:SPINNER_LAYOUT_VERSION,mode:state.mode==='classic'?'classic':'combo',slots:validateSlotList(state.slots||makeSlots()),classic:{rule:{...(state.classic&&state.classic.rule?state.classic.rule:{type:'all-same'})},maxRounds:Number(state.classic&&state.classic.maxRounds||5)}};
}
function validatePreset(preset,{legacy}={}){
  if(!preset||typeof preset!=='object')throw new Error('方案读取失败');
  const name=String(preset.name||'').trim();if(!name)throw new Error('方案名不能为空');
  const migrate=legacy===undefined?preset.layoutVersion!==SPINNER_LAYOUT_VERSION:Boolean(legacy);
  const slots=migrate?migrateSpinnerSlots(preset.slots,()=>makeId('axis')):validateSlotList(preset.slots);
  const mode=preset.mode==='classic'?'classic':'combo';
  const classic=preset.classic&&typeof preset.classic==='object'?preset.classic:{};
  const rule={...(classic.rule||{type:'all-same'})};
  const legacyTargets={'🍦':'雪糕','🔥':'火锅','🌤️':'出去玩'};
  if(rule.type==='target'&&legacyTargets[rule.target])rule.target=legacyTargets[rule.target];
  return {id:String(preset.id||'').trim()||makeId('preset'),name,layoutVersion:SPINNER_LAYOUT_VERSION,mode,slots,classic:{rule,maxRounds:Number(classic.maxRounds||5)}};
}
function serializePresets(presets){return JSON.stringify({version:2,presets:presets.map(preset=>validatePreset(preset,{legacy:false}))});}
function parsePresets(text){
  let data;try{data=JSON.parse(text)}catch(_){throw new Error('本地方案读取失败');}
  if(!data||![1,2].includes(data.version))throw new Error('本地方案版本不支持');
  if(!Array.isArray(data.presets))throw new Error('本地方案读取失败');
  return {version:2,presets:data.presets.map(preset=>validatePreset(preset,{legacy:data.version===1}))};
}
function applyPreset(preset,tapeMap){
  const normalized=validatePreset(preset);const missingTapeIds=[];
  const slots=normalized.slots.map(slot=>{
    if(slot.localTape)return copySlotData(slot);
    if(slot.tapeRef&&!tapeMap.has(slot.tapeRef)){missingTapeIds.push(slot.tapeRef);return {...slot,enabled:false,tapeRef:null,localTape:null};}
    return copySlotData(slot);
  });
  return {state:{mode:normalized.mode,slots,classic:{rule:{...normalized.classic.rule},maxRounds:normalized.classic.maxRounds}},missingTapeIds};
}
function savePresets(presets){localStorage.setItem(PRESETS_KEY,serializePresets(presets));}
function loadPresets(){const raw=localStorage.getItem(PRESETS_KEY);if(!raw)return {ok:true,presets:[]};try{return {ok:true,presets:parsePresets(raw).presets};}catch(error){return {ok:false,presets:[],raw,message:'本地方案读取失败'};}}
function builtinSlots(tapeId,count){let slots=makeSlots(Math.max(MIN_AXIS_COUNT,count));for(let i=0;i<count;i++)slots=loadTapeIntoSlot(slots,`slot-${i+1}`,tapeId);return slots;}
function comboBuiltinSlots(ids){let slots=makeSlots(Math.max(MIN_AXIS_COUNT,ids.length));ids.forEach((id,index)=>{slots=loadTapeIntoSlot(slots,`slot-${index+1}`,id)});return slots;}
const BUILTIN_PRESETS=[
  {id:'builtin-world',name:'🌍 世界生成',mode:'combo',slots:comboBuiltinSlots(['world-era','macro-region','world-framework','world-rules','power-system','civilization-ecology']),classic:{rule:{type:'all-same'},maxRounds:5},builtin:true},
  {id:'builtin-character',name:'🎭 人物生成',mode:'combo',slots:comboBuiltinSlots(['identity-pairs','age-relations','character-relations','lifespan-structure']),classic:{rule:{type:'all-same'},maxRounds:5},builtin:true},
  {id:'builtin-story',name:'🎬 剧情开局',mode:'combo',slots:comboBuiltinSlots(['world-era','book-genres','macro-region','specific-scene','identity-pairs','character-relations']),classic:{rule:{type:'all-same'},maxRounds:5},builtin:true}
];

if(typeof module!=='undefined'&&module.exports){
  module.exports={MIN_AXIS_COUNT,MAX_AXIS_COUNT,SPINNER_LAYOUT_VERSION,entries,FIRST_PARTY_TAPES,entryDetail,normalizeDrawCount,normalizeRecorder,normalizeTapeSource,makeEmptySlot,makeSlots,isEmptySlot,migrateSpinnerSlots,addAxis,deleteAxis,installTape,ejectTapeEverywhere,clearAxes,randInt,getTapeForSlot,drawEntry,drawEntries,prepareCombination,TAPES_KEY,PRESETS_KEY,makeId,cleanText,cloneTape,createCustomTape,addTapeEntry,editTapeEntry,removeTapeEntry,updateSlot,loadTapeIntoSlot,ejectSlot,toggleSlot,makeSlotLocal,validateTape,serializeCustomTapes,parseCustomTapes,comparisonValue,evaluateHit,validateClassicConfig,prepareSpin,copyTapeData,copySlotData,makePreset,validatePreset,serializePresets,parsePresets,applyPreset,builtinSlots,comboBuiltinSlots,BUILTIN_PRESETS};
}
