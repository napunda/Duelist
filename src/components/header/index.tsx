import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Container,
  Text,
} from "@mantine/core";
import DuelistLogo from "../../assets/img/duelist.svg";
import { useDisclosure } from "@mantine/hooks";
import classes from "./style.module.css";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ActionToggle } from "./components/ActionToggle";
import useAuthStore from "../../states/AuthState";
import { TbLogout } from "react-icons/tb";

export function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const location = useLocation();
  useEffect(() => {
    closeDrawer();
  }, [location, closeDrawer]);

  const handLogout = useAuthStore((state) => state.logout);

  return (
    <Box pb={12}>
      <header className={classes.header}>
        <Container className={classes.container} size="xl">
          <Group justify="space-between" h="100%">
            <Link to="/">
              <img
                className={classes.logo}
                src={DuelistLogo}
                alt="Duelist Logo"
                height={40}
              />
            </Link>
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <Link to="/todos" className={classes.link}>
                My todos
              </Link>
            </Group>

            <Group visibleFrom="sm">
              {isLoggedIn && (
                <Button onClick={handLogout} variant="outline" color="red">
                  <TbLogout size="20px" />
                  <Text fw={500} ml="xs">
                    Logout
                  </Text>
                </Button>
              )}
              {!isLoggedIn && (
                <>
                  <Link to="/login">
                    <Button variant="default">Log in</Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button>Sign up</Button>
                  </Link>
                </>
              )}

              <ActionToggle />
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/todos" className={classes.link}>
            My todos
          </Link>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Link to="/login">
              <Button fullWidth variant="default">
                Log in
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button fullWidth>Sign up</Button>
            </Link>
          </Group>
          <ActionToggle />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
