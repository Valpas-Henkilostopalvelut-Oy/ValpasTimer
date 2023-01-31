/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Receipt } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ReceiptUpdateForm(props) {
  const {
    id: idProp,
    receipt,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userId: "",
    created: "",
    updated: "",
    dateOfPurchase: "",
    placeOfPurchase: "",
    receiptNumber: "",
    class: undefined,
    price: "",
    currency: undefined,
    receiptImage: [],
    tax: "",
    paymentMethod: undefined,
    comment: "",
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [created, setCreated] = React.useState(initialValues.created);
  const [updated, setUpdated] = React.useState(initialValues.updated);
  const [dateOfPurchase, setDateOfPurchase] = React.useState(
    initialValues.dateOfPurchase
  );
  const [placeOfPurchase, setPlaceOfPurchase] = React.useState(
    initialValues.placeOfPurchase
  );
  const [receiptNumber, setReceiptNumber] = React.useState(
    initialValues.receiptNumber
  );
  const [class1, setClass1] = React.useState(initialValues.class);
  const [price, setPrice] = React.useState(initialValues.price);
  const [currency, setCurrency] = React.useState(initialValues.currency);
  const [receiptImage, setReceiptImage] = React.useState(
    initialValues.receiptImage
  );
  const [tax, setTax] = React.useState(initialValues.tax);
  const [paymentMethod, setPaymentMethod] = React.useState(
    initialValues.paymentMethod
  );
  const [comment, setComment] = React.useState(initialValues.comment);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = receiptRecord
      ? { ...initialValues, ...receiptRecord }
      : initialValues;
    setUserId(cleanValues.userId);
    setCreated(cleanValues.created);
    setUpdated(cleanValues.updated);
    setDateOfPurchase(cleanValues.dateOfPurchase);
    setPlaceOfPurchase(cleanValues.placeOfPurchase);
    setReceiptNumber(cleanValues.receiptNumber);
    setClass1(cleanValues.class);
    setPrice(cleanValues.price);
    setCurrency(cleanValues.currency);
    setReceiptImage(cleanValues.receiptImage ?? []);
    setCurrentReceiptImageValue("");
    setTax(cleanValues.tax);
    setPaymentMethod(cleanValues.paymentMethod);
    setComment(cleanValues.comment);
    setErrors({});
  };
  const [receiptRecord, setReceiptRecord] = React.useState(receipt);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Receipt, idProp) : receipt;
      setReceiptRecord(record);
    };
    queryData();
  }, [idProp, receipt]);
  React.useEffect(resetStateValues, [receiptRecord]);
  const [currentReceiptImageValue, setCurrentReceiptImageValue] =
    React.useState("");
  const receiptImageRef = React.createRef();
  const validations = {
    userId: [],
    created: [],
    updated: [],
    dateOfPurchase: [],
    placeOfPurchase: [],
    receiptNumber: [],
    class: [],
    price: [],
    currency: [],
    receiptImage: [],
    tax: [],
    paymentMethod: [],
    comment: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hour12: false,
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          userId,
          created,
          updated,
          dateOfPurchase,
          placeOfPurchase,
          receiptNumber,
          class: class1,
          price,
          currency,
          receiptImage,
          tax,
          paymentMethod,
          comment,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Receipt.copyOf(receiptRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ReceiptUpdateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              created,
              updated,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber,
              class: class1,
              price,
              currency,
              receiptImage,
              tax,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
      ></TextField>
      <TextField
        label="Created"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={created && convertToLocal(new Date(created))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              userId,
              created: value,
              updated,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber,
              class: class1,
              price,
              currency,
              receiptImage,
              tax,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.created ?? value;
          }
          if (errors.created?.hasError) {
            runValidationTasks("created", value);
          }
          setCreated(value);
        }}
        onBlur={() => runValidationTasks("created", created)}
        errorMessage={errors.created?.errorMessage}
        hasError={errors.created?.hasError}
        {...getOverrideProps(overrides, "created")}
      ></TextField>
      <TextField
        label="Updated"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={updated && convertToLocal(new Date(updated))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated: value,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber,
              class: class1,
              price,
              currency,
              receiptImage,
              tax,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.updated ?? value;
          }
          if (errors.updated?.hasError) {
            runValidationTasks("updated", value);
          }
          setUpdated(value);
        }}
        onBlur={() => runValidationTasks("updated", updated)}
        errorMessage={errors.updated?.errorMessage}
        hasError={errors.updated?.hasError}
        {...getOverrideProps(overrides, "updated")}
      ></TextField>
      <TextField
        label="Date of purchase"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={dateOfPurchase && convertToLocal(new Date(dateOfPurchase))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              dateOfPurchase: value,
              placeOfPurchase,
              receiptNumber,
              class: class1,
              price,
              currency,
              receiptImage,
              tax,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.dateOfPurchase ?? value;
          }
          if (errors.dateOfPurchase?.hasError) {
            runValidationTasks("dateOfPurchase", value);
          }
          setDateOfPurchase(value);
        }}
        onBlur={() => runValidationTasks("dateOfPurchase", dateOfPurchase)}
        errorMessage={errors.dateOfPurchase?.errorMessage}
        hasError={errors.dateOfPurchase?.hasError}
        {...getOverrideProps(overrides, "dateOfPurchase")}
      ></TextField>
      <TextField
        label="Place of purchase"
        isRequired={false}
        isReadOnly={false}
        value={placeOfPurchase}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              dateOfPurchase,
              placeOfPurchase: value,
              receiptNumber,
              class: class1,
              price,
              currency,
              receiptImage,
              tax,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.placeOfPurchase ?? value;
          }
          if (errors.placeOfPurchase?.hasError) {
            runValidationTasks("placeOfPurchase", value);
          }
          setPlaceOfPurchase(value);
        }}
        onBlur={() => runValidationTasks("placeOfPurchase", placeOfPurchase)}
        errorMessage={errors.placeOfPurchase?.errorMessage}
        hasError={errors.placeOfPurchase?.hasError}
        {...getOverrideProps(overrides, "placeOfPurchase")}
      ></TextField>
      <TextField
        label="Receipt number"
        isRequired={false}
        isReadOnly={false}
        value={receiptNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber: value,
              class: class1,
              price,
              currency,
              receiptImage,
              tax,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.receiptNumber ?? value;
          }
          if (errors.receiptNumber?.hasError) {
            runValidationTasks("receiptNumber", value);
          }
          setReceiptNumber(value);
        }}
        onBlur={() => runValidationTasks("receiptNumber", receiptNumber)}
        errorMessage={errors.receiptNumber?.errorMessage}
        hasError={errors.receiptNumber?.hasError}
        {...getOverrideProps(overrides, "receiptNumber")}
      ></TextField>
      <SelectField
        label="Class"
        placeholder="Please select an option"
        isDisabled={false}
        value={class1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber,
              class: value,
              price,
              currency,
              receiptImage,
              tax,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.class ?? value;
          }
          if (errors.class?.hasError) {
            runValidationTasks("class", value);
          }
          setClass1(value);
        }}
        onBlur={() => runValidationTasks("class", class1)}
        errorMessage={errors.class?.errorMessage}
        hasError={errors.class?.hasError}
        {...getOverrideProps(overrides, "class")}
      >
        <option
          children="Administrativeservice"
          value="ADMINISTRATIVESERVICE"
          {...getOverrideProps(overrides, "classoption0")}
        ></option>
        <option
          children="Itdeviceandsoftwareexpenses"
          value="ITDEVICEANDSOFTWAREEXPENSES"
          {...getOverrideProps(overrides, "classoption1")}
        ></option>
        <option
          children="Marketingexpenses"
          value="MARKETINGEXPENSES"
          {...getOverrideProps(overrides, "classoption2")}
        ></option>
        <option
          children="Meetingexpenses"
          value="MEETINGEXPENSES"
          {...getOverrideProps(overrides, "classoption3")}
        ></option>
        <option
          children="Premisesexpenses"
          value="PREMISESEXPENSES"
          {...getOverrideProps(overrides, "classoption4")}
        ></option>
        <option
          children="Travelexpenses"
          value="TRAVELEXPENSES"
          {...getOverrideProps(overrides, "classoption5")}
        ></option>
        <option
          children="Vehicleexpenses"
          value="VEHICLEEXPENSES"
          {...getOverrideProps(overrides, "classoption6")}
        ></option>
      </SelectField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber,
              class: class1,
              price: value,
              currency,
              receiptImage,
              tax,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <SelectField
        label="Currency"
        placeholder="Please select an option"
        isDisabled={false}
        value={currency}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber,
              class: class1,
              price,
              currency: value,
              receiptImage,
              tax,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.currency ?? value;
          }
          if (errors.currency?.hasError) {
            runValidationTasks("currency", value);
          }
          setCurrency(value);
        }}
        onBlur={() => runValidationTasks("currency", currency)}
        errorMessage={errors.currency?.errorMessage}
        hasError={errors.currency?.hasError}
        {...getOverrideProps(overrides, "currency")}
      >
        <option
          children="Eur"
          value="EUR"
          {...getOverrideProps(overrides, "currencyoption0")}
        ></option>
        <option
          children="Usd"
          value="USD"
          {...getOverrideProps(overrides, "currencyoption1")}
        ></option>
        <option
          children="Gbp"
          value="GBP"
          {...getOverrideProps(overrides, "currencyoption2")}
        ></option>
        <option
          children="Chf"
          value="CHF"
          {...getOverrideProps(overrides, "currencyoption3")}
        ></option>
        <option
          children="Sek"
          value="SEK"
          {...getOverrideProps(overrides, "currencyoption4")}
        ></option>
        <option
          children="Nok"
          value="NOK"
          {...getOverrideProps(overrides, "currencyoption5")}
        ></option>
      </SelectField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber,
              class: class1,
              price,
              currency,
              receiptImage: values,
              tax,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            values = result?.receiptImage ?? values;
          }
          setReceiptImage(values);
          setCurrentReceiptImageValue("");
        }}
        currentFieldValue={currentReceiptImageValue}
        label={"Receipt image"}
        items={receiptImage}
        hasError={errors.receiptImage?.hasError}
        setFieldValue={setCurrentReceiptImageValue}
        inputFieldRef={receiptImageRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Receipt image"
          isRequired={false}
          isReadOnly={false}
          value={currentReceiptImageValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.receiptImage?.hasError) {
              runValidationTasks("receiptImage", value);
            }
            setCurrentReceiptImageValue(value);
          }}
          onBlur={() =>
            runValidationTasks("receiptImage", currentReceiptImageValue)
          }
          errorMessage={errors.receiptImage?.errorMessage}
          hasError={errors.receiptImage?.hasError}
          ref={receiptImageRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "receiptImage")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Tax"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={tax}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber,
              class: class1,
              price,
              currency,
              receiptImage,
              tax: value,
              paymentMethod,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.tax ?? value;
          }
          if (errors.tax?.hasError) {
            runValidationTasks("tax", value);
          }
          setTax(value);
        }}
        onBlur={() => runValidationTasks("tax", tax)}
        errorMessage={errors.tax?.errorMessage}
        hasError={errors.tax?.hasError}
        {...getOverrideProps(overrides, "tax")}
      ></TextField>
      <SelectField
        label="Payment method"
        placeholder="Please select an option"
        isDisabled={false}
        value={paymentMethod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber,
              class: class1,
              price,
              currency,
              receiptImage,
              tax,
              paymentMethod: value,
              comment,
            };
            const result = onChange(modelFields);
            value = result?.paymentMethod ?? value;
          }
          if (errors.paymentMethod?.hasError) {
            runValidationTasks("paymentMethod", value);
          }
          setPaymentMethod(value);
        }}
        onBlur={() => runValidationTasks("paymentMethod", paymentMethod)}
        errorMessage={errors.paymentMethod?.errorMessage}
        hasError={errors.paymentMethod?.hasError}
        {...getOverrideProps(overrides, "paymentMethod")}
      >
        <option
          children="Cash"
          value="CASH"
          {...getOverrideProps(overrides, "paymentMethodoption0")}
        ></option>
        <option
          children="Owncard"
          value="OWNCARD"
          {...getOverrideProps(overrides, "paymentMethodoption1")}
        ></option>
        <option
          children="Companycard"
          value="COMPANYCARD"
          {...getOverrideProps(overrides, "paymentMethodoption2")}
        ></option>
        <option
          children="Banktransfer"
          value="BANKTRANSFER"
          {...getOverrideProps(overrides, "paymentMethodoption3")}
        ></option>
        <option
          children="Other"
          value="OTHER"
          {...getOverrideProps(overrides, "paymentMethodoption4")}
        ></option>
      </SelectField>
      <TextField
        label="Comment"
        isRequired={false}
        isReadOnly={false}
        value={comment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              dateOfPurchase,
              placeOfPurchase,
              receiptNumber,
              class: class1,
              price,
              currency,
              receiptImage,
              tax,
              paymentMethod,
              comment: value,
            };
            const result = onChange(modelFields);
            value = result?.comment ?? value;
          }
          if (errors.comment?.hasError) {
            runValidationTasks("comment", value);
          }
          setComment(value);
        }}
        onBlur={() => runValidationTasks("comment", comment)}
        errorMessage={errors.comment?.errorMessage}
        hasError={errors.comment?.hasError}
        {...getOverrideProps(overrides, "comment")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || receipt)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || receipt) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
