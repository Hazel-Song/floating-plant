'use client';

import React, { useState, useEffect } from 'react';
import PlantDataPanel from '@/components/PlantDataPanel';
import AgentDebatePanel from '@/components/AgentDebatePanel';
import MetaAnalysisPanel from '@/components/MetaAnalysisPanel';
import PlantDialoguePanel from '@/components/PlantDialoguePanel';

export default function Home() {
  const [selectedPlantData, setSelectedPlantData] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning': return 'border-l-white/70 bg-white/5';
      case 'positive': return 'border-l-[#20f5c0] bg-[#14efb3]/10';
      default: return 'border-l-[#14efb3] bg-[#14efb3]/5';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部标题栏 */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold gpt-gradient-text">植物意识监测</h1>
              <p className="text-sm gpt-text-muted mt-1">Botanical Consciousness Monitoring System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#14efb3] rounded-full animate-pulse"></div>
                <span className="text-sm gpt-text-secondary">实时监测中</span>
              </div>
              <div className="text-sm gpt-text-muted">
                {new Date().toLocaleString('zh-CN')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          
          {/* 左侧分类筛选面板 */}
          <div className="col-span-2 space-y-4">
            <div className="gpt-card p-4">
              <h3 className="text-lg font-semibold mb-4 gpt-text-primary">事件分类</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded transition-all duration-200 ${
                      selectedCategory === category.id 
                        ? `${category.color} border border-[#14efb3]/30 neon-glow` 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="text-sm font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="gpt-card p-4">
              <h3 className="text-lg font-semibold mb-4 gpt-text-primary">时间范围</h3>
              <div className="space-y-2">
                {[
                  { id: 'today', name: '今日' },
                  { id: 'week', name: '本周' },
                  { id: 'month', name: '本月' },
                  { id: 'all', name: '全部' }
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setSelectedTimeRange(range.id)}
                    className={`w-full text-left p-2 rounded text-sm transition-all duration-200 ${
                      selectedTimeRange === range.id 
                        ? 'bg-[#14efb3]/20 text-[#14efb3] neon-border' 
                        : 'hover:bg-white/5 gpt-text-secondary'
                    }`}
                  >
                    {range.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 中央数据可视化区域 */}
          <div className="col-span-7 space-y-6">
            {/* 中心圆环图区域 */}
            <div className="gpt-card p-6 h-[400px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* 模拟圆环图 */}
                <div className="relative">
                  <div className="data-viz-ring data-glow"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold gpt-text-primary signal-pulse">156</div>
                      <div className="text-sm gpt-text-muted">活跃信号</div>
                      <div className="text-xs gpt-text-muted mt-1">ACTIVE SIGNALS</div>
                    </div>
                  </div>
                </div>
              </div>
               
              {/* 四个角落的数据面板 */}
              <div className="absolute top-4 left-4 w-56">
                <div className="gpt-card p-3 bg-[#14efb3]/5 border-[#14efb3]/20 neon-glow">
                  <div className="text-xs gpt-text-muted mb-2 flex items-center">
                    <div className="w-4 h-4 bg-[#14efb3]/20 flex items-center justify-center mr-2 rounded">
                      <span className="text-[#14efb3] font-mono text-xs">01</span>
                    </div>
                    生命信号采集
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="gpt-text-secondary">温度:</span>
                      <span className="text-[#14efb3]">23.2°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="gpt-text-secondary">湿度:</span>
                      <span className="text-[#20f5c0]">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="gpt-text-secondary">光照:</span>
                      <span className="text-white">1200lux</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-56">
                <div className="gpt-card p-3 bg-[#14efb3]/10 border-[#14efb3]/30 neon-glow">
                  <div className="text-xs gpt-text-muted mb-2 flex items-center">
                    <div className="w-4 h-4 bg-[#14efb3]/30 flex items-center justify-center mr-2 rounded">
                      <span className="text-[#14efb3] font-mono text-xs">02</span>
                    </div>
                    意识解析矩阵
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#14efb3] rounded-full animate-pulse"></div>
                      <span className="gpt-text-secondary">AI分析进行中...</span>
                    </div>
                    <div className="text-[#14efb3]">认知模式: 活跃状态</div>
                    <div className="text-[#20f5c0]">响应强度: 87%</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 w-56">
                <div className="gpt-card p-3 bg-[#14efb3]/15 border-[#14efb3]/40 neon-glow">
                  <div className="text-xs gpt-text-muted mb-2 flex items-center">
                    <div className="w-4 h-4 bg-[#14efb3]/40 flex items-center justify-center mr-2 rounded">
                      <span className="text-[#14efb3] font-mono text-xs">03</span>
                    </div>
                    认知架构映射
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="text-[#14efb3]">语义层级: L3</div>
                    <div className="text-[#20f5c0]">模式识别: 正常</div>
                    <div className="text-white">映射精度: 94%</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 w-56">
                <div className="gpt-card p-3 bg-[#14efb3]/20 border-[#14efb3]/50 neon-glow">
                  <div className="text-xs gpt-text-muted mb-2 flex items-center">
                    <div className="w-4 h-4 bg-[#14efb3]/50 flex items-center justify-center mr-2 rounded">
                      <span className="text-[#14efb3] font-mono text-xs">04</span>
                    </div>
                    跨界通讯协议
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#14efb3] rounded-full animate-pulse"></div>
                      <span className="text-[#20f5c0]">通讯链路已建立</span>
                    </div>
                    <div className="text-[#14efb3]">信号强度: 良好</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部时间轴 */}
            <div className="gpt-card p-4">
              <h3 className="text-lg font-semibold mb-4 gpt-text-primary">活动时间轴</h3>
              <div className="relative h-20 bg-gradient-to-r from-black via-gray-900 to-black rounded">
                {/* 时间刻度 */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs gpt-text-muted px-4">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </div>
                
                {/* 活动点 */}
                <div className="absolute inset-0 flex items-center px-4">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-8 mx-1 rounded timeline-bar ${
                        Math.random() > 0.7 
                          ? 'bg-[#14efb3]' 
                          : Math.random() > 0.5 
                          ? 'bg-[#20f5c0]' 
                          : 'bg-white/30'
                      }`}
                      style={{ height: `${Math.random() * 32 + 8}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* 详细数据面板区域 */}
            <div className="grid grid-cols-2 gap-6">
              <div className="gpt-card p-4">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-[#14efb3]/20 flex items-center justify-center mr-3 rounded neon-glow">
                    <span className="text-[#14efb3] font-mono text-sm">01</span>
                  </div>
                  <h3 className="text-lg font-semibold gpt-text-primary">生命信号采集详情</h3>
                </div>
                <div className="h-64 overflow-y-auto">
                  <PlantDataPanel 
                    onDataSelect={setSelectedPlantData}
                    selectedData={selectedPlantData}
                  />
                </div>
              </div>

              <div className="gpt-card p-4">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-[#14efb3]/30 flex items-center justify-center mr-3 rounded neon-glow">
                    <span className="text-[#14efb3] font-mono text-sm">02</span>
                  </div>
                  <h3 className="text-lg font-semibold gpt-text-primary">意识解析矩阵详情</h3>
                </div>
                <div className="h-64 overflow-y-auto">
                  <AgentDebatePanel 
                    plantData={selectedPlantData}
                    onAnalysisComplete={setAnalysisResult}
                  />
                </div>
              </div>

              <div className="gpt-card p-4">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-[#14efb3]/40 flex items-center justify-center mr-3 rounded neon-glow">
                    <span className="text-[#14efb3] font-mono text-sm">03</span>
                  </div>
                  <h3 className="text-lg font-semibold gpt-text-primary">认知架构映射详情</h3>
                </div>
                <div className="h-64 overflow-y-auto">
                  <MetaAnalysisPanel 
                    analysisResult={analysisResult}
                    plantData={selectedPlantData}
                  />
                </div>
              </div>

              <div className="gpt-card p-4">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-[#14efb3]/50 flex items-center justify-center mr-3 rounded neon-glow">
                    <span className="text-[#14efb3] font-mono text-sm">04</span>
                  </div>
                  <h3 className="text-lg font-semibold gpt-text-primary">跨界通讯协议详情</h3>
                </div>
                <div className="h-64 overflow-y-auto">
                  <PlantDialoguePanel 
                    metaAnalysis={analysisResult}
                    plantData={selectedPlantData}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 右侧事件列表 */}
          <div className="col-span-3">
            <div className="gpt-card p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold gpt-text-primary">
                  显示所有事件 ({plantEvents.length})
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#14efb3] rounded-full animate-neon-pulse"></div>
                  <span className="text-xs gpt-text-muted">实时更新</span>
                </div>
              </div>
              
              <div className="space-y-3 overflow-y-auto h-[calc(100%-60px)]">
                {plantEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`border-l-4 pl-4 py-3 ${getSeverityColor(event.severity)} transition-all duration-200 hover:bg-white/5 cursor-pointer event-card`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs gpt-text-muted">{event.date}</span>
                      <span className="text-xs font-mono gpt-text-muted">{event.time}</span>
                    </div>
                    <h4 className="font-medium gpt-text-primary mb-1 text-sm">
                      {event.title}
                    </h4>
                    <p className="text-xs gpt-text-secondary leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 