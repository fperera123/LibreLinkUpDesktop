import React, { useState } from "react";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import SettingsLayout from "@/layouts/settings-layout";
import { useAlertStore } from "@/stores/alertStore";
import { useTranslation } from "react-i18next";
import { uploadCustomAlertSoundFile } from "@/lib/utils";

export default function SettingsAlertPage() {
  const { t } = useTranslation();

  const {
    visualAlertEnabled,
    audioAlertEnabled,
    setVisualAlertEnabled,
    setAudioAlertEnabled,
  } = useAlertStore();

  const [overrideThreshold, setOverrideThreshold] = useState(false);
  const [customTargetLow, setCustomTargetLow] = useState("");
  const [customTargetHigh, setCustomTargetHigh] = useState("");

  const handleVisualAlertChange = (checked: boolean) => {
    setVisualAlertEnabled(checked);
  };

  const handleAudioAlertChange = (checked: boolean) => {
    setAudioAlertEnabled(checked);
  };

  // TODO:: use a button and trigger this function
  const uploadCustomAlertSound = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.mp3';
    fileInput.onchange = async (event) => {
      const target = event.target as HTMLInputElement;
      const file = target?.files ? target.files[0] : null;
      if (file) {
        const filePath = file.path;
        try {
          await uploadCustomAlertSoundFile(filePath)
        } catch (error) {
          console.error('Error uploading custom alert file:', error);
        }
      }
    };
    fileInput.click();
  };

  const handleOverrideChange = (checked: boolean) => {
    setOverrideThreshold(checked);
    console.log(`Override Alert Values ${checked ? "Enabled" : "Disabled"}`);
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

        <div>
          <p className="text-foreground/30 text-xs mb-2">{t("Override Alert Values")}</p>
          <ToggleSwitch
            checked={overrideThreshold}
            onChange={handleOverrideChange}
            leftLabel={t("Off")}
            rightLabel={t("On")}
          />
        </div>
      </div>

      {overrideThreshold && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="text-sm text-foreground mb-1 block">
              {t("Low Alert Value")}
            </label>
            <input
              type="number"
              value={customTargetLow}
              onChange={(e) => setCustomTargetLow(e.target.value)}
              placeholder={t("Enter low alert value")}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm text-foreground mb-1 block">
              {t("High Alert Value")}
            </label>
            <input
              type="number"
              value={customTargetHigh}
              onChange={(e) => setCustomTargetHigh(e.target.value)}
              placeholder={t("Enter high alert value")}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>
      )}
    </SettingsLayout>
  );
}
