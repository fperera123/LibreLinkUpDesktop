import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AlertSettingsStore = {
  visualAlertEnabled: boolean;
  audioAlertEnabled: boolean;
  useCustomSound: boolean;
  overrideThreshold: boolean;
  customTargetLow: number | null;
  customTargetHigh: number | null;
  setVisualAlertEnabled: (value: boolean) => void;
  setAudioAlertEnabled: (value: boolean) => void;
  setUserCustomSoundEnabled: (value: boolean) => void;
  setOverrideThreshold: (value: boolean) => void;
  setCustomTargetLow: (value: number | null) => void;
  setCustomTargetHigh: (value: number | null) => void;
};

const useAlertStore = create<AlertSettingsStore>()(
  persist(
    (set) => ({
      // Initial state
      visualAlertEnabled: true,
      audioAlertEnabled: true,
      useCustomSound: false,
      overrideThreshold: false,
      customTargetLow: null,
      customTargetHigh: null,
      // Setters
      setVisualAlertEnabled: (value: boolean) => set(() => ({ visualAlertEnabled: value })),
      setAudioAlertEnabled: (value: boolean) => set(() => ({ audioAlertEnabled: value })),
      setUserCustomSoundEnabled: (value: boolean) => set(() => ({ useCustomSound: value })),
      setOverrideThreshold: (value: boolean) => set(() => ({ overrideThreshold: value })),
      setCustomTargetLow: (value: number | null) => set(() => ({ customTargetLow: value })),
      setCustomTargetHigh: (value: number | null) => set(() => ({ customTargetHigh: value })),
    }),
    {
      name: 'alert-settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useAlertStore };
