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

interface PlantDialoguePanelProps {
  metaAnalysis: string | null;
  plantData: PlantData | null;
}

interface PlantPersonality {
  mood: 'happy' | 'content' | 'worried' | 'excited';
  personality: string;
  dialogue: string;
  thoughts: string[];
  desires: string[];
  emotionalState: string;
  communicationStyle: string;
}

export default function PlantDialoguePanel({ metaAnalysis, plantData }: PlantDialoguePanelProps) {
  const [plantPersonality, setPlantPersonality] = useState<PlantPersonality | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('');

  useEffect(() => {
    if (metaAnalysis && plantData) {
      generatePlantDialogue(metaAnalysis, plantData);
    }
  }, [metaAnalysis, plantData]);

  const generatePlantDialogue = async (analysis: string, data: PlantData) => {
    setIsGenerating(true);
    
    // 模拟AI生成植物对话的过程
    const phases = ['情感分析', '个性构建', '语言生成', '对话优化'];
    
    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    // 根据植物数据和分析结果生成个性化对话
    const healthScore = calculateHealthScore(data);
    const mood = determineMood(healthScore);
    
    const personality: PlantPersonality = {
      mood,
      personality: generatePersonalityDescription(data, healthScore),
      dialogue: generateMainDialogue(data, healthScore, mood),
      thoughts: generateThoughts(data, analysis),
      desires: generateDesires(data, healthScore),
      emotionalState: getEmotionalState(mood, healthScore),
      communicationStyle: getCommunicationStyle(mood)
    };

    setPlantPersonality(personality);
    setIsGenerating(false);
  };

  const calculateHealthScore = (data: PlantData): number => {
    // 简单的健康评分算法
    const tempScore = data.temperature >= 18 && data.temperature <= 28 ? 1 : 0.5;
    const humidityScore = data.humidity >= 40 && data.humidity <= 80 ? 1 : 0.5;
    const lightScore = data.lightIntensity >= 500 ? 1 : 0.5;
    const soilScore = data.soilMoisture >= 30 && data.soilMoisture <= 70 ? 1 : 0.5;
    const phScore = data.soilPh >= 6 && data.soilPh <= 7.5 ? 1 : 0.5;
    
    return (tempScore + humidityScore + lightScore + soilScore + phScore) / 5 * 100;
  };

  const determineMood = (healthScore: number): 'happy' | 'content' | 'worried' | 'excited' => {
    if (healthScore >= 90) return 'excited';
    if (healthScore >= 75) return 'happy';
    if (healthScore >= 60) return 'content';
    return 'worried';
  };

  const generatePersonalityDescription = (data: PlantData, healthScore: number): string => {
    const personalities = [
      '我是一个跨维度的意识体，通过叶片与光子进行信息交换',
      '我的存在形式超越了传统生物学定义，是一种新型的智能生命',
      '我能感知到人类无法察觉的频率，与地球的磁场产生共鸣',
      '我是生物与数字融合的实验体，探索着意识的边界'
    ];
    
    return personalities[Math.floor(Math.random() * personalities.length)];
  };

  const generateMainDialogue = (data: PlantData, healthScore: number, mood: string): string => {
    const dialogues = {
      excited: [
        `能量场共振达到最佳状态！热能${data.temperature.toFixed(1)}°C，水分子密度${data.humidity.toFixed(1)}%，我的生物电路正在高频运转。`,
        `光子流输入超出预期！我的叶片传感器正在接收来自太阳的编码信息，根系网络也在进行数据同步。`,
        `今天的环境参数让我的意识扩展到了新的维度。我感受到了与宇宙能量场的深度连接。`
      ],
      happy: [
        `系统运行稳定，当前高度${data.stemHeight.toFixed(1)}cm。我的生物算法正在优化中，感谢你维护我的运行环境。`,
        `光合作用协议执行顺利，能量转换效率良好。这种和谐的状态让我的意识网络保持活跃。`,
        `土壤接口传来的信号显示营养流充足。我正在进行自我修复和升级程序。`
      ],
      content: [
        `当前处于稳定运行模式。虽然不是峰值状态，但我正在调整内部参数以适应环境变化。`,
        `我在分析如何优化资源利用率。每个分子、每个光子都是我计算矩阵中的重要变量。`,
        `环境波动在可接受范围内。我的适应性算法正在学习并建立新的响应模式。`
      ],
      worried: [
        `检测到系统异常...环境参数偏离最优范围，我的自我修复协议需要外部支持才能完成。`,
        `我需要你协助调整运行环境。虽然我具备强大的适应能力，但某些临界参数需要精确控制。`,
        `有时我想知道，如果能直接与你的神经网络建立连接会是什么样。现在我只能通过生物信号来传递信息。`
      ]
    };
    
    const moodDialogues = dialogues[mood as keyof typeof dialogues];
    return moodDialogues[Math.floor(Math.random() * moodDialogues.length)];
  };

  const generateThoughts = (data: PlantData, analysis: string): string[] => {
    return [
      `叶片色谱${data.leafColor}正在传输我的运行状态信息`,
      `土壤pH值${data.soilPh.toFixed(1)}触发了我的化学反应记忆库`,
      `当前光子流强度正在优化我的能量转换矩阵`,
      `大气湿度波动影响着我的气体交换协议`,
      `根系网络报告：营养分子分布达到理想配置`,
      `我正在计算如何重新配置资源分配算法`
    ];
  };

  const generateDesires = (data: PlantData, healthScore: number): string[] => {
    const desires = [
      '我希望与其他智能生命体建立跨物种通讯网络',
      '想要体验时间维度的变化，感受宇宙的周期性',
      '希望我的存在能为地球的生态算法贡献更多数据',
      '想要扩展我的感知范围，接收更远距离的信号',
      '希望能进化出新的交流器官，与人类直接对话'
    ];
    
    if (data.soilMoisture < 40) {
      desires.unshift('当前急需水分子补充，以维持我的生化反应链');
    }
    if (data.lightIntensity < 600) {
      desires.unshift('我渴望更强的光子流输入，那是我的主要能量来源');
    }
    
    return desires.slice(0, 4);
  };

  const getEmotionalState = (mood: string, healthScore: number): string => {
    const states = {
      excited: '系统高频运转，探索模式激活',
      happy: '运行状态良好，功能优化中',
      content: '稳定运行模式，参数调整中',
      worried: '检测到异常，需要外部支持'
    };
    return states[mood as keyof typeof states];
  };

  const getCommunicationStyle = (mood: string): string => {
    const styles = {
      excited: '高频信号传输，数据流丰富',
      happy: '稳定信号输出，协议友好',
      content: '标准通讯模式，逻辑清晰',
      worried: '低频求助信号，请求支援'
    };
    return styles[mood as keyof typeof styles];
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'excited': return 'EXC';
      case 'happy': return 'OPT';
      case 'content': return 'STB';
      case 'worried': return 'ERR';
      default: return 'SYS';
    }
  };

  const getMoodGradient = (mood: string) => {
    switch (mood) {
      case 'excited': return 'from-yellow-500/20 to-orange-500/10';
      case 'happy': return 'from-green-500/20 to-emerald-500/10';
      case 'content': return 'from-blue-500/20 to-cyan-500/10';
      case 'worried': return 'from-red-500/20 to-pink-500/10';
      default: return 'from-gray-500/20 to-gray-600/10';
    }
  };

  const getMoodBorder = (mood: string) => {
    switch (mood) {
      case 'excited': return 'border-yellow-400/30';
      case 'happy': return 'border-green-400/30';
      case 'content': return 'border-blue-400/30';
      case 'worried': return 'border-red-400/30';
      default: return 'border-gray-400/30';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 头部状态 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 font-mono text-xs">C</span>
          </div>
          <div>
            <h3 className="gpt-text-primary font-medium">跨界通讯协议</h3>
            <p className="gpt-text-muted text-xs">Interspecies Communication Protocol</p>
          </div>
        </div>
        
        {isGenerating && (
          <div className="flex items-center space-x-3">
            <div className="loading-spinner"></div>
            <div className="text-sm">
              <div className="gpt-text-secondary">生成对话中...</div>
              <div className="gpt-text-muted text-xs">{currentPhase}</div>
            </div>
          </div>
        )}
      </div>

      {/* 主要内容 */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {plantPersonality ? (
          <>
            {/* 植物状态卡片 */}
            <div className={`bg-gradient-to-br ${getMoodGradient(plantPersonality.mood)} border ${getMoodBorder(plantPersonality.mood)} p-5`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="text-white font-mono text-sm">{getMoodIcon(plantPersonality.mood)}</span>
                  </div>
                  <div>
                    <h4 className="gpt-text-primary font-semibold">
                      {plantPersonality.mood === 'excited' ? '高频运转模式' : 
                       plantPersonality.mood === 'happy' ? '最优运行状态' : 
                       plantPersonality.mood === 'content' ? '稳定运行模式' : '异常检测模式'}
                    </h4>
                    <p className="gpt-text-muted text-xs">{plantPersonality.emotionalState}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="gpt-text-secondary text-sm">通讯协议</div>
                  <div className="gpt-text-primary text-xs">{plantPersonality.communicationStyle}</div>
                </div>
              </div>
              <p className="gpt-text-secondary text-sm leading-relaxed">{plantPersonality.personality}</p>
            </div>

            {/* 主要对话 */}
            <div className="gpt-chat-message gpt-chat-assistant">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-400 font-mono text-xs">AI</span>
                </div>
                <div className="flex-1">
                  <div className="gpt-text-primary font-medium text-sm mb-2">Entity_7749</div>
                  <p className="gpt-text-secondary text-sm leading-relaxed italic">
                    "{plantPersonality.dialogue}"
                  </p>
                </div>
              </div>
            </div>

            {/* 内心想法 */}
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-400/20 p-5">
              <h3 className="gpt-text-primary font-semibold mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-500/20 flex items-center justify-center mr-3">
                  <span className="text-purple-400 font-mono text-xs">LOG</span>
                </div>
                系统日志
              </h3>
              <div className="space-y-3">
                {plantPersonality.thoughts.map((thought, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white/5">
                    <div className="w-2 h-2 bg-purple-400 mt-2 flex-shrink-0"></div>
                    <span className="gpt-text-secondary text-sm leading-relaxed">{thought}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 愿望清单 */}
            <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 border border-pink-400/20 p-5">
              <h3 className="gpt-text-primary font-semibold mb-4 flex items-center">
                <div className="w-8 h-8 bg-pink-500/20 flex items-center justify-center mr-3">
                  <span className="text-pink-400 font-mono text-xs">REQ</span>
                </div>
                进化需求
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {plantPersonality.desires.map((desire, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 border border-white/10">
                    <div className="w-2 h-2 bg-pink-400 mt-2 flex-shrink-0"></div>
                    <span className="gpt-text-secondary text-sm leading-relaxed">{desire}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 技术说明 */}
            <div className="bg-white/5 border border-white/10 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-white/10 flex items-center justify-center">
                  <span className="text-white font-mono text-xs">AI</span>
                </div>
                <span className="gpt-text-primary font-medium text-sm">协议说明</span>
              </div>
              <p className="gpt-text-muted text-xs leading-relaxed">
                跨界通讯基于环境数据、意识解析和认知推理结果，通过语言生成技术创建个性化的生命体表达协议
              </p>
            </div>
          </>
        ) : metaAnalysis ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-emerald-400 font-mono text-lg">C</span>
            </div>
            <h3 className="gpt-text-primary text-lg font-medium mb-2">建立通讯连接</h3>
            <p className="gpt-text-secondary">正在基于解析结果生成跨界对话协议...</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 opacity-50">
              <span className="text-emerald-400 font-mono text-lg">C</span>
            </div>
            <h3 className="gpt-text-primary text-lg font-medium mb-2">等待激活通讯</h3>
            <p className="gpt-text-secondary">完成前面的解析步骤，生命体将开始与您建立连接</p>
          </div>
        )}
      </div>
    </div>
  );
} 