import { Container, Group, ActionIcon, rem, Anchor } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import DuelistLogo from "../../assets/img/duelist.svg";
import classes from "./style.module.css";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Link to="/">
          <img
            height={60}
            className={classes.logo}
            src={DuelistLogo}
            alt="Duelist Logo"
          />
        </Link>
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <Anchor href="https://twitter.com/duelist" target="_blank">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Anchor>
          <Anchor href="https://youtube.com/@duelist" target="_blank">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandYoutube
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Anchor>
          <Anchor href="https://instagram.com/duelist" target="_blank">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Anchor>
        </Group>
      </Container>
    </div>
  );
}
