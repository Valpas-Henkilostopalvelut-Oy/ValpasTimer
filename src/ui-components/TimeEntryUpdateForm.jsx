/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { TimeEntry } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function TimeEntryUpdateForm(props) {
  const {
    id,
    timeEntry,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    description: undefined,
    userId: undefined,
    workspaceId: undefined,
    isActive: false,
    isLocked: false,
    isSent: false,
    isConfirmed: false,
    isPaused: false,
    pauseStart: undefined,
    nextEntry: undefined,
    lastEntry: undefined,
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
  const [isSent, setIsSent] = React.useState(initialValues.isSent);
  const [isConfirmed, setIsConfirmed] = React.useState(
    initialValues.isConfirmed
  );
  const [isPaused, setIsPaused] = React.useState(initialValues.isPaused);
  const [pauseStart, setPauseStart] = React.useState(initialValues.pauseStart);
  const [nextEntry, setNextEntry] = React.useState(initialValues.nextEntry);
  const [lastEntry, setLastEntry] = React.useState(initialValues.lastEntry);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...timeEntryRecord };
    setDescription(cleanValues.description);
    setUserId(cleanValues.userId);
    setWorkspaceId(cleanValues.workspaceId);
    setIsActive(cleanValues.isActive);
    setIsLocked(cleanValues.isLocked);
    setIsSent(cleanValues.isSent);
    setIsConfirmed(cleanValues.isConfirmed);
    setIsPaused(cleanValues.isPaused);
    setPauseStart(cleanValues.pauseStart);
    setNextEntry(cleanValues.nextEntry);
    setLastEntry(cleanValues.lastEntry);
    setErrors({});
  };
  const [timeEntryRecord, setTimeEntryRecord] = React.useState(timeEntry);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(TimeEntry, id) : timeEntry;
      setTimeEntryRecord(record);
    };
    queryData();
  }, [id, timeEntry]);
  React.useEffect(resetStateValues, [timeEntryRecord]);
  const validations = {
    description: [],
    userId: [],
    workspaceId: [],
    isActive: [],
    isLocked: [],
    isSent: [],
    isConfirmed: [],
    isPaused: [],
    pauseStart: [],
    nextEntry: [],
    lastEntry: [],
  };
  const runValidationTasks = async (fieldName, value) => {
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
          description,
          userId,
          workspaceId,
          isActive,
          isLocked,
          isSent,
          isConfirmed,
          isPaused,
          pauseStart,
          nextEntry,
          lastEntry,
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
          await DataStore.save(
            TimeEntry.copyOf(timeEntryRecord, (updated) => {
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
      {...rest}
      {...getOverrideProps(overrides, "TimeEntryUpdateForm")}
    >
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        defaultValue={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              description: value,
              userId,
              workspaceId,
              isActive,
              isLocked,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
              nextEntry,
              lastEntry,
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
        defaultValue={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              description,
              userId: value,
              workspaceId,
              isActive,
              isLocked,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
              nextEntry,
              lastEntry,
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
        defaultValue={workspaceId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId: value,
              isActive,
              isLocked,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
              nextEntry,
              lastEntry,
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
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
              nextEntry,
              lastEntry,
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
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
              nextEntry,
              lastEntry,
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
              isSent: value,
              isConfirmed,
              isPaused,
              pauseStart,
              nextEntry,
              lastEntry,
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
              isSent,
              isConfirmed: value,
              isPaused,
              pauseStart,
              nextEntry,
              lastEntry,
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
              isSent,
              isConfirmed,
              isPaused: value,
              pauseStart,
              nextEntry,
              lastEntry,
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
        defaultValue={pauseStart && convertToLocal(new Date(pauseStart))}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart: value,
              nextEntry,
              lastEntry,
            };
            const result = onChange(modelFields);
            value = result?.pauseStart ?? value;
          }
          if (errors.pauseStart?.hasError) {
            runValidationTasks("pauseStart", value);
          }
          setPauseStart(new Date(value).toISOString());
        }}
        onBlur={() => runValidationTasks("pauseStart", pauseStart)}
        errorMessage={errors.pauseStart?.errorMessage}
        hasError={errors.pauseStart?.hasError}
        {...getOverrideProps(overrides, "pauseStart")}
      ></TextField>
      <TextField
        label="Next entry"
        isRequired={false}
        isReadOnly={false}
        defaultValue={nextEntry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
              nextEntry: value,
              lastEntry,
            };
            const result = onChange(modelFields);
            value = result?.nextEntry ?? value;
          }
          if (errors.nextEntry?.hasError) {
            runValidationTasks("nextEntry", value);
          }
          setNextEntry(value);
        }}
        onBlur={() => runValidationTasks("nextEntry", nextEntry)}
        errorMessage={errors.nextEntry?.errorMessage}
        hasError={errors.nextEntry?.hasError}
        {...getOverrideProps(overrides, "nextEntry")}
      ></TextField>
      <TextField
        label="Last entry"
        isRequired={false}
        isReadOnly={false}
        defaultValue={lastEntry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked,
              isSent,
              isConfirmed,
              isPaused,
              pauseStart,
              nextEntry,
              lastEntry: value,
            };
            const result = onChange(modelFields);
            value = result?.lastEntry ?? value;
          }
          if (errors.lastEntry?.hasError) {
            runValidationTasks("lastEntry", value);
          }
          setLastEntry(value);
        }}
        onBlur={() => runValidationTasks("lastEntry", lastEntry)}
        errorMessage={errors.lastEntry?.errorMessage}
        hasError={errors.lastEntry?.hasError}
        {...getOverrideProps(overrides, "lastEntry")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
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
