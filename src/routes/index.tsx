import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import { createAsync, cache } from "@solidjs/router";

const getUsers = cache(async () => {
  "use server";
  const response = await fetch("http://worldtimeapi.org/api/timezone/America/Mexico_City");
  return (await response.json()) as { datetime: string };
}, "users");

export const route = {
  load: () => getUsers(),
};

export default function Home() {

  const users = createAsync(() => getUsers());

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p class="tiempo">Time: { users()?.datetime }</p>
    </main>
  );
}
