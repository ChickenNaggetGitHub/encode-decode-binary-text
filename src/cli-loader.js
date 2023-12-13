#!/usr/bin/env node

import inquirer from "inquirer";
import {encode, decode} from "./index.js";

inquirer
  .prompt([
    {
      name: "text",
      type: "input",
      prefix: "",
      message: "Enter Your Input (Binary or Text)",
    },
  ])
  .then((input) => {
    // First check if string is binary number
    switch (/^[01][01\s]*[01]$/.test(input.text)) {
      case true:
        console.log(decode(input.text));
        break;
      case false:
        console.log(encode(input.text));
        break;
    }
  })
  .catch((error) => {
    error = error.toString();

    if (error.isTtyError) {
      throw new Error("TTY Error happened");
    } else if (error.includes("No")) {
      console.error("! No string provided !");
    } else {
      throw new Error(error);
    }
  });
