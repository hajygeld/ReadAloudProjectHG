import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="h-screen bg-papyrus-200">
      <Head>
        <title>ReadAloud</title>
        <meta name="description" content="ReadAloud: Read images aloud." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-full justify-center items-center dark:bg-black">
        <h1 className="text-5xl font-bold dark:text-white">
          Welcome to ReadAloud.
        </h1>
        <p className="mt-10 text-lg">
          Read aloud your images, PDFs, word documents, and website articles to
          your heart's content.
        </p>
        <Link href="read_upload">
          <button className="bg-brown-900 hover:bg-brown-800 text-white text-xl p-3 rounded-md mt-10">
            Start Now
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
