/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { TimeEntry } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TimeEntryCreateForm(props) {
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
    description: "",
    userId: "",
    workspaceId: "",
    isActive: false,
    isLocked: false,
    paidAt: "",
    confirmedAt: "",
    isSent: false,
    isConfirmed: false,
    isPaused: false,
    pauseStart: "",
  };
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [workspaceId, setWorkspaceId] = React.useState(
    initialValues.workspaceId
  );
  const [isActive, setIsActive] = React.useState(initialValues.isActive);
  const [isLocked, setIsLocked] = React.useState(initialValues.isLocked);
  const [paidAt, setPaidAt] = React.useState(initialValues.paidAt);
  const [confirmedAt, setConfirmedAt] = React.useState(
    initialValues.confirmedAt
  );
  const [isSent, setIsSent] = React.useState(initialValues.isSent);
  const [isConfirmed, setIsConfirmed] = React.useState(
    initialValues.isConfirmed
  );
  const [isPaused, setIsPaused] = React.useState(initialValues.isPaused);
  const [pauseStart, setPauseStart] = React.useState(initialValues.pauseStart);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDescription(initialValues.description);
    setUserId(initialValues.userId);
    setWorkspaceId(initialValues.workspaceId);
    setIsActive(initialValues.isActive);
    setIsLocked(initialValues.isLocked);
    setPaidAt(initialValues.paidAt);
    setConfirmedAt(initialValues.confirmedAt);
    setIsSent(initialValues.isSent);
    setIsConfirmed(initialValues.isConfirmed);
    setIsPaused(initialValues.isPaused);
    setPauseStart(initialValues.pauseStart);
    setErrors({});
  };
  const validations = {
    description: [],
    userId: [],
    workspaceId: [],
    isActive: [],
    isLocked: [],
    paidAt: [],
    confirmedAt: [],
    isSent: [],
    isConfirmed: [],
    isPaused: [],
    pauseStart: [],
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
          description,
          userId,
          workspaceId,
          isActive,
          isLocked,
          paidAt,
          confirmedAt,
          isSent,
          isConfirmed,
          isPaused,
          pauseStart,
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
          await DataStore.save(new TimeEntry(modelFields));
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
      {...getOverrideProps(overrides, "TimeEntryCreateForm")}
      {...rest}
    >
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              description: value,
              userId,
              workspaceId,
              isActive,
              isLocked,
              paidAt,
              confirmedAt,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              description,
              userId: value,
              workspaceId,
              isActive,
              isLocked,
              paidAt,
              confirmedAt,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
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
        label="Workspace id"
        isRequired={false}
        isReadOnly={false}
        value={workspaceId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId: value,
              isActive,
              isLocked,
              paidAt,
              confirmedAt,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
            };
            const result = onChange(modelFields);
            value = result?.workspaceId ?? value;
          }
          if (errors.workspaceId?.hasError) {
            runValidationTasks("workspaceId", value);
          }
          setWorkspaceId(value);
        }}
        onBlur={() => runValidationTasks("workspaceId", workspaceId)}
        errorMessage={errors.workspaceId?.errorMessage}
        hasError={errors.workspaceId?.hasError}
        {...getOverrideProps(overrides, "workspaceId")}
      ></TextField>
      <SwitchField
        label="Is active"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isActive}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive: value,
              isLocked,
              paidAt,
              confirmedAt,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
            };
            const result = onChange(modelFields);
            value = result?.isActive ?? value;
          }
          if (errors.isActive?.hasError) {
            runValidationTasks("isActive", value);
          }
          setIsActive(value);
        }}
        onBlur={() => runValidationTasks("isActive", isActive)}
        errorMessage={errors.isActive?.errorMessage}
        hasError={errors.isActive?.hasError}
        {...getOverrideProps(overrides, "isActive")}
      ></SwitchField>
      <SwitchField
        label="Is locked"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isLocked}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked: value,
              paidAt,
              confirmedAt,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
            };
            const result = onChange(modelFields);
            value = result?.isLocked ?? value;
          }
          if (errors.isLocked?.hasError) {
            runValidationTasks("isLocked", value);
          }
          setIsLocked(value);
        }}
        onBlur={() => runValidationTasks("isLocked", isLocked)}
        errorMessage={errors.isLocked?.errorMessage}
        hasError={errors.isLocked?.hasError}
        {...getOverrideProps(overrides, "isLocked")}
      ></SwitchField>
      <TextField
        label="Paid at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={paidAt && convertToLocal(new Date(paidAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked,
              paidAt: value,
              confirmedAt,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
            };
            const result = onChange(modelFields);
            value = result?.paidAt ?? value;
          }
          if (errors.paidAt?.hasError) {
            runValidationTasks("paidAt", value);
          }
          setPaidAt(value);
        }}
        onBlur={() => runValidationTasks("paidAt", paidAt)}
        errorMessage={errors.paidAt?.errorMessage}
        hasError={errors.paidAt?.hasError}
        {...getOverrideProps(overrides, "paidAt")}
      ></TextField>
      <TextField
        label="Confirmed at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={confirmedAt && convertToLocal(new Date(confirmedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked,
              paidAt,
              confirmedAt: value,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
            };
            const result = onChange(modelFields);
            value = result?.confirmedAt ?? value;
          }
          if (errors.confirmedAt?.hasError) {
            runValidationTasks("confirmedAt", value);
          }
          setConfirmedAt(value);
        }}
        onBlur={() => runValidationTasks("confirmedAt", confirmedAt)}
        errorMessage={errors.confirmedAt?.errorMessage}
        hasError={errors.confirmedAt?.hasError}
        {...getOverrideProps(overrides, "confirmedAt")}
      ></TextField>
      <SwitchField
        label="Is sent"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isSent}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked,
              paidAt,
              confirmedAt,
              isSent: value,
              isConfirmed,
              isPaused,
              pauseStart,
            };
            const result = onChange(modelFields);
            value = result?.isSent ?? value;
          }
          if (errors.isSent?.hasError) {
            runValidationTasks("isSent", value);
          }
          setIsSent(value);
        }}
        onBlur={() => runValidationTasks("isSent", isSent)}
        errorMessage={errors.isSent?.errorMessage}
        hasError={errors.isSent?.hasError}
        {...getOverrideProps(overrides, "isSent")}
      ></SwitchField>
      <SwitchField
        label="Is confirmed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isConfirmed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked,
              paidAt,
              confirmedAt,
              isSent,
              isConfirmed: value,
              isPaused,
              pauseStart,
            };
            const result = onChange(modelFields);
            value = result?.isConfirmed ?? value;
          }
          if (errors.isConfirmed?.hasError) {
            runValidationTasks("isConfirmed", value);
          }
          setIsConfirmed(value);
        }}
        onBlur={() => runValidationTasks("isConfirmed", isConfirmed)}
        errorMessage={errors.isConfirmed?.errorMessage}
        hasError={errors.isConfirmed?.hasError}
        {...getOverrideProps(overrides, "isConfirmed")}
      ></SwitchField>
      <SwitchField
        label="Is paused"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isPaused}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked,
              paidAt,
              confirmedAt,
              isSent,
              isConfirmed,
              isPaused: value,
              pauseStart,
            };
            const result = onChange(modelFields);
            value = result?.isPaused ?? value;
          }
          if (errors.isPaused?.hasError) {
            runValidationTasks("isPaused", value);
          }
          setIsPaused(value);
        }}
        onBlur={() => runValidationTasks("isPaused", isPaused)}
        errorMessage={errors.isPaused?.errorMessage}
        hasError={errors.isPaused?.hasError}
        {...getOverrideProps(overrides, "isPaused")}
      ></SwitchField>
      <TextField
        label="Pause start"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={pauseStart && convertToLocal(new Date(pauseStart))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked,
              paidAt,
              confirmedAt,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart: value,
            };
            const result = onChange(modelFields);
            value = result?.pauseStart ?? value;
          }
          if (errors.pauseStart?.hasError) {
            runValidationTasks("pauseStart", value);
          }
          setPauseStart(value);
        }}
        onBlur={() => runValidationTasks("pauseStart", pauseStart)}
        errorMessage={errors.pauseStart?.errorMessage}
        hasError={errors.pauseStart?.hasError}
        {...getOverrideProps(overrides, "pauseStart")}
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
