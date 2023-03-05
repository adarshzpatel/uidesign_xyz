import { toast } from "react-hot-toast";

const writeToClipboard = (data: string) => {
  const type = "text/html";
  const blob = new Blob([data], { type });
  const clipboardItem = [new ClipboardItem({ [type]: blob })];
  navigator.clipboard
    .write(clipboardItem)
    .then(() => toast.success("Copied to clipboard"))
    .catch((err) => alert(err));
};

export default writeToClipboard