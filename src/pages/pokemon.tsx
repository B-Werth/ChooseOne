import { type NextPage } from "next";
import Head from "next/head";
import { useState, useMemo } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Prisma, PrismaClient } from "@prisma/client";
import Image from "next/image";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function Pokemon() {
    const PokeRandom = useMemo(() => getRandomInt(1, 500), []);
    const PokemonData = trpc.example.pokemon1.useQuery({ id: PokeRandom });

    return (
      <div>
        <Image
          width={250}
          height={250}
          src={
            PokemonData?.data?.sprites?.other?.["official-artwork"]
              .front_default as string
          }
          alt={""}
        />
        <button></button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>VSCritic</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="  font-extrabold tracking-tight text-white sm:text-[3rem]">
          Choose your Pokemon!
        </h1>
        <div className="container flex items-center justify-center gap-40 px-4 py-16 ">
          <Pokemon></Pokemon>
          <Pokemon></Pokemon>
          <Pokemon></Pokemon>
        </div>
      </main>
    </>
  );
};

export default Home;
