"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings, RefreshCw, X } from "lucide-react"
import Image from "next/image"
import { ym } from "@/utils/ym"
import { ConfigOptions } from "./config-options"
import { Badge } from "@/components/ui/badge"

export function WarpGenerator() {
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [configData, setConfigData] = useState<{ configBase64: string; qrCodeBase64: string } | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [siteMode, setSiteMode] = useState<"all" | "specific">("all")
  const [deviceType, setDeviceType] = useState<"computer" | "phone">("computer")
  const [isGenerated, setIsGenerated] = useState(false)
  const [isConfigOpen, setIsConfigOpen] = useState(false)

  const generateConfig = async () => {
    setIsLoading(true)
    setStatus("")
    try {
      const response = await fetch("/api/warp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedServices: siteMode === "specific" && selectedServices.length === 0 ? ["all"] : selectedServices,
          siteMode: siteMode === "specific" && selectedServices.length === 0 ? "all" : siteMode,
          deviceType,
        }),
      })
      const data = await response.json()

      if (data.success) {
        setConfigData(data.content)
        setStatus("")
        setIsGenerated(true)
        ym(98811523, "reachGoal", "WARP_GEN")
      } else {
        setStatus("Ошибка: " + data.message)
      }
    } catch (error) {
      setStatus("Произошла ошибка при генерации.")
    } finally {
      setIsLoading(false)
    }
  }

  const downloadConfig = () => {
    if (configData) {
      const link = document.createElement("a")
      link.href = "data:application/octet-stream;base64," + configData.configBase64
      link.download = `WARP${Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000}.conf`
      link.click()
      ym(98811523, "reachGoal", "WARP_DOWNLOAD")
    }
  }

  const handleReset = () => {
    setConfigData(null)
    setIsGenerated(false)
  }

  return (
    <div className="w-full space-y-6 p-6 bg-[linear-gradient(45deg,#1a1a1a,#333)] border-2 border-[#555] shadow-[0_0_15px_rgba(0,0,0,0.7)]">
      {/* Брендинг сервера */}
      <div className="server-branding mb-6">
        <h1 className="server-title">ASTRACAT WARP</h1>
        <p className="server-footer">работает на базе llimonix</p>
      </div>

      {/* Основной интерфейс */}
      <div className="flex items-center gap-3">
        <Button
          onClick={generateConfig}
          disabled={isLoading || isGenerated}
          className="flex-grow bg-[#ff4d4d] hover:bg-[#cc3d3d] text-white font-bold text-lg py-3 uppercase tracking-wide border-2 border-[#333] shadow-[2px_2px_4px_rgba(0,0,0,0.5)] transition-all duration-200"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin" />
              Генерация...
            </span>
          ) : (
            "Сгенерировать"
          )}
        </Button>

        {!isGenerated ? (
          <div className="relative">
            {siteMode === "specific" && (
              <Badge
                variant="secondary"
                className="absolute -top-3 -right-3 bg-[#ff4d4d] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold border border-[#333]"
              >
                {selectedServices.length}
              </Badge>
            )}
            <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-[#222] border-[#555] text-[#ff4d4d] hover:bg-[#333] hover:text-white transition-all duration-200"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="config-dialog sm:max-w-[425px] md:max-w-[700px] bg-[#1a1a1a] border-[#555] text-white">
                <DialogHeader className="dialog-header">
                  <DialogTitle className="text-2xl font-bold text-[#ff4d4d] text-shadow-[2px_2px_4px_#000]">
                    Настройка конфигурации
                  </DialogTitle>
                  <DialogDescription className="text-[#999]">
                    Выберите параметры для вашей конфигурации WARP.
                  </DialogDescription>
                </DialogHeader>
                <ConfigOptions
                  selectedServices={selectedServices}
                  onServiceToggle={(service) =>
                    setSelectedServices((prev) =>
                      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
                    )
                  }
                  siteMode={siteMode}
                  onSiteModeChange={setSiteMode}
                  deviceType={deviceType}
                  onDeviceTypeChange={setDeviceType}
                />
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <Button
            onClick={handleReset}
            variant="outline"
            size="icon"
            className="bg-[#222] border-[#555] text-[#ff4d4d] hover:bg-[#333] hover:text-white transition-all duration-200"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        )}
      </div>

      {status && (
        <p className="text-sm text-[#ff4d4d] font-medium text-shadow-[1px_1px_2px_#000]">{status}</p>
      )}
      {configData && isGenerated && (
        <div className="flex gap-3">
          <Button
            onClick={downloadConfig}
            className="flex-[0.7] bg-[#ff4d4d] hover:bg-[#cc3d3d] text-white font-bold text-lg py-3 uppercase tracking-wide border-2 border-[#333] shadow-[2px_2px_4px_rgba(0,0,0,0.5)] transition-all duration-200"
          >
            Скачать конфиг
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-[0.3] bg-[#222] border-[#555] text-[#ff4d4d] hover:bg-[#333] hover:text-white font-bold uppercase tracking-wide transition-all duration-200"
              >
                QR код
              </Button>
            </DialogTrigger>
            <DialogContent className="config-dialog sm:max-w-[425px] bg-[#1a1a1a] border-[#555] text-white">
              <DialogHeader className="dialog-header">
                <DialogTitle className="text-2xl font-bold text-[#ff4d4d] text-shadow-[2px_2px_4px_#000]">
                  QR код конфигурации
                </DialogTitle>
                <DialogDescription className="text-[#999]">
                  Отсканируйте этот QR код для импорта конфигурации
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center p-4 bg-[#333] border-2 border-[#555]">
                <Image
                  src={configData.qrCodeBase64 || "/placeholder.svg"}
                  alt="QR Code"
                  width={425}
                  height={425}
                  className="border-2 border-[#ff4d4d]"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}
