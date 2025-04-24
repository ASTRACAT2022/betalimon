import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { WarpGenerator } from "@/components/warp-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-900 text-white">
      {/* Заголовок вместо логотипа */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        ASTRACAT WARP V2
      </h1>

      {/* Alert (оставлен скрытым, но стилизован) */}
      <Alert
        className="mb-6 w-full max-w-md border-gray-700 bg-gray-800 text-white"
        style={{ display: "none" }}
      >
        <AlertTitle className="text-lg font-semibold">
          Telegram Bot для генерации конфигов WARP
        </AlertTitle>
        <AlertDescription>
          Создал бота для генерации конфигов, если сайт вдруг перестанет работать:{" "}
          <a
            href="https://t.me/NewAstracatWarpBot"
            className="font-medium text-blue-400 hover:underline"
          >
            Бот ASTRACAT WARP
          </a>
        </AlertDescription>
      </Alert>

      {/* Основной контент */}
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md">
        {/* Компонент генератора */}
        <WarpGenerator />

        {/* Кнопки */}
        <div className="grid grid-cols-1 gap-4 w-full">
          <Button
            asChild
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            <a href="https://t.me/NewAstracatWarpBot">New Astracat Warp Bot</a>
          </Button>
          <Button
            asChild
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            <a href="https://t.me/AstracatUI">AstracatUI Telegram</a>
          </Button>
          <Button
            asChild
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            <a href="https://astracat.vercel.app">Наш Сайт</a>
          </Button>
        </div>

        {/* Поддержка */}
        <p className="text-sm text-gray-400 text-center">
          Работает на базе llimonix.
        </p>
      </div>
    </main>
  );
}
