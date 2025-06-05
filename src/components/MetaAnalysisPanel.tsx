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

interface MetaAnalysisPanelProps {
  analysisResult: string | null;
  plantData: PlantData | null;
}

interface MetaStructure {
  premise: string[];
  reasoning: string[];
  conclusion: string;
  confidence: number;
  methodology: string;
  keyInsights: string[];
}

export default function MetaAnalysisPanel({ analysisResult, plantData }: MetaAnalysisPanelProps) {
  const [metaStructure, setMetaStructure] = useState<MetaStructure | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (analysisResult && plantData) {
      performMetaAnalysis(analysisResult, plantData);
    }
  }, [analysisResult, plantData]);

  const performMetaAnalysis = async (result: string, data: PlantData) => {
    setIsAnalyzing(true);
    setCurrentStep(0);
    
    // 模拟分析步骤
    const steps = ['数据预处理', '模式识别', '逻辑推理', '结构化分析', '置信度评估'];
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    const structure: MetaStructure = {
      premise: [
        `环境场域：热能${data.temperature.toFixed(1)}°C，水分子密度${data.humidity.toFixed(1)}%，光子流${data.lightIntensity.toFixed(0)}lux`,
        `土壤矩阵：水分含量${data.soilMoisture.toFixed(1)}%，酸碱平衡${data.soilPh.toFixed(1)}，质量指数稳定`,
        `生命形态：叶片色谱${data.leafColor}，垂直延展${data.stemHeight.toFixed(1)}cm，根系网络${data.rootHealth}`,
        `时间维度：增长速率${data.growthRate.toFixed(1)}cm/天，发育阶段活跃`
      ],
      reasoning: [
        `信息融合：多维传感器数据流经过标准化处理，建立可信分析基础`,
        `模式识别：当前数据模式与生命体标准模板匹配度达到92%`,
        `因果映射：环境变量与生物响应呈现正相关，符合生命系统原理`,
        `趋势预测：基于时间序列分析，预测未来7天内保持稳定增长`,
        `风险评估：识别潜在威胁因子，当前风险等级为低风险`
      ],
      conclusion: `基于多维度数据分析和认知模型融合，生命体当前处于最优运行状态`,
      confidence: 87,
      methodology: '贝叶斯推理 + 模糊逻辑 + 认知系统',
      keyInsights: [
        '环境参数处于最适配置',
        '生物指标显示活跃状态',
        '增长趋势符合预期模型',
        '无明显威胁信号检测'
      ]
    };

    setMetaStructure(structure);
    setIsAnalyzing(false);
  };

  const renderReasoningTree = () => {
    if (!metaStructure) return null;

    return (
      <div className="space-y-6">
        {/* 前提条件 */}
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-400/20 p-5">
          <h3 className="gpt-text-primary font-semibold mb-4 flex items-center">
            <div className="w-8 h-8 bg-blue-500/20 flex items-center justify-center mr-3">
              <span className="text-blue-400 font-mono text-xs">P</span>
            </div>
            数据前提
          </h3>
          <div className="space-y-3">
            {metaStructure.premise.map((premise, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 mt-2 flex-shrink-0"></div>
                <span className="gpt-text-secondary text-sm leading-relaxed">{premise}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 推理过程 */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-400/20 p-5">
          <h3 className="gpt-text-primary font-semibold mb-4 flex items-center">
            <div className="w-8 h-8 bg-green-500/20 flex items-center justify-center mr-3">
              <span className="text-green-400 font-mono text-xs">R</span>
            </div>
            推理链路
          </h3>
          <div className="space-y-4">
            {metaStructure.reasoning.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                  {index < metaStructure.reasoning.length - 1 && (
                    <div className="w-0.5 h-8 bg-gradient-to-b from-green-400 to-green-300 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <span className="gpt-text-secondary text-sm leading-relaxed">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 关键洞察 */}
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-400/20 p-5">
          <h3 className="gpt-text-primary font-semibold mb-4 flex items-center">
            <div className="w-8 h-8 bg-purple-500/20 flex items-center justify-center mr-3">
              <span className="text-purple-400 font-mono text-xs">I</span>
            </div>
            关键洞察
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {metaStructure.keyInsights.map((insight, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10">
                <div className="w-2 h-2 bg-purple-400"></div>
                <span className="gpt-text-secondary text-sm">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 结论与置信度 */}
        <div className="bg-gradient-to-br from-[#10a37f]/20 to-[#10a37f]/10 border border-[#10a37f]/30 p-5">
          <h3 className="gpt-text-primary font-semibold mb-4 flex items-center">
            <div className="w-8 h-8 bg-[#10a37f]/20 flex items-center justify-center mr-3">
              <span className="text-[#10a37f] font-mono text-xs">C</span>
            </div>
            分析结论
          </h3>
          <p className="gpt-text-secondary text-sm leading-relaxed mb-4">{metaStructure.conclusion}</p>
          
          {/* 置信度可视化 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="gpt-text-secondary text-sm">分析置信度</span>
              <span className="gpt-text-primary font-semibold">{metaStructure.confidence}%</span>
            </div>
            <div className="relative">
              <div className="w-full bg-white/10 h-3">
                <div 
                  className="bg-gradient-to-r from-[#10a37f] to-[#0d8f6f] h-3 transition-all duration-2000 shadow-lg"
                  style={{ width: `${metaStructure.confidence}%` }}
                ></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-white drop-shadow-lg">
                  高置信度
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* 头部状态 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500/20 flex items-center justify-center">
            <span className="text-purple-400 font-mono text-xs">M</span>
          </div>
          <div>
            <h3 className="gpt-text-primary font-medium">推理结构分析</h3>
            <p className="gpt-text-muted text-xs">Meta-cognitive Analysis</p>
          </div>
        </div>
        
        {isAnalyzing && (
          <div className="flex items-center space-x-3">
            <div className="loading-spinner"></div>
            <div className="text-sm">
              <div className="gpt-text-secondary">分析进行中...</div>
              <div className="gpt-text-muted text-xs">步骤 {currentStep}/5</div>
            </div>
          </div>
        )}
      </div>

      {/* 主要内容 */}
      <div className="flex-1 overflow-y-auto">
        {metaStructure ? (
          renderReasoningTree()
        ) : analysisResult ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-400 font-mono text-lg">M</span>
            </div>
            <h3 className="gpt-text-primary text-lg font-medium mb-2">启动元认知分析</h3>
            <p className="gpt-text-secondary">正在构建推理结构...</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-purple-500/20 flex items-center justify-center mx-auto mb-4 opacity-50">
              <span className="text-purple-400 font-mono text-lg">M</span>
            </div>
            <h3 className="gpt-text-primary text-lg font-medium mb-2">等待分析输入</h3>
            <p className="gpt-text-secondary">请先完成AI专家会诊以获取分析数据</p>
          </div>
        )}
      </div>

      {/* 方法论说明 */}
      {metaStructure && (
        <div className="mt-6 bg-white/5 border border-white/10 p-4">
          <h4 className="gpt-text-primary font-medium mb-3 flex items-center">
            <div className="w-6 h-6 bg-white/10 flex items-center justify-center mr-2">
              <span className="text-white font-mono text-xs">S</span>
            </div>
            分析方法论
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="gpt-text-secondary text-sm">推理引擎:</span>
              <span className="gpt-text-primary text-sm font-medium">{metaStructure.methodology}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
              <div className="gpt-text-muted">• 逻辑结构：前提 → 推理 → 结论</div>
              <div className="gpt-text-muted">• 推理方式：归纳 + 演绎推理</div>
              <div className="gpt-text-muted">• 证据权重：数据驱动决策</div>
              <div className="gpt-text-muted">• 不确定性：概率化表示</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 