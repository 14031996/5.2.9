import {
  Button,
  Container,
  Group,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import cat from "../assets/sad-cat 1.png";

export const NotFoundPage = () => {
  return (
    <Container component="main" size={740} py={64}>
      <Paper p="xl" radius="md">
        <Group justify="space-between">
          <div>
            <Title order={1}>
              Упс! Такой страницы
              <br />
              не существует
            </Title>
            <Text mt="xs">Давайте перейдём к началу.</Text>
          </div>

          <Button component={Link} to="/">
            На главную
          </Button>
        </Group>

        <Image src={cat} alt="Кот" radius="md" mt="lg" />
      </Paper>
    </Container>
  );
};
