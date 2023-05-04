import Image from "next/image";
import { Inter } from "next/font/google";
import { client } from "@/lib/sanityclient";
import { groq } from "next-sanity";
import { urlFor } from "@/lib/imagebuilder";
import { GetStaticProps } from "next";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  title: string;
  description: string;
  image: string;
}

export default function Home({ title, description, image }: HomeProps) {
  return (
    <section
      className={inter.className}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container">
        <div className="md:w-1/2">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const sampleData = await client.fetch(groq`*[_type == 'hero']`);
  const { title, description, bgImage } = sampleData[0];
  return {
    props: {
      title,
      description,
      image: urlFor(bgImage),
    }, // will be passed to the page component as props
  };
};
