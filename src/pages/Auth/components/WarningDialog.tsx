import { Dialog, Text, Grid } from "@mantine/core";
import { FaTriangleExclamation } from "react-icons/fa6";

interface WarningDialogProps {
  message: string;
  opened: boolean;
  close: () => void;
}

export default function WarningDialog({ message, opened, close }: Readonly<WarningDialogProps>) {

  return (
    <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
      <Grid p={12} align="center">
        <Grid.Col span={2}>
          <FaTriangleExclamation size={35} color="red" />
        </Grid.Col>
        <Grid.Col span={10}>
          <Text size="sm" fw={500}>
            {message}
          </Text>
        </Grid.Col>
      </Grid>
    </Dialog>
  );
}