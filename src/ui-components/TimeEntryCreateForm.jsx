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
export default function TimeEntryCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    work: undefined,
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
  const [work, setWork] = React.useState(initialValues.work);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDescription(initialValues.description);
    setUserId(initialValues.userId);
    setWorkspaceId(initialValues.workspaceId);
    setIsActive(initialValues.isActive);
    setIsLocked(initialValues.isLocked);
    setIsSent(initialValues.isSent);
    setIsConfirmed(initialValues.isConfirmed);
    setIsPaused(initialValues.isPaused);
    setPauseStart(initialValues.pauseStart);
    setNextEntry(initialValues.nextEntry);
    setLastEntry(initialValues.lastEntry);
    setWork(initialValues.work);
    setErrors({});
  };
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
    work: [],
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
          work,
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
      {...rest}
      {...getOverrideProps(overrides, "TimeEntryCreateForm")}
    >
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
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
              work,
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
              work,
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
              work,
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
              work,
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
              work,
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
              work,
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
              work,
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
              work,
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
              work,
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
              work,
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
              work,
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
      <TextField
        label="Work"
        isRequired={false}
        isReadOnly={false}
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
              lastEntry,
              work: value,
            };
            const result = onChange(modelFields);
            value = result?.work ?? value;
          }
          if (errors.work?.hasError) {
            runValidationTasks("work", value);
          }
          setWork(value);
        }}
        onBlur={() => runValidationTasks("work", work)}
        errorMessage={errors.work?.errorMessage}
        hasError={errors.work?.hasError}
        {...getOverrideProps(overrides, "work")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ClearButton")}
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
