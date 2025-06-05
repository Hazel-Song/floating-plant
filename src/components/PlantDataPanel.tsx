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
}

export default function PlantDataPanel({ onDataSelect, selectedData }: PlantDataPanelProps) {
  const [plantDataList, setPlantDataList] = useState<PlantData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  // 模拟数据加载
  useEffect(() => {
    loadPlantData();
  }, [selectedDate]);

  const loadPlantData = async () => {
    setLoading(true);
    try {
      // 模拟数据
      const mockData: PlantData = {
        id: 1,
        timestamp: new Date().toISOString(),
        temperature: 22.5 + Math.random() * 5,
        humidity: 60 + Math.random() * 20,
        lightIntensity: 800 + Math.random() * 400,
        soilMoisture: 45 + Math.random() * 30,
        soilPh: 6.5 + Math.random() * 1,
        airQuality: 85 + Math.random() * 15,
        leafColor: '深绿色',
        leafSize: 8.5 + Math.random() * 2,
        stemHeight: 25 + Math.random() * 10,
        rootHealth: '良好',
        growthRate: 0.8 + Math.random() * 0.4,
        imageUrl: '/plant1.png'
      };
      
      setPlantDataList([mockData]);
      if (!selectedData) {
        onDataSelect(mockData);
      }
    } catch (error) {
      console.error('加载植物数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value: number, unit: string) => {
    return `${value.toFixed(1)}${unit}`;
  };

  const getHealthColor = (value: number, min: number, max: number) => {
    const normalized = (value - min) / (max - min);
    if (normalized < 0.3) return 'text-red-400';
    if (normalized < 0.7) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getHealthStatus = (value: number, min: number, max: number) => {
    const normalized = (value - min) / (max - min);
    if (normalized < 0.3) return 'LOW';
    if (normalized < 0.7) return 'MID';
    return 'OPT';
  };

  return (
    <div className="h-full flex flex-col">
      {/* 控制面板 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-blue-500/20 flex items-center justify-center">
            <span className="text-blue-400 font-mono text-xs">T</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="gpt-input text-sm"
          />
        </div>
        <button
          onClick={loadPlantData}
          disabled={loading}
          className="gpt-button-secondary text-sm"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="loading-spinner"></div>
              <span>加载中</span>
            </div>
          ) : (
            '刷新数据'
          )}
        </button>
      </div>

      {/* 植物图片 */}
      {selectedData?.imageUrl && (
        <div className="mb-6">
          <div className="relative border border-white/10 bg-black/20">
            <img
              src={selectedData.imageUrl}
              alt="生命体视觉记录"
              className="w-full h-auto object-contain max-h-48"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 text-white text-sm font-medium font-mono">
              SIGNAL_ACTIVE
            </div>
          </div>
        </div>
      )}

      {/* 数据展示 */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {selectedData && (
          <>
            {/* 环境数据 */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-400/20 p-4">
              <h3 className="gpt-text-primary font-medium mb-4 flex items-center">
                <div className="w-6 h-6 bg-blue-500/20 flex items-center justify-center mr-2">
                  <span className="text-blue-400 font-mono text-xs">ENV</span>
                </div>
                环境参数矩阵
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: '温度', value: selectedData.temperature, unit: '°C', range: [18, 28] },
                  { label: '湿度', value: selectedData.humidity, unit: '%', range: [40, 80] },
                  { label: '光照强度', value: selectedData.lightIntensity, unit: 'lux', range: [500, 1500] },
                  { label: '土壤湿度', value: selectedData.soilMoisture, unit: '%', range: [30, 70] },
                  { label: '土壤pH', value: selectedData.soilPh, unit: '', range: [6, 7.5] },
                  { label: '空气质量', value: selectedData.airQuality, unit: '%', range: [70, 100] }
                ].map((item, index) => (
                  <div key={index} className="data-item">
                    <div className="flex items-center space-x-2">
                      <span className="gpt-text-secondary text-sm font-mono">{item.label}:</span>
                      <span className="text-xs font-mono">
                        {getHealthStatus(item.value, item.range[0], item.range[1])}
                      </span>
                    </div>
                    <span className={`font-medium ${getHealthColor(item.value, item.range[0], item.range[1])}`}>
                      {formatValue(item.value, item.unit)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 植物生理数据 */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-400/20 p-4">
              <h3 className="gpt-text-primary font-medium mb-4 flex items-center">
                <div className="w-6 h-6 bg-green-500/20 flex items-center justify-center mr-2">
                  <span className="text-green-400 font-mono text-xs">BIO</span>
                </div>
                生物形态数据
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="data-item">
                  <span className="gpt-text-secondary text-sm">叶片颜色:</span>
                  <span className="gpt-text-primary font-medium">{selectedData.leafColor}</span>
                </div>
                <div className="data-item">
                  <span className="gpt-text-secondary text-sm">叶片大小:</span>
                  <span className="text-green-400 font-medium">{formatValue(selectedData.leafSize, 'cm')}</span>
                </div>
                <div className="data-item">
                  <span className="gpt-text-secondary text-sm">茎高度:</span>
                  <span className="text-green-400 font-medium">{formatValue(selectedData.stemHeight, 'cm')}</span>
                </div>
                <div className="data-item">
                  <span className="gpt-text-secondary text-sm">根系健康:</span>
                  <span className="text-green-400 font-medium">{selectedData.rootHealth}</span>
                </div>
                <div className="data-item">
                  <span className="gpt-text-secondary text-sm">生长速度:</span>
                  <span className="text-green-400 font-medium">{formatValue(selectedData.growthRate, 'cm/天')}</span>
                </div>
              </div>
            </div>

            {/* 状态指示器 */}
            <div className="bg-white/5 border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 animate-pulse-slow"></div>
                  <span className="gpt-text-secondary text-sm">数据实时更新</span>
                </div>
                <span className="gpt-text-muted text-xs">
                  {new Date(selectedData.timestamp).toLocaleString('zh-CN')}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 