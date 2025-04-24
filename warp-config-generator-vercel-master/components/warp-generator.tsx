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
import { Settings, RefreshCw } from "lucide-react"
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
    <div className="w-full min-h-[400px] space-y-8 p-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,15,60,0.98))] border-2 border-[rgba(100,150,255,0.4)] rounded-xl shadow-[0_0_30px_rgba(100,150,255,0.3)] backdrop-blur-lg relative overflow-hidden">
      {/* Анимированный фоновый эффект */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,150,255,0.2),transparent_70%)] animate-pulse opacity-30" />

      {/* Брендинг сервера */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-widest uppercase bg-clip-text text-transparent bg-[linear-gradient(90deg,#4f46e5,#a855f7,#ec4899)] animate-gradient-x drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]">
          ASTRACAT WARP
        </h1>
        <p className="text-sm font-medium mt-3 text-[rgba(147,197,253,0.7)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] tracking-wide">
          работает на базе llimonix
        </p>
      </div>

      {/* Основной интерфейс */}
      <div className="flex items-center gap-4">
        <Button
          onClick={generateConfig}
          disabled={isLoading || isGenerated}
          className="flex-grow bg-[linear-gradient(45deg,#4f46e5,#a855f7)] hover:bg-[linear-gradient(45deg,#4338ca,#9333ea)] text-white font-bold text-xl py-4 uppercase tracking-wider border-2 border-[rgba(147,197,253,0.5)] rounded-lg shadow-[0_0_15px_rgba(100,150,255,0.4)] hover:shadow-[0_0_25px_rgba(100,150,255,0.6)] transition-all duration-300 transform hover:-translate-y-1"
        >
          {isLoading ? (
            <span className="flex items-center gap-3">
              <RefreshCw className="h-6 w-6 animate-spin" />
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
                className="absolute -top-4 -right-4 bg-[linear-gradient(45deg,#4f46e5,#a855f7)] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold border-2 border-[rgba(147,197,253,0.5)] shadow-[0_0_10px_rgba(100,150,255,0.3)]"
              >
                {selectedServices.length}
              </Badge>
            )}
            <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-[rgba(30,41,59,0.9)] border-[rgba(147,197,253,0.5)] text-[#93c5fd] hover:bg-[rgba(51,65,85,0.9)] hover:text-[#f0abfc] rounded-lg shadow-[0_0_10px_rgba(100,150,255,0.3)] hover:shadow-[0_0_15px_rgba(100,150,255,0.5)] transition-all duration-300 w-12 h-12"
                >
                  <Settings className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="config-dialog sm:max-w-[425px] md:max-w-[700px] bg-[rgba(15,23,42,0.95)] border-[rgba(147,197,253,0.4)] text-white backdrop-blur-xl rounded-xl shadow-[0_0_20px_rgba(100,150,255,0.3)]">
                <DialogHeader className="dialog-header">
                  <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,#4f46e5,#a855f7)] drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                    Настройка конфигурации
                  </DialogTitle>
                  <DialogDescription className="text-[rgba(147,197,253,0.8)] text-lg">
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
            className="bg-[rgba(30,41,59,0.9)] border-[rgba(147,197,253,0.5)] text-[#93c5fd] hover:bg-[rgba(51,65,85,0.9)] hover:text-[#f0abfc] rounded-lg shadow-[0_0_10px_rgba(100,150,255,0.3)] hover:shadow-[0_0_15px_rgba(100,150,255,0.5)] transition-all duration-300 w-12 h-12"
          >
            <RefreshCw className="h-6 w-6" />
          </Button>
        )}
      </div>

      {status && (
        <p className="text-base text-[#f87171] font-medium drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]">{status}</p>
      )}
      {configData && isGenerated && (
        <div className="flex gap-4">
          <Button
            onClick={downloadConfig}
            className="flex-[0.7] bg-[linear-gradient(45deg,#4f46e5,#a855f7)] hover:bg-[linear-gradient(45deg,#4338ca,#9333ea)] text-white font-bold text-xl py-4 uppercase tracking-wider border-2 border-[rgba(147,197,253,0.5)] rounded-lg shadow-[0_0_15px_rgba(100,150,255,0.4)] hover:shadow-[0_0_25px_rgba(100,150,255,0.6)] transition-all duration-300 transform hover:-translate-y-1"
          >
            Скачать конфиг
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-[0.3] bg-[rgba(30,41,59,0.9)] border-[rgba(147,197,253,0.5)] text-[#93c5fd] hover:bg-[rgba(51,65,85,0.9)] hover:text-[#f0abfc] font-bold text-lg uppercase tracking-wider rounded-lg shadow-[0_0_10px_rgba(100,150,255,0.3)] hover:shadow-[0_0_15px_rgba(100,150,255,0.5)] transition-all duration-300"
              >
                QR код
              </Button>
            </DialogTrigger>
            <DialogContent className="config-dialog sm:max-w-[425px] bg-[rgba(15,23,42,0.95)] border-[rgba(147,197,253,0.4)] text-white backdrop-blur-xl rounded-xl shadow-[0_0_20px_rgba(100,150,255,0.3)]">
              <DialogHeader className="dialog-header">
                <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,#4f46e5,#a855f7)] drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                  QR код конфигурации
                </DialogTitle>
                <DialogDescription className="text-[rgba(147,197,253,0.8)] text-lg">
                  Отсканируйте этот QR код для импорта конфигурации
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center p-6 bg-[rgba(30,41,59,0.9)] border-2 border-[rgba(147,197,253,0.5)] rounded-lg shadow-[0_0_10px_rgba(100,150,255,0.3)]">
                <Image
                  src={configData.qrCodeBase64 || "/placeholder.svg"}
                  alt="QR Code"
                  width={425}
                  height={425}
                  className="border-2 border-[rgba(147,197,253,0.5)] rounded-md"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </div>
  )
}
