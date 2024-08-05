import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useAuthStore } from '../stores/auth'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function openFile(type: string, folder: string, group: string, filename: string) {
  await window.electron.ipcRenderer.invoke('ipc-open-file', type, folder, group, filename)
}

export function openNewWindow(path: string, width: number, height: number) {
  window.electron.ipcRenderer.sendMessage('open-new-window', path, width, height)
}

export async function setRedirectTo (path: string) {
  await localStorage.setItem('redirectTo', path)
}

export async function getRedirectTo () {
  return localStorage.getItem('redirectTo')
}

export async function clearRedirectTo () {
  await localStorage.removeItem('redirectTo')
}

export function sendLogout() {
  window.electron.ipcRenderer.sendMessage('logout')
}

export function getUserValue(value: number): number {
  const { resultUnit } = useAuthStore.getState()

  if (resultUnit === 'mg/dL') {
    return Math.round(value)
  }

  if (resultUnit === 'mmol/L') {
    return Math.round(value / 18.0182)
  }

  throw new Error(`Unsupported result unit: ${resultUnit}`)
}

export function getUserUnit(): string {
  const { resultUnit } = useAuthStore.getState()

  return resultUnit
}
