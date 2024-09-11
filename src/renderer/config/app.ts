type DropdownConfigType = {
  value: string
  label: string
}

const countries: DropdownConfigType[] = [
  { value: 'de', label: 'Germany' },
  { value: 'eu', label: 'European Union' },
  { value: 'eu2', label: 'European Union 2' },
  { value: 'us', label: 'United States' },
  { value: 'ap', label: 'Asia/Pacific' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan' },
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'fr', label: 'France' },
  { value: 'au', label: 'Australia' },
]

const languages: DropdownConfigType[] = [
  { value: 'bs', label: 'Bosnian' },
  { value: 'cs', label: 'Czech' },
  { value: 'de', label: 'German' },
  { value: 'el', label: 'Greek' },
  { value: 'en', label: 'English' },
  { value: 'no', label: 'Norwegian' },
  { value: 'ru', label: 'Russian' },
  { value: 'si', label: 'Sinhala' },
  { value: 'es', label: 'Spanish' }
]

const themes: DropdownConfigType[] = [
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'System',
    value: 'system',
  },
];

const resultUnits: DropdownConfigType[] = [
  {
    label: 'mg/dL',
    value: 'mg/dL',
  },
  {
    label: 'mmol/L',
    value: 'mmol/L',
  },
];

const windowModes: DropdownConfigType[] = [
  {
    label: 'Overlay',
    value: 'overlay',
  },
  {
    label: 'Overlay (Transparent)',
    value: 'overlayTransparent',
  },
  {
    label: 'Windowed',
    value: 'windowed',
  },
];

export {
  countries,
  languages,
  themes,
  resultUnits,
  windowModes,
}
