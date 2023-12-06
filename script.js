import { DIR, mkDir, touch, cd, del } from "./DIRECTORY.js";
const input = document.getElementById("input");
const prev_cmds = document.getElementsByClassName("previous-cmds")[0];
const cmd_cwd = document.getElementsByClassName("cwd")[0];
const container = document.getElementsByClassName("scroll")[0];

let currentFolder = DIR;
const cwd = [currentFolder.current];
const cwd_stack = [currentFolder];

const availableCommands = [
  "ls",
  "echo",
  "touch",
  "mkdir",
  "rm",
  "cd",
  "clear",
  "free",
];

// ON Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    commander(e.target.value.toLowerCase());
  }
  input.style.width = `${e.target.value.length * 20}px`;
});

// ON Change
input.addEventListener("input", (e) => {
  if (availableCommands.includes(e.target.value.toLowerCase())) {
    input.classList.add("cmd-identified");
  } else {
    input.classList.remove("cmd-identified");
  }
});

function commander(command) {
  let [cmd, post] = command.split(" ");
  entered(command);
  switch (cmd) {
    case "help":
      const helpDiv = document.createElement("div");
      helpDiv.classList.add("help-flex");
      for (var i = 0; i < availableCommands.length; i++) {
        let para = Helper.newTextElement("p", availableCommands[i], ["help-p"]);

        helpDiv.appendChild(para);
      }
      prev_cmds.appendChild(helpDiv);
      break;

    case "ls":
      const lsDiv = document.createElement("div");
      lsDiv.classList.add("ls-flex");

      for (let key in currentFolder.children) {
        let slash = "/";
        if (!currentFolder.children[key].children) {
          slash = "";
        }

        const para = Helper.newTextElement(
          "p",
          `${slash}${currentFolder.children[key].current}`,
          []
        );

        if (!currentFolder.children[key].children) {
          para.classList.add("ls-file");
        } else {
          para.classList.add("ls-folder");
        }

        lsDiv.appendChild(para);
        prev_cmds.appendChild(lsDiv);
      }
      console.log(
        `${currentFolder.current} content : ${currentFolder.children}`
      );
      break;
    case "echo":
      let echo = Helper.newTextElement("p", post, []);
      prev_cmds.appendChild(echo);
      break;
    case "free":
      let msg = Helper.newTextElement(
        "p",
        `FREE FREE PALESTINE!!		\ud83c\uddf5\ud83c\uddf8 `,
        []
      );
      prev_cmds.appendChild(msg);
      break;

    case "clear":
      prev_cmds.innerHTML = "";
      break;

    case "touch":
      touch(currentFolder, post);
      break;

    case "mkdir":
      mkDir(currentFolder, post);
      break;

    case "cd":
      if (currentFolder.children[post]) {
        cwd.push(currentFolder.children[post].current);
        cwd_stack.push(currentFolder.children[post]);
        currentFolder = currentFolder.children[post];
        console.log(`cd ${post} `, cwd);
      } else if (post === "..") {
        console.log("cd .. ");
        if (cwd_stack.length > 1) {
          cwd.pop();
          cwd_stack.pop();
        }
        currentFolder = cwd_stack[cwd.length - 1];
      } else {
        console.log("un matched directory");
      }
      cmd_cwd.innerHTML = cwd.join("/");

      break;
    case "rm":
      let isDeleted = del(currentFolder, post);
      if (isDeleted) {
        let msg = Helper.newTextElement("p", "file deleted", []);
        prev_cmds.appendChild(msg);
      } else {
        let msg = Helper.newTextElement(
          "p",
          `bash: ${post}: no such file or directory`,
          []
        );
        prev_cmds.appendChild(msg);
      }
      break;
    default:
      let e = `bash: ${command} command is not found `;
      entered(e);
  }
}

function entered(command) {
  // concat user + cwd + last cmd display it above + clears input field
  const prefix = Helper.newTextElement("p", `kareem@dev:~ `, []);
  prefix.style.marginRight = "10px";
  prefix.style.color = "greenyellow";

  const Icwd = Helper.newTextElement("p", `${cwd.join("/")}`, []);
  Icwd.style.color = "violet";

  const command_name = Helper.newTextElement("p", `$ ${command}`, []);

  const history = document.createElement("div");
  history.appendChild(prefix);
  history.appendChild(Icwd);
  history.appendChild(command_name);
  history.classList.add("row");

  prev_cmds.appendChild(history);
  input.value = "";

  container.scrollTop = container.scrollHeight + 500;
}

const Helper = {
  newTextElement: (type, text, classes) => {
    let el = document.createElement(type);
    let eltext = document.createTextNode(text);
    el.appendChild(eltext);

    for (let i = 0; i < classes.length; i++) {
      el.classList.add(classes[i]);
    }
    return el;
  },
};
