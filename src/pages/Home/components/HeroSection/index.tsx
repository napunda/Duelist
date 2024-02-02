import {
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  rem,
} from "@mantine/core";
import classes from "./HeroSection.module.css";
import { Link } from "react-router-dom";
import { MdMoreTime } from "react-icons/md";
import { RxAccessibility } from "react-icons/rx";
import { RiOpenSourceLine } from "react-icons/ri";
import { LiaUsersCogSolid } from "react-icons/lia";

const features = [
  {
    icon: MdMoreTime,
    title: "Efficiency",
    description: "Build your task lists and stay organized effortlessly.",
  },
  {
    icon: RxAccessibility,
    title: "Accessibility",
    description:
      "Access your tasks from anywhere, anytime, as long as you're connected ",
  },
  {
    icon: LiaUsersCogSolid,
    title: "Seamless Integration",
    description: "Login with your Google account for quick and secure access.",
  },
  {
    icon: RiOpenSourceLine,
    title: "Free and Open Source",
    description:
      "Duelist is completely free to use, and its open-source nature ensures transparency and community-driven improvements.",
  },
];

export default function HeroSection() {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon size={44} radius="md" variant="primary">
        <feature.icon style={{ width: rem(26), height: rem(26) }} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            A high-level task organizer with elegant and pleasant interfaces.
          </Title>
          <Text c="dimmed">
            With Duelist, managing your tasks has never been easier. This
            fully-featured web service allows you to handle all your tasks,
            online and completely free of charge. Plus, with Google login
            integration, accessing your tasks is seamless and secure.
          </Text>
          <Link to="/login">
            <Button variant="primary" size="lg" radius="md" mt="xl">
              Get started
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button variant="outline" size="lg" radius="md" mt="xl" ml="sm">
              Sign up
            </Button>
          </Link>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}
