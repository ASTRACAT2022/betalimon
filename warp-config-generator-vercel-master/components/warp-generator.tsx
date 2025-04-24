import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ConfigOptionsProps {
  selectedServices: string[]
  onServiceToggle: (service: string) => void
  siteMode: "all" | "specific"
  onSiteModeChange: (mode: "all" | "specific") => void
  deviceType: "computer" | "phone"
  onDeviceTypeChange: (type: "computer" | "phone") => void
}

export function ConfigOptions({
  selectedServices,
  onServiceToggle,
  siteMode,
  onSiteModeChange,
  deviceType,
  onDeviceTypeChange,
}: ConfigOptionsProps) {
  const services = ["Netflix", "YouTube", "Spotify", "Custom"] // Замените на ваши сервисы

  return (
    <div className="space-y-6 p-4 bg-[rgba(20,40,20,0.9)] rounded-lg border-[rgba(0,255,100,0.4)]">
      <div>
        <h3 className="text-lg font-semibold text-[#6ee7b7]">Режим сайта</h3>
        <RadioGroup value={siteMode} onValueChange={onSiteModeChange} className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" className="text-[#6ee7b7] border-[#6ee7b7]" />
            <Label htmlFor="all" className="text-[#a7f3d0]">Все сайты</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specific" id="specific" className="text-[#6ee7b7] border-[#6ee7b7]" />
            <Label htmlFor="specific" className="text-[#a7f3d0]">Выбранные сервисы</Label>
          </div>
        </RadioGroup>
      </div>

      {siteMode === "specific" && (
        <div>
          <h3 className="text-lg font-semibold text-[#6ee7b7]">Сервисы</h3>
          <div className="mt-2 space-y-2">
            {services.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  checked={selectedServices.includes(service)}
                  onCheckedChange={() => onServiceToggle(service)}
                  className="border-[#6ee7b7] data-[state=checked]:bg-[#34d399]"
                />
                <Label htmlFor={service} className="text-[#a7f3d0]">{service}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-[#6ee7b7]">Тип устройства</h3>
        <RadioGroup value={deviceType} onValueChange={onDeviceTypeChange} className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="computer" id="computer" className="text-[#6ee7b7] border-[#6ee7b7]" />
            <Label htmlFor="computer" className="text-[#a7f3d0]">Компьютер</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" className="text-[#6ee7b7] border-[#6ee7b7]" />
            <Label htmlFor="phone" className="text-[#a7f3d0]">Телефон</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
