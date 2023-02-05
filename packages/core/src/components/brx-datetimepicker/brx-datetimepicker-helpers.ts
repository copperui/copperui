export enum Type {
  DATE = 'date',
  TIME = 'time',
  DATETIME_LOCAL = 'datetime-local',
}

export const getFlatpickr = async () => {
  const mod = await import('flatpickr');
  return mod.default;
};

export const getDefaultLocale = async () => {
  const mod = await import('flatpickr/dist/l10n/pt');
  return mod.default.pt;
};

export const getConfigSetupForType = (type: Type) => {
  switch (type) {
    case Type.DATE: {
      return {
        dateFormat: 'd/m/Y',
        enableTime: false,
        noCalendar: false,
      };
    }

    case Type.TIME: {
      return {
        dateFormat: 'H:i',
        enableTime: true,
        noCalendar: true,
      };
    }

    case Type.DATETIME_LOCAL: {
      return {
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        noCalendar: false,
      };
    }

    default: {
      return {
        dateFormat: 'd/m/Y',
        enableTime: false,
        noCalendar: false,
      };
    }
  }
};
