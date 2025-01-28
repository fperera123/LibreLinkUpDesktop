import { ToggleSwitch } from "@/components/ui/toggle-switch";
import SettingsLayout from "@/layouts/settings-layout";
import { useAlertStore } from "@/stores/alertStore";
import { useTranslation } from "react-i18next";

export default function SettingsAlertPage() {
  const { t } = useTranslation();

  const {
    visualAlertEnabled,
    audioAlertEnabled,
    setVisualAlertEnabled,
    setAudioAlertEnabled,
  } = useAlertStore();

  const handleVisualAlertChange = (checked: boolean) => {
    setVisualAlertEnabled(checked);
    console.log(`Visual Alerts ${checked ? "Enabled" : "Disabled"}`);
  };

  const handleAudioAlertChange = (checked: boolean) => {
    setAudioAlertEnabled(checked);
    console.log(`Audio Alerts ${checked ? "Enabled" : "Disabled"}`);
  };

  return (
    <SettingsLayout>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

        <div>
          <p className="text-foreground/30 text-xs mb-2">{t("Visual Alerts")}</p>
          <ToggleSwitch
            checked={visualAlertEnabled}
            onChange={handleVisualAlertChange}
            leftLabel={t("Off")}
            rightLabel={t("On")}
          />
        </div>

        <div>
          <p className="text-foreground/30 text-xs mb-2">{t("Audio Alerts")}</p>
          <ToggleSwitch
            checked={audioAlertEnabled}
            onChange={handleAudioAlertChange}
            leftLabel={t("Off")}
            rightLabel={t("On")}
          />
        </div>
      </div>
    </SettingsLayout>
  );
}
