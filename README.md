# 🌱 智能植物分析系统

一个基于Next.js + Tailwind CSS + SQLite的智能植物健康监测与分析平台。

## 功能特点

### 四栏布局设计
- **植物原始数据区**: 显示环境传感器数据和植物生理指标
- **AI专家辩论区**: 三个AI专家从不同角度分析植物数据
- **元语言分析区**: 展示推理过程和逻辑结构
- **植物对话区**: 基于分析结果生成植物的拟人化对话

### 核心功能
1. **实时数据监测**: 温度、湿度、光照、土壤等多维度数据
2. **AI专家系统**: 生理诊断、环境分析、数据校验三个专家Agent
3. **智能分析**: 5轮辩论后生成综合评定结果
4. **元语言处理**: 结构化推理过程展示
5. **植物对话**: 根据分析结果生成个性化植物对话

## 技术栈

- **前端**: Next.js 15 + React 18 + TypeScript
- **样式**: Tailwind CSS
- **数据库**: SQLite + Prisma ORM
- **图标**: Lucide React
- **动画**: Framer Motion

## 快速开始

### 安装依赖
```bash
npm install
```

### 初始化数据库
```bash
npx prisma generate
npx prisma db push
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   └── plant-data/
│   │       └── route.ts          # 植物数据API
│   ├── globals.css               # 全局样式
│   └── page.tsx                  # 主页面
├── components/
│   ├── PlantDataPanel.tsx        # 植物数据面板
│   ├── AgentDebatePanel.tsx      # AI专家辩论面板
│   ├── MetaAnalysisPanel.tsx     # 元语言分析面板
│   └── PlantDialoguePanel.tsx    # 植物对话面板
└── prisma/
    ├── schema.prisma             # 数据库模式
    └── seed.ts                   # 种子数据
```

## 数据库模式

### PlantData (植物数据)
- 环境数据: 温度、湿度、光照、土壤湿度、pH值、空气质量
- 生理数据: 叶片颜色、大小、茎高度、根系健康、生长速度
- 图像数据: 植物照片URL

### AgentConversation (专家对话)
- 三种专家类型: physiological, environmental, validation
- 对话轮次和内容记录

### MetaAnalysis (元语言分析)
- 分析结果和推理过程
- 最终结论

### PlantDialogue (植物对话)
- 植物个性化对话内容
- 情绪和性格特征

## 使用说明

1. **查看植物数据**: 在左上角面板选择日期，查看植物的实时数据
2. **启动AI分析**: 在右上角面板选择专家，点击"开始辩论"
3. **查看推理过程**: 左下角面板会显示元语言分析结果
4. **听植物说话**: 右下角面板展示植物的拟人化对话

## 开发计划

- [ ] 集成真实的OpenAI API
- [ ] 添加更多植物品种支持
- [ ] 实现历史数据趋势分析
- [ ] 添加用户认证和多用户支持
- [ ] 移动端适配优化

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License # floating-plant
