/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { AllWorkSpaces } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AllWorkSpacesUpdateFormInputValues = {
    imageUrl?: string;
    name?: string;
    workers?: string[];
    adminId?: string[];
};
export declare type AllWorkSpacesUpdateFormValidationValues = {
    imageUrl?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    workers?: ValidationFunction<string>;
    adminId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AllWorkSpacesUpdateFormOverridesProps = {
    AllWorkSpacesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    imageUrl?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    workers?: PrimitiveOverrideProps<TextFieldProps>;
    adminId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AllWorkSpacesUpdateFormProps = React.PropsWithChildren<{
    overrides?: AllWorkSpacesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    allWorkSpaces?: AllWorkSpaces;
    onSubmit?: (fields: AllWorkSpacesUpdateFormInputValues) => AllWorkSpacesUpdateFormInputValues;
    onSuccess?: (fields: AllWorkSpacesUpdateFormInputValues) => void;
    onError?: (fields: AllWorkSpacesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AllWorkSpacesUpdateFormInputValues) => AllWorkSpacesUpdateFormInputValues;
    onValidate?: AllWorkSpacesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AllWorkSpacesUpdateForm(props: AllWorkSpacesUpdateFormProps): React.ReactElement;
