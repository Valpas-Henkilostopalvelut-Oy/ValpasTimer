import { DataStore, Storage, Auth } from "aws-amplify";
import { Receipt, Currency } from "../../../models";

/*{
    "id": "04ffc059-80e5-473c-b64f-97d290f6fb29",
    "userId": "669172d6-f6c2-44a1-95fd-43255acdf6b4",
    "created": "2023-01-31T12:55:34.205Z",
    "updated": "2023-01-31T12:55:34.205Z",
    "dateOfPurchase": "2023-01-24T12:53:30.000Z",
    "placeOfPurchase": "Turku",
    "receiptNumber": "12345678",
    "class": null,
    "price": 12,
    "currency": "EUR",
    "receiptImage": [
        "Toimistosiivous.jpg",
        "työntekijä.jpg"
    ],
    "tax": 0.24,
    "paymentMethod": "CASH",
    "comment": "Comment",
    "createdAt": "2023-01-31T12:55:34.532Z",
    "updatedAt": "2023-01-31T12:55:34.532Z",
    "_version": 1,
    "_lastChangedAt": 1675169734554,
    "_deleted": null
}*/

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
  )
    .then((e) => {
      console.log("Updated receipt: ", e);
    })
    .catch((err) => console.warn(err));
};
