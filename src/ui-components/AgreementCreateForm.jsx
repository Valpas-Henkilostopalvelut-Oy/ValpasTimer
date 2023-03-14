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
import { Agreement } from "../models";
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
export default function AgreementCreateForm(props) {
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
    name: "",
    workers: [],
    client: [],
    createdAt: "",
    userId: "",
    workspaceId: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [workers, setWorkers] = React.useState(initialValues.workers);
  const [client, setClient] = React.useState(initialValues.client);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [workspaceId, setWorkspaceId] = React.useState(
    initialValues.workspaceId
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setWorkers(initialValues.workers);
    setCurrentWorkersValue("");
    setClient(initialValues.client);
    setCurrentClientValue("");
    setCreatedAt(initialValues.createdAt);
    setUserId(initialValues.userId);
    setWorkspaceId(initialValues.workspaceId);
    setCurrentWorkspaceIdValue("");
    setErrors({});
  };
  const [currentWorkersValue, setCurrentWorkersValue] = React.useState("");
  const workersRef = React.createRef();
  const [currentClientValue, setCurrentClientValue] = React.useState("");
  const clientRef = React.createRef();
  const [currentWorkspaceIdValue, setCurrentWorkspaceIdValue] =
    React.useState("");
  const workspaceIdRef = React.createRef();
  const validations = {
    name: [],
    workers: [],
    client: [],
    createdAt: [],
    userId: [],
    workspaceId: [],
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
          name,
          workers,
          client,
          createdAt,
          userId,
          workspaceId,
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
          await DataStore.save(new Agreement(modelFields));
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
      {...getOverrideProps(overrides, "AgreementCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              workers,
              client,
              createdAt,
              userId,
              workspaceId,
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
              name,
              workers: values,
              client,
              createdAt,
              userId,
              workspaceId,
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
              name,
              workers,
              client: values,
              createdAt,
              userId,
              workspaceId,
            };
            const result = onChange(modelFields);
            values = result?.client ?? values;
          }
          setClient(values);
          setCurrentClientValue("");
        }}
        currentFieldValue={currentClientValue}
        label={"Client"}
        items={client}
        hasError={errors?.client?.hasError}
        errorMessage={errors?.client?.errorMessage}
        setFieldValue={setCurrentClientValue}
        inputFieldRef={clientRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Client"
          isRequired={false}
          isReadOnly={false}
          value={currentClientValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.client?.hasError) {
              runValidationTasks("client", value);
            }
            setCurrentClientValue(value);
          }}
          onBlur={() => runValidationTasks("client", currentClientValue)}
          errorMessage={errors.client?.errorMessage}
          hasError={errors.client?.hasError}
          ref={clientRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "client")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              workers,
              client,
              createdAt: value,
              userId,
              workspaceId,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
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
              name,
              workers,
              client,
              createdAt,
              userId: value,
              workspaceId,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              workers,
              client,
              createdAt,
              userId,
              workspaceId: values,
            };
            const result = onChange(modelFields);
            values = result?.workspaceId ?? values;
          }
          setWorkspaceId(values);
          setCurrentWorkspaceIdValue("");
        }}
        currentFieldValue={currentWorkspaceIdValue}
        label={"Workspace id"}
        items={workspaceId}
        hasError={errors?.workspaceId?.hasError}
        errorMessage={errors?.workspaceId?.errorMessage}
        setFieldValue={setCurrentWorkspaceIdValue}
        inputFieldRef={workspaceIdRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Workspace id"
          isRequired={false}
          isReadOnly={false}
          value={currentWorkspaceIdValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.workspaceId?.hasError) {
              runValidationTasks("workspaceId", value);
            }
            setCurrentWorkspaceIdValue(value);
          }}
          onBlur={() =>
            runValidationTasks("workspaceId", currentWorkspaceIdValue)
          }
          errorMessage={errors.workspaceId?.errorMessage}
          hasError={errors.workspaceId?.hasError}
          ref={workspaceIdRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "workspaceId")}
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
