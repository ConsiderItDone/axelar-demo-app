import { Button } from "antd";
import { useState } from "react";

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  return <Button onClick={onCopy}>{copied ? "Copied" : "Copy"}</Button>;
};

export default CopyButton;
