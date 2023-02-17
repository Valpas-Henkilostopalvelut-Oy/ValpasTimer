/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WorktravelCreateFormInputValues = {
    userId?: string;
    created?: string;
    updated?: string;
    title?: string;
    comment?: string;
    departureDateTime?: string;
    returnDateTime?: string;
    routeCar?: string;
};
export declare type WorktravelCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    created?: ValidationFunction<string>;
    updated?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    comment?: ValidationFunction<string>;
    departureDateTime?: ValidationFunction<string>;
    returnDateTime?: ValidationFunction<string>;
    routeCar?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorktravelCreateFormOverridesProps = {
    WorktravelCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    created?: PrimitiveOverrideProps<TextFieldProps>;
    updated?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    comment?: PrimitiveOverrideProps<TextFieldProps>;
    departureDateTime?: PrimitiveOverrideProps<TextFieldProps>;
    returnDateTime?: PrimitiveOverrideProps<TextFieldProps>;
    routeCar?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorktravelCreateFormProps = React.PropsWithChildren<{
    overrides?: WorktravelCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WorktravelCreateFormInputValues) => WorktravelCreateFormInputValues;
    onSuccess?: (fields: WorktravelCreateFormInputValues) => void;
    onError?: (fields: WorktravelCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorktravelCreateFormInputValues) => WorktravelCreateFormInputValues;
    onValidate?: WorktravelCreateFormValidationValues;
} & React.CSSProperties>;
export default function WorktravelCreateForm(props: WorktravelCreateFormProps): React.ReactElement;
