import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // 模拟植物数据
    const mockData = {
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

    return NextResponse.json([mockData]);
  } catch (error) {
    console.error('获取植物数据失败:', error);
    return NextResponse.json(
      { error: '获取植物数据失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 这里应该保存到数据库
    // 现在只是返回接收到的数据
    const savedData = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...data
    };

    return NextResponse.json(savedData);
  } catch (error) {
    console.error('创建植物数据失败:', error);
    return NextResponse.json(
      { error: '创建植物数据失败' },
      { status: 500 }
    );
  }
} 