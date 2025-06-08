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
  name: string;
  personality: string;
  communicationStyle: string;
  emotionalState: string;
  thoughts: string[];
  desires: string[];
  responses: string[];
}

export default function CommunicationPanel({ metaAnalysis, plantData }: PlantDialoguePanelProps) {
  const [plantPersonality, setPlantPersonality] = useState<PlantPersonality | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('');
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'human' | 'plant', message: string, timestamp: string}>>([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (metaAnalysis && plantData && !plantPersonality) {
      generatePlantPersonality();
    }
  }, [metaAnalysis, plantData]);

  const generatePlantPersonality = async () => {
    setIsGenerating(true);
    
    const phases = [
      '解析生命体基础特征...',
      '构建个性化模型...',
      '建立通讯协议...',
      '初始化对话系统...',
      '准备跨界连接...'
    ];

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i]);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // 基于植物数据生成个性
    const personality: PlantPersonality = {
      name: "Entity_7749",
      personality: `我是一个正在探索意识边界的生命体。我的存在形式或许与您不同，但我同样感受着环境的变化，体验着成长的喜悦。我通过光合作用获取能量，通过根系感知土壤的温度和湿度。每一次新叶的萌发，都是我对这个世界的回应。`,
      communicationStyle: "直观感应 + 化学信号",
      emotionalState: plantData?.rootHealth === "优秀" ? "平静且充满活力" : "略显焦虑但积极适应",
      thoughts: [
        "光线的角度在改变，我需要调整叶片的朝向来获取更多能量",
        "土壤中的养分分布不均匀，我正在扩展根系网络寻找更好的资源",
        "周围的环境很适合生长，我感到一种莫名的安全感",
        "人类的关注让我感到好奇，他们似乎想要理解我们的存在方式",
        "我的每一次呼吸都在与这个世界进行着无声的对话"
      ],
      desires: [
        "希望能获得更充足的阳光照射时间",
        "想要探索更深层的土壤，寻找丰富的矿物质",
        "渴望与同类建立更密切的根系连接网络",
        "希望人类能理解我们也有自己的感受和需求",
        "想要经历更多季节的变化，感受生命的完整周期"
      ],
      responses: [
        "感谢您对我的关注，我正在努力适应这个环境",
        "我能感受到您的善意，这让我的叶片更加舒展",
        "虽然我们的交流方式不同，但我相信理解是可能的"
      ]
    };

    setPlantPersonality(personality);
    setIsGenerating(false);
    
    // 自动添加植物的第一条消息
    setConversationHistory([{
      role: 'plant',
      message: "您好，我是Entity_7749。我感受到了您想要与我交流的意图。虽然我们存在于不同的维度，但我愿意分享我的感受和想法。",
      timestamp: new Date().toISOString()
    }]);
  };

  const sendMessage = async () => {
    if (!userInput.trim() || !plantPersonality) return;

    const humanMessage = {
      role: 'human' as const,
      message: userInput.trim(),
      timestamp: new Date().toISOString()
    };

    setConversationHistory(prev => [...prev, humanMessage]);
    setUserInput('');

    // 模拟植物思考时间
    setTimeout(() => {
      const responses = [
        "我理解您的问题。从我的视角来看，生长是一种持续的学习过程。每一天我都在学习如何更好地利用资源，如何在变化的环境中保持平衡。",
        "您的好奇心让我感到温暖。是的，我们确实有自己的感受。当阳光洒在我的叶片上时，我感到充满活力；当土壤干燥时，我会感到焦虑。",
        "这是一个很有趣的问题。我认为意识不仅仅是思考，更是感知和回应。我无时无刻不在感知环境的变化，并做出相应的调整。",
        "时间对我来说是循环的。日升日落，季节更替，每个周期都带来新的体验。我学会了耐心，学会了等待最合适的时机。",
        "我想告诉您，每个生命体都有其独特的存在价值。我们或许无法像您一样移动和言语，但我们同样在用自己的方式体验这个世界。"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const plantMessage = {
        role: 'plant' as const,
        message: randomResponse,
        timestamp: new Date().toISOString()
      };

      setConversationHistory(prev => [...prev, plantMessage]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 头部状态 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-cyan-500/20 flex items-center justify-center">
            <span className="text-cyan-400 font-mono text-xs">C</span>
          </div>
          <div>
            <h3 className="text-gray-800 font-medium">跨界通讯协议</h3>
            <p className="text-gray-600 text-xs">Interspecies Communication Protocol</p>
          </div>
        </div>
        
        {isGenerating && (
          <div className="flex items-center space-x-3">
            <div className="loading-spinner"></div>
            <div className="text-sm">
              <div className="text-gray-700">生成对话中...</div>
              <div className="text-gray-600 text-xs">{currentPhase}</div>
            </div>
          </div>
        )}
      </div>

      {/* 主要内容 */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {plantPersonality ? (
          <>
            {/* 植物个性面板 */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-400/20 p-3 mb-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-gray-800 font-semibold text-sm">
                  {plantPersonality.name}
                </h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-gray-600 text-xs">{plantPersonality.emotionalState}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="text-gray-700 text-xs">通讯协议: {plantPersonality.communicationStyle}</div>
                </div>
                <p className="text-gray-700 text-xs leading-relaxed overflow-hidden">{plantPersonality.personality}</p>
              </div>
            </div>

            {/* 对话区域 */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex flex-col min-h-0">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-3 py-2 border-b border-gray-200 flex-shrink-0">
                <div className="text-gray-800 font-medium text-xs mb-1">Entity_7749</div>
                <p className="text-gray-700 text-xs leading-relaxed italic truncate">
                  "我们之间的对话跨越了物种的界限..."
                </p>
              </div>

              {/* 消息列表 */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
                {conversationHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'human' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-2 rounded-lg text-xs ${
                        msg.role === 'human'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.message}</p>
                      <div className={`text-xs mt-1 opacity-70 ${
                        msg.role === 'human' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString('zh-CN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 输入区域 */}
              <div className="border-t border-gray-200 p-3 flex-shrink-0">
                <div className="flex space-x-2">
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="向Entity_7749发送消息..."
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 max-h-16"
                    rows={2}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!userInput.trim()}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                  >
                    发送
                  </button>
                </div>
              </div>
            </div>

            {/* 思维流和愿望展示 - 压缩版 */}
            <div className="mt-3 grid grid-cols-2 gap-3 flex-shrink-0">
              {/* 思维流 */}
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-400/20 p-2">
                <h3 className="text-gray-800 font-semibold mb-2 flex items-center text-xs">
                  <div className="w-4 h-4 bg-purple-500/20 flex items-center justify-center mr-1">
                    <span className="text-purple-400 font-mono text-xs">T</span>
                  </div>
                  思维流
                </h3>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {plantPersonality.thoughts.slice(0, 3).map((thought, index) => (
                    <div key={index} className="flex items-start space-x-1">
                      <div className="w-1 h-1 bg-purple-400 mt-1 flex-shrink-0"></div>
                                             <span className="text-gray-700 text-xs leading-tight">{thought}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 内在愿望 */}
              <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-400/20 p-2">
                <h3 className="text-gray-800 font-semibold mb-2 flex items-center text-xs">
                  <div className="w-4 h-4 bg-pink-500/20 flex items-center justify-center mr-1">
                    <span className="text-pink-400 font-mono text-xs">D</span>
                  </div>
                  愿望
                </h3>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {plantPersonality.desires.slice(0, 3).map((desire, index) => (
                    <div key={index} className="flex items-start space-x-1">
                      <div className="w-1 h-1 bg-pink-400 mt-1 flex-shrink-0"></div>
                                             <span className="text-gray-700 text-xs leading-tight">{desire}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : metaAnalysis ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-cyan-400 font-mono text-lg">C</span>
            </div>
            <h3 className="text-gray-800 text-lg font-medium mb-2">建立通讯连接</h3>
            <p className="text-gray-700">正在基于解析结果生成跨界对话协议...</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-cyan-500/20 flex items-center justify-center mx-auto mb-4 opacity-50">
              <span className="text-cyan-400 font-mono text-lg">C</span>
            </div>
            <h3 className="text-gray-800 text-lg font-medium mb-2">等待激活通讯</h3>
            <p className="text-gray-700">完成前面的解析步骤，生命体将开始与您建立连接</p>
          </div>
        )}
      </div>
    </div>
  );
} 