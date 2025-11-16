import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const services = [
  { name: "Discord", key: "discord" },
  { name: "YouTube", key: "youtube" },
  { name: "Twitter", key: "twitter" },
  { name: "Instagram", key: "instagram" },
  { name: "Facebook", key: "facebook" },
  { name: "Viber", key: "viber" },
  { name: "TikTok", key: "tiktok" },
  { name: "Spotify", key: "spotify" },
  { name: "Zetflix", key: "zetflix" },
  { name: "NNM-Club", key: "nnmclub" },
  { name: "RuTracker", key: "rutracker" },
  { name: "Kinozal", key: "kinozal" },
  { name: "Copilot", key: "copilot" },
  { name: "Canva", key: "canva" },
  { name: "Patreon", key: "patreon" },
  { name: "AnimeGo", key: "animego" },
  { name: "Jutsu", key: "jutsu" },
  { name: "YummyAnime", key: "yummianime" },
  { name: "PornHub", key: "pornhub" },
  { name: "XVideos", key: "xvideos" },
  { name: "Pornolab", key: "pornolab" },
  { name: "Ficbook", key: "ficbook" },
  { name: "BestChange", key: "bestchange" },
]

interface DnsServer {
  name: string
  value: string
}

interface ConfigOptionsProps {
  selectedServices: string[]
  onServiceToggle: (service: string) => void
  siteMode: "all" | "specific"
  onSiteModeChange: (mode: "all" | "specific") => void
  deviceType: "computer" | "phone"
  onDeviceTypeChange: (type: "computer" | "phone") => void
  dnsServers: DnsServer[]
  selectedDns: string
  onDnsChange: (dns: string) => void
  useAwg: boolean
  onAwgChange: (useAwg: boolean) => void
}

export function ConfigOptions({
  selectedServices,
  onServiceToggle,
  siteMode,
  onSiteModeChange,
  deviceType,
  onDeviceTypeChange,
  dnsServers,
  selectedDns,
  onDnsChange,
  useAwg,
  onAwgChange,
}: ConfigOptionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Switch id="awg-mode" checked={useAwg} onCheckedChange={onAwgChange} />
          <Label htmlFor="awg-mode">Amnesia WG 1.5</Label>
        </div>

        <Select value={siteMode} onValueChange={onSiteModeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите режим" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все сайты</SelectItem>
            <SelectItem value="specific">Определенные сайты</SelectItem>
          </SelectContent>
        </Select>

        {siteMode === "specific" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {services.map((service) => (
              <Button
                key={service.key}
                variant={selectedServices.includes(service.key) ? "default" : "outline"}
                onClick={() => onServiceToggle(service.key)}
                className="justify-start"
              >
                {service.name}
              </Button>
            ))}
          </div>
        )}

        <Select value={deviceType} onValueChange={onDeviceTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите устройство" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="computer">Компьютер</SelectItem>
            <SelectItem value="phone">Телефон</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedDns} onValueChange={onDnsChange}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите DNS" />
          </SelectTrigger>
          <SelectContent>
            {dnsServers.map((dns) => (
              <SelectItem key={dns.name} value={dns.value}>
                {dns.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
