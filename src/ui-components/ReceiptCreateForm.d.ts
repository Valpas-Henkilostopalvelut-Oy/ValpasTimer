/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReceiptCreateFormInputValues = {
    userId?: string;
    created?: string;
    updated?: string;
    dateOfPurchase?: string;
    placeOfPurchase?: string;
    receiptNumber?: string;
    class?: string;
    price?: number;
    currency?: string;
    receiptImage?: string[];
    tax?: number;
    paymentMethod?: string;
    comment?: string;
    isTravel?: boolean;
};
export declare type ReceiptCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    created?: ValidationFunction<string>;
    updated?: ValidationFunction<string>;
    dateOfPurchase?: ValidationFunction<string>;
    placeOfPurchase?: ValidationFunction<string>;
    receiptNumber?: ValidationFunction<string>;
    class?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    currency?: ValidationFunction<string>;
    receiptImage?: ValidationFunction<string>;
    tax?: ValidationFunction<number>;
    paymentMethod?: ValidationFunction<string>;
    comment?: ValidationFunction<string>;
    isTravel?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReceiptCreateFormOverridesProps = {
    ReceiptCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    created?: PrimitiveOverrideProps<TextFieldProps>;
    updated?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfPurchase?: PrimitiveOverrideProps<TextFieldProps>;
    placeOfPurchase?: PrimitiveOverrideProps<TextFieldProps>;
    receiptNumber?: PrimitiveOverrideProps<TextFieldProps>;
    class?: PrimitiveOverrideProps<SelectFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    currency?: PrimitiveOverrideProps<SelectFieldProps>;
    receiptImage?: PrimitiveOverrideProps<TextFieldProps>;
    tax?: PrimitiveOverrideProps<TextFieldProps>;
    paymentMethod?: PrimitiveOverrideProps<SelectFieldProps>;
    comment?: PrimitiveOverrideProps<TextFieldProps>;
    isTravel?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ReceiptCreateFormProps = React.PropsWithChildren<{
    overrides?: ReceiptCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReceiptCreateFormInputValues) => ReceiptCreateFormInputValues;
    onSuccess?: (fields: ReceiptCreateFormInputValues) => void;
    onError?: (fields: ReceiptCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReceiptCreateFormInputValues) => ReceiptCreateFormInputValues;
    onValidate?: ReceiptCreateFormValidationValues;
} & React.CSSProperties>;
export default function ReceiptCreateForm(props: ReceiptCreateFormProps): React.ReactElement;
