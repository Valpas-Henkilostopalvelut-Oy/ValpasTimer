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
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Worktravel } from "../models";
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
export default function WorktravelUpdateForm(props) {
  const {
    id: idProp,
    worktravel,
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
    title: "",
    comment: "",
    departureDateTime: "",
    returnDateTime: "",
    routeCar: "",
    attachments: [],
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [created, setCreated] = React.useState(initialValues.created);
  const [updated, setUpdated] = React.useState(initialValues.updated);
  const [title, setTitle] = React.useState(initialValues.title);
  const [comment, setComment] = React.useState(initialValues.comment);
  const [departureDateTime, setDepartureDateTime] = React.useState(
    initialValues.departureDateTime
  );
  const [returnDateTime, setReturnDateTime] = React.useState(
    initialValues.returnDateTime
  );
  const [routeCar, setRouteCar] = React.useState(initialValues.routeCar);
  const [attachments, setAttachments] = React.useState(
    initialValues.attachments
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = worktravelRecord
      ? { ...initialValues, ...worktravelRecord }
      : initialValues;
    setUserId(cleanValues.userId);
    setCreated(cleanValues.created);
    setUpdated(cleanValues.updated);
    setTitle(cleanValues.title);
    setComment(cleanValues.comment);
    setDepartureDateTime(cleanValues.departureDateTime);
    setReturnDateTime(cleanValues.returnDateTime);
    setRouteCar(cleanValues.routeCar);
    setAttachments(cleanValues.attachments ?? []);
    setCurrentAttachmentsValue("");
    setErrors({});
  };
  const [worktravelRecord, setWorktravelRecord] = React.useState(worktravel);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Worktravel, idProp)
        : worktravel;
      setWorktravelRecord(record);
    };
    queryData();
  }, [idProp, worktravel]);
  React.useEffect(resetStateValues, [worktravelRecord]);
  const [currentAttachmentsValue, setCurrentAttachmentsValue] =
    React.useState("");
  const attachmentsRef = React.createRef();
  const validations = {
    userId: [],
    created: [],
    updated: [],
    title: [],
    comment: [],
    departureDateTime: [],
    returnDateTime: [],
    routeCar: [],
    attachments: [],
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
          title,
          comment,
          departureDateTime,
          returnDateTime,
          routeCar,
          attachments,
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
            Worktravel.copyOf(worktravelRecord, (updated) => {
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
      {...getOverrideProps(overrides, "WorktravelUpdateForm")}
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
              title,
              comment,
              departureDateTime,
              returnDateTime,
              routeCar,
              attachments,
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
              title,
              comment,
              departureDateTime,
              returnDateTime,
              routeCar,
              attachments,
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
              title,
              comment,
              departureDateTime,
              returnDateTime,
              routeCar,
              attachments,
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
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              title: value,
              comment,
              departureDateTime,
              returnDateTime,
              routeCar,
              attachments,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
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
              title,
              comment: value,
              departureDateTime,
              returnDateTime,
              routeCar,
              attachments,
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
      <TextField
        label="Departure date time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={departureDateTime && convertToLocal(new Date(departureDateTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              title,
              comment,
              departureDateTime: value,
              returnDateTime,
              routeCar,
              attachments,
            };
            const result = onChange(modelFields);
            value = result?.departureDateTime ?? value;
          }
          if (errors.departureDateTime?.hasError) {
            runValidationTasks("departureDateTime", value);
          }
          setDepartureDateTime(value);
        }}
        onBlur={() =>
          runValidationTasks("departureDateTime", departureDateTime)
        }
        errorMessage={errors.departureDateTime?.errorMessage}
        hasError={errors.departureDateTime?.hasError}
        {...getOverrideProps(overrides, "departureDateTime")}
      ></TextField>
      <TextField
        label="Return date time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={returnDateTime && convertToLocal(new Date(returnDateTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              title,
              comment,
              departureDateTime,
              returnDateTime: value,
              routeCar,
              attachments,
            };
            const result = onChange(modelFields);
            value = result?.returnDateTime ?? value;
          }
          if (errors.returnDateTime?.hasError) {
            runValidationTasks("returnDateTime", value);
          }
          setReturnDateTime(value);
        }}
        onBlur={() => runValidationTasks("returnDateTime", returnDateTime)}
        errorMessage={errors.returnDateTime?.errorMessage}
        hasError={errors.returnDateTime?.hasError}
        {...getOverrideProps(overrides, "returnDateTime")}
      ></TextField>
      <TextField
        label="Route car"
        isRequired={false}
        isReadOnly={false}
        value={routeCar}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              title,
              comment,
              departureDateTime,
              returnDateTime,
              routeCar: value,
              attachments,
            };
            const result = onChange(modelFields);
            value = result?.routeCar ?? value;
          }
          if (errors.routeCar?.hasError) {
            runValidationTasks("routeCar", value);
          }
          setRouteCar(value);
        }}
        onBlur={() => runValidationTasks("routeCar", routeCar)}
        errorMessage={errors.routeCar?.errorMessage}
        hasError={errors.routeCar?.hasError}
        {...getOverrideProps(overrides, "routeCar")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              created,
              updated,
              title,
              comment,
              departureDateTime,
              returnDateTime,
              routeCar,
              attachments: values,
            };
            const result = onChange(modelFields);
            values = result?.attachments ?? values;
          }
          setAttachments(values);
          setCurrentAttachmentsValue("");
        }}
        currentFieldValue={currentAttachmentsValue}
        label={"Attachments"}
        items={attachments}
        hasError={errors.attachments?.hasError}
        setFieldValue={setCurrentAttachmentsValue}
        inputFieldRef={attachmentsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Attachments"
          isRequired={false}
          isReadOnly={false}
          value={currentAttachmentsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.attachments?.hasError) {
              runValidationTasks("attachments", value);
            }
            setCurrentAttachmentsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("attachments", currentAttachmentsValue)
          }
          errorMessage={errors.attachments?.errorMessage}
          hasError={errors.attachments?.hasError}
          ref={attachmentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "attachments")}
        ></TextField>
      </ArrayField>
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
          isDisabled={!(idProp || worktravel)}
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
              !(idProp || worktravel) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
