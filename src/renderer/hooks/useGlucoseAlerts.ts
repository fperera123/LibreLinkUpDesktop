import { useCallback } from "react";
import { getAlertSoundFile, triggerWarningAlert } from "@/lib/utils";
import { AudioManager } from "@/lib/AudioManager";
import { useAlertStore } from "@/stores/alertStore";

export const useGlucoseAlerts = () => {
  const { visualAlertEnabled, audioAlertEnabled, useCustomSound } = useAlertStore();

  const dispatchAlert = useCallback(() => {
    return async (glucoseLevel: number, targetLow: number, targetHigh: number) => {
      try {

        // // NOTE:: used for testing purposes
        //   triggerWarningAlert({
        //     visualAlertEnabled: visualAlertEnabled,
        //   });

        // // NOTE:: used for testing purposes
        // if (audioAlertEnabled) {
        //   const paths = await getAlertSoundFile();
        //   let audioFilePath = paths.default;
        //   if(useCustomSound && paths?.custom) {
        //     audioFilePath = paths.custom;
        //   }

        //   if (audioFilePath) {
        //     const audioManager = AudioManager.getInstance();
        //     await audioManager.playAudio(audioFilePath);
        //   }
        // }

        // glucose level checks and alerts
        if (
          glucoseLevel !== undefined &&
          (glucoseLevel < targetLow || glucoseLevel > targetHigh)
        ) {
          triggerWarningAlert({
            visualAlertEnabled: visualAlertEnabled,
          });

          if (audioAlertEnabled) {
            const paths = await getAlertSoundFile();

            let audioFilePath = paths.default;
            if(useCustomSound && paths?.custom) {
              audioFilePath = paths.custom;
            }

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

