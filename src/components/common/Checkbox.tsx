import Link from "next/link";
import Image from "next/image";

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { UseFormRegisterReturn } from "react-hook-form";
import Button from "./Button";

const Checkbox: React.FC<CheckboxProps> = ({
  register,
  label,
  labelId,
  bold,
  link,
  description,
  onClick,
  onChange,
  checked,
}) => {
  return (
    <>
      <Wrapper>
        <Input
          {...register}
          type="checkbox"
          onClick={onClick}
          onChange={onChange}
          checked={checked}
        />
        <Label htmlFor={labelId} bold={bold}>
          {label}
        </Label>
        {link && (
          <Link href={link} passHref>
            <Button
              as="a"
              width="20px"
              height="20px"
              size="svg"
              custom="margin-left: auto;"
            >
              <Image
                src={"/svg/arrow-right.svg"}
                height={16}
                width={16}
                alt="arrow-right"
              />
            </Button>
          </Link>
        )}
      </Wrapper>
      {description && <Description>{description}</Description>}
    </>
  );
};

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  name?: string;
  label: string;
  labelId: string;
  bold?: boolean;
  link?: string;
  description?: string;
}

interface StyledLabel {
  bold?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`;

const Label = styled.label<StyledLabel>`
  font-size: 14px;

  ${({ bold }) =>
    bold
      ? css`
          font-weight: bold;
          font-size: 16px;
        `
      : ""};
`;

const Description = styled.span`
  font-size: 12px;
  margin-top: 6px;
  margin-left: 26px;
  display: block;
`;

export default Checkbox;

// 필요한 Component중 가장 어려운 Checkbox입니다!

// font bold 처리
// description 유무

// react-hook-form 대응, font bold 처리, description 유무, 포함관계 등의 요구사항을 매끄럽게 만족시킬 수 있는 방법을 고민해보아요.
