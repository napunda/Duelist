import { Button, ButtonProps } from "@mantine/core";
import { IconType } from "react-icons";

type SocialButtonProps = ButtonProps & {
  icon: IconType;
};

export function SocialButton(props: SocialButtonProps) {
  const { icon: Icon, ...buttonProps } = props;

  return <Button leftSection={<Icon />} variant="default" {...buttonProps} />;
}
