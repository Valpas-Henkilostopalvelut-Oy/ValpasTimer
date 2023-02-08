import { PaymentMethod, Classification } from "../../../models";
import { useAppContext } from "../../../services/contextLib.jsx";

export const metodlist = () => {
  const lang = useAppContext().langValue.service.methodselect;

  return [
    { value: PaymentMethod.CASH, label: lang.cash },
    { value: PaymentMethod.OWNCARD, label: lang.card },
    { value: PaymentMethod.COMPANYCARD, label: lang.companycard },
    { value: PaymentMethod.BANKTRANSFER, label: lang.transfer },
    { value: PaymentMethod.OTHER, label: lang.other },
  ];
};

export const classlist = () => {
  const lang = useAppContext().langValue.service.classes;
  return [
    { value: Classification.ADMINISTRATIVESERVICE, label: lang.administrativeservice },
    { value: Classification.ITDEVICEANDSOFTWAREEXPENSES, label: lang.itdeviceandsoftwareexpenses },
    { value: Classification.MARKETINGEXPENSES, label: lang.marketingexpenses },
    { value: Classification.PREMISESEXPENSES, label: lang.premisesexpenses },
    { value: Classification.MEETINGEXPENSES, label: lang.meetingexpenses },
    { value: Classification.TRAVELEXPENSES, label: lang.travelexpenses },
    { value: Classification.VEHICLEEXPENSES, label: lang.vehicleexpenses },
  ];
};

export const taxlist = [
  { value: 0, label: "0%" },
  { value: 0.06, label: "6%" },
  { value: 0.1, label: "10%" },
  { value: 0.24, label: "24%" },
];
