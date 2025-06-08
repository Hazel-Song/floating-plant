'use client';

import React, { useState, useEffect, useRef } from 'react';
import DataCleaningPanel from '@/components/DataCleaningPanel';
import DataAnalysisPanel from '@/components/DataAnalysisPanel';
import PlantLanguagePanel from '@/components/PlantLanguagePanel';
import CommunicationPanel from '@/components/CommunicationPanel';

export default function Home() {
  const [selectedPlantData, setSelectedPlantData] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [monitorPanelOpen, setMonitorPanelOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedObservationDate, setSelectedObservationDate] = useState<string | null>('2024-06-09'); // 默认选择6.9号

  // 植物图片事件日期映射
  const plantEventDates = [
    '2024-06-06', // plant1.png
    '2024-06-07', // plant2.png
    '2024-06-08', // plant3.png
    '2024-06-09', // plant4.png
    '2024-06-10', // plant5.png
    '2024-06-11'  // plant6.png
  ];

  // 获取植物观测数据
  const getPlantObservationData = (dateString: string) => {
    const eventIndex = plantEventDates.indexOf(dateString);
    if (eventIndex === -1) return null;

    const observationData = [
      {
        date: '2024-06-06',
        time: '09:15:23',
        coordinates: '31.2304°N, 121.4737°E',
        experimentId: 'PFL-001',
        imageUrl: '/plant1.png',
        description: '初始状态记录，种子萌发阶段'
      },
      {
        date: '2024-06-07',
        time: '14:30:45',
        coordinates: '31.2304°N, 121.4737°E',
        experimentId: 'PFL-002',
        imageUrl: '/plant2.png',
        description: '首次根系伸展，胚根突破种皮'
      },
      {
        date: '2024-06-08',
        time: '10:22:18',
        coordinates: '31.2304°N, 121.4737°E',
        experimentId: 'PFL-003',
        imageUrl: '/plant3.png',
        description: '子叶展开，光合作用开始'
      },
      {
        date: '2024-06-09',
        time: '16:45:12',
        coordinates: '31.2304°N, 121.4737°E',
        experimentId: 'PFL-004',
        imageUrl: '/plant4.png',
        description: '真叶形成，根系发达'
      },
      {
        date: '2024-06-10',
        time: '11:33:07',
        coordinates: '31.2304°N, 121.4737°E',
        experimentId: 'PFL-005',
        imageUrl: '/plant5.png',
        description: '茎部伸长，叶片增大'
      },
      {
        date: '2024-06-11',
        time: '13:18:56',
        coordinates: '31.2304°N, 121.4737°E',
        experimentId: 'PFL-006',
        imageUrl: '/plant6.png',
        description: '生长旺盛，多层叶片结构完整'
      }
    ];

    return observationData[eventIndex];
  };

  // 模拟植物事件数据
  const plantEvents = [
    {
      id: 1,
      date: '2024年1月15日',
      time: '14:30',
      category: 'growth',
      title: '叶片生长异常活跃',
      description: '检测到植物在光照充足环境下，叶片生长速度较平时提升40%',
      severity: 'normal'
    },
    {
      id: 2,
      date: '2024年1月14日',
      time: '09:15',
      category: 'environment',
      title: '土壤湿度临界警告',
      description: '土壤湿度降至25%，建议立即补充水分以维持植物正常生理活动',
      severity: 'warning'
    },
    {
      id: 3,
      date: '2024年1月13日',
      time: '16:45',
      category: 'communication',
      title: '跨界通讯信号增强',
      description: '植物电信号活动频率提升，疑似对环境变化产生积极响应',
      severity: 'positive'
    }
  ];

  const categories = [
    { id: 'all', name: '全部事件', color: 'bg-white/10' },
    { id: 'growth', name: '生长发育', color: 'bg-[#14efb3]/10' },
    { id: 'environment', name: '环境响应', color: 'bg-[#14efb3]/15' },
    { id: 'communication', name: '通讯信号', color: 'bg-[#14efb3]/20' },
    { id: 'health', name: '健康状态', color: 'bg-[#14efb3]/25' }
  ];

  // 四个主要功能卡片
  const mainCards = [
    {
      id: 'data-collection',
      name: '原始数据清洗',
      icon: (
        <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      ),
      description: '实时监测植物生命体征数据，包括温度、湿度、光照强度等关键指标，构建全面的生理状态档案。',
      features: ['多维传感器数据采集', '实时数据清洗与校验', '历史数据对比分析', '异常值识别与预警']
    },
    {
      id: 'consciousness-analysis',
      name: '数据分析推断',
      icon: (
        <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      ),
      description: '运用先进的AI算法分析植物电信号和行为模式，解析潜在的意识活动和认知反应机制。',
      features: ['多专家系统协同分析', '意识模式识别算法', '行为预测模型', 'AI辅助决策支持']
    },
    {
      id: 'cognitive-mapping',
      name: '植物语言映射',
      icon: (
        <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
      ),
      description: '基于收集的数据构建植物认知架构模型，识别决策模式和环境适应性行为特征。',
      features: ['认知结构建模', '推理链路分析', '元认知模式识别', '知识图谱构建']
    },
    {
      id: 'communication-protocol',
      name: '通讯系统界面',
      icon: (
        <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
      ),
      description: '建立人植沟通桥梁，通过信号解析和模式识别实现跨物种的信息交换和理解。',
      features: ['跨物种通讯协议', '信号解码与编码', '情感状态识别', '交互式对话系统']
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning': return 'border-l-amber-500 bg-amber-900/20';
      case 'positive': return 'border-l-green-500 bg-green-900/20';
      default: return 'border-l-blue-500 bg-blue-900/20';
    }
  };

  // 生成日历数据
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // 上个月的日期
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        dateString: prevDate.toISOString().split('T')[0]
      });
    }
    
    // 当月的日期
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const dateString = date.toISOString().split('T')[0];
      const hasEvent = plantEventDates.includes(dateString); // 只有植物图片日期有事件
      
      days.push({
        date: day,
        isCurrentMonth: true,
        isToday,
        hasEvent,
        dateString
      });
    }
    
    // 下个月的日期
    const totalCells = 42; // 6行 × 7列
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: day,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        dateString: nextDate.toISOString().split('T')[0]
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const handleDateClick = (dateString: string, hasEvent: boolean) => {
    if (hasEvent) {
      setSelectedObservationDate(dateString);
    }
  };

  const renderSelectedCardContent = () => {
    const card = mainCards.find(c => c.id === selectedCard);
    if (!card) return null;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
        <div className="flex items-center mb-6">
          <div className="mr-3">{card.icon}</div>
          <h3 className="text-xl font-semibold text-gray-800">{card.name}</h3>
        </div>
        <div className="h-[calc(100%-80px)] overflow-y-auto">
          {card.id === 'data-collection' && (
            <DataCleaningPanel 
              onDataSelect={setSelectedPlantData}
              selectedData={selectedPlantData}
              selectedObservationDate={selectedObservationDate}
            />
          )}
          {card.id === 'consciousness-analysis' && (
            <DataAnalysisPanel 
              plantData={selectedPlantData}
              onAnalysisComplete={setAnalysisResult}
            />
          )}
          {card.id === 'cognitive-mapping' && (
            <PlantLanguagePanel 
              analysisResult={analysisResult}
              plantData={selectedPlantData}
            />
          )}
          {card.id === 'communication-protocol' && (
            <CommunicationPanel 
              metaAnalysis={analysisResult}
              plantData={selectedPlantData}
            />
          )}
        </div>
      </div>
    );
  };

  const renderTooltip = () => {
    if (!hoveredCard) return null;
    
    const card = mainCards.find(c => c.id === hoveredCard);
    if (!card) return null;

    return (
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
        <div className="bg-gray-800 text-white rounded-lg shadow-xl p-4 max-w-xs border border-gray-700">
          <div className="flex items-center mb-3">
            <div className="mr-2 opacity-80">{card.icon}</div>
            <h4 className="font-semibold text-sm">{card.name}</h4>
          </div>
          <p className="text-xs text-gray-300 mb-3 leading-relaxed">{card.description}</p>
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-400 mb-2">核心功能：</div>
            {card.features.map((feature, index) => (
              <div key={index} className="flex items-center text-xs">
                <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
          {/* 箭头 */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="h-screen overflow-hidden bg-gray-50 text-gray-900 relative">
      {/* 顶部标题栏 */}
      <div className="border-b border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">植物漂流计划</h1>
              <p className="text-sm text-gray-600 mt-1">Drifting Flora Initiative</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-700">实时监测中</span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleString('zh-CN')}
              </div>
              <button
                onClick={() => setCalendarOpen(!calendarOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="text-sm">观测日历</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${calendarOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                onClick={() => setMonitorPanelOpen(!monitorPanelOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span className="text-sm">监控面板</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${monitorPanelOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* 左侧日历和图片显示 - 可收起 */}
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          calendarOpen ? 'w-80' : 'w-0'
        } overflow-hidden`}>
          {calendarOpen && (
            <div className="p-6 h-full flex flex-col">
              {/* 日历部分 */}
              <div className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">观测日历</h2>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 月份年份显示 */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {currentDate.toLocaleString('zh-CN', { year: 'numeric', month: 'long' })}
                  </h3>
                </div>

                {/* 星期标题 */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* 日历网格 */}
                <div className="grid grid-cols-7 gap-1 flex-1">
                  {generateCalendarDays().map((day, index) => (
                    <div
                      key={index}
                      onClick={() => handleDateClick(day.dateString, day.hasEvent && day.isCurrentMonth)}
                      className={`relative p-2 text-center text-sm cursor-pointer transition-colors rounded-lg ${
                        day.isCurrentMonth
                          ? day.isToday
                            ? 'bg-green-600 text-white font-bold'
                            : day.hasEvent
                            ? selectedObservationDate === day.dateString
                              ? 'bg-green-200 text-gray-800 border-2 border-green-500'
                              : 'bg-green-50 text-gray-800 hover:bg-green-100'
                            : 'hover:bg-gray-100 text-gray-800'
                          : 'text-gray-400'
                      } ${day.hasEvent && day.isCurrentMonth ? 'cursor-pointer' : ''}`}
                      title={day.hasEvent && day.isCurrentMonth ? `观测数据: ${day.dateString}` : ''}
                    >
                      <span>{day.date}</span>
                      {day.hasEvent && day.isCurrentMonth && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 日历图例 */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
                    <span className="text-gray-600">今日</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">观测数据</span>
                  </div>
                  <div className="text-gray-500 text-xs">
                    共 {plantEventDates.length} 天观测记录
                  </div>
                </div>
                              </div>
              </div>
          )}
        </div>

        {/* 中央内容区域 */}
        <div className="flex-1 p-6">
          {selectedCard ? (
            <div className="h-full">
              {renderSelectedCardContent()}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-6">🌱</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">植物意识探索系统</h3>
                <p className="text-gray-600 text-lg mb-8">选择下方功能模块开始探索植物意识的奥秘</p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-sm text-gray-600">活跃信号</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">24h</div>
                    <div className="text-sm text-gray-600">连续监测</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部四个功能卡片 */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="grid grid-cols-4 gap-0 shadow-lg">
          {mainCards.map((card, index) => (
            <div
              key={card.id}
              className="relative"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                className={`cursor-pointer transition-all duration-300 bg-white border-r border-gray-200 last:border-r-0 p-6 flex flex-col items-center justify-center h-32 ${
                  selectedCard === card.id 
                    ? 'bg-green-50 shadow-xl border-green-200 transform scale-105' 
                    : 'hover:bg-gray-50 hover:shadow-lg hover:transform hover:scale-[1.02] hover:-translate-y-1'
                }`}
              >
                <div className="mb-3">{card.icon}</div>
                <h3 className="text-sm font-semibold text-center text-gray-800">{card.name}</h3>
              </div>
              
              {/* 卡片提示框 */}
              {hoveredCard === card.id && renderTooltip()}
            </div>
          ))}
        </div>
      </div>

      {/* 右侧监控面板悬浮窗 */}
      <div className={`fixed top-0 right-0 h-full bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 z-30 ${
        monitorPanelOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ width: '420px' }}>
        <div className="h-full flex flex-col">
          {/* 监控面板头部 */}
          <div className="bg-gray-800 p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">系统监控面板</h3>
                <p className="text-xs text-gray-400">实时数据展示</p>
              </div>
              <button
                onClick={() => setMonitorPanelOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* 监控面板内容 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* 中心状态显示 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 border-4 border-gray-600 rounded-full relative">
                    <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold">156</div>
                      <div className="text-xs text-gray-400">信号</div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-300">系统运行正常</div>
              </div>
            </div>

            {/* 分类筛选 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-3">事件分类</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-2 rounded text-xs transition-all duration-200 ${
                      selectedCategory === category.id 
                        ? 'bg-green-700 border border-green-600' 
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 时间范围 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-3">时间范围</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'today', name: '今日' },
                  { id: 'week', name: '本周' },
                  { id: 'month', name: '本月' },
                  { id: 'all', name: '全部' }
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setSelectedTimeRange(range.id)}
                    className={`p-2 rounded text-xs transition-all duration-200 ${
                      selectedTimeRange === range.id 
                        ? 'bg-green-700 border border-green-600' 
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    {range.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 活动时间轴 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-3">活动时间轴</h4>
              <div className="relative h-16 bg-gray-700 rounded">
                <div className="absolute inset-0 flex items-center px-2">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 mx-0.5 rounded ${
                        Math.random() > 0.7 
                          ? 'bg-green-500' 
                          : Math.random() > 0.5 
                          ? 'bg-green-400' 
                          : 'bg-gray-500'
                      }`}
                      style={{ height: `${Math.random() * 32 + 8}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* 事件列表 */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold">最近事件</h4>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">实时</span>
                </div>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {plantEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`border-l-2 pl-3 py-2 ${getSeverityColor(event.severity)} rounded-r`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs text-gray-400">{event.date}</span>
                      <span className="text-xs font-mono text-gray-400">{event.time}</span>
                    </div>
                    <h5 className="text-xs font-medium mb-1">{event.title}</h5>
                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 左侧日历打开箭头按钮 */}
      {!calendarOpen && (
        <button
          onClick={() => setCalendarOpen(true)}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-r-lg shadow-lg hover:bg-blue-700 transition-colors z-20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* 右侧面板打开箭头按钮 */}
      {!monitorPanelOpen && (
        <button
          onClick={() => setMonitorPanelOpen(true)}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-l-lg shadow-lg hover:bg-gray-700 transition-colors z-20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
} 