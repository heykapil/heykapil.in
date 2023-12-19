import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch("https://spotify.kapil.app", {
    method: "GET",
    headers: {
      accept: "text/html,application/json",
    },
    mode: "no-cors",
  });
  const repo = await JSON.stringify(res);
  // Pass data to the page via props
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo }>;

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return console.log(repo);
}
