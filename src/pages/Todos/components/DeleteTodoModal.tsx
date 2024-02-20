import { Modal, Group, Text, Button } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { ITodoItem } from "../types/TodoItem";

interface DeleteTodoModalProps {
  openedDialog: boolean;
  closeDialog: () => void;
  deleteDoc: (todo: ITodoItem | null) => void;
  selectedTodo: ITodoItem | null;
}
export default function DeleteTodoModal({
  openedDialog,
  closeDialog,
  deleteDoc,
  selectedTodo,
}: Readonly<DeleteTodoModalProps>) {
  return (
    <Modal
      opened={openedDialog}
      withCloseButton
      onClose={closeDialog}
      size="md"
      radius="md"
      centered
    >
      <Group align="center" justify="center">
        <IconAlertCircle size={30} />
        <Text size="md" fw={700}>
          This action will delete the curent todo!
        </Text>
      </Group>
      <Group align="center" justify="center" mt="xl">
        <Button color="red" variant="subtle" onClick={() => closeDialog()}>
          Cancel
        </Button>
        <Button
          variant="light"
          onClick={() => {
            deleteDoc(selectedTodo);
          }}
        >
          Confirm
        </Button>
      </Group>
    </Modal>
  );
}
