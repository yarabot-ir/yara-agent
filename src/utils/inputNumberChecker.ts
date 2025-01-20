function inputNumberChecker(
  event: React.KeyboardEvent<HTMLInputElement>,
  handler: (event: React.KeyboardEvent<HTMLInputElement>) => void
) {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Enter",
    "Escape",
    "Home",
    "End",
  ];

  // Allow specific control keys
  if (allowedKeys.includes(event.key) || (event.ctrlKey && event.key === "v")) {
    return; // Allow default behavior for these keys
  }

  const inputElement = event.target as HTMLInputElement;
  const number = inputElement.value;
  let phoneNumber = "";

  // Check if the key pressed is a number
  const isNumber = /^[0-9]$/.test(event.key);

  if (/^09/.test(number)) {
    phoneNumber = number;
  } else if (/^98/.test(number)) {
    phoneNumber = `0${number.slice(2)}`;
  } else if (/^9/.test(number)) {
    phoneNumber = `0${number}`;
  }

  inputElement.value = phoneNumber;

  handler(event);

  if (!isNumber) {
    event.preventDefault(); // Prevent non-numeric input
  }
}

export default inputNumberChecker;
