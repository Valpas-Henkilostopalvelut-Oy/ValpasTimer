import { PaymentMethod, Classification } from "../../../models";

export const metodlist = (lang) => [
  { value: PaymentMethod.CASH, label: lang.cash },
  { value: PaymentMethod.OWNCARD, label: lang.card },
  { value: PaymentMethod.COMPANYCARD, label: lang.companycard },
  { value: PaymentMethod.BANKTRANSFER, label: lang.transfer },
  { value: PaymentMethod.OTHER, label: lang.other },
];

export const classlist = (lang) => [
  { value: Classification.ADMINISTRATIVESERVICE, label: lang.administrativeservice },
  { value: Classification.ITDEVICEANDSOFTWAREEXPENSES, label: lang.itdeviceandsoftwareexpenses },
  { value: Classification.MARKETINGEXPENSES, label: lang.marketingexpenses },
  { value: Classification.PREMISESEXPENSES, label: lang.premisesexpenses },
  { value: Classification.MEETINGEXPENSES, label: lang.meetingexpenses },
  { value: Classification.TRAVELEXPENSES, label: lang.travelexpenses },
  { value: Classification.VEHICLEEXPENSES, label: lang.vehicleexpenses },
];
