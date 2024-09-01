import { useState } from "react";
import { Button } from "../button/button";
import { FormInput } from "../form-input/form-input";
import "./list-input.css";
import { formatLabelName } from "../../utils/text-formater";

export type ListInputProps = {
  id: string;
  onlyUnique: boolean;
  onChange: (value: string[]) => void;
  value: string[];
  name: string;
};

export const ListInput = ({
  id,
  onlyUnique,
  onChange,
  value,
  name,
}: ListInputProps) => {
  const [addValueText, setAddValueText] = useState("");

  const handleAdd = () => {
    if (addValueText == "") {
      alert(`Value on field ${formatLabelName(name)} cannot be empty`);
      return;
    }

    if (onlyUnique && value.includes(addValueText)) {
      alert(
        `Value on field ${formatLabelName(
          name
        )} must be unique, found duplicate for value "${addValueText}"`
      );
      return;
    }

    const newValues = [...value, addValueText];
    onChange(newValues);

    setAddValueText("");
  };

  const handleRemove = (index: number) => {
    const newValues = [...value];
    newValues.splice(index, 1);

    onChange(newValues);
  };

  return (
    <section className="list-input-wrapper">
      <label htmlFor={name} className="list-input-description">
        {formatLabelName(name)}
      </label>
      <div className="list-wrapper">
        {value.length > 0 ? (
          value.map((value, i) => {
            return (
              <section key={`${id}${name}${i}`} className="list-item">
                <span>{value}</span>
                <section>
                  <Button onClick={() => handleRemove(i)} type="button">
                    Remove Item
                  </Button>
                </section>
              </section>
            );
          })
        ) : (
          <span className="list-item">
            No {formatLabelName(name)} added yet
          </span>
        )}
      </div>

      <section className="input-receiver">
        <FormInput
          value={addValueText}
          onChange={(e) => setAddValueText(e.target.value)}
          placeholder="Add a new Value..."
        />
        <Button onClick={handleAdd} type="button">
          Add Item
        </Button>
      </section>
    </section>
  );
};
