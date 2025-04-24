declare global {
  interface Window {
    ym: (counterId: number, eventName: string, ...args: any[]) => void
  }
}

export function ym(counterId: number, eventName: string, ...args: any[]) {
  if (typeof window !== "undefined" && window.ym) {
    window.ym.apply(null, [counterId, eventName, ...args])
  } else {
    console.warn("Yandex Metrika not initialized")
  }
}

export function initYM(counterId: number) {
  ;((m, e, t, r, i, k, a) => {
    m[i] =
      m[i] ||
      (() => {
        ;(m[i].a = m[i].a || []).push(arguments)
      })
    m[i].l = 1 * new Date()
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return
      }
    }
    k = e.createElement(t)
    a = e.getElementsByTagName(t)[0]
    k.async = 1
    k.src = r
    a.parentNode.insertBefore(k, a)
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym")

  window.ym(counterId, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  })
}

