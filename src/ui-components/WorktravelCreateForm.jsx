/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Worktravel } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function WorktravelCreateForm(props) {
  const {
    clearOnSuccess = true,
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
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUserId(initialValues.userId);
    setCreated(initialValues.created);
    setUpdated(initialValues.updated);
    setTitle(initialValues.title);
    setComment(initialValues.comment);
    setDepartureDateTime(initialValues.departureDateTime);
    setReturnDateTime(initialValues.returnDateTime);
    setRouteCar(initialValues.routeCar);
    setErrors({});
  };
  const validations = {
    userId: [],
    created: [],
    updated: [],
    title: [],
    comment: [],
    departureDateTime: [],
    returnDateTime: [],
    routeCar: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
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
      hourCycle: "h23",
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
          await DataStore.save(new Worktravel(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "WorktravelCreateForm")}
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
