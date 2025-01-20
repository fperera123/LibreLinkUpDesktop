import { useCallback } from "react";
import { getAlertSoundFile, triggerWarningAlert } from "@/lib/utils";
import { AudioManager } from "@/lib/AudioManager";
import { useAlertStore } from "@/stores/alertStore";

export const useGlucoseAlerts = () => {
  const { visualAlertEnabled, audioAlertEnabled } = useAlertStore();

  const dispatchAlert = useCallback(() => {
    return async (glucoseLevel: number, targetLow: number, targetHigh: number) => {
      try {

        // NOTE:: used for testing purposes
          triggerWarningAlert({
            visualAlertEnabled: visualAlertEnabled,
          });

        // NOTE:: used for testing purposes
        if (audioAlertEnabled) {
          const audioFilePath = await getAlertSoundFile();
          if (audioFilePath) {
            const audioManager = AudioManager.getInstance();
            await audioManager.playAudio(audioFilePath);
          }
        }

        // glucose level checks and alerts
        if (
          glucoseLevel !== undefined &&
          (glucoseLevel < targetLow || glucoseLevel > targetHigh)
        ) {
          triggerWarningAlert({
            visualAlertEnabled: visualAlertEnabled,
          });

          if (audioAlertEnabled) {
            const audioFilePath = await getAlertSoundFile();
            if (audioFilePath) {
              const audioManager = AudioManager.getInstance();
              await audioManager.playAudio(audioFilePath);
            }
          }
        }
      } catch (err) {
        console.error("Error in dispatchAlert:", err);
      }
    };
  }, [visualAlertEnabled, audioAlertEnabled]);

  return { dispatchAlert: dispatchAlert() };
};

