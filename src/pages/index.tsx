import { type NextPage } from "next";
import Head from "next/head";
import { api } from "src/utils/api";
import ComponentCard from "@ui/ComponentCard";
import { Badge } from "@tremor/react";
import Spinner from "@ui/Spinner";

const Home: NextPage = () => {
  const { data: components, isLoading} =
    api.component.getAllComponents.useQuery();
  const { data: allTags } = api.tags.getAllTags.useQuery();

  const styles = {
    container: "max-w-screen-xl  mx-auto px-4 xl:px-0 pt-6",
    cardsContainer: "grid items-start grid-cols-4 gap-6",
    tagsContainer: "flex gap-4 mb-6",
    tag: "",
  };

  if (isLoading) {
    return <div className="section__height justify-center flex items-center flex-col gap-4">
      <Spinner/>
      <div className="font-display font-medium text-xl text-gray-400 animate-pulse ">
      Loading Components
      </div>
    </div>;
  }

  return (
    <>
      <Head>
        <title>Figma Components</title>
        <meta name="description" content="Free Figma Component Library" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" h-screen  bg-gray-100">
        <div className={styles.container}>
          {/* TagList */}
          <div className={styles.tagsContainer}>

          {allTags?.map((item) => (
            <button
            key={`tag-filter-${item?.name}`}
            className="rounded-md border font-semibold  tracking-wider  bg-white py-1.5 px-3"
            >
              {item?.name}
            </button>
          ))}
          </div>
          <div className={styles.cardsContainer}>
            {components?.map((item) => (
              <ComponentCard key={`component-${item?.id}`} data={item} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
