import React from "react";

type MySliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

const MySlider: React.FC<MySliderProps> = ({ value, onChange, min, max }) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    onChange(newValue);
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
      />
      <span>{value}</span>
    </div>
  );
};

export default MySlider;
