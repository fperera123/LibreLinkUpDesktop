import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AlertSettingsStore = {
  visualAlertEnabled: boolean;
  audioAlertEnabled: boolean;
  setVisualAlertEnabled: (value: boolean) => void;
  setAudioAlertEnabled: (value: boolean) => void;
};

const useAlertStore = create<AlertSettingsStore>()(
  persist(
    (set) => ({
      visualAlertEnabled: false,
      audioAlertEnabled: false,
      setVisualAlertEnabled: (value: boolean) => set(() => ({ visualAlertEnabled: value })),
      setAudioAlertEnabled: (value: boolean) => set(() => ({ audioAlertEnabled: value })),
    }),
    {
      name: 'alert-settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useAlertStore };
