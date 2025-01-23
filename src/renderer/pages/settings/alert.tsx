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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-foreground/30 text-xs mb-2">
            {t('Visual Alerts')}
          </p>
          <ToggleSwitch
            checked={visualAlertEnabled}
            onChange={handleVisualAlertChange}
            leftLabel={t('Off')}
            rightLabel={t('On')}
          />
        </div>

        <div>
          <p className="text-foreground/30 text-xs mb-2">{t('Audio Alerts')}</p>
          <ToggleSwitch
            checked={audioAlertEnabled}
            onChange={handleAudioAlertChange}
            leftLabel={t('Off')}
            rightLabel={t('On')}
          />
        </div>

        <div>
          <p className="text-foreground/30 text-xs mb-2">
            {t('Override Alert Values')}
          </p>
          <ToggleSwitch
            checked={overrideThreshold}
            onChange={handleOverrideChange}
            leftLabel={t('Off')}
            rightLabel={t('On')}
          />
        </div>
      </div>

      {overrideThreshold && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              value={String(customTargetHigh)}
              onChange={handleTargetHighChanged}
              placeholder={t('Enter Value')}
            />
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Button onClick={handleApplyChanges} className="w-full">
            {t('Apply Changes')}
          </Button>
        </div>
      </div>
    </SettingsLayout>
  );
}
