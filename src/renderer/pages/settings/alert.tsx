import React, { useState } from 'react';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import SettingsLayout from '@/layouts/settings-layout';
import { useAlertStore } from '@/stores/alertStore';
import { useTranslation } from 'react-i18next';
import {
  uploadCustomAlertSoundFile,
  sendRefreshPrimaryWindow,
  sendRefreshAllWindows,
} from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SettingsAlertPage() {
  const { t } = useTranslation();

  const {
    visualAlertEnabled,
    audioAlertEnabled,
    overrideThreshold,
    customTargetHigh,
    customTargetLow,

    setVisualAlertEnabled,
    setAudioAlertEnabled,
    setOverrideThreshold,
    setCustomTargetLow,
    setCustomTargetHigh,
  } = useAlertStore();

  const handleVisualAlertChange = (checked: boolean) => {
    setVisualAlertEnabled(checked);
  };

  const handleAudioAlertChange = (checked: boolean) => {
    setAudioAlertEnabled(checked);
  };

  const handleOverrideChange = (checked: boolean) => {
    setOverrideThreshold(checked);
  };

  const handleTargetLowChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomTargetLow(Number(event.target.value));
  };

  const handleTargetHighChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomTargetHigh(Number(event.target.value));
  };

  const handleApplyChanges = () => {
    sendRefreshPrimaryWindow();
    // sendRefreshAllWindows();
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
          await uploadCustomAlertSoundFile(filePath);
        } catch (error) {
          console.error('Error uploading custom alert file:', error);
        }
      }
    };
    fileInput.click();
  };

  return (
    <SettingsLayout>
    <div className="space-y-6">
    <div>
      <p className="text-foreground/30 text-xs mb-2">{t('Visual Alerts')}</p>
      <ToggleSwitch
        checked={visualAlertEnabled}
        onChange={handleVisualAlertChange}
        leftLabel={t('Off')}
        rightLabel={t('On')}
      />
    </div>

    <div>
    <p className="text-foreground/30 text-xs mb-2">{t('Audio Alerts')}</p>

    <div className="flex items-center gap-4">
    <ToggleSwitch
      checked={audioAlertEnabled}
      onChange={handleAudioAlertChange}
      leftLabel={t('Off')}
      rightLabel={t('On')}
    />

    {audioAlertEnabled && (
      <button
        onClick={uploadCustomAlertSound}
        className="px-4 py-2 bg-primary text-white text-sm rounded shadow hover:bg-primary-dark"
      >
        {t('Custom Audio')}
      </button>
    )}
  </div>
</div>

    <div>
      <p className="text-foreground/30 text-xs mb-2">{t('Override Alert Values')}</p>
      <div className="flex flex-wrap items-center gap-4">
        <ToggleSwitch
          checked={overrideThreshold}
          onChange={handleOverrideChange}
          leftLabel={t('Off')}
          rightLabel={t('On')}
        />
        {overrideThreshold && (
          <>
            <div>
              <p className="text-foreground/30 text-xs mb-2">
                {t('Alert If Lower Than')} ({t('mg/dL')})
              </p>
              <Input
                type="number"
                placeholder={t('Enter Value')}
                value={String(customTargetLow)}
                onChange={handleTargetLowChanged}
              />
            </div>
            <div>
              <p className="text-foreground/30 text-xs mb-2">
                {t('Alert If Higher Than')} ({t('mg/dL')})
              </p>
              <Input
                type="number"
                placeholder={t('Enter Value')}
                value={String(customTargetHigh)}
                onChange={handleTargetHighChanged}
              />
            </div>
          </>
        )}
      </div>
    </div>

    {overrideThreshold && (
          <div>
            <Button onClick={handleApplyChanges}>
              {t('Apply Changes')}
            </Button>
          </div>
    )}
  </div>
</SettingsLayout>

  );
}
