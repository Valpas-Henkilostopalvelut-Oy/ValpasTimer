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
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
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
}) {
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
      (currentFieldValue !== undefined ||
        currentFieldValue !== null ||
        currentFieldValue !== "") &&
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
  return (
    <React.Fragment>
      {isEditing && children}
      {!isEditing ? (
        <>
          <Text>{label}</Text>
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
                {value.toString()}
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
}
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
    billable: false,
    breaks: [],
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
  const [billable, setBillable] = React.useState(initialValues.billable);
  const [breaks, setBreaks] = React.useState(initialValues.breaks);
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
    setBillable(cleanValues.billable);
    setBreaks(cleanValues.breaks ?? []);
    setCurrentBreaksValue(undefined);
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
  const [currentBreaksValue, setCurrentBreaksValue] = React.useState(undefined);
  const breaksRef = React.createRef();
  const validations = {
    description: [],
    userId: [],
    workspaceId: [],
    isActive: [],
    isLocked: [],
    isSent: [],
    isConfirmed: [],
    billable: [],
    breaks: [],
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
          billable,
          breaks,
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
              billable,
              breaks,
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
              billable,
              breaks,
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
              billable,
              breaks,
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
              billable,
              breaks,
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
              billable,
              breaks,
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
              billable,
              breaks,
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
              billable,
              breaks,
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
        label="Billable"
        defaultChecked={false}
        isDisabled={false}
        isChecked={billable}
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
              billable: value,
              breaks,
            };
            const result = onChange(modelFields);
            value = result?.billable ?? value;
          }
          if (errors.billable?.hasError) {
            runValidationTasks("billable", value);
          }
          setBillable(value);
        }}
        onBlur={() => runValidationTasks("billable", billable)}
        errorMessage={errors.billable?.errorMessage}
        hasError={errors.billable?.hasError}
        {...getOverrideProps(overrides, "billable")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              description,
              userId,
              workspaceId,
              isActive,
              isLocked,
              isSent,
              isConfirmed,
              billable,
              breaks: values,
            };
            const result = onChange(modelFields);
            values = result?.breaks ?? values;
          }
          setBreaks(values);
          setCurrentBreaksValue(undefined);
        }}
        currentFieldValue={currentBreaksValue}
        label={"Breaks"}
        items={breaks}
        hasError={errors.breaks?.hasError}
        setFieldValue={setCurrentBreaksValue}
        inputFieldRef={breaksRef}
        defaultFieldValue={undefined}
      >
        <SelectField
          label="Breaks"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentBreaksValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.breaks?.hasError) {
              runValidationTasks("breaks", value);
            }
            setCurrentBreaksValue(value);
          }}
          onBlur={() => runValidationTasks("breaks", currentBreaksValue)}
          errorMessage={errors.breaks?.errorMessage}
          hasError={errors.breaks?.hasError}
          ref={breaksRef}
          {...getOverrideProps(overrides, "breaks")}
        >
          <option
            children="Min15"
            value="MIN15"
            {...getOverrideProps(overrides, "breaksoption0")}
          ></option>
          <option
            children="Min30"
            value="MIN30"
            {...getOverrideProps(overrides, "breaksoption1")}
          ></option>
          <option
            children="Min45"
            value="MIN45"
            {...getOverrideProps(overrides, "breaksoption2")}
          ></option>
          <option
            children="H1"
            value="H1"
            {...getOverrideProps(overrides, "breaksoption3")}
          ></option>
        </SelectField>
      </ArrayField>
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
