import React, { useRef, useState, useCallback, useEffect } from "react";

type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
};

export default function OTPInput({ length = 4, onComplete }: InputProps) {
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));

  const handleInputChange = useCallback(
    (value: string, index: number) => {
      const updatedOtp = [...OTP];
      updatedOtp[index] = value;
      setOTP(updatedOtp);

      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (updatedOtp.every((digit) => digit !== "")) {
        onComplete(updatedOtp.join(""));
      }
    },
    [OTP, length, onComplete]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !OTP[index] && index > 0) {
        const updatedOtp = [...OTP];
        updatedOtp[index - 1] = "";
        setOTP(updatedOtp);
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowLeft" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [OTP, length]
  );

  const setRef = useCallback((ref: HTMLInputElement | null, index: number) => {
    if (ref) inputRefs.current[index] = ref;
  }, []);

  return (
    <div className="grid grid-cols-4 gap-5">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleInputChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(ref) => {
            setRef(ref, index);
          }}
          className="border border-solid !rounded-lg border-light-silver focus:border-dark-purple p-5 outline-none text-center"
        />
      ))}
    </div>
  );
}
