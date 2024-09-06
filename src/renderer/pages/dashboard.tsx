import { useEffect, useState } from 'react';
import { BaseLayout } from '@/layouts/base-layout';
import { useAuthStore } from '@/stores/auth';
import { getCGMData } from '@/lib/linkup';
import { TrendArrow } from '@/components/ui/trend-arrow';
import {
  ArrowTopRightIcon,
  EnterFullScreenIcon,
  GearIcon,
  OpenInNewWindowIcon,
} from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from '@/components/ui/loading';
import { useClearSession } from '@/hooks/session';
import {
  openNewWindow,
  setRedirectTo,
  getUserValue,
  getUserUnit,
  getLocalStorageWindowMode,
  setWindowMode,
} from '@/lib/utils';

const LOW = 70;
const HIGH = 240;

export default function DashboardPage() {
  const { clearSession } = useClearSession();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const country = useAuthStore((state) => state.country);
  const [graphData, setGraphData] = useState({});
  const [isReady, setIsReady] = useState(false);

  const populateGraphData = async () => {
    const data = await getCGMData({
      token: token ?? '',
      country: country ?? '',
    });

    if (data === null) {
      clearSession();
      return;
    }

    setGraphData(data);
    setIsReady(true);
  };

  const getColor = (
    value: number,
    targetLow: number,
    targetHigh: number,
  ): string => {
    if (value < LOW) {
      return 'bg-red-500';
    }

    if (value > HIGH) {
      return 'bg-orange-500';
    }

    if (
      (value < targetLow && value >= LOW) ||
      (value > targetHigh && value <= HIGH)
    ) {
      return 'bg-yellow-500';
    }

    return 'bg-green-500';
  };

  useEffect(() => {
    populateGraphData();

    const interval = setInterval(() => {
      populateGraphData();
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const openSettings = (path: string) => {
    setRedirectTo(path);
    openNewWindow(path, 1024, 768);
  };

  // 👉 overlay mode functions
  const [currentWindowMode, setCurrentWindowMode] = useState<null | string>(
    null,
  );
  useEffect(() => {
    const fetchWindowMode = async () => {
      const mode = await getLocalStorageWindowMode();
      setCurrentWindowMode(mode);

      if (mode === 'overlayTransparent') {
        document.body.style.background = 'transparent';
      } else {
        document.body.style.background = '';
      }
    };
    fetchWindowMode();
  }, []);

  const changeToWindowedMode = () => {
    setWindowMode('windowed');
  }

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <BaseLayout
      className={`${
        currentWindowMode === 'overlayTransparent'
          ? 'transparent'
          : getColor(
              graphData?.glucoseMeasurement?.ValueInMgPerDl ?? 1,
              graphData?.targetLow ?? 1,
              graphData?.targetHigh ?? 1,
            )
      } flex justify-center items-center draggable`}
    >
      {currentWindowMode == 'windowed' ? (
        <button
          onClick={() => openSettings('/settings/general')}
          className="absolute 2xs:top-5 2xs:right-5 right-0 top-0 outline-none hover:bg-white/20 p-2 rounded-md transition-all no-draggable"
        >
          <GearIcon className="text-white 2xs:h-6 2xs:w-6 w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={() => changeToWindowedMode()}
          className="absolute 2xs:top-2 2xs:right-2 right-0 top-0 outline-none hover:bg-white/20 p-2 rounded-md transition-all no-draggable"
        >
          <EnterFullScreenIcon className="text-white 2xs:h-6 2xs:w-6 w-4 h-4" />
        </button>
      )}
      <div className="flex items-center gap-3">
        <p className="text-white font-semibold xs:text-3xl text-xl">
          {getUserValue(graphData?.glucoseMeasurement?.ValueInMgPerDl) +
            ' ' +
            getUserUnit()}
        </p>
        <div
          className={`flex justify-center items-center xs:h-12 xs:w-12 h-6 w-6 rounded-full ${
            currentWindowMode === 'overlayTransparent'
              ? getColor(
                  graphData?.glucoseMeasurement?.ValueInMgPerDl ?? 1,
                  graphData?.targetLow ?? 1,
                  graphData?.targetHigh ?? 1,
                )
              : 'bg-white/25'
          }`}
        >
          <TrendArrow
            className="h-9 w-9 text-white"
            trend={graphData?.glucoseMeasurement?.TrendArrow ?? 1}
          />
        </div>
      </div>
    </BaseLayout>
  );
}
