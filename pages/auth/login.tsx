import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../../src/components/common/Button";
import Input from "../../src/components/common/Input";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({ criteriaMode: "all" });

  // register
  const email = register("email", {
    validate: {
      validEmailCheck: (email) => {
        if (email === "") return "아이디(이메일)를 입력하세요";
        const emailCheckRegex =
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if (!emailCheckRegex.test(email))
          return "아이디(이메일)는 이메일 형식으로 입력해주세요.";
        return true;
      },
    },
  });

  const password = register("password", {
    required: {
      value: true,
      message: "비밀번호를 입력하세요.",
    },
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <Input
              label="Enter email"
              svg="email"
              register={email}
              name="email"
              type="text"
              placeholder="아이디(이메일)"
              errors={errors.email?.types}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Enter password"
              svg="lock-close"
              register={password}
              name="password"
              type="password"
              placeholder="비밀번호"
              errors={errors.password?.types}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button size="small" height="40px" color="coral_blue">
              로그인
            </Button>
            <HR />
            <Link href="/auth/signup" passHref>
              <Button as="a" size="small" height="40px">
                Signup
              </Button>
            </Link>
          </ButtonWrapper>
        </form>
      </Main>
      <Footer>@Coupang Corp. All rights reserved.</Footer>
    </>
  );
}

const Main = styled.main`
  min-width: 290px;
  max-width: 460px;
  margin: 0 auto;
`;

const InputWrapper = styled.div`
  margin-top: 14px;
`;

const ButtonWrapper = styled.div`
  margin-top: 14px;
`;

const HR = styled.hr`
  margin-top: 14px;
  margin-bottom: 14px;
`;

const Footer = styled.footer`
  padding: 30px 0 40px;
  text-align: center;
  font-size: 12px;
`;
