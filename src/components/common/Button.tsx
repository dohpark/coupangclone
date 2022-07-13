import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// eslint-disable-next-line react/display-name
const Button: ButtonComponent = React.forwardRef(
  <C extends React.ElementType = "button">(
    {
      as,
      color,
      size = "medium",
      width,
      onClick,
      children,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    return (
      <Container
        as={as || "button"}
        color={color}
        size={size}
        ref={ref}
        width={width}
        onClick={onClick}
        {...props}
      >
        {children}
      </Container>
    );
  }
);

// 타입
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This is the first reusable type utility we built
type PolymorphicComponentProp<C extends React.ElementType, Props = {}> =
  React.PropsWithChildren<Props & AsProp<C>> &
    Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is a new type utitlity with ref!
type PolymorphicComponentPropWithRef<C extends React.ElementType, Props = {}> =
  PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// This is the type for the "ref" only
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
 * This is the updated component props using PolymorphicComponentPropWithRef
 */
export type ButtonProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      size?: "medium" | "small" | "svg";
      width?: string;
      height?: string;
      custom?: string;
      color?: "coral_blue";
      onClick?: () => void;
    }
  >;

/**
 * This is the type used in the type annotation for the component
 */
export type ButtonComponent = <C extends React.ElementType = "button">(
  props: ButtonProps<C>
) => React.ReactElement | null;

// 스타일
interface StyledButtonProps {
  width?: string;
  height?: string;
  custom?: string;
  size: "medium" | "small" | "svg";
}

export interface Props {
  children: React.ReactNode;
  size?: "medium" | "small" | "svg";
  width?: string;
  height?: string;
  custom?: string;
  color?: "coral_blue";
  onClick?: () => void;
  as?: "a" | "button";
}

// 버튼 색상 구하기
const getButtonColor = (color?: string) => {
  switch (color) {
    case "coral_blue":
      return css`
        background-color: #4760e9;
        color: white;
      `;
    default:
      return css`
        background-color: white;
        color: black;
        border: 1px solid gray;
      `;
  }
};

// 버튼 크기 구하기
const getButtonSize = (size: string) => {
  switch (size) {
    case "medium":
      return css`
        height: 48px;
      `;
    case "small":
      return css`
        font-size: 14px;
        height: 36px;
      `;
    case "svg":
      return css`
        font-size: 14px;
        width: 20px;
        height: 20px;
        padding: 0;
        border: none !important;
      `;
    default:
      return "";
  }
};

const Container = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  ${({ size }) => getButtonSize(size)}
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ color }) => getButtonColor(color)};
  ${({ custom }) =>
    custom
      ? css`
          ${custom}
        `
      : ""};
`;

export default Button;

// https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/#how-to-use-typescript-build-strongly-typed-polymorphic-components-react

{
  /* 사용 예시
      // 일반적인 버튼 및 submit 버튼
      <Button
        width="320px"
        color="dark_cyan"
        size="small"
        onClick={() => {
          console.log("hello");
        }}
      >
        hello
      </Button>

      // Link 버튼
      <Link href="/auth/signup" passHref>
        <Button as="a" size="small">
          Signup
        </Button>
      </Link> */
}
