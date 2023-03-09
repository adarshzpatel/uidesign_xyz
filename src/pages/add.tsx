import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Tag } from "@prisma/client";
import {
  Badge,
  Bold,
  Button,
  Dropdown,
  DropdownItem,
  Metric,
  Subtitle,
  Text,
} from "@tremor/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { api } from "src/utils/api";
import toBase64 from "src/utils/base64";

type Props = {};

type FormData = {
  title: string;
  tags: string[];
  thumbnailUrl: string;
  component: string;
};

const acceptedfiles = ["image/png", "image/jpeg", "image/jpg", "image/svg"];

const AddComponentPage = (props: Props) => {
  const { data: tagsSuggestions , isLoading } = api.tags.getAllTags.useQuery();
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();
  const [file,setFile] = useState<File|undefined>()
  const { mutateAsync: createComponent } = api.component.create.useMutation();
  const { data: allTags } = api.tags.getAllTags.useQuery();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  const addComponent: SubmitHandler<FormData> = async (data) => {
    console.log({ ...data, thumbnailUrl, tags });
    setLoading(true);
    try {
      if (!thumbnailUrl || !tags || !data.title || !data.component ||!file)
        throw new Error("Incomplete Input");
        const imageUrl = await uploadImage(file)
        if(!imageUrl) return
        const res = await createComponent({
        ...data,
        thumbnailUrl:imageUrl,
        tags: tags.map((item) => item?.name),
      });
      toast.success("Component created successfully!");
      setTags([]);
      setThumbnailUrl("");
      setValue("title", "");
    } catch (err) {
      toast.error("Something went wrong !! Check console");
      console.log("Error creating component : ", err);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: "max-w-screen-xl mx-auto container p-4 xl:px-0",
    formContainer: "grid grid-cols-2 gap-6 mt-12",
    input:
      "border-[1px] border-gray-400 focus:outline-none w-full focus:border-black block focus:shadow-xl py-2 px-4 rounded-lg ",
    textArea:
      "border-[1px] border-gray-400 focus:outline-none w-full focus:border-black block focus:shadow-xl p-4 rounded-lg",
  };

  const uploadImage = async (file:File) => {
    try{

      const formData = new FormData()
      formData.append("file",file)
      formData.append("upload_preset","de4azwie")
      const res = await axios.post("https://api.cloudinary.com/v1_1/djeeqfmjs/image/upload",formData)
      console.log(res)
      return res?.data?.secure_url
    } catch(err){
      console.log(err)
    }
  }

  const handleOnPaste = async (e: ClipboardEvent) => {
    try {
      if (!e.clipboardData) return;
      const textHtmlData = e.clipboardData?.getData("text/html") ?? "";
      const fileObject = e.clipboardData?.files[0];
      if (textHtmlData) setValue("component", textHtmlData);
      if (fileObject && acceptedfiles.includes(fileObject.type)) {
        const dataURL = await toBase64(fileObject);
        setFile(fileObject)
        setThumbnailUrl(dataURL ?? "");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.document.addEventListener("paste", handleOnPaste);
  }, []);

  if(isLoading){
    return <div className={styles?.container}>
          Loading...
    </div>
  }

  return (
    <div className={styles.container}>
      <Metric>Add component</Metric>
      <form
        onSubmit={handleSubmit(addComponent)}
        className={styles.formContainer}
      >
        <div className="space-y-8">
          <input
            placeholder="Enter title"
            {...register("title")}
            className={styles.input}
          />
            <div className="relative"> 
            <textarea
            rows={10}
            placeholder="Paste figma component"
            {...register("component")}
            className={styles.textArea}
            />
            <button onClick={()=> setValue("component","")} type="button" className="right-2 bottom-2 absolute active:scale-95 duration-200 ease-out bg-red-500 p-1 text-white rounded-lg shadow-lg">
              <FiX className="text-xl"/>
            </button>
            </div>       
          <div className="space-y-2">
            <Text>
              <Bold>Select Tags</Bold>
            </Text>
            {tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags?.map((it) => (
                  <button onClick={()=>setTags(tags.filter((item=> item.name != it.name)))}  key={`selected-tag-${it.name}`}>
                  <Badge text={it.name} tooltip="Click to delete"/>
                  </button>
                ))}
              </div>
            )}
            <Dropdown
              onValueChange={(value: Tag) => {
                if (tags.includes(value)) return;
                setTags((tags) => [...tags, value]);
              }}
              placeholder="Select Tags"
            >
              {tagsSuggestions?.length ? (
                tagsSuggestions?.map((item: Tag) => {
                  if (!tags?.some((it) => item.name === it.name))
                    return (
                      <DropdownItem
                        value={item}
                        text={item?.name}
                        key={`suggestion-${item.name}`}
                      />
                    );
                  else return <></>;
                })
              ) : (
                <>Nothing left</>
              )}
            </Dropdown>
            {/* <TagSelectInput placeholder='Select Tags' suggestions={tagsSuggestions ?? []} tags={tags} setTags={setTags}/> */}
          </div>
        </div>
        <div>
          {/* image input here */}
          <div className="div flex aspect-[3/2.5] items-center  rounded-md border border-black bg-gradient-to-br from-purple-500 to-rose-500 p-4 text-white">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                className=" h-full w-full rounded-lg  border bg-white object-contain shadow-2xl"
              />
            ) : (
              "Paste image"
            )}
          </div>
          Size :{file && (((file?.size/1024)/1024).toFixed(4))} mb
        </div>
        <button className="rounded-lg bg-primary-600 py-2 text-white ring-primary-200 hover:bg-primary-500 focus:ring active:bg-primary-700">
          {loading ? "Creating Component.." : "Create Component"}
        </button>
      </form>
    </div>
  );
};

export default AddComponentPage;
