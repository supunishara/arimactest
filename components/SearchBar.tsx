import { useTranslation } from "react-i18next";
import { Input } from "./ui/input";
import { memo } from "react";

interface Props {
  value: string;
  onChange: (value: any) => void;
}

const SearchBar = memo(function SearchBar({ value, onChange }: Props) {
  return (
    <Input
      placeholder={"search a movie here"}
      className="shad-input border-1"
      onChange={onChange}
      value={value}
    />
  );
});

export default SearchBar;
