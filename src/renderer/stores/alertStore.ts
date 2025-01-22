import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AlertSettingsStore = {
  visualAlertEnabled: boolean;
  audioAlertEnabled: boolean;
  useCustomSound: boolean;

  setVisualAlertEnabled: (value: boolean) => void;
  setAudioAlertEnabled: (value: boolean) => void;
};

const useAlertStore = create<AlertSettingsStore>()(
  persist(
    (set) => ({
      // Initial state
      visualAlertEnabled: true,
      audioAlertEnabled: true,
      useCustomSound: false,

      // Setters
      setVisualAlertEnabled: (value: boolean) => set(() => ({ visualAlertEnabled: value })),
      setAudioAlertEnabled: (value: boolean) => set(() => ({ audioAlertEnabled: value })),
      setUserCustomSound: (value: boolean) => set(() => ({ useCustomSound: value })),
    }),
    {
      name: 'alert-settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useAlertStore };
