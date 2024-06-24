import { Code, Flex, Title } from "@mantine/core";

import ClipboardButton from "./clipboard-button";

interface FieldProps {
  name?: string;
  value?: string;
  valueList?: string[];
}

export default function Field({
  name,
  value = "",
  valueList = [],
}: FieldProps) {
  return (
    <>
      {name && (
        <Flex align="center">
          <Title order={6} fw={600} textWrap="nowrap">
            {name}:
          </Title>
          <ClipboardButton
            text={valueList.length ? valueList.toString() : value}
          />
        </Flex>
      )}
      <Flex>
        {!name && (
          <ClipboardButton
            text={valueList.length ? valueList.toString() : value}
          />
        )}
        {valueList.length ? (
          valueList.map((v) => (
            <Code block key={v}>
              {v}
            </Code>
          ))
        ) : (
          <Code block>{value}</Code>
        )}
      </Flex>
    </>
  );
}
