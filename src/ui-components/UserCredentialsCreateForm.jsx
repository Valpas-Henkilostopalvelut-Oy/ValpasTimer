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
import { UserCredentials } from "../models";
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
export default function UserCredentialsCreateForm(props) {
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
    activeTimeEntry: "",
    status: undefined,
    defaultWorkspace: "",
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
    setUserId(initialValues.userId);
    setActiveTimeEntry(initialValues.activeTimeEntry);
    setStatus(initialValues.status);
    setDefaultWorkspace(initialValues.defaultWorkspace);
    setFormChecked(initialValues.formChecked);
    setCurrentFormCheckedValue("");
    setErrors({});
  };
  const [currentFormCheckedValue, setCurrentFormCheckedValue] =
    React.useState("");
  const formCheckedRef = React.createRef();
  const validations = {
    userId: [],
    activeTimeEntry: [],
    status: [],
    defaultWorkspace: [],
    formChecked: [],
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
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new UserCredentials(modelFields));
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
      {...getOverrideProps(overrides, "UserCredentialsCreateForm")}
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
        value={activeTimeEntry}
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
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
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
      >
        <option
          children="Active"
          value="ACTIVE"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Disabled"
          value="DISABLED"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Deleted"
          value="DELETED"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Default workspace"
        isRequired={false}
        isReadOnly={false}
        value={defaultWorkspace}
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
          setCurrentFormCheckedValue("");
        }}
        currentFieldValue={currentFormCheckedValue}
        label={"Form checked"}
        items={formChecked}
        hasError={errors.formChecked?.hasError}
        setFieldValue={setCurrentFormCheckedValue}
        inputFieldRef={formCheckedRef}
        defaultFieldValue={""}
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
          labelHidden={true}
          {...getOverrideProps(overrides, "formChecked")}
        ></TextField>
      </ArrayField>
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
