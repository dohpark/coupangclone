import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../src/components/common/Input";
import Button from "../../src/components/common/Button";
import Checkbox from "../../src/components/common/Checkbox";
import Icon from "../../src/components/common/Icon";

export default function SignupPage() {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<register>({ criteriaMode: "all" });

  // watch
  const emailWatch = watch("email");
  const passwordWatch = watch("password");

  // register
  const email = register("email", {
    validate: {
      validEmailCheck: (email) => {
        if (email === "") return "이메일을 입력하세요";
        const emailCheckRegex =
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if (!emailCheckRegex.test(email)) return "이메일을 올바르게 입력하세요";
        return true;
      },
    },
  });

  const password = register("password", {
    validate: {
      combinationCheck: (password) => {
        let count = 0;
        const error = "영문/숫자/특수문자 2가지 이상 조합 (8~20자)";

        if (password.length < 8 || password.length > 20) return error;
        if (password.search(/[0-9]/g) != -1) count++;
        if (password.search(/[a-z]/gi) != -1) count++;
        if (password.search(/[!@#$%^&*()?_~]/g) != -1) count++;
        if (count < 2) return error;
        return true;
      },
      duplicateCheck: (password) => {
        const error = "3개 이상 연속되거나 동일한 문자/숫자 제외";
        if (/(\w)\1\1/.test(password)) return error;
        return true;
      },
      emailCheck: (password) => {
        const error = "아이디(이메일) 제외";

        if (emailWatch === password) return error;
        return true;
      },
    },
  });
  const passwordCheck = register("passwordCheck", {
    validate: {
      passwordDuplicateCheck: (passwordCheck) => {
        if (!passwordCheck)
          return "확인을 위해 새 비밀번호를 다시 입력해주세요";
        if (passwordCheck !== passwordWatch)
          return "새 비밀번호가 일치하지 않습니다";
        return true;
      },
    },
  });
  const name = register("name", {
    required: {
      value: true,
      message: "이름을 입력하세요.",
    },
    pattern: {
      value: /([가-힣\x20])/,
      message: "이름을 정확히 입력하세요.",
    },
  });
  const phoneNumber = register("phoneNumber", {
    required: {
      value: true,
      message: "휴대폰 번호를 입력하세요.",
    },
    pattern: {
      value: /\d+/,
      message: "휴대폰 번호를 정확하게 입력하세요",
    },
  });

  // agreement register
  const allAgree = register("allAgree");
  const terms_fourteen = register("terms_fourteen", {
    required: true,
  });
  const terms_service = register("terms_service", {
    required: true,
  });
  const terms_commerce = register("terms_commerce", {
    required: true,
  });
  const terms_privacy_collect_use = register("terms_privacy_collect_use", {
    required: true,
  });
  const agree_to_collect_third_part_information = register(
    "agree_to_collect_third_part_information",
    {
      required: true,
    }
  );
  const agree_to_collect_for_ads = register("agree_to_collect_for_ads");
  const advReceive = register("advReceive");
  const agree_to_receive_email = register("agree_to_receive_email");
  const agree_to_receive_sms = register("agree_to_receive_sms");
  const agree_to_receive_push = register("agree_to_receive_push");

  // agreement relationship state
  const relationshipDefault: relationshipType = {
    allAgree: {
      master: [],
      sub: [
        "terms_fourteen",
        "terms_service",
        "terms_commerce",
        "terms_privacy_collect_use",
        "terms_privacy_collect_use",
        "agree_to_collect_third_part_information",
        "agree_to_collect_for_ads",
      ],
      value: false,
    },
    terms_fourteen: { master: ["allAgree"], sub: [], value: false },
    terms_service: { master: ["allAgree"], sub: [], value: false },
    terms_commerce: { master: ["allAgree"], sub: [], value: false },
    terms_privacy_collect_use: { master: ["allAgree"], sub: [], value: false },
    agree_to_collect_third_part_information: {
      master: ["allAgree"],
      sub: [],
      value: false,
    },
    agree_to_collect_for_ads: {
      master: ["allAgree"],
      sub: ["advReceive"],
      value: false,
    },
    advReceive: {
      master: ["agree_to_collect_for_ads"],
      sub: [
        "agree_to_receive_email",
        "agree_to_receive_sms",
        "agree_to_receive_push",
      ],
      value: false,
    },
    agree_to_receive_email: { master: ["advReceive"], sub: [], value: false },
    agree_to_receive_sms: { master: ["advReceive"], sub: [], value: false },
    agree_to_receive_push: { master: ["advReceive"], sub: [], value: false },
  };
  const [relationship, setRelationship] = useState(relationshipDefault);

  // 예외처리
  useEffect(() => {
    // 모두 동의
    const allAgreeValueArr = Object.values(relationship)
      .map((v) => v.value)
      .slice(1);

    if (allAgreeValueArr.every((v) => v)) {
      setRelationship((prev) => {
        prev.allAgree.value = true;
        return prev;
      });
      setValue("allAgree", true);
    }
    if (allAgreeValueArr.some((v) => !v)) {
      setRelationship((prev) => {
        prev.allAgree.value = false;
        return prev;
      });
      setValue("allAgree", false);
    }

    // 광고성 동의
    const advValueArr = relationship.advReceive.sub.map(
      (v) => relationship[v].value
    );

    if (advValueArr.every((v) => !v)) {
      setRelationship((prev) => {
        prev.advReceive.value = false;
        return prev;
      });
      setValue("advReceive", false);
    }

    if (advValueArr.some((v) => v)) {
      setRelationship((prev) => {
        prev.advReceive.value = true;
        prev.agree_to_collect_for_ads.value = true;
        return prev;
      });
      setValue("advReceive", true);
      setValue("agree_to_collect_for_ads", true);
    }
  }, [relationship, setValue]);

  // functions
  const check = (key: agreement) => {
    const master = relationship[key].master;
    const sub = relationship[key].sub;

    setRelationship((prev) => ({
      ...prev,
      [key]: {
        master,
        sub,
        value: true,
      },
    }));
  };

  const uncheck = (key: agreement) => {
    const master = relationship[key].master;
    const sub = relationship[key].sub;

    setRelationship((prev) => ({
      ...prev,
      [key]: {
        master,
        sub,
        value: false,
      },
    }));
  };

  // master uncheck => sub all uncheck
  const masterUncheckedSubAllUncheck = (key: agreement) => {
    setRelationship((prev) => {
      prev[key].value = false;
      return prev;
    });
    setValue(key, false);
    const init = relationship[key].sub;
    const toVisit = [...init];

    while (toVisit.length) {
      console.log("uncheck", toVisit);
      const key = toVisit.pop();
      if (key !== undefined) {
        console.log(key);
        setRelationship((prev) => {
          prev[key].value = false;
          return prev;
        });
        setValue(key, false);
        relationship[key].sub.forEach((v) => toVisit.push(v));
      }
    }

    setRelationship((prev) => ({
      ...prev,
    }));
  };

  // master check => sub all check
  const masterCheckedSubAllCheck = (key: agreement) => {
    setRelationship((prev) => {
      prev[key].value = true;
      return prev;
    });
    setValue(key, true);
    const init = relationship[key].sub;
    const toVisit = [...init];

    while (toVisit.length) {
      console.log("check", toVisit);
      const key = toVisit.pop();
      if (key) {
        setRelationship((prev) => {
          prev[key].value = true;
          return prev;
        });
        setValue(key, true);
        relationship[key].sub.forEach((v) => toVisit.push(v));
      }
    }
    setRelationship((prev) => ({
      ...prev,
    }));
  };

  const masterOnHandler = (checked: boolean, key: agreement) => {
    if (checked) {
      masterCheckedSubAllCheck(key);
    } else {
      masterUncheckedSubAllUncheck(key);
    }
  };

  const subOnHandler = (checked: boolean, key: agreement) => {
    if (checked) {
      check(key);
    } else {
      uncheck(key);
    }
  };

  const onSubmit = ({
    email,
    password,
    name,
    phoneNumber,
    terms_fourteen,
    terms_service,
    terms_commerce,
    terms_privacy_collect_use,
    agree_to_collect_third_part_information,
    agree_to_collect_for_ads,
    agree_to_receive_email,
    agree_to_receive_sms,
    agree_to_receive_push,
  }: register) => {
    const agreements = {
      terms_fourteen,
      terms_service,
      terms_commerce,
      terms_privacy_collect_use,
      agree_to_collect_third_part_information,
      agree_to_collect_for_ads,
      agree_to_receive_email,
      agree_to_receive_sms,
      agree_to_receive_push,
    };
    const signupData = {
      email,
      password,
      name,
      phoneNumber,
      agreements,
    };

    console.log(signupData);
  };

  return (
    <>
      <Main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormH2>회원정보를 입력해주세요</FormH2>
          <UserInfoForm>
            <InputWrapper>
              <Input
                label="Enter email"
                svg="email"
                register={email}
                name="email"
                type="text"
                placeholder="아이디(이메일)"
                errors={errors?.email?.types}
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
                errors={errors?.password?.types}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Enter password check"
                svg="lock-open"
                register={passwordCheck}
                name="passwordCheck"
                type="text"
                placeholder="비밀번호 확인"
                errors={errors?.passwordCheck?.types}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Enter name"
                svg="user"
                register={name}
                name="name"
                type="text"
                placeholder="이름"
                errors={errors?.name?.types}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Enter phone number"
                svg="smartphone"
                register={phoneNumber}
                name="phoneNumber"
                type="text"
                placeholder="휴대폰 번호"
                errors={errors?.phoneNumber?.types}
              />
            </InputWrapper>
          </UserInfoForm>
          <AgreementForm>
            <FormH2>쿠팡 서비스 약관에 동의해주세요</FormH2>
            <Checkbox
              register={allAgree}
              name="allAgree"
              label="모두 동의합니다"
              labelId="allAgree"
              bold={true}
              description={
                "동의에는 필수 및 선택 목적(광고성 정보 수신 포함)에 대한 동의가 포함되어 있으며, 선택 목적의 동의를 거부하시는 경우에도 서비스 이용이 가능합니다."
              }
              onChange={(e) => {
                masterOnHandler(e.target.checked, "allAgree");
              }}
            />

            {errors.terms_fourteen ||
            errors.terms_service ||
            errors.terms_commerce ||
            errors.terms_privacy_collect_use ||
            errors.agree_to_collect_third_part_information ? (
              <ErrorTipAdv>
                <Icon width={12} height={12} svg="warning" />
                &nbsp; 필수 항목에 모두 동의해주세요
              </ErrorTipAdv>
            ) : (
              ""
            )}

            <AgreementSub>
              <AgreementTerm>
                <Checkbox
                  register={terms_fourteen}
                  name="terms_fourteen"
                  label="[필수] 만 14세 이상입니다"
                  labelId="terms_fourteen"
                  onChange={(e) => {
                    subOnHandler(e.target.checked, "terms_fourteen");
                  }}
                />
              </AgreementTerm>
              <AgreementTerm>
                <Checkbox
                  register={terms_service}
                  name="terms_service"
                  label="[필수] 쿠팡 이용약관 동의"
                  labelId="terms_service"
                  onChange={(e) => {
                    subOnHandler(e.target.checked, "terms_service");
                  }}
                />
              </AgreementTerm>
              <AgreementTerm>
                <Checkbox
                  register={terms_commerce}
                  name="terms_commerce"
                  label="[필수] 전자금융거래 이용약관 동의"
                  labelId="terms_commerce"
                  link="/auth/login"
                  onChange={(e) => {
                    subOnHandler(e.target.checked, "terms_commerce");
                  }}
                />
              </AgreementTerm>
              <AgreementTerm>
                <Checkbox
                  register={terms_privacy_collect_use}
                  name="terms_privacy_collect_use"
                  label="[필수] 개인정보 수집 및 이용 동의"
                  labelId="terms_privacy_collect_use"
                  link="/auth/login"
                  onChange={(e) => {
                    subOnHandler(e.target.checked, "terms_privacy_collect_use");
                  }}
                />
              </AgreementTerm>
              <AgreementTerm>
                <Checkbox
                  register={agree_to_collect_third_part_information}
                  name="agree_to_collect_third_part_information"
                  label="[필수] 개인정보 제3자 제공 동의"
                  labelId="agree_to_collect_third_part_information"
                  link="/auth/login"
                  onChange={(e) => {
                    subOnHandler(
                      e.target.checked,
                      "agree_to_collect_third_part_information"
                    );
                  }}
                />
              </AgreementTerm>
              <AgreementTerm>
                <Checkbox
                  register={agree_to_collect_for_ads}
                  name="agree_to_collect_for_ads"
                  label="[선택] 광고성 목적의 개인정보 수집 및 이용 동의"
                  labelId="agree_to_collect_for_ads"
                  link="/auth/login"
                  onChange={(e) => {
                    masterOnHandler(
                      e.target.checked,
                      "agree_to_collect_for_ads"
                    );
                  }}
                />
              </AgreementTerm>
              <AgreementTerm>
                <Checkbox
                  register={advReceive}
                  name="advReceive"
                  label="[선택] 광고성 정보 수신 동의"
                  labelId="advReceive"
                  link="/auth/login"
                  onChange={(e) => {
                    masterOnHandler(e.target.checked, "advReceive");
                  }}
                />
              </AgreementTerm>
              <AgreementAdvTerm>
                <Checkbox
                  register={agree_to_receive_email}
                  name="agree_to_receive_email"
                  label="[선택] 이메일 수신 동의"
                  labelId="agree_to_receive_email"
                  onChange={(e) => {
                    subOnHandler(e.target.checked, "agree_to_receive_email");
                  }}
                />
              </AgreementAdvTerm>
              <AgreementAdvTerm>
                <Checkbox
                  register={agree_to_receive_sms}
                  name="agree_to_receive_sms"
                  label="[선택] SMS,MMS 수신 동의"
                  labelId="agree_to_receive_sms"
                  onChange={(e) => {
                    subOnHandler(e.target.checked, "agree_to_receive_sms");
                  }}
                />
              </AgreementAdvTerm>
              <AgreementAdvTerm>
                <Checkbox
                  register={agree_to_receive_push}
                  name="agree_to_receive_push"
                  label="[선택] 앱 푸시 수신 동의"
                  labelId="agree_to_receive_push"
                  onChange={(e) => {
                    subOnHandler(e.target.checked, "agree_to_receive_push");
                  }}
                />
              </AgreementAdvTerm>
            </AgreementSub>
          </AgreementForm>

          <Button color="coral_blue" custom={"margin-top: 24px"}>
            동의하고 가입하기
          </Button>
        </form>
      </Main>
      <Footer>@Coupang Corp. All rights reserved.</Footer>
    </>
  );
}

// styled
const Main = styled.main`
  min-width: 290px;
  max-width: 460px;
  margin: 0 auto;
`;

const FormH2 = styled.h2`
  padding: 10px 0 10px;
  font-size: 14px;
  font-weight: bold;
`;

const UserInfoForm = styled.div`
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  margin-top: 12px;
`;

const AgreementForm = styled.div`
  border-top: 1px solid #f1f4f6;
`;

const AgreementSub = styled.div`
  margin-top: 16px;
  padding: 18px 16px;
  border: 1px solid #ccc;
`;

const AgreementTerm = styled.div`
  padding-bottom: 12px;
`;

const AgreementAdvTerm = styled.div`
  padding-bottom: 12px;
  padding-left: 22px;
`;

const Footer = styled.footer`
  padding: 30px 0 40px;
  text-align: center;
  font-size: 12px;
`;

const ErrorTipAdv = styled.span`
  display: flex;
  align-items: center;
  color: red;
  font-size: 12px;
  margin-top: 8px;
`;

// types
type agreement =
  | "allAgree"
  | "terms_fourteen"
  | "terms_service"
  | "terms_commerce"
  | "terms_privacy_collect_use"
  | "agree_to_collect_third_part_information"
  | "agree_to_collect_for_ads"
  | "advReceive"
  | "agree_to_receive_email"
  | "agree_to_receive_sms"
  | "agree_to_receive_push";

interface relationshipType {
  [k: string]: { master: agreement[]; sub: agreement[]; value: boolean };
}

type register = {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  phoneNumber: string;
  allAgree: boolean;
  terms_fourteen: boolean;
  terms_service: boolean;
  terms_commerce: boolean;
  terms_privacy_collect_use: boolean;
  agree_to_collect_third_part_information: boolean;
  agree_to_collect_for_ads: boolean;
  advReceive: boolean;
  agree_to_receive_email: boolean;
  agree_to_receive_sms: boolean;
  agree_to_receive_push: boolean;
};
