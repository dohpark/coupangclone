import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";
import Icon, { svgType } from "./Icon";

const Input: React.FC<InputProps> = ({
  svg,
  register,
  name,
  errors,
  label,
  placeholder,
  type,
}) => {
  // focused
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  // error
  const errorArr = errors
    ? Object.entries(errors).map(([type, message]) => {
        return [type, message];
      })
    : [];
  const errorExist = errorArr.length ? true : false;

  return (
    <>
      <Wrapper>
        {svg && (
          <IconWrapper error={errorExist} focused={focused} id="icon">
            <Icon svg={svg} height={22} width={22} />
          </IconWrapper>
        )}
        {label && <Label htmlFor={name}>{label}</Label>}
        <InputEl
          {...register}
          placeholder={placeholder}
          type={type}
          error={errorExist}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Wrapper>
      {errorExist &&
        errorArr.map(([type, message]) => (
          <ErrorTip key={type}>{message}</ErrorTip>
        ))}
    </>
  );
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  svg?: svgType;
  register: UseFormRegisterReturn;
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  errors?: object;
}

interface StyledInputProps {
  error: boolean;
}

interface StyledIconProps {
  focused: boolean;
  error: boolean;
}

const Wrapper = styled.div`
  display: flex;
`;

const IconWrapper = styled.div<StyledIconProps>`
  display: flex;
  width: 46px;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  border-right: 0px;

  ${({ error }) => {
    return error
      ? css`
          border-bottom: 2px solid red !important;
        `
      : "";
  }};

  ${({ focused }) => {
    return focused
      ? css`
          border-bottom: 2px solid blue;
        `
      : "";
  }};
`;

const InputEl = styled.input<StyledInputProps>`
  position: relative;
  width: 100%;
  height: 46px;
  padding: 10px 11px;
  border: 1px solid gray;
  font-size: 16px;
  outline: none;

  ::placeholder {
    color: gray;
    font-weight: 500;
  }
  &:focus {
    border-bottom: 2px solid blue;
  }

  ${({ error }) => {
    return error
      ? css`
          border-bottom: 2px solid red !important;
        `
      : "";
  }};
`;

const ErrorTip = styled.span`
  display: flex;
  align-items: center;
  margin-top: 9px;
  margin-left: 12px;
  color: red;
  font-size: 12px;
`;

const Label = styled.label`
  display: block;
  overflow: hidden;
  width: 0px;
  height: 0px;
  font-size: 1px;
  line-height: 0;
  text-indent: -9999px;
`;

export default Input;
