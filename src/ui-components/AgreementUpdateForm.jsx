/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Agreement } from "../models";
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
export default function AgreementUpdateForm(props) {
  const {
    id,
    agreement,
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
    name: undefined,
    workers: [],
    client: [],
    createdAt: undefined,
    userId: undefined,
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
    const cleanValues = { ...initialValues, ...agreementRecord };
    setName(cleanValues.name);
    setWorkers(cleanValues.workers ?? []);
    setCurrentWorkersValue(undefined);
    setClient(cleanValues.client ?? []);
    setCurrentClientValue(undefined);
    setCreatedAt(cleanValues.createdAt);
    setUserId(cleanValues.userId);
    setWorkspaceId(cleanValues.workspaceId ?? []);
    setCurrentWorkspaceIdValue(undefined);
    setErrors({});
  };
  const [agreementRecord, setAgreementRecord] = React.useState(agreement);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Agreement, id) : agreement;
      setAgreementRecord(record);
    };
    queryData();
  }, [id, agreement]);
  React.useEffect(resetStateValues, [agreementRecord]);
  const [currentWorkersValue, setCurrentWorkersValue] =
    React.useState(undefined);
  const workersRef = React.createRef();
  const [currentClientValue, setCurrentClientValue] = React.useState(undefined);
  const clientRef = React.createRef();
  const [currentWorkspaceIdValue, setCurrentWorkspaceIdValue] =
    React.useState(undefined);
  const workspaceIdRef = React.createRef();
  const validations = {
    name: [],
    workers: [],
    client: [],
    createdAt: [],
    userId: [],
    workspaceId: [],
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
          await DataStore.save(
            Agreement.copyOf(agreementRecord, (updated) => {
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
      {...getOverrideProps(overrides, "AgreementUpdateForm")}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        defaultValue={name}
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
          setCurrentWorkersValue(undefined);
        }}
        currentFieldValue={currentWorkersValue}
        label={"Workers"}
        items={workers}
        hasError={errors.workers?.hasError}
        setFieldValue={setCurrentWorkersValue}
        inputFieldRef={workersRef}
        defaultFieldValue={undefined}
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
          setCurrentClientValue(undefined);
        }}
        currentFieldValue={currentClientValue}
        label={"Client"}
        items={client}
        hasError={errors.client?.hasError}
        setFieldValue={setCurrentClientValue}
        inputFieldRef={clientRef}
        defaultFieldValue={undefined}
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
          {...getOverrideProps(overrides, "client")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        defaultValue={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let { value } = e.target;
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
          setCreatedAt(new Date(value).toISOString());
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
        defaultValue={userId}
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
          setCurrentWorkspaceIdValue(undefined);
        }}
        currentFieldValue={currentWorkspaceIdValue}
        label={"Workspace id"}
        items={workspaceId}
        hasError={errors.workspaceId?.hasError}
        setFieldValue={setCurrentWorkspaceIdValue}
        inputFieldRef={workspaceIdRef}
        defaultFieldValue={undefined}
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
          {...getOverrideProps(overrides, "workspaceId")}
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
