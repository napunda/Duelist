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
} from "@mantine/core";
import DuelistLogo from "../../assets/img/duelist.svg";
import { useDisclosure } from "@mantine/hooks";
import classes from "./style.module.css";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../states/AuthState";

export function Header() {
  const user = useAuthStore((state) => state.user);
  const userName = useAuthStore((state) => state.userName);
  const setName = useAuthStore((state) => state.setName);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const location = useLocation();
  useEffect(() => {
    closeDrawer();
  }, [location, closeDrawer]);

  return (
    <Box pb={12}>
      {user && <div>{user.name}</div>}
      {userName && <div>{userName}</div>}

      <input
        title="user"
        type="text"
        value={userName}
        onChange={(e) => setName(e.target.value)}
      />
      <header className={classes.header}>
        <Container className={classes.container} size="lg">
          <Group justify="space-between" h="100%">
            <Link to="/">
              <img
                className={classes.logo}
                src={DuelistLogo}
                alt="Duelist Logo"
                height={35}
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
              <Link to="/login">
                <Button variant="default">Log in</Button>
              </Link>
              <Link to="/sign-up">
                <Button>Sign up</Button>
              </Link>
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
            <Link style={{ textDecoration: "none" }} to="/login">
              <Button fullWidth variant="default">
                Log in
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/sign-up">
              <Button fullWidth>Sign up</Button>
            </Link>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
