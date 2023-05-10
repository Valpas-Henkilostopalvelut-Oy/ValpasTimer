import { DataStore, Storage, Auth } from "aws-amplify";
import { Receipt, Currency } from "../../../models";

export const deleteReceipt = async (oldReceipt, newReceipt, id) => {
  await DataStore.delete(oldReceipt)
    .then(() => {
      console.log("Deleted receipt: ", oldReceipt);
    })
    .catch((err) => console.warn(err));
};

export const updateReceipt = async (oldReceipt, newReceipt, id) => {
  await DataStore.save(
    Receipt.copyOf(oldReceipt, (updated) => {
      updated.dateOfPurchase = newReceipt.dateOfPurchase;
      updated.placeOfPurchase = newReceipt.placeOfPurchase;
      updated.receiptNumber = newReceipt.receiptNumber;
      updated.class = newReceipt.class;
      updated.price = Number.parseFloat(newReceipt.price);
      updated.currency = newReceipt.currency;
      updated.tax = newReceipt.tax;
      updated.paymentMethod = newReceipt.paymentMethod;
      updated.comment = newReceipt.comment;
      updated.otherPayment = newReceipt.otherPayment;
    })
  ).catch((err) => console.warn(err));
};

export const onConfirm = async (oldReceipt, newReceipt, id) => {
  await DataStore.save(
    Receipt.copyOf(oldReceipt, (updated) => {
      updated.isConfirmed = true;
    })
  ).catch((err) => console.warn(err));
};

export const onUnconfirm = async (oldReceipt, newReceipt, id) => {
  await DataStore.save(
    Receipt.copyOf(oldReceipt, (updated) => {
      updated.isConfirmed = false;
    })
  ).catch((err) => console.warn(err));
};
