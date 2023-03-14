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
import { AllWorkSpaces } from "../models";
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
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
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
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
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
export default function AllWorkSpacesUpdateForm(props) {
  const {
    id: idProp,
    allWorkSpaces,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    imageUrl: "",
    name: "",
    workers: [],
    adminId: [],
  };
  const [imageUrl, setImageUrl] = React.useState(initialValues.imageUrl);
  const [name, setName] = React.useState(initialValues.name);
  const [workers, setWorkers] = React.useState(initialValues.workers);
  const [adminId, setAdminId] = React.useState(initialValues.adminId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = allWorkSpacesRecord
      ? { ...initialValues, ...allWorkSpacesRecord }
      : initialValues;
    setImageUrl(cleanValues.imageUrl);
    setName(cleanValues.name);
    setWorkers(cleanValues.workers ?? []);
    setCurrentWorkersValue("");
    setAdminId(cleanValues.adminId ?? []);
    setCurrentAdminIdValue("");
    setErrors({});
  };
  const [allWorkSpacesRecord, setAllWorkSpacesRecord] =
    React.useState(allWorkSpaces);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(AllWorkSpaces, idProp)
        : allWorkSpaces;
      setAllWorkSpacesRecord(record);
    };
    queryData();
  }, [idProp, allWorkSpaces]);
  React.useEffect(resetStateValues, [allWorkSpacesRecord]);
  const [currentWorkersValue, setCurrentWorkersValue] = React.useState("");
  const workersRef = React.createRef();
  const [currentAdminIdValue, setCurrentAdminIdValue] = React.useState("");
  const adminIdRef = React.createRef();
  const validations = {
    imageUrl: [{ type: "URL" }],
    name: [],
    workers: [],
    adminId: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          imageUrl,
          name,
          workers,
          adminId,
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
            AllWorkSpaces.copyOf(allWorkSpacesRecord, (updated) => {
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
      {...getOverrideProps(overrides, "AllWorkSpacesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Image url"
        isRequired={false}
        isReadOnly={false}
        value={imageUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imageUrl: value,
              name,
              workers,
              adminId,
            };
            const result = onChange(modelFields);
            value = result?.imageUrl ?? value;
          }
          if (errors.imageUrl?.hasError) {
            runValidationTasks("imageUrl", value);
          }
          setImageUrl(value);
        }}
        onBlur={() => runValidationTasks("imageUrl", imageUrl)}
        errorMessage={errors.imageUrl?.errorMessage}
        hasError={errors.imageUrl?.hasError}
        {...getOverrideProps(overrides, "imageUrl")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              imageUrl,
              name: value,
              workers,
              adminId,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              imageUrl,
              name,
              workers: values,
              adminId,
            };
            const result = onChange(modelFields);
            values = result?.workers ?? values;
          }
          setWorkers(values);
          setCurrentWorkersValue("");
        }}
        currentFieldValue={currentWorkersValue}
        label={"Workers"}
        items={workers}
        hasError={errors?.workers?.hasError}
        errorMessage={errors?.workers?.errorMessage}
        setFieldValue={setCurrentWorkersValue}
        inputFieldRef={workersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Workers"
          isRequired={false}
          isReadOnly={false}
          value={currentWorkersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.workers?.hasError) {
              runValidationTasks("workers", value);
            }
            setCurrentWorkersValue(value);
          }}
          onBlur={() => runValidationTasks("workers", currentWorkersValue)}
          errorMessage={errors.workers?.errorMessage}
          hasError={errors.workers?.hasError}
          ref={workersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "workers")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              imageUrl,
              name,
              workers,
              adminId: values,
            };
            const result = onChange(modelFields);
            values = result?.adminId ?? values;
          }
          setAdminId(values);
          setCurrentAdminIdValue("");
        }}
        currentFieldValue={currentAdminIdValue}
        label={"Admin id"}
        items={adminId}
        hasError={errors?.adminId?.hasError}
        errorMessage={errors?.adminId?.errorMessage}
        setFieldValue={setCurrentAdminIdValue}
        inputFieldRef={adminIdRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Admin id"
          isRequired={false}
          isReadOnly={false}
          value={currentAdminIdValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.adminId?.hasError) {
              runValidationTasks("adminId", value);
            }
            setCurrentAdminIdValue(value);
          }}
          onBlur={() => runValidationTasks("adminId", currentAdminIdValue)}
          errorMessage={errors.adminId?.errorMessage}
          hasError={errors.adminId?.hasError}
          ref={adminIdRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "adminId")}
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
          isDisabled={!(idProp || allWorkSpaces)}
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
              !(idProp || allWorkSpaces) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
