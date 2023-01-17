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
export declare type AllWorkSpacesCreateFormInputValues = {
    imageUrl?: string;
    name?: string;
    workers?: string[];
    adminId?: string[];
};
export declare type AllWorkSpacesCreateFormValidationValues = {
    imageUrl?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    workers?: ValidationFunction<string>;
    adminId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AllWorkSpacesCreateFormOverridesProps = {
    AllWorkSpacesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    imageUrl?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    workers?: PrimitiveOverrideProps<TextFieldProps>;
    adminId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AllWorkSpacesCreateFormProps = React.PropsWithChildren<{
    overrides?: AllWorkSpacesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AllWorkSpacesCreateFormInputValues) => AllWorkSpacesCreateFormInputValues;
    onSuccess?: (fields: AllWorkSpacesCreateFormInputValues) => void;
    onError?: (fields: AllWorkSpacesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AllWorkSpacesCreateFormInputValues) => AllWorkSpacesCreateFormInputValues;
    onValidate?: AllWorkSpacesCreateFormValidationValues;
} & React.CSSProperties>;
export default function AllWorkSpacesCreateForm(props: AllWorkSpacesCreateFormProps): React.ReactElement;
