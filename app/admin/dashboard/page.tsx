"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DnsServer {
  name: string
  value: string
}

interface AwgSettings {
  s1: number
  s2: number
  jc: number
  jmin: number
  jmax: number
  h1: number
  h2: number
  h3: number
  h4: number
}

interface DesignSettings {
  backgroundColor: string
}

interface Settings {
  dnsServers: DnsServer[]
  awgSettings: AwgSettings
  design: DesignSettings
  // other settings will be added here
}

export default function DashboardPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [newDnsName, setNewDnsName] = useState("")
  const [newDnsValue, setNewDnsValue] = useState("")

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
  }, [])

  const handleAddDns = async () => {
    if (!settings || !newDnsName || !newDnsValue) return
    const updatedSettings = {
      ...settings,
      dnsServers: [...settings.dnsServers, { name: newDnsName, value: newDnsValue }],
    }
    await updateSettings(updatedSettings)
    setSettings(updatedSettings)
    setNewDnsName("")
    setNewDnsValue("")
  }

  const handleRemoveDns = async (index: number) => {
    if (!settings) return
    const updatedDnsServers = [...settings.dnsServers]
    updatedDnsServers.splice(index, 1)
    const updatedSettings = { ...settings, dnsServers: updatedDnsServers }
    await updateSettings(updatedSettings)
    setSettings(updatedSettings)
  }

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>, section: keyof Settings) => {
    if (!settings) return
    const { name, value } = e.target
    setSettings({
      ...settings,
      [section]: {
        ...(settings[section] as any),
        [name]: section === "awgSettings" ? Number(value) : value,
      },
    })
  }

  const handleSaveChanges = async () => {
    if (!settings) return
    await updateSettings(settings)
    alert("Settings saved!")
  }

  const updateSettings = async (newSettings: Settings) => {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSettings),
    })
  }

  if (!settings) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>DNS Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* DNS Management UI */}
          <div className="grid gap-4">
            {settings.dnsServers.map((dns, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{dns.name}</p>
                  <p className="text-sm text-gray-500">{dns.value}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveDns(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Add New DNS Server</h3>
            <div className="grid gap-4 mt-2">
              <div className="grid gap-2">
                <Label htmlFor="dns-name">Name</Label>
                <Input id="dns-name" type="text" value={newDnsName} onChange={(e) => setNewDnsName(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dns-value">Value</Label>
                <Input id="dns-value" type="text" value={newDnsValue} onChange={(e) => setNewDnsValue(e.target.value)} />
              </div>
              <Button onClick={handleAddDns}>Add DNS</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AWG 1.5 Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(settings.awgSettings).map(([key, value]) => (
            <div key={key} className="grid gap-2">
              <Label htmlFor={key}>{key.toUpperCase()}</Label>
              <Input id={key} name={key} type="number" value={value} onChange={(e) => handleSettingChange(e, "awgSettings")} />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Design Customization</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <Input
              id="backgroundColor"
              name="backgroundColor"
              type="color"
              value={settings.design.backgroundColor}
              onChange={(e) => handleSettingChange(e, "design")}
            />
          </div>
        </CardContent>
      </Card>
      <Button onClick={handleSaveChanges} className="w-full">
        Save All Changes
      </Button>
    </div>
  )
}
