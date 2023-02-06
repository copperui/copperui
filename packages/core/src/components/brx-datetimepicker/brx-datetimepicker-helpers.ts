import { Type } from './brx-datetimepicker-interface';

export const getFlatpickr = async () => {
  const mod = await import('flatpickr');
  return mod.default;
};

export const getDefaultLocale = async () => {
  const mod = await import('flatpickr/dist/l10n/pt');
  return mod.default.pt;
};

export const getSetupForType = (type: Type) => {
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

export const getInitialInputType = (type: Type) => {
  switch (type) {
    case Type.TIME: {
      return 'time';
    }

    case Type.DATETIME_LOCAL: {
      return 'datetime-local';
    }

    case Type.DATE:
    default: {
      return 'text';
    }
  }
};

export const getIconForType = (type: Type) => {
  switch (type) {
    case Type.DATE:
    case Type.DATETIME_LOCAL: {
      return 'fa5/fas/calendar-alt';
    }

    case Type.TIME: {
      return 'fa5/fas/clock';
    }

    default: {
      return null;
    }
  }
};
