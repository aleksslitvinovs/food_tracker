export const objectEmpty = (obj: Object | undefined): boolean => {
  if (obj === undefined) {
    return true;
  }

  return Object.keys(obj).length === 0;
};

//adds hyphen between words given the text is written in camelCase.
export const urlize = (text: string, delimiter: string = ""): string => {
  if (delimiter !== "") {
    return text.replaceAll(delimiter, "-").toLowerCase();
  }

  return text.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const addSpaceBetweenWords = (
  str: string,
  delimiter: string = ""
): string => {
  if (delimiter !== "") {
    return str.replaceAll(delimiter, " ");
  }

  return str.replace(new RegExp(`([a-z])${delimiter}([A-Z])`, "g"), "$1 $2");
};

export const convertToCamelCase = (
  str: string,
  delimiter: string = "-"
): string => {
  const foo = str
    .split(delimiter)
    .map((word, index) => {
      if (index === 0) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");

  console.log("converted", foo);

  return foo;
};
