import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const MatrixRain = () => {
  const [drops, setDrops] = useState<Array<{id: number, x: number, delay: number}>>([]);
  
  useEffect(() => {
    const newDrops = Array.from({length: 20}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
      {drops.map(drop => (
        <div 
          key={drop.id}
          className="absolute top-0 text-primary text-xs animate-matrix"
          style={{
            left: `${drop.x}%`,
            animationDelay: `${drop.delay}s`
          }}
        >
          {Array.from({length: 15}, (_, i) => (
            <div key={i} className="opacity-75" style={{animationDelay: `${i * 0.1}s`}}>
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const TerminalLog = ({ logs }: { logs: string[] }) => (
  <div className="bg-black/50 border border-primary/30 rounded-lg p-4 h-64 overflow-y-auto">
    <div className="space-y-1 text-xs font-mono">
      {logs.map((log, i) => (
        <div key={i} className="text-primary animate-flicker" style={{animationDelay: `${i * 0.1}s`}}>
          {log}
        </div>
      ))}
    </div>
  </div>
);

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const bootLogs = [
      "BIOS v2.1.4 - Initializing...",
      "CPU: Intel Core i9-9900K @ 3.60GHz",
      "Memory: 32GB DDR4",
      "Checking system integrity...",
      "Loading kernel modules...",
      "Network interface detected",
      "Connecting to secure server...",
      "Establishing encrypted tunnel...",
      "Authentication successful",
      "Loading hack tools...",
      "System ready for operations"
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        setProgress((currentLog + 1) / bootLogs.length * 100);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary glitch-text" data-text="PRANKHACKS">
            PRANKHACKS
          </h1>
          <p className="text-destructive mt-2">Initializing System...</p>
        </div>
        
        <TerminalLog logs={logs} />
        
        <div className="mt-6">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-primary mt-2">{Math.round(progress)}% Complete</p>
        </div>
      </div>
    </div>
  );
};

const PrankTool = ({ 
  title, 
  description, 
  icon, 
  onActivate, 
  isActive 
}: { 
  title: string;
  description: string;
  icon: string;
  onActivate: () => void;
  isActive: boolean;
}) => (
  <Card className="bg-card/50 border-primary/30 backdrop-blur-sm hover:border-primary/60 transition-all">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-primary">
        <Icon name={icon} size={20} />
        {title}
      </CardTitle>
      <CardDescription className="text-muted-foreground">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button 
        onClick={onActivate}
        disabled={isActive}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
      >
        {isActive ? 'Running...' : 'Activate'}
      </Button>
    </CardContent>
  </Card>
);

const WifiHackTool = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  const [networks] = useState([
    'WiFi_Home_5G', 'NETGEAR_2.4G', 'TP-Link_AC1750', 'Linksys_Smart_WiFi'
  ]);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [progress, setProgress] = useState(0);
  const [isHacking, setIsHacking] = useState(false);

  const startHack = () => {
    if (!selectedNetwork) return;
    setIsHacking(true);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            alert(`Password for ${selectedNetwork}: Th1s1sF4k3P4$$w0rd123!`);
            setIsHacking(false);
            setProgress(0);
            onComplete();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-primary">WiFi Network Scanner</h3>
      <div className="space-y-2">
        {networks.map(network => (
          <div key={network} className="flex items-center gap-2">
            <input 
              type="radio" 
              name="network" 
              value={network}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="text-primary"
            />
            <span className="text-primary font-mono">{network}</span>
            <Icon name="Wifi" size={16} className="text-primary" />
          </div>
        ))}
      </div>
      
      {selectedNetwork && (
        <div className="space-y-4">
          <Button 
            onClick={startHack} 
            disabled={isHacking}
            className="bg-destructive text-destructive-foreground"
          >
            {isHacking ? 'Hacking...' : 'Start Hack'}
          </Button>
          
          {isHacking && (
            <div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-primary mt-1">Bruteforce attack: {Math.round(progress)}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DDOSAttackTool = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  const [target, setTarget] = useState('');
  const [isAttacking, setIsAttacking] = useState(false);
  const [packets, setPackets] = useState(0);

  const startAttack = () => {
    if (!target) return;
    setIsAttacking(true);
    
    const interval = setInterval(() => {
      setPackets(prev => prev + Math.floor(Math.random() * 1000));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      alert(`DDOS Attack Complete! Sent ${packets} packets to ${target}`);
      setIsAttacking(false);
      setPackets(0);
      onComplete();
    }, 5000);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-primary">DDOS Attack Tool</h3>
      <Input 
        placeholder="Enter target IP or domain"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="bg-input border-primary/30"
      />
      
      <Button 
        onClick={startAttack}
        disabled={isAttacking || !target}
        className="bg-destructive text-destructive-foreground"
      >
        {isAttacking ? 'Attacking...' : 'Launch Attack'}
      </Button>
      
      {isAttacking && (
        <div className="bg-black/50 border border-primary/30 rounded p-4">
          <div className="text-primary font-mono text-sm">
            <div>Target: {target}</div>
            <div>Packets sent: {packets.toLocaleString()}</div>
            <div>Status: <span className="text-destructive animate-flicker">ATTACKING</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

const ErrorGeneratorTool = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  const [errorType, setErrorType] = useState('');
  
  const errors = [
    { name: 'Blue Screen of Death', value: 'bsod' },
    { name: 'System Virus Warning', value: 'virus' },
    { name: 'Windows Update', value: 'update' },
    { name: 'Critical Error', value: 'critical' }
  ];

  const generateError = () => {
    if (!errorType) return;
    
    let message = '';
    switch(errorType) {
      case 'bsod':
        message = 'Your PC ran into a problem and needs to restart. Error: CRITICAL_PROCESS_DIED';
        break;
      case 'virus':
        message = 'WARNING! Virus detected on your system! Click OK to remove immediately.';
        break;
      case 'update':
        message = 'Windows is updating... Do not turn off your computer. 67% complete.';
        break;
      case 'critical':
        message = 'CRITICAL ERROR: System files corrupted. Contact administrator immediately.';
        break;
    }
    
    alert(message);
    onComplete();
  };

  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-primary">Error Generator</h3>
      <div className="space-y-2">
        {errors.map(error => (
          <div key={error.value} className="flex items-center gap-2">
            <input 
              type="radio" 
              name="errorType" 
              value={error.value}
              onChange={(e) => setErrorType(e.target.value)}
            />
            <span className="text-primary">{error.name}</span>
          </div>
        ))}
      </div>
      
      <Button 
        onClick={generateError}
        disabled={!errorType}
        className="bg-destructive text-destructive-foreground"
      >
        Generate Error
      </Button>
    </div>
  );
};

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'wifi',
      title: 'WiFi Hacker',
      description: 'Crack WiFi passwords with advanced algorithms',
      icon: 'Wifi'
    },
    {
      id: 'ddos',
      title: 'DDOS Attack',
      description: 'Launch distributed denial of service attacks',
      icon: 'Zap'
    },
    {
      id: 'camera',
      title: 'Camera Hack',
      description: 'Access remote security cameras',
      icon: 'Camera'
    },
    {
      id: 'errors',
      title: 'Error Generator',
      description: 'Generate realistic system error messages',
      icon: 'AlertTriangle'
    }
  ];

  const handleToolActivate = (toolId: string) => {
    setActiveTool(toolId);
  };

  const handleToolComplete = () => {
    setActiveTool(null);
  };

  if (!isLoaded) {
    return <LoadingScreen onComplete={() => setIsLoaded(true)} />;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <MatrixRain />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-primary glitch-text animate-flicker mb-4" data-text="PRANKHACKS">
            PRANKHACKS
          </h1>
          <p className="text-xl text-destructive hacker-text">
            Пранкуй как хакер, без вреда для системы!
          </p>
          <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="Shield" size={16} />
              100% Safe
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Zap" size={16} />
              Realistic Effects
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Users" size={16} />
              Perfect for Pranks
            </span>
          </div>
        </header>

        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tools">Hacking Tools</TabsTrigger>
            <TabsTrigger value="active">Active Session</TabsTrigger>
            <TabsTrigger value="about">Instructions</TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-6">
            {!activeTool && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map(tool => (
                  <PrankTool
                    key={tool.id}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    onActivate={() => handleToolActivate(tool.id)}
                    isActive={activeTool === tool.id}
                  />
                ))}
              </div>
            )}

            {activeTool === 'wifi' && (
              <WifiHackTool isActive={true} onComplete={handleToolComplete} />
            )}

            {activeTool === 'ddos' && (
              <DDOSAttackTool isActive={true} onComplete={handleToolComplete} />
            )}

            {activeTool === 'errors' && (
              <ErrorGeneratorTool isActive={true} onComplete={handleToolComplete} />
            )}

            {activeTool === 'camera' && (
              <Card className="bg-card/50 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-primary">Camera Access Tool</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-destructive mb-4">This feature is coming soon...</p>
                  <Button onClick={handleToolComplete}>Back to Tools</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <Card className="bg-card/50 border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">System Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <TerminalLog logs={[
                  "[INFO] System online",
                  "[WARN] Unauthorized access detected",
                  "[INFO] Firewall bypassed",
                  "[SUCCESS] Connection established"
                ]} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card className="bg-card/50 border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">⚠️ Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  This website is created for <strong>entertainment purposes only</strong>. 
                  All "hacking" tools are completely fake and safe.
                </p>
                <p>
                  <strong>Important:</strong>
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>No real hacking occurs</li>
                  <li>No systems are compromised</li>
                  <li>All results are simulated</li>
                  <li>Use responsibly for pranks only</li>
                </ul>
                <p className="text-destructive">
                  Do not use this to scare or harm others. Always reveal it's a prank!
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}