import { useCallback } from 'react';
import { getAlertSoundFile, triggerWarningAlert } from '@/lib/utils';
import { AudioManager } from '@/lib/AudioManager';
import { useAlertStore } from '@/stores/alertStore';

export const useGlucoseAlerts = () => {
  const {
    visualAlertEnabled,
    audioAlertEnabled,
    useCustomSound,
    overrideThreshold,
    customTargetHigh,
    customTargetLow,
  } = useAlertStore();
  const dispatchAlert = useCallback(() => {
    return async (
      glucoseLevel: number,
      targetLow: number,
      targetHigh: number,
    ) => {
      try {
        // // NOTE:: used for testing purposes
        // triggerWarningAlert({
        //   visualAlertEnabled: visualAlertEnabled,
        // });

        // // NOTE:: used for testing purposes
        // if (audioAlertEnabled) {
        //   const paths = await getAlertSoundFile();
        //   let audioFilePath = paths.default;
        //   if (useCustomSound && paths?.custom) {
        //     audioFilePath = paths.custom;
        //   }

        //   if (audioFilePath) {
        //     const audioManager = AudioManager.getInstance();
        //     await audioManager.playAudio(audioFilePath);
        //   }
        // }

        // glucose level checks and alerts
        const lowThreshold =
          overrideThreshold && customTargetLow ? customTargetLow : targetLow;
        const highThreshold =
          overrideThreshold && customTargetHigh ? customTargetHigh : targetHigh;

        if (
          glucoseLevel !== undefined &&
          (glucoseLevel < lowThreshold || glucoseLevel > highThreshold)
        ) {
          triggerWarningAlert({
            visualAlertEnabled: visualAlertEnabled,
          });

          if (audioAlertEnabled) {
            const paths = await getAlertSoundFile();

            let audioFilePath = paths.default;
            if (useCustomSound && paths?.custom) {
              audioFilePath = paths.custom;
            }

            if (audioFilePath) {
              const audioManager = AudioManager.getInstance();
              await audioManager.playAudio(audioFilePath);
            }
          }
        }
      } catch (err) {
        console.error('Error in dispatchAlert:', err);
      }
    };
  }, [
    visualAlertEnabled,
    audioAlertEnabled,
    useCustomSound,
    overrideThreshold,
    customTargetHigh,
    customTargetLow,
  ]);

  return { dispatchAlert: dispatchAlert() };
};
