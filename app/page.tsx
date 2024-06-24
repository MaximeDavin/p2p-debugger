import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Group,
  Text,
} from "@mantine/core";
import Image from "next/image";

import logo from "@/public/logo.svg";

import MainContainer from "./mainContainer";

function Home() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShellHeader>
        <Group h="100%" px="md">
          <Image src={logo} alt="logo" height={32} width={32} />
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            P2P Debugger
          </Text>
        </Group>
      </AppShellHeader>
      <AppShellMain>
        <MainContainer />
      </AppShellMain>
    </AppShell>
  );
}

export default Home;
