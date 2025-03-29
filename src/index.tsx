import "@/index.scss"
import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

window.addEventListener("offline", () => {
  alert(
    "Потеряна связь с космосом! Вы не подключены к интернету! Повторите запрос позже!"
  )
})

window.addEventListener("online", () => {
  alert("5 минут полет нормальный:)")
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
