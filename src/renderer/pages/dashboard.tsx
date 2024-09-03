import { useEffect, useState } from "react"
import { BaseLayout } from "@/layouts/base-layout"
import { useAuthStore } from "@/stores/auth"
import { getCGMData } from "@/lib/linkup"
import { TrendArrow } from "@/components/ui/trend-arrow"
import { GearIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { LoadingScreen } from "@/components/ui/loading"
import { useClearSession } from "@/hooks/session"
import { openNewWindow, setRedirectTo, getUserValue, getUserUnit } from "@/lib/utils"

const LOW = 70;
const HIGH = 240;

export default function DashboardPage() {
  const { clearSession } = useClearSession()
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const country = useAuthStore((state) => state.country)
  const [graphData, setGraphData] = useState({})
  const [isReady, setIsReady] = useState(false)

  const populateGraphData = async () => {
    const data = await getCGMData({
      token: token ?? "",
      country: country ?? "",
    })

    if (data === null) {
      clearSession()
      return
    }

    setGraphData(data)
    setIsReady(true)
  }

  const getColor = (value: number, targetLow: number, targetHigh: number): string => {
    if (value < LOW) {
      return "bg-red-500"
    }

    if (value > HIGH) {
      return "bg-orange-500"
    }

    if ((value < targetLow && value >= LOW) || (value > targetHigh && value <= HIGH)) {
      return "bg-yellow-500"
    }

    return "bg-green-500"
  }

  useEffect(() => {
    populateGraphData()

    const interval = setInterval(() => {
      populateGraphData()
    }, 1000 * 60)

    return () => clearInterval(interval)
  }, [])

  const openSettings = (path: string) => {
    setRedirectTo(path);
    openNewWindow(path, 1024, 768)
  }

  if (!isReady) {
    return <LoadingScreen />
  }

  return (
    <BaseLayout
      className={`${getColor(
        graphData?.glucoseMeasurement?.ValueInMgPerDl ?? 1,
        graphData?.targetLow ?? 1,
        graphData?.targetHigh ?? 1
      )} flex justify-center items-center draggable`}
    >
      <button
        onClick={() => openSettings('/settings/general')}
        className="absolute top-5 right-5 hover:bg-white/20 p-2 rounded-md transition-all no-draggable"
      >
        <GearIcon className="text-white h-6 w-6" />
      </button>
      <div className="flex items-center gap-3">
        <p className="text-white text-3xl font-semibold">{getUserValue(graphData?.glucoseMeasurement?.ValueInMgPerDl) + ' ' + getUserUnit() }</p>
        <div className="flex justify-center items-center h-12 w-12 rounded-full bg-white/25">
          <TrendArrow className="h-9 w-9 text-white" trend={graphData?.glucoseMeasurement?.TrendArrow ?? 1} />
        </div>
      </div>
    </BaseLayout>
  )
}
