import { useTranslation } from "react-i18next";
import { Input } from "./ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const { t } = useTranslation();

  return (
    <Input
      placeholder={t("search movie here")}
      className="shad-input border-1"
    />
  );
}
