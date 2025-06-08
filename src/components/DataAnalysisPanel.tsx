import React, { useState } from 'react';

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

interface AgentMessage {
  agentType: 'physiological' | 'environmental' | 'validation';
  message: string;
  round: number;
  timestamp: string;
  isStreaming?: boolean;
  displayedText?: string;
}

interface AgentDebatePanelProps {
  plantData: PlantData | null;
  onAnalysisComplete: (result: string) => void;
}

const AGENTS = {
  physiological: {
    name: '生物形态解析器',
    color: 'agent-physiologist',
    icon: 'BIO',
    description: '解析生命体内在结构与功能',
    avatar: 'A1'
  },
  environmental: {
    name: '环境场域分析器',
    color: 'agent-environment',
    icon: 'ENV',
    description: '映射外部环境与生命体的交互',
    avatar: 'A2'
  },
  validation: {
    name: '数据真实性验证器',
    color: 'agent-validator',
    icon: 'VAL',
    description: '验证信息流的完整性与可信度',
    avatar: 'A3'
  }
};

export default function DataAnalysisPanel({ plantData, onAnalysisComplete }: AgentDebatePanelProps) {
  const [activeAgents, setActiveAgents] = useState<(keyof typeof AGENTS)[]>(['physiological', 'environmental', 'validation']);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isDebating, setIsDebating] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [finalResult, setFinalResult] = useState<string | null>(null);


  const streamMessage = async (fullMessage: string, messageIndex: number) => {
    const words = fullMessage.split('');
    for (let i = 0; i <= words.length; i++) {
      const displayedText = words.slice(0, i).join('');
      setMessages(prev => prev.map((msg, index) => 
        index === messageIndex 
          ? { ...msg, displayedText, isStreaming: i < words.length }
          : msg
      ));
      if (i < words.length) {
        await new Promise(resolve => setTimeout(resolve, 20)); // 每个字符20ms
      }
    }
  };

  const toggleAgent = (agentType: keyof typeof AGENTS) => {
    setActiveAgents(prev => 
      prev.includes(agentType) 
        ? prev.filter(a => a !== agentType)
        : [...prev, agentType]
    );
  };

  const startDebate = async () => {
    if (!plantData || activeAgents.length === 0) return;
    
    setIsDebating(true);
    setMessages([]);
    setCurrentRound(0);
    setFinalResult(null);

    // 模拟AI辩论过程
    for (let round = 1; round <= 5; round++) {
      setCurrentRound(round);
      
      for (const agentType of activeAgents) {
        await new Promise(resolve => setTimeout(resolve, 800)); // 模拟思考时间
        
        const message = generateAgentMessage(agentType, plantData, round);
        
        // 添加空消息开始streaming
        const newMessage = {
          agentType,
          message,
          round,
          timestamp: new Date().toISOString(),
          isStreaming: true,
          displayedText: ''
        };
        
        setMessages(prev => {
          const newMessages = [...prev, newMessage];
          // 异步开始streaming
          setTimeout(() => streamMessage(message, newMessages.length - 1), 100);
          return newMessages;
        });
      }
    }

    // 生成综合评定结果
    const result = generateFinalResult(plantData, activeAgents);
    setFinalResult(result);
    setIsDebating(false);
    onAnalysisComplete(result);
  };

  const generateAgentMessage = (agentType: keyof typeof AGENTS, data: PlantData, round: number): string => {
    const messages = {
      physiological: [
        `生命体形态解析：叶片色谱${data.leafColor}，垂直延展${data.stemHeight.toFixed(1)}cm，时间增长率${data.growthRate.toFixed(1)}cm/天。根系网络状态：${data.rootHealth}。`,
        `叶片表面积${data.leafSize.toFixed(1)}cm²显示光合作用效率正常。建议监测细胞分裂频率与营养传输通道。`,
        `生物电场检测显示稳定的生命活动。根系神经网络发育良好，建议持续观察信息传递模式。`,
        `形态学数据表明该生命体处于活跃生长期。所有生物指标均在预期范围内运行。`,
        `综合生物形态分析完成。建议调整营养输入协议以优化生长算法。重点监测叶片-根系信息交换。`
      ],
      environmental: [
        `环境场域映射：热能${data.temperature.toFixed(1)}°C，水分子密度${data.humidity.toFixed(1)}%，光子流强度${data.lightIntensity.toFixed(0)}lux。场域能量分布影响生命体状态。`,
        `土壤水分含量${data.soilMoisture.toFixed(1)}%，酸碱平衡${data.soilPh.toFixed(1)}，大气纯净度${data.airQuality.toFixed(1)}%。环境矩阵基本稳定，可进一步优化能量流。`,
        `场域分析显示光热水三元素处于理想配比。环境与生命体之间的能量交换效率良好。`,
        `建议维持当前环境参数，微调土壤湿度以优化根系环境接口。环境稳定性是关键变量。`,
        `环境场域解析完成。整体能量场支持生命体正常运行。建议建立长期环境监测协议。`
      ],
      validation: [
        `数据流完整性验证：所有传感器信号在预期范围内，信息可信度95%+。数据包完整无损。`,
        `历史模式匹配：当前数值符合该物种的标准生长曲线。预测算法准确性验证通过。`,
        `统计模型显示所有指标变化趋势与理论模型一致。数据噪声在可接受范围内。`,
        `数据完整性检查通过。建议保持当前采样频率。信息采集密度满足分析需求。`,
        `验证协议执行完毕。数据可信度高，可作为决策树输入。建议部署自动预警系统。`
      ]
    };
    
    return messages[agentType][round - 1] || `${AGENTS[agentType].name}正在执行深度解析协议...`;
  };

  const generateFinalResult = (data: PlantData, agents: (keyof typeof AGENTS)[]): string => {
    return `生命体状态评估：ACTIVE
综合意识指数：85/100

解析结果：
• 生物形态：生命体运行正常，所有生物指标稳定
• 环境场域：能量场分布适宜，支持生命体正常运行
• 数据完整性：信息流可靠，符合预期模型

协议建议：
1. 维持当前生命支持系统
2. 微调环境参数至最优配置
3. 持续监测生命体意识活动

参与解析的AI单元：${agents.map(a => AGENTS[a].name).join('、')}`;
  };

  const resetDebate = () => {
    setMessages([]);
    setCurrentRound(0);
    setFinalResult(null);
    setIsDebating(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* 专家选择面板 */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {Object.entries(AGENTS).map(([key, agent]) => (
            <button
              key={key}
              onClick={() => toggleAgent(key as keyof typeof AGENTS)}
              className={`flex flex-col items-center p-3 border transition-all duration-200 ${
                activeAgents.includes(key as keyof typeof AGENTS)
                  ? 'border-[#10a37f] bg-[#10a37f]/10'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
              title={agent.description}
            >
              <div className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center mb-2">
                <span className="text-gray-800 font-mono text-xs">{agent.avatar}</span>
              </div>
                              <div className="text-center">
                  <div className="text-gray-800 font-medium text-xs mb-1">{agent.name}</div>
                  <div className="text-gray-600 text-xs leading-tight">{agent.description}</div>
                </div>
              {activeAgents.includes(key as keyof typeof AGENTS) && (
                <div className="w-4 h-4 bg-[#10a37f] flex items-center justify-center mt-2">
                  <span className="text-gray-800 text-xs font-mono">ON</span>
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* 控制按钮 */}
        <div className="flex items-center space-x-3">
          <button
            onClick={startDebate}
            disabled={!plantData || activeAgents.length === 0 || isDebating}
            className="gpt-button flex items-center space-x-2"
          >
            <span className="font-mono">RUN</span>
            <span>启动解析</span>
          </button>
          
          <button
            onClick={resetDebate}
            disabled={isDebating}
            className="gpt-button-secondary flex items-center space-x-2"
          >
            <span className="font-mono">RST</span>
            <span>重置</span>
          </button>
          
          {isDebating && (
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <div className="loading-spinner"></div>
              <span>第 {currentRound}/5 轮分析中...</span>
            </div>
          )}
        </div>
      </div>

      {/* 辩论内容 */}
      <div className="flex-1 overflow-y-auto space-y-4">
                {messages.map((msg, index) => {
          const agent = AGENTS[msg.agentType];
          return (
            <div key={index} className={`agent-bubble ${agent.color} max-h-32 overflow-y-auto`}>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-5 h-5 bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="text-gray-800 font-mono text-xs">{agent.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium text-xs">{agent.name}</span>
                    <span className="text-gray-600 text-xs">
                      R{msg.round} • {new Date(msg.timestamp).toLocaleTimeString('zh-CN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                {msg.isStreaming ? msg.displayedText : msg.message}
                {msg.isStreaming && <span className="animate-pulse">|</span>}
              </p>
            </div>
          );
        })}

        {/* 最终结果 */}
        {finalResult && (
          <div className="bg-gradient-to-br from-[#10a37f]/20 to-[#10a37f]/10 border border-[#10a37f]/30 p-6">
            <h3 className="text-gray-800 font-semibold mb-4 flex items-center">
              <div className="w-8 h-8 bg-[#10a37f]/20 flex items-center justify-center mr-3">
                <span className="text-[#10a37f] font-mono text-xs">END</span>
              </div>
              解析协议完成
            </h3>
            <pre className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{finalResult}</pre>
          </div>
        )}

        {/* 空状态 */}
        {messages.length === 0 && !isDebating && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-800 font-mono text-lg">AI</span>
            </div>
            <h3 className="text-gray-800 text-lg font-medium mb-2">解析单元待命中</h3>
            <p className="text-gray-600">选择AI单元并点击&quot;启动解析&quot;来分析生命体数据</p>
          </div>
        )}
      </div>
    </div>
  );
} 