/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { UserCredentials } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
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
export default function UserCredentialsUpdateForm(props) {
  const {
    id,
    userCredentials,
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
    userId: undefined,
    activeTimeEntry: undefined,
    status: undefined,
    defaultWorkspace: undefined,
    formChecked: [],
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [activeTimeEntry, setActiveTimeEntry] = React.useState(
    initialValues.activeTimeEntry
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [defaultWorkspace, setDefaultWorkspace] = React.useState(
    initialValues.defaultWorkspace
  );
  const [formChecked, setFormChecked] = React.useState(
    initialValues.formChecked
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...userCredentialsRecord };
    setUserId(cleanValues.userId);
    setActiveTimeEntry(cleanValues.activeTimeEntry);
    setStatus(cleanValues.status);
    setDefaultWorkspace(cleanValues.defaultWorkspace);
    setFormChecked(cleanValues.formChecked ?? []);
    setCurrentFormCheckedValue(undefined);
    setErrors({});
  };
  const [userCredentialsRecord, setUserCredentialsRecord] =
    React.useState(userCredentials);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id
        ? await DataStore.query(UserCredentials, id)
        : userCredentials;
      setUserCredentialsRecord(record);
    };
    queryData();
  }, [id, userCredentials]);
  React.useEffect(resetStateValues, [userCredentialsRecord]);
  const [currentFormCheckedValue, setCurrentFormCheckedValue] =
    React.useState(undefined);
  const formCheckedRef = React.createRef();
  const validations = {
    userId: [],
    activeTimeEntry: [],
    status: [],
    defaultWorkspace: [],
    formChecked: [],
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
          userId,
          activeTimeEntry,
          status,
          defaultWorkspace,
          formChecked,
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
            UserCredentials.copyOf(userCredentialsRecord, (updated) => {
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
      {...getOverrideProps(overrides, "UserCredentialsUpdateForm")}
    >
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        defaultValue={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              activeTimeEntry,
              status,
              defaultWorkspace,
              formChecked,
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
        label="Active time entry"
        isRequired={false}
        isReadOnly={false}
        defaultValue={activeTimeEntry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              activeTimeEntry: value,
              status,
              defaultWorkspace,
              formChecked,
            };
            const result = onChange(modelFields);
            value = result?.activeTimeEntry ?? value;
          }
          if (errors.activeTimeEntry?.hasError) {
            runValidationTasks("activeTimeEntry", value);
          }
          setActiveTimeEntry(value);
        }}
        onBlur={() => runValidationTasks("activeTimeEntry", activeTimeEntry)}
        errorMessage={errors.activeTimeEntry?.errorMessage}
        hasError={errors.activeTimeEntry?.hasError}
        {...getOverrideProps(overrides, "activeTimeEntry")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        defaultValue={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              activeTimeEntry,
              status: value,
              defaultWorkspace,
              formChecked,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Default workspace"
        isRequired={false}
        isReadOnly={false}
        defaultValue={defaultWorkspace}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              activeTimeEntry,
              status,
              defaultWorkspace: value,
              formChecked,
            };
            const result = onChange(modelFields);
            value = result?.defaultWorkspace ?? value;
          }
          if (errors.defaultWorkspace?.hasError) {
            runValidationTasks("defaultWorkspace", value);
          }
          setDefaultWorkspace(value);
        }}
        onBlur={() => runValidationTasks("defaultWorkspace", defaultWorkspace)}
        errorMessage={errors.defaultWorkspace?.errorMessage}
        hasError={errors.defaultWorkspace?.hasError}
        {...getOverrideProps(overrides, "defaultWorkspace")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              activeTimeEntry,
              status,
              defaultWorkspace,
              formChecked: values,
            };
            const result = onChange(modelFields);
            values = result?.formChecked ?? values;
          }
          setFormChecked(values);
          setCurrentFormCheckedValue(undefined);
        }}
        currentFieldValue={currentFormCheckedValue}
        label={"Form checked"}
        items={formChecked}
        hasError={errors.formChecked?.hasError}
        setFieldValue={setCurrentFormCheckedValue}
        inputFieldRef={formCheckedRef}
        defaultFieldValue={undefined}
      >
        <TextField
          label="Form checked"
          isRequired={false}
          isReadOnly={false}
          value={currentFormCheckedValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.formChecked?.hasError) {
              runValidationTasks("formChecked", value);
            }
            setCurrentFormCheckedValue(value);
          }}
          onBlur={() =>
            runValidationTasks("formChecked", currentFormCheckedValue)
          }
          errorMessage={errors.formChecked?.errorMessage}
          hasError={errors.formChecked?.hasError}
          ref={formCheckedRef}
          {...getOverrideProps(overrides, "formChecked")}
        ></TextField>
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
