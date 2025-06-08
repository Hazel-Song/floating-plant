import React, { useState, useEffect } from 'react';

interface PlantData {
  id: number;
  timestamp: string;
  temperature: number;
  humidity: number;
  lightIntensity: number;
  soilMoisture: number;
  soilPh: number;
  airQuality: number;
  leafColor: string;
  leafSize: number;
  stemHeight: number;
  rootHealth: string;
  growthRate: number;
  imageUrl?: string;
}

interface PlantDataPanelProps {
  onDataSelect: (data: PlantData | null) => void;
  selectedData: PlantData | null;
  selectedObservationDate?: string | null;
}

export default function DataCleaningPanel({ onDataSelect, selectedData, selectedObservationDate }: PlantDataPanelProps) {
  const [plantDataList, setPlantDataList] = useState<PlantData[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('2024-06-09');

  // 图片映射：日期到图片的对应关系 (6.6→plant1, 6.7→plant2, 6.8→plant3, 6.9→plant4, 6.10→plant5, 6.11→plant6)
  const getImageForDate = (dateString: string): string => {
    const imageMap: { [key: string]: string } = {
      '2024-06-06': '/plant1.png',
      '2024-06-07': '/plant2.png', 
      '2024-06-08': '/plant3.png',
      '2024-06-09': '/plant4.png',
      '2024-06-10': '/plant5.png',
      '2024-06-11': '/plant6.png'
    };
    return imageMap[dateString] || '/plant4.png'; // 默认显示6.9号对应的plant4.png
  };

  // 获取观测数据详情
  const getObservationInfo = (dateString: string) => {
    const infoMap: { [key: string]: any } = {
      '2024-06-06': { date: '2024-06-06', time: '09:15:23', coordinates: '31.2304°N, 121.4737°E', experimentId: 'PFL-001' },
      '2024-06-07': { date: '2024-06-07', time: '14:30:45', coordinates: '31.2304°N, 121.4737°E', experimentId: 'PFL-002' },
      '2024-06-08': { date: '2024-06-08', time: '10:22:18', coordinates: '31.2304°N, 121.4737°E', experimentId: 'PFL-003' },
      '2024-06-09': { date: '2024-06-09', time: '16:45:12', coordinates: '31.2304°N, 121.4737°E', experimentId: 'PFL-004' },
      '2024-06-10': { date: '2024-06-10', time: '11:33:07', coordinates: '31.2304°N, 121.4737°E', experimentId: 'PFL-005' },
      '2024-06-11': { date: '2024-06-11', time: '13:18:56', coordinates: '31.2304°N, 121.4737°E', experimentId: 'PFL-006' }
    };
    return infoMap[dateString] || infoMap['2024-06-09']; // 默认返回6.9号信息
  };

  // 当外部选择的观测日期变化时加载数据
  useEffect(() => {
    const targetDate = selectedObservationDate || '2024-06-09'; // 默认使用6.9号
    setCurrentDate(targetDate);
    loadPlantData(targetDate);
  }, [selectedObservationDate]);

  const loadPlantData = async (dateString: string = '2024-06-09') => {
    setLoading(true);
    setImageLoading(true);
    
    try {
      const availableDates = ['2024-06-06', '2024-06-07', '2024-06-08', '2024-06-09', '2024-06-10', '2024-06-11'];
      const dateIndex = availableDates.indexOf(dateString);
      const progressFactor = Math.max(0, dateIndex) / 5; // 0-1之间的进度值
      
      // 模拟数据随时间变化
      const mockData: PlantData = {
        id: dateIndex + 1,
        timestamp: new Date(dateString).toISOString(),
        temperature: 20 + progressFactor * 6 + Math.random() * 2,
        humidity: 55 + progressFactor * 20 + Math.random() * 10,
        lightIntensity: 600 + progressFactor * 800 + Math.random() * 200,
        soilMoisture: 40 + progressFactor * 25 + Math.random() * 10,
        soilPh: 6.2 + progressFactor * 0.8 + Math.random() * 0.3,
        airQuality: 80 + progressFactor * 15 + Math.random() * 5,
        leafColor: ['浅绿色', '绿色', '深绿色', '墨绿色', '翠绿色', '鲜绿色'][dateIndex] || '墨绿色',
        leafSize: 5 + progressFactor * 6 + Math.random() * 1,
        stemHeight: 15 + progressFactor * 20 + Math.random() * 3,
        rootHealth: ['发育中', '一般', '良好', '优秀', '极佳', '完美'][dateIndex] || '优秀',
        growthRate: 0.5 + progressFactor * 0.8 + Math.random() * 0.2,
        imageUrl: getImageForDate(dateString)
      };
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setPlantDataList([mockData]);
      onDataSelect(mockData);
      
      // 图片加载完成后再隐藏loading
      setTimeout(() => setImageLoading(false), 200);
    } catch (error) {
      console.error('加载植物数据失败:', error);
      setImageLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value: number, unit: string) => {
    return `${value.toFixed(1)}${unit}`;
  };

  const getHealthColor = (value: number, min: number, max: number) => {
    const normalized = (value - min) / (max - min);
    if (normalized < 0.3) return 'text-red-600';
    if (normalized < 0.7) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getHealthStatus = (value: number, min: number, max: number) => {
    const normalized = (value - min) / (max - min);
    if (normalized < 0.3) return 'LOW';
    if (normalized < 0.7) return 'MID';
    return 'OPT';
  };

  const getHealthIcon = (value: number, min: number, max: number) => {
    const normalized = (value - min) / (max - min);
    if (normalized < 0.3) return '⚠️';
    if (normalized < 0.7) return '⚡';
    return '✅';
  };

  const currentObservationInfo = getObservationInfo(currentDate);

  return (
    <div className="h-full flex gap-6 max-w-full overflow-hidden">
            {/* 左侧：植物图片和编号信息 */}
      <div className="w-1/2 flex flex-col min-h-0">
        {/* 植物图片区域 */}
        <div className="flex-1 min-h-0 max-h-full overflow-hidden">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-2 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <h4 className="text-gray-800 font-medium flex items-center text-xs">
                <span className="text-sm mr-1">🌱</span>
                生命体视觉记录
              </h4>
              <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs">
                {currentObservationInfo.experimentId}
              </div>
            </div>
            
            {selectedData?.imageUrl && (
              <div className="relative flex-1 bg-black/20 rounded-lg overflow-hidden mb-2 min-h-0" style={{ minHeight: '200px' }}>
                {imageLoading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mb-1"></div>
                      <p className="text-white text-xs">加载中...</p>
                    </div>
                  </div>
                )}
                
                <img
                   src={selectedData.imageUrl}
                   alt="生命体视觉记录"
                   className={`w-full h-full object-contain transition-opacity duration-500 ${
                     imageLoading ? 'opacity-0' : 'opacity-100'
                   }`}
                   onLoad={() => setImageLoading(false)}
                   onError={() => setImageLoading(false)}
                 />
                
                {/* 图片信息叠加 */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                 
                 {/* 顶部植物编号 */}
                 <div className="absolute top-2 left-2">
                   <div className="bg-blue-600/90 text-white px-2 py-1 rounded font-bold text-xs backdrop-blur-sm">
                     {currentObservationInfo.experimentId}
                   </div>
                 </div>

                 {/* 底部信息 */}
                 <div className="absolute bottom-2 left-2 right-2">
                   <div className="flex items-center justify-between">
                     <div className="text-white">
                       <div className="flex items-center space-x-1 mb-1">
                         <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                         <span className="text-xs font-medium font-mono">ACTIVE</span>
                       </div>
                       <p className="text-xs opacity-80">
                         {currentObservationInfo.date}
                       </p>
                     </div>
                     <div className="text-right text-white">
                       <p className="text-xs opacity-80">高度: {selectedData.stemHeight.toFixed(1)}cm</p>
                       <p className="text-xs opacity-80">记录: {currentObservationInfo.time}</p>
                     </div>
                   </div>
                 </div>
              </div>
            )}

            {/* 观测信息详情 - 进一步压缩 */}
            <div className="bg-white border border-gray-200 rounded p-1.5 flex-shrink-0">
              <h5 className="text-gray-800 font-medium mb-1 flex items-center text-xs">
                <span className="text-xs mr-1">📋</span>
                观测记录
              </h5>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">日期</span>
                  <span className="text-gray-800 font-medium text-xs truncate ml-1">{currentObservationInfo.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">时间</span>
                  <span className="text-gray-800 font-medium text-xs ml-1">{currentObservationInfo.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">编号</span>
                  <span className="text-gray-800 font-medium text-xs ml-1">{currentObservationInfo.experimentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-xs">坐标</span>
                  <span className="text-gray-800 font-medium text-xs truncate ml-1" title={currentObservationInfo.coordinates}>
                    {currentObservationInfo.coordinates.length > 8 ? currentObservationInfo.coordinates.substring(0, 8) + '...' : currentObservationInfo.coordinates}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧：数据展示 */}
      <div className="w-1/2 flex flex-col">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-emerald-500/20 flex items-center justify-center rounded">
            <span className="text-emerald-600 font-mono text-xs">📈</span>
          </div>
          <div>
            <h3 className="text-gray-800 font-medium">实时数据面板</h3>
            <p className="text-gray-600 text-xs">Real-time Data Panel</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
          {selectedData && (
            <>
              {/* 环境数据 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                <h3 className="text-gray-800 font-medium mb-3 flex items-center">
                  <div className="w-6 h-6 bg-blue-500/20 flex items-center justify-center mr-2 rounded">
                    <span className="text-blue-600 font-mono text-xs">ENV</span>
                  </div>
                  环境参数
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: '温度', value: selectedData.temperature, unit: '°C', range: [18, 28], icon: '🌡️' },
                    { label: '湿度', value: selectedData.humidity, unit: '%', range: [40, 80], icon: '💧' },
                    { label: '光照', value: selectedData.lightIntensity, unit: 'lux', range: [500, 1500], icon: '☀️' },
                    { label: '土壤湿度', value: selectedData.soilMoisture, unit: '%', range: [30, 70], icon: '🌍' },
                    { label: 'pH值', value: selectedData.soilPh, unit: '', range: [6, 7.5], icon: '⚗️' },
                    { label: '空气质量', value: selectedData.airQuality, unit: '%', range: [70, 100], icon: '🍃' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                          <span className="text-xs">{item.icon}</span>
                          <span className="text-gray-700 text-xs font-medium truncate">{item.label}</span>
                          <span className="text-xs font-mono bg-gray-100 text-gray-700 px-1 py-0.5 rounded shrink-0">
                            {getHealthStatus(item.value, item.range[0], item.range[1])}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                          <span className={`font-bold text-sm ${getHealthColor(item.value, item.range[0], item.range[1])}`}>
                            {formatValue(item.value, item.unit)}
                          </span>
                          <span className="text-xs">
                            {getHealthIcon(item.value, item.range[0], item.range[1])}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 植物生理数据 */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                <h3 className="text-gray-800 font-medium mb-3 flex items-center">
                  <div className="w-6 h-6 bg-green-500/20 flex items-center justify-center mr-2 rounded">
                    <span className="text-green-600 font-mono text-xs">BIO</span>
                  </div>
                  生物形态数据
                </h3>
                <div className="space-y-2">
                  {[
                    { label: '叶片颜色', value: selectedData.leafColor, icon: '🍀' },
                    { label: '叶片大小', value: formatValue(selectedData.leafSize, 'cm²'), icon: '📏' },
                    { label: '茎高度', value: formatValue(selectedData.stemHeight, 'cm'), icon: '📐' },
                    { label: '根系健康', value: selectedData.rootHealth, icon: '🌿' },
                    { label: '生长速度', value: formatValue(selectedData.growthRate, 'cm/天'), icon: '⚡' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                          <span className="text-xs">{item.icon}</span>
                          <span className="text-gray-700 text-xs font-medium truncate">{item.label}</span>
                        </div>
                        <span className="text-green-600 font-bold text-sm shrink-0">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 状态指示器 */}
              <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <span className="text-gray-700 text-xs font-medium">系统状态：运行正常</span>
                      <p className="text-gray-600 text-xs">数据实时同步中</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 text-xs">更新时间</div>
                    <span className="text-gray-800 text-xs font-mono">
                      {new Date(selectedData.timestamp).toLocaleTimeString('zh-CN')}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 无数据状态 */}
          {!selectedData && !loading && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-gray-800 text-lg font-medium mb-2">等待数据加载</h3>
              <p className="text-gray-600 text-sm">通过左侧日历选择观测日期以加载对应数据</p>
            </div>
          )}

          {/* 加载状态 */}
          {loading && (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-gray-800 text-lg font-medium mb-2">数据加载中</h3>
              <p className="text-gray-600 text-sm">正在获取植物观测数据...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 