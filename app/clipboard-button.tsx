import { ActionIcon, CopyButton, rem,Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface ClipboardButtonProps {
  text: string;
}

export default function ClipboardButton({ text }: ClipboardButtonProps) {
  return (
    <CopyButton value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon
            color={copied ? "teal" : "gray"}
            variant="subtle"
            onClick={copy}
          >
            {copied ? (
              <IconCheck style={{ width: rem(16) }} />
            ) : (
              <IconCopy style={{ width: rem(16) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}
