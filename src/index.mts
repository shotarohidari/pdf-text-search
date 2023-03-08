import { chromium } from "playwright"
import robot from "robotjs"

const wait = (ms: number = 1000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

const browser = await chromium.launch({ headless: false })
const context = await browser.newContext()
await context.grantPermissions(["clipboard-read"])
const page = await browser.newPage()

await page.goto("https://www.pref.kyoto.jp/kenkoshishin/documents/no_1.pdf")

robot.mouseClick()
await wait(300)
robot.keyTap("f", ["command"])

await wait(300)
const mouse = robot.getMousePos()
//ピクセルカラー変更の検知でキーワードを含んでいるか判定する
const c1 = robot.getPixelColor(mouse.x, mouse.y)
robot.keyTap("v", ["command"])
await wait(300)
// 移動させるためには3回enter
robot.keyTap("enter")
robot.keyTap("enter")
robot.keyTap("enter")
await wait(300)
const c2 = robot.getPixelColor(mouse.x, mouse.y)
console.log({ c1, c2 })

if (c1 !== c2) {
  console.log("changed!")
}

await page.close()

const page2 = await browser.newPage()

await page2.goto("https://www.pref.kyoto.jp/kenkoshishin/documents/no_2.pdf")
robot.mouseClick()
await wait(300)
robot.keyTap("f", ["command"])
await wait(300)
const mouse2 = robot.getMousePos()
//ピクセルカラー変更の検知でキーワードを含んでいるか判定する
const d1 = robot.getPixelColor(mouse2.x, mouse2.y)
robot.keyTap("v", ["command"])
await wait(300)
// 移動させるためには3回enter
robot.keyTap("enter")
robot.keyTap("enter")
robot.keyTap("enter")
await wait(300)
const d2 = robot.getPixelColor(mouse.x, mouse.y)
console.log({ d1, d2 })
if (d1 !== d2) {
  console.log("changed!")
}

// playwrightでテスト
await browser.close()
