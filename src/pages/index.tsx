import { type NextPage } from "next";
import Head from "next/head";
import { api } from "src/utils/api";
import ComponentCard from "@ui/ComponentCard";

const Home: NextPage = () => {
  const {
    data: components,
    isLoading,
    refetch,
  } = api.component.getAll.useQuery();
  const like = api.component.like.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const writeToClipboard = (data: string) => {
    const type = "text/html";
    const blob = new Blob([data], { type });
    const clipboardItem = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard
      .write(clipboardItem)
      .then(() => alert("Copied to clipboard"))
      .catch((err) => alert(err));
  };

  const tags = ["Category 1", "Category 2", "Category 3", "Category 4"];

  const styles = {
    container: "max-w-screen-xl mx-auto  pt-6",
    cardsContainer: "grid items-start grid-cols-4 gap-6",
    tagsContainer: "flex gap-4 mb-6",
    tag: "border bg-white hover:shadow-xl p-2 px-4 hover:border-gray-400 rounded-lg",
  };
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
            {tags?.map((item, idx) => (
              <div key={idx} className={styles.tag}>
                {item}
              </div>
            ))}
          </div>
          <div className={styles.cardsContainer}>
            {components?.map((item) => (
              <>
                <ComponentCard key={item?.id} data={item} />
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
