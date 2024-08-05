import { ThemeType, useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import SettingsLayout from "@/layouts/settings-layout"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuthStore } from "@/stores/auth"
import { countries, languages, themes, resultUnits } from "@/config/app"
import { useTranslation } from "react-i18next"
import { setRedirectTo } from "@/lib/utils"

export default function SettingsGeneralPage() {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const theme = localStorage.getItem('vite-ui-theme')
  const language = useAuthStore((state) => state.language)
  const setLanguage = useAuthStore((state) => state.setLanguage)
  const country = useAuthStore((state) => state.country)
  const setCountry = useAuthStore((state) => state.setCountry)

  const resultUnit = useAuthStore((state) => state.resultUnit)
  const setResultUnit = useAuthStore((state) => state.setResultUnit)

  const { setTheme } = useTheme()
  const setAndRefreshTheme = (t: ThemeType) => {
    setTheme(t)
    setRedirectTo('/settings/general')
    window.location.reload();
  }
  const setAndRefreshLanguage = (l: string) => {
    i18n.changeLanguage(l)
    setLanguage(l)
  }

  return (
    <SettingsLayout>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-foreground/30 text-xs mb-2">{t('Theme')}</p>
          <Select onValueChange={setAndRefreshTheme} defaultValue={theme ?? ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent>
              {themes.map(item => (
                <SelectItem value={item.value} key={item.value}>
                  {t(item.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-foreground/30 text-xs mb-2">{t('Unit')}</p>
          <Select onValueChange={setResultUnit} defaultValue={resultUnit ?? 'mg/dL'}>
            <SelectTrigger>
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              {resultUnits.map(item => (
                <SelectItem value={item.value} key={item.value}>
                  {t(item.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-foreground/30 text-xs mb-2">{t('Country')}</p>
          <Select onValueChange={setCountry} defaultValue={country ?? ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(coun => (
                <SelectItem value={coun.value} key={coun.value}>
                  {t(coun.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-foreground/30 text-xs mb-2">{t('Language')}</p>
          <Select onValueChange={setAndRefreshLanguage} defaultValue={language ?? ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lan => (
                <SelectItem value={lan.value} key={lan.value}>
                  {t(lan.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </SettingsLayout>
  )
}
